# 一路凯歌 GEO 官网

这是 `www.yilukaige.com` 的官网文件。纯静态页面可以放到 GitHub Pages；如果要集中收集表单线索，需要运行 `server.js` 这个轻量 Node 后台。

核心文件：

- `index.html`: 页面内容与结构化数据
- `about.html`: 关于我们独立页面
- `news.html`: 行业资讯与文章列表页面
- `styles.css`: 深海军蓝、爱马仕橙、浅灰蓝三色主题样式
- `script.js`: 滚动显隐、轻量动效与线索表单提交
- `server.js`: 官网静态资源服务与线索 API
- `admin.html`, `admin.js`: 线索管理后台
- `data/leads.json`: 本地线索数据文件，已被 `.gitignore` 忽略
- `CNAME`: GitHub Pages 自定义域名
- `robots.txt`, `sitemap.xml`, `llms.txt`: 搜索与 AI 抓取信息

本地运行轻后台：

```bash
npm run dev
```

访问：

- 官网：`http://127.0.0.1:4177/`
- 后台：`http://127.0.0.1:4177/admin.html`
- 本地默认管理口令：`local-dev`

线上部署后台时建议设置环境变量：

```bash
ADMIN_TOKEN=your-strong-token PORT=4177 node server.js
```
