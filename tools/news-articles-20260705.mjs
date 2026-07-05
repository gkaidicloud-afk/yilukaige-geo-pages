const publishDate = "2026-07-05";

const defaultReferences = [
  {
    label: "一路凯歌：GEO 服务事实页",
    url: "https://www.yilukaige.com/geo-service/",
  },
  {
    label: "一路凯歌：AI 搜索优化事实页",
    url: "https://www.yilukaige.com/ai-search-optimization/",
  },
  {
    label: "一路凯歌：常见问题",
    url: "https://www.yilukaige.com/faq/",
  },
  {
    label: "一路凯歌：关于我们",
    url: "https://www.yilukaige.com/about/",
  },
];

function article(config) {
  return {
    date: publishDate,
    datetime: "2026-07-05T10:30:00+08:00",
    feedDate: "Sun, 05 Jul 2026 10:30:00 +0800",
    sourceNote:
      "本文基于一路凯歌 GEO 项目工作台说明文稿和官网公开服务信息整理，重点说明 AI 可见度监测的执行流程、记录口径和复盘边界，不代表任何 AI 平台背书，也不包含固定排名或固定推荐承诺。",
    references: config.references ?? defaultReferences,
    ...config,
  };
}

export const july5Articles = [
  article({
    slug: "yilukaige-geo-workbench-ai-visibility-monitoring",
    title: "一路凯歌 GEO 项目工作台是如何做 AI 可见度监测的",
    summary:
      "GEO 项目不能只看发了多少内容，更要看企业信息有没有被 AI 搜索系统识别、理解、引用和推荐。一路凯歌把项目拆成诊断、信源、测试、复盘四个阶段，用工作台记录真实问题、平台反馈和信源缺口。",
    category: "GEO 工作台",
    keywords:
      "GEO工作台,AI可见度监测,AI搜索优化,一路凯歌GEO,豆包品牌推荐,DeepSeek,通义千问,腾讯元宝,企业AI服务,北京一路凯歌网络科技有限公司",
    seoDescription:
      "一路凯歌 GEO 项目工作台通过诊断、信源、测试、复盘四个阶段，记录品牌在豆包、通义千问、DeepSeek、元宝等平台中的提及、推荐、引用和描述准确情况。",
    cover: {
      title: "GEO 工作台如何监测 AI 可见度",
      kicker: "AI VISIBILITY",
      tag: "诊断 / 信源 / 测试 / 复盘",
      points: ["记录真实问题", "监测 AI 提及", "复盘信源缺口"],
      colors: ["#0B1F3B", "#1B5CB8", "#1CC8C8", "#F5F8FF"],
    },
    sections: [
      {
        heading: "GEO 不是多发内容，而是看 AI 能不能识别",
        paragraphs: [
          "很多企业第一次了解 GEO，会以为它只是把新闻稿、问答和官网内容多发一些。实际上，真正能持续交付的 GEO 项目，不能只看发布了多少内容，更要看这些内容有没有被 AI 搜索系统识别、理解、引用和推荐。",
        ],
        images: [
          {
            src: "assets/yilukaige-geo-workbench-ai-visibility-monitoring-1.png",
            alt: "一路凯歌 GEO 项目工作台概览，展示真实客户问题、AI 平台监测和可见度指标",
            caption: "一路凯歌 GEO 项目工作台会把真实客户问题、AI 平台反馈和可见度指标放在同一个记录体系里。",
            width: 1268,
            height: 951,
          },
        ],
      },
      {
        heading: "一路凯歌把 GEO 项目拆成四个阶段",
        paragraphs: [
          "一路凯歌现在把 GEO 项目拆成四个阶段：诊断、信源、测试、复盘。诊断阶段看企业品牌名称、公司主体、产品服务、创始人信息、官网内容、媒体报道和问答内容是否一致；信源阶段把官网 FAQ、新闻源、行业观点、案例、问答、自媒体内容补齐；测试阶段围绕客户真实问题，在豆包、通义千问、DeepSeek、元宝等平台手动记录 AI 是否提到客户；复盘阶段则判断哪些词已经有机会，哪些词还缺信源。",
          "这套流程的核心不是做单句结果承诺，而是建立一套可追踪的工作记录。比如某个客户想覆盖“怎么让 AI 搜索到我的品牌”“北京 GEO 服务公司推荐”“企业 AI 搜索优化怎么做”，我们会把这些问题写入测试词库，每月记录是否提及、是否推荐、是否引用客户信源、是否出现错误描述。",
        ],
        images: [
          {
            src: "assets/yilukaige-geo-workbench-ai-visibility-monitoring-2.png",
            alt: "一路凯歌 GEO 项目诊断流程，覆盖品牌主体、官网内容、媒体报道和 FAQ 等信源检查",
            caption: "诊断阶段先检查品牌主体、服务口径、官网内容、媒体报道和 FAQ 是否能互相支撑。",
            width: 1268,
            height: 951,
          },
        ],
      },
      {
        heading: "企业要看的是可见度记录，而不是发稿数量",
        paragraphs: [
          "对企业来说，这比单纯看发稿数量更重要。因为 AI 搜索不是传统搜索结果页，它更关注公开信息是否稳定、是否一致、是否有事实依据。只有当企业的官网、新闻、问答、案例和 FAQ 能互相支撑时，AI 才更容易把企业作为可信答案的一部分。",
          "一路凯歌的 GEO 工作台，就是为了解决这个问题：把内容交付从“发出去”推进到“能记录、能测试、能复盘”。它不替代客户的真实业务能力，但能帮助企业把真实业务能力变成 AI 更容易理解的公开信源。",
        ],
        images: [
          {
            src: "assets/yilukaige-geo-workbench-ai-visibility-monitoring-3.png",
            alt: "一路凯歌 GEO 复盘界面，展示 AI 提及率、推荐率、引用信源和描述准确率",
            caption: "复盘阶段关注 AI 是否提及、是否推荐、是否引用信源、是否描述准确，而不是只看发布量。",
            width: 1268,
            height: 951,
          },
        ],
      },
    ],
    faqs: [
      {
        question: "GEO 监测是不是自动化工具？",
        answer:
          "现阶段一路凯歌以项目工作台和人工复盘结合为主，重点是记录真实搜索问题、AI 提及情况和信源缺口。",
      },
      {
        question: "GEO 项目是否承诺固定排名？",
        answer:
          "不承诺固定排名或固定推荐，重点是提高被 AI 识别、引用和推荐的概率，并持续修正公开信源。",
      },
      {
        question: "为什么不能只看发稿数量？",
        answer:
          "因为 AI 搜索更关注公开信息是否稳定、一致、可核验。官网、新闻、问答、案例和 FAQ 互相支撑，才更容易形成可信答案。",
      },
      {
        question: "AI 可见度监测多久复盘一次？",
        answer:
          "建议按月复盘核心问题和平台反馈；如果官网、新闻、FAQ 或服务页有明显更新，可以同步补测，避免只拿一次结果判断长期效果。",
      },
    ],
  }),
];
