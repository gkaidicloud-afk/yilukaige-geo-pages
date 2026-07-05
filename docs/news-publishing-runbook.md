# 一路凯歌官网新闻发布操作手册

这份手册用于以后发布 `www.yilukaige.com` 新闻文章。原则只有一个：

**GitHub 仓库是内容源，服务器只是展示结果。不要直接手改服务器文件。**

## 1. 发布前准备

准备这些内容：

- 文章标题
- 文章摘要，建议 100-180 字
- 正文内容，建议拆成 4-6 个小标题
- FAQ 问答，建议 3-4 条
- 图片文件，放到 `assets/`
- 如果有二维码获客图，放在文章最后引导段落

常用图片命名方式：

```text
assets/文章主题-1.png
assets/文章主题-2.png
assets/文章主题-qr.jpeg
```

不要用中文或空格作为最终线上图片名。

## 2. 编辑文章源头

文章源头在：

```text
tools/news-articles-20260705.mjs
```

新增文章时，要包含：

- `slug`：文章英文 URL，不要重复
- `title`：文章标题
- `summary`：新闻列表摘要
- `category`：文章分类
- `keywords`：关键词
- `seoDescription`：搜索引擎摘要
- `sections`：正文段落和图片
- `faqs`：底部延伸问答

图片插入在对应小节的 `images` 里。二维码获客图放在最后一个小节。

## 3. 生成页面

进入项目目录：

```powershell
cd C:\Users\gkaid\Documents\Codex\yilukaige-geo-pages
```

运行发布脚本：

```powershell
node tools/publish-single-news.mjs 这里换成文章slug
```

它会自动更新：

- 新文章详情页
- `news.html`
- 新闻分页页
- 首页最新文章
- `sitemap.xml`
- `feed.xml`
- `llms.txt`

## 4. 本地检查

先启动本地预览：

```powershell
$env:PORT="4177"; $env:HOST="127.0.0.1"; node server.js
```

浏览器打开：

```text
http://127.0.0.1:4177/news/文章slug.html
http://127.0.0.1:4177/news.html
http://127.0.0.1:4177/sitemap.xml
http://127.0.0.1:4177/feed.xml
http://127.0.0.1:4177/llms.txt
```

重点检查：

- 标题是否正常
- 图片是否全部显示
- 二维码是否在最后引导位置
- 新闻页是否能看到新文章
- FAQ 是否显示正常
- 页面没有明显乱码、缺图、错位

## 5. 提交到 GitHub

检查改动：

```powershell
git status --short
```

提交：

```powershell
git add .
git commit -m "Publish news article"
git push origin main
```

## 6. 同步到服务器

服务器信息：

```text
IP：39.96.58.195
用户：admin
线上目录：/opt/yilu-kaige
服务：yilu-kaige.service
```

常用同步命令：

```powershell
scp -i "$env:USERPROFILE\.ssh\id_ed25519_yilukg" -o IdentitiesOnly=yes -o BatchMode=yes index.html news.html sitemap.xml feed.xml llms.txt admin@39.96.58.195:/opt/yilu-kaige/
```

同步新文章：

```powershell
scp -i "$env:USERPROFILE\.ssh\id_ed25519_yilukg" -o IdentitiesOnly=yes -o BatchMode=yes news/文章slug.html admin@39.96.58.195:/opt/yilu-kaige/news/
```

同步新图片：

```powershell
scp -i "$env:USERPROFILE\.ssh\id_ed25519_yilukg" -o IdentitiesOnly=yes -o BatchMode=yes assets/图片文件名.png admin@39.96.58.195:/opt/yilu-kaige/assets/
```

如果更新了新闻分页，也要同步对应分页：

```powershell
scp -i "$env:USERPROFILE\.ssh\id_ed25519_yilukg" -o IdentitiesOnly=yes -o BatchMode=yes news/page/2/index.html admin@39.96.58.195:/opt/yilu-kaige/news/page/2/index.html
```

静态文章、图片、sitemap、feed、llms 更新通常不需要重启服务。

## 7. 线上检查

上线后检查：

```text
https://www.yilukaige.com/
https://www.yilukaige.com/news.html
https://www.yilukaige.com/news/文章slug.html
https://www.yilukaige.com/sitemap.xml
https://www.yilukaige.com/feed.xml
https://www.yilukaige.com/llms.txt
```

如果浏览器还显示旧内容，等 5 分钟或强制刷新缓存。

## 8. 提交收录

新增 URL 后提交 IndexNow：

```powershell
$body = @{
  host = "www.yilukaige.com"
  key = "da808c9266834793aed8af4057d0b6b0"
  keyLocation = "https://www.yilukaige.com/da808c9266834793aed8af4057d0b6b0.txt"
  urlList = @("https://www.yilukaige.com/news/文章slug.html")
} | ConvertTo-Json -Depth 4

Invoke-WebRequest -Uri "https://api.indexnow.org/indexnow" -Method Post -ContentType "application/json; charset=utf-8" -Body $body -UseBasicParsing
```

提交百度普通收录：

```powershell
node tools/submit-baidu.mjs https://www.yilukaige.com/news/文章slug.html
```

如果返回：

```text
over quota
```

说明当天普通收录配额已满，记录即可，第二天再试。

## 9. 不要做的事

- 不要直接在服务器 `/opt/yilu-kaige` 手改文章
- 不要再按 `/www/wwwroot/www.yilukaige.com` 部署
- 不要只上传文章页，忘记 `news.html / sitemap.xml / feed.xml / llms.txt`
- 不要用中文文件名或带空格的文件名做线上图片
- 不要覆盖和本次文章无关的文件

## 10. 最简单的协作方式

如果你不想自己改代码，只要把这些给 Codex：

```text
请按 docs/news-publishing-runbook.md 发布这篇文章到 www.yilukaige.com 新闻资讯。
文章文件：
图片文件：
二维码图：
要求：
- 图片放到对应段落
- 二维码放到最后引导位置
- 更新首页、新闻页、feed、sitemap、llms
- 部署后提交 IndexNow
- 百度普通收录如果 over quota，记录即可
```

