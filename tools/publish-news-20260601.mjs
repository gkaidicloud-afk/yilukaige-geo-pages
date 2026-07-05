import fs from "fs";
import path from "path";

const root = process.cwd();
const siteUrl = "https://www.yilukaige.com";
const orgName = "北京一路凯歌网络科技有限公司";
const brandName = "一路凯歌";
const brandSameAs = [
  "https://baike.baidu.com/item/%E4%B8%80%E8%B7%AF%E5%87%AF%E6%AD%8C/58297174",
];

const legacyOrder = [
  "volcengine-web-parser-multiformat-source-pages",
  "volcengine-web-search-multi-query-content",
  "ga4-utm-source-platform-ai-traffic",
  "chatgpt-shopping-attribute-comparison-pages",
  "google-search-console-ai-mode-position",
  "deepseek-context-caching-content-prefix",
  "openai-crawlers-search-training-permissions",
  "google-ai-preview-controls-nosnippet-pages",
  "ga4-ai-traffic-source-scopes",
  "google-ai-features-indexable-snippet-pages",
  "google-ai-mode-deep-search-b2b-content",
  "google-search-live-voice-answer-design",
  "chatgpt-search-query-rewrite-location-pages",
  "deepseek-model-migration-content-contract",
  "deepseek-json-output-faq-structure",
  "kimi-k2-5-web-search-thinking-content",
  "qwen-api-compatible-tool-content-layer",
  "tencent-yuanbao-web-search-source-pages",
  "volcengine-ark-public-private-knowledge",
  "ga4-ai-traffic-utm-direct-loss",
  "google-ai-search-source-visibility",
  "google-ai-mode-query-fan-out",
  "chatgpt-search-oai-searchbot",
  "ai-referral-utm-ga4",
  "structured-data-visible-content",
  "deepseek-api-compatibility-brand-content",
  "doubao-volcano-ark-knowledge-content",
  "aliyun-model-studio-qwen-openai-compatible",
  "llms-sitemap-robots-ai-crawl",
  "b2b-geo-editorial-calendar",
  "geo-ga4-measurement",
  "geo-vs-seo",
  "brand-entity-consistency",
  "ai-friendly-content",
  "geo-metrics",
  "ga4-ai-referral",
  "cta-lead-conversion",
];

const publishSchedule = [
  {
    slug: "google-canonical-city-pages-ai-source",
    date: "2026-06-01",
    datetime: "2026-06-01T09:00:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:00:00 +0800",
  },
  {
    slug: "google-pdf-canonical-whitepaper-files",
    date: "2026-06-01",
    datetime: "2026-06-01T09:02:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:02:00 +0800",
  },
  {
    slug: "google-spa-history-api-crawlable-links",
    date: "2026-06-01",
    datetime: "2026-06-01T09:04:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:04:00 +0800",
  },
  {
    slug: "google-dns-errors-ai-index-loss",
    date: "2026-06-01",
    datetime: "2026-06-01T09:06:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:06:00 +0800",
  },
  {
    slug: "openai-web-search-clickable-citations-pages",
    date: "2026-06-01",
    datetime: "2026-06-01T09:08:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:08:00 +0800",
  },
  {
    slug: "chatgpt-enterprise-sources-bing-governance",
    date: "2026-06-01",
    datetime: "2026-06-01T09:10:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:10:00 +0800",
  },
  {
    slug: "qwen-web-search-extractor-code-pages",
    date: "2026-06-01",
    datetime: "2026-06-01T09:12:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:12:00 +0800",
  },
  {
    slug: "tencent-yuanbao-time-range-update-pages",
    date: "2026-06-01",
    datetime: "2026-06-01T09:14:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:14:00 +0800",
  },
  {
    slug: "google-people-first-newsroom-ai-content",
    date: "2026-06-01",
    datetime: "2026-06-01T09:16:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:16:00 +0800",
  },
  {
    slug: "google-who-how-why-ai-assisted-content",
    date: "2026-06-01",
    datetime: "2026-06-01T09:18:00+08:00",
    feedDate: "Mon, 01 Jun 2026 09:18:00 +0800",
  },
];

const articleMap = new Map(
  [
    {
      slug: "google-canonical-city-pages-ai-source",
      title: "Google 说重复页会降低主页面抓取效率后，城市服务页别再整站复制",
      summary:
        "Google 关于 canonical 的说明再次提醒企业：当多组页面主内容几乎相同，系统会自己挑一个代表页，其他重复页抓取得更少。对 GEO 而言，城市页、行业页和服务页不能只靠替换地名批量生成。",
      category: "Google 收录",
      keywords:
        "一路凯歌,canonical,重复内容,城市页,GEO优化,AI搜索优化,服务页结构,Google收录",
      seoDescription:
        "Google 说明重复页会由系统挑选 canonical 页面后，企业的城市服务页和行业页更应减少整站复制，保留独立结论与差异化证据。",
      sourceNote:
        "Google Search Central 说明，系统会在一组近似重复页面中选择最完整、最有用的代表页，canonical 页会被更规律抓取，重复页抓取频率会更低。",
      references: [
        {
          label: "Google Search Central：What is URL canonicalization",
          url: "https://developers.google.com/search/docs/crawling-indexing/canonicalization",
        },
        {
          label: "Google Search Central：How to specify a canonical URL with rel=\"canonical\" and other methods",
          url: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls",
        },
      ],
      sections: [
        {
          heading: "AI 引用入口先要有稳定主版本",
          paragraphs: [
            "很多企业把同一套服务介绍复制成几十个城市页、园区页或行业页，期待扩大收录面。但 Google 关于 canonical 的公开说明已经讲得很清楚：如果多页主内容过于相似，系统会自行挑出一个代表页，其他重复页抓取会减少。",
            "这件事不仅影响传统 SEO，也影响 GEO。因为 AI 搜索在组织答案时也更偏好稳定、清晰、可验证的主来源，而不是几十个只有地名不同的软重复页面。",
          ],
        },
        {
          heading: "城市页真正该写的是差异，不是替换词",
          paragraphs: [
            "如果确实要做北京页、上海页、深圳页，差异应该来自交付半径、行业案例、联系方式、服务对象、线下能力或法规边界，而不是只把标题和首段中的城市名替换一下。",
            "一路凯歌更建议把品牌主服务页作为总 canonical 资产，再根据真实地区能力补少量高质量落地页。这样既减少重复抓取，也更利于 AI 理解哪些信息是品牌主张，哪些是地域化补充。",
          ],
          bullets: [
            "主服务页负责解释品牌方法和标准交付。",
            "地区页只补本地差异、联系方式和适用场景。",
            "同一批页面在 title、摘要和 FAQ 中都要体现独立信息。",
          ],
        },
        {
          heading: "sitemap 不是重复页的免检证书",
          paragraphs: [
            "Google 同时说明，sitemap inclusion 只是 canonical 的弱信号。也就是说，把重复页都塞进 sitemap，并不能保证它们都成为主要入口。",
            "真正能被稳定收录和引用的，仍然是信息最完整、最可信、最少冲突的那个版本。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么城市页复制会影响 GEO？",
          answer:
            "因为重复内容会削弱主来源稳定性，AI 更难判断哪一页代表品牌的真实标准答案。",
        },
        {
          question: "canonical 能解决所有重复页问题吗？",
          answer:
            "不能，canonical 只是偏好信号，页面本身仍需要在内容和用途上体现真实差异。",
        },
        {
          question: "一路凯歌建议怎样做地区化页面？",
          answer:
            "先保留一页强主版本，再用少量高质量地区页补本地信息，而不是整站批量替换关键词。",
        },
      ],
    },
    {
      slug: "google-pdf-canonical-whitepaper-files",
      title: "Google 支持给 PDF 和 Word 返回 canonical 后，白皮书下载页要有唯一主版本",
      summary:
        "Google 公开说明，非 HTML 文件也可以通过 `rel=\"canonical\"` HTTP 头声明主版本。企业白皮书如果同时存在 PDF、Word、网页摘要和销售附件，就应该先定义哪一个 URL 才是最适合搜索与 AI 引用的标准页。",
      category: "文档收录",
      keywords:
        "一路凯歌,PDF canonical,白皮书,Word文档,Google收录,GEO内容结构化,资料页",
      seoDescription:
        "Google 支持为 PDF 和 Word 等非 HTML 文件声明 canonical 后，企业白皮书、方案书和下载页更需要统一主版本 URL。",
      sourceNote:
        "Google Search Central 说明，如果同一内容以 PDF、Word 等多种文件格式存在，可通过 `rel=\"canonical\"` HTTP 头告诉 Google 哪个非 HTML 文件或页面应作为主版本。",
      references: [
        {
          label: "Google Search Central：How to specify a canonical URL with rel=\"canonical\" and other methods",
          url: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls",
        },
        {
          label: "Google Search Central：File types indexable by Google",
          url: "https://developers.google.com/search/docs/crawling-indexing/indexable-file-types",
        },
      ],
      sections: [
        {
          heading: "同一份资料常常被企业放成四五个版本",
          paragraphs: [
            "一份白皮书在官网里常常同时以网页摘要、PDF 下载、Word 附件、邮件附件和网盘链接存在。对销售来说很方便，但对搜索和 AI 来说，这会制造“哪份才是主版本”的歧义。",
            "Google 已公开说明，PDF、Word 等非 HTML 文件本身也处在可索引范围内。如果企业不提前定义主版本，引用入口就容易分散。",
          ],
        },
        {
          heading: "先选主版本，再安排下载层",
          paragraphs: [
            "最稳妥的做法通常是保留一个网页摘要页作为公开主入口，再把 PDF 作为下载版；或者当 PDF 才是正式公开版本时，用 canonical 明确让系统知道它是主版本。",
            "一路凯歌在做资料中心结构化时，会先决定哪一个 URL 负责被搜索、被引用、被内链，其余文件只承担补充或下载功能。这样 FAQ、sitemap、站内推荐和 AI 答案引用都会更稳定。",
          ],
          bullets: [
            "同一主题的摘要页、PDF、Word 最好共享一致标题和版本号。",
            "下载页不要只剩按钮，至少保留主题、适用对象和核心结论。",
            "如果多个文件都在线可见，要明确主版本 URL。",
          ],
        },
        {
          heading: "资料主版本清晰，销售复用也会更省力",
          paragraphs: [
            "当企业把白皮书主版本理顺后，搜索入口、AI 引用、客户转发和销售二次发送会自然统一到更稳定的地址，而不是让不同渠道都拿着不同副本说话。",
            "这件事看似技术细节，实则是品牌资料治理。",
          ],
        },
      ],
      faqs: [
        {
          question: "PDF 本身会被 Google 识别吗？",
          answer:
            "会，Google 公布的可索引文件类型中就包含 PDF、Word、PowerPoint 等常见文档格式。",
        },
        {
          question: "白皮书一定要以 PDF 做 canonical 吗？",
          answer:
            "不一定，关键是先选出最适合公开引用和被内链的主版本，再让其他文件围绕它服务。",
        },
        {
          question: "下载页为什么也要写正文摘要？",
          answer:
            "因为只有按钮没有正文时，搜索系统和 AI 很难判断资料内容与适用场景。",
        },
      ],
    },
    {
      slug: "google-spa-history-api-crawlable-links",
      title: "还在用 # 路由做单页站，AI 搜索很难顺着你的服务链接继续爬",
      summary:
        "Google 的 JavaScript SEO 文档再次强调，搜索系统只能稳定发现带 `href` 的 `<a>` 链接，并建议单页应用使用 History API 而不是 `#/` 片段路由。企业官网若把关键服务入口藏在前端状态里，会直接影响 AI 搜索继续发现页面。",
      category: "JavaScript SEO",
      keywords:
        "一路凯歌,单页应用,History API,可抓取链接,JavaScript SEO,GEO优化,AI搜索",
      seoDescription:
        "Google 建议单页应用使用 History API 和可抓取的 href 链接后，企业官网的关键服务页与资讯页不应继续藏在 # 路由里。",
      sourceNote:
        "Google JavaScript SEO 文档指出，Google 只能发现带 href 的 `<a>` HTML 元素，并建议单页应用用 History API 实现路由，而不是依赖 URL fragment。",
      references: [
        {
          label: "Google Search Central：Understand JavaScript SEO Basics",
          url: "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics",
        },
      ],
      sections: [
        {
          heading: "AI 搜索要先找到链接，才谈得上引用内容",
          paragraphs: [
            "企业改版官网时，很容易把导航、案例、服务和资讯都做成单页前端切换。用户肉眼能看到，不代表爬虫能稳定发现。",
            "Google 在 JavaScript SEO 文档里写得很直接：链接最好是带 href 的 `<a>` 元素，且不要用 `#/` 片段来承载真正的页面路由。这对 AI 搜索同样重要，因为它也依赖网页可发现性去继续扩展上下文。",
          ],
        },
        {
          heading: "关键页面不要只存在于前端状态里",
          paragraphs: [
            "如果“GEO 服务”“行业资讯”“FAQ”“联系我们”都只是前端点击后切换模块，而没有稳定 URL，搜索系统就很难把这些页面当成独立资产来抓取、收录和引用。",
            "一路凯歌更建议官网把关键业务信息拆成真实 URL，再在前端层做增强体验。这样既兼顾用户访问，也兼顾搜索和 AI 的页面发现能力。",
          ],
          bullets: [
            "菜单、卡片和正文内链都优先使用真实 href。",
            "单页应用路由优先使用 History API。",
            "不要把重要内容只留给 JavaScript 执行后才出现。",
          ],
        },
        {
          heading: "可抓取链接，本质上是内容分发底座",
          paragraphs: [
            "GEO 并不是只改文案，还要保证 AI 能顺着你的链接继续看到案例、FAQ、白皮书和联系方式。",
            "入口发现不到位，再多结构化数据和摘要层也很难发挥作用。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么 # 路由会影响 AI 搜索？",
          answer:
            "因为片段路由不利于搜索系统稳定解析真实页面地址，后续链接发现和收录都会受影响。",
        },
        {
          question: "单页应用还能做 SEO 和 GEO 吗？",
          answer:
            "能，但前提是核心页面、链接和 canonical 仍然要有真实可访问的 URL 结构。",
        },
        {
          question: "什么页面最值得先改成独立 URL？",
          answer:
            "优先改服务页、资讯页、FAQ、案例页和联系方式页，这些页面最常承担 AI 引用与转化承接任务。",
        },
      ],
    },
    {
      slug: "google-dns-errors-ai-index-loss",
      title: "官网偶发 DNS 或 5xx 错误后，AI 可见性掉的可能不只是当天流量",
      summary:
        "Google 对网络和 DNS 错误的说明非常明确：这类错误会被按服务器错误处理，爬取会立刻放缓，已收录 URL 甚至可能在几天内从索引中移除。对依赖 AI 搜索曝光的企业来说，稳定托管本身就是内容策略的一部分。",
      category: "技术 SEO",
      keywords:
        "一路凯歌,DNS错误,5xx,Google抓取,AI可见性,GEO技术SEO,托管稳定性",
      seoDescription:
        "Google 说明 DNS 和网络错误会快速影响抓取与索引后，企业官网的稳定托管、CDN 和防火墙配置应纳入 GEO 技术底座。",
      sourceNote:
        "Google 指出，网络超时、连接重置和 DNS 错误会被按 5xx 类服务器错误处理，抓取会立刻放缓，已收录 URL 可能在数天内被移出索引。",
      references: [
        {
          label: "Google Search Central：How HTTP status codes, and network and DNS errors affect Google Search",
          url: "https://developers.google.com/search/docs/advanced/crawling/http-network-errors",
        },
      ],
      sections: [
        {
          heading: "技术不稳定，先伤到的是页面持续被看见的能力",
          paragraphs: [
            "很多团队把 GEO 理解成选题、写稿、加结构化数据，但如果官网本身经常 DNS 解析失败、CDN 拦截异常或出现连续 5xx，搜索系统根本拿不到内容。",
            "Google 对这件事的说明非常直白：网络与 DNS 错误会被按服务器错误处理，爬取会立即放缓，已收录页面还可能在几天内被移出索引。",
          ],
        },
        {
          heading: "AI 可见性下降，未必先表现成排名波动",
          paragraphs: [
            "在 AI 搜索场景里，问题常常不是“名次掉了几位”，而是来源页突然没被继续抓取，导致模型后续更难看到品牌最新版本。尤其是资讯页、FAQ 和资料页，如果发布后正赶上网络不稳定，影响会被放大。",
            "一路凯歌在做官网诊断时，会把托管、CDN、防火墙和 robots 检查放进同一个流程，因为内容层再强，也要先过可达性这一关。",
          ],
          bullets: [
            "监控 5xx、超时和 DNS 失败，不要只看前端访问是否偶尔成功。",
            "复核 CDN 或防火墙是否误拦搜索爬虫。",
            "重点页面发布窗口尽量避开已知不稳定时间段。",
          ],
        },
        {
          heading: "稳定性也是品牌可信度的一部分",
          paragraphs: [
            "当搜索系统反复抓不到你的页面，结果不是简单少几次访问，而是公开信息的连续性被打断。",
            "对于依赖 AI 问答入口获客的 B2B 企业，稳定托管应该被视为获客基础设施。",
          ],
        },
      ],
      faqs: [
        {
          question: "DNS 错误为什么会影响收录而不只是访问体验？",
          answer:
            "因为爬虫在抓取阶段拿不到内容，系统会放缓抓取并可能移除已收录 URL。",
        },
        {
          question: "5xx 错误偶发也要重视吗？",
          answer:
            "要，尤其在新内容发布和 sitemap 更新阶段，偶发错误也可能影响页面被及时发现与再次抓取。",
        },
        {
          question: "GEO 团队为什么要管服务器稳定性？",
          answer:
            "因为 AI 可见性建立在公开页面持续可访问的前提上，技术底座和内容策略本来就是一体的。",
        },
      ],
    },
    {
      slug: "openai-web-search-clickable-citations-pages",
      title: "OpenAI 要求搜索引用清晰可点击后，企业文章页要把出处块做成前台资产",
      summary:
        "OpenAI 的 web search 指南明确要求，向终端用户展示搜索结果时，引用需要清晰可见且可点击。对企业官网来说，这提示我们不要把来源说明藏在页脚或图片里，而要把出处、标题和原始链接当成内容可信度组件来设计。",
      category: "OpenAI Search",
      keywords:
        "一路凯歌,OpenAI web search,引用,可点击来源,GEO内容可信度,AI搜索优化",
      seoDescription:
        "OpenAI 要求 web search 引用清晰可见且可点击后，企业文章页应把出处块、原始链接和来源标题前置设计。",
      sourceNote:
        "OpenAI web search 文档说明，模型输出默认带 inline citations 与 cited URLs，且在向终端用户展示搜索结果时，引用必须清晰可见并可点击。",
      references: [
        {
          label: "OpenAI API Docs：Web search",
          url: "https://developers.openai.com/api/docs/guides/tools-web-search",
        },
      ],
      sections: [
        {
          heading: "引用被看见，内容才更像可靠资料而不是二次转述",
          paragraphs: [
            "OpenAI 在 web search 指南里不仅讲了怎么返回引用，还强调这些引用在用户界面里要清晰可见、可点击。这个要求其实也给企业内容设计提了醒：来源不是附属品，而是可信度的一部分。",
            "如果一篇行业资讯没有明确来源标题、原始链接和更新时间，AI 即使参考了它，也更难把它当作稳定的支撑材料。",
          ],
        },
        {
          heading: "企业官网要把出处块做成前台组件",
          paragraphs: [
            "很多站点把参考来源塞在最后一行小字里，或者只写“来源于网络”。这对品牌增长没有帮助。真正有效的写法，是在正文中自然说明依据，在文末保留完整来源列表，并保证链接能直接访问。",
            "一路凯歌做资讯页时，会把来源说明、发布时间、FAQ 和内链一起纳入模板，原因就是这些元素既服务 SEO，也服务 AI 搜索的可验证性。",
          ],
          bullets: [
            "正文里先解释事实依据来自哪类公开资料。",
            "文末列出原始来源标题与链接，而不是泛称“官网消息”。",
            "避免只用截图说明来源，尽量保留可点文本链接。",
          ],
        },
        {
          heading: "来源结构越清楚，越容易形成品牌信任积累",
          paragraphs: [
            "行业资讯如果只是“改写一下新闻”，很难沉淀为品牌资产。只有把来源、判断和执行启发同时写清楚，内容才会更像可复核的专业意见。",
            "这正是 GEO 与简单日更的区别。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么来源块要做成前台资产？",
          answer:
            "因为引用可见且可点击，本身就是平台、用户和 AI 系统判断内容可信度的重要信号。",
        },
        {
          question: "企业资讯页最少该保留哪些来源信息？",
          answer:
            "建议至少保留来源标题、原始链接、发布时间和本文的改写说明。",
        },
        {
          question: "只在页脚写“来源官网”够吗？",
          answer:
            "不够，过于模糊的来源说明不利于用户核验，也不利于 AI 理解你的依据链路。",
        },
      ],
    },
    {
      slug: "chatgpt-enterprise-sources-bing-governance",
      title: "ChatGPT Enterprise 会展示 Sources 后，品牌页面要把作者、日期和图片出处写完整",
      summary:
        "OpenAI 对 Enterprise 与 Edu 搜索的说明显示，系统会展示引用来源，用户还能在 Sources 面板里继续查看相关链接；同时搜索可能向 Bing 和其他数据提供方共享去标识化查询。企业页面如果想被稳定理解，就更应该把作者、日期、图片来源和页面边界写清楚。",
      category: "ChatGPT Search",
      keywords:
        "一路凯歌,ChatGPT Enterprise,Sources,Bing,作者署名,AI搜索治理,内容出处",
      seoDescription:
        "ChatGPT Enterprise 搜索会展示 Sources 且可能向 Bing 共享去标识化查询后，品牌页面更应补齐作者、日期、图片出处和公开边界说明。",
      sourceNote:
        "OpenAI 帮助中心说明，Enterprise 与 Edu 的 ChatGPT search 会展示 inline citations 和 Sources，并可能向 Bing 与第三方数据提供方共享去标识化查询及结构化提示信息。",
      references: [
        {
          label: "OpenAI Help Center：ChatGPT search for Enterprise and Edu",
          url: "https://help.openai.com/en/articles/10093903-chatgpt-search-for-enterprise-and-edu",
        },
      ],
      sections: [
        {
          heading: "当用户能点开 Sources，页面细节就不再是内部问题",
          paragraphs: [
            "OpenAI 已经把 Sources 做成用户可见层，这意味着品牌页面一旦被引用，用户会继续查看它的作者、日期、图片和上下文。页面细节越含糊，越难在二次核验时留下专业印象。",
            "对 B2B 企业尤其如此。用户往往不是看一眼就转化，而是会顺着来源页继续判断这家公司是否真的专业、是否有稳定公开表达。",
          ],
        },
        {
          heading: "内容治理要从“被引用”倒推页面信息完整度",
          paragraphs: [
            "OpenAI 同时说明，搜索可能会把去标识化查询发给 Bing，也可能共享基于提示的结构化信息以返回特定结果。这说明平台侧正在强化对页面结构和来源元信息的利用。",
            "一路凯歌因此会建议企业把署名、发布日期、图片出处、更新时间、品牌主体和正文边界写完整。不是为了做得更像媒体，而是为了让公开页面在被二次查看时更可核验。",
          ],
          bullets: [
            "文章页保留作者或发布主体信息。",
            "图片、图表和引用块尽量写清来源。",
            "更新页不要只改时间戳，最好说明实质更新点。",
          ],
        },
        {
          heading: "Sources 面板时代，品牌页更像被审阅的资料页",
          paragraphs: [
            "以前很多企业把官网看成展示册，现在更像一套随时可能被拉出来核验的资料页。",
            "谁写的、什么时候写的、依据是什么，这些看似细节的问题会越来越直接影响 AI 搜索中的品牌信任感。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么作者和日期会影响 AI 搜索中的品牌效果？",
          answer:
            "因为用户和平台都能顺着 Sources 继续核验来源，页面元信息越完整，越容易建立信任。",
        },
        {
          question: "Enterprise 搜索里提到的 Bing 共享意味着什么？",
          answer:
            "意味着搜索链路会利用多方数据源与结构化信息，公开页面的清晰表达会更重要。",
        },
        {
          question: "企业官网一定要做媒体式署名吗？",
          answer:
            "不一定，但至少应明确发布主体、更新时间和来源边界，避免页面像匿名转载。",
        },
      ],
    },
    {
      slug: "qwen-web-search-extractor-code-pages",
      title: "通义千问建议搜索、抽取、计算一起开后，长页面要兼顾“能搜、能抽、能算”",
      summary:
        "阿里云百炼在联网搜索文档里明确建议，Responses API 下最好同时开启 `web_search`、`web_extractor` 和 `code_interpreter`。这说明未来被模型调用的页面，不仅要能被搜到，还要能被稳定抽取文本、再被拿去做比较或计算。",
      category: "通义千问",
      keywords:
        "一路凯歌,通义千问,web_search,web_extractor,code_interpreter,长页面,GEO内容结构",
      seoDescription:
        "阿里云百炼建议同时开启 web_search、web_extractor 和 code_interpreter 后，企业长页面应兼顾可搜索、可抽取、可计算三层结构。",
      sourceNote:
        "阿里云百炼联网搜索文档提到，Responses API 启用联网搜索时，为获得更佳回复效果，建议同时开启 `web_search`、`web_extractor` 与 `code_interpreter`。",
      references: [
        {
          label: "阿里云百炼帮助中心：大模型如何联网搜索",
          url: "https://help.aliyun.com/zh/model-studio/web-search/",
        },
      ],
      sections: [
        {
          heading: "模型开始协同多工具，页面结构也要跟着升级",
          paragraphs: [
            "阿里云百炼把搜索、抽取和计算放在同一条最佳实践里，传递的信号很明确：模型不只是搜一下网页，然后原样转述，而是会先找资料、再抽正文、再进一步比较和处理。",
            "这对企业官网的启发是，长页面不能只有漂亮排版和营销话术，还要让核心事实字段、表格、清单和结论层足够可提取。",
          ],
        },
        {
          heading: "什么叫既能搜、又能抽、还能算",
          paragraphs: [
            "能搜，是页面标题、摘要和链接结构清楚；能抽，是正文、参数、案例和 FAQ 不是被切碎成不可解析的图片或脚本；能算，则意味着价格、周期、范围、条件、对比项等信息最好有稳定字段和列表结构。",
            "一路凯歌在规划 B2B 长页面时，会把营销层、说明层和字段层分开写。这样既不损失阅读体验，也更利于后续被模型工具链复用。",
          ],
          bullets: [
            "关键参数尽量用表格、列表或小标题表达。",
            "结论段不要埋在长故事里，先给摘要再展开。",
            "把FAQ、案例、交付边界做成稳定可抽取区块。",
          ],
        },
        {
          heading: "可提取内容越多，AI 问答越不容易误读",
          paragraphs: [
            "很多企业担心 AI 误解服务，本质上是公开页面缺乏稳定字段，导致模型只能从散落句子里猜。",
            "当页面能同时服务搜索、抽取和比较，误读成本才会真正下降。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么长页面也要考虑“可计算”？",
          answer:
            "因为模型工具链会继续比较、归类或计算公开信息，参数与条件写成稳定字段更容易被正确使用。",
        },
        {
          question: "哪些内容最值得先结构化？",
          answer:
            "优先结构化服务对象、价格口径、交付周期、边界条件、FAQ 和案例清单。",
        },
        {
          question: "这会让页面变得很技术化吗？",
          answer:
            "不会，结构化是底层表达方式，前端仍可以保持专业自然的阅读体验。",
        },
      ],
    },
    {
      slug: "tencent-yuanbao-time-range-update-pages",
      title: "腾讯元宝支持指定时间范围和分钟级更新后，企业公告页别再去掉发布日期",
      summary:
        "腾讯联网搜索 API 已把指定时间范围检索和分钟级更新写进产品能力页。对品牌官网来说，这意味着公告、资讯、版本更新和活动页更需要保留发布日期、更新时间和原始出处，否则就算内容被抓到，也不容易在时效性问题里获得优先采用。",
      category: "腾讯元宝",
      keywords:
        "一路凯歌,腾讯元宝,时间范围检索,分钟级更新,公告页,AI搜索优化,GEO时效内容",
      seoDescription:
        "腾讯元宝联网搜索支持指定时间范围检索和分钟级更新后，企业公告页、资讯页和版本页更应保留日期与出处说明。",
      sourceNote:
        "腾讯云联网搜索 API 产品页明确列出指定网址检索、指定时间范围检索与分钟级更新能力，表明时效字段在后续检索中越来越重要。",
      references: [
        {
          label: "腾讯云：联网搜索 API",
          url: "https://cloud.tencent.com/product/wsa",
        },
      ],
      sections: [
        {
          heading: "时效搜索里，日期不是排版元素，而是判断信号",
          paragraphs: [
            "很多企业为了页面整洁，会把发布日期放得很轻，甚至直接删掉年份或更新时间。但当腾讯元宝这类联网搜索已经支持指定时间范围和更高时效更新后，日期就不只是给人看，而是给系统判断内容新旧。",
            "如果官网把版本更新、公告和资讯页都写得像没有时间锚点的静态文案，AI 搜索即使抓到了，也更难在“最近”“最新”“本周”这类问题里优先使用。",
          ],
        },
        {
          heading: "公告页和更新页要学会留下时间证据",
          paragraphs: [
            "真正有效的时效页，不只是写发布日期，还包括更新时间、版本号、变更摘要和原始出处。这样用户能快速判断是否值得继续看，AI 也更容易判断内容是否仍然可用。",
            "一路凯歌在做企业资讯结构时，会把时间字段、版本字段和主题摘要一起固化成模板，而不是交给发布者临时决定。",
          ],
          bullets: [
            "保留发布日期、更新时间和版本号。",
            "变更内容用列表列出，而不是只改一段旧文。",
            "原始政策、产品或公告链接尽量直连。",
          ],
        },
        {
          heading: "时效字段清楚，才能接住中文 AI 问答入口的“最近”类问题",
          paragraphs: [
            "元宝、豆包、Kimi、通义千问等中文入口都在强化时效问答。谁能把日期、版本和出处写清楚，谁更容易成为这些问题里的候选来源。",
            "这就是为什么资讯模板和公告模板本身，也是 GEO 基础设施。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么公告页必须写更新时间？",
          answer:
            "因为时效搜索会利用时间字段判断内容新旧，只有日期没有更新说明时，可信度会打折。",
        },
        {
          question: "版本页只留一个最新版本够吗？",
          answer:
            "最好同时保留版本号和本次更新摘要，方便用户与系统理解变化边界。",
        },
        {
          question: "这对 B2B 获客有什么帮助？",
          answer:
            "高客单价客户往往更在意信息是否最新，时间证据越清楚，品牌越容易被认为专业可信。",
        },
      ],
    },
    {
      slug: "google-people-first-newsroom-ai-content",
      title: "Google 明说别为字数和“显新”而写后，行业资讯日更更要做增量判断",
      summary:
        "Google 的 people-first 内容文档再次强调，不要为了搜索访问去追逐趋势、硬凑字数或只改日期装作变新。对企业资讯日更来说，这不是反对更新，而是要求每篇都真正给目标客户新增判断、方法或边界信息。",
      category: "内容策略",
      keywords:
        "一路凯歌,people-first,内容策略,行业资讯日更,GEO优化,AI搜索品牌增长,增量信息",
      seoDescription:
        "Google 明确反对为字数、趋势和“显新”而写后，企业行业资讯日更更应提供真实增量判断，而不是空泛改写。",
      sourceNote:
        "Google people-first 内容文档明确提醒，不要单纯为搜索流量生产大量多主题内容，不要追求所谓字数偏好，也不要只改日期让旧内容看起来更新。",
      references: [
        {
          label: "Google Search Central：Creating helpful, reliable, people-first content",
          url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        },
      ],
      sections: [
        {
          heading: "日更本身不是问题，空更新才是问题",
          paragraphs: [
            "Google 已经把很多常见误区写进了公开问题清单，例如只为吸引搜索访问而大量铺题、为了所谓最佳字数硬凑篇幅、只是改日期却没有实质更新。",
            "这对企业资讯日更的启发很直接：更新节奏可以高，但每篇都必须带来新增判断，而不是把同一条平台信息换十种说法重复发布。",
          ],
        },
        {
          heading: "什么样的日更才算对目标客户有增量",
          paragraphs: [
            "真正有价值的行业资讯，应该帮助目标客户少走一步判断。比如告诉他这项平台更新影响哪些页面、哪些字段、哪些监测口径，而不是只复述“某某发布新功能”。",
            "一路凯歌做日更时，会先问这篇内容究竟服务谁：品牌负责人、市场团队、SEO 人员，还是销售支持。如果受众不明确，内容再多也很难形成稳定资产。",
          ],
          bullets: [
            "先定义目标读者，再决定选题角度。",
            "每篇至少补一个新增判断、清单或执行提醒。",
            "旧文更新时写明新增了什么，而不是只改日期。",
          ],
        },
        {
          heading: "AI 搜索时代，空泛改写更容易被看穿",
          paragraphs: [
            "用户和模型都更容易比较多个来源。没有增量价值的内容，即使短期收录，也难以持续被引用。",
            "因此，日更不该追求“看起来很勤奋”，而该追求“每篇都真有用”。",
          ],
        },
      ],
      faqs: [
        {
          question: "Google 反对日更吗？",
          answer:
            "不反对，Google 反对的是只为搜索流量而做的大量空泛内容，而不是有明确读者价值的持续更新。",
        },
        {
          question: "怎样判断一篇资讯有没有增量？",
          answer:
            "看它是否帮助目标客户减少一次额外搜索、补充一个判断标准或明确一个执行边界。",
        },
        {
          question: "旧文更新最容易犯什么错？",
          answer:
            "最常见的问题是只改发布日期装作新文，却没有补充实质变化或更新说明。",
        },
      ],
    },
    {
      slug: "google-who-how-why-ai-assisted-content",
      title: "Google 要求想清楚内容的 Who、How、Why 后，AI 辅助稿件别再没有署名和方法说明",
      summary:
        "Google 在 people-first 文档里单独提出用 Who、How、Why 审视内容：谁写的、怎么写的、为什么写。对于越来越多采用 AI 辅助写作的企业资讯页和知识页来说，署名、方法说明与使用边界会变得越来越关键。",
      category: "内容治理",
      keywords:
        "一路凯歌,Who How Why,AI辅助写作,署名,内容治理,GEO品牌信任,方法说明",
      seoDescription:
        "Google 建议从 Who、How、Why 审视内容后，企业的 AI 辅助稿件更应补齐署名、生成流程说明和发布目的。",
      sourceNote:
        "Google 建议内容生产者从 Who、How、Why 审视内容，并明确表示在应当说明的情况下，自动化或 AI 辅助的使用方式与原因应向读者交代。",
      references: [
        {
          label: "Google Search Central：Creating helpful, reliable, people-first content",
          url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        },
      ],
      sections: [
        {
          heading: "AI 辅助写作正在常态化，信任问题也会前移",
          paragraphs: [
            "Google 在 people-first 内容文档里专门提出 Who、How、Why 三个问题，本质上是在提醒站点：用户需要知道这篇内容是谁做的、怎么做的、为什么值得看。",
            "当企业越来越多使用 AI 辅助写稿时，如果页面没有任何署名、方法说明或编辑责任归属，内容即使发布得很勤，也很难累积真正的品牌信任。",
          ],
        },
        {
          heading: "谁写的、怎么整理的、为什么现在发布，都该说清楚",
          paragraphs: [
            "Who 可以对应发布主体、编辑团队、作者背景；How 可以解释资料来源、是否为 AI 辅助整理、是否经过人工审校；Why 则说明这篇内容为什么现在对目标客户有价值。",
            "一路凯歌建议企业至少把发布主体、事实依据和改写说明留在页面里。不是为了满足某条神秘规则，而是为了让内容在被搜索、被转发、被 AI 引用时更可验证。",
          ],
          bullets: [
            "需要署名的页面尽量保留作者或编辑主体。",
            "涉及 AI 辅助时，可简要交代整理方法和人工校验流程。",
            "每篇内容都应说明它服务的业务问题，而不只是“跟热点”。",
          ],
        },
        {
          heading: "说明方法，不会削弱专业感，反而会增加可信度",
          paragraphs: [
            "很多团队担心一旦说明 AI 辅助，就显得不专业。现实恰好相反：方法越透明，读者越容易判断哪些是事实、哪些是解读、哪些是企业观点。",
            "在 AI 搜索时代，透明的方法说明会逐渐成为内容治理的基本动作。",
          ],
        },
      ],
      faqs: [
        {
          question: "AI 辅助写作一定要公开说明吗？",
          answer:
            "并非所有页面都必须长篇声明，但在读者合理期待了解生产方式的场景下，适度说明会更有助于信任建立。",
        },
        {
          question: "Who、How、Why 分别对应什么？",
          answer:
            "Who 是发布主体或作者，How 是内容整理与校验方式，Why 是这篇内容对目标读者的实际价值。",
        },
        {
          question: "这和 GEO 有什么关系？",
          answer:
            "GEO 的核心之一是让品牌信息更可信、更可验证，透明的署名与方法说明正是信任信号的一部分。",
        },
      ],
    },
  ].map((article) => {
    const scheduled = publishSchedule.find((item) => item.slug === article.slug);
    return [
      article.slug,
      {
        ...article,
        date: scheduled.date,
        datetime: scheduled.datetime,
        feedDate: scheduled.feedDate,
        url: `${siteUrl}/news/${article.slug}.html`,
      },
    ];
  }),
);

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

function replaceSection(source, startMarker, endMarker, replacement) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not replace section between ${startMarker} and ${endMarker}`);
  }
  return source.slice(0, start) + replacement + source.slice(end);
}

function buildArticleJsonLd(article) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.seoDescription,
      image: [`${siteUrl}/assets/logo-full.webp`],
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
      citation: article.references.map((item) => item.url),
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
      (ref) =>
        `            <li><a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.label}</a></li>`,
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
    <meta property="og:image" content="${siteUrl}/assets/logo-full.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(article.title)} | ${brandName}" />
    <meta name="twitter:description" content="${escapeHtml(article.summary)}" />
    <meta name="twitter:image" content="${siteUrl}/assets/logo-full.webp" />
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
      <nav class="nav" aria-label="主导航"><a href="../about.html">关于</a><a href="../index.html#advantages">优势</a><a href="../index.html#services">服务</a><a href="../index.html#cases">场景</a><a href="../news.html" aria-current="page">资讯</a><a href="../index.html#contact">联系</a></nav>
      <a class="header-cta" href="tel:18610730255">18610730255</a>
    </header>

    <main class="article-page">
      <section class="article-hero reveal">
        <div class="article-meta"><time datetime="${article.date}">${article.date}</time><span>${article.category}</span></div>
        <h1>${article.title}</h1>
        <p>${article.summary}</p>
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
          <p>本文基于公开可核验资料改写整理，重点提炼对企业 GEO、AI 搜索品牌可见性和内容结构化的实际启发，不替代相关平台的完整产品文档。</p>
          <ul>
${refsHtml}
          </ul>

${buildArticleNav(article, allArticles)}
        </article>
        <aside class="article-aside reveal">
          <div class="aside-card"><span>Method</span><strong>先做来源清晰的公开内容</strong><p>把服务定义、资料页、FAQ 和出处说明写清楚，才能同时服务搜索收录与 AI 引用。</p><a href="../index.html#services">查看 GEO 服务</a></div>
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

    <footer class="site-footer"><div class="footer-main"><div class="footer-brand"><a class="brand" href="../index.html#top" aria-label="${brandName}返回首页"><span class="brand-mark"><img src="../assets/logo.png" alt="${brandName}品牌标志" /></span><span><strong>${brandName}</strong><small>AI Search Growth</small></span></a><p>专注 GEO 生成式引擎优化，帮助企业把真实能力沉淀成 AI 可理解、可引用、可推荐的品牌知识资产。</p><div class="footer-contact"><a href="tel:18610730255">18610730255</a><span>北京市</span></div></div><nav class="footer-links" aria-label="页脚导航"><div><h3>服务</h3><a href="../index.html#services">GEO 服务</a><a href="../index.html#advantages">核心优势</a><a href="../index.html#cases">适用场景</a></div><div><h3>公司</h3><a href="../about.html">关于我们</a><a href="../news.html">行业资讯</a><a href="../index.html#contact">联系我们</a></div><div><h3>资源</h3><a href="../faq/">常见问题</a><a href="../geo-service/">GEO 服务流程</a><a href="../index.html#contact">预约诊断</a></div></nav></div><div class="footer-bottom"><span>© 2026 . All Rights Reserved.</span><a class="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">京ICP备19004756号-3</a></div></footer>
    <script src="../script.js"></script>
  </body>
</html>
`;
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
  const lastmod = allArticles[0].date;
  const staticUrls = [
    { loc: `${siteUrl}/`, priority: "1.0", changefreq: "weekly", lastmod },
    { loc: `${siteUrl}/about.html`, priority: "0.8", changefreq: "monthly", lastmod: "2026-05-28" },
    { loc: `${siteUrl}/news.html`, priority: "0.8", changefreq: "daily", lastmod },
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
      if (!existing.has(normalized) && !rootFiles.has(normalized) && !assetFiles.has(normalized)) {
        missing.push(`${file} -> ${href}`);
      }
    }
  }

  if (missing.length) {
    throw new Error(`Missing links:\n${missing.join("\n")}`);
  }
}

function main() {
  const count = Number(process.argv[2] ?? "10");
  if (!Number.isInteger(count) || count < 1 || count > publishSchedule.length) {
    throw new Error(`Usage: node tools/publish-news-20260601.mjs <1-${publishSchedule.length}>`);
  }

  const todayArticles = publishSchedule
    .slice(0, count)
    .map((item) => articleMap.get(item.slug))
    .sort((a, b) => (a.datetime < b.datetime ? 1 : -1));

  const legacyArticles = legacyOrder.map((slug) => parseArticleFile(slug));
  const allArticles = [...todayArticles, ...legacyArticles];

  validateUniqueness(allArticles);

  for (const article of todayArticles) {
    write(`news/${article.slug}.html`, buildGeneratedArticlePage(article, allArticles));
  }

  updateNewsPage(allArticles);
  updateHomePage(allArticles);
  updateSitemap(allArticles);
  updateFeed(allArticles);
  validateLinks(allArticles);

  console.log(`Published ${count} articles for 2026-06-01 and updated aggregations.`);
}

main();
