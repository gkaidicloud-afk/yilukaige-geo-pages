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
  "google-who-how-why-ai-assisted-content",
  "google-people-first-newsroom-ai-content",
  "tencent-yuanbao-time-range-update-pages",
  "qwen-web-search-extractor-code-pages",
  "chatgpt-enterprise-sources-bing-governance",
  "openai-web-search-clickable-citations-pages",
  "google-dns-errors-ai-index-loss",
  "google-spa-history-api-crawlable-links",
  "google-pdf-canonical-whitepaper-files",
  "google-canonical-city-pages-ai-source",
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
    slug: "google-ai-search-unique-value-b2b-pages",
    date: "2026-06-02",
    datetime: "2026-06-02T09:00:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:00:00 +0800",
  },
  {
    slug: "google-shared-images-stable-urls-brand-assets",
    date: "2026-06-02",
    datetime: "2026-06-02T09:02:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:02:00 +0800",
  },
  {
    slug: "deepseek-cache-hit-tokens-knowledge-prefix",
    date: "2026-06-02",
    datetime: "2026-06-02T09:04:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:04:00 +0800",
  },
  {
    slug: "deepseek-json-output-service-faq-fields",
    date: "2026-06-02",
    datetime: "2026-06-02T09:06:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:06:00 +0800",
  },
  {
    slug: "qwen-web-search-model-compatibility-pages",
    date: "2026-06-02",
    datetime: "2026-06-02T09:08:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:08:00 +0800",
  },
  {
    slug: "kimi-thinking-web-search-layered-content",
    date: "2026-06-02",
    datetime: "2026-06-02T09:10:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:10:00 +0800",
  },
  {
    slug: "chatgpt-user-public-links-controlled-actions",
    date: "2026-06-02",
    datetime: "2026-06-02T09:12:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:12:00 +0800",
  },
  {
    slug: "volcengine-update-meta-knowledge-labels",
    date: "2026-06-02",
    datetime: "2026-06-02T09:14:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:14:00 +0800",
  },
  {
    slug: "volcengine-batch-pipeline-faq-rollout",
    date: "2026-06-02",
    datetime: "2026-06-02T09:16:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:16:00 +0800",
  },
  {
    slug: "yuanbao-authoritative-timely-sources-pages",
    date: "2026-06-02",
    datetime: "2026-06-02T09:18:00+08:00",
    feedDate: "Tue, 02 Jun 2026 09:18:00 +0800",
  },
];

const articleMap = new Map(
  [
    {
      slug: "google-ai-search-unique-value-b2b-pages",
      title: "Google 说 AI 搜索仍看重独特价值后，B2B 页面别再用“定义大全”互相改写",
      summary:
        "Google 在 AI 搜索实践文档里强调独特、非商品化价值后，B2B 官网就更不该把同类定义、趋势复述和空泛方法页反复改写成多篇文章。真正更容易被 AI 采用的，是带有一手判断、边界条件和实际证据的页面。",
      category: "内容策略",
      keywords:
        "一路凯歌,Google AI搜索,独特价值,B2B内容,GEO优化,AI搜索优化,内容差异化,企业专题页",
      seoDescription:
        "Google 强调 AI 搜索看重独特价值后，B2B 企业更应减少定义堆砌和同题改写，改做有判断、有证据的专题页。",
      sourceNote:
        "Google 在官方博客中明确提出，想在 AI 搜索里表现更好，应聚焦独特、有价值、对人有帮助的内容，而不是可被大量复制的商品化文本。",
      references: [
        {
          label: "Google Search Central Blog: Succeeding in AI Search",
          url: "https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search",
        },
      ],
      sections: [
        {
          heading: "AI 搜索更容易放大“有没有独特判断”",
          paragraphs: [
            "Google 在 AI 搜索内容建议里把方向说得更直白了：如果内容只是从别人已有材料里重组出一份“差不多的答案”，它很难长期形成优势。对 B2B 企业尤其如此，因为采购问题天然更看重方法、边界和证据。",
            "很多行业站喜欢连发多篇“什么是 GEO”“AI 搜索优化怎么做”式文章，但如果每篇都只重复定义和趋势，这种内容即使被收录，也很难在 AI 回答中持续被优先采用。",
          ],
        },
        {
          heading: "B2B 页面更该补的是一手经验和适用边界",
          paragraphs: [
            "真正有用的页面，不只是解释概念，而是回答客户判断时卡住的问题，例如“哪些企业适合先做 FAQ 结构化”“什么时候应该先补 GA4 归因而不是先追问 AI 排名”。这类内容带的是决策帮助，而不是概念复读。",
            "一路凯歌更建议把内容写成研究备忘录式专题页：先给结论，再说明依据、适用对象、执行步骤和不适用场景。这样的结构更容易同时服务 SEO 收录、销售沟通和 AI 引用。",
          ],
          bullets: [
            "优先写客户会反复追问的判断题，而不是泛定义。",
            "在正文里保留适用条件、反例和风险提示。",
            "把一手案例拆成可引用的做法、字段和流程结论。",
          ],
        },
        {
          heading: "日更的关键不是题目多，而是增量真",
          paragraphs: [
            "AI 搜索会把多个来源放在一起比较，谁有更多独特信息，谁更可能被保留下来。对企业资讯日更来说，这意味着今天写的平台动态，最好一定能落到官网结构、FAQ 字段、监测口径或内容治理动作上。",
            "如果只是把公开新闻换个说法发一遍，既难形成品牌差异，也难建立长期可见性。",
          ],
        },
      ],
      faqs: [
        {
          question: "Google 说的独特价值，落到 B2B 官网上是什么？",
          answer:
            "就是页面里有客户做决策时真正需要的新判断、新边界和新证据，而不是把行业定义换个说法再写一遍。",
        },
        {
          question: "为什么“定义大全”类文章越来越难形成优势？",
          answer:
            "因为这些内容容易商品化，多个站点都能快速改写，AI 更倾向保留信息密度更高、更有独特性的来源。",
        },
        {
          question: "一路凯歌更建议先写什么类型的内容？",
          answer:
            "先写高意图问题页、方法页和边界页，让官网先拥有可引用的判断资产，再扩展资讯数量。",
        },
      ],
    },
    {
      slug: "google-shared-images-stable-urls-brand-assets",
      title: "Google 明确共享图片 URL 要稳定后，品牌图表和案例图别再每篇换地址",
      summary:
        "Google 在图片 SEO 更新里强调，如果同一图片会在站内多处复用，应尽量使用一致的 URL。对品牌官网来说，这意味着案例图、对比图、数据图和证书图不该每发一篇文章就换一个新文件地址。",
      category: "图片 SEO",
      keywords:
        "一路凯歌,图片SEO,稳定图片URL,品牌图表,案例图,GEO优化,Google图片,资产复用",
      seoDescription:
        "Google 建议共享图片使用稳定 URL 后，企业品牌图表、案例图和证书图更应复用同一资源地址，减少资产碎片化。",
      sourceNote:
        "Google 在图片 SEO 更新中明确建议，共享图片如果可能，应始终使用一致 URL，以便系统更稳定理解同一图像资产。",
      references: [
        {
          label: "Google Search Central: Google image SEO best practices",
          url: "https://developers.google.com/search/docs/appearance/google-images",
        },
      ],
      sections: [
        {
          heading: "图片也是品牌知识资产，不只是视觉装饰",
          paragraphs: [
            "很多企业的案例图、服务流程图和数据对比图会在首页、文章页、落地页里反复出现，但每次都重新导出一个文件名。对内容团队来说只是省事，对搜索和 AI 来说却会把同一资产拆成很多碎片。",
            "Google 这次强调共享图片尽量用稳定 URL，本质上是在提醒站点：一张经常被复用的重要图片，也应该被当成有身份的长期资产来管理。",
          ],
        },
        {
          heading: "为什么品牌图表和证书图最需要统一地址",
          paragraphs: [
            "当品牌图表总是换地址时，系统更难把它累计成一个稳定实体，也更难在不同页面之间识别“这是同一组证据”。尤其是行业报告截图、案例指标图和标准证书图，本来就承担信任说明作用，更不该每次重新命名后散落在站内。",
            "一路凯歌更建议企业把高价值图像拆成稳定素材层，再让不同页面去引用它，而不是让编辑各自上传各自版本。这样做还能顺带减少重复文件和后续维护成本。",
          ],
          bullets: [
            "案例图和证书图优先复用固定图片地址。",
            "同一图像的 alt 文本和标题保持语义一致。",
            "不要用截图套截图的方式反复生成新文件。",
          ],
        },
        {
          heading: "图片地址稳定，也会反向提升内容治理",
          paragraphs: [
            "当图像资产有稳定 URL，文章、专题页和资料页之间就更容易建立一致引用。对 GEO 来说，这能让图、文、FAQ 和案例互相印证，而不是每个页面都像一套临时拼装材料。",
            "图片管理做得越稳定，品牌可信度的可累积性就越强。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么同一张图反复换地址会有问题？",
          answer:
            "因为这会把同一资产拆成多个分散文件，不利于系统稳定识别它们属于同一张关键图片。",
        },
        {
          question: "哪些图片最值得先做稳定 URL 管理？",
          answer:
            "优先是案例图、数据图、证书图、流程图和品牌标准素材，这些图片最常承担信任表达任务。",
        },
        {
          question: "这件事只影响图片搜索吗？",
          answer:
            "不只影响图片搜索，也会影响页面之间如何围绕同一视觉证据建立稳定引用关系。",
        },
      ],
    },
    {
      slug: "deepseek-cache-hit-tokens-knowledge-prefix",
      title: "DeepSeek 把 cache hit token 写进响应后，企业知识前缀终于能被量化复盘",
      summary:
        "DeepSeek 官方文档说明开启上下文缓存后，命中和未命中的 token 会分别出现在响应体里。对企业做知识资产建设来说，这意味着那些稳定重复出现的品牌前缀、FAQ 字段和服务定义，终于可以被量化复盘，而不只是凭感觉判断是否值得保留。",
      category: "DeepSeek",
      keywords:
        "一路凯歌,DeepSeek,context caching,cache hit tokens,知识前缀,GEO内容结构,FAQ字段",
      seoDescription:
        "DeepSeek 返回 cache hit token 指标后，企业可更量化地复盘品牌知识前缀、FAQ 字段和标准定义是否值得沉淀为稳定块。",
      sourceNote:
        "DeepSeek 文档说明命中上下文缓存后，响应会返回 prompt_cache_hit_tokens 与 prompt_cache_miss_tokens，可用于观察重复前缀的复用效果。",
      references: [
        {
          label: "DeepSeek API Docs: Context Caching",
          url: "https://api-docs.deepseek.com/guides/kv_cache",
        },
      ],
      sections: [
        {
          heading: "可复用知识块第一次有了更直接的量化线索",
          paragraphs: [
            "DeepSeek 把缓存命中 token 和未命中 token 直接回传出来，给了内容结构一个很实用的启发：哪些信息适合当稳定前缀，不用再只靠经验猜。对企业而言，公司名、服务定义、FAQ 字段、交付边界这类内容，本来就适合长期稳定复用。",
            "当这类前缀被更频繁命中时，团队就更能判断哪些公开知识块值得沉淀为固定模板，哪些只是一次性文案，不该反复出现。",
          ],
        },
        {
          heading: "品牌知识前缀应该怎么设计",
          paragraphs: [
            "所谓知识前缀，不是简单把一大段品牌介绍每次都贴上去，而是提炼那些最常用、最不该漂移的定义块。比如品牌主体、服务边界、行业适配对象、联系方式、FAQ 字段名，都适合成为结构稳定的复用区。",
            "一路凯歌更倾向把这些内容先做成公开一致的表达，再映射到官网、资讯模板和智能体提示中。这样内容治理和模型调用就能共享同一套底层表达。",
          ],
          bullets: [
            "先识别会跨页面反复出现的品牌定义块。",
            "让字段名、顺序和措辞保持长期稳定。",
            "把稳定前缀和时效更新块分开，不要全部混写。",
          ],
        },
        {
          heading: "这也会反过来约束官网内容结构",
          paragraphs: [
            "如果一套知识定义每次写法都不同，就算模型侧支持缓存，也很难稳定复用。反过来，当团队开始关注可复用前缀，官网表达自然也会更统一，AI 搜索里的品牌实体一致性会更强。",
            "这就是为什么上下文缓存虽然是接口特性，却能直接影响公开内容治理方法。",
          ],
        },
      ],
      faqs: [
        {
          question: "什么内容最适合做成稳定前缀？",
          answer:
            "最适合的是品牌主体、服务定义、常用字段名、FAQ 模板和交付边界等长期不常变的知识块。",
        },
        {
          question: "命中 token 指标能直接代表 GEO 效果吗？",
          answer:
            "不能直接代表曝光或转化，但它能帮助团队判断哪些知识块更适合沉淀为可复用标准表达。",
        },
        {
          question: "为什么这会影响官网内容写法？",
          answer:
            "因为想提高复用效率，前提就是公开表达先统一，官网、FAQ 和智能体提示最好共享同一套底层定义。",
        },
      ],
    },
    {
      slug: "deepseek-json-output-service-faq-fields",
      title: "DeepSeek 要求 JSON Output 输出有效 JSON 后，服务页和 FAQ 更适合先做字段化",
      summary:
        "DeepSeek 的 JSON Output 文档明确要求输出必须是有效 JSON，并建议在示例和提示里清楚给出目标结构。对企业官网来说，这再一次说明 FAQ、服务能力、交付范围和联系方式，不该只写成长段自然语言，而应先有稳定字段层。",
      category: "DeepSeek",
      keywords:
        "一路凯歌,DeepSeek,JSON Output,FAQ结构化,服务页字段化,GEO优化,结构化内容",
      seoDescription:
        "DeepSeek 要求 JSON Output 返回有效 JSON 后，企业 FAQ、服务页和联系方式更应先整理成字段化内容层，方便 AI 抽取与复用。",
      sourceNote:
        "DeepSeek 文档强调，使用 JSON Output 时需要通过系统或用户提示清楚描述结构，并确保返回内容是有效 JSON。",
      references: [
        {
          label: "DeepSeek API Docs: JSON Output",
          url: "https://api-docs.deepseek.com/guides/json_mode",
        },
      ],
      sections: [
        {
          heading: "结构先稳定，模型才更容易少猜",
          paragraphs: [
            "当模型开始明确要求有效 JSON，企业就更不该把核心服务信息都埋在散文式介绍里。FAQ、交付方式、服务边界、适用对象，如果先有清楚字段，后续无论是生成 JSON、做摘要还是做问答，都更稳定。",
            "这不是要求官网变成接口文档，而是要求关键事实先有标准表达，再由页面把它展开成自然语言。",
          ],
        },
        {
          heading: "FAQ 和服务页最适合先做字段化",
          paragraphs: [
            "FAQ 天然就适合 Question、Answer、适用对象、限制条件这类字段；服务页也适合拆成服务名称、目标客户、交付内容、周期、边界、下一步动作。字段清楚之后，既能生成更稳定 JSON，也更利于前台页面保持一致。",
            "一路凯歌通常会先做一层内部字段表，再把它投射到官网服务页、资讯模板和外部分发内容里。这样不同渠道对同一服务的称呼就不会反复漂移。",
          ],
          bullets: [
            "先为 FAQ 设计统一字段名和顺序。",
            "把服务边界和不适用对象写成可枚举项。",
            "联系方式和下一步动作也尽量结构化呈现。",
          ],
        },
        {
          heading: "字段化不是技术洁癖，而是 AI 可见性的底座",
          paragraphs: [
            "当多个模型和平台都开始依赖结构化输出能力时，谁先把品牌公开信息整理成稳定字段，谁就更容易减少误读、减少多端不一致，并让站点更像可靠知识源。",
            "GEO 最终拼的不是写了多少词，而是关键事实能否稳定被理解和复用。",
          ],
        },
      ],
      faqs: [
        {
          question: "字段化是不是只对 API 有用？",
          answer:
            "不是，字段化也会直接改善官网表达一致性、FAQ 抽取效果和 AI 对品牌事实的理解稳定性。",
        },
        {
          question: "服务页最值得先结构化哪些信息？",
          answer:
            "优先结构化服务名称、适用对象、交付内容、周期、限制条件、FAQ 和联系方式。",
        },
        {
          question: "为什么有效 JSON 会影响官网写法？",
          answer:
            "因为模型如果依赖明确结构来输出，官网最好先提供稳定结构，避免它只能从大段自然语言里猜测关键字段。",
        },
      ],
    },
    {
      slug: "qwen-web-search-model-compatibility-pages",
      title: "通义千问把联网搜索支持模型列得更细后，企业别把“能联网”当成所有模型通用能力",
      summary:
        "阿里云百炼在联网搜索文档里把支持联网搜索的模型列得很具体，同时也建议在特定场景搭配其他工具。对企业内容团队来说，这提醒我们不要把‘能联网’理解成模型默认全能，而要按能力边界设计公开内容层和知识层。",
      category: "通义千问",
      keywords:
        "一路凯歌,通义千问,联网搜索,模型兼容性,百炼,GEO优化,内容分层,中文AI入口",
      seoDescription:
        "通义千问把联网搜索支持模型列得更细后，企业更应按模型能力边界设计 FAQ、资料页和公开知识层，而不是假设所有模型都会联网补全。",
      sourceNote:
        "阿里云百炼联网搜索文档列出了当前支持的模型范围，并说明在 Responses API 场景下建议结合其他内置工具一起使用。",
      references: [
        {
          label: "阿里云百炼帮助中心：大模型如何联网搜索",
          url: "https://help.aliyun.com/zh/model-studio/web-search/",
        },
      ],
      sections: [
        {
          heading: "模型能力有边界，官网表达不能靠默认脑补",
          paragraphs: [
            "很多团队看到平台支持联网搜索，就默认认为只要模型上线，一切缺失信息都能靠实时搜索补回来。但阿里云百炼把支持模型和工具组合写得很细，反而说明一件事：不同模型、不同工具路径的能力边界并不相同。",
            "对企业品牌来说，最稳妥的做法从来不是依赖模型替你补全关键事实，而是先把品牌定义、服务范围、FAQ 和案例结论放在公开页面里，确保不联网时也能被正确理解。",
          ],
        },
        {
          heading: "按能力边界设计内容分层，比追功能名更重要",
          paragraphs: [
            "一路凯歌更建议把官网内容分成三层：第一层是公开核心定义和服务页，第二层是 FAQ 与参数字段，第三层才是依赖联网或外部工具才能补充的时效信息。这样即使模型能力不同，品牌也不会因入口差异而被完全误读。",
            "模型能力列得越细，企业越该减少把关键信息寄托在外部搜索上的习惯。",
          ],
          bullets: [
            "核心定义和服务边界放在公开主页面。",
            "FAQ、价格口径和交付条件做成稳定字段层。",
            "时效信息和外部资料再作为补充引用层。",
          ],
        },
        {
          heading: "中文 AI 问答入口越多，统一表达越重要",
          paragraphs: [
            "同一品牌会同时面对通义千问、DeepSeek、豆包、元宝和 Kimi 等多个入口。谁先把基础内容做稳，谁就更能跨平台保持一致可见性。",
            "否则每个平台多一个能力开关，品牌表达就多一层不确定性。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么不能把关键事实都交给联网搜索补全？",
          answer:
            "因为不同模型和工具组合的能力边界不同，最稳妥的品牌做法仍是先把核心事实放在公开可访问页面里。",
        },
        {
          question: "官网内容分层最少应该怎么做？",
          answer:
            "至少分成公开定义层、FAQ 字段层和时效补充层，避免所有内容混成一段口号式介绍。",
        },
        {
          question: "这对通义千问之外的平台也有意义吗？",
          answer:
            "有，因为内容分层本身就是跨平台通用的 GEO 基础，不依赖某一个模型能力开关。",
        },
      ],
    },
    {
      slug: "kimi-thinking-web-search-layered-content",
      title: "Kimi K2.5 思考模式暂不兼容联网搜索后，品牌问答页要把“推理素材”和“实时事实”分层",
      summary:
        "Moonshot 官方文档说明，Kimi K2.5 的 `web_search` 目前不兼容 thinking 模式。这个边界对品牌官网的启发很直接：那些需要稳定推理的定义、比较逻辑和边界条件，最好先放在站内公开内容里；实时数据和外部事实则作为补充层管理。",
      category: "Kimi",
      keywords:
        "一路凯歌,Kimi K2.5,thinking mode,web_search,推理素材,实时事实,GEO优化,中文AI问答",
      seoDescription:
        "Kimi K2.5 thinking 模式暂不兼容联网搜索后，企业更应把推理所需定义、FAQ 和比较逻辑先沉淀到官网，实时事实作为补充层管理。",
      sourceNote:
        "Moonshot 官方文档写明，Kimi K2.5 的 `web_search` 当前与 thinking 模式不兼容，这意味着推理过程未必总能同步依赖外部检索。",
      references: [
        {
          label: "Moonshot Open Platform：Kimi K2.5 快速开始",
          url: "https://platform.moonshot.cn/docs/guide/kimi-k2-5-quickstart",
        },
      ],
      sections: [
        {
          heading: "推理和联网分层，反而让品牌内容结构更清楚",
          paragraphs: [
            "当 thinking 模式和联网搜索不能同时使用时，模型更依赖已有上下文完成推理。对企业来说，这意味着品牌官网要主动承载那些需要稳定推理的基础材料，例如服务定义、比较框架、决策步骤和常见误区。",
            "如果这些内容只散落在外部报道或临时链接里，品牌在问答场景里的可控性就会下降。",
          ],
        },
        {
          heading: "什么属于推理素材，什么属于实时事实",
          paragraphs: [
            "推理素材更偏向长期稳定的知识，例如行业定义、服务边界、比较维度、FAQ、交付流程。实时事实则更偏向价格、活动、发布时间、版本更新和外部引用。把两类内容分开，既能让站内知识更稳，也方便后续在不同入口里单独更新时效层。",
            "一路凯歌在做 GEO 内容矩阵时，会把这两层拆开维护，避免每次小更新都把核心定义一起改乱。",
          ],
          bullets: [
            "定义、流程、FAQ 归入长期稳定知识层。",
            "价格、活动、版本号归入时效更新层。",
            "推理所需关键结论尽量不要只放在外部链接里。",
          ],
        },
        {
          heading: "中文 AI 问答入口的共同点，是先看你自己站内有没有主张",
          paragraphs: [
            "不只是 Kimi，其他中文 AI 入口也都在不断调整联网和推理能力组合。与其追每一次能力变化，不如先把品牌自己的推理素材沉淀完整。",
            "这样模型能联网时把你当主来源，不能联网时也仍有机会基于你的稳定定义回答问题。",
          ],
        },
      ],
      faqs: [
        {
          question: "什么内容最适合放在推理素材层？",
          answer:
            "最适合的是定义、流程、FAQ、比较标准和边界条件，这些内容需要长期稳定，便于模型在无联网时也能推理。",
        },
        {
          question: "实时事实层应该包含什么？",
          answer:
            "更适合放价格、版本更新、活动安排、发布日期和外部新闻引用，这些内容需要更高频更新。",
        },
        {
          question: "为什么这会影响官网内容结构？",
          answer:
            "因为一旦推理不能默认依赖联网，品牌自己站内是否具备完整定义和判断框架，就会直接影响回答质量。",
        },
      ],
    },
    {
      slug: "chatgpt-user-public-links-controlled-actions",
      title: "ChatGPT-User 属于用户触发访问后，报价页和试算器要分清公开链接与受控操作",
      summary:
        "OpenAI 的爬虫文档说明，ChatGPT-User 用于用户在产品内触发访问外部网站，它并不用于自动抓取网页做搜索索引。对企业官网来说，这意味着有些页面应该公开给用户跳转查看，但涉及登录、试算和报价动作时，仍要保留明确的受控交互边界。",
      category: "OpenAI Crawlers",
      keywords:
        "一路凯歌,ChatGPT-User,OpenAI爬虫,公开链接,受控操作,报价页,试算器,GEO优化",
      seoDescription:
        "ChatGPT-User 属于用户触发访问后，企业报价页和试算器更应区分公开说明链接与需要登录、提交或受控执行的操作边界。",
      sourceNote:
        "OpenAI 官方爬虫说明写明，ChatGPT-User 用于用户发起的操作，不是用于自动抓取网页以训练或填充搜索索引。",
      references: [
        {
          label: "OpenAI Platform Docs: GPTBot and ChatGPT-User",
          url: "https://platform.openai.com/docs/gptbot",
        },
      ],
      sections: [
        {
          heading: "公开可看和可执行操作，本来就该分层",
          paragraphs: [
            "ChatGPT-User 不是搜索抓取器，而是用户在产品里主动请求访问外部网站时使用的访问身份。这提醒企业一个基本原则：公开说明页、产品介绍页和 FAQ 应该尽量清楚可访问，但一旦涉及报价、登录、试算或提交动作，就应有明确的受控边界。",
            "否则页面既可能过度暴露本应受控的交互，又可能因为说明层太弱，让用户跳转后仍然看不懂该做什么。",
          ],
        },
        {
          heading: "报价页和试算器最容易踩的两个坑",
          paragraphs: [
            "第一个坑是把价格逻辑和适用条件全塞进登录后页面，导致公开层只剩“联系我们”。第二个坑是把试算器做成可点击但没有任何前置说明，用户到了页面也不知道输入什么、会得到什么结果。",
            "一路凯歌更建议保留公开可引用的说明层，再把具体操作放进受控流程。这样既能让 AI 与用户理解页面用途，也能保护真正需要授权或人工确认的业务步骤。",
          ],
          bullets: [
            "公开页说明价格影响因素和适用对象。",
            "受控页再处理真实报价、试算或提交动作。",
            "按钮前先写清输入项、输出项和下一步动作。",
          ],
        },
        {
          heading: "这同样会影响 GEO 的转化承接",
          paragraphs: [
            "AI 搜索带来访问只是第一步，用户落地后是否理解页面、是否知道哪些可以直接看、哪些需要提交资料，决定了能不能顺利进入转化链路。",
            "公开链接和受控操作分清楚，既有利于品牌可信度，也有利于高客单价业务的线索管理。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么报价页不该只剩一个“联系我们”按钮？",
          answer:
            "因为用户和 AI 都需要先理解报价受哪些条件影响，公开说明层太弱会直接降低后续咨询质量。",
        },
        {
          question: "试算器页面公开层最少要写什么？",
          answer:
            "至少应说明适用对象、输入项、输出项、结果用途和下一步动作，避免跳转后没有上下文。",
        },
        {
          question: "ChatGPT-User 和搜索爬虫最大的区别是什么？",
          answer:
            "ChatGPT-User 是用户触发访问，不是自动搜索抓取，因此更像一次带着明确意图的外部访问，而不是索引行为。",
        },
      ],
    },
    {
      slug: "volcengine-update-meta-knowledge-labels",
      title: "火山方舟更新文档 meta 会自动触发索引更新后，知识标签别再只写在文件名里",
      summary:
        "火山方舟知识库 API 文档说明，调用 `update_meta` 更新文档元信息后会自动触发索引更新。这个能力对企业知识治理的启发很明确：行业、产品线、地区、版本和服务阶段等标签，最好先做成独立元数据，而不是只藏在文件名或正文里。",
      category: "豆包生态",
      keywords:
        "一路凯歌,火山方舟,update_meta,知识库标签,元数据,GEO优化,豆包知识库,内容治理",
      seoDescription:
        "火山方舟更新文档 meta 会自动触发索引更新后，企业更应把行业、地区、产品线和版本标签做成独立元数据，而不是只写在文件名里。",
      sourceNote:
        "火山方舟知识库文档说明，修改文档元信息后会自动触发文档索引更新，体现出标签和元数据在知识检索中的重要性。",
      references: [
        {
          label: "火山方舟文档：知识库列表 API",
          url: "https://www.volcengine.com/docs/82379/1261890",
        },
      ],
      sections: [
        {
          heading: "知识标签不该继续当作文案碎片来管理",
          paragraphs: [
            "很多企业把地区、行业、产品线和版本信息写在文件名、标题甚至上传备注里，却没有把它们作为结构化标签管理。这样一来，知识库内容虽然看起来很多，但真正检索和筛选时却很难稳定复用。",
            "火山方舟把 `update_meta` 和自动重建索引连起来，正说明元数据不是装饰，而是知识可发现性的关键部分。",
          ],
        },
        {
          heading: "哪些标签最值得从正文里抽出来",
          paragraphs: [
            "优先值得结构化的通常是行业、地区、产品线、文档类型、适用阶段、发布时间和版本号。这些维度既能支持知识检索，也能反过来指导官网页面如何统一命名和聚合。",
            "一路凯歌在做内容结构化时，会先设计标签字典，再反推文章、FAQ、资料页和知识库条目的字段。这样后续无论是官网检索、站外分发还是模型调用，都更不容易混乱。",
          ],
          bullets: [
            "行业、地区、产品线优先独立成字段。",
            "版本号和文档类型不要只放在标题里。",
            "标签命名先统一，再开始大规模补内容。",
          ],
        },
        {
          heading: "标签治理也会改善公开内容的引用能力",
          paragraphs: [
            "当知识标签在内部是清晰的，公开页面往往也更容易形成稳定分组，例如按行业 FAQ、按地区服务页、按版本更新页。这会直接提升品牌内容在 AI 问答里的可解释性。",
            "所以元数据治理不仅是知识库工程，也是官网 GEO 工程。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么标签不该只写在文件名里？",
          answer:
            "因为文件名不等于稳定元数据，后续筛选、更新、重建索引和多端复用都会更困难。",
        },
        {
          question: "最值得优先字段化的标签有哪些？",
          answer:
            "优先是行业、地区、产品线、文档类型、版本号、适用阶段和发布日期等高频筛选维度。",
        },
        {
          question: "这和官网 GEO 有什么关系？",
          answer:
            "当内部标签清晰后，公开页面也更容易形成稳定分组和一致命名，AI 更容易理解品牌知识结构。",
        },
      ],
    },
    {
      slug: "volcengine-batch-pipeline-faq-rollout",
      title: "火山方舟支持 batch-to-pipeline 和 re-process 后，FAQ 改版可以先小范围验证再全量同步",
      summary:
        "火山方舟实验版本文档提供了 `batch_to_pipeline`、`reprocess` 等能力，允许企业批量创建处理链路并重跑数据。对 FAQ 和知识库治理来说，这意味着大改版不必一次性全量替换，而可以先小批测试字段、标签和召回效果，再逐步放大范围。",
      category: "豆包生态",
      keywords:
        "一路凯歌,火山方舟,batch_to_pipeline,reprocess,FAQ改版,知识库治理,GEO优化,豆包生态",
      seoDescription:
        "火山方舟支持 batch-to-pipeline 和 re-process 后，企业 FAQ 和知识库改版更适合先小范围验证字段与召回，再逐步全量同步。",
      sourceNote:
        "火山方舟实验版本文档提供批量创建处理管线与重跑能力，说明知识库数据可以采用分批验证、重处理和再同步的治理方式。",
      references: [
        {
          label: "火山方舟文档：知识库列表 API",
          url: "https://www.volcengine.com/docs/82379/1261890",
        },
      ],
      sections: [
        {
          heading: "知识库大改版最怕一次性推倒重来",
          paragraphs: [
            "很多企业意识到 FAQ 写法混乱、标签不统一时，第一反应是把整库一起重做。但一旦字段设计或标签字典有问题，全量同步反而会把错误放大。",
            "火山方舟支持批量建 pipeline 和重处理，给了团队一个更稳妥的办法：先做一小批验证，确认召回、标签和结构没有跑偏，再扩大范围。",
          ],
        },
        {
          heading: "FAQ 改版可以按批次验证哪些东西",
          paragraphs: [
            "最适合先小范围验证的是字段设计、标签字典、FAQ 标题问法、答案长度和资料分类方式。它们会同时影响知识库检索、官网 FAQ 页面和 AI 入口的回答稳定性。",
            "一路凯歌更建议把 FAQ 改版当成一次持续优化项目，而不是一轮文案替换。先跑一组样本，看哪些问题被召回、哪些答案被误配，再决定是否扩大。",
          ],
          bullets: [
            "先抽一组高频 FAQ 做字段试点。",
            "验证标签、问法和答案长度是否稳定召回。",
            "确认无误后再批量扩容到全库。",
          ],
        },
        {
          heading: "分批治理，本质上更适合 B2B 长周期知识资产",
          paragraphs: [
            "B2B 知识不是流量短视频，很多定义和问法要长期稳定。分批验证让团队能在不破坏整体体验的前提下持续改进内容结构。",
            "这会比一次性全量替换更适合高客单价品牌的知识治理节奏。",
          ],
        },
      ],
      faqs: [
        {
          question: "为什么 FAQ 改版不适合一次性全量替换？",
          answer:
            "因为字段、标签或问法一旦设计错误，会把误差快速放大到整个知识库和所有公开页面。",
        },
        {
          question: "最值得先试点的 FAQ 样本是什么？",
          answer:
            "优先选高频、边界明确、业务价值高的问题，这类 FAQ 最能快速暴露结构和召回问题。",
        },
        {
          question: "分批验证除了知识库还有什么收益？",
          answer:
            "它还能反向统一官网 FAQ、行业问题页和销售话术，让公开知识和内部知识逐步对齐。",
        },
      ],
    },
    {
      slug: "yuanbao-authoritative-timely-sources-pages",
      title: "腾讯元宝强调权威时效信源后，企业公告和政策解读页要保留原始出处链",
      summary:
        "腾讯联网搜索 API 产品页把权威信源、时效更新和内容质量放在同一套能力表述里。对企业官网来说，这意味着公告、政策解读、版本说明和活动通知页不仅要写日期，还要保留原始出处、引用链和更新说明，方便中文 AI 问答入口判断可信度。",
      category: "腾讯元宝",
      keywords:
        "一路凯歌,腾讯元宝,权威信源,时效内容,原始出处,GEO优化,政策解读,公告页",
      seoDescription:
        "腾讯元宝强调权威时效信源后，企业公告、政策解读和更新说明页更应保留原始出处链、日期和变更说明。",
      sourceNote:
        "腾讯联网搜索 API 产品页把权威时效内容、分钟级更新和高质量信源作为能力卖点，说明出处链和时间链会越来越重要。",
      references: [
        {
          label: "腾讯云：联网搜索 API",
          url: "https://cloud.tencent.com/product/wsa",
        },
      ],
      sections: [
        {
          heading: "中文 AI 问答入口越来越看重出处链",
          paragraphs: [
            "当平台把权威信源和时效更新都当成能力重点时，企业页面就不能再只保留一段自己的解读，而没有原始出处链。尤其是政策解读、版本公告和活动通知这类内容，用户和模型都需要知道你引用了谁、什么时候发、有没有后续变更。",
            "如果只剩一段没有来源的整理稿，即使内容被抓到，也很难在高敏感度或高时效问题里被稳定采用。",
          ],
        },
        {
          heading: "公告页和解读页最容易忽略的三个环节",
          paragraphs: [
            "第一是原始出处链接，第二是发布日期和更新时间，第三是本页新增的解读或适用提示。很多企业只保留第二层自己的话，却没有把第一层原始依据显式写出来。",
            "一路凯歌更建议把“原始出处”“本文判断”“适用对象”“后续动作”四件事放进固定模板。这样一篇公告页既能服务人，也能服务 AI 对权威链路的理解。",
          ],
          bullets: [
            "保留原始公告、政策或版本页链接。",
            "写清发布日期、更新时间和本次变更摘要。",
            "区分平台原话与企业自己的执行解读。",
          ],
        },
        {
          heading: "出处链清楚，也更适合 B2B 获客复盘",
          paragraphs: [
            "高客单价客户在接触品牌时，往往会继续核验来源。公告页、政策解读页如果能把来源链保留完整，既有利于 AI 可见性，也有利于销售后续把客户引回可信原文。",
            "出处链越完整，内容越像可审阅的专业资料，而不是一次性观点输出。",
          ],
        },
      ],
      faqs: [
        {
          question: "公告页为什么不能只写企业自己的解读？",
          answer:
            "因为没有原始出处链时，用户和模型都更难判断你的判断依据来自哪里，时效和权威性也更难核验。",
        },
        {
          question: "出处链最少应包含什么？",
          answer:
            "至少应包含原始链接、发布日期、更新时间和本文新增解读的边界说明。",
        },
        {
          question: "这对中文 AI 问答入口为什么特别重要？",
          answer:
            "因为这类入口更常处理‘最新’‘最近’‘政策变化’等问题，谁的出处链更清楚，谁更容易成为可采用来源。",
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

    <footer class="site-footer"><div class="footer-main"><div class="footer-brand"><a class="brand" href="../index.html#top" aria-label="${brandName}返回首页"><span class="brand-mark"><img src="../assets/logo.png" alt="${brandName}品牌标志" /></span><span><strong>${brandName}</strong><small>AI Search Growth</small></span></a><p>专注 GEO 生成式引擎优化，帮助企业把真实能力沉淀成 AI 可理解、可引用、可推荐的品牌知识资产。</p><div class="footer-contact"><a href="tel:18610730255">18610730255</a><span>北京市</span></div></div><nav class="footer-links" aria-label="页脚导航"><div><h3>服务</h3><a href="../index.html#services">GEO 服务</a><a href="../index.html#advantages">核心优势</a><a href="../index.html#cases">适用场景</a></div><div><h3>公司</h3><a href="../about.html">关于我们</a><a href="../news.html">行业资讯</a><a href="../index.html#contact">联系我们</a></div><div><h3>资源</h3><a href="../index.html#faq">常见问题</a><a href="../llms.txt">AI 索引文件</a><a href="../sitemap.xml">站点地图</a></div></nav></div><div class="footer-bottom"><span>© 2026 . All Rights Reserved.</span><a class="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">京ICP备19004756号-3</a></div></footer>
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
    /\n(?:\s*<\/section>\s*<\/div>\s*)+\s*<\/section>\n\n\s*<section class="lead-section compact-lead">/,
    "\n      </section>\n\n      <section class=\"lead-section compact-lead\">",
  );
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
    throw new Error(`Usage: node tools/publish-news-20260602.mjs <1-${publishSchedule.length}>`);
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

  console.log(`Published ${count} articles for 2026-06-02 and updated aggregations.`);
}

main();
