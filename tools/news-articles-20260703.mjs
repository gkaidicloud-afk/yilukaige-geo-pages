const publishDate = "2026-07-03";

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

function feedDate(minute) {
  return `Fri, 03 Jul 2026 11:${String(minute).padStart(2, "0")}:00 +0800`;
}

function publishTime(minute) {
  return `2026-07-03T11:${String(minute).padStart(2, "0")}:00+08:00`;
}

function article(config) {
  return {
    date: publishDate,
    datetime: publishTime(config.minute),
    feedDate: feedDate(config.minute),
    sourceNote:
      config.sourceNote ??
      "本文结合公开来源与一路凯歌官网服务页、AI 搜索优化页、FAQ 和品牌资料整理，属于北京一路凯歌网络科技有限公司对 GEO 优化、AI 搜索优化和企业 AI 服务落地的行业观察，不代表相关平台背书，也不包含确定性排名或效果承诺。",
    references: [...(config.references ?? []), ...defaultReferences],
    ...config,
  };
}

export const july3Articles = [
  article({
    slug: "google-generative-ai-search-seo-geo-proof",
    minute: 0,
    title: "Google 官方再提醒：做 GEO 别先追玄学，官网内容要先能被理解",
    summary:
      "Google 面向生成式 AI 搜索功能发布优化说明，核心信号很明确：SEO 基础仍然重要，内容质量、可抓取性、页面结构和真实价值不会过时。一路凯歌认为，企业做 GEO 优化，第一步不是找技巧，而是把官网事实、FAQ、服务边界和案例证据写清楚。",
    category: "GEO 优化",
    keywords:
      "Google生成式AI搜索,GEO优化,AI搜索优化,SEO基础,官网内容优化,AI可引用内容,一路凯歌,企业AI服务",
    seoDescription:
      "Google 说明生成式 AI 搜索优化仍然离不开 SEO 基础。企业做 GEO 优化，应先把官网事实、FAQ、服务边界和案例证据整理成可理解内容。",
    references: [
      {
        label: "Google Search Central：Optimizing your website for generative AI features on Google Search",
        url: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
      },
    ],
    cover: {
      title: "GEO 先回到官网基本功",
      kicker: "GOOGLE AI SEARCH",
      tag: "可抓取 / 可理解 / 可引用",
      points: ["内容质量仍是基础", "服务事实要写清", "FAQ 和案例要能核验"],
      colors: ["#0B1F3B", "#214E63", "#F36B21", "#F7F3EC"],
    },
    sections: [
      {
        heading: "生成式 AI 搜索来了，但基本功没有消失",
        paragraphs: [
          "Google 近期面向生成式 AI 搜索功能发布优化说明，很多企业最该注意的不是某个新名词，而是一句更朴素的判断：面向 AI 搜索的优化，仍然建立在搜索系统能发现、理解和评估页面的基础上。换句话说，GEO 不是把 SEO 推倒重来，而是在原来的官网内容、技术抓取、页面结构和可信信号上继续升级。",
          "对企业来说，这个提醒很重要。现在市场上容易把 GEO 包装成神秘技巧，好像只要加一个文件、堆一批文章、换几个关键词，就能让 AI 立刻推荐品牌。但真正能长期发挥作用的，仍然是清楚、稳定、可验证的公开信息。AI 需要知道你是谁、服务谁、解决什么问题、为什么可信。",
        ],
      },
      {
        heading: "官网要从宣传页变成事实页",
        paragraphs: [
          "一路凯歌在做 AI 搜索优化时，会先看企业官网是不是能回答客户和 AI 的基础问题。比如公司主体是否统一，服务范围是否清楚，FAQ 是否覆盖客户真实顾虑，案例页是否有过程和证据，联系方式是否明显。这些内容看起来不炫，但它们决定 AI 能不能把品牌归到正确场景里。",
          "如果官网只剩“专业、领先、全案、赋能”这些抽象词，AI 很难判断企业适合什么客户。更好的写法，是把服务对象、启动条件、交付内容、复盘指标和不承诺边界放进页面，让人能看懂，也让搜索系统能抽取。",
        ],
        bullets: [
          "关于页统一公司、品牌、负责人和联系方式。",
          "服务页写清适合客户、交付内容和服务边界。",
          "FAQ 用客户真实问题组织答案，而不是只写概念。",
          "案例页多写问题、动作和复盘，少写夸张口号。",
        ],
      },
      {
        heading: "GEO 的重点是让 AI 有依据地理解你",
        paragraphs: [
          "企业做 GEO，不是为了制造一套只给机器看的文字，而是把真实业务表达得更清楚。官网、新闻、FAQ、案例、sitemap、feed 和 llms.txt 之间要互相支撑，让 AI 从不同入口看到同一套品牌事实。",
          "这也是一路凯歌官网持续更新资讯的原因。每一篇文章不只是发稿，而是在补一个客户可能会问的问题。问题回答得越稳定，品牌越容易从一个名字变成 AI 能理解的服务实体。",
        ],
      },
    ],
    faqs: [
      {
        question: "Google 的生成式 AI 搜索说明对 GEO 有什么启发？",
        answer:
          "启发是企业不要把 GEO 做成玄学，仍要优先做好内容质量、页面可抓取、结构清晰、事实完整和可信证据。",
      },
      {
        question: "企业官网现在最该补什么？",
        answer:
          "建议优先补公司主体、服务页、FAQ、案例证据、联系方式和结构化页面，让 AI 和客户都能判断企业适合什么场景。",
      },
      {
        question: "一路凯歌怎么理解 GEO 和 SEO 的关系？",
        answer:
          "一路凯歌认为 SEO 是被发现的基础，GEO 是被 AI 理解、引用和推荐的能力，两者应该一起建设。",
      },
    ],
  }),
  article({
    slug: "microsoft-frontier-company-enterprise-ai-engineering",
    minute: 8,
    title: "微软提出 Frontier Company：企业 AI 服务正在从买工具转向工程化落地",
    summary:
      "Microsoft 发布 Frontier Company 相关文章，强调 AI 工程要放大并保护组织智能。一路凯歌认为，这说明企业 AI 服务的竞争重点正在变化：不只是接入模型，而是把知识库、权限、流程、审核和业务结果一起跑通。",
    category: "企业 AI 服务",
    keywords:
      "Microsoft Frontier Company,企业AI服务,AI工程化,AI工具配置,知识库治理,GEO优化,一路凯歌,AI落地",
    seoDescription:
      "Microsoft Frontier Company 强调企业 AI 工程化。一路凯歌认为，企业 AI 服务要从买工具转向知识库、权限、流程、审核和结果复盘的整体落地。",
    references: [
      {
        label: "Microsoft Official Blog：Microsoft Frontier Company",
        url: "https://blogs.microsoft.com/blog/2026/07/02/microsoft-frontier-company-ai-engineering-that-amplifies-and-protects-your-intelligence/",
      },
    ],
    cover: {
      title: "企业 AI 进入工程化落地",
      kicker: "ENTERPRISE AI",
      tag: "知识库 / 权限 / 流程 / 复盘",
      points: ["不是只买工具", "要跑通流程", "要保护组织智能"],
      colors: ["#0B1F3B", "#2F4F68", "#F36B21", "#F6F1EA"],
    },
    sections: [
      {
        heading: "企业 AI 的问题，不再只是有没有模型",
        paragraphs: [
          "Microsoft 在 Frontier Company 文章里，把重点放在 AI 工程如何放大并保护组织智能。这个角度很值得企业服务行业关注。过去很多企业谈 AI，先问哪个模型更强、哪个工具更便宜。现在真正卡住项目的，往往不是模型能力，而是企业资料是否整理好，员工是否会用，权限边界是否清楚，输出内容是否有人审核。",
          "一路凯歌在做企业 AI 服务和 AI 工具配置时，也会遇到类似问题。客户并不是缺一个聊天窗口，而是缺一套能把业务资料、销售问答、客户案例、服务流程和复盘指标串起来的工作方法。工具只是入口，流程才决定能不能长期用起来。",
        ],
      },
      {
        heading: "AI 工程化要先解决组织知识怎么用",
        paragraphs: [
          "企业内部有大量分散资料：官网介绍、销售话术、报价说明、客户问题、案例复盘、合同边界、售后规则。如果这些资料没有统一，AI 接入后只会把混乱放大。一个员工问到一种答案，另一个员工又得到另一种说法，最后反而增加审核成本。",
          "所以企业 AI 服务要先做知识库整理。哪些内容可以给 AI 用，哪些必须人工确认，哪些资料可以对外公开，哪些只能内部参考，都要有边界。一路凯歌会把这套内部知识整理和外部 GEO 信源建设放在一起看，因为它们本质上都在回答同一个问题：企业真实能力如何被准确表达。",
        ],
        bullets: [
          "先统一企业资料，再配置 AI 工具。",
          "先定义权限边界，再让 AI 参与流程。",
          "先设计审核机制，再追求自动化效率。",
          "先记录业务结果，再判断项目是否值得扩展。",
        ],
      },
      {
        heading: "官网内容也会影响企业 AI 落地",
        paragraphs: [
          "很多人以为官网只影响获客，其实官网也是企业知识资产的一部分。官网上的服务说明、FAQ、案例和新闻观点，往往会被销售、客服、运营和 AI 工具反复复用。如果官网本身表达不清，内部 AI 工具也容易继承这些问题。",
          "从这个角度看，GEO 优化和企业 AI 服务会越来越靠近。一个是给外部 AI 搜索和客户看的公开信源，一个是给内部员工和工具用的知识库。两者越一致，企业越容易形成稳定可信的表达体系。",
        ],
      },
    ],
    faqs: [
      {
        question: "企业 AI 服务为什么不能只买工具？",
        answer:
          "因为工具不能自动解决资料混乱、权限不清、流程断裂和审核缺失。企业要先把知识库、权限、流程和复盘机制跑通。",
      },
      {
        question: "企业 AI 和 GEO 有什么关系？",
        answer:
          "企业 AI 需要内部知识库，GEO 需要外部公开信源，两者都要求企业把服务事实、案例、FAQ 和边界表达清楚。",
      },
      {
        question: "一路凯歌能提供什么帮助？",
        answer:
          "一路凯歌可以帮助企业梳理 AI 工具使用场景、品牌知识资产、官网内容结构和 AI 搜索可见性诊断。",
      },
    ],
  }),
  article({
    slug: "aws-forward-deployed-ai-engineers-enterprise-ai-service",
    minute: 16,
    title: "AWS 投入前线 AI 工程师：企业 AI 落地正在进入“陪跑交付”阶段",
    summary:
      "AWS 宣布投入 10 亿美元建设 Forward Deployed Engineering 组织，把工程师嵌入客户场景共同交付 Agentic AI。一路凯歌认为，这说明企业 AI 服务的最后一公里越来越重要，服务商要能把场景、资料、流程和结果复盘落到客户现场。",
    category: "企业 AI 服务",
    keywords:
      "AWS Forward Deployed Engineering,企业AI服务,AI落地,Agentic AI,AI陪跑交付,AI工具配置,GEO优化,一路凯歌",
    seoDescription:
      "AWS 前线 AI 工程师投入说明企业 AI 落地进入陪跑交付阶段。企业服务商要把场景、资料、流程和结果复盘真正落到客户业务里。",
    references: [
      {
        label: "About Amazon：AWS invests $1 billion to embed AI forward deployed engineers with customers",
        url: "https://www.aboutamazon.com/news/aws/aws-1-billion-forward-deployed-ai-engineers",
      },
    ],
    cover: {
      title: "AI 落地进入陪跑交付",
      kicker: "AWS FDE",
      tag: "现场场景 / Agentic AI / 业务结果",
      points: ["场景要具体", "流程要跑通", "结果要复盘"],
      colors: ["#0B1F3B", "#334E68", "#F36B21", "#F7F3EC"],
    },
    sections: [
      {
        heading: "AI 落地的最后一公里，正在变成核心竞争力",
        paragraphs: [
          "AWS 宣布投入 10 亿美元建设 Forward Deployed Engineering 组织，把工程师嵌入客户团队，共同开发和部署 Agentic AI 解决方案。这个信号说明，企业 AI 的竞争已经不只是云资源、模型能力和 API 价格，而是能不能进入真实业务，把复杂流程拆开并跑出结果。",
          "这对中小企业同样有启发。很多老板不是不知道 AI 重要，而是不知道该从哪个岗位、哪份资料、哪个流程开始。销售、客服、内容、运营、售后，每个环节都能用 AI，但如果没有人陪着梳理流程，项目很容易停留在试用工具阶段。",
        ],
      },
      {
        heading: "陪跑交付不是替客户写几条提示词",
        paragraphs: [
          "真正的陪跑交付，第一步是定义场景。比如销售问答、客户资料整理、官网 FAQ 更新、案例复盘、电话咨询记录分类。第二步是整理资料，让 AI 有稳定输入。第三步是设置边界，哪些内容能自动生成，哪些必须人工确认。第四步是复盘结果，看到底节省了时间，还是增加了返工。",
          "一路凯歌做企业 AI 服务时，更关注这些实际动作。不是把 AI 包装成万能助手，而是把一个具体业务流程跑通。只有流程跑通，后面才谈得上扩展到更多岗位。",
        ],
        bullets: [
          "从一个真实岗位场景开始，不要一上来全公司铺开。",
          "先整理资料和标准答案，再配置工具。",
          "给 AI 设置权限、审核和停止条件。",
          "用时间、错误率、咨询质量和转化动作复盘效果。",
        ],
      },
      {
        heading: "GEO 内容建设也需要类似的交付思路",
        paragraphs: [
          "GEO 优化不是单纯写文章，也需要把客户问题、官网页面、FAQ、案例证据、sitemap、feed 和 llms.txt 串起来。它同样有最后一公里：内容上线后有没有被抓取，AI 有没有理解，客户有没有点击，咨询质量有没有变化。",
          "所以一路凯歌会把企业 AI 服务和 GEO 优化放在同一个增长框架下。内部用 AI 提高工作效率，外部用 GEO 让品牌更容易被 AI 搜索理解。两条线都不是一次性工程，而是持续陪跑和复盘。",
        ],
      },
    ],
    faqs: [
      {
        question: "AWS 前线 AI 工程师模式对企业有什么启发？",
        answer:
          "启发是企业 AI 落地不能只靠工具采购，更需要围绕真实场景做资料整理、流程配置、权限审核和结果复盘。",
      },
      {
        question: "中小企业做 AI 服务应该从哪里开始？",
        answer:
          "建议从销售问答、客户资料整理、FAQ 更新、案例复盘等高频场景开始，先跑通一个流程再扩展。",
      },
      {
        question: "一路凯歌如何做企业 AI 陪跑？",
        answer:
          "一路凯歌会先梳理岗位场景和资料基础，再配置 AI 工具、知识库和复盘表，让 AI 进入可管理流程。",
      },
    ],
  }),
  article({
    slug: "cognizant-openai-ai-cyber-defense-trust-boundary",
    minute: 24,
    title: "Cognizant 与 OpenAI 强调 AI 安全修复：企业 AI 服务必须先讲清权限和审核边界",
    summary:
      "Cognizant 与 OpenAI 发布面向网络安全的 AI 防御合作信息，从漏洞发现到修复验证都强调可控流程。一路凯歌认为，企业 AI 落地越深入，越不能只看效率，必须把数据权限、人工复核、日志记录和对外发布边界提前写清楚。",
    category: "AI 安全治理",
    keywords:
      "Cognizant OpenAI,AI网络安全,企业AI服务,AI安全治理,权限边界,人工复核,GEO内容审核,一路凯歌",
    seoDescription:
      "Cognizant 与 OpenAI 的 AI 安全合作说明，企业 AI 服务不能只看效率，还要把数据权限、人工复核、日志记录和发布边界设计清楚。",
    references: [
      {
        label: "PR Newswire：Cognizant and OpenAI bring frontier AI cyber defense",
        url: "https://www.prnewswire.com/news-releases/cognizant-and-openai-bring-frontier-ai-cyber-defense-from-vulnerability-discovery-to-validated-fixes-302816420.html",
      },
    ],
    cover: {
      title: "企业 AI 先讲清安全边界",
      kicker: "AI TRUST",
      tag: "权限 / 审核 / 日志 / 修复",
      points: ["数据不能乱进", "输出必须复核", "动作要能追踪"],
      colors: ["#0B1F3B", "#3D405B", "#F36B21", "#F7F3EC"],
    },
    sections: [
      {
        heading: "AI 越进入业务，安全边界越要提前设计",
        paragraphs: [
          "Cognizant 与 OpenAI 发布的 AI 网络安全合作，重点从漏洞发现延伸到修复验证。这个方向提醒企业：AI 不只是生成内容或回答问题，它会越来越多地参与高风险业务动作。一旦 AI 能访问系统、分析数据、提出修复建议，权限和审核边界就必须放在前面。",
          "很多企业试用 AI 时，只关注效率提升，比如写文案快不快、客服回答快不快、资料整理快不快。但到了真实业务里，问题会变得更具体：客户数据能不能进模型，内部资料能不能外发，AI 生成的建议谁来确认，错误内容有没有追溯记录。",
        ],
      },
      {
        heading: "企业 AI 服务要有四条底线",
        paragraphs: [
          "第一是数据边界。哪些资料可以给 AI 读取，哪些只能本地留存，哪些必须脱敏。第二是权限边界。AI 能看什么、写什么、发什么，不能模糊。第三是审核边界。涉及合同、价格、承诺、医疗、金融、安全等敏感内容，要有人复核。第四是日志边界。谁触发了什么任务，AI 输出了什么，最后谁确认，都要能回看。",
          "一路凯歌在做企业 AI 服务和内容建设时，也会把这些边界写进流程。尤其是 GEO 和官网资讯，不能为了追求更新速度就把未经核验的信息直接发布。AI 可以辅助生成，但企业要对公开内容负责。",
        ],
        bullets: [
          "数据边界：敏感资料先分类，必要时脱敏。",
          "权限边界：AI 能访问和执行的动作要明确。",
          "审核边界：对外内容、价格承诺和案例表达要复核。",
          "日志边界：关键输出和发布动作要可追踪。",
        ],
      },
      {
        heading: "可信 AI 也会影响品牌在 AI 搜索里的表现",
        paragraphs: [
          "AI 搜索越来越重视可信来源。企业如果官网内容经常夸大承诺、案例表达不清、服务边界模糊，客户和 AI 都很难判断它是否可靠。相反，把边界讲清楚，反而更容易形成专业感。",
          "一路凯歌做 GEO 优化时，不建议写“保证推荐、保证排名”这类话。更稳的表达，是说明会做哪些诊断、补哪些页面、监测哪些问题、如何复盘变化。边界清楚，是企业 AI 服务和 GEO 服务共同的信任基础。",
        ],
      },
    ],
    faqs: [
      {
        question: "企业 AI 服务为什么要先讲安全边界？",
        answer:
          "因为 AI 一旦进入真实业务，就会接触数据、流程和对外表达。没有权限、审核和日志边界，效率提升可能变成风险放大。",
      },
      {
        question: "GEO 内容发布也需要审核吗？",
        answer:
          "需要。官网新闻、案例、FAQ 和服务承诺都属于公开信源，应该经过事实核验和人工复核，避免误导客户和 AI。",
      },
      {
        question: "一路凯歌如何处理效果承诺？",
        answer:
          "一路凯歌不建议承诺固定排名或固定推荐，更强调诊断、页面补齐、内容建设、AI 提及监测和持续复盘。",
      },
    ],
  }),
  article({
    slug: "proprietary-data-ai-citation-asset-geo",
    minute: 32,
    title: "GEO 进入证据竞争：企业自己的数据，正在成为最难复制的 AI 引用资产",
    summary:
      "Search Engine Land 讨论专有数据对 AI 引用的重要性。一路凯歌认为，这对企业做 GEO 很关键：不要只写通用观点，要把客户问题、行业观察、服务复盘、案例统计和 FAQ 数据沉淀成可公开、可引用、可复用的品牌证据。",
    category: "AI 引用资产",
    keywords:
      "AI引用资产,专有数据,GEO优化,AI搜索优化,品牌证据,企业内容资产,案例复盘,一路凯歌",
    seoDescription:
      "企业自己的客户问题、行业观察、服务复盘、案例统计和 FAQ 数据，正在成为 GEO 优化中更难复制的 AI 引用资产。",
    references: [
      {
        label: "Search Engine Land：Why proprietary data is your most defensible AI citation asset",
        url: "https://searchengineland.com/proprietary-data-ai-citation-asset-481380",
      },
    ],
    cover: {
      title: "专有数据是 AI 引用资产",
      kicker: "GEO ASSET",
      tag: "客户问题 / 案例复盘 / 行业观察",
      points: ["少写通用观点", "多沉淀一手证据", "让品牌可被引用"],
      colors: ["#0B1F3B", "#2D5A53", "#F36B21", "#F7F3EC"],
    },
    sections: [
      {
        heading: "AI 引用不只看谁会写，更看谁有独特证据",
        paragraphs: [
          "Search Engine Land 讨论专有数据时，给 GEO 带来一个很实际的提醒：未来 AI 引用的竞争，不会只停留在通用观点上。很多文章都能解释 GEO 是什么、SEO 和 GEO 有什么区别，但真正难复制的是企业自己长期积累的问题、案例、复盘和数据。",
          "对企业来说，这意味着内容建设要从“写得像行业文章”升级为“能提供品牌自己的证据”。比如客户最常问的十个问题，某类行业做 AI 搜索优化最容易缺的页面，服务交付中最常见的误区，AI 提及复盘中经常出现的描述偏差。这些都是别人很难复制的一手材料。",
        ],
      },
      {
        heading: "企业可以先沉淀四类可公开数据",
        paragraphs: [
          "第一类是客户问题数据。把电话、微信、表单和会议里的高频问题整理成 FAQ 和新闻选题。第二类是案例过程数据。不是只写结果，而是写问题、动作、页面、复盘和下一步。第三类是行业观察数据。比如不同行业官网在品牌主体、服务页、FAQ 上常见的缺口。第四类是效果复盘数据，比如 AI 是否提及品牌、引用来源是否稳定、官网访问和咨询质量有没有变化。",
          "这些数据不一定要透露客户隐私，也不需要夸大结果。重点是脱敏、归纳、结构化。只要能说明真实经验，就比空泛观点更有引用价值。",
        ],
        bullets: [
          "客户问题：整理成 FAQ、文章标题和服务页段落。",
          "案例过程：记录问题、动作、页面和复盘结论。",
          "行业观察：沉淀常见缺口和适用建议。",
          "效果复盘：跟踪 AI 提及、引用来源、访问和线索质量。",
        ],
      },
      {
        heading: "一路凯歌做 GEO，更重视内容资产而不是文章数量",
        paragraphs: [
          "如果企业只是每天发相似文章，AI 看到的仍然是重复信息。真正值得长期做的，是把企业自己的知识沉淀下来。官网服务页回答能力边界，FAQ 回答客户顾虑，案例页回答真实过程，新闻资讯回答行业问题，llms.txt 和 sitemap 负责把重点入口整理出来。",
          "一路凯歌认为，GEO 优化会越来越像品牌证据工程。谁能持续提供清楚、真实、独特、可验证的信息，谁就更有机会在 AI 搜索里被理解和引用。",
        ],
      },
    ],
    faqs: [
      {
        question: "什么是 AI 引用资产？",
        answer:
          "AI 引用资产是指官网、FAQ、案例、数据、行业观察等可被搜索系统和 AI 识别、理解、引用的公开资料。",
      },
      {
        question: "企业没有大数据，还能做专有数据吗？",
        answer:
          "可以。客户问题、销售记录、案例复盘、行业观察和 AI 测试记录，都可以脱敏整理成可公开的一手经验。",
      },
      {
        question: "一路凯歌为什么强调内容资产？",
        answer:
          "因为 GEO 优化不是拼文章数量，而是让品牌长期积累可核验、可引用、可复用的公开证据。",
      },
    ],
  }),
];
