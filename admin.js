const tokenForm = document.querySelector("[data-token-form]");
const tokenInput = tokenForm?.querySelector("input[name='token']");
const message = document.querySelector("[data-admin-message]");
const leadsBody = document.querySelector("[data-leads-body]");
const searchInput = document.querySelector("[data-search]");
const refreshButton = document.querySelector("[data-refresh]");
const exportButton = document.querySelector("[data-export]");
const statTotal = document.querySelector("[data-stat-total]");
const statToday = document.querySelector("[data-stat-today]");
const statLatest = document.querySelector("[data-stat-latest]");

const tokenKey = "yilukaige_admin_token";
let adminToken = localStorage.getItem(tokenKey) || "";
let leads = [];
let searchTimer;

if (tokenInput) {
  tokenInput.value = adminToken;
}

const setMessage = (text, isError = false) => {
  if (!message) return;
  message.textContent = text;
  message.classList.toggle("is-error", isError);
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

const updateStats = () => {
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = leads.filter((lead) => String(lead.createdAt || "").startsWith(today)).length;
  statTotal.textContent = String(leads.length);
  statToday.textContent = String(todayCount);
  statLatest.textContent = leads[0]?.createdAt ? formatDate(leads[0].createdAt) : "-";
};

const renderLeads = () => {
  leadsBody.innerHTML = "";

  if (!leads.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "暂无数据";
    row.appendChild(cell);
    leadsBody.appendChild(row);
    updateStats();
    return;
  }

  leads.forEach((lead) => {
    const row = document.createElement("tr");
    [
      formatDate(lead.createdAt),
      lead.name,
      lead.phone,
      lead.brand,
      lead.website,
      lead.need
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value || "-";
      row.appendChild(cell);
    });
    leadsBody.appendChild(row);
  });

  updateStats();
};

const loadLeads = async () => {
  const query = searchInput?.value.trim() || "";
  if (!adminToken) {
    setMessage("请输入管理口令。", true);
    return;
  }

  setMessage("正在读取线索...");
  try {
    const response = await fetch(`/api/leads?q=${encodeURIComponent(query)}`, {
      headers: { "x-admin-token": adminToken }
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "读取失败");
    }

    leads = payload.leads || [];
    renderLeads();
    setMessage(`已加载 ${leads.length} 条线索。`);
  } catch (error) {
    leads = [];
    renderLeads();
    setMessage(`无法读取后台数据：${error.message}`, true);
  }
};

tokenForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  adminToken = tokenInput.value.trim() || "local-dev";
  tokenInput.value = adminToken;
  localStorage.setItem(tokenKey, adminToken);
  loadLeads();
});

refreshButton?.addEventListener("click", loadLeads);

searchInput?.addEventListener("input", () => {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(loadLeads, 260);
});

exportButton?.addEventListener("click", () => {
  if (!adminToken) {
    setMessage("请输入管理口令后再导出。", true);
    return;
  }
  window.location.href = `/api/leads.csv?token=${encodeURIComponent(adminToken)}`;
});

if (adminToken) {
  loadLeads();
}
