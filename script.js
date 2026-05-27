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

  const wechatIcon = `
    <svg class="mobile-contact-svg mobile-contact-svg-wechat" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M25.5 16.5C15 16.5 6.5 23 6.5 31c0 4.5 2.7 8.4 7 11.1l-1.2 4.5 5.3-2.4c2.4.8 5 1.2 7.9 1.2.8 0 1.6 0 2.4-.1-1.2-1.8-1.9-3.8-1.9-6 0-8.2 8.4-14.8 18.7-14.8.6 0 1.2 0 1.8.1-2.7-4.8-10.8-8.1-21-8.1Z" fill="currentColor"/>
      <path d="M45.5 27.8c-8.6 0-15.6 5.2-15.6 11.6S36.9 51 45.5 51c1.8 0 3.6-.2 5.2-.7l4.7 2.1-1.1-3.8c4.2-2.1 6.8-5.5 6.8-9.2 0-6.4-7-11.6-15.6-11.6Z" fill="currentColor"/>
      <circle cx="19.2" cy="29.5" r="2.1" fill="var(--wechat-dot, #16c43b)"/>
      <circle cx="31.4" cy="29.5" r="2.1" fill="var(--wechat-dot, #16c43b)"/>
      <circle cx="40.4" cy="38.6" r="1.8" fill="var(--wechat-dot, #16c43b)"/>
      <circle cx="50.4" cy="38.6" r="1.8" fill="var(--wechat-dot, #16c43b)"/>
    </svg>
  `;
  const phoneIcon = `
    <svg class="mobile-contact-svg mobile-contact-svg-phone" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M33.7 31.1c-1.2-.7-2.7-.5-3.7.4l-1.9 1.6c-.7.6-1.7.7-2.5.2-2.2-1.3-4.1-2.8-5.8-4.5-1.7-1.7-3.2-3.7-4.5-5.8-.5-.8-.4-1.8.2-2.5l1.6-1.9c.9-1.1 1-2.5.4-3.7l-2.6-4.6c-.8-1.5-2.6-2.1-4.2-1.4L8.3 10c-1.8.8-2.9 2.6-2.6 4.6 1.1 7.3 4.4 13.8 9.5 18.9 5.1 5.1 11.6 8.4 18.9 9.5 1.9.3 3.8-.8 4.6-2.6l1.1-2.4c.7-1.5.1-3.4-1.4-4.2l-4.7-2.7Z" fill="currentColor"/>
    </svg>
  `;
  const bar = document.createElement("div");
  bar.className = "mobile-contact-bar";
  bar.dataset.mobileContactBar = "";
  bar.innerHTML = `
    <button class="mobile-contact-action mobile-contact-wechat" type="button" aria-label="复制微信号 guandihui">
      <span class="mobile-contact-icon" aria-hidden="true">${wechatIcon}</span>
      <span><b>添加微信</b><small>guandihui</small></span>
    </button>
    <a class="mobile-contact-action mobile-contact-phone" href="tel:${phoneNumber}" aria-label="拨打语音 ${phoneNumber}">
      <span class="mobile-contact-icon" aria-hidden="true">${phoneIcon}</span>
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
