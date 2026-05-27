const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const leadsFile = path.join(dataDir, "leads.json");
const port = Number(process.env.PORT || 4177);
const localAdminToken = "local-dev";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, headers);
  res.end(body);
};

const sendJson = (res, status, payload) => {
  send(res, status, JSON.stringify(payload), {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
};

const sanitize = (value, maxLength = 220) =>
  String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, maxLength);

const isLocalRequest = (req) => {
  const host = String(req.headers.host || "");
  const address = String(req.socket.remoteAddress || "");
  return (
    host.startsWith("127.0.0.1") ||
    host.startsWith("localhost") ||
    address === "::1" ||
    address === "127.0.0.1" ||
    address === "::ffff:127.0.0.1"
  );
};

const expectedAdminToken = (req) => {
  if (process.env.ADMIN_TOKEN) return process.env.ADMIN_TOKEN;
  return isLocalRequest(req) ? localAdminToken : "";
};

const requireAdmin = (req, res, url) => {
  const expected = expectedAdminToken(req);
  if (!expected) {
    sendJson(res, 503, {
      error: "ADMIN_TOKEN is required before exposing the lead admin API."
    });
    return false;
  }

  const provided = req.headers["x-admin-token"] || url.searchParams.get("token") || "";
  if (provided !== expected) {
    sendJson(res, 401, { error: "Invalid admin token." });
    return false;
  }

  return true;
};

const ensureDataFile = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(leadsFile);
  } catch {
    await fs.writeFile(leadsFile, "[]\n", "utf8");
  }
};

const readLeads = async () => {
  await ensureDataFile();
  const raw = await fs.readFile(leadsFile, "utf8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const writeLeads = async (leads) => {
  await ensureDataFile();
  const tempFile = `${leadsFile}.tmp`;
  await fs.writeFile(tempFile, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
  await fs.rename(tempFile, leadsFile);
};

const readBody = async (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });

const createCsv = (leads) => {
  const headers = ["提交时间", "姓名", "电话", "品牌", "官网", "需求", "来源"];
  const escapeCell = (value) => `"${String(value || "").replace(/"/g, '""')}"`;
  const rows = leads.map((lead) =>
    [
      lead.createdAt,
      lead.name,
      lead.phone,
      lead.brand,
      lead.website,
      lead.need,
      lead.source
    ].map(escapeCell).join(",")
  );
  return `${headers.map(escapeCell).join(",")}\n${rows.join("\n")}\n`;
};

const handleApi = async (req, res, url) => {
  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      service: "yilukaige-lead-backend",
      adminTokenHint: process.env.ADMIN_TOKEN ? "configured" : localAdminToken
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/leads") {
    let payload;
    try {
      payload = JSON.parse(await readBody(req));
    } catch {
      sendJson(res, 400, { error: "Invalid JSON body." });
      return;
    }

    const lead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: sanitize(payload.name, 80),
      phone: sanitize(payload.phone, 40),
      brand: sanitize(payload.brand, 120),
      website: sanitize(payload.website, 240),
      need: sanitize(payload.need, 800),
      source: sanitize(payload.source, 260),
      userAgent: sanitize(req.headers["user-agent"], 220),
      ip: sanitize(req.headers["x-forwarded-for"] || req.socket.remoteAddress, 80)
    };

    if (!lead.name || !lead.phone || !lead.brand) {
      sendJson(res, 422, { error: "name, phone and brand are required." });
      return;
    }

    const leads = await readLeads();
    leads.unshift(lead);
    await writeLeads(leads);
    sendJson(res, 201, { ok: true, lead });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/leads") {
    if (!requireAdmin(req, res, url)) return;
    const query = sanitize(url.searchParams.get("q"), 120).toLowerCase();
    const leads = await readLeads();
    const filtered = query
      ? leads.filter((lead) =>
          [lead.name, lead.phone, lead.brand, lead.website, lead.need]
            .join(" ")
            .toLowerCase()
            .includes(query)
        )
      : leads;
    sendJson(res, 200, { leads: filtered, total: leads.length });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/leads.csv") {
    if (!requireAdmin(req, res, url)) return;
    const leads = await readLeads();
    send(res, 200, createCsv(leads), {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=\"yilukaige-leads.csv\"",
      "Cache-Control": "no-store"
    });
    return;
  }

  sendJson(res, 404, { error: "API route not found." });
};

const serveStatic = async (req, res, url) => {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  if (pathname === "/admin") pathname = "/admin.html";

  if (pathname.startsWith("/data/") || pathname.includes("/.")) {
    send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  const filePath = path.normalize(path.join(rootDir, pathname));
  if (!filePath.startsWith(rootDir)) {
    send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  try {
    const body = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    send(res, 200, body, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream"
    });
  } catch {
    send(res, 404, "Not found", { "Content-Type": "text/plain; charset=utf-8" });
  }
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Internal server error." });
  }
});

server.listen(port, () => {
  console.log(`Yilu Kaige site running at http://127.0.0.1:${port}/`);
  console.log(`Lead admin: http://127.0.0.1:${port}/admin.html`);
  if (!process.env.ADMIN_TOKEN) {
    console.log(`Local admin token: ${localAdminToken}`);
  }
});
