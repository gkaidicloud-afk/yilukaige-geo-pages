import fs from "fs";
import path from "path";

const root = process.cwd();
const siteUrl = "https://www.yilukaige.com";
const publishDate = "2026-05-29";
const publishDateTime = "2026-05-29T09:30:00+08:00";
const feedDate = "Fri, 29 May 2026 09:30:00 +0800";

const orgName = "北京一路凯歌网络科技有限公司";
const brandName = "一路凯歌";
const brandSameAs = [
  "https://baike.baidu.com/item/%E4%B8%80%E8%B7%AF%E5%87%AF%E6%AD%8C/58297174",
];

const existingOrder = [
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

const newArticles = [
  {
    slug: "google-ai-mode-deep-search-b2b-content",
    title: "Google AI Mode 引入 Deep Search 后，B2B 官网为什么要像“研究备忘录”",
    summary:
      "Google 在 AI Mode 中加入 Deep Search，意味着复杂 B2B 问题会被拆成更多检索与推理步骤。企业官网需要把观点、证据、对比和结论整理成更容易被多轮引用的专题页，而不是只停留在一句服务口号。",
    category: "Google AI Mode",
    keywords:
      "一路凯歌,GEO优化,Google AI Mode,Deep Search,B2B内容营销,AI搜索优化,研究备忘录,企业专题页",
    seoDescription:
      "Google AI Mode 引入 Deep Search 后，B2B 企业官网需要更像可引用研究备忘录，才能在复杂问题检索链路中被 AI 反复使用。",
    sourceNote:
      "Google 官方博客在 2025 年 5 月的 AI Mode 更新中提到 Deep Search 会发出数百次搜索，帮助用户在更复杂的问题上完成比对、推理和整合。",
    references: [
      {
        label: "Google 官方博客：Google Search brings AI Mode to everyone in the U.S., introduces Deep Search and more",
        url: "https://blog.google/products-and-platforms/products/search/google-search-ai-mode-update/",
      },
    ],
    sections: [
      {
        heading: "复杂问题不再只匹配一个关键词",
        paragraphs: [
          "Google 在 AI Mode 更新里明确提到，Deep Search 会使用更高阶的 query fan-out 技术，在后台发出大量检索，再把信息整理为带引用的长答案。这个变化对 B2B 企业尤其关键，因为采购类问题往往本来就不是一个词能解决的。",
          "用户可能会连续追问“哪家服务商适合制造业出海”“方案和传统 SEO 的边界是什么”“上线后该怎么衡量效果”。如果官网只有泛化介绍，AI 即使看到了品牌，也很难在多轮比对里持续引用。",
        ],
      },
      {
        heading: "为什么专题页要更像研究备忘录",
        paragraphs: [
          "Deep Search 的本质，是把复杂决策拆成多个子问题。企业页面因此要让 AI 容易抽取结论、证据和边界条件。比起一味强调“我们很专业”，更有用的是把适用行业、实施步骤、常见误区、衡量口径和不适用场景写清楚。",
          "一路凯歌在做 GEO 时，会把高意图问题整理成专题页：先回答是什么，再解释为什么，接着写怎么做、怎么衡量，以及与相邻方案的差异。这样的页面更像研究备忘录，也更容易在 AI 回答里被拆解引用。",
        ],
        bullets: [
          "把标题写成完整问题，而不是抽象口号。",
          "在正文里保留原始定义、流程、清单和对比表述。",
          "给每个核心判断补上可验证出处或企业自己的公开依据。",
        ],
      },
      {
        heading: "B2B 官网现在该补哪些内容",
        paragraphs: [
          "第一类是决策前问题页，例如“GEO 和 SEO 如何分工”“AI 搜索流量怎么接入 GA4”。第二类是行业场景页，例如“制造业、教育、SaaS 各自该怎么做内容结构化”。第三类是方法页，把执行步骤、交付物和效果复盘口径明确出来。",
          "这类页面既能服务搜索收录，也能在 AI Mode 的复杂推理链条中承担“被引用的证据页”角色。对 B2B 获客来说，真正有价值的不是文章数量，而是每一篇是否能回答一个采购决策中的关键问题。",
        ],
      },
    ],
    faqs: [
      {
        question: "Deep Search 对 B2B 官网最大的变化是什么？",
        answer:
          "复杂问题会被拆成更多检索步骤，官网需要提供可拆解、可引用的结论和证据，而不是只有品牌口号。",
      },
      {
        question: "什么样的内容更像可引用研究备忘录？",
        answer:
          "带有定义、流程、清单、对比、适用边界和出处说明的专题页，更容易被 AI 在多轮回答中复用。",
      },
      {
        question: "一路凯歌会优先建议补哪些页面？",
        answer:
          "优先补高意图问题页、行业场景页和方法论页，让官网既能被收录，也能被 AI 当作判断依据。",
      },
    ],
  },
  {
    slug: "google-search-live-voice-answer-design",
    title: "Search Live 开始支持语音问答后，企业内容要准备“可说出口”的答案",
    summary:
      "Google 把 Search Live 带入 AI Mode 后，搜索不再只发生在键盘输入里。企业官网如果希望被语音问答场景引用，正文需要更短句、更清晰，并提前准备适合被直接朗读的答案层。",
    category: "Google 搜索体验",
    keywords:
      "一路凯歌,Search Live,AI Mode语音搜索,AI搜索优化,语音问答,GEO内容设计,企业FAQ",
    seoDescription:
      "Search Live 进入 AI Mode 后，企业内容需要兼顾语音问答场景，准备更清晰、更适合朗读的 FAQ 与结论段落。",
    sourceNote:
      "Google 官方介绍 Search Live 时说明，用户可以在 AI Mode 中通过语音连续提问，并在切换应用时保持对话继续。",
    references: [
      {
        label: "Google 官方博客：Search Live with voice, now in AI Mode",
        url: "https://blog.google/products/search/search-live-voice-now-available-in-ai-mode/",
      },
    ],
    sections: [
      {
        heading: "语音搜索会放大表达是否清楚的问题",
        paragraphs: [
          "Search Live 让用户直接对着手机连续发问，这意味着 AI 不只是读取网页，还要把网页里的信息组织成适合对话和朗读的答案。页面如果句子太长、修饰太多、概念边界不清，语音场景下会更容易被忽略。",
          "对企业品牌来说，语音问答不是新渠道，而是把“内容是否说得清楚”这件事放大了。过去一段含糊的服务介绍也许还能勉强过关，但在语音回答里，AI 更需要几句能直接说出口的话。",
        ],
      },
      {
        heading: "什么叫可说出口的答案层",
        paragraphs: [
          "可说出口，不是把页面写得像广告词，而是把核心定义、适用对象、差异点和联系方式写成更短、更明确的句子。用户听完一遍就能抓住重点，AI 也更容易稳定复述。",
          "一路凯歌通常会建议企业在长文里增加一层“短答案结构”：先用一两句总结结论，再展开方法和细节。这样既不牺牲 SEO 的信息量，也能兼顾语音问答的可读性。",
        ],
        bullets: [
          "每个页面先给一句核心定义。",
          "把服务对象和使用场景拆成独立短段落。",
          "FAQ 的答案避免只写抽象价值，尽量写清动作和条件。",
        ],
      },
      {
        heading: "适合优先改造的页面类型",
        paragraphs: [
          "第一是首页和服务页，因为语音问答经常先要一个总括答案。第二是 FAQ 和行业问题页，因为这类内容天然适合连续追问。第三是本地服务页，尤其当用户用手机语音搜索“北京哪家能做某项服务”时，地理、行业和方案边界都要说清楚。",
          "内容一旦能同时满足可朗读、可引用和可点击，就更容易在 AI 搜索里承接从认知到访问的转化链路。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么语音问答会影响官网写法？",
        answer:
          "因为 AI 需要把网页内容重新组织成对话式答案，表达越清楚、越短句，越容易被稳定朗读和引用。",
      },
      {
        question: "可说出口的答案层要放在哪里？",
        answer:
          "可以放在服务页开头、专题页摘要区和 FAQ 回答首段，先给短结论，再补充展开内容。",
      },
      {
        question: "这种改造会不会影响原来的 SEO？",
        answer:
          "不会，短答案层是对原有长内容的补强，能同时服务搜索收录和 AI 语音问答。",
      },
    ],
  },
  {
    slug: "chatgpt-search-query-rewrite-location-pages",
    title: "ChatGPT Search 会改写查询并结合位置，企业本地页别再只写一句品牌介绍",
    summary:
      "OpenAI 帮助文档提到，ChatGPT Search 会结合用户位置、历史上下文，并在必要时改写查询。这意味着企业如果想覆盖本地和场景化问答，页面需要把城市、服务边界和真实问题说完整。",
    category: "ChatGPT Search",
    keywords:
      "一路凯歌,ChatGPT Search,查询改写,本地SEO,AI搜索优化,GEO页面结构,位置意图",
    seoDescription:
      "OpenAI 文档显示 ChatGPT Search 会改写查询并结合位置，企业本地页需要写清城市、服务边界、问题场景和联系方式。",
    sourceNote:
      "OpenAI 的 ChatGPT Search 说明页提到，系统可能根据用户位置、对话上下文和具体性来改写搜索查询，以获得更有帮助的结果。",
    references: [
      {
        label: "OpenAI 帮助中心：ChatGPT search",
        url: "https://help.openai.com/en/articles/9237897-chatgpt-search",
      },
    ],
    sections: [
      {
        heading: "查询不是原样匹配，页面表达就不能偷懒",
        paragraphs: [
          "OpenAI 在帮助文档里明确说明，ChatGPT Search 不一定把用户问题原封不动地拿去搜索，而是会根据位置、上下文和更广泛的意图做查询重写。对企业来说，这意味着“北京 GEO 公司”“适合 B2B 的 AI 搜索优化服务”“想看可量化的流量复盘”这些表达，最后可能被折叠成一组相关检索。",
          "如果你的页面只写“我们专注 AI 搜索优化”，没有城市、行业、交付方式和适用对象，AI 很难判断你是否真正匹配用户的隐含需求。",
        ],
      },
      {
        heading: "本地页和行业页都要把边界写完整",
        paragraphs: [
          "本地服务页要有城市名、服务方式、联系方式和典型问题，行业页要有场景、术语和采购阶段问题。这样即使查询被改写，页面里仍然有足够信号让 AI 判断相关性。",
          "一路凯歌在做 GEO 内容结构时，会把“品牌是什么”“在哪服务”“适合谁”“不适合谁”“如何沟通下一步”拆成多个可抽取字段。AI 搜索越会重写查询，页面越不能只靠一句笼统品牌词。",
        ],
        bullets: [
          "城市页写清本地交付或服务半径。",
          "行业页写清服务对象、业务术语和评价口径。",
          "页面里保留电话、表单入口和下一步动作，方便从问答转向咨询。",
        ],
      },
      {
        heading: "这件事也关系到 SEO 收录后的二次利用",
        paragraphs: [
          "传统 SEO 更关注页面先被收录和点击，而 ChatGPT Search 进一步要求内容能经得起改写后的意图匹配。也就是说，收录只是起点，页面是否包含足够完整的场景信号，决定了它是否会在 AI 回答中被继续使用。",
          "对 B2B 获客而言，真正高价值的页面不是最泛的页面，而是最清楚定义业务边界的页面。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么 ChatGPT Search 的查询改写会影响官网结构？",
        answer:
          "因为用户问题会被改写成更广的检索组合，页面如果缺少城市、行业和场景信息，就更难被判定为相关来源。",
      },
      {
        question: "本地服务页最少要补哪些信息？",
        answer:
          "建议补城市名、服务方式、典型问题、联系方式和下一步动作，避免只剩一句品牌口号。",
      },
      {
        question: "这和传统 SEO 有什么关系？",
        answer:
          "SEO 先解决收录与点击，AI 搜索再继续判断内容是否匹配被改写后的真实意图，两者需要配合。",
      },
    ],
  },
  {
    slug: "deepseek-model-migration-content-contract",
    title: "DeepSeek 文档写明模型切换时间后，企业内容接口要先于模型迁移完成标准化",
    summary:
      "DeepSeek 官方文档已经给出 `deepseek-chat` 和 `deepseek-reasoner` 的弃用时间窗口。对企业来说，先统一内容字段、FAQ 结构和页面命名，比急着追逐模型版本更重要。",
    category: "DeepSeek",
    keywords:
      "一路凯歌,DeepSeek,模型迁移,内容标准化,GEO知识资产,FAQ结构,企业接口",
    seoDescription:
      "DeepSeek 文档明确模型切换窗口后，企业更应先完成内容字段和 FAQ 结构标准化，降低后续模型迁移成本。",
    sourceNote:
      "DeepSeek API 首次调用文档说明，当前 `deepseek-chat` 与 `deepseek-reasoner` 将在 2026 年 7 月 24 日后停止维护，建议迁移到新模型名称。",
    references: [
      {
        label: "DeepSeek API 文档：首次调用 API",
        url: "https://api-docs.deepseek.com/zh-cn/",
      },
    ],
    sections: [
      {
        heading: "模型名称会变，但内容资产不该跟着混乱",
        paragraphs: [
          "DeepSeek 在官方文档里直接写出了旧模型停止维护的时间点，这提醒企业一件很现实的事：模型接口会调整，业务内容不能每次都跟着重做。真正应该沉淀的，是品牌资料、FAQ、服务定义和字段命名。",
          "如果官网、知识库、投放落地页、客服话术里对同一个服务叫法都不一致，那么每换一次模型、每扩一条分发渠道，都会重复付出理解和适配成本。",
        ],
      },
      {
        heading: "先做内容合同，再谈模型迁移",
        paragraphs: [
          "所谓内容合同，可以理解为一套稳定的公开表达方式：公司名怎么写、品牌名怎么写、服务页标题怎么写、FAQ 每条包含哪些字段、案例页如何说明行业与结果。模型可以换，内容合同不能乱。",
          "一路凯歌在做 AI 搜索品牌增长时，会先把企业公开知识整理成统一字段，再映射到官网、资讯页、问答页和外部分发。这样不论后续接入 DeepSeek、豆包还是通义千问，底层表达都是一致的。",
        ],
        bullets: [
          "统一公司名、品牌名、联系人和联系方式。",
          "给服务页、案例页、FAQ 设定固定字段。",
          "把旧页面里的不同叫法逐步收敛到一个标准版本。",
        ],
      },
      {
        heading: "为什么这对 GEO 更重要",
        paragraphs: [
          "GEO 的核心不是让某个模型暂时记住你，而是让多个 AI 系统长期、稳定地理解你。模型迁移只是把这个问题暴露得更明显：如果品牌表达本来就是碎片化的，AI 越多，误读越多。",
          "因此，企业看到模型变更信息时，优先动作不该是追着改参数，而是检查官网与知识资产是否已经标准化。",
        ],
      },
    ],
    faqs: [
      {
        question: "模型迁移为什么会牵出内容标准化问题？",
        answer:
          "因为模型会变，但企业公开表达会被多个模型长期复用。如果表达不统一，每次迁移都会放大理解偏差。",
      },
      {
        question: "什么是内容合同？",
        answer:
          "就是一套稳定的公司名、品牌名、服务命名、FAQ 字段和案例写法，便于官网、知识库和 AI 平台统一使用。",
      },
      {
        question: "一路凯歌通常先检查什么？",
        answer:
          "先检查品牌实体信息、服务命名、FAQ 结构和联系方式是否统一，再考虑不同模型和渠道的接入方式。",
      },
    ],
  },
  {
    slug: "deepseek-json-output-faq-structure",
    title: "DeepSeek 强调 JSON Output 与 Function Calling，企业 FAQ 也该从“长文”变成“结构化字段”",
    summary:
      "DeepSeek 在官方更新中提到 JSON Output 与 Function Calling 已支持到通用模型接口。对企业内容来说，这提醒我们 FAQ、参数页和服务说明不能只有自然语言，还要有稳定字段，方便 AI 抽取与调用。",
    category: "DeepSeek",
    keywords:
      "一路凯歌,DeepSeek JSON Output,Function Calling,结构化FAQ,企业内容结构化,GEO优化",
    seoDescription:
      "DeepSeek 支持 JSON Output 与 Function Calling 后，企业 FAQ 和服务页更应沉淀成结构化字段，提升 AI 抽取与复用效率。",
    sourceNote:
      "DeepSeek 在 2025 年 7 月的官方更新中说明，API 已支持 JSON Output 与 Function Calling，并建议将输出稳定约束为结构化格式。",
    references: [
      {
        label: "DeepSeek 官方更新：DeepSeek API 升级，新功能已上线",
        url: "https://api-docs.deepseek.com/zh-cn/news/news0725",
      },
    ],
    sections: [
      {
        heading: "结构化不是只给开发看的",
        paragraphs: [
          "很多企业提到结构化内容，第一反应是给工程师接接口。但 DeepSeek 把 JSON Output 和 Function Calling 放进官方更新后，信号其实很明确：未来模型越来越偏好稳定字段，而不是每次都从一整篇自然语言里重新猜测答案。",
          "这件事同样适用于官网内容。FAQ、服务范围、适用行业、交付步骤、联系方式，如果都能以更统一的字段表达，AI 在摘要、推荐和工具调用场景里会更容易使用。",
        ],
      },
      {
        heading: "FAQ 为什么最适合先结构化",
        paragraphs: [
          "FAQ 本来就是问题和答案的天然配对。如果再进一步补上适用对象、前置条件、交付内容、更新时间等字段，页面会更像一份稳定的数据层，而不是仅供阅读的文章。",
          "一路凯歌在企业内容整理中，会把 FAQ 同时写成两层：一层给人阅读，保持自然表达；一层给系统理解，保证问题命名、答案边界和字段语义尽量一致。",
        ],
        bullets: [
          "问题标题保持稳定，不要频繁改写同一问题名称。",
          "答案首段先给结论，再补充解释。",
          "能拆成字段的信息尽量拆开，例如适用行业、报价方式、交付周期。",
        ],
      },
      {
        heading: "结构化字段能怎样服务 GEO",
        paragraphs: [
          "GEO 不只是写文章，更是让 AI 容易正确理解品牌。结构化 FAQ 能减少模型抽取时的歧义，让品牌在多个问答入口里被更一致地表述。",
          "当企业后续把内容同步到私域知识库、客服机器人或销售助手时，这套字段也可以继续复用，避免官网和内部系统各说各话。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么 DeepSeek 的 JSON Output 会影响官网写法？",
        answer:
          "因为它说明模型越来越适合读取稳定字段，官网如果只有大段自然语言，会增加 AI 抽取和复用的不确定性。",
      },
      {
        question: "FAQ 结构化后要不要牺牲可读性？",
        answer:
          "不需要，可以保留自然语言正文，同时在命名、字段和答案顺序上保持一致。",
      },
      {
        question: "哪些字段最值得先统一？",
        answer:
          "建议先统一问题名称、结论首段、适用对象、交付内容、联系方式和更新时间。",
      },
    ],
  },
  {
    slug: "kimi-k2-5-web-search-thinking-content",
    title: "Kimi K2.5 的联网搜索与思考模式有边界，官网内容不能把关键结论只放在外部链接里",
    summary:
      "Moonshot 官方文档提到，Kimi K2.5 的 `web_search` 目前不能与 thinking 模式同时使用。对企业来说，这意味着品牌官网仍要自己承载关键定义、结论和比较逻辑，不能假设模型一定会靠外部检索补全。",
    category: "Kimi",
    keywords:
      "一路凯歌,Kimi K2.5,联网搜索,thinking mode,GEO内容策略,品牌官网,AI问答入口",
    seoDescription:
      "Kimi K2.5 的联网搜索与思考模式存在组合边界，企业官网应自己承载关键结论和定义，减少对外部检索补全的依赖。",
    sourceNote:
      "Moonshot 平台文档说明，`web_search` 目前不可与 thinking 一起使用，这提醒企业不要把品牌关键结论只寄托在外部搜索结果上。",
    references: [
      {
        label: "Moonshot AI 开放平台：Kimi K2.5",
        url: "https://platform.moonshot.cn/docs/guide/use-kimi-k2.5",
      },
    ],
    sections: [
      {
        heading: "模型能力越强，越要重视自有内容底座",
        paragraphs: [
          "Kimi K2.5 的官方文档对模型特性做了较细说明，其中一个值得内容团队留意的点是：联网搜索和 thinking 模式当前不能一起使用。这个限制不是坏消息，反而提示企业官网不能把关键结论外包给搜索结果。",
          "如果品牌定义、服务边界、常见误区和行动建议都只散落在第三方平台上，AI 在某些模式下就未必能稳定补全你的信息。",
        ],
      },
      {
        heading: "官网该承载哪些关键结论",
        paragraphs: [
          "最核心的是定义、适用对象、交付边界和下一步行动。用户问“哪家公司适合做 GEO”“DeepSeek 和豆包入口该怎么覆盖”“AI 搜索流量怎样看”，这些问题的第一层结论最好就在官网里能直接找到。",
          "一路凯歌会把这类高频判断写进首页、服务页、FAQ 和资讯页首段，让模型即使不依赖外部搜索，也能从品牌自有内容中抽到稳定答案。",
        ],
        bullets: [
          "不要把关键定义只写在公众号或外部媒体。",
          "每个高意图问题都准备一段官网内可直接引用的首答。",
          "重要页面之间建立清晰内链，方便 AI 顺着站内关系补全上下文。",
        ],
      },
      {
        heading: "这对中文 AI 问答入口布局的启发",
        paragraphs: [
          "中文 AI 入口正在快速迭代，功能组合也会不断变化。企业如果把重点放在官网内容底座，就能更从容地面对不同平台的能力差异。",
          "真正可迁移的资产，不是某次问答截图，而是官网上那套清楚、标准、可复用的答案结构。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么 Kimi 的模式边界会影响官网策略？",
        answer:
          "因为它说明模型并不总能靠外部检索补全信息，官网需要自己承载关键定义和结论。",
      },
      {
        question: "哪些内容一定要放回官网？",
        answer:
          "建议把品牌定义、服务边界、适用对象、常见误区和下一步行动都写进官网核心页面。",
      },
      {
        question: "这件事只适用于 Kimi 吗？",
        answer:
          "不是，它反映的是多平台通用原则：品牌关键事实不能过度依赖站外信息源。",
      },
    ],
  },
  {
    slug: "qwen-api-compatible-tool-content-layer",
    title: "通义千问接口层越来越完整，企业内容也要分成“公开页、工具说明、知识字段”三层",
    summary:
      "阿里云百炼和通义千问 API 参考显示，平台同时支持 OpenAI 兼容接口、Responses API 与多类内置工具。企业如果想让内容既服务收录又服务智能体调用，官网表达也要分层。",
    category: "通义千问",
    keywords:
      "一路凯歌,通义千问,阿里云百炼,OpenAI兼容,Responses API,企业内容结构化,GEO优化",
    seoDescription:
      "通义千问接口层更完整后，企业内容应拆成公开页、工具说明和知识字段三层，以兼顾 SEO 收录与 AI 调用。",
    sourceNote:
      "阿里云官方 API 参考同时展示了 OpenAI 兼容的 Chat Completions、Responses API 以及网页搜索、网页提取等工具能力。",
    references: [
      {
        label: "阿里云百炼官方文档：API 参考",
        url: "https://help.aliyun.com/zh/model-studio/api-reference",
      },
    ],
    sections: [
      {
        heading: "接口分层，内容也要分层",
        paragraphs: [
          "当平台同时支持兼容接口、Responses API 和内置工具时，说明模型使用场景已经不是单一聊天，而是逐渐覆盖搜索、抽取、调用和工作流。企业内容如果还是只写成一篇很长的介绍文，很难同时满足这些场景。",
          "官网至少要分成三层：面向用户阅读和搜索收录的公开页面，面向操作理解的工具说明，以及便于系统读取的知识字段。",
        ],
      },
      {
        heading: "三层内容分别解决什么问题",
        paragraphs: [
          "公开页负责被收录、被点击、被引用，应该强调问题场景、解决方案和证据。工具说明负责解释流程、输入输出和使用边界，适合服务产品文档或交付说明。知识字段则把品牌、服务、报价方式、行业适配、FAQ 等拆成稳定结构，方便后续接入知识库或智能体。",
          "一路凯歌做 B2B GEO 时，通常不会把所有信息挤在一页里，而是让三层内容互相链接。这样既照顾 SEO，又能适应越来越多的 AI 应用接口。",
        ],
        bullets: [
          "公开页讲清楚价值、场景和差异。",
          "工具说明讲清楚流程、输入输出和限制。",
          "知识字段保证命名稳定、便于多平台复用。",
        ],
      },
      {
        heading: "为什么这对获客有直接价值",
        paragraphs: [
          "很多企业流量问题并不是没写内容，而是内容都堆在一层，导致收录、理解和转化三件事互相打架。分层后，搜索能更好收录，AI 更好抽取，销售也更容易复述。",
          "对高客单价业务来说，这种清晰度本身就是转化效率的一部分。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么接口能力变化会影响官网内容设计？",
        answer:
          "因为平台已经不只做聊天，内容也要同时服务搜索收录、AI 抽取和工具调用，单层长文不够用。",
      },
      {
        question: "三层内容里哪一层最适合先做？",
        answer:
          "通常先做公开页和 FAQ 字段，再逐步补工具说明，这样既能先拿到收录，也能给后续智能体接入打底。",
      },
      {
        question: "一路凯歌会怎样落地这种分层？",
        answer:
          "会先梳理品牌与服务字段，再安排服务页、专题页、FAQ 和文档页之间的链接关系。",
      },
    ],
  },
  {
    slug: "tencent-yuanbao-web-search-source-pages",
    title: "腾讯联网搜索支持指定网址与时间范围后，企业更新页要学会保留日期、版本和原始出处",
    summary:
      "腾讯云 Web Search API 官方页面强调可指定网址、时间范围和语言，还提到分钟级更新。对企业官网来说，这意味着资讯页、公告页和专题页应更明确地保留时间、版本与来源说明，方便被检索系统判断新旧和可信度。",
    category: "腾讯元宝",
    keywords:
      "一路凯歌,腾讯元宝,腾讯联网搜索,Web Search API,来源页面,版本更新,GEO资讯页",
    seoDescription:
      "腾讯联网搜索支持指定网址与时间范围后，企业资讯页和专题页需要更清楚地保留日期、版本和来源说明，提升 AI 搜索可用性。",
    sourceNote:
      "腾讯云 Web Search API 页面提到可按指定网址、时间范围和语言搜索，并突出分钟级更新与联网引用能力。",
    references: [
      {
        label: "腾讯云官方：Web Search API",
        url: "https://cloud.tencent.com/product/wsa",
      },
    ],
    sections: [
      {
        heading: "时间与出处，正在变成更直接的检索条件",
        paragraphs: [
          "腾讯的联网搜索能力把网址、时间范围和语言都做成显式条件，说明搜索系统越来越重视“从哪来”“什么时候发”“是否足够新”。企业如果仍然发一篇没有更新时间、没有版本标记的页面，就会损失很多被判断为可靠来源的机会。",
          "特别是 AI 搜索用户常问政策变化、平台更新、产品区别，这类问题天然依赖时间线。页面只写观点，不写日期，AI 很难判断它是否适合当前答案。",
        ],
      },
      {
        heading: "哪些页面最该补日期和版本",
        paragraphs: [
          "第一是行业资讯页，因为它本来就承担近况更新功能。第二是产品功能页和服务说明页，若内容会随平台变化而调整，最好明确写出最近更新时间。第三是 FAQ 和专题页，至少要保留发布日期与参考来源说明。",
          "一路凯歌这次更新资讯页时，也同步在文章里增加发布日期、来源说明、FAQ JSON-LD 和站点地图，就是为了让页面在收录与 AI 引用时都有更清楚的时效信号。",
        ],
        bullets: [
          "页面头部明确发布日期与更新时间。",
          "正文里保留“依据什么公开信息写成”。",
          "标题不要故意写得脱离时间背景，方便 AI 判断适用期。",
        ],
      },
      {
        heading: "这同样关系到 SEO 收录质量",
        paragraphs: [
          "对搜索引擎来说，清晰的时间和版本信息有助于理解页面新鲜度；对 AI 搜索来说，这还能帮助模型减少引用过时信息。两者方向一致，不存在冲突。",
          "企业越早把版本意识写进内容流程，越容易在多个 AI 问答入口里保持稳定可信。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么资讯页一定要保留日期和来源？",
        answer:
          "因为 AI 和搜索系统都越来越重视内容时效性，日期和来源有助于判断新旧与可信度。",
      },
      {
        question: "哪些页面最适合加版本信息？",
        answer:
          "建议优先加在资讯页、功能说明页、专题页和 FAQ 页，尤其是会随平台更新变化的内容。",
      },
      {
        question: "这会不会让页面看起来太“文档化”？",
        answer:
          "不会，适度的日期、版本和来源说明反而能增强专业感，也更利于 SEO 与 GEO 双重收录。",
      },
    ],
  },
  {
    slug: "volcengine-ark-public-private-knowledge",
    title: "火山方舟把联网插件和知识库插件并列后，品牌官网与私域知识库更该分层维护",
    summary:
      "火山方舟官方文档展示了网页搜索插件、知识库插件和 Bot 模式的并列能力。企业如果既想争取豆包生态里的公开可见性，又想服务内部智能体，就要把官网公开知识和私域知识库分开维护、统一命名。",
    category: "豆包生态",
    keywords:
      "一路凯歌,火山方舟,豆包,知识库插件,联网搜索插件,私域知识库,GEO品牌可见性",
    seoDescription:
      "火山方舟把联网搜索与知识库插件并列后，企业应分层维护官网公开知识与私域知识库，同时保持命名和定义一致。",
    sourceNote:
      "火山引擎方舟文档展示了 Bot 和多类内置插件能力，包括联网内容插件与知识库插件，这意味着公开知识与私域知识可以在同一工作流中协同。",
    references: [
      {
        label: "火山引擎官方文档：使用豆包大模型与方舟插件",
        url: "https://www.volcengine.com/docs/82379/1263482",
      },
    ],
    sections: [
      {
        heading: "公开可见性和私域准确性不是一回事",
        paragraphs: [
          "火山方舟把联网能力和知识库能力放在同一套工具视角里，说明未来企业既要被外部搜索看见，也要让内部或半私域智能体回答准确。这两件事相关，但不能混成一套内容。",
          "官网公开页要承担品牌发现、搜索收录和外部引用，私域知识库则更适合承载价格、流程细节、内部术语和频繁变化的信息。",
        ],
      },
      {
        heading: "为什么必须分层维护",
        paragraphs: [
          "如果所有信息都塞进知识库，品牌就很难在公开 AI 搜索里积累可见性；如果所有信息都公开，又会增加维护成本和信息泄露风险。更合理的方法，是把公开层和私域层分开，但保持同样的命名和定义。",
          "一路凯歌在给企业做 AI 搜索品牌增长时，通常会先确认哪些信息适合公开发表，哪些适合进入私域知识库，然后再设计两层之间的映射关系。",
        ],
        bullets: [
          "官网公开页负责品牌定义、服务范围、案例摘要和 FAQ。",
          "私域知识库负责流程细节、操作 SOP 和高频内部问答。",
          "两层都要使用同一套品牌名、产品名和字段命名。",
        ],
      },
      {
        heading: "这样做对豆包生态有什么意义",
        paragraphs: [
          "一旦公开页和知识库层次分明，企业既能争取外部搜索里的品牌曝光，也能在接入智能体或客服机器人时减少回答漂移。平台能力变化时，内容底座也更好迁移。",
          "这也是 GEO 和企业知识工程可以真正接起来的地方。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么官网和私域知识库不能混成一套？",
        answer:
          "因为公开页要服务收录和引用，私域知识库要服务准确回答与流程细节，两者目标不同但命名必须一致。",
      },
      {
        question: "公开页最适合放什么信息？",
        answer:
          "建议放品牌定义、服务范围、案例摘要、常见问题和联系方式等适合公开传播的内容。",
      },
      {
        question: "这和豆包生态有什么关系？",
        answer:
          "火山方舟把联网与知识库能力并列，说明公开可见性和私域回答准确性需要同时建设。",
      },
    ],
  },
  {
    slug: "ga4-ai-traffic-utm-direct-loss",
    title: "GA4 文档提醒 UTM 缺失会丢来源，AI 搜索流量分析别让跳转链路把数据吃掉",
    summary:
      "Google Analytics 官方帮助文档反复提醒，若依赖短链或中间跳转且未保留 UTM，流量可能被错误归入 direct 或错误来源。企业要复盘 AI 搜索带来的访问与线索，必须先修正跳转、标记和渠道口径。",
    category: "GA4 分析",
    keywords:
      "一路凯歌,GA4,AI搜索流量,UTM,Direct流量,AI Referral,流量归因,GEO分析",
    seoDescription:
      "GA4 官方文档提醒短链和跳转会造成来源丢失，企业做 AI 搜索流量分析时应先修正 UTM、跳转链路和渠道规则。",
    sourceNote:
      "Google Analytics 帮助中心说明，使用短链或未正确保留 UTM 参数可能导致流量来源丢失，并在 direct 归因中强调来源缺失会被计为 direct。",
    references: [
      {
        label: "Google Analytics 帮助：使用手动标记进行广告系列归因",
        url: "https://support.google.com/analytics/answer/10917952",
      },
      {
        label: "Google Analytics 帮助：Direct 流量定义",
        url: "https://support.google.com/analytics/answer/15258820?hl=en",
      },
    ],
    sections: [
      {
        heading: "AI 流量分析最常见的问题，不是没有流量，而是来源丢了",
        paragraphs: [
          "很多团队开始关注 ChatGPT、Google AI Mode、豆包或 Kimi 带来的访问，但在 GA4 里一看，数据常常散在 referral、direct 或其他渠道里。问题往往不在 AI 没带来流量，而在中间跳转和标记链路把来源信号吃掉了。",
          "Google Analytics 官方帮助明确提醒，短链和不正确的 UTM 处理会导致归因缺失，而 direct 本身就包含无法识别来源的访问。",
        ],
      },
      {
        heading: "哪些链路最容易让 AI 来源消失",
        paragraphs: [
          "典型问题包括：从 AI 平台跳到短链工具，再跳到官网；中间页没有保留查询参数；团队在不同页面使用不同的 campaign 命名；或者首页和落地页把关键事件定义得不一致。这样最后即使有访问，也很难判断是否与 AI 搜索有关。",
          "一路凯歌在做 GEO 数据复盘时，会优先检查 UTM 规则、跨页参数保留、咨询按钮事件和自定义渠道分组，而不是先急着下结论。",
        ],
        bullets: [
          "避免无必要的短链和多次跳转。",
          "统一 `utm_source`、`utm_medium` 和 `utm_campaign` 的命名规则。",
          "把电话点击、表单提交、微信复制等动作纳入同一套关键事件。",
        ],
      },
      {
        heading: "把 AI 搜索流量真正接到获客上",
        paragraphs: [
          "只有当来源、会话和转化动作串起来，AI 搜索流量才有业务意义。否则你能看到截图，却看不到咨询。",
          "对 B2B 企业来说，GA4 不只是报表工具，更是把 GEO 从品牌可见性延伸到获客归因的基础设施。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么 AI 搜索流量会跑进 direct？",
        answer:
          "因为中间跳转、短链或 UTM 丢失会让 GA4 无法识别来源，最终被归入 direct 或其他非预期渠道。",
      },
      {
        question: "最应该先检查什么？",
        answer:
          "先检查跳转链路是否保留参数，再统一 UTM 命名和关键事件口径。",
      },
      {
        question: "这对 GEO 复盘有什么意义？",
        answer:
          "只有把 AI 来源访问和咨询动作接起来，企业才能判断 GEO 是否真正带来有效线索。",
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

function loadExistingArticles() {
  return existingOrder.map((slug) => {
    const html = read(`news/${slug}.html`);
    const title = html.match(/<h1>([^<]+)<\/h1>/)?.[1] ?? slug;
    const summary = html.match(/<section class="article-hero reveal">[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1].replace(/\s+/g, " ").trim() ?? "";
    const category = html.match(/<div class="article-meta"><time[^>]+>[^<]+<\/time><span>([^<]+)<\/span>/)?.[1] ?? "";
    const date = html.match(/<time datetime="([^"]+)">/)?.[1] ?? "2026-05-27";
    return {
      slug,
      title,
      summary,
      category,
      date,
      url: `${siteUrl}/news/${slug}.html`,
    };
  });
}

function buildArticleJsonLd(article) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.seoDescription,
      image: [`${siteUrl}/assets/logo-full.webp`],
      datePublished: publishDateTime,
      dateModified: publishDateTime,
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
      (faq) => `            <article class="faq-item reveal">\n              <h3>${faq.question}</h3>\n              <p>${faq.answer}</p>\n            </article>`,
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

function buildArticlePage(article, allArticles) {
  const index = allArticles.findIndex((item) => item.slug === article.slug);
  const prev = index > 0 ? allArticles[index - 1] : null;
  const next = index < allArticles.length - 1 ? allArticles[index + 1] : null;
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
    <meta property="article:published_time" content="${publishDateTime}" />
    <meta property="article:modified_time" content="${publishDateTime}" />
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
        <div class="article-meta"><time datetime="${publishDate}">${publishDate}</time><span>${article.category}</span></div>
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

          <div class="article-nav">
            ${prev ? `<a href="${prev.slug}.html">上一篇：${prev.title}</a>` : `<a href="../news.html">返回资讯列表</a>`}
            ${next ? `<a href="${next.slug}.html">下一篇：${next.title}</a>` : `<a href="../news.html">返回资讯列表</a>`}
          </div>
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

    <footer class="site-footer"><div class="footer-main"><div class="footer-brand"><a class="brand" href="../index.html#top" aria-label="${brandName}返回首页"><span class="brand-mark"><img src="../assets/logo.png" alt="${brandName}品牌标志" /></span><span><strong>${brandName}</strong><small>AI Search Growth</small></span></a><p>专注 GEO 生成式引擎优化，帮助企业把真实能力沉淀成 AI 可理解、可引用、可推荐的品牌知识资产。</p><div class="footer-contact"><a href="tel:18610730255">18610730255</a><span>北京市</span></div></div><nav class="footer-links" aria-label="页脚导航"><div><h3>服务</h3><a href="../index.html#services">GEO 服务</a><a href="../index.html#advantages">核心优势</a><a href="../index.html#cases">适用场景</a></div><div><h3>公司</h3><a href="../about.html">关于我们</a><a href="../news.html">行业资讯</a><a href="../index.html#contact">联系我们</a></div><div><h3>资源</h3><a href="../index.html#faq">常见问题</a><a href="../llms.txt">AI 索引文件</a><a href="../sitemap.xml">站点地图</a></div></nav></div><div class="footer-bottom"><span>© 2026 . All Rights Reserved.</span><a class="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">京ICP备19004756号-3</a></div></footer>
    <script src="../script.js"></script>
  </body>
</html>
`;
}

function indent(text, count) {
  const pad = " ".repeat(count);
  return text
    .split("\n")
    .map((line) => `${pad}${line}`)
    .join("\n");
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
  html = html.replace(
    /"description": "[^"]+"/,
    `"description": "${newsDescription}"`,
  );
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
    { loc: `${siteUrl}/`, priority: "1.0", changefreq: "weekly", lastmod: publishDate },
    { loc: `${siteUrl}/about.html`, priority: "0.8", changefreq: "monthly", lastmod: "2026-05-28" },
    { loc: `${siteUrl}/news.html`, priority: "0.8", changefreq: "daily", lastmod: publishDate },
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
      (article) => `    <item>\n      <title>${escapeHtml(article.title)}</title>\n      <link>${siteUrl}/news/${article.slug}.html</link>\n      <guid>${siteUrl}/news/${article.slug}.html</guid>\n      <pubDate>${article.date === publishDate ? feedDate : article.date === "2026-05-28" ? "Thu, 28 May 2026 09:30:00 +0800" : "Wed, 27 May 2026 00:00:00 +0800"}</pubDate>\n      <description>${escapeHtml(article.summary)}</description>\n    </item>`,
    )
    .join("\n");
  write(
    "feed.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${brandName}行业资讯</title>\n    <link>${siteUrl}/news.html</link>\n    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />\n    <description>一路凯歌围绕 GEO、AI 搜索、品牌知识资产、GA4 数据化衡量和 AI 流量归因的文章更新。</description>\n    <language>zh-CN</language>\n    <lastBuildDate>${feedDate}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`,
  );
}

function validateLinks(allArticles) {
  const files = ["index.html", "news.html", ...allArticles.map((item) => `news/${item.slug}.html`)];
  const existing = new Set(
    fs.readdirSync(path.join(root, "news")).map((file) => `/news/${file}`),
  );
  const rootFiles = new Set(fs.readdirSync(root).map((file) => `/${file}`));
  const assetFiles = new Set(
    fs.readdirSync(path.join(root, "assets")).map((file) => `/assets/${file}`),
  );
  const missing = [];

  for (const file of files) {
    const html = read(file);
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (
        href.startsWith("http") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        href.startsWith("mailto:")
      ) {
        continue;
      }
      const normalized = normalizeHref(file, href);
      const normalizedFile = normalized.split("#")[0];
      if (
        !existing.has(normalizedFile) &&
        !rootFiles.has(normalizedFile) &&
        !assetFiles.has(normalizedFile)
      ) {
        missing.push(`${file} -> ${href}`);
      }
    }
  }

  if (missing.length) {
    throw new Error(`Missing links:\n${missing.join("\n")}`);
  }
}

function normalizeHref(fromFile, href) {
  const fromDir = path.posix.dirname(`/${fromFile}`);
  return path.posix.normalize(path.posix.join(fromDir, href));
}

function main() {
  const existingArticles = loadExistingArticles();
  const freshArticles = newArticles.map((article) => ({
    ...article,
    date: publishDate,
    url: `${siteUrl}/news/${article.slug}.html`,
  }));
  const allArticles = [...freshArticles, ...existingArticles];

  for (const article of freshArticles) {
    write(`news/${article.slug}.html`, buildArticlePage(article, allArticles));
  }

  updateNewsPage(allArticles);
  updateHomePage(allArticles);
  updateSitemap(allArticles);
  updateFeed(allArticles);
  validateLinks(allArticles);

  console.log(`Published ${freshArticles.length} articles and updated aggregations.`);
}

main();
