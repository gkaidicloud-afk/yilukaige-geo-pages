import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(toolDir, "..");
const host = process.env.WORKBENCH_HOST || "127.0.0.1";
const port = Number(process.env.WORKBENCH_PORT || 4388);
const siteUrl = "https://www.yilukaige.com";

const deploy = {
  host: process.env.YILUKAIGE_DEPLOY_HOST || "39.96.58.195",
  user: process.env.YILUKAIGE_DEPLOY_USER || "admin",
  remoteRoot: process.env.YILUKAIGE_DEPLOY_PATH || "/opt/yilu-kaige",
  key: process.env.YILUKAIGE_DEPLOY_KEY || path.join(os.homedir(), ".ssh", "id_ed25519_yilukg"),
};

const indexNow = {
  host: "www.yilukaige.com",
  key: "da808c9266834793aed8af4057d0b6b0",
  keyLocation: "https://www.yilukaige.com/da808c9266834793aed8af4057d0b6b0.txt",
};

const geoWorkbench = {
  origin: (process.env.GEO_WORKBENCH_ORIGIN || "http://127.0.0.1:3000").replace(/\/+$/, ""),
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function readText(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function writeJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function writeHtml(res, html) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(html);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 30 * 1024 * 1024) {
        reject(new Error("提交内容太大，请先精简图片路径或正文。"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("提交内容不是有效 JSON。"));
      }
    });
    req.on("error", reject);
  });
}

function run(command, args, options = {}) {
  const timeoutMs = options.timeoutMs ?? 120000;
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env: { ...process.env, FORCE_COLOR: "0" },
      shell: false,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`${command} 执行超时。`));
    }, timeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      const result = { code, stdout: stdout.trim(), stderr: stderr.trim() };
      if (code === 0) {
        resolve(result);
      } else {
        const error = new Error(`${command} ${args.join(" ")} 执行失败。`);
        error.result = result;
        reject(error);
      }
    });
  });
}

function shanghaiDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function shanghaiDatetime(date) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type)?.value ?? "00";
  return `${date}T${get("hour")}:${get("minute")}:${get("second")}+08:00`;
}

function feedDateFromDatetime(datetime) {
  const [datePart, timePartWithZone = "10:30:00+08:00"] = datetime.split("T");
  const [timePart = "10:30:00"] = timePartWithZone.split("+");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - 8, minute, second));
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${weekdays[utcDate.getUTCDay()]}, ${String(day).padStart(2, "0")} ${months[month - 1]} ${year} ${timePart} +0800`;
}

function findLatestArticleSource() {
  const files = fs
    .readdirSync(path.join(root, "tools"))
    .filter((file) => /^news-articles-\d{8}\.mjs$/.test(file))
    .sort();
  if (!files.length) {
    throw new Error("没有找到 tools/news-articles-*.mjs 文章源文件。");
  }
  return path.join("tools", files.at(-1));
}

function parseStatusFiles(statusText) {
  return statusText
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .map((line) => {
      const renamed = line.match(/^R\s+(.+?) -> (.+)$/);
      if (renamed) {
        return renamed[2].replaceAll("\\", "/");
      }
      return line.slice(3).replaceAll("\\", "/");
    });
}

async function gitStatus() {
  const result = await run("git", ["status", "--short"], { timeoutMs: 30000 });
  return result.stdout;
}

function cleanText(value) {
  return String(value ?? "").trim();
}

function splitParagraphs(value) {
  return cleanText(value)
    .split(/\n\s*\n/g)
    .map((item) => item.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

function splitLines(value) {
  return cleanText(value)
    .split(/\r?\n/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function validSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function safeAssetName(name) {
  const normalized = cleanText(name)
    .replaceAll("\\", "/")
    .split("/")
    .at(-1)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (!normalized || normalized === "." || normalized === "..") {
    throw new Error("图片文件名无效，请填写英文、数字或短横线文件名。");
  }
  return normalized;
}

function shortHash(value) {
  let hash = 0;
  for (const char of cleanText(value)) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash.toString(36).padStart(6, "0").slice(0, 6);
}

function uniqueValues(values) {
  return [...new Set(values.map(cleanText).filter(Boolean))];
}

function slugFromGeoArticle(article) {
  const title = cleanText(article.title).toLowerCase();
  const parts = [];
  if (title.includes("geo")) parts.push("geo");
  if (title.includes("ai")) parts.push("ai");
  if (title.includes("搜索")) parts.push("search");
  if (title.includes("品牌")) parts.push("brand");
  if (title.includes("推荐")) parts.push("recommend");
  if (title.includes("可见")) parts.push("visibility");
  if (title.includes("监测")) parts.push("monitoring");
  if (title.includes("工作台")) parts.push("workbench");
  if (title.includes("seo")) parts.push("seo");
  const base = uniqueValues(parts).slice(0, 5).join("-") || "geo-ai-content";
  return `${base}-${shortHash(`${article.id}-${article.title}`)}`;
}

function inferGeoCategory(article) {
  const text = `${article.title || ""}\n${article.content || ""}`;
  if (/工作台|监测|可见度|复盘/.test(text)) return "GEO 工作台";
  if (/AI\s*搜索|搜索优化|AI搜索/.test(text)) return "AI 搜索优化";
  if (/品牌|推荐|内容资产|知识资产/.test(text)) return "内容品牌推广";
  if (/获客|线索|转化/.test(text)) return "AI 精准获客";
  return "GEO 优化";
}

function stripMarkdownImages(text) {
  return cleanText(text).replace(/!\[[^\]]*\]\([^)]*\)/g, "");
}

function plainTextFromMarkdown(text) {
  return stripMarkdownImages(text)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[>\-*+]\s+/gm, "")
    .replace(/[`*_#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(text, max = 170) {
  const clean = plainTextFromMarkdown(text);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/[，。；、：,.!?！？\s]+$/g, "")}。`;
}

function sectionFromMarkdownBlock(heading, body) {
  const bullets = [];
  const paragraphs = [];
  for (const chunk of stripMarkdownImages(body).split(/\n\s*\n/g)) {
    const lines = chunk.split(/\r?\n/g).map((line) => line.trim()).filter(Boolean);
    if (!lines.length) continue;
    const bulletLines = lines
      .filter((line) => /^[-*+]\s+/.test(line) || /^\d+[.)、]\s*/.test(line))
      .map((line) => line.replace(/^[-*+]\s+/, "").replace(/^\d+[.)、]\s*/, "").trim())
      .filter(Boolean);
    if (bulletLines.length === lines.length) {
      bullets.push(...bulletLines);
      continue;
    }
    const paragraph = lines
      .map((line) => line.replace(/^[-*+]\s+/, "").replace(/^\d+[.)、]\s*/, "").trim())
      .join(" ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[`*_#]/g, "")
      .trim();
    if (paragraph) paragraphs.push(paragraph);
  }
  return { heading: cleanText(heading), paragraphs, bullets };
}

function markdownToSections(content, title) {
  const normalized = cleanText(content).replace(/\r\n/g, "\n");
  const matches = [...normalized.matchAll(/^#{1,3}\s+(.+)$/gm)];
  const sections = [];
  if (matches.length > 1) {
    for (let index = 0; index < matches.length; index += 1) {
      const heading = cleanText(matches[index][1]).replace(/^#\s*/, "");
      if (index === 0 && heading === cleanText(title)) continue;
      const start = matches[index].index + matches[index][0].length;
      const end = matches[index + 1]?.index ?? normalized.length;
      const section = sectionFromMarkdownBlock(heading, normalized.slice(start, end));
      if (section.heading && (section.paragraphs.length || section.bullets.length)) {
        sections.push(section);
      }
    }
  }
  if (sections.length >= 3) return sections.slice(0, 8);

  const paragraphs = stripMarkdownImages(normalized)
    .replace(/^#{1,6}\s+.*$/gm, "")
    .split(/\n\s*\n/g)
    .map((item) => item.replace(/\s*\n\s*/g, " ").trim())
    .filter((item) => item.length > 20);
  const fallbackHeadings = ["问题背景", "优化思路", "落地方法", "复盘建议"];
  const chunkSize = Math.max(1, Math.ceil(paragraphs.length / 4));
  return fallbackHeadings.map((heading, index) => ({
    heading,
    paragraphs: paragraphs.slice(index * chunkSize, (index + 1) * chunkSize),
    bullets: [],
  })).filter((section) => section.paragraphs.length);
}

function geoKeywords(article) {
  const text = `${article.title || ""}\n${article.content || ""}`;
  const keywords = ["GEO优化", "AI搜索优化", "品牌AI推荐", "AI可见度", "企业AI服务", "一路凯歌"];
  if (/工作台|监测/.test(text)) keywords.push("GEO工作台", "AI可见度监测");
  if (/SEO/.test(text)) keywords.push("GEO与SEO区别");
  if (/DeepSeek/.test(text)) keywords.push("DeepSeek品牌推荐");
  if (/豆包/.test(text)) keywords.push("豆包AI搜索");
  if (/元宝|腾讯/.test(text)) keywords.push("腾讯元宝AI搜索");
  return uniqueValues(keywords).join(",");
}

function defaultGeoFaqs(article) {
  const title = cleanText(article.title) || "这篇 GEO 内容";
  return [
    {
      question: "这篇内容为什么适合进入官网新闻？",
      answer: `因为「${title}」围绕客户真实会问的问题展开，能补充官网在 GEO 优化、AI 搜索优化和品牌可见度方面的公开信源。`,
    },
    {
      question: "从 GEO 工作台导入后还需要人工审核吗？",
      answer: "需要。工作台负责把标题、正文、摘要和问答先整理成官网新闻草稿，发布前仍建议人工检查事实、表达、图片和联系方式。",
    },
    {
      question: "这类内容对 AI 搜索推荐有什么帮助？",
      answer: "它能把企业服务边界、方法、案例和常见问题公开化，方便搜索引擎和 AI 平台理解、引用并形成更稳定的品牌答案来源。",
    },
    {
      question: "发布后会同步更新哪些入口？",
      answer: "生成官网新闻页后，工具会更新新闻列表、首页入口、sitemap、feed 和 llms.txt，后续可继续提交 IndexNow 与百度普通收录。",
    },
  ];
}

function geoArticleToDraft(article) {
  const title = cleanText(article.title);
  const slug = slugFromGeoArticle(article);
  const category = inferGeoCategory(article);
  const summary = excerpt(article.content || title, 170);
  const sections = markdownToSections(article.content || "", title);
  if (article.coverImage && cleanText(article.coverImage).startsWith("data:image/") && sections.length) {
    sections[0].images = [
      {
        dataUrl: cleanText(article.coverImage),
        assetName: `${slug}-cover`,
        alt: title,
        caption: `${title}：GEO 工作台导入配图。`,
      },
    ];
  }
  return {
    slug,
    title,
    summary,
    category,
    keywords: geoKeywords(article),
    seoDescription: summary,
    date: shanghaiDate(),
    datetime: shanghaiDatetime(shanghaiDate()),
    coverKicker: "GEO WORKBENCH",
    coverTitle: title,
    coverTag: `从 GEO 工作台导入：${cleanText(article.platform) || "官网新闻"}`,
    coverPoints: "提取文章结构\n补齐 FAQ 问答\n生成官网新闻草稿",
    sourceNote: "本文由 GEO 工作台内容导入官网发布工具，发布前已保留人工审核与本地预览步骤。",
    sections,
    faqs: defaultGeoFaqs(article),
    references: [],
  };
}

async function fetchGeoArticles() {
  const response = await fetch(`${geoWorkbench.origin}/api/data/articles`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`无法读取 GEO 工作台文章接口：${geoWorkbench.origin}/api/data/articles`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("GEO 工作台文章接口返回格式不正确。");
  }
  return data;
}

function compactGeoArticle(article) {
  return {
    id: cleanText(article.id),
    title: cleanText(article.title),
    platform: cleanText(article.platform),
    status: cleanText(article.status),
    submittedAt: cleanText(article.submittedAt),
    reviewedAt: cleanText(article.reviewedAt),
    wordCount: Number(article.wordCount) || plainTextFromMarkdown(article.content).length,
    geoScore: Number(article.geoScore) || 0,
    aiCitations: Number(article.aiCitations) || 0,
    hasCoverImage: cleanText(article.coverImage).startsWith("data:image/"),
    imageCount: Array.isArray(article.images) ? article.images.length : 0,
    preview: excerpt(article.content || "", 110),
  };
}

function imageFromDataUrl(value) {
  const match = cleanText(value).match(/^data:(image\/(?:png|jpeg|jpg|webp));base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!match) return null;
  const mime = match[1].replace("image/jpg", "image/jpeg");
  const ext = mime === "image/png" ? ".png" : mime === "image/webp" ? ".webp" : ".jpg";
  return {
    ext,
    buffer: Buffer.from(match[2].replace(/\s+/g, ""), "base64"),
  };
}

function copyArticleImages(draft) {
  const copied = [];
  let imageIndex = 1;
  const sections = draft.sections.map((section) => {
    const images = [];
    for (const image of section.images ?? []) {
      const existingAsset = cleanText(image.assetPath);
      const sourcePath = cleanText(image.sourcePath).replace(/^"|"$/g, "");
      const dataImage = imageFromDataUrl(image.dataUrl);
      if (existingAsset) {
        const assetRelative = existingAsset.replace(/^\/+/, "");
        if (!assetRelative.startsWith("assets/")) {
          throw new Error(`已有图片路径必须以 assets/ 开头：${existingAsset}`);
        }
        if (!fs.existsSync(path.join(root, assetRelative))) {
          throw new Error(`找不到已有图片：${existingAsset}`);
        }
        images.push({
          src: assetRelative,
          alt: cleanText(image.alt) || draft.title,
          caption: cleanText(image.caption),
          width: Number(image.width) || undefined,
          height: Number(image.height) || undefined,
        });
        continue;
      }
      if (dataImage) {
        const requested = cleanText(image.assetName);
        const fileName = safeAssetName(requested || `${draft.slug}-${String(imageIndex).padStart(2, "0")}${dataImage.ext}`);
        const fileExt = path.extname(fileName);
        const finalName = fileExt ? fileName : `${fileName}${dataImage.ext}`;
        const relative = path.join("assets", finalName).replaceAll("\\", "/");
        const target = path.join(root, relative);

        if (fs.existsSync(target)) {
          const targetBytes = fs.readFileSync(target);
          if (!dataImage.buffer.equals(targetBytes)) {
            throw new Error(`assets/${finalName} 已存在且内容不同。请换一个图片文件名，避免覆盖旧内容。`);
          }
        } else {
          fs.writeFileSync(target, dataImage.buffer);
          copied.push(relative);
        }

        images.push({
          src: relative,
          alt: cleanText(image.alt) || draft.title,
          caption: cleanText(image.caption),
          width: Number(image.width) || undefined,
          height: Number(image.height) || undefined,
        });
        imageIndex += 1;
        continue;
      }
      if (!sourcePath) {
        continue;
      }
      if (!path.isAbsolute(sourcePath)) {
        throw new Error(`图片必须填写本机完整路径：${sourcePath}`);
      }
      if (!fs.existsSync(sourcePath)) {
        throw new Error(`找不到图片文件：${sourcePath}`);
      }

      const sourceExt = path.extname(sourcePath).toLowerCase() || ".png";
      const requested = cleanText(image.assetName);
      const fileName = safeAssetName(requested || `${draft.slug}-${String(imageIndex).padStart(2, "0")}${sourceExt}`);
      const fileExt = path.extname(fileName);
      const finalName = fileExt ? fileName : `${fileName}${sourceExt}`;
      const relative = path.join("assets", finalName).replaceAll("\\", "/");
      const target = path.join(root, relative);

      if (fs.existsSync(target)) {
        const sourceBytes = fs.readFileSync(sourcePath);
        const targetBytes = fs.readFileSync(target);
        if (!sourceBytes.equals(targetBytes)) {
          throw new Error(`assets/${finalName} 已存在且内容不同。请换一个图片文件名，避免覆盖旧内容。`);
        }
      } else {
        fs.copyFileSync(sourcePath, target);
        copied.push(relative);
      }

      images.push({
        src: relative,
        alt: cleanText(image.alt) || draft.title,
        caption: cleanText(image.caption),
        width: Number(image.width) || undefined,
        height: Number(image.height) || undefined,
      });
      imageIndex += 1;
    }
    return { ...section, images };
  });
  return { copied, sections };
}

function normalizeDraft(rawDraft) {
  const draft = rawDraft?.draft ?? rawDraft ?? {};
  const date = cleanText(draft.date) || shanghaiDate();
  const datetime = cleanText(draft.datetime) || shanghaiDatetime(date);
  const slug = cleanText(draft.slug);
  if (!validSlug(slug)) {
    throw new Error("slug 只能使用小写英文、数字和短横线，例如 geo-ai-brand-visibility。");
  }

  const sections = (draft.sections ?? [])
    .map((section) => ({
      heading: cleanText(section.heading),
      paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs.map(cleanText).filter(Boolean) : splitParagraphs(section.paragraphs),
      bullets: Array.isArray(section.bullets) ? section.bullets.map(cleanText).filter(Boolean) : splitLines(section.bullets),
      images: (section.images ?? []).map((image) => ({
        sourcePath: cleanText(image.sourcePath),
        assetPath: cleanText(image.assetPath),
        assetName: cleanText(image.assetName),
        dataUrl: cleanText(image.dataUrl),
        alt: cleanText(image.alt),
        caption: cleanText(image.caption),
        width: cleanText(image.width),
        height: cleanText(image.height),
      })),
    }))
    .filter((section) => section.heading || section.paragraphs.length || section.images.length);

  const faqs = (draft.faqs ?? [])
    .map((faq) => ({
      question: cleanText(faq.question),
      answer: cleanText(faq.answer),
    }))
    .filter((faq) => faq.question && faq.answer);

  const references = (draft.references ?? [])
    .map((reference) => ({
      label: cleanText(reference.label),
      url: cleanText(reference.url),
    }))
    .filter((reference) => reference.label && reference.url);

  const required = [
    ["标题", cleanText(draft.title)],
    ["摘要", cleanText(draft.summary)],
    ["分类", cleanText(draft.category)],
    ["关键词", cleanText(draft.keywords)],
    ["SEO 描述", cleanText(draft.seoDescription)],
  ];
  const missing = required.filter(([, value]) => !value).map(([label]) => label);
  if (missing.length) {
    throw new Error(`这些字段还没填：${missing.join("、")}。`);
  }
  if (sections.length < 3) {
    throw new Error("正文至少建议 3 个小节，这样文章页、AI 摘要和 SEO 信息更完整。");
  }
  if (faqs.length < 3) {
    throw new Error("FAQ 至少需要 3 条，因为文章侧栏会引用前三条问答。");
  }

  const coverPoints = Array.isArray(draft.coverPoints) ? draft.coverPoints.map(cleanText).filter(Boolean) : splitLines(draft.coverPoints);
  const article = {
    slug,
    title: cleanText(draft.title),
    summary: cleanText(draft.summary),
    category: cleanText(draft.category),
    keywords: cleanText(draft.keywords),
    seoDescription: cleanText(draft.seoDescription),
    date,
    datetime,
    feedDate: feedDateFromDatetime(datetime),
    sourceNote: cleanText(draft.sourceNote) || undefined,
    cover: {
      title: cleanText(draft.coverTitle) || cleanText(draft.title),
      kicker: cleanText(draft.coverKicker) || cleanText(draft.category),
      tag: cleanText(draft.coverTag) || "AI SEARCH GEO",
      points: coverPoints.length ? coverPoints.slice(0, 3) : ["整理品牌信源", "补齐问答入口", "持续监测复盘"],
      colors: ["#0B1F3B", "#1B5CB8", "#1CC8C8", "#F5F8FF"],
    },
    sections,
    faqs,
  };
  if (references.length) {
    article.references = references;
  }
  return article;
}

function articleLiteral(article) {
  const json = JSON.stringify(article, null, 4);
  return `  article(${json.replace(/\n/g, "\n  ")}),\n`;
}

function appendArticleToLatestSource(article) {
  const relative = findLatestArticleSource();
  const file = path.join(root, relative);
  const before = fs.readFileSync(file, "utf8");
  if (before.includes(`slug: "${article.slug}"`) || before.includes(`slug: '${article.slug}'`)) {
    throw new Error(`文章源里已经存在 slug：${article.slug}`);
  }
  const marker = /(export const \w+Articles = \[\r?\n)/;
  if (!marker.test(before)) {
    throw new Error(`无法识别文章源文件结构：${relative}`);
  }
  fs.writeFileSync(file, before.replace(marker, `$1${articleLiteral(article)}`), "utf8");
  return { sourceFile: relative, previousContent: before };
}

async function publishSlug(slug) {
  return run(process.execPath, ["tools/publish-single-news.mjs", slug], { timeoutMs: 180000 });
}

function checkGenerated(slug, title = "") {
  if (!validSlug(slug)) {
    throw new Error("slug 格式不正确。");
  }
  const articleFile = path.join(root, "news", `${slug}.html`);
  if (!fs.existsSync(articleFile)) {
    throw new Error(`没有生成文章页：news/${slug}.html`);
  }

  const checks = [];
  const articleHtml = fs.readFileSync(articleFile, "utf8");
  const url = `${siteUrl}/news/${slug}.html`;
  const files = ["index.html", "news.html", "sitemap.xml", "feed.xml", "llms.txt"];
  for (const file of files) {
    const html = readText(file);
    checks.push({ name: `${file} 包含新 URL`, ok: html.includes(url) || (file === "index.html" && html.includes(`${slug}.html`)) });
  }
  checks.push({ name: "文章页存在 canonical", ok: articleHtml.includes(`<link rel="canonical" href="${url}"`) });
  if (title) {
    checks.push({ name: "文章页包含标题", ok: articleHtml.includes(title) });
  }
  const imageMatches = [...articleHtml.matchAll(/<img[^>]+src="\.\.\/([^"]+)"/g)].map((match) => match[1]);
  for (const image of imageMatches) {
    checks.push({ name: `图片存在：${image}`, ok: fs.existsSync(path.join(root, image)) });
  }
  const jsonLdBlocks = [...articleHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [index, block] of jsonLdBlocks.entries()) {
    try {
      JSON.parse(block[1]);
      checks.push({ name: `结构化数据 ${index + 1} 可解析`, ok: true });
    } catch {
      checks.push({ name: `结构化数据 ${index + 1} 可解析`, ok: false });
    }
  }

  const failed = checks.filter((check) => !check.ok);
  if (failed.length) {
    const names = failed.map((check) => check.name).join("；");
    throw new Error(`本地检查未通过：${names}`);
  }
  return checks;
}

function isSafePublishChange(file) {
  return (
    file === "index.html" ||
    file === "news.html" ||
    file === "sitemap.xml" ||
    file === "feed.xml" ||
    file === "llms.txt" ||
    file === "styles.css" ||
    file === "script.js" ||
    file.startsWith("news/") ||
    file.startsWith("assets/") ||
    /^tools\/news-articles-\d{8}\.mjs$/.test(file)
  );
}

function isServerFile(file) {
  return (
    file === "index.html" ||
    file === "news.html" ||
    file === "sitemap.xml" ||
    file === "feed.xml" ||
    file === "llms.txt" ||
    file === "styles.css" ||
    file === "script.js" ||
    file.startsWith("news/") ||
    file.startsWith("assets/")
  );
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", "'\\''")}'`;
}

async function copyToServer(file) {
  const local = path.join(root, file);
  const remoteFile = `${deploy.remoteRoot}/${file.replaceAll("\\", "/")}`;
  const remoteDir = path.posix.dirname(remoteFile);
  const remote = `${deploy.user}@${deploy.host}:${remoteFile}`;
  await run("ssh", ["-i", deploy.key, "-o", "IdentitiesOnly=yes", "-o", "BatchMode=yes", `${deploy.user}@${deploy.host}`, `mkdir -p ${shellQuote(remoteDir)}`], {
    timeoutMs: 60000,
  });
  await run("scp", ["-i", deploy.key, "-o", "IdentitiesOnly=yes", "-o", "BatchMode=yes", local, remote], {
    timeoutMs: 120000,
  });
}

async function verifyOnline(slug, title) {
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/news.html`,
    `${siteUrl}/news/${slug}.html`,
    `${siteUrl}/sitemap.xml`,
    `${siteUrl}/feed.xml`,
    `${siteUrl}/llms.txt`,
  ];
  const results = [];
  for (const url of urls) {
    const response = await fetch(url, { cache: "no-store" });
    const text = await response.text();
    results.push({
      url,
      status: response.status,
      ok: response.ok && (url.includes(`/news/${slug}.html`) ? text.includes(title) : true),
    });
  }
  return results;
}

async function submitIndexNow(url) {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ ...indexNow, urlList: [url] }),
  });
  return { status: response.status, ok: response.ok, text: (await response.text()).trim() };
}

async function submitBaidu(url) {
  try {
    const result = await run(process.execPath, ["tools/submit-baidu.mjs", url], { timeoutMs: 60000 });
    return { ok: true, output: [result.stdout, result.stderr].filter(Boolean).join("\n") };
  } catch (error) {
    return {
      ok: false,
      output: [error.result?.stdout, error.result?.stderr, error.message].filter(Boolean).join("\n"),
    };
  }
}

async function handleCreateArticle(payload) {
  const status = await gitStatus();
  if (status && !payload.allowDirty) {
    throw new Error(`当前本地有未提交改动。为避免把无关内容混进发布，请先处理干净后再生成。\n${status}`);
  }

  const article = normalizeDraft(payload);
  const { copied, sections } = copyArticleImages(article);
  article.sections = sections;
  let sourceBackup = null;
  try {
    sourceBackup = appendArticleToLatestSource(article);
    const publishResult = await publishSlug(article.slug);
    const checks = checkGenerated(article.slug, article.title);
    const changed = parseStatusFiles(await gitStatus());
    return {
      article,
      copied,
      sourceFile: sourceBackup.sourceFile,
      publishOutput: [publishResult.stdout, publishResult.stderr].filter(Boolean).join("\n"),
      checks,
      changedFiles: changed,
      previewUrl: `http://${host}:${port}/site/news/${article.slug}.html`,
      liveUrl: `${siteUrl}/news/${article.slug}.html`,
    };
  } catch (error) {
    if (sourceBackup) {
      fs.writeFileSync(path.join(root, sourceBackup.sourceFile), sourceBackup.previousContent, "utf8");
    }
    throw error;
  }
}

async function handleDeploy(payload) {
  const slug = cleanText(payload.slug);
  const title = cleanText(payload.title);
  if (!validSlug(slug)) {
    throw new Error("部署需要有效的文章 slug。");
  }
  checkGenerated(slug, title);

  const status = await gitStatus();
  const changedFiles = parseStatusFiles(status);
  if (!changedFiles.length) {
    throw new Error("当前没有待提交的本地改动。");
  }
  const unsafe = changedFiles.filter((file) => !isSafePublishChange(file));
  if (unsafe.length) {
    throw new Error(`发现不属于文章发布流程的改动，为避免误提交已停止：\n${unsafe.join("\n")}`);
  }

  const commitMessage = cleanText(payload.commitMessage) || `Publish news article ${slug}`;
  await run("git", ["add", ...changedFiles], { timeoutMs: 60000 });
  const commit = await run("git", ["commit", "-m", commitMessage], { timeoutMs: 120000 });
  const push = await run("git", ["push", "origin", "main"], { timeoutMs: 180000 });

  const serverFiles = changedFiles.filter(isServerFile);
  for (const file of serverFiles) {
    await copyToServer(file);
  }

  const online = await verifyOnline(slug, title);
  const newUrl = `${siteUrl}/news/${slug}.html`;
  const indexNowResult = await submitIndexNow(newUrl);
  const baiduResult = await submitBaidu(newUrl);

  return {
    changedFiles,
    serverFiles,
    commit: [commit.stdout, commit.stderr].filter(Boolean).join("\n"),
    push: [push.stdout, push.stderr].filter(Boolean).join("\n"),
    online,
    indexNow: indexNowResult,
    baidu: baiduResult,
  };
}

async function handleStatus() {
  const status = await gitStatus();
  const latestSource = findLatestArticleSource();
  return {
    root,
    latestSource,
    gitStatus: status || "干净",
    hasDeployKey: fs.existsSync(deploy.key),
    deploy,
    baiduConfig: fs.existsSync(path.join(root, "private", "baidu-submit.json")),
    workbenchUrl: `http://${host}:${port}/`,
  };
}

async function handleGeoArticles() {
  const articles = await fetchGeoArticles();
  const statusWeight = { 已通过: 0, 待审核: 1, 审核中: 2, 已退回: 3 };
  return {
    ok: true,
    origin: geoWorkbench.origin,
    articles: articles
      .map(compactGeoArticle)
      .filter((article) => article.id && article.title)
      .sort((a, b) => {
        const aw = statusWeight[a.status] ?? 9;
        const bw = statusWeight[b.status] ?? 9;
        if (aw !== bw) return aw - bw;
        return cleanText(b.submittedAt).localeCompare(cleanText(a.submittedAt));
      }),
  };
}

async function handleGeoImport(payload) {
  const id = cleanText(payload.id);
  if (!id) throw new Error("请选择要导入的 GEO 工作台文章。");
  const articles = await fetchGeoArticles();
  const article = articles.find((item) => cleanText(item.id) === id);
  if (!article) throw new Error("没有在 GEO 工作台里找到这篇文章。");
  const draft = geoArticleToDraft(article);
  return {
    ok: true,
    origin: geoWorkbench.origin,
    draft,
    sourceArticle: compactGeoArticle(article),
  };
}

function serveSiteFile(req, res) {
  const url = new URL(req.url, `http://${host}:${port}`);
  let relative = decodeURIComponent(url.pathname.replace(/^\/site\/?/, ""));
  if (!relative || relative.endsWith("/")) {
    relative = path.join(relative, "index.html");
  }
  const absolute = path.resolve(root, relative);
  if (!absolute.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!fs.existsSync(absolute) || fs.statSync(absolute).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(absolute).toLowerCase();
  res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
  fs.createReadStream(absolute).pipe(res);
}

function renderWorkbench() {
  const today = shanghaiDate();
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>一路凯歌官网发布工作台</title>
    <style>
      :root {
        color-scheme: light;
        --navy: #071b32;
        --blue: #1557d4;
        --orange: #f36b21;
        --line: #dce3ec;
        --muted: #667085;
        --soft: #f5f8fc;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
        background: linear-gradient(180deg, #f7f9fc 0%, #fff 55%, #f3f6fb 100%);
        color: var(--navy);
      }
      header {
        padding: 28px clamp(18px, 4vw, 56px);
        background: #fff;
        border-bottom: 1px solid var(--line);
        position: sticky;
        top: 0;
        z-index: 5;
      }
      h1 { margin: 0 0 8px; font-size: clamp(26px, 4vw, 44px); letter-spacing: 0; }
      p { line-height: 1.8; }
      main {
        width: min(1240px, calc(100% - 32px));
        margin: 28px auto 70px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1.25fr .75fr;
        gap: 18px;
        align-items: start;
      }
      .panel {
        background: rgba(255,255,255,.92);
        border: 1px solid var(--line);
        border-radius: 8px;
        box-shadow: 0 16px 40px rgba(7, 27, 50, .06);
        padding: clamp(18px, 3vw, 28px);
      }
      .status {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      .stat {
        background: var(--soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 12px;
        min-height: 76px;
      }
      .stat strong { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px; }
      .stat span { font-weight: 800; overflow-wrap: anywhere; }
      .quick-import {
        margin-bottom: 24px;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 18px;
        background: linear-gradient(135deg, #f5f9ff 0%, #fff 58%, #fff6ef 100%);
      }
      .quick-head {
        display: flex;
        justify-content: space-between;
        gap: 14px;
        align-items: flex-start;
        margin-bottom: 12px;
      }
      .quick-head h2 { margin-bottom: 4px; }
      .geo-list {
        display: grid;
        gap: 10px;
        margin-top: 16px;
      }
      .geo-item {
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 14px;
        background: rgba(255,255,255,.9);
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        align-items: center;
      }
      .geo-item strong {
        display: block;
        font-size: 16px;
        line-height: 1.45;
        margin-bottom: 6px;
      }
      .geo-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        color: var(--muted);
        font-size: 13px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 4px 9px;
        background: #edf2f8;
        color: var(--navy);
        font-weight: 800;
      }
      .badge.pass { background: #e7f8ef; color: #067647; }
      label { display: block; font-weight: 800; margin: 16px 0 7px; }
      input, textarea, select {
        width: 100%;
        border: 1px solid #cfd8e3;
        border-radius: 8px;
        padding: 12px 13px;
        font: inherit;
        color: var(--navy);
        background: #fff;
      }
      textarea { min-height: 118px; resize: vertical; }
      .row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
      .section-card, .faq-card, .image-card, .reference-card {
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 16px;
        margin: 14px 0;
        background: #fff;
      }
      .section-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
      }
      .image-card {
        background: #f8fbff;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;
      }
      button, a.button {
        border: 0;
        border-radius: 999px;
        padding: 12px 18px;
        font-weight: 900;
        font-size: 15px;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      button.primary { background: var(--orange); color: #fff; }
      button.secondary, a.button { background: var(--navy); color: #fff; }
      button.ghost { background: #edf2f8; color: var(--navy); }
      button.danger { background: #fff0ea; color: #b83212; }
      button:disabled { opacity: .55; cursor: not-allowed; }
      .hint {
        color: var(--muted);
        font-size: 14px;
        margin: 6px 0 0;
      }
      pre {
        white-space: pre-wrap;
        word-break: break-word;
        background: #071b32;
        color: #dcecff;
        border-radius: 8px;
        padding: 16px;
        max-height: 520px;
        overflow: auto;
      }
      .ok { color: #067647; font-weight: 900; }
      .bad { color: #b42318; font-weight: 900; }
      .mini {
        font-size: 13px;
        padding: 8px 12px;
      }
      @media (max-width: 900px) {
        header { position: static; }
        .grid, .row, .status { grid-template-columns: 1fr; }
        .quick-head, .geo-item { grid-template-columns: 1fr; display: grid; }
        main { width: min(100% - 20px, 760px); }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>一路凯歌官网发布工作台</h1>
      <p class="hint">本地半自动发布：先生成和检查，再提交 GitHub、同步服务器、提交 IndexNow 和百度普通收录。</p>
    </header>
    <main>
      <div class="grid">
        <section class="panel">
          <div class="quick-import">
            <div class="quick-head">
              <div>
                <h2>从 GEO 工作台导入</h2>
                <p class="hint">先在 GEO 工作台完成内容审核，再从这里一键导入为官网新闻草稿。原来的手填字段保留，用来做发布前微调。</p>
              </div>
              <div class="actions" style="margin-top:0">
                <button class="secondary" type="button" onclick="loadGeoArticles()">读取 GEO 文案</button>
                <a class="button" href="http://127.0.0.1:3000/content/review" target="_blank">打开审核页</a>
              </div>
            </div>
            <div id="geoArticles" class="geo-list">
              <p class="hint">等待读取 GEO 工作台文章...</p>
            </div>
          </div>

          <h2>文章信息</h2>
          <div class="row">
            <div>
              <label>URL slug</label>
              <input id="slug" placeholder="geo-ai-brand-visibility" />
              <p class="hint">只用小写英文、数字、短横线。</p>
            </div>
            <div>
              <label>分类</label>
              <input id="category" value="GEO 优化" />
            </div>
          </div>

          <label>标题</label>
          <input id="title" placeholder="文章标题" />

          <label>摘要</label>
          <textarea id="summary" placeholder="新闻列表展示的摘要，建议 100-180 字。"></textarea>

          <label>关键词</label>
          <textarea id="keywords" placeholder="GEO优化,AI搜索优化,品牌AI推荐,一路凯歌"></textarea>

          <label>SEO 描述</label>
          <textarea id="seoDescription" placeholder="搜索引擎摘要，建议 120-200 字。"></textarea>

          <div class="row">
            <div>
              <label>发布日期</label>
              <input id="date" value="${today}" />
            </div>
            <div>
              <label>发布时间</label>
              <input id="datetime" placeholder="${today}T10:30:00+08:00" />
            </div>
          </div>

          <h2>封面信息</h2>
          <div class="row">
            <div>
              <label>封面小标</label>
              <input id="coverKicker" value="AI SEARCH GEO" />
            </div>
            <div>
              <label>封面副标题</label>
              <input id="coverTag" value="让品牌成为可引用答案来源" />
            </div>
          </div>
          <label>封面标题</label>
          <input id="coverTitle" placeholder="默认使用文章标题" />
          <label>封面要点</label>
          <textarea id="coverPoints">整理品牌信源
补齐问答入口
持续监测复盘</textarea>

          <h2>正文小节</h2>
          <p class="hint">每个小节可以放多段文字和多张图片。图片填写本机完整路径，工作台会复制到 assets，避免手动搬图。</p>
          <div id="sections"></div>
          <button class="ghost mini" type="button" onclick="addSection()">添加小节</button>

          <h2>FAQ</h2>
          <div id="faqs"></div>
          <button class="ghost mini" type="button" onclick="addFaq()">添加 FAQ</button>

          <h2>参考来源</h2>
          <p class="hint">不填则使用官网默认参考来源。</p>
          <div id="references"></div>
          <button class="ghost mini" type="button" onclick="addReference()">添加来源</button>

          <label>来源说明</label>
          <textarea id="sourceNote" placeholder="可选。用于文章里的参考来源说明。"></textarea>

          <div class="actions">
            <button class="ghost" type="button" onclick="saveDraft()">保存草稿</button>
            <button class="secondary" type="button" onclick="validateDraft()">检查草稿</button>
            <button class="primary" type="button" onclick="createArticle()">生成本地页面</button>
            <button class="secondary" type="button" onclick="checkLocal()">检查本地结果</button>
            <button class="primary" type="button" onclick="deployArticle()">提交并部署</button>
          </div>
        </section>

        <aside class="panel">
          <h2>当前状态</h2>
          <div class="status">
            <div class="stat"><strong>项目目录</strong><span id="repoRoot">读取中</span></div>
            <div class="stat"><strong>文章源</strong><span id="sourceFile">读取中</span></div>
            <div class="stat"><strong>服务器密钥</strong><span id="deployKey">读取中</span></div>
            <div class="stat"><strong>百度配置</strong><span id="baiduConfig">读取中</span></div>
          </div>
          <h3>操作日志</h3>
          <pre id="log">等待操作...</pre>
          <div class="actions">
            <a class="button" id="previewLink" href="/site/news.html" target="_blank">打开本地新闻页</a>
            <button class="ghost" type="button" onclick="loadStatus()">刷新状态</button>
          </div>
        </aside>
      </div>
    </main>

    <script>
      function el(id) { return document.getElementById(id); }
      function setLog(value) {
        el("log").textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
      }
      async function postJson(url, payload) {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload || {})
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "操作失败");
        }
        return data;
      }
      function text(id) { return el(id).value.trim(); }
      function setText(id, value) { el(id).value = value || ""; }

      function statusClass(status) {
        return status === "已通过" ? "badge pass" : "badge";
      }

      function renderGeoArticles(articles) {
        const box = el("geoArticles");
        box.innerHTML = "";
        if (!articles.length) {
          box.innerHTML = '<p class="hint">GEO 工作台暂时没有可导入的文章。</p>';
          return;
        }
        articles.slice(0, 12).forEach(function (article) {
          const item = document.createElement("div");
          item.className = "geo-item";
          const body = document.createElement("div");
          const title = document.createElement("strong");
          title.textContent = article.title;
          const meta = document.createElement("div");
          meta.className = "geo-meta";
          const status = document.createElement("span");
          status.className = statusClass(article.status);
          status.textContent = article.status || "未标记";
          const platform = document.createElement("span");
          platform.className = "badge";
          platform.textContent = article.platform || "未设置平台";
          const words = document.createElement("span");
          words.textContent = (article.wordCount || 0) + " 字";
          const score = document.createElement("span");
          score.textContent = "GEO " + (article.geoScore || 0);
          meta.append(status, platform, words, score);
          const preview = document.createElement("p");
          preview.className = "hint";
          preview.textContent = article.preview || "";
          body.append(title, meta, preview);

          const actions = document.createElement("div");
          const button = document.createElement("button");
          button.className = "primary mini";
          button.type = "button";
          button.textContent = "导入为官网草稿";
          button.onclick = function () { importGeoArticle(article.id); };
          actions.appendChild(button);
          item.append(body, actions);
          box.appendChild(item);
        });
      }

      async function loadGeoArticles() {
        try {
          el("geoArticles").innerHTML = '<p class="hint">正在读取 GEO 工作台文章...</p>';
          const data = await fetch("/api/geo/articles").then(function (response) { return response.json(); });
          if (!data.ok) throw new Error(data.error || "读取失败");
          renderGeoArticles(data.articles || []);
          setLog({ ok: true, message: "已读取 GEO 工作台文章", origin: data.origin, count: (data.articles || []).length });
        } catch (error) {
          el("geoArticles").innerHTML = '<p class="bad">读取失败：请确认 GEO 工作台正在 127.0.0.1:3000 运行。</p>';
          setLog(error.message);
        }
      }

      async function importGeoArticle(id) {
        try {
          setLog("正在从 GEO 工作台导入官网草稿...");
          const data = await postJson("/api/geo/import", { id: id });
          loadDraftObject(data.draft);
          localStorage.setItem("yilukaigePublishingDraft", JSON.stringify(collectDraft()));
          el("previewLink").href = "/site/news.html";
          setLog({ ok: true, message: "已导入官网草稿。请检查下方字段，然后生成本地页面。", sourceArticle: data.sourceArticle });
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
          setLog(error.message);
        }
      }

      function addSection(data) {
        data = data || {};
        const wrap = document.createElement("div");
        wrap.className = "section-card";
        wrap.innerHTML =
          '<div class="section-head"><strong>正文小节</strong><button class="danger mini" type="button">删除</button></div>' +
          '<label>小标题</label><input class="section-heading" placeholder="小节标题" />' +
          '<label>段落</label><textarea class="section-paragraphs" placeholder="每段之间空一行。"></textarea>' +
          '<label>要点列表</label><textarea class="section-bullets" placeholder="可选，每行一条。"></textarea>' +
          '<div class="images"></div>' +
          '<button class="ghost mini add-image" type="button">添加图片</button>';
        wrap.querySelector(".danger").onclick = function () { wrap.remove(); };
        wrap.querySelector(".add-image").onclick = function () { addImage(wrap); };
        wrap.querySelector(".section-heading").value = data.heading || "";
        wrap.querySelector(".section-paragraphs").value = Array.isArray(data.paragraphs) ? data.paragraphs.join("\\n\\n") : (data.paragraphs || "");
        wrap.querySelector(".section-bullets").value = Array.isArray(data.bullets) ? data.bullets.join("\\n") : (data.bullets || "");
        el("sections").appendChild(wrap);
        (data.images || []).forEach(function (image) { addImage(wrap, image); });
      }

      function addImage(sectionEl, data) {
        data = data || {};
        const wrap = document.createElement("div");
        wrap.className = "image-card";
        wrap.innerHTML =
          '<div class="section-head"><strong>图片</strong><button class="danger mini" type="button">删除</button></div>' +
          '<label>本机图片完整路径</label><input class="image-source" placeholder="C:\\\\Users\\\\gkaid\\\\Desktop\\\\image.png" />' +
          '<label>或已有 assets 路径</label><input class="image-asset-path" placeholder="assets/existing-image.png" />' +
          '<label>保存到 assets 的文件名</label><input class="image-asset-name" placeholder="可空，自动用 slug 命名" />' +
          '<label>图片说明 alt</label><input class="image-alt" placeholder="图片内容说明" />' +
          '<label>图片下方说明</label><textarea class="image-caption"></textarea>' +
          '<input type="hidden" class="image-data-url" />' +
          '<div class="row"><div><label>宽度</label><input class="image-width" placeholder="可空" /></div><div><label>高度</label><input class="image-height" placeholder="可空" /></div></div>';
        wrap.querySelector(".danger").onclick = function () { wrap.remove(); };
        wrap.querySelector(".image-source").value = data.sourcePath || "";
        wrap.querySelector(".image-asset-path").value = data.assetPath || "";
        wrap.querySelector(".image-asset-name").value = data.assetName || "";
        wrap.querySelector(".image-alt").value = data.alt || "";
        wrap.querySelector(".image-caption").value = data.caption || "";
        wrap.querySelector(".image-data-url").value = data.dataUrl || "";
        wrap.querySelector(".image-width").value = data.width || "";
        wrap.querySelector(".image-height").value = data.height || "";
        sectionEl.querySelector(".images").appendChild(wrap);
      }

      function addFaq(data) {
        data = data || {};
        const wrap = document.createElement("div");
        wrap.className = "faq-card";
        wrap.innerHTML =
          '<div class="section-head"><strong>FAQ</strong><button class="danger mini" type="button">删除</button></div>' +
          '<label>问题</label><input class="faq-question" />' +
          '<label>回答</label><textarea class="faq-answer"></textarea>';
        wrap.querySelector(".danger").onclick = function () { wrap.remove(); };
        wrap.querySelector(".faq-question").value = data.question || "";
        wrap.querySelector(".faq-answer").value = data.answer || "";
        el("faqs").appendChild(wrap);
      }

      function addReference(data) {
        data = data || {};
        const wrap = document.createElement("div");
        wrap.className = "reference-card";
        wrap.innerHTML =
          '<div class="section-head"><strong>来源</strong><button class="danger mini" type="button">删除</button></div>' +
          '<label>名称</label><input class="reference-label" />' +
          '<label>URL</label><input class="reference-url" />';
        wrap.querySelector(".danger").onclick = function () { wrap.remove(); };
        wrap.querySelector(".reference-label").value = data.label || "";
        wrap.querySelector(".reference-url").value = data.url || "";
        el("references").appendChild(wrap);
      }

      function collectDraft() {
        const sections = Array.from(document.querySelectorAll(".section-card")).map(function (section) {
          return {
            heading: section.querySelector(".section-heading").value,
            paragraphs: section.querySelector(".section-paragraphs").value,
            bullets: section.querySelector(".section-bullets").value,
            images: Array.from(section.querySelectorAll(".image-card")).map(function (image) {
              return {
                sourcePath: image.querySelector(".image-source").value,
                assetPath: image.querySelector(".image-asset-path").value,
                assetName: image.querySelector(".image-asset-name").value,
                dataUrl: image.querySelector(".image-data-url").value,
                alt: image.querySelector(".image-alt").value,
                caption: image.querySelector(".image-caption").value,
                width: image.querySelector(".image-width").value,
                height: image.querySelector(".image-height").value
              };
            })
          };
        });
        const faqs = Array.from(document.querySelectorAll(".faq-card")).map(function (faq) {
          return {
            question: faq.querySelector(".faq-question").value,
            answer: faq.querySelector(".faq-answer").value
          };
        });
        const references = Array.from(document.querySelectorAll(".reference-card")).map(function (reference) {
          return {
            label: reference.querySelector(".reference-label").value,
            url: reference.querySelector(".reference-url").value
          };
        });
        return {
          slug: text("slug"),
          title: text("title"),
          summary: text("summary"),
          category: text("category"),
          keywords: text("keywords"),
          seoDescription: text("seoDescription"),
          date: text("date"),
          datetime: text("datetime"),
          coverKicker: text("coverKicker"),
          coverTitle: text("coverTitle"),
          coverTag: text("coverTag"),
          coverPoints: text("coverPoints"),
          sourceNote: text("sourceNote"),
          sections: sections,
          faqs: faqs,
          references: references
        };
      }

      function loadDraftObject(draft) {
        setText("slug", draft.slug);
        setText("title", draft.title);
        setText("summary", draft.summary);
        setText("category", draft.category || "GEO 优化");
        setText("keywords", draft.keywords);
        setText("seoDescription", draft.seoDescription);
        setText("date", draft.date);
        setText("datetime", draft.datetime);
        setText("coverKicker", draft.coverKicker || "AI SEARCH GEO");
        setText("coverTitle", draft.coverTitle);
        setText("coverTag", draft.coverTag || "让品牌成为可引用答案来源");
        setText("coverPoints", draft.coverPoints || "整理品牌信源\\n补齐问答入口\\n持续监测复盘");
        setText("sourceNote", draft.sourceNote);
        el("sections").innerHTML = "";
        el("faqs").innerHTML = "";
        el("references").innerHTML = "";
        (draft.sections || []).forEach(addSection);
        (draft.faqs || []).forEach(addFaq);
        (draft.references || []).forEach(addReference);
      }

      function saveDraft() {
        localStorage.setItem("yilukaigePublishingDraft", JSON.stringify(collectDraft()));
        setLog("草稿已保存到本机浏览器。");
      }

      function restoreDraft() {
        const saved = localStorage.getItem("yilukaigePublishingDraft");
        if (saved) {
          loadDraftObject(JSON.parse(saved));
          return;
        }
        addSection();
        addSection();
        addSection();
        addFaq();
        addFaq();
        addFaq();
        addFaq();
      }

      async function validateDraft() {
        try {
          const data = await postJson("/api/validate-draft", { draft: collectDraft() });
          setLog(data);
        } catch (error) {
          setLog(error.message);
        }
      }

      async function createArticle() {
        if (!confirm("确认生成本地文章页面？这一步会修改本地仓库文件，但不会部署到线上。")) return;
        try {
          setLog("正在生成本地页面...");
          const data = await postJson("/api/create-article", { draft: collectDraft() });
          el("previewLink").href = data.previewUrl;
          setLog(data);
          await loadStatus();
        } catch (error) {
          setLog(error.message);
        }
      }

      async function checkLocal() {
        try {
          const draft = collectDraft();
          const data = await postJson("/api/check-local", { slug: draft.slug, title: draft.title });
          setLog(data);
        } catch (error) {
          setLog(error.message);
        }
      }

      async function deployArticle() {
        const draft = collectDraft();
        if (!draft.slug || !draft.title) {
          setLog("请先填写 slug 和标题。");
          return;
        }
        if (!confirm("确认提交 GitHub、同步服务器并提交收录？这一步会影响线上网站。")) return;
        try {
          setLog("正在提交、部署和提交收录...");
          const data = await postJson("/api/deploy", {
            slug: draft.slug,
            title: draft.title,
            commitMessage: "Publish news article " + draft.slug
          });
          setLog(data);
          await loadStatus();
        } catch (error) {
          setLog(error.message);
        }
      }

      async function loadStatus() {
        try {
          const data = await fetch("/api/status").then(function (response) { return response.json(); });
          el("repoRoot").textContent = data.root;
          el("sourceFile").textContent = data.latestSource;
          el("deployKey").innerHTML = data.hasDeployKey ? '<span class="ok">已找到</span>' : '<span class="bad">未找到</span>';
          el("baiduConfig").innerHTML = data.baiduConfig ? '<span class="ok">已配置</span>' : '<span class="bad">未配置</span>';
          if (el("log").textContent === "等待操作...") setLog(data);
        } catch (error) {
          setLog(error.message);
        }
      }

      restoreDraft();
      loadStatus();
      loadGeoArticles();
      const autoGeoArticleId = new URLSearchParams(window.location.search).get("geoArticleId");
      if (autoGeoArticleId) {
        importGeoArticle(autoGeoArticleId);
      }
    </script>
  </body>
</html>`;
}

async function route(req, res) {
  const url = new URL(req.url, `http://${host}:${port}`);
  try {
    if (req.method === "GET" && url.pathname === "/") {
      writeHtml(res, renderWorkbench());
      return;
    }
    if (req.method === "GET" && url.pathname.startsWith("/site/")) {
      serveSiteFile(req, res);
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/status") {
      writeJson(res, 200, await handleStatus());
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/geo/articles") {
      writeJson(res, 200, await handleGeoArticles());
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/geo/import") {
      const payload = await readJsonBody(req);
      writeJson(res, 200, await handleGeoImport(payload));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/validate-draft") {
      const payload = await readJsonBody(req);
      const article = normalizeDraft(payload);
      writeJson(res, 200, { ok: true, article, latestSource: findLatestArticleSource() });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/create-article") {
      const payload = await readJsonBody(req);
      writeJson(res, 200, await handleCreateArticle(payload));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/check-local") {
      const payload = await readJsonBody(req);
      const checks = checkGenerated(cleanText(payload.slug), cleanText(payload.title));
      writeJson(res, 200, { ok: true, checks, previewUrl: `http://${host}:${port}/site/news/${cleanText(payload.slug)}.html` });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/deploy") {
      const payload = await readJsonBody(req);
      writeJson(res, 200, await handleDeploy(payload));
      return;
    }
    writeJson(res, 404, { error: "Not found" });
  } catch (error) {
    writeJson(res, 400, { error: error.message, detail: error.result });
  }
}

const server = http.createServer((req, res) => {
  route(req, res);
});

server.listen(port, host, () => {
  console.log(`Publishing workbench: http://${host}:${port}/`);
});
