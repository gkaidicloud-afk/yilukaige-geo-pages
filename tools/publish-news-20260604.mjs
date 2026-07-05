import fs from "fs";
import path from "path";

const root = process.cwd();
const siteUrl = "https://www.yilukaige.com";
const orgName = "北京一路凯歌网络科技有限公司";
const brandName = "一路凯歌";
const baikeUrl = "https://baike.baidu.com/item/%E4%B8%80%E8%B7%AF%E5%87%AF%E6%AD%8C/58297174";

const schedule = [
  ["google-search-console-ai-config-geo-analysis", "2026-06-04T09:00:00+08:00"],
  ["chatgpt-noindex-title-link-control", "2026-06-04T09:02:00+08:00"],
  ["chatgpt-atlas-aria-lead-form-pages", "2026-06-04T09:04:00+08:00"],
  ["qwen-web-search-desensitized-query-brand-terms", "2026-06-04T09:06:00+08:00"],
  ["qwen-web-search-multi-model-consistent-brand-facts", "2026-06-04T09:08:00+08:00"],
  ["tencent-site-time-filter-owned-media-source", "2026-06-04T09:10:00+08:00"],
  ["tencent-web-search-monitoring-version-baseline", "2026-06-04T09:12:00+08:00"],
  ["volcengine-web-search-tool-usage-content-gap", "2026-06-04T09:14:00+08:00"],
  ["deepseek-cache-prefix-boundary-brand-snippets", "2026-06-04T09:16:00+08:00"],
  ["kimi-thinking-tool-context-preservation-pages", "2026-06-04T09:18:00+08:00"],
].map(([slug, datetime]) => ({
  slug,
  datetime,
  date: datetime.slice(0, 10),
  feedDate: toFeedDate(datetime),
}));

const articles = new Map([
  article({
    slug: "google-search-console-ai-config-geo-analysis",
    title: "Search Console 能用自然语言配过滤后，AI 搜索流量分析要先准备页面分组",
    category: "AI 搜索分析",
    keywords: "一路凯歌,Search Console,AI搜索流量分析,GEO优化,页面分组,搜索控制台,内容归因",
    description:
      "Google Search Console 支持用自然语言生成过滤条件后，企业做 AI 搜索流量分析更应先准备页面分组、查询簇和对比维度。",
    summary:
      "Google 在 Search Console 中加入 AI-powered configuration，允许用自然语言配置过滤器和对比视图。对 GEO 团队来说，这意味着 AI 搜索流量分析不该停留在“有没有访问”，而要先把资讯页、服务页、FAQ 页和活动页分组，方便后续持续比较。",
    sourceNote:
      "Google 官方博客介绍 Search Console 的 AI-powered configuration，可帮助用户通过自然语言创建过滤器与报表配置。",
    references: [
      ["Google Search Central Blog：Introducing AI-powered configuration in Search Console", "https://developers.google.com/search/blog/2025/12/ai-powered-configuration"],
      ["Google Search Console 帮助", "https://support.google.com/webmasters/answer/9128668"],
    ],
    sections: [
      [
        "分析入口变轻了，前置分组反而更重要",
        [
          "Search Console 过滤条件更容易配置，并不代表分析工作会自动完成。真正影响复盘质量的，仍然是企业有没有提前定义好哪些 URL 属于服务页、哪些属于资讯页、哪些属于 FAQ 或案例页。",
          "一路凯歌做 GEO 复盘时，更关注页面集群而不是单个 URL。因为 AI 搜索带来的访问往往分散在多篇问答型内容里，不做分组就很难判断哪类资产在承接品牌可见性。",
        ],
      ],
      [
        "AI 搜索流量不是一个渠道词就能看清",
        [
          "很多团队会先看 referrer 或 UTM，但内容层面的判断还需要和页面类型一起看。服务页访问增长，和资讯页访问增长，代表的品牌信号并不一样。",
          "如果首页、资讯页和具体专题页都混在一起观察，就容易只看到波动，看不到结构。先定义页面分组，再结合查询、设备和地区去比较，才更接近可执行的内容决策。",
        ],
        ["先按服务页、资讯页、FAQ 页、案例页做 URL 分组。", "把品牌词、问题词、比较词分成不同查询簇。", "同一组页面固定对比 7 天、28 天和 90 天窗口。"],
      ],
      [
        "自然语言配置降低门槛，但不替代口径治理",
        [
          "AI-powered configuration 让运营更容易上手，但不会替企业决定什么算成功。GEO 团队仍要先定义“品牌曝光”“AI 搜索进入页”“高意图落地页”等口径，后续才有连续复盘的基础。",
        ],
      ],
    ],
    faqs: [
      ["为什么 GEO 复盘要先做页面分组？", "因为 AI 搜索访问常分散在多类内容页里，不先分组就难看清哪些资产真正承接了可见性。"],
      ["只看 Search Console 查询还不够吗？", "不够，还需要结合页面类型、设备和地区，才能判断问题词是带来阅读还是带来询盘。"],
      ["一路凯歌会怎么搭这套分析？", "会先定义页面集群和查询簇，再把 Search Console 与 GA4 的转化动作连起来复盘。"],
    ],
  }),
  article({
    slug: "chatgpt-noindex-title-link-control",
    title: "OpenAI 说禁爬页仍可能只显示标题链接后，企业资料页要分清 disallow 和 noindex",
    category: "ChatGPT Search",
    keywords: "一路凯歌,ChatGPT Search,noindex,robots.txt,OAI-SearchBot,GEO优化,页面控制",
    description:
      "OpenAI 发布者 FAQ 说明，仅在 robots.txt 中禁止抓取的页面仍可能以标题和链接形式出现，企业需要分清 disallow 与 noindex 的治理目标。",
    summary:
      "OpenAI 发布者 FAQ 提到，如果页面只是阻止 OAI-SearchBot 抓取，ChatGPT Search 仍可能显示标题、链接和简短描述；若希望完全不在搜索结果中展示，需要使用 noindex。对企业资料页、招聘页和受控下载页来说，这个边界非常关键。",
    sourceNote:
      "OpenAI 发布者与开发者 FAQ 明确区分了阻止抓取与阻止出现在搜索结果中的控制方式，并说明完全移除需要 noindex。",
    references: [
      ["OpenAI Help：Publishers and Developers FAQ", "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq"],
      ["OpenAI Help：ChatGPT Search", "https://help.openai.com/en/articles/9237897-chatgpt-search"],
    ],
    sections: [
      [
        "禁抓取不等于禁展示",
        [
          "很多企业把 robots.txt 当作总开关，但 OpenAI 的 FAQ 把边界讲得很清楚：不允许抓取，并不总等于不会在搜索结果里留下标题和链接。",
          "这对资料页、招聘页、下载页和活动报名页尤其重要。企业如果只是担心正文被读取，可以用抓取控制；如果是完全不希望该页进入搜索结果，就需要更严格的 noindex 策略。",
        ],
      ],
      [
        "内容治理要按页面意图分层",
        [
          "公开服务页和资讯页需要争取被发现，受控资料页和临时活动页则可能需要限制展示。问题不在于一刀切开放或关闭，而在于是否清楚每类页面承担什么角色。",
          "一路凯歌更建议企业把页面分为公开获客层、半公开线索层和受控交付层，再为不同层配置合适的索引与抓取规则。",
        ],
        ["公开服务页优先确保可抓取、可索引。", "临时活动页明确是否需要 noindex。", "下载页和试算器区分正文展示与受控动作。"],
      ],
      [
        "GEO 不是只追求更多页面被看见",
        [
          "品牌在 AI 搜索中的可见性，核心是让该公开的内容清楚公开，让不该公开的边界明确可控。治理清楚，后续的信任度和线索质量通常更稳定。",
        ],
      ],
    ],
    faqs: [
      ["为什么 disallow 还可能留下标题链接？", "因为阻止抓取主要限制正文读取，不一定等于从搜索结果完全移除。"],
      ["什么时候应该用 noindex？", "当页面不希望以任何搜索结果形式出现时，应该评估 noindex，而不是只依赖 robots.txt。"],
      ["一路凯歌会如何梳理这些页面？", "会先按页面意图分层，再分别配置索引、抓取和 CTA 边界。"],
    ],
  }),
  article({
    slug: "chatgpt-atlas-aria-lead-form-pages",
    title: "ChatGPT Atlas 依赖 ARIA 理解页面后，企业留资表单别只做视觉占位",
    category: "ChatGPT Agent",
    keywords: "一路凯歌,ChatGPT Atlas,ARIA,留资表单,可访问性,GEO优化,企业转化页",
    description:
      "OpenAI 的 Atlas 文档说明代理会利用可访问性树与 ARIA 标记理解页面，企业留资表单、预约组件和 CTA 设计需要回到语义化基础。",
    summary:
      "OpenAI 介绍 Atlas 时提到，代理会通过浏览器快照和网页的可访问性树理解页面元素。对企业获客页来说，这意味着按钮、表单、步骤和状态提示不能只靠视觉摆放，仍要依赖规范的 ARIA 与语义结构，AI 代理和真人用户才能都顺畅完成动作。",
    sourceNote:
      "OpenAI 关于 Atlas 的介绍说明，代理通过浏览器快照、文本和可访问性信息来导航与操作网页。",
    references: [
      ["OpenAI：Introducing ChatGPT agent", "https://openai.com/index/introducing-chatgpt-agent/"],
      ["MDN：ARIA", "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA"],
    ],
    sections: [
      [
        "代理能点到，不代表代理能理解",
        [
          "很多企业落地页把表单、按钮和步骤做得很漂亮，但语义层面并不完整。按钮没有清楚的可访问名称、错误提示只改颜色、不同行为共用同一文案，这类问题不仅影响无障碍体验，也会影响代理式浏览理解。",
          "如果未来更多 AI 工具替用户完成预约、提交表单或打开下载页，语义化结构就不再只是开发规范，而是线索转化的一部分。",
        ],
      ],
      [
        "留资页要让状态变化可被读懂",
        [
          "表单提交、验证码提示、文件上传、日期选择和成功反馈，都是高风险环节。视觉占位能让人类大致看懂，但代理要稳定执行动作，还需要明确的字段标签、按钮语义和状态提示。",
          "一路凯歌更建议企业把关键 CTA 页当作“既给人用，也给代理用”的页面资产来治理。这样不仅兼顾未来的 AI 入口，也能同步提升移动端和无障碍体验。",
        ],
        ["表单字段使用真实 label，而不是只靠 placeholder。", "按钮文案直接描述动作，而不是统一写“提交”。", "成功、失败和加载状态都要有清晰文本提示。"],
      ],
      [
        "B2B 获客页的下一轮竞争会落到执行成功率",
        [
          "被 AI 推荐只是上半场，能否顺畅完成咨询、预约或下载，才决定线索能不能接住。语义结构做扎实，获客页的执行成功率通常会更高。",
        ],
      ],
    ],
    faqs: [
      ["为什么表单语义会影响 AI 代理？", "因为代理理解网页时会依赖可访问性信息，字段和按钮若没有清楚语义，就更容易误判。"],
      ["这只对未来代理有用吗？", "不是，同样能改善移动端体验、无障碍体验和传统转化漏斗。"],
      ["一路凯歌会优先检查哪些组件？", "会先检查表单、主 CTA、弹窗、成功提示和下载流程的语义与状态反馈。"],
    ],
  }),
  article({
    slug: "qwen-web-search-desensitized-query-brand-terms",
    title: "百炼不会把原问题直传搜索引擎后，品牌页标题要保留可检索实体词",
    category: "通义千问",
    keywords: "一路凯歌,通义千问,百炼,联网搜索,品牌实体词,GEO优化,标题策略",
    description:
      "阿里云百炼文档说明系统不会把原始问题直接透传给搜索引擎，而会做意图识别和脱敏改写，品牌页面标题更应保留清晰实体词与场景词。",
    summary:
      "阿里云百炼联网搜索文档说明，系统不会将用户原始问题直接透传给搜索引擎，而会先做意图理解与脱敏处理。对企业官网来说，这意味着页面标题和正文不能只押一句营销口号，而要保留品牌名、服务名、行业场景和可检索实体词，方便改写后的查询仍能命中。",
    sourceNote:
      "阿里云百炼联网搜索文档说明，平台会对用户问题进行意图识别与脱敏处理，不直接把原问题透传给搜索引擎。",
    references: [
      ["阿里云百炼：联网搜索", "https://help.aliyun.com/zh/model-studio/web-search/"],
      ["阿里云百炼：Responses API", "https://help.aliyun.com/zh/model-studio/responses-api"],
    ],
    sections: [
      [
        "检索入口改写后，标题更不能只写口号",
        [
          "企业常把首页和服务页标题写得过于抽象，比如“重塑增长方式”或“更懂企业的 AI 伙伴”。这类表达对人类品牌感知有帮助，但对改写后的检索问题并不一定友好。",
          "如果平台会先做意图识别与脱敏，再去外部搜索，页面里是否保留清楚的品牌实体词、服务词和场景词，就会更影响命中机会。",
        ],
      ],
      [
        "品牌词、服务词、场景词要同时存在",
        [
          "一路凯歌更建议企业在标题、首段和小标题中，同时保留品牌名称、服务名称与适用场景。这样无论用户问的是品牌、问题还是行业场景，页面都更容易进入候选集合。",
          "尤其是 B2B 服务页，不要让品牌词只出现在页脚，也不要让服务名只存在图片海报。AI 搜索改写之后，实体不完整的页面更容易被漏掉。",
        ],
        ["标题里保留品牌名与服务名。", "首段直接说明面向哪个行业或场景。", "小标题覆盖高频比较词与判断词。"],
      ],
      [
        "品牌可见性来自可检索表达，不只来自内容数量",
        [
          "企业每天新增资讯很重要，但如果品牌主页面不具备稳定可检索表达，再多资讯也不容易沉淀成品牌可见性。先把实体表达写清楚，日更内容才更容易互相放大。",
        ],
      ],
    ],
    faqs: [
      ["为什么不能只写品牌口号？", "因为检索问题会被改写，过于抽象的口号缺少可检索实体词，命中机会更不稳定。"],
      ["哪些词最值得保留在标题里？", "优先是品牌名、服务名、行业场景、问题词和比较词。"],
      ["一路凯歌如何处理这类标题？", "会先保证实体完整，再兼顾品牌表达和阅读自然度。"],
    ],
  }),
  article({
    slug: "qwen-web-search-multi-model-consistent-brand-facts",
    title: "百炼把联网搜索接到多模型后，官网事实层要先于模型层统一",
    category: "通义千问",
    keywords: "一路凯歌,百炼,联网搜索,多模型,品牌事实层,GEO优化,企业知识治理",
    description:
      "阿里云百炼为多款模型提供联网搜索能力后，企业官网更需要先统一品牌事实层，再谈适配不同模型入口。",
    summary:
      "阿里云百炼文档会分别列出支持联网搜索的模型与组合工具建议。对企业来说，这带来的启发不是追逐某一款模型，而是先把品牌名称、服务边界、行业案例、FAQ 与联系方式统一成稳定事实层，让不同模型入口读到的是同一套核心信息。",
    sourceNote:
      "阿里云百炼联网搜索文档会列出支持模型与推荐的工具组合，说明同一搜索能力会服务多个模型场景。",
    references: [
      ["阿里云百炼：联网搜索", "https://help.aliyun.com/zh/model-studio/web-search/"],
      ["阿里云百炼：模型广场", "https://help.aliyun.com/zh/model-studio/models"],
    ],
    sections: [
      [
        "模型会变，事实层不能跟着漂",
        [
          "中文 AI 入口更新很快，企业很容易把注意力全部放在“这周该适配哪一款模型”。但搜索能力一旦服务多个模型，真正长期有效的反而是品牌事实层是否统一。",
          "如果官网、白皮书、新闻稿和销售材料对同一服务写法不一致，即使某个模型暂时能理解，换一个入口也容易出现偏差。",
        ],
      ],
      [
        "先统一品牌定义，再扩展模型入口",
        [
          "一路凯歌更建议企业先梳理品牌定义、服务范围、交付边界、客户适配对象、案例摘要和联系方式，再让这些字段在首页、服务页、FAQ 和资讯页保持一致。",
          "这样做的价值不只是面向某一款模型，而是让企业自有信号在不同中文 AI 问答入口中都具备稳定可读性。",
        ],
        ["品牌名称和公司全称统一。", "服务能力和交付边界统一。", "案例摘要和适用行业统一。", "联系方式和预约入口统一。"],
      ],
      [
        "多模型时代更需要内容治理，而不是内容堆叠",
        [
          "企业若只为不同模型各写一版内容，很快会陷入维护失控。更高效的做法是沉淀一套统一事实层，再按页面场景做展开表达。",
        ],
      ],
    ],
    faqs: [
      ["什么是品牌事实层？", "就是品牌名、服务定义、边界、案例和联系方式等最核心、最稳定的一组公开事实。"],
      ["为什么它比适配单一模型更重要？", "因为同一套事实会被多个模型入口反复读取，统一性决定了品牌是否被稳定理解。"],
      ["一路凯歌会怎么建设事实层？", "会先整理标准字段，再同步到官网页面、FAQ 和结构化数据。"],
    ],
  }),
  article({
    slug: "tencent-site-time-filter-owned-media-source",
    title: "腾讯联网搜索支持站内域名和时间过滤后，企业官网要先做自有信源包",
    category: "腾讯元宝",
    keywords: "一路凯歌,腾讯联网搜索,站内域名过滤,时间过滤,自有信源,GEO优化,企业官网",
    description:
      "腾讯联网搜索 API 支持指定网址和时间范围后，企业应优先整理官网中的公告、资讯、FAQ 与案例页，形成可被定向检索的自有信源包。",
    summary:
      "腾讯云联网搜索 API 支持指定网址检索和指定时间范围检索。对企业官网来说，这意味着真正有机会进入中文 AI 问答入口的，不只是首页，而是一组日期清晰、结构稳定、彼此可内链的自有信源页面。官网如果没有成体系的资讯、FAQ 和案例页，就很难被持续定向利用。",
    sourceNote:
      "腾讯云联网搜索 API 产品页列出了指定网址检索与指定时间范围检索等能力。",
    references: [
      ["腾讯云：联网搜索 API", "https://cloud.tencent.com/product/wsa"],
      ["腾讯云文档：联网搜索 API", "https://cloud.tencent.com/document/product/1806"],
    ],
    sections: [
      [
        "自有信源不是一篇“关于我们”就够了",
        [
          "当搜索能力支持站内域名过滤时，企业官网就不只是品牌名片，而是一套可被定向检索的知识集合。首页只能回答“你是谁”，但 FAQ、案例、公告和资讯页才能回答“你具体做什么、做给谁、最近有什么变化”。",
          "没有这些页面，AI 即便想优先看企业自有站点，也只能拿到很少上下文。",
        ],
      ],
      [
        "先整理哪几类页面，决定官网信源质量",
        [
          "一路凯歌更建议企业先整理四类页面：长期稳定的服务页、持续更新的资讯页、决策型 FAQ 页和可核验的案例摘要页。这四类内容能覆盖品牌定义、近期变化、客户疑问和信任证据。",
          "再往上做内链和时间标签，就能形成更清晰的自有信源包，既方便定向搜索，也方便 AI 在答案里引用。",
        ],
        ["每类页面都保留发布日期或更新时间。", "服务页与资讯页互相链接，避免孤岛。", "FAQ 和案例页保留可复制的文字摘要，不只放图片。"],
      ],
      [
        "时间过滤会让‘最近更新’变成真实能力",
        [
          "如果官网长期不更新，时间过滤能力反而会把页面排除在近期问题之外。稳定日更的价值，不只是内容数量，而是让官网持续具备“近期可用信源”属性。",
        ],
      ],
    ],
    faqs: [
      ["什么叫自有信源包？", "就是官网中一组可被持续检索和引用的服务页、资讯页、FAQ 页与案例页集合。"],
      ["为什么只靠首页不够？", "首页信息密度有限，难覆盖客户在 AI 问答中连续追问的细节。"],
      ["一路凯歌会先补哪些页面？", "会优先补服务定义、FAQ、行业资讯和案例摘要四类页面。"],
    ],
  }),
  article({
    slug: "tencent-web-search-monitoring-version-baseline",
    title: "腾讯联网搜索按 version 维度监控后，AI 流量实验别再混看不同套餐",
    category: "AI 流量分析",
    keywords: "一路凯歌,腾讯联网搜索,version监控,AI流量实验,GEO优化,数据口径,效果复盘",
    description:
      "腾讯云联网搜索文档提供按 version 维度监控的示例后，企业在做 AI 流量实验时更应先拆分不同入口、版本和页面批次。",
    summary:
      "腾讯云联网搜索 API 监控文档会展示以 `version` 作为维度查看调用情况的方式。对企业做 AI 流量和内容实验来说，这个启发很直接：任何内容上线、模板改版或渠道切换，都不该混在一个总表里看，而应先拆清版本、批次和页面集合，才能复盘哪一次调整真正起作用。",
    sourceNote:
      "腾讯云联网搜索 API 监控信息文档提供了通过版本等维度查看调用情况的示例。",
    references: [
      ["腾讯云文档：联网搜索 API 监控信息", "https://cloud.tencent.com/document/product/1806/121779"],
      ["腾讯云：联网搜索 API", "https://cloud.tencent.com/product/wsa"],
    ],
    sections: [
      [
        "没有版本意识，实验很容易看成噪音",
        [
          "很多企业做内容实验时，会同时改标题、首屏、CTA、FAQ、内链和渠道入口，最后只看总流量或总询盘。这样即使结果变化，也很难知道是哪一个动作起作用。",
          "腾讯文档里对 version 维度的展示，提醒我们所有 AI 流量实验都应该先有版本意识：这一次改的是哪批页面、哪套模板、哪条入口。",
        ],
      ],
      [
        "GEO 复盘也需要批次管理",
        [
          "一路凯歌更建议把资讯批次、FAQ 模板、服务页结构和 CTA 方案都当作独立版本处理。这样当某一批页面被 AI 问答入口更频繁引用时，团队能回溯是因为内容结构、事实表达还是落地页承接发生了变化。",
          "版本意识不只是工程管理概念，它也是内容与获客协作的基础。",
        ],
        ["每次批量改版都保留版本编号。", "统计时按页面批次而不是整站混看。", "上线前后固定观察窗口和核心转化事件。"],
      ],
      [
        "AI 流量分析要从可解释性开始",
        [
          "先让每次改动可解释，后续才谈得上放大投入。否则即使流量增长，也很难复制成功经验。",
        ],
      ],
    ],
    faqs: [
      ["为什么内容实验也要做版本管理？", "因为只有分清版本和批次，才能判断哪一次改动真正带来可见性或转化变化。"],
      ["版本管理只适合大团队吗？", "不是，小团队更需要用简单版本号和批次表避免多动作同时上线后无法归因。"],
      ["一路凯歌如何记录这类实验？", "会把页面模板、发布时间、入口变化和转化指标放进同一套复盘表。"],
    ],
  }),
  article({
    slug: "volcengine-web-search-tool-usage-content-gap",
    title: "火山方舟暴露 tool_usage_details 后，内容团队终于能反推哪些问题要补页",
    category: "火山方舟",
    keywords: "一路凯歌,火山方舟,tool_usage_details,内容缺口,GEO优化,联网搜索,问题覆盖",
    description:
      "火山方舟 Web Search 文档展示 tool_usage_details 等调用信息后，企业可以据此反推哪些问题需要补充官网页面或 FAQ。",
    summary:
      "火山方舟 Web Search 文档会返回与工具使用相关的明细字段。对企业做 GEO 来说，这类工具级信号的价值不是看技术热闹，而是帮助团队反推：模型为了回答客户问题，到底额外搜索了什么、引用了哪些外部网页、官网又缺了哪些可直接采用的内容。",
    sourceNote:
      "火山方舟联网内容插件文档展示了工具调用相关的使用明细信息。",
    references: [
      ["火山方舟：Web Search（联网内容插件）", "https://www.volcengine.com/docs/82379/1756990"],
      ["火山方舟：产品概览", "https://www.volcengine.com/docs/82379/66619f91f281250274ef5000"],
    ],
    sections: [
      [
        "工具明细不是给工程师独享的日志",
        [
          "一旦团队能看到模型为回答问题额外调了哪些搜索工具、走了哪些步骤，这些信息就不只是工程调试数据。内容团队同样可以用它判断官网当前缺了什么。",
          "如果同一类问题总要依赖外部来源补齐定义、边界或案例，说明官网自己的相关页面还不够完整，或者表达还不够容易被采用。",
        ],
      ],
      [
        "把“额外搜索了什么”变成补页清单",
        [
          "一路凯歌做内容规划时，会把模型反复需要外部补充的问题，整理成官网补页清单。比如缺少价格边界说明、行业适配 FAQ、版本更新记录或实施前提条件，就应优先补到自有站点。",
          "这样做的目标不是取代所有外部来源，而是让品牌官网在关键判断题上拥有更完整的第一手表达。",
        ],
        ["记录高频被外部补充的问题。", "优先补判断题、边界题和比较题页面。", "补页后继续观察工具调用是否下降。"],
      ],
      [
        "内容缺口最好由真实问答反推",
        [
          "凭想象列选题容易跑偏，用真实问答里的缺口反推内容，更接近客户决策路径，也更适合 GEO 长期建设。",
        ],
      ],
    ],
    faqs: [
      ["什么样的工具明细对内容团队最有用？", "最有用的是哪些问题总要额外搜索、哪些外部页面经常被引用、哪些步骤反复出现。"],
      ["补页的优先级怎么排？", "优先补高频判断题、边界题和直接影响询盘转化的问题。"],
      ["一路凯歌会怎么用这些信号？", "会把工具使用明细转成内容缺口清单，再安排 FAQ、专题页和资讯页补齐。"],
    ],
  }),
  article({
    slug: "deepseek-cache-prefix-boundary-brand-snippets",
    title: "DeepSeek 只命中完整缓存前缀后，品牌知识前缀要和临时答案分层",
    category: "DeepSeek",
    keywords: "一路凯歌,DeepSeek,Context Caching,品牌知识前缀,GEO优化,结构化内容,知识复用",
    description:
      "DeepSeek Context Caching 说明缓存匹配依赖前缀一致性后，企业知识资产更应区分稳定品牌前缀与临时任务答案。",
    summary:
      "DeepSeek 的 Context Caching 文档说明，缓存命中依赖前缀内容一致。对企业知识资产来说，这意味着品牌介绍、服务字段、FAQ 短答和交付边界这类稳定内容，最好与临时生成的个性化回答分层管理。把两者混在一段长文本里，不利于复用，也不利于官网形成稳定可引用片段。",
    sourceNote:
      "DeepSeek Context Caching 文档说明缓存命中与前缀复用有关，适合重复上下文场景。",
    references: [
      ["DeepSeek API Docs：Context Caching", "https://api-docs.deepseek.com/guides/kv_cache"],
      ["DeepSeek API Docs：Quick Start", "https://api-docs.deepseek.com/"],
    ],
    sections: [
      [
        "稳定知识不该和临时话术混写",
        [
          "企业常把品牌介绍、服务说明、行业案例和即时回复混成一段很长的营销描述。这样对人类销售也许还能临场发挥，但对模型复用和官网沉淀都不够友好。",
          "DeepSeek 缓存前缀的思路提醒我们：反复出现的稳定内容，应该被单独整理为可复用前缀，而不是每次随着回答一起被重写。",
        ],
      ],
      [
        "官网也需要自己的稳定前缀层",
        [
          "一路凯歌更建议企业把品牌名、公司全称、核心服务、交付范围、适用客户、FAQ 短答和联系方式做成稳定片段，优先出现在首页、服务页、FAQ 页和结构化数据中。",
          "个性化案例分析、项目建议和活动文案可以保持灵活，但不该反过来污染稳定事实层。这样内容既方便 AI 理解，也方便团队内部复用。",
        ],
        ["品牌定义单独成段。", "服务边界单独成段。", "FAQ 短答优先写成可复制片段。", "个性化建议放在稳定前缀之后展开。"],
      ],
      [
        "结构化复用会放大日更内容价值",
        [
          "当稳定前缀已经清楚，资讯日更就能更多承担近期变化和行业判断的角色，而不必每篇都重新解释品牌是谁、做什么。这会让站内表达更集中，也更利于内链建设。",
        ],
      ],
    ],
    faqs: [
      ["什么内容适合做稳定前缀？", "品牌定义、服务范围、交付边界、FAQ 短答、联系方式和长期有效的判断标准最适合。"],
      ["为什么不能全部写成长文？", "因为长文容易把稳定事实和临时话术混在一起，既不利于复用，也不利于一致表达。"],
      ["一路凯歌会怎么拆这些内容？", "会先抽稳定字段，再把项目化建议和近期观察分配到专题页与资讯页。"],
    ],
  }),
  article({
    slug: "kimi-thinking-tool-context-preservation-pages",
    title: "Kimi 工具调用要求保留 reasoning_content 后，长问题页更要有清晰分段",
    category: "Kimi",
    keywords: "一路凯歌,Kimi,reasoning_content,联网搜索,长问题页,GEO优化,内容分段",
    description:
      "Moonshot 文档说明在带工具调用的场景下需保留 reasoning_content，企业围绕复杂问题建设页面时更应强化分段、层次与上下文承接。",
    summary:
      "Moonshot 的 Kimi 文档提示，在上一轮包含工具调用时，下一轮请求需要把 reasoning_content 一并保留。对企业官网内容来说，这个边界带来的启发是：复杂问题页最好天然分成结论、条件、步骤、风险和 FAQ 几层，让模型与用户都更容易沿着上下文继续追问，而不是面对一整块难以接续的长文。",
    sourceNote:
      "Moonshot 平台文档说明，上一轮在思考模式下若包含 tool calls，后续消息中应保留 reasoning_content。",
    references: [
      ["Moonshot AI 开发者平台：Kimi 模型与工具调用文档", "https://platform.moonshot.cn/docs/guide/use-kimi-k2.5"],
      ["Moonshot AI 开发者平台", "https://platform.moonshot.cn/docs/introduction"],
    ],
    sections: [
      [
        "复杂问题需要可续写的上下文",
        [
          "B2B 客户在 AI 问答里很少只问一句。他们会从“这是什么”继续问到“适不适合我”“怎么执行”“风险是什么”“需要准备什么资料”。如果官网页面本身没有层次，模型和用户都很难顺着问题继续深入。",
          "Kimi 文档对 reasoning_content 的要求，提醒我们复杂任务的上下文承接很重要。官网文章若先把层次整理好，就更适合承接多轮追问。",
        ],
      ],
      [
        "长问题页要先给结论，再给条件和步骤",
        [
          "一路凯歌更建议复杂问题页固定成几层结构：开头先给结论，中间讲适用条件和执行步骤，后面补风险边界与 FAQ。这样即使用户只看一部分，也能快速抓住重点；模型在继续组织答案时，也更容易抽到完整片段。",
          "这类分段写法对 SEO、GEO 和销售沟通都更友好，因为每一段都承担清晰职责，不会彼此抢信息。",
        ],
        ["首段先回答结论。", "中段解释适用条件和步骤。", "尾段补风险边界与 FAQ。"],
      ],
      [
        "内容分段是长期可维护性的基础",
        [
          "当平台规则、产品能力或行业口径变化时，分层结构也更方便局部更新。复杂内容写成一整块，后续每次更新都会更重。",
        ],
      ],
    ],
    faqs: [
      ["为什么长问题页要强调分段？", "因为复杂问题天然会引发连续追问，分段能让用户和模型都更容易接住上下文。"],
      ["这和普通 SEO 写作有什么不同？", "GEO 更强调被抽取与被继续追问的能力，所以结论、条件、步骤和风险边界要更清楚。"],
      ["一路凯歌会怎么改这类文章？", "会先重构段落职责，再补 FAQ、内链和结构化字段。"],
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
          <p>本文基于公开可核验资料原创整理，重点提炼对企业 GEO、AI 搜索品牌可见性和 B2B 获客执行的启发，不替代相关平台完整产品文档。</p>
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
    <footer class="site-footer"><div class="footer-main"><div class="footer-brand"><a class="brand" href="../index.html#top" aria-label="${brandName}返回首页"><span class="brand-mark"><img src="../assets/logo.png" alt="${brandName}品牌标志" /></span><span><strong>${brandName}</strong><small>AI Search Growth</small></span></a><p>专注 GEO 生成式引擎优化，帮助企业把真实能力沉淀成 AI 可理解、可引用、可推荐的品牌知识资产。</p><div class="footer-contact"><a href="tel:18610730255">18610730255</a><span>北京市</span></div></div><nav class="footer-links" aria-label="页脚导航"><div><h3>服务</h3><a href="../index.html#services">GEO 服务</a><a href="../index.html#advantages">核心优势</a><a href="../index.html#cases">适用场景</a></div><div><h3>公司</h3><a href="../about.html">关于我们</a><a href="../news.html">行业资讯</a><a href="../index.html#contact">联系我们</a></div><div><h3>资源</h3><a href="../faq/">常见问题</a><a href="../geo-service/">GEO 服务流程</a><a href="../index.html#contact">预约诊断</a></div></nav></div><div class="footer-bottom"><span>© 2026 . All Rights Reserved.</span><a class="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">京ICP备19004756号-3</a></div></footer>
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
  const listSection = `      <section class="section news-list-section">
        <div class="section-heading reveal">
          <p class="eyebrow">Latest Articles</p>
          <h2>最新文章</h2>
          <p>用于沉淀 AI 搜索优化、内容策略和数据衡量相关资讯。</p>
        </div>
        <div class="article-grid">
${allArticles.map(card).join("\n")}
        </div>
      </section>`;
  html = replaceSection(html, '      <section class="section news-list-section">', '      <section class="lead-section compact-lead">', `${listSection}\n\n`);
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
    throw new Error(`Usage: node tools/publish-news-20260604.mjs <1-${schedule.length}>`);
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
  console.log(`Published ${count} articles for 2026-06-04.`);
}

main();
