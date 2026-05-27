const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const header = document.querySelector("[data-header]");
let previousY = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    const currentY = window.scrollY;
    if (currentY > 120 && currentY > previousY) {
      header.style.transform = "translateY(-110%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    previousY = currentY;
  },
  { passive: true }
);

const leadForm = document.querySelector("[data-lead-form]");
const formMessage = document.querySelector("[data-form-message]");

const setFormMessage = (message, isSuccess = false) => {
  if (!formMessage) return;
  formMessage.textContent = message;
  formMessage.classList.toggle("is-success", isSuccess);
};

const saveLeadFallback = (lead) => {
  const key = "yilukaige_pending_leads";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.unshift({
    ...lead,
    id: `local-${Date.now()}`,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
};

if (leadForm) {
  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = leadForm.querySelector("button[type='submit']");
    const formData = new FormData(leadForm);
    const lead = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value).trim()])
    );
    lead.source = window.location.href;

    if (!lead.name || !lead.phone || !lead.brand) {
      setFormMessage("请先填写姓名、电话和想优化的品牌。");
      return;
    }

    if (lead.phone.replace(/\D/g, "").length < 7) {
      setFormMessage("请填写可联系的电话号码。");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "正在提交...";
    setFormMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });

      if (!response.ok) {
        throw new Error("lead api unavailable");
      }

      leadForm.reset();
      setFormMessage("已收到诊断需求，稍后会通过电话沟通。", true);
    } catch (error) {
      saveLeadFallback(lead);
      setFormMessage("当前预览环境未连接后台，信息已临时保存在此浏览器；也可以直接拨打 18610730255。");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "提交诊断需求";
    }
  });
}

const wechatId = "guandihui";
const phoneNumber = "18610730255";

const showMobileContactToast = (message) => {
  let toast = document.querySelector("[data-mobile-contact-toast]");
  if (!toast) {
    toast = document.createElement("p");
    toast.className = "mobile-contact-toast";
    toast.dataset.mobileContactToast = "";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showMobileContactToast.timer);
  showMobileContactToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
};

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
};

const mountMobileContactBar = () => {
  if (document.querySelector("[data-mobile-contact-bar]")) return;

  const bar = document.createElement("div");
  bar.className = "mobile-contact-bar";
  bar.dataset.mobileContactBar = "";
  bar.innerHTML = `
    <button class="mobile-contact-action mobile-contact-wechat" type="button" aria-label="复制微信号 guandihui">
      <span class="mobile-contact-icon" aria-hidden="true">微</span>
      <span><b>添加微信</b><small>guandihui</small></span>
    </button>
    <a class="mobile-contact-action mobile-contact-phone" href="tel:${phoneNumber}" aria-label="拨打语音 ${phoneNumber}">
      <span class="mobile-contact-icon" aria-hidden="true">电</span>
      <span><b>拨打语音</b><small>${phoneNumber}</small></span>
    </a>
  `;

  bar.querySelector(".mobile-contact-wechat").addEventListener("click", async () => {
    try {
      await copyText(wechatId);
      showMobileContactToast("微信号 guandihui 已复制");
    } catch (error) {
      showMobileContactToast("微信号：guandihui");
    }
  });

  document.body.append(bar);
};

mountMobileContactBar();
