import fs from "fs";
import path from "path";

const root = process.cwd();
const siteUrl = "https://www.yilukaige.com";
const orgName = "北京一路凯歌网络科技有限公司";
const brandName = "一路凯歌";
const baikeUrl = "https://baike.baidu.com/item/%E4%B8%80%E8%B7%AF%E5%87%AF%E6%AD%8C/58297174";

const schedule = [
  ["qwen-freshness-enterprise-news-pages", "2026-06-03T12:00:00+08:00"],
  ["openai-crawlers-adsbot-searchbot-landing-pages", "2026-06-03T12:02:00+08:00"],
  ["chatgpt-search-query-rewrite-utm-attribution", "2026-06-03T12:04:00+08:00"],
  ["google-ai-mode-long-queries-b2b-question-chain", "2026-06-03T12:06:00+08:00"],
  ["google-ai-features-index-text-internal-links", "2026-06-03T12:08:00+08:00"],
  ["google-ai-source-links-evidence-body-content", "2026-06-03T12:10:00+08:00"],
  ["openai-workspace-agents-enterprise-permission-boundary", "2026-06-03T12:12:00+08:00"],
  ["tencent-web-search-api-authoritative-source-pages", "2026-06-03T12:14:00+08:00"],
  ["volcengine-web-search-toolchain-extractable-pages", "2026-06-03T12:16:00+08:00"],
  ["deepseek-cache-json-output-knowledge-fields", "2026-06-03T12:18:00+08:00"],
].map(([slug, datetime]) => ({
  slug,
  datetime,
  date: datetime.slice(0, 10),
  feedDate: toFeedDate(datetime),
}));

const articles = new Map([
  article({
    slug: "qwen-freshness-enterprise-news-pages",
    title: "通义千问联网搜索支持 freshness 后，企业资讯页要保留时效标签",
    category: "通义千问",
    keywords: "一路凯歌,通义千问,联网搜索,freshness,GEO优化,企业资讯页,AI搜索优化",
    description:
      "阿里云百炼联网搜索文档提到 freshness 时间范围后，企业资讯和公告页更需要保留发布日期、更新时间和原始出处。",
    summary:
      "阿里云百炼在联网搜索文档里把 freshness 时间范围写进参数说明，并建议在特定场景同时启用 web_search、web_extractor 和 code_interpreter。放到企业 GEO 里看，资讯页不能只是“发出来”，还要让模型看得出新旧、能抽取正文、能继续做比较。",
    sourceNote:
      "阿里云百炼联网搜索文档说明，查询近期新闻或最新动态时可通过 freshness 参数限制搜索时间范围，并在 Responses API 场景建议组合使用搜索、抽取和代码解释工具。",
    references: [
      ["阿里云百炼：联网搜索", "https://help.aliyun.com/zh/model-studio/web-search/"],
      ["阿里云百炼：大模型服务平台百炼", "https://help.aliyun.com/zh/model-studio/"],
    ],
    sections: [
      [
        "时效不是写在编辑心里的字段",
        [
          "很多企业资讯页只有标题和正文，发布日期藏在模板角落，更新时间甚至完全缺失。到了 AI 搜索场景，问题不只是用户看不看得到，而是模型能不能把这篇内容识别为“近期可用资料”。",
          "百炼文档里的 freshness 参数给内容团队提了个醒：时效性已经变成检索时会被明确判断的条件。企业如果希望公告、政策解读、产品更新被 AI 用来回答近期问题，就不能把时间信息写得含糊。",
        ],
      ],
      [
        "页面要同时能搜、能抽取、能比较",
        [
          "联网搜索只是第一步。企业页面被搜到之后，还要能被抽取关键字段，必要时还能被拿去做横向比较。标题、摘要、发布时间、版本号、适用对象、引用来源，都应该是稳定可识别的信息块。",
          "一路凯歌建议把资讯页拆成三个层次：首段给结论，正文给背景和边界，尾部给来源与更新时间。这样既适合搜索索引，也适合大模型在多步问答中复用。",
        ],
        ["每篇资讯保留发布日期和更新时间。", "首段直接回答这条信息对客户有什么影响。", "来源链接不要只放图片或截图，要保留可点击文本。"],
      ],
      [
        "日更不是越多越好，而是越可判断越好",
        [
          "如果每天都发行业资讯，最怕的不是频率高，而是每篇都缺少增量判断。企业要让 AI 理解品牌观点，就需要持续说明“这条变化为什么重要、对谁重要、下一步该做什么”。",
        ],
      ],
    ],
    faqs: [
      ["freshness 对企业官网有什么启发？", "它提醒企业把发布日期、更新时间和版本边界做成显式信息，让 AI 能判断内容是否适合回答近期问题。"],
      ["资讯页只写新闻摘要够吗？", "不够。还应写清影响对象、适用场景、原始来源和下一步动作，避免被模型当成泛泛转载。"],
      ["一路凯歌会怎么处理这类页面？", "会把资讯拆成结论、依据、影响和可执行建议四层，同时补齐结构化数据和内链。"],
    ],
  }),
  article({
    slug: "openai-crawlers-adsbot-searchbot-landing-pages",
    title: "OpenAI 提醒放行 AdsBot 和 SearchBot 后，企业落地页别被安全策略误拦",
    category: "OpenAI Crawlers",
    keywords: "一路凯歌,OpenAI,OAI-AdsBot,OAI-SearchBot,落地页,GEO优化,AI搜索收录",
    description:
      "OpenAI 面向广告主和发布者的爬虫说明提示，企业落地页要分别检查 robots、CDN、人机验证和安全策略，避免关键页面被 AI 入口误拦。",
    summary:
      "OpenAI 最新帮助文档把广告审核相关的 OAI-AdsBot、搜索引用相关的 OAI-SearchBot 以及用户触发访问场景分开说明。企业 AI 服务官网如果被 robots、WAF、验证码或 CDN 规则误拦，内容写得再完整，也可能进不了 AI 搜索和广告验证流程。",
    sourceNote:
      "OpenAI 的广告主爬虫指南建议允许 OAI-AdsBot，并建议同时允许 OAI-SearchBot；发布者 FAQ 也提示网站若希望出现在 ChatGPT 搜索摘要和链接中，应确保没有阻止 OAI-SearchBot。",
    references: [
      ["OpenAI Help：Advertiser Guidance for Allowing OpenAI Web Crawlers", "https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers"],
      ["OpenAI Help：Publishers and Developers FAQ", "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq"],
    ],
    sections: [
      [
        "落地页的第一关是能被访问",
        [
          "企业做 GEO 时常常先改标题、FAQ 和结构化数据，但 OpenAI 的爬虫说明把一个更基础的问题放到了前面：页面是否真的允许相关爬虫访问。很多官网在安全策略上只考虑真人访问，却忘了 AI 搜索和广告审核也需要读取公开页面。",
          "如果人机验证、CDN 防护或 WAF 把爬虫挡掉，搜索入口可能只看到标题，甚至完全无法确认页面内容。",
        ],
      ],
      [
        "不同爬虫代表不同业务目的",
        [
          "OAI-AdsBot 更偏向广告落地页验证，OAI-SearchBot 更偏向搜索发现和引用。企业不需要把所有爬虫一刀切放开，但至少要知道每一种访问代表什么目的，再决定哪些公开页面应该允许、哪些后台或报价动作应该继续保护。",
          "一路凯歌通常会把 robots.txt、服务器日志、CDN 规则和页面 meta 一起检查，避免出现“页面看似公开，实际对 AI 入口不可读”的情况。",
        ],
        ["公开服务页、资讯页和案例页优先允许抓取。", "表单提交、报价试算和登录后台继续设置权限边界。", "用日志确认爬虫状态码，不只看浏览器能否打开。"],
      ],
      [
        "安全和可见性不是对立关系",
        [
          "真正成熟的做法不是关掉防护，而是分层放行。公开内容服务于品牌发现，受控操作服务于业务安全。两者分清，GEO 才不会和安全策略互相打架。",
        ],
      ],
    ],
    faqs: [
      ["企业应该允许哪些 OpenAI 爬虫？", "公开落地页通常需要至少评估 OAI-AdsBot 和 OAI-SearchBot 是否可访问，具体范围要结合页面用途配置。"],
      ["只改 robots.txt 就够了吗？", "不够，还要检查 CDN、WAF、人机验证、状态码和页面 meta，确认爬虫真的能读到正文。"],
      ["这和 GEO 有什么关系？", "GEO 的前提是内容可被发现、读取和引用；如果入口被误拦，后续内容优化很难生效。"],
    ],
  }),
  article({
    slug: "chatgpt-search-query-rewrite-utm-attribution",
    title: "ChatGPT Search 会改写查询并追加 UTM，GEO 页面要同时服务发现和归因",
    category: "ChatGPT Search",
    keywords: "一路凯歌,ChatGPT Search,查询改写,UTM,AI搜索流量,GEO优化,GA4归因",
    description:
      "OpenAI 文档提到 ChatGPT Search 会改写查询，发布者 FAQ 说明来源 URL 会带 utm_source=chatgpt.com，企业页面要同时考虑被发现和可归因。",
    summary:
      "OpenAI 的 ChatGPT Search 说明提到，系统可能把用户问题改写成一个或多个更适合检索的查询；发布者 FAQ 又说明，来自 ChatGPT 的推荐 URL 会包含 utm_source=chatgpt.com。对企业官网来说，GEO 已经不只是“能被 AI 提到”，还要能在 GA4 里复盘这次曝光是否带来访问和线索。",
    sourceNote:
      "OpenAI 帮助中心说明 ChatGPT Search 可能根据上下文和位置改写查询；发布者 FAQ 说明 ChatGPT 搜索推荐会在 referral URL 中自动包含 utm_source=chatgpt.com。",
    references: [
      ["OpenAI Help：ChatGPT Search", "https://help.openai.com/en/articles/9237897-chatgpt-search"],
      ["OpenAI Help：Publishers and Developers FAQ", "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq"],
      ["Google Analytics Help：Campaigns and traffic sources", "https://support.google.com/analytics/answer/11242841"],
    ],
    sections: [
      [
        "用户问的是一句话，搜索执行的是一组查询",
        [
          "ChatGPT Search 不一定把用户原话直接拿去搜索，而是可能改写成更具体的查询组合。企业页面不能只盯一个关键词排名，更要覆盖用户问题背后的场景、条件、比较维度和地域信息。",
          "例如“哪家企业 AI 服务适合制造业”背后可能包含模型部署、数据安全、知识库、行业案例、成本和实施周期等多个子问题。",
        ],
      ],
      [
        "GEO 要接上归因，否则只能看感觉",
        [
          "OpenAI 发布者 FAQ 提到 ChatGPT 推荐流量会带上 utm_source=chatgpt.com，这给企业复盘提供了入口。页面被 AI 引用之后，是否带来访问、停留、电话点击或表单提交，需要进入 GA4 事件体系。",
          "一路凯歌建议把 AI 来源流量单独建渠道口径，并把页面主题、CTA、表单和电话点击串起来看。这样才能判断某类内容是只带曝光，还是能带来潜在线索。",
        ],
        ["页面标题覆盖真实问题，不只覆盖短词。", "GA4 中单独识别 chatgpt.com 等 AI referral。", "把电话点击、表单提交和微信复制做成关键事件。"],
      ],
      [
        "被发现和能复盘要一起设计",
        [
          "如果内容团队只负责写稿，数据团队事后才想追踪，就很容易漏掉来源参数、事件名称和页面分组。GEO 更适合在发布前就把“如何被发现”和“如何被复盘”一起设计。",
        ],
      ],
    ],
    faqs: [
      ["查询改写会改变 SEO 选题吗？", "会。选题应从单关键词转向问题簇，覆盖用户做判断时会连续追问的几个子问题。"],
      ["ChatGPT 流量怎么在 GA4 看？", "可以关注 referral、utm_source=chatgpt.com、自定义渠道分组和关键事件转化。"],
      ["一路凯歌会怎么做归因？", "会把 AI referral、页面主题和线索动作放在同一套报表里，而不是只看曝光截图。"],
    ],
  }),
  article({
    slug: "google-ai-mode-long-queries-b2b-question-chain",
    title: "Google AI Mode 查询变长后，B2B 内容要从关键词页升级为问题链",
    category: "Google AI Mode",
    keywords: "一路凯歌,Google AI Mode,长查询,B2B内容,GEO优化,问题链,AI搜索",
    description:
      "Google 公开分享 AI Mode 用户会提出更长、更复杂的问题，B2B 官网需要从单页关键词覆盖升级为完整问题链。",
    summary:
      "Google 近期分享 AI Mode 使用洞察，提到用户在 AI Mode 中提出的问题更长、更接近真实想法，规划、决策和创意类需求增长明显。B2B 企业做内容时，不能只做“某某服务是什么”，还要回答从判断、选择、执行到复盘的一整条问题链。",
    sourceNote:
      "Google 官方博客提到，AI Mode 让用户提出更长、更复杂的问题，平均查询长度明显高于传统搜索，并且规划、决策等意图增长更快。",
    references: [
      ["Google Blog：How AI Mode is changing the way people search in the U.S.", "https://blog.google/products-and-platforms/products/search/ai-mode-us-insights/"],
      ["Google Search Central：AI features and your website", "https://developers.google.com/search/docs/appearance/ai-features"],
    ],
    sections: [
      [
        "长查询不是长尾词的旧瓶装新酒",
        [
          "传统 SEO 里，长尾词常常被理解成低搜索量关键词。但 AI Mode 的长查询更像真实对话：用户会把背景、条件、目标和顾虑一次性说出来。企业如果只准备短定义页，就很难覆盖这种复杂意图。",
          "B2B 客户尤其如此。他们不是只问“GEO 是什么”，还会问“我的行业适不适合做、需要准备哪些材料、多久能看到线索、怎么避免被认为是投喂”。",
        ],
      ],
      [
        "问题链比关键词库更适合 AI 搜索",
        [
          "一路凯歌在做企业内容规划时，会把一个主题拆成定义、适用对象、方案比较、实施流程、风险边界、效果复盘六类问题。每类问题都对应页面段落、FAQ 或独立文章。",
          "这样做的价值不是堆页面，而是让 AI 在生成复杂答案时能找到上下文：用户处在采购前、方案选择中，还是上线复盘阶段。",
        ],
        ["首页回答品牌是什么。", "服务页回答怎么交付。", "专题页回答行业如何选择。", "资讯页回答近期变化和边界。"],
      ],
      [
        "B2B 内容要能接住下一问",
        [
          "AI 搜索不是一次点击结束，用户会追问。页面里如果有清晰内链和延伸 FAQ，就更容易让用户继续走向咨询，而不是读完一个定义就离开。",
        ],
      ],
    ],
    faqs: [
      ["什么是问题链内容？", "它不是单个关键词页面，而是围绕一个采购或决策场景，连续回答多个相关问题的内容体系。"],
      ["B2B 企业为什么更需要问题链？", "因为 B2B 决策周期长，用户会连续比较适配度、成本、风险和效果，单页口号不足以支持判断。"],
      ["一路凯歌如何规划问题链？", "会从目标客户的真实提问出发，把问题拆成服务页、FAQ、案例页和资讯页之间的内链网络。"],
    ],
  }),
  article({
    slug: "google-ai-features-index-text-internal-links",
    title: "Google 说 AI features 没有额外标记后，GEO 基础还是索引、文本和内链",
    category: "Google AI Search",
    keywords: "一路凯歌,Google AI features,GEO优化,索引,内链,结构化数据,AI搜索",
    description:
      "Google Search Central 明确 AI Overviews 和 AI Mode 没有额外技术要求，企业 GEO 应先把索引、可见文本、内链和结构化数据打牢。",
    summary:
      "Google Search Central 的 AI features 文档写得很直接：想出现在 AI Overviews 或 AI Mode，不需要特殊的 AI 标记，也没有额外 schema。真正要做的仍是让页面可抓取、可索引、可摘要、可内链，并让结构化数据和页面可见内容一致。",
    sourceNote:
      "Google Search Central 文档说明，AI Overviews 和 AI Mode 没有额外技术要求，页面需满足 Google Search 的基础技术要求，并能作为搜索结果中的 supporting link 展示。",
    references: [
      ["Google Search Central：AI features and your website", "https://developers.google.com/search/docs/appearance/ai-features"],
      ["Google Search Central：Crawling and indexing", "https://developers.google.com/search/docs/crawling-indexing"],
    ],
    sections: [
      [
        "没有神秘标签，只有基本功",
        [
          "GEO 行业里经常出现新的文件、标签和缩写，但 Google 官方文档反而把事情拉回基本面：AI features 不需要额外的 schema 或特殊标记。页面先要能被正常抓取、索引，并具备摘要资格。",
          "这对企业是一个提醒：不要把预算都花在表面概念上，而忽略了 robots、canonical、正文可见性、内链和移动端体验。",
        ],
      ],
      [
        "结构化数据必须和可见内容一致",
        [
          "很多网站把 Organization、FAQ、Article 写进 JSON-LD，却没有在页面正文里真正展示同样的信息。Google 明确提醒结构化数据要匹配可见文本。对 AI 来说，这也是减少误解的关键。",
          "一路凯歌会先检查页面里用户能看到什么，再决定结构化数据怎么写。隐藏在代码里的关键词不能替代清楚的服务说明。",
        ],
        ["重要信息用正文展示，不只放 JSON-LD。", "FAQ 问答要和页面实际内容一致。", "内链用可点击的 a 标签连接相关页面。"],
      ],
      [
        "GEO 不应绕过 SEO，而应升级 SEO",
        [
          "AI 搜索入口扩展了搜索场景，但并没有取消基础搜索规则。企业要做的是让原本的 SEO 基础更适合 AI 读取和引用，而不是另起一套互相冲突的页面体系。",
        ],
      ],
    ],
    faqs: [
      ["AI Mode 需要特殊 schema 吗？", "Google 文档说明没有额外特殊 schema，基础仍是可抓取、可索引、可摘要和有帮助的内容。"],
      ["结构化数据为什么要和可见内容一致？", "因为搜索系统和 AI 都需要核对页面实际展示的信息，隐藏字段不能替代真实内容。"],
      ["企业应优先检查哪些基础项？", "robots、canonical、正文文本、内链、移动端体验、FAQ 一致性和 Search Console 索引状态。"],
    ],
  }),
  article({
    slug: "google-ai-source-links-evidence-body-content",
    title: "Google 强化 AI 回答中的来源链接后，企业观点页要把证据写在正文里",
    category: "Google AI Search",
    keywords: "一路凯歌,Google AI搜索,来源链接,证据页,GEO优化,原创内容,企业观点",
    description:
      "Google 强调 AI 搜索中的来源链接和原创内容发现，企业观点页需要把证据、出处和判断写进正文，而不是只写口号。",
    summary:
      "Google 在介绍 AI 搜索如何帮助用户探索网页时强调，会在 AI 回答中展示更多与要点相关的来源链接，帮助用户继续访问原始内容。企业观点页想被引用，靠的不是空泛观点，而是带有证据、边界和可核验出处的正文段落。",
    sourceNote:
      "Google 官方博客说明，AI Mode 和 AI Overviews 会升级来源链接呈现，让用户更容易发现原始内容和支持信息。",
    references: [
      ["Google Blog：How AI Mode and AI Overviews help you explore the web", "https://blog.google/products-and-platforms/products/search/explore-web-generative-ai-search/"],
      ["Google Search Central：Creating helpful, reliable, people-first content", "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"],
    ],
    sections: [
      [
        "AI 回答里的链接正在变成证据入口",
        [
          "AI 搜索不是只给一段总结就结束。Google 对来源链接的强调说明，支持性网页仍然是用户继续判断的重要路径。企业如果希望成为被点击的来源，就要让页面本身具备证据价值。",
          "单纯写“我们领先、专业、可靠”，很难成为支持链接。更有价值的是解释为什么、适用于谁、有什么限制、依据来自哪里。",
        ],
      ],
      [
        "证据要写在正文，不要藏在下载附件里",
        [
          "企业常把真实案例、交付清单和数据口径放在 PDF 或销售材料里，官网只留一句简介。这样做对 AI 搜索不友好，因为模型很难从页面正文抽取到支撑判断的细节。",
          "一路凯歌建议把核心证据先做成网页内容：案例背景、问题、方法、结果口径和限制条件都写清楚，再提供下载版作为补充。",
        ],
        ["观点后面跟依据，不只跟形容词。", "案例页写清行业、问题和交付边界。", "引用外部资料时保留原始链接。"],
      ],
      [
        "原创内容不是“独家口号”",
        [
          "原创的重点不是说没人说过的话，而是提供自己的判断、整理和经验边界。企业内容如果能持续提供可核验的行业解释，就更容易被 AI 当作可引用来源。",
        ],
      ],
    ],
    faqs: [
      ["什么样的页面更容易成为 AI 来源链接？", "通常是结构清楚、正文有证据、来源可核验、结论有边界的页面。"],
      ["企业观点页需要外部引用吗？", "需要时应保留原始链接，但更重要的是把自己的判断和适用场景写清楚。"],
      ["一路凯歌如何做证据页？", "会把案例、FAQ、服务边界、参考来源和 CTA 组织成 AI 可理解的页面结构。"],
    ],
  }),
  article({
    slug: "openai-workspace-agents-enterprise-permission-boundary",
    title: "OpenAI 企业 AI 进入工作流阶段，服务商官网要写清权限、数据源和交付边界",
    category: "企业 AI 服务",
    keywords: "一路凯歌,OpenAI Business,workspace agents,企业AI服务,权限治理,数据源,GEO优化",
    description:
      "OpenAI Business 发布说明中提到 workspace agents、应用模板和连接器，企业 AI 服务页面应写清权限、数据源、交付范围和治理边界。",
    summary:
      "OpenAI Business 发布说明持续把 workspace agents、应用模板、连接器、表格工具和管理控制放在企业场景中讨论。企业 AI 服务不再只是“接入大模型”，而是要进入真实工作流。服务商官网如果想被 AI 搜索正确推荐，就必须写清数据源、权限、审批、日志和交付边界。",
    sourceNote:
      "OpenAI Business release notes 提到工作区代理、应用模板、连接器和管理员控制；OpenAI 企业 AI 文章也强调企业需要把 AI 连接到内部系统、外部数据源，并由合适权限和控制治理。",
    references: [
      ["OpenAI Help：ChatGPT Business Release Notes", "https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes"],
      ["OpenAI：The next phase of enterprise AI", "https://openai.com/index/next-phase-of-enterprise-ai/"],
      ["OpenAI Business", "https://openai.com/business/"],
    ],
    sections: [
      [
        "企业 AI 正从工具变成工作流",
        [
          "OpenAI 面向 Business 和 Enterprise 的更新，核心不是多一个聊天入口，而是让代理连接企业工具、文件和流程。对客户来说，真正关心的是 AI 能不能在受控环境里完成重复任务，而不是模型名字是否更新。",
          "这会改变企业 AI 服务页面的写法。服务商不能只写“可定制智能体”，还要说明能连接哪些系统、谁能授权、日志如何留存、数据是否参与训练、失败后如何接管。",
        ],
      ],
      [
        "权限边界本身就是销售信息",
        [
          "高决策成本客户最怕的是“黑箱自动化”。如果服务页把权限、审批、人工复核、数据范围和异常处理讲清楚，反而更容易被 AI 搜索推荐给谨慎型企业用户。",
          "一路凯歌建议企业 AI 服务页至少补齐四类字段：可连接系统、可执行动作、需要授权角色、不可执行边界。这样 AI 在回答“哪家公司适合做企业智能体”时，才有足够上下文判断适配度。",
        ],
        ["写清数据源，不要只写“私域知识库”。", "写清动作边界，不要只写“自动化”。", "写清管理员控制和人工复核机制。"],
      ],
      [
        "GEO 也要面向采购顾虑",
        [
          "采购不会只问功能，还会问风险。企业 AI 服务的 GEO 内容，应该主动回答安全、权限、数据、成本和交付责任，而不是只追逐热词。",
        ],
      ],
    ],
    faqs: [
      ["企业 AI 服务页最该补什么？", "最该补数据源、权限、可执行动作、人工复核和交付边界。"],
      ["为什么这些信息有利于 AI 搜索推荐？", "因为 AI 需要判断服务是否适合具体企业场景，边界越清楚，越容易被准确匹配。"],
      ["一路凯歌会如何改这类页面？", "会把服务能力拆成字段、FAQ、流程和风险说明，让采购问题能被 AI 直接理解。"],
    ],
  }),
  article({
    slug: "tencent-web-search-api-authoritative-source-pages",
    title: "腾讯联网搜索 API 强调权威信源后，企业政策解读页要保留原始链接",
    category: "腾讯元宝",
    keywords: "一路凯歌,腾讯联网搜索API,权威信源,企业公告,政策解读,GEO优化,AI搜索",
    description:
      "腾讯云联网搜索 API 产品页强调公开网页、权威垂直信源和指定时间范围检索，企业政策解读页应保留原始出处和更新时间。",
    summary:
      "腾讯云联网搜索 API 产品页把公开网页信源、优质权威垂直信源、指定网址检索、指定时间范围检索等能力写得很清楚。对企业官网来说，AI 搜索越来越在意信息来源质量。政策解读、行业观察、公告和活动页，都应该保留原始链接、发布日期和更新记录。",
    sourceNote:
      "腾讯云联网搜索 API 产品页说明，该产品基于公开互联网资源和腾讯内容来源，并提供权威垂直信源、指定网址检索、指定时间范围检索等能力。",
    references: [
      ["腾讯云：联网搜索API", "https://cloud.tencent.com/product/wsa"],
      ["腾讯云：联网搜索API 产品动态", "https://cloud.tencent.com/document/product/1806/121792"],
    ],
    sections: [
      [
        "权威信源不是页面上的一句自称",
        [
          "企业常在页面里写“权威解读”“官方整理”，但如果没有原始政策链接、发布日期、版本和引用边界，AI 搜索很难判断这份解读是否真的可靠。",
          "腾讯联网搜索 API 把权威信源和时效能力写进产品说明，说明中文 AI 搜索入口正在强化对来源质量的判断。",
        ],
      ],
      [
        "企业公告页要像可追溯档案",
        [
          "政策解读、行业标准、产品版本、活动公告，都不应该只保留一段营销文案。页面应包含原文链接、解读日期、适用范围、是否更新过、企业自己的判断是什么。",
          "一路凯歌建议把这类内容做成“原始来源 + 企业解读 + 适用建议 + 更新时间”的固定结构。这样既利于用户核验，也利于 AI 引用。",
        ],
        ["保留原文链接和来源名称。", "明确发布日期与最近更新时间。", "区分原文事实和企业解读。"],
      ],
      [
        "指定时间范围检索会放大日期质量",
        [
          "当搜索系统支持按时间范围过滤时，页面日期是否规范就会变得更重要。没有日期的内容，很容易在近期问题里失去竞争力。",
        ],
      ],
    ],
    faqs: [
      ["企业政策解读页为什么要保留原始链接？", "因为 AI 和用户都需要核验信息来源，原始链接能提升页面可信度和可引用性。"],
      ["日期信息应该怎么写？", "建议同时保留发布日期、最近更新时间和适用版本，避免只有页面生成时间。"],
      ["一路凯歌如何优化这类内容？", "会把原始出处、解读边界、影响对象和下一步建议做成固定页面模块。"],
    ],
  }),
  article({
    slug: "volcengine-web-search-toolchain-extractable-pages",
    title: "火山方舟 Web Search 走向工具链后，品牌内容要能被搜索、抽取再回答",
    category: "火山方舟",
    keywords: "一路凯歌,火山方舟,Web Search,网页解析,企业知识库,GEO优化,AI搜索",
    description:
      "火山方舟 Web Search 文档展示搜索到回答的工具链，企业品牌内容需要具备可搜索、可解析、可抽取的正文结构。",
    summary:
      "火山方舟 Web Search 文档展示了通过 OpenAI SDK 调用工具完成“AI 思考 - 联网搜索 - 答案生成”的过程。企业官网要想进入答案，内容要先被搜索命中，再能被解析抽取。只做图片海报或长图白皮书，已经不适合企业 AI 服务时代。",
    sourceNote:
      "火山方舟 Web Search 文档介绍了联网内容插件，并展示使用 OpenAI SDK 调用 Web Search 工具完成搜索与答案生成过程。",
    references: [
      ["火山方舟：Web Search（联网内容插件）", "https://www.volcengine.com/docs/82379/1756990"],
      ["火山方舟：产品能力概览", "https://www.volcengine.com/docs/82379/66619f91f281250274ef5000"],
    ],
    sections: [
      [
        "AI 回答前有一条工具链",
        [
          "从用户提问到最终回答，中间可能经历搜索、网页解析、摘要、重排和生成。企业内容如果只考虑人眼浏览，就会在其中某个环节掉队。",
          "火山方舟 Web Search 的文档把过程讲得很清楚：模型可以调用搜索工具，再结合搜索结果生成答案。品牌官网要争取进入这个过程，就要让页面具备机器可读的正文结构。",
        ],
      ],
      [
        "可抽取比视觉包装更重要",
        [
          "很多企业把方案、案例和资质做成长图，视觉上好看，但对联网搜索和网页解析并不友好。AI 更需要文本标题、段落、列表、表格和清楚的链接关系。",
          "一路凯歌建议把核心内容先写成网页正文，再用图片增强表达。尤其是产品对比、服务流程、FAQ 和案例摘要，应避免只存在于海报里。",
        ],
        ["标题直接描述问题和结论。", "正文用段落、列表和表格表达关键信息。", "图片旁边保留文字说明和 alt。"],
      ],
      [
        "企业知识库和官网要分工",
        [
          "私域知识库适合承载内部细节，官网公开页适合承载可引用事实。两者字段一致、命名一致，AI 才更容易把品牌能力理解成稳定实体。",
        ],
      ],
    ],
    faqs: [
      ["什么叫可抽取页面？", "指页面正文以文本、列表、表格和清晰链接呈现，方便搜索和解析工具提取关键信息。"],
      ["长图白皮书还能用吗？", "可以作为视觉补充，但关键结论、目录和摘要应有网页正文版本。"],
      ["一路凯歌会怎么改造页面？", "会先抽出服务字段、FAQ、案例摘要和来源说明，再补充结构化数据和内链。"],
    ],
  }),
  article({
    slug: "deepseek-cache-json-output-knowledge-fields",
    title: "DeepSeek 缓存与 JSON Output 提醒企业知识库先做稳定字段层",
    category: "DeepSeek",
    keywords: "一路凯歌,DeepSeek,Context Caching,JSON Output,企业知识库,GEO优化,FAQ字段化",
    description:
      "DeepSeek Context Caching 与 JSON Output 文档提示，企业知识库和 FAQ 应先形成稳定字段层，方便复用、抽取和自动化处理。",
    summary:
      "DeepSeek API 文档同时展示了 Context Caching 和 JSON Output 两个方向：前者强调稳定前缀可复用，后者强调输出需要有效 JSON。对企业知识资产来说，这不是单纯接口能力，而是在提醒内容团队先把品牌定义、服务字段、FAQ 和交付边界整理成稳定结构。",
    sourceNote:
      "DeepSeek Context Caching 文档说明默认启用缓存，重复前缀可能命中；JSON Output 文档说明模型可按有效 JSON 字符串输出，适合后续解析和自动化流程。",
    references: [
      ["DeepSeek API Docs：Context Caching", "https://api-docs.deepseek.com/guides/kv_cache"],
      ["DeepSeek API Docs：JSON Output", "https://api-docs.deepseek.com/guides/json_mode/"],
      ["DeepSeek API Docs：DeepSeek API Upgrade", "https://api-docs.deepseek.com/news/news0725/"],
    ],
    sections: [
      [
        "稳定字段比长段介绍更适合复用",
        [
          "企业官网里最常见的问题，是同一个服务在首页、方案页、PPT、客服话术里各写一套。到了大模型调用场景，这会造成理解不一致，也浪费上下文。",
          "Context Caching 的思路给内容团队一个启发：经常重复的品牌定义、服务范围、交付边界和 FAQ，应该做成稳定前缀和字段，而不是每次重新发挥。",
        ],
      ],
      [
        "JSON Output 让 FAQ 不再只是给人读",
        [
          "DeepSeek 的 JSON Output 文档强调有效 JSON 输出，说明模型结果越来越多会被下游系统解析。企业 FAQ 如果只有自然语言，自动化系统很难稳定调用；如果有字段层，就能同时服务官网、客服、智能体和数据报表。",
          "一路凯歌建议把 FAQ 拆成 question、short_answer、detail、applicable_to、source、updated_at 等字段，再渲染成用户可读页面。",
        ],
        ["品牌定义字段统一。", "服务能力字段统一。", "FAQ 同时保留短答和展开说明。", "每个字段有更新时间和适用范围。"],
      ],
      [
        "GEO 先要把知识管起来",
        [
          "写文章只是表层动作。真正长期有效的 GEO，是把企业已有知识整理成能被搜索、能被引用、能被模型调用、也能被内部团队维护的结构化资产。",
        ],
      ],
    ],
    faqs: [
      ["企业知识库为什么要字段化？", "字段化能减少多处表达不一致，也方便 AI 抽取、复用和自动化调用。"],
      ["FAQ 字段化会影响用户阅读吗？", "不会。字段层服务系统，前台仍可以渲染成自然问答和文章段落。"],
      ["一路凯歌如何做知识字段层？", "会先统一品牌、服务、案例、FAQ、来源和更新时间，再同步到官网页面和结构化数据。"],
    ],
  }),
]);

function article(item) {
  const scheduled = schedule.find((slot) => slot.slug === item.slug);
  if (!scheduled) throw new Error(`Missing schedule for ${item.slug}`);
  return [item.slug, { ...item, ...scheduled, url: `${siteUrl}/news/${item.slug}.html` }];
}

function h(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content);
}

function indent(text, spaces) {
  const prefix = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line ? prefix + line : line))
    .join("\n");
}

function toFeedDate(datetime) {
  const [datePart, timeWithZone] = datetime.split("T");
  const [timePart] = timeWithZone.split("+");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - 8, minute, second));
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${weekdays[utcDate.getUTCDay()]}, ${String(day).padStart(2, "0")} ${months[month - 1]} ${year} ${timePart} +0800`;
}

function strip(value) {
  return value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function existingArticles(excludeSlugs) {
  const html = read("news.html");
  const cards = [...html.matchAll(/<a class="article-card reveal" href="news\/([^"]+)\.html">\s*<time datetime="([^"]+)">[^<]+<\/time>\s*<span>([^<]+)<\/span>\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)];
  return cards
    .map((match) => {
      const slug = match[1];
      const date = match[2];
      const datetime =
        fs.existsSync(path.join(root, "news", `${slug}.html`))
          ? read(`news/${slug}.html`).match(/<meta property="article:published_time" content="([^"]+)"/)?.[1]
          : null;
      return {
        slug,
        date,
        datetime: datetime || `${date}T09:30:00+08:00`,
        feedDate: toFeedDate(datetime || `${date}T09:30:00+08:00`),
        category: strip(match[3]),
        title: strip(match[4]),
        summary: strip(match[5]),
        url: `${siteUrl}/news/${slug}.html`,
      };
    })
    .filter((item) => !excludeSlugs.has(item.slug));
}

function replaceSection(source, startMarker, endMarker, replacement) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (start === -1 || end === -1) throw new Error(`Cannot replace ${startMarker}`);
  return source.slice(0, start) + replacement + source.slice(end);
}

function jsonLdArticle(article) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      image: [`${siteUrl}/assets/logo-full.webp`],
      datePublished: article.datetime,
      dateModified: article.datetime,
      author: { "@type": "Organization", name: orgName, url: `${siteUrl}/`, sameAs: [baikeUrl] },
      publisher: {
        "@type": "Organization",
        name: orgName,
        sameAs: [baikeUrl],
        logo: { "@type": "ImageObject", url: `${siteUrl}/assets/logo.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/news/${article.slug}.html` },
      articleSection: article.category,
      keywords: article.keywords.split(","),
      citation: article.references.map((item) => item[1]),
      inLanguage: "zh-CN",
    },
    null,
    6,
  );
}

function jsonLdFaq(article) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    null,
    6,
  );
}

function jsonLdBreadcrumb(article) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "行业资讯", item: `${siteUrl}/news.html` },
        { "@type": "ListItem", position: 3, name: article.title, item: `${siteUrl}/news/${article.slug}.html` },
      ],
    },
    null,
    6,
  );
}

function articleNav(article, allArticles) {
  const index = allArticles.findIndex((item) => item.slug === article.slug);
  const prev = index > 0 ? allArticles[index - 1] : null;
  const next = index < allArticles.length - 1 ? allArticles[index + 1] : null;
  return `          <div class="article-nav">
            ${prev ? `<a href="${prev.slug}.html">上一篇：${h(prev.title)}</a>` : `<a href="../news.html">返回资讯列表</a>`}
            ${next ? `<a href="${next.slug}.html">下一篇：${h(next.title)}</a>` : `<a href="../news.html">返回资讯列表</a>`}
          </div>`;
}

function renderArticle(article, allArticles) {
  const sectionHtml = article.sections
    .map(([heading, paragraphs, bullets]) => {
      const lines = [`          <h2>${h(heading)}</h2>`, ...paragraphs.map((p) => `          <p>${h(p)}</p>`)];
      if (bullets?.length) {
        lines.push("          <ul>");
        lines.push(...bullets.map((item) => `            <li>${h(item)}</li>`));
        lines.push("          </ul>");
      }
      return lines.join("\n");
    })
    .join("\n\n");
  const refs = article.references.map(([label, url]) => `            <li><a href="${url}" target="_blank" rel="noopener noreferrer">${h(label)}</a></li>`).join("\n");
  const faqHtml = article.faqs
    .map(([q, a]) => `            <article class="faq-item reveal">\n              <h3>${h(q)}</h3>\n              <p>${h(a)}</p>\n            </article>`)
    .join("\n");
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${h(article.title)} | ${brandName}</title>
    <meta name="description" content="${h(article.description)}" />
    <meta name="keywords" content="${h(article.keywords)}" />
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
    <meta property="og:title" content="${h(article.title)} | ${brandName}" />
    <meta property="og:description" content="${h(article.summary)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${siteUrl}/news/${article.slug}.html" />
    <meta property="og:site_name" content="${brandName}" />
    <meta property="article:published_time" content="${article.datetime}" />
    <meta property="article:modified_time" content="${article.datetime}" />
    <meta property="article:author" content="${orgName}" />
    <meta property="article:section" content="${h(article.category)}" />
    <meta property="og:image" content="${siteUrl}/assets/logo-full.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${h(article.title)} | ${brandName}" />
    <meta name="twitter:description" content="${h(article.summary)}" />
    <meta name="twitter:image" content="${siteUrl}/assets/logo-full.webp" />
    <link rel="stylesheet" href="../styles.css" />
    <script type="application/ld+json" data-seo="article">
${indent(jsonLdArticle(article), 6)}
    </script>
    <script type="application/ld+json" data-seo="breadcrumb">
${indent(jsonLdBreadcrumb(article), 6)}
    </script>
    <script type="application/ld+json" data-seo="faq">
${indent(jsonLdFaq(article), 6)}
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
        <div class="article-meta"><time datetime="${article.date}">${article.date}</time><span>${h(article.category)}</span></div>
        <h1>${h(article.title)}</h1>
        <p>${h(article.summary)}</p>
      </section>
      <section class="article-shell">
        <article class="article-body reveal">
${sectionHtml}

          <div class="article-note">${h(article.sourceNote)}</div>
          <h2>要点总结</h2>
          <ul>
            <li>${h(article.faqs[0][1])}</li>
            <li>${h(article.faqs[1][1])}</li>
            <li>${h(article.faqs[2][1])}</li>
          </ul>
          <h2>参考来源说明</h2>
          <p>本文基于公开可核验资料原创整理，重点提炼对企业 GEO、AI 搜索品牌可见性和企业 AI 服务落地的启发，不替代相关平台完整产品文档。</p>
          <ul>
${refs}
          </ul>
${articleNav(article, allArticles)}
        </article>
        <aside class="article-aside reveal">
          <div class="aside-card"><span>Method</span><strong>先做可引用内容</strong><p>把服务定义、FAQ、证据和出处写清楚，才能同时服务搜索收录与 AI 推荐。</p><a href="../index.html#services">查看 GEO 服务</a></div>
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

function itemListJson(allArticles) {
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

function card(article) {
  return `          <a class="article-card reveal" href="news/${article.slug}.html">
            <time datetime="${article.date}">${article.date}</time>
            <span>${h(article.category)}</span>
            <h3>${h(article.title)}</h3>
            <p>${h(article.summary)}</p>
            <b class="read-link">阅读全文</b>
          </a>`;
}

function updateNews(allArticles) {
  let html = read("news.html");
  const featured = allArticles[0];
  html = html.replace(
    /<script type="application\/ld\+json" data-seo="item-list">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" data-seo="item-list">${indent(itemListJson(allArticles), 10)}</script>`,
  );
  const feature = `      <section class="section news-feature">
        <a class="featured-article reveal" href="news/${featured.slug}.html" aria-label="阅读全文：${h(featured.title)}">
          <div>
            <time datetime="${featured.date}">${featured.date}</time>
            <span>${h(featured.category)}</span>
          </div>
          <h2>${h(featured.title)}</h2>
          <p>${h(featured.summary)}</p>
          <b class="read-link">阅读全文</b>
        </a>
      </section>

`;
  html = replaceSection(html, '      <section class="section news-feature">', '      <section class="section news-list-section">', feature);
  const list = `        <div class="article-grid">
${allArticles.map(card).join("\n")}
        </div>
      </section>`;
  html = replaceSection(html, '        <div class="article-grid">', "        </div>\n      </section>", list);
  write("news.html", html);
}

function updateHome(allArticles) {
  let html = read("index.html");
  const cards = allArticles
    .slice(0, 6)
    .map(
      (article) => `          <a class="insight-card reveal" href="news/${article.slug}.html">
            <time datetime="${article.date}">${article.date}</time>
            <h3>${h(article.title)}</h3>
            <p>${h(article.summary)}</p>
            <b class="read-link">阅读全文</b>
          </a>`,
    )
    .join("\n");
  const section = `      <section class="section" id="insights">
        <div class="section-heading reveal">
          <p class="eyebrow">Insights</p>
          <h2>行业资讯</h2>
          <p>同步更新最新 GEO、AI 搜索、数据衡量与品牌知识资产观察。</p>
        </div>
        <div class="insight-grid">
${cards}
        </div>
        <div class="insight-actions reveal">
          <a class="btn btn-secondary" href="news.html">查看全部行业资讯</a>
        </div>
      </section>

`;
  html = replaceSection(html, '      <section class="section" id="insights">', '      <section class="section faq-section" id="faq">', section);
  write("index.html", html);
}

function updateSitemap(allArticles) {
  const lastmod = allArticles[0].date;
  const staticUrls = [
    [`${siteUrl}/`, lastmod, "weekly", "1.0"],
    [`${siteUrl}/about.html`, "2026-05-28", "monthly", "0.8"],
    [`${siteUrl}/news.html`, lastmod, "daily", "0.8"],
  ];
  const urls = [
    ...staticUrls,
    ...allArticles.map((article) => [`${siteUrl}/news/${article.slug}.html`, article.date, "monthly", "0.7"]),
  ];
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([loc, mod, freq, priority]) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${mod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n")}
</urlset>
`,
  );
}

function updateFeed(allArticles) {
  const items = allArticles
    .slice(0, 20)
    .map(
      (article) => `    <item>
      <title>${h(article.title)}</title>
      <link>${siteUrl}/news/${article.slug}.html</link>
      <guid>${siteUrl}/news/${article.slug}.html</guid>
      <pubDate>${article.feedDate}</pubDate>
      <description>${h(article.summary)}</description>
    </item>`,
    )
    .join("\n");
  write(
    "feed.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${brandName}行业资讯</title>
    <link>${siteUrl}/news.html</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>一路凯歌围绕 GEO、AI 搜索、品牌知识资产、GA4 数据化衡量和 AI 流量归因的文章更新。</description>
    <language>zh-CN</language>
    <lastBuildDate>${allArticles[0].feedDate}</lastBuildDate>
${items}
  </channel>
</rss>
`,
  );
}

function validate(allArticles) {
  const slugs = new Set();
  const titles = new Set();
  for (const article of allArticles) {
    if (slugs.has(article.slug)) throw new Error(`Duplicate slug: ${article.slug}`);
    if (titles.has(article.title)) throw new Error(`Duplicate title: ${article.title}`);
    slugs.add(article.slug);
    titles.add(article.title);
  }
  for (const article of allArticles.slice(0, 20)) {
    if (!fs.existsSync(path.join(root, "news", `${article.slug}.html`))) throw new Error(`Missing ${article.slug}`);
  }
  for (const file of ["index.html", "news.html", ...allArticles.slice(0, 20).map((a) => `news/${a.slug}.html`)]) {
    const html = read(file);
    for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)) {
      JSON.parse(match[1].trim());
    }
  }
}

function main() {
  const count = Number(process.argv[2] || "10");
  if (!Number.isInteger(count) || count < 1 || count > schedule.length) {
    throw new Error(`Usage: node tools/publish-news-20260603.mjs <1-${schedule.length}>`);
  }
  const todaySlugs = new Set(schedule.map((item) => item.slug));
  const today = schedule
    .slice(0, count)
    .map((item) => articles.get(item.slug))
    .sort((a, b) => (a.datetime < b.datetime ? 1 : -1));
  const allArticles = [...today, ...existingArticles(todaySlugs)];
  for (const item of today) {
    write(`news/${item.slug}.html`, renderArticle(item, allArticles));
  }
  updateNews(allArticles);
  updateHome(allArticles);
  updateSitemap(allArticles);
  updateFeed(allArticles);
  validate(allArticles);
  console.log(`Published ${count} articles for 2026-06-03.`);
}

main();
