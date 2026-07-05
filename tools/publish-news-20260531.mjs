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
    slug: "google-ai-features-indexable-snippet-pages",
    date: "2026-05-31",
    datetime: "2026-05-31T09:00:00+08:00",
    feedDate: "Sun, 31 May 2026 09:00:00 +0800",
  },
  {
    slug: "ga4-ai-traffic-source-scopes",
    date: "2026-05-31",
    datetime: "2026-05-31T09:02:00+08:00",
    feedDate: "Sun, 31 May 2026 09:02:00 +0800",
  },
  {
    slug: "google-ai-preview-controls-nosnippet-pages",
    date: "2026-05-31",
    datetime: "2026-05-31T09:04:00+08:00",
    feedDate: "Sun, 31 May 2026 09:04:00 +0800",
  },
  {
    slug: "openai-crawlers-search-training-permissions",
    date: "2026-05-31",
    datetime: "2026-05-31T09:06:00+08:00",
    feedDate: "Sun, 31 May 2026 09:06:00 +0800",
  },
  {
    slug: "deepseek-context-caching-content-prefix",
    date: "2026-05-31",
    datetime: "2026-05-31T09:08:00+08:00",
    feedDate: "Sun, 31 May 2026 09:08:00 +0800",
  },
  {
    slug: "google-search-console-ai-mode-position",
    date: "2026-05-31",
    datetime: "2026-05-31T09:10:00+08:00",
    feedDate: "Sun, 31 May 2026 09:10:00 +0800",
  },
  {
    slug: "chatgpt-shopping-attribute-comparison-pages",
    date: "2026-05-31",
    datetime: "2026-05-31T09:12:00+08:00",
    feedDate: "Sun, 31 May 2026 09:12:00 +0800",
  },
  {
    slug: "ga4-utm-source-platform-ai-traffic",
    date: "2026-05-31",
    datetime: "2026-05-31T09:14:00+08:00",
    feedDate: "Sun, 31 May 2026 09:14:00 +0800",
  },
  {
    slug: "volcengine-web-search-multi-query-content",
    date: "2026-05-31",
    datetime: "2026-05-31T09:16:00+08:00",
    feedDate: "Sun, 31 May 2026 09:16:00 +0800",
  },
  {
    slug: "volcengine-web-parser-multiformat-source-pages",
    date: "2026-05-31",
    datetime: "2026-05-31T09:18:00+08:00",
    feedDate: "Sun, 31 May 2026 09:18:00 +0800",
  },
];

const existingDraftSlugs = new Set([
  "google-ai-features-indexable-snippet-pages",
  "ga4-ai-traffic-source-scopes",
  "google-ai-preview-controls-nosnippet-pages",
  "deepseek-context-caching-content-prefix",
  "google-search-console-ai-mode-position",
]);

const generatedArticles = [
  {
    slug: "openai-crawlers-search-training-permissions",
    title: "OpenAI 把 SearchBot 与 GPTBot 分开后，企业官网要把“可搜索”和“可训练”权限分开管理",
    summary:
      "OpenAI 官方爬虫文档把用于搜索引用的 OAI-SearchBot、用于实时抓取的 ChatGPT-User 和用于训练的 GPTBot 分开说明。对企业来说，这意味着官网可以分别决定“允许被搜索引用”与“是否允许被训练使用”，不必一刀切。",
    category: "OpenAI Search",
    keywords:
      "一路凯歌,OpenAI爬虫,OAI-SearchBot,GPTBot,ChatGPT-User,AI搜索优化,robots.txt,GEO权限管理",
    seoDescription:
      "OpenAI 将搜索爬虫与训练爬虫分开后，企业官网可以分别管理搜索可见性与训练授权，兼顾 AI 引用与内容边界控制。",
    sourceNote:
      "OpenAI 官方爬虫文档明确区分 OAI-SearchBot、ChatGPT-User 和 GPTBot，并说明 robots.txt 更新通常会在约 24 小时内生效。",
    references: [
      {
        label: "OpenAI 官方文档：OpenAI crawlers and robots.txt",
        url: "https://platform.openai.com/docs/bots",
      },
    ],
    faqs: [
      {
        question: "为什么要把“可搜索”和“可训练”分开？",
        answer:
          "因为 OpenAI 已把搜索引用与训练用途拆成不同爬虫，企业可以允许搜索曝光，同时保留训练授权边界。",
      },
      {
        question: "最该先梳理哪些页面权限？",
        answer:
          "建议先区分品牌介绍、服务页、资讯页等适合公开引用的页面，以及不适合被训练使用的敏感资料页。",
      },
      {
        question: "这和 GEO 有什么直接关系？",
        answer:
          "GEO 关注的是品牌能否被 AI 正确发现和引用，先把搜索爬虫通路理清，才谈得上可见性增长。",
      },
    ],
    sections: [
      {
        heading: "同样叫“被 AI 抓取”，用途其实已经分层",
        paragraphs: [
          "过去很多企业一提到 AI 爬虫，往往只有“放开”或“全部拦住”两个动作。但 OpenAI 官方文档已经把搜索引用、用户临时抓取和训练用途分成不同机器人，这意味着站点权限管理也要更细。",
          "如果品牌既想出现在 ChatGPT Search 的来源链接里，又不想把所有内容都开放为训练素材，那么 robots.txt 和页面分层就不能再粗放处理。",
        ],
      },
      {
        heading: "官网应该按用途划分可开放内容",
        paragraphs: [
          "适合允许搜索抓取的，通常是品牌定义、服务范围、FAQ、行业观察和联系方式这类公开信息。它们本来就承担品牌发现和获客职责，被 AI 搜索引用反而有助于放大可见性。",
          "而报价细节、私域材料、仅供客户下载的深度交付文档，则更适合另做权限控制。一路凯歌在做 GEO 时，会先帮企业确定哪些内容是“应该被引用的公开资产”，再决定如何处理训练授权。",
        ],
        bullets: [
          "把品牌介绍、服务页、资讯页视为优先开放的搜索资产。",
          "把敏感资料、仅客户可见材料与公开内容拆开存放。",
          "定期复核 robots.txt，避免误伤搜索爬虫。",
        ],
      },
      {
        heading: "权限清晰，本身就是 AI 品牌治理的一部分",
        paragraphs: [
          "很多企业担心 AI 引用与内容边界冲突，本质上是因为没有把公开资产和私域资产分层。只要站点先按用途整理好，搜索曝光与边界控制并不矛盾。",
          "对 B2B 企业来说，这比一味增加文章数量更重要，因为只有允许被看到的内容，才可能变成可验证的 AI 品牌入口。",
        ],
      },
    ],
  },
  {
    slug: "chatgpt-shopping-attribute-comparison-pages",
    title: "ChatGPT Shopping 开始按价格与属性做推荐后，品牌产品页要提前准备可比较字段",
    summary:
      "OpenAI 宣布 ChatGPT Search 中的购物结果会结合结构化商品数据、价格、评价和用户偏好。即便是 B2B 官网，也应把方案属性、适用对象、交付方式和边界条件写成可比较字段，而不是只留一段口号式介绍。",
    category: "ChatGPT Search",
    keywords:
      "一路凯歌,ChatGPT Shopping,产品属性页,结构化字段,AI搜索优化,品牌可见性,B2B官网内容",
    seoDescription:
      "ChatGPT Shopping 重视价格与属性信息后，企业产品页和方案页应补齐可比较字段，提升 AI 搜索中的可理解性与推荐稳定性。",
    sourceNote:
      "OpenAI 在 2025 年 4 月介绍 ChatGPT Search 购物结果时提到，推荐会基于结构化商品元数据、价格与评价等信号，而非广告位售卖。",
    references: [
      {
        label: "OpenAI 官方文章：Introducing shopping in ChatGPT search",
        url: "https://openai.com/index/introducing-shopping-in-chatgpt-search/",
      },
    ],
    faqs: [
      {
        question: "为什么购物结果的逻辑会影响 B2B 官网？",
        answer:
          "因为它说明 AI 越来越依赖可比较属性做推荐，B2B 方案页也该把适用对象、交付方式和边界条件写清楚。",
      },
      {
        question: "哪些字段最值得先补？",
        answer:
          "建议先补服务对象、核心交付物、实施周期、衡量口径和联系方式，减少只讲价值不讲条件的页面。",
      },
      {
        question: "这属于 GEO 还是传统 SEO？",
        answer:
          "两者都相关，SEO 负责先收录页面，GEO 则让这些字段更容易被 AI 当成比较依据来引用。",
      },
    ],
    sections: [
      {
        heading: "AI 推荐越来越像“带比较逻辑的导购”",
        paragraphs: [
          "OpenAI 把购物结果放进 ChatGPT Search 后，外界看到的不只是商品卡片，而是一套更明确的比较机制。系统会参考商品元数据、价格、评价以及用户偏好，再给出推荐。",
          "对企业官网的启发是：不管你卖的是标准商品还是 B2B 方案，只要想进入 AI 的比较视野，就不能只写抽象口号。页面需要让模型看出差异点和适配条件。",
        ],
      },
      {
        heading: "B2B 页面同样需要“可比较字段”",
        paragraphs: [
          "很多 B2B 服务页把能力介绍写得很完整，却没有把交付物、适用客户、实施周期、配合要求等信息显式列出。结果是用户读得懂，AI 却不一定容易拿来做对比。",
          "一路凯歌在做 AI 搜索品牌增长时，会把方案页从“叙述型介绍”改成“结论加字段”的结构。这样在用户问“哪家适合做 GEO”“谁更适合制造业或 SaaS”时，AI 才有足够材料判断。",
        ],
        bullets: [
          "先给一句结论，再列出服务对象和典型场景。",
          "把交付物、周期、协作方式拆成稳定字段。",
          "保留下一步动作，让比较后的访问能自然转向咨询。",
        ],
      },
      {
        heading: "属性清楚，才能把曝光接到获客",
        paragraphs: [
          "AI 搜索不是只帮品牌多一个展示位，更重要的是把品牌带进用户的选择清单。能不能留在清单里，很大程度取决于页面是否具备可比较的信息。",
          "这也是为什么 GEO 不能只靠文章数量，而要靠结构化表达把官网真正变成可理解的产品资料页。",
        ],
      },
    ],
  },
  {
    slug: "ga4-utm-source-platform-ai-traffic",
    title: "GA4 建议 UTM 成套出现后，AI 搜索流量别只写一个 utm_source",
    summary:
      "Google Analytics 手动标记文档提醒，UTM 最好成套使用，并明确列出了 `utm_source_platform`、`utm_campaign_id` 等扩展参数。企业复盘 AI 搜索流量时，如果只补一个来源名，很容易继续丢失渠道语义和后续对比口径。",
    category: "GA4 实操",
    keywords:
      "一路凯歌,GA4,UTM,utm_source_platform,AI搜索流量,流量归因,GEO分析,手动标记",
    seoDescription:
      "GA4 建议 UTM 成套使用后，企业在标记 AI 搜索流量时不应只写一个 utm_source，还要统一平台、活动和内容层级。",
    sourceNote:
      "Google Analytics 手动标记帮助文档建议 UTM 以成套方式使用，并在 2025 年后持续扩展 `utm_source_platform`、`utm_marketing_tactic` 等字段。",
    references: [
      {
        label: "Google Analytics 帮助：使用手动标记进行广告系列归因",
        url: "https://support.google.com/analytics/answer/10917952",
      },
    ],
    faqs: [
      {
        question: "为什么只写 utm_source 不够？",
        answer:
          "因为 AI 流量后续还要按平台、活动和内容层级复盘，单一来源名很难支撑稳定归因和横向比较。",
      },
      {
        question: "AI 搜索流量最该统一哪些参数？",
        answer:
          "建议至少统一 source、medium、campaign，并按需要补 source_platform 或 content，避免不同团队各写各的。",
      },
      {
        question: "这和 GEO 的业务价值有什么关系？",
        answer:
          "只有标记口径统一，企业才能把 AI 曝光、访问和留资动作接成同一条分析链路。",
      },
    ],
    sections: [
      {
        heading: "AI 来源识别，不能只靠一个名字撑全场",
        paragraphs: [
          "很多团队想看 AI 搜索流量，第一步往往是把 `utm_source=chatgpt`、`utm_source=deepseek` 之类写上去。但 Google Analytics 的文档已经说明，手动标记并不是只靠一个来源值，而是建议整套参数协同工作。",
          "如果来源、平台、活动和内容层都没有统一，后续即使看到了访问，也很难区分是哪个入口、哪篇内容、哪种投放动作带来的。",
        ],
      },
      {
        heading: "为什么 AI 搜索更需要统一命名",
        paragraphs: [
          "AI 流量往往会跨页面、跨渠道、跨团队出现，有人做资讯分发，有人做落地页，有人做销售线索承接。如果每个人都只在自己链路里随手写一个来源名，最终数据就会碎掉。",
          "一路凯歌会把 AI 来源口径先定义成统一字典，再反推到资讯页、短链、表单页和事件命名。这样才知道某篇 GEO 内容是否真的带来了后续留资。",
        ],
        bullets: [
          "优先统一 `utm_source`、`utm_medium`、`utm_campaign`。",
          "需要跨平台复盘时，再补 `utm_source_platform` 或 `utm_content`。",
          "把命名规范写成团队共享文档，避免后续各自扩展。",
        ],
      },
      {
        heading: "先把口径建好，后面的分析才有业务含义",
        paragraphs: [
          "GA4 能做很多细分分析，但前提是输入参数足够稳定。AI 搜索流量刚起量时最容易被忽视，也最应该趁早统一口径。",
          "对 B2B 官网来说，这不是分析洁癖，而是把 GEO 从内容动作真正接到获客闭环的必要条件。",
        ],
      },
    ],
  },
  {
    slug: "volcengine-web-search-multi-query-content",
    title: "火山方舟 Web Search 会自动发起多关键词搜索后，专题页要先把同义问题收进一页",
    summary:
      "火山方舟 Web Search 插件文档提到，模型可自动发起多次搜索，并支持通过 `max_keyword_num` 调整关键词数量。对企业内容来说，这意味着同一个高意图问题要把同义表达、比较维度和结论层放在一页里，方便被多轮检索命中。",
    category: "豆包生态",
    keywords:
      "一路凯歌,火山方舟,Web Search,max_keyword_num,同义问题页,GEO专题页,AI搜索优化",
    seoDescription:
      "火山方舟 Web Search 支持多关键词搜索后，企业专题页应整合同义问题和比较维度，提升 AI 搜索命中与引用稳定性。",
    sourceNote:
      "火山方舟官方插件文档写明，模型可自动多次发起搜索，并支持通过 `max_keyword_num` 控制搜索关键词数量。",
    references: [
      {
        label: "火山引擎官方文档：Web Search 插件",
        url: "https://www.volcengine.com/docs/82379/1523448",
      },
    ],
    faqs: [
      {
        question: "为什么多关键词搜索会影响专题页设计？",
        answer:
          "因为同一个用户问题可能被拆成多种同义检索，专题页若只覆盖一种说法，就更难在完整链路中持续命中。",
      },
      {
        question: "专题页最值得补哪些内容？",
        answer:
          "建议补同义问法、比较维度、典型场景和结论首段，让页面既能被搜到，也能被直接引用。",
      },
      {
        question: "这和传统关键词布局有什么区别？",
        answer:
          "传统关键词布局偏向单词或短语覆盖，AI 搜索更强调问题簇、场景簇和答案结构的整体完整性。",
      },
    ],
    sections: [
      {
        heading: "一次提问，背后可能对应多次检索",
        paragraphs: [
          "火山方舟 Web Search 把多次搜索能力写进了插件文档，这说明模型在回答复杂问题时，并不会只押一个关键词。它可能围绕同一问题，从多个角度补充搜索结果。",
          "对企业官网来说，这种机制会放大专题页是否完整的差距。页面如果只覆盖一种问法，另一种同义表达或比较维度缺失，就容易在后续检索里掉队。",
        ],
      },
      {
        heading: "高意图专题页要把同义问题收在一起",
        paragraphs: [
          "例如用户想问的是“GEO 怎么做”，模型后续很可能继续搜索“AI 搜索优化流程”“品牌可见性提升方法”“DeepSeek 和豆包入口如何布局”。如果这些表达分散在很多轻量页面里，AI 不一定能顺利拼回完整结论。",
          "一路凯歌更倾向把一个采购阶段的关键问题写成专题页：首段给结论，中段拆解流程和边界，后段补相关问题与下一步动作。这样更适合多关键词检索下的连续引用。",
        ],
        bullets: [
          "专题页标题用完整问题，而不是过短关键词。",
          "正文里显式写出同义表达和比较维度。",
          "将 FAQ、案例和服务页与专题页互相内链。",
        ],
      },
      {
        heading: "问题簇思维，才适合中文 AI 问答入口",
        paragraphs: [
          "中文 AI 入口正在快速演化，用户问法也更口语化、更多轮。企业如果仍按孤立关键词写页面，信息资产会很快被场景化问答拉开差距。",
          "把高意图问题做成可比较、可扩展的专题页，才更接近 GEO 长期有效的内容底座。",
        ],
      },
    ],
  },
  {
    slug: "volcengine-web-parser-multiformat-source-pages",
    title: "火山方舟网页解析能读取 PDF、PPT 和表格后，企业白皮书别只留一张长图封面",
    summary:
      "火山方舟网页解析插件文档说明，它可读取网页、PDF、PPT、表格等多种在线文件。对企业来说，这意味着白皮书、方案书和案例材料不能只做图片化展示，至少要保留可访问、可解析、可引用的正文版本。",
    category: "豆包生态",
    keywords:
      "一路凯歌,火山方舟,网页解析插件,PDF解析,PPT解析,白皮书页面,GEO内容结构化",
    seoDescription:
      "火山方舟网页解析支持 PDF、PPT 和表格后，企业白皮书与案例材料应提供可解析正文页，提升 AI 搜索引用与结构化复用能力。",
    sourceNote:
      "火山方舟官方网页解析插件文档列出了网页、PDF、PPT、XLSX、CSV 等可解析格式，并强调需要提供可访问的在线链接。",
    references: [
      {
        label: "火山引擎官方文档：网页解析插件",
        url: "https://www.volcengine.com/docs/82379/1510950",
      },
    ],
    faqs: [
      {
        question: "为什么多格式解析会影响企业白皮书发布方式？",
        answer:
          "因为 AI 工具越来越能直接读取在线文档，若企业只留图片化封面或扫码下载页，关键信息就不容易被理解和引用。",
      },
      {
        question: "最适合优先改造哪些资料？",
        answer:
          "建议优先改造白皮书摘要页、案例页、产品参数页和常被销售转发的方案资料，确保至少有一版正文可直接访问。",
      },
      {
        question: "这会不会替代 PDF 下载？",
        answer:
          "不会，PDF 仍可保留，但最好同时提供网页摘要或正文页，让搜索和 AI 引用都能拿到核心结论。",
      },
    ],
    sections: [
      {
        heading: "可下载，不等于可被理解",
        paragraphs: [
          "很多企业已经有白皮书、方案书、案例集，但官网上的呈现方式常常只有一张封面图、一个下载按钮，甚至只有扫码领取。对人来说还能接受，对 AI 搜索和网页解析工具来说，这样的材料几乎等于不存在。",
          "火山方舟网页解析把网页、PDF、PPT 和表格列为可处理格式，提醒内容团队：资料不仅要能下载，还要能被在线读取和拆解。",
        ],
      },
      {
        heading: "为什么要补一版网页正文或摘要页",
        paragraphs: [
          "即使企业继续保留 PDF 下载，也应该同步提供一版网页摘要，至少说明主题、适用对象、核心结论和目录结构。这样搜索系统和 AI 工具才能先理解资料值不值得引用。",
          "一路凯歌在做企业内容结构化时，会把原本藏在下载页后的资料，先抽出一层可公开引用的摘要页，再决定哪些完整内容继续放在 PDF 或私域交付里。",
        ],
        bullets: [
          "白皮书页先写清标题、适用对象和三到五条核心结论。",
          "案例集保留可访问正文，而不是只放海报图。",
          "参数表或清单类资料尽量提供文本版或表格版摘要。",
        ],
      },
      {
        heading: "这样做同时服务 SEO、GEO 和销售复用",
        paragraphs: [
          "网页正文或摘要页既能帮助搜索引擎收录，也能让 AI 工具提炼内容，还能让销售团队更方便复制关键信息。一次整理，三种场景都会受益。",
          "对高价值 B2B 资料来说，公开摘要层和私域完整版的组合，往往比纯下载页更有长期获客价值。",
        ],
      },
    ],
  },
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
    feedDate: toFeedDate(datetime),
    url: `${siteUrl}/news/${slug}.html`,
  };
}

function toFeedDate(datetime) {
  const date = new Date(datetime);
  return date.toUTCString().replace("GMT", "+0000");
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
          <p>本文基于公开可核验资料改写整理，重点提炼对企业 GEO、AI 搜索可见性和内容结构化的实际启发，不代表相关平台的完整产品说明。</p>
          <ul>
${refsHtml}
          </ul>

${buildArticleNav(article, allArticles)}
        </article>
        <aside class="article-aside reveal">
          <div class="aside-card"><span>Method</span><strong>先做内容结构，再看平台入口</strong><p>把品牌定义、FAQ、案例和转化动作写清楚，才能同时服务 SEO 收录与 AI 引用。</p><a href="../index.html#services">查看 GEO 服务</a></div>
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

function patchExistingDraftArticle(article, allArticles) {
  let html = read(`news/${article.slug}.html`);
  html = html.replace(
    /<meta property="article:published_time" content="[^"]+" \/>/,
    `<meta property="article:published_time" content="${article.datetime}" />`,
  );
  html = html.replace(
    /<meta property="article:modified_time" content="[^"]+" \/>/,
    `<meta property="article:modified_time" content="${article.datetime}" />`,
  );
  html = html.replace(/"datePublished"\s*:\s*"[^"]+"/, `"datePublished":"${article.datetime}"`);
  html = html.replace(/"dateModified"\s*:\s*"[^"]+"/, `"dateModified":"${article.datetime}"`);
  html = html.replace(
    /<div class="article-meta"><time datetime="[^"]+">[^<]+<\/time><span>/,
    `<div class="article-meta"><time datetime="${article.date}">${article.date}</time><span>`,
  );
  html = html.replaceAll("kimi-web-search-token-budget.html", "volcengine-web-search-multi-query-content.html");
  html = html.replace(/<div class="article-nav">[\s\S]*?<\/div>/, buildArticleNav(article, allArticles));
  write(`news/${article.slug}.html`, html);
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
  const staticUrls = [
    { loc: `${siteUrl}/`, priority: "1.0", changefreq: "weekly", lastmod: "2026-05-31" },
    { loc: `${siteUrl}/about.html`, priority: "0.8", changefreq: "monthly", lastmod: "2026-05-28" },
    { loc: `${siteUrl}/news.html`, priority: "0.8", changefreq: "daily", lastmod: "2026-05-31" },
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

function main() {
  const draftMap = new Map(
    publishSchedule
      .filter((draft) => existingDraftSlugs.has(draft.slug))
      .map((draft) => {
      const parsed = parseArticleFile(draft.slug);
      return [
        draft.slug,
        {
          ...parsed,
          date: draft.date,
          datetime: draft.datetime,
          feedDate: draft.feedDate,
        },
      ];
    }),
  );

  const generatedMap = new Map(
    generatedArticles.map((article) => {
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

  const todayArticles = publishSchedule
    .map((item) => draftMap.get(item.slug) ?? generatedMap.get(item.slug))
    .sort((a, b) => (a.datetime < b.datetime ? 1 : -1));

  const legacyArticles = legacyOrder.map((slug) => {
    const parsed = parseArticleFile(slug);
    return {
      ...parsed,
      feedDate: withShanghaiFeedDate(parsed.datetime),
    };
  });

  const allArticles = [...todayArticles, ...legacyArticles];
  validateUniqueness(allArticles);

  for (const article of todayArticles) {
    if (draftMap.has(article.slug)) {
      patchExistingDraftArticle(article, allArticles);
    } else {
      write(`news/${article.slug}.html`, buildGeneratedArticlePage(article, allArticles));
    }
  }

  updateNewsPage(allArticles);
  updateHomePage(allArticles);
  updateSitemap(allArticles);
  updateFeed(allArticles);
  validateLinks(allArticles);

  console.log(`Published 10 articles for 2026-05-31 and updated aggregations.`);
}

main();
