import fs from "fs";
import path from "path";
import { june5Articles } from "./news-articles-20260605.mjs";
import { june6Articles } from "./news-articles-20260606.mjs";
import { june7Articles } from "./news-articles-20260607.mjs";
import { june8Articles } from "./news-articles-20260608.mjs";
import { june9Articles } from "./news-articles-20260609.mjs";

const root = process.cwd();
const siteUrl = "https://www.yilukaige.com";
const orgName = "北京一路凯歌网络科技有限公司";
const brandName = "一路凯歌";
const brandSameAs = [
  "https://baike.baidu.com/item/%E4%B8%80%E8%B7%AF%E5%87%AF%E6%AD%8C/58297174",
];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content);
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(text) {
  return String(text).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function escapeXml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildReferenceNote(article) {
  const title = article.title.replace(/[。！？?！]$/u, "");
  const topic = article.category || "企业 GEO 与 AI 搜索优化";
  const referenceCount = article.references?.length ?? 0;
  const sourcePhrase = referenceCount > 1 ? `结合 ${referenceCount} 份公开资料` : "结合下方公开资料";
  return `本文围绕“${title}”展开，${sourcePhrase}及一路凯歌在“${topic}”方向的执行经验整理，重点看它对官网可引用结构、FAQ 设计和后续获客复盘的影响。`;
}

function indent(text, count) {
  const pad = " ".repeat(count);
  return text
    .split("\n")
    .map((line) => `${pad}${line}`)
    .join("\n");
}

function normalizeHref(fromFile, href) {
  const fromDir = path.posix.dirname(`/${fromFile}`);
  return path.posix.normalize(path.posix.join(fromDir, href));
}

function parseArticleFile(slug) {
  const html = read(`news/${slug}.html`);
  const title = html.match(/<h1>([^<]+)<\/h1>/)?.[1] ?? slug;
  const summary =
    html
      .match(/<section class="article-hero reveal">[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1]
      ?.replace(/\s+/g, " ")
      .trim() ?? "";
  const category =
    html.match(/<div class="article-meta"><time[^>]+>[^<]+<\/time><span>([^<]+)<\/span>/)?.[1] ?? "";
  const date = html.match(/<time datetime="([^"]+)">/)?.[1] ?? "2026-05-27";
  const datetime =
    html.match(/<meta property="article:published_time" content="([^"]+)"/)?.[1] ??
    `${date}T09:30:00+08:00`;
  return {
    slug,
    title,
    summary,
    category,
    date,
    datetime,
    feedDate: withShanghaiFeedDate(datetime),
    url: `${siteUrl}/news/${slug}.html`,
  };
}

function withShanghaiFeedDate(datetime) {
  const [datePart, timePartWithZone] = datetime.split("T");
  const [timePart] = timePartWithZone.split("+");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - 8, minute, second));
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${weekdays[utcDate.getUTCDay()]}, ${String(day).padStart(2, "0")} ${months[month - 1]} ${year} ${timePart} +0800`;
}

function getCurrentOrderedSlugs() {
  const html = read("news.html");
  const slugs = [];
  for (const match of html.matchAll(/https:\/\/www\.yilukaige\.com\/news\/([a-z0-9-]+)\.html/g)) {
    const slug = match[1];
    if (!slugs.includes(slug)) {
      slugs.push(slug);
    }
  }
  if (!slugs.length) {
    throw new Error("Could not determine current article order from news.html");
  }
  return slugs;
}

function buildArticleJsonLd(article) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.seoDescription,
      image: [`${siteUrl}/${article.coverPath}`],
      datePublished: article.datetime,
      dateModified: article.datetime,
      author: {
        "@type": "Organization",
        name: orgName,
        url: `${siteUrl}/`,
        sameAs: brandSameAs,
      },
      publisher: {
        "@type": "Organization",
        name: orgName,
        sameAs: brandSameAs,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/assets/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteUrl}/news/${article.slug}.html`,
      },
      articleSection: article.category,
      keywords: article.keywords.split(","),
      citation: article.references.map((reference) => reference.url),
      inLanguage: "zh-CN",
    },
    null,
    6,
  );
}

function buildFaqJsonLd(article) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    null,
    6,
  );
}

function buildBreadcrumbJsonLd(article) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首页",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "行业资讯",
          item: `${siteUrl}/news.html`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: `${siteUrl}/news/${article.slug}.html`,
        },
      ],
    },
    null,
    6,
  );
}

function buildArticleNav(article, allArticles) {
  const index = allArticles.findIndex((item) => item.slug === article.slug);
  const prev = index > 0 ? allArticles[index - 1] : null;
  const next = index < allArticles.length - 1 ? allArticles[index + 1] : null;
  return `          <div class="article-nav">
            ${prev ? `<a href="${prev.slug}.html">上一篇：${prev.title}</a>` : `<a href="../news.html">返回资讯列表</a>`}
            ${next ? `<a href="${next.slug}.html">下一篇：${next.title}</a>` : `<a href="../news.html">返回资讯列表</a>`}
          </div>`;
}

function buildCoverSvg(article) {
  const cover = article.cover ?? {};
  const colors = cover.colors ?? ["#0b1f3b", "#17355d", "#f36b21", "#f8efe5"];
  const points = (cover.points ?? []).slice(0, 3);
  const shortTitle = cover.title ?? article.title;
  const kicker = cover.kicker ?? article.category;
  const tag = cover.tag ?? "一路凯歌 GEO";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cover-bg" x1="72" y1="54" x2="1088" y2="576" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${escapeXml(colors[0])}"/>
      <stop offset="0.55" stop-color="${escapeXml(colors[1])}"/>
      <stop offset="1" stop-color="${escapeXml(colors[2])}"/>
    </linearGradient>
    <radialGradient id="cover-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(978 92) rotate(136.331) scale(371.728 399.744)">
      <stop stop-color="${escapeXml(colors[3])}" stop-opacity="0.78"/>
      <stop offset="1" stop-color="${escapeXml(colors[3])}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" rx="32" fill="url(#cover-bg)"/>
  <rect x="36" y="36" width="1128" height="558" rx="28" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)"/>
  <circle cx="1005" cy="114" r="226" fill="url(#cover-glow)"/>
  <path d="M835 506C889.5 421.5 958.5 373 1082 333.5" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
  <path d="M772 540C841 412 951 317 1116 236" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
  <rect x="72" y="74" width="184" height="42" rx="21" fill="rgba(255,255,255,0.14)"/>
  <text x="104" y="102" fill="#F8F4EE" font-size="18" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="700">${escapeXml(kicker)}</text>
  <text x="72" y="210" fill="#FFFFFF" font-size="62" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="800">${escapeXml(shortTitle)}</text>
  <text x="72" y="276" fill="rgba(255,255,255,0.82)" font-size="25" font-family="PingFang SC, Microsoft YaHei, sans-serif">${escapeXml(tag)}</text>
  ${points
    .map(
      (point, index) => `<rect x="72" y="${338 + index * 70}" width="18" height="18" rx="9" fill="#F7B58B"/><text x="104" y="${353 + index * 70}" fill="#F6F1EA" font-size="28" font-family="PingFang SC, Microsoft YaHei, sans-serif">${escapeXml(point)}</text>`,
    )
    .join("\n  ")}
  <rect x="72" y="518" width="248" height="44" rx="22" fill="rgba(255,255,255,0.12)"/>
  <text x="104" y="547" fill="#FFFFFF" font-size="20" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="700">一路凯歌 GEO优化与企业AI服务</text>
  <text x="871" y="558" fill="rgba(255,255,255,0.70)" font-size="18" font-family="Avenir Next Condensed, Arial Narrow, sans-serif" letter-spacing="2">YILUKAIGE · AI SEARCH GROWTH</text>
</svg>
`;
}

function ensureCoverAsset(article) {
  const coverPath = path.join(root, article.coverPath);
  write(article.coverPath, buildCoverSvg(article));
  return coverPath;
}

function articleBodyHtml(article) {
  const sectionHtml = article.sections
    .map((section) => {
      const parts = [
        `          <h2>${section.heading}</h2>`,
        ...section.paragraphs.map((paragraph) => `          <p>${paragraph}</p>`),
      ];
      if (section.bullets?.length) {
        parts.push("          <ul>");
        for (const bullet of section.bullets) {
          parts.push(`            <li>${bullet}</li>`);
        }
        parts.push("          </ul>");
      }
      return parts.join("\n");
    })
    .join("\n\n");

  const faqHtml = article.faqs
    .map(
      (faq) =>
        `            <article class="faq-item reveal">\n              <h3>${faq.question}</h3>\n              <p>${faq.answer}</p>\n            </article>`,
    )
    .join("\n");

  const refsHtml = article.references
    .map(
      (reference) =>
        `            <li><a href="${reference.url}" target="_blank" rel="noopener noreferrer">${reference.label}</a></li>`,
    )
    .join("\n");

  return { sectionHtml, faqHtml, refsHtml };
}

function buildGeneratedArticlePage(article, allArticles) {
  const { sectionHtml, faqHtml, refsHtml } = articleBodyHtml(article);
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${article.title} | ${brandName}</title>
    <meta name="description" content="${escapeHtml(article.seoDescription)}" />
    <meta name="keywords" content="${escapeHtml(article.keywords)}" />
    <meta name="author" content="${orgName}" />
    <meta name="applicable-device" content="pc,mobile" />
    <meta name="renderer" content="webkit" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${siteUrl}/news/${article.slug}.html" />
    <link rel="icon" href="../assets/logo.png" type="image/png" />
    <link rel="apple-touch-icon" href="../assets/logo.png" />
    <link rel="alternate" type="application/rss+xml" title="${brandName}行业资讯" href="${siteUrl}/feed.xml" />
    <meta name="theme-color" content="#0B1F3B" />
    <meta property="og:title" content="${escapeHtml(article.title)} | ${brandName}" />
    <meta property="og:description" content="${escapeHtml(article.summary)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${siteUrl}/news/${article.slug}.html" />
    <meta property="og:site_name" content="${brandName}" />
    <meta property="article:published_time" content="${article.datetime}" />
    <meta property="article:modified_time" content="${article.datetime}" />
    <meta property="article:author" content="${orgName}" />
    <meta property="article:section" content="${escapeHtml(article.category)}" />
    <meta property="og:image" content="${siteUrl}/${article.coverPath}" />
    <meta property="og:image:alt" content="${escapeAttribute(article.coverAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(article.title)} | ${brandName}" />
    <meta name="twitter:description" content="${escapeHtml(article.summary)}" />
    <meta name="twitter:image" content="${siteUrl}/${article.coverPath}" />
    <meta name="twitter:image:alt" content="${escapeAttribute(article.coverAlt)}" />
    <link rel="stylesheet" href="../styles.css" />
    <script type="application/ld+json" data-seo="article">
${indent(buildArticleJsonLd(article), 6)}
    </script>
    <script type="application/ld+json" data-seo="breadcrumb">
${indent(buildBreadcrumbJsonLd(article), 6)}
    </script>
    <script type="application/ld+json" data-seo="faq">
${indent(buildFaqJsonLd(article), 6)}
    </script>
  </head>
  <body>
    <header class="site-header" data-header>
      <a class="brand" href="../index.html#top" aria-label="${brandName}返回首页"><span class="brand-mark"><img src="../assets/logo-header.png" alt="${brandName}品牌标志" /></span><span><strong>${brandName}</strong><small>AI Search Growth</small></span></a>
      <nav class="nav" aria-label="主导航"><a href="../about/">关于</a><a href="../index.html#advantages">优势</a><a href="../index.html#services">服务</a><a href="../index.html#cases">场景</a><a href="../news.html" aria-current="page">资讯</a><a href="../index.html#contact">联系</a></nav>
      <a class="header-cta" href="tel:18610730255">18610730255</a>
    </header>

    <main class="article-page">
      <section class="article-hero reveal">
        <div class="article-meta"><time datetime="${article.date}">${article.date}</time><span>${article.category}</span></div>
        <h1>${article.title}</h1>
        <p>${article.summary}</p>
        <figure class="article-cover">
          <img src="../${article.coverPath}" alt="${escapeAttribute(article.coverAlt)}" width="1200" height="630" loading="eager" />
        </figure>
      </section>

      <section class="article-shell">
        <article class="article-body reveal">
${sectionHtml}

          <div class="article-note">${article.sourceNote}</div>

          <h2>要点总结</h2>
          <ul>
            <li>${article.faqs[0].answer}</li>
            <li>${article.faqs[1].answer}</li>
            <li>${article.faqs[2].answer}</li>
          </ul>

          <h2>参考来源说明</h2>
          <p>${escapeHtml(buildReferenceNote(article))}</p>
          <ul>
${refsHtml}
          </ul>

${buildArticleNav(article, allArticles)}
        </article>
        <aside class="article-aside reveal">
          <div class="aside-card"><span>Method</span><strong>先做可引用结构</strong><p>把品牌定义、FAQ、案例与来源说明写清楚，才能同时服务搜索收录与 AI 引用。</p><a href="../index.html#services">查看 GEO 服务</a></div>
          <div class="aside-card"><span>Contact</span><strong>需要诊断？</strong><p>一路凯歌可基于官网与资讯体系，诊断品牌在 AI 搜索里的可见性与内容缺口。</p><a href="../index.html#contact">预约诊断</a></div>
        </aside>
      </section>

      <section class="section faq-section">
        <div class="section-heading reveal">
          <p class="eyebrow">FAQ</p>
          <h2>延伸问答</h2>
          <p>围绕本文主题，进一步拆解企业在 GEO 与 AI 搜索优化中的落地问题。</p>
        </div>
        <div class="faq-grid">
${faqHtml}
        </div>
      </section>
    </main>

    <footer class="site-footer"><div class="footer-main"><div class="footer-brand"><a class="brand" href="../index.html#top" aria-label="${brandName}返回首页"><span class="brand-mark"><img src="../assets/logo.png" alt="${brandName}品牌标志" /></span><span><strong>${brandName}</strong><small>AI Search Growth</small></span></a><p>专注 GEO 生成式引擎优化，帮助企业把真实能力沉淀成 AI 可理解、可引用、可推荐的品牌知识资产。</p><div class="footer-contact"><a href="tel:18610730255">18610730255</a><span>北京市</span></div></div><nav class="footer-links" aria-label="页脚导航"><div><h3>服务</h3><a href="../index.html#services">GEO 服务</a><a href="../index.html#advantages">核心优势</a><a href="../index.html#cases">适用场景</a></div><div><h3>公司</h3><a href="../about/">关于我们</a><a href="../news.html">行业资讯</a><a href="../index.html#contact">联系我们</a></div><div><h3>资源</h3><a href="../index.html#faq">常见问题</a><a href="../llms.txt">AI 索引文件</a><a href="../sitemap.xml">站点地图</a></div></nav></div><div class="footer-bottom"><span>© 2026 ${orgName}. All Rights Reserved.</span></div></footer>
    <script src="../script.js"></script>
  </body>
</html>
`;
}

function replaceSection(source, startMarker, endMarker, replacement) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not replace section between ${startMarker} and ${endMarker}`);
  }
  return source.slice(0, start) + replacement + source.slice(end);
}

function buildNewsItemListJson(allArticles) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${brandName}行业资讯文章列表`,
      itemListElement: allArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: article.url,
        name: article.title,
      })),
    },
    null,
    10,
  );
}

function updateNewsPage(allArticles) {
  let html = read("news.html");
  const featured = allArticles[0];
  const newsDescription = "一路凯歌行业资讯，持续更新 GEO 生成式引擎优化、AI 搜索、品牌结构化内容、GA4 AI 流量归因与中文大模型入口相关观察。";
  const cards = allArticles
    .map(
      (article) => `          <a class="article-card reveal" href="news/${article.slug}.html">\n            <time datetime="${article.date}">${article.date}</time>\n            <span>${article.category}</span>\n            <h3>${article.title}</h3>\n            <p>${article.summary}</p>\n            <b class="read-link">阅读全文</b>\n          </a>`,
    )
    .join("\n");

  html = html.replace(
    /<script type="application\/ld\+json" data-seo="item-list">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" data-seo="item-list">${indent(buildNewsItemListJson(allArticles), 10)}</script>`,
  );

  const featureReplacement = `      <section class="section news-feature">\n        <a class="featured-article reveal" href="news/${featured.slug}.html" aria-label="阅读全文：${featured.title}">\n          <div>\n            <time datetime="${featured.date}">${featured.date}</time>\n            <span>${featured.category}</span>\n          </div>\n          <h2>${featured.title}</h2>\n          <p>${featured.summary}</p>\n          <b class="read-link">阅读全文</b>\n        </a>\n      </section>\n\n`;
  html = replaceSection(html, '      <section class="section news-feature">', '      <section class="section news-list-section">', featureReplacement);

  const listStart = '        <div class="article-grid">';
  const listEnd = "        </div>\n      </section>";
  const listReplacement = `        <div class="article-grid">\n${cards}\n        </div>\n      </section>`;
  html = replaceSection(html, listStart, listEnd, listReplacement);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${newsDescription}" />`,
  );
  html = html.replace(
    /<meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="一路凯歌,GEO优化,生成式引擎优化,AI搜索优化,AI品牌可见性,企业内容结构化,AI搜索流量分析,DeepSeek优化,豆包优化,Kimi优化,通义千问优化,腾讯元宝优化" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${newsDescription}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${newsDescription}" />`,
  );
  html = html.replace(/"description": "[^"]+"/, `"description": "${newsDescription}"`);
  write("news.html", html);
}

function updateHomePage(allArticles) {
  let html = read("index.html");
  const latestSix = allArticles.slice(0, 6);
  const cards = latestSix
    .map(
      (article) => `          <a class="insight-card reveal" href="news/${article.slug}.html">\n            <time datetime="${article.date}">${article.date}</time>\n            <h3>${article.title}</h3>\n            <p>${article.summary}</p>\n            <b class="read-link">阅读全文</b>\n          </a>`,
    )
    .join("\n");
  const replacement = `      <section class="section" id="insights">\n        <div class="section-heading reveal">\n          <p class="eyebrow">Insights</p>\n          <h2>行业资讯</h2>\n          <p>同步更新最新 GEO、AI 搜索、数据衡量与品牌知识资产观察。</p>\n        </div>\n        <div class="insight-grid">\n${cards}\n        </div>\n        <div class="insight-actions reveal">\n          <a class="btn btn-secondary" href="news.html">查看全部行业资讯</a>\n        </div>\n      </section>\n\n`;
  html = replaceSection(html, '      <section class="section" id="insights">', '      <section class="section faq-section" id="faq">', replacement);
  write("index.html", html);
}

function updateSitemap(allArticles) {
  const latestDate = allArticles[0]?.date ?? "2026-06-05";
  const staticUrls = [
    { loc: `${siteUrl}/`, priority: "1.0", changefreq: "weekly", lastmod: latestDate },
    { loc: `${siteUrl}/about/`, priority: "0.8", changefreq: "monthly", lastmod: "2026-06-07" },
    { loc: `${siteUrl}/news.html`, priority: "0.8", changefreq: "daily", lastmod: latestDate },
  ];
  const dynamicUrls = allArticles.map((article) => ({
    loc: `${siteUrl}/news/${article.slug}.html`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: article.date,
  }));
  const entries = [...staticUrls, ...dynamicUrls]
    .map(
      (item) => `  <url>\n    <loc>${item.loc}</loc>\n    <lastmod>${item.lastmod}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`,
    )
    .join("\n");
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
  );
}

function updateFeed(allArticles) {
  const items = allArticles
    .slice(0, 20)
    .map(
      (article) => `    <item>\n      <title>${escapeHtml(article.title)}</title>\n      <link>${siteUrl}/news/${article.slug}.html</link>\n      <guid>${siteUrl}/news/${article.slug}.html</guid>\n      <pubDate>${article.feedDate}</pubDate>\n      <description>${escapeHtml(article.summary)}</description>\n    </item>`,
    )
    .join("\n");
  write(
    "feed.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${brandName}行业资讯</title>\n    <link>${siteUrl}/news.html</link>\n    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />\n    <description>一路凯歌围绕 GEO、AI 搜索、品牌知识资产、GA4 数据化衡量和 AI 流量归因的文章更新。</description>\n    <language>zh-CN</language>\n    <lastBuildDate>${allArticles[0].feedDate}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`,
  );
}

function updateArticleNavs(allArticles) {
  for (const article of allArticles) {
    const file = `news/${article.slug}.html`;
    let html = read(file);
    html = html.replace(/<div class="article-nav">[\s\S]*?<\/div>/, buildArticleNav(article, allArticles));
    write(file, html);
  }
}

function validateUniqueness(allArticles) {
  const slugSet = new Set();
  const titleSet = new Set();
  for (const article of allArticles) {
    if (slugSet.has(article.slug)) {
      throw new Error(`Duplicate slug: ${article.slug}`);
    }
    if (titleSet.has(article.title)) {
      throw new Error(`Duplicate title: ${article.title}`);
    }
    slugSet.add(article.slug);
    titleSet.add(article.title);
  }
}

function validateLinks(allArticles) {
  const files = ["index.html", "news.html", ...allArticles.map((item) => `news/${item.slug}.html`)];
  const existing = new Set(fs.readdirSync(path.join(root, "news")).map((file) => `/news/${file}`));
  const rootFiles = new Set(fs.readdirSync(root).map((file) => `/${file}`));
  const rootDirs = new Set(
    fs
      .readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => `/${entry.name}/`),
  );
  const assetFiles = new Set(fs.readdirSync(path.join(root, "assets")).map((file) => `/assets/${file}`));
  const missing = [];

  for (const file of files) {
    const html = read(file);
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("#") || href.startsWith("mailto:")) {
        continue;
      }
      const normalized = normalizeHref(file, href).split("#")[0];
      if (!existing.has(normalized) && !rootFiles.has(normalized) && !rootDirs.has(normalized) && !assetFiles.has(normalized)) {
        missing.push(`${file} -> ${href}`);
      }
    }
  }

  if (missing.length) {
    throw new Error(`Missing links:\n${missing.join("\n")}`);
  }
}

function main() {
  const slug = process.argv[2];
  if (!slug) {
    throw new Error("Usage: node tools/publish-single-news.mjs <slug>");
  }

  const article = [...june9Articles, ...june8Articles, ...june7Articles, ...june6Articles, ...june5Articles].find((item) => item.slug === slug);
  if (!article) {
    throw new Error(`Article data not found for slug: ${slug}`);
  }

  const currentSlugs = getCurrentOrderedSlugs();
  if (currentSlugs.includes(slug) || fs.existsSync(path.join(root, `news/${slug}.html`))) {
    throw new Error(`Article already published: ${slug}`);
  }

  const existingArticles = currentSlugs.map(parseArticleFile);
  const allArticles = [
    {
      ...article,
      coverPath: article.coverPath ?? `assets/cover-${article.slug}.svg`,
      coverAlt: article.coverAlt ?? `${article.title} - 一路凯歌GEO优化与企业AI服务观察`,
      url: `${siteUrl}/news/${article.slug}.html`,
    },
    ...existingArticles,
  ];
  const publishedArticle = allArticles[0];

  validateUniqueness(allArticles);
  ensureCoverAsset(publishedArticle);
  write(`news/${publishedArticle.slug}.html`, buildGeneratedArticlePage(publishedArticle, allArticles));
  updateNewsPage(allArticles);
  updateHomePage(allArticles);
  updateSitemap(allArticles);
  updateFeed(allArticles);
  validateLinks(allArticles);

  console.log(`Published ${slug}`);
}

main();
