# HAIMA Imagine Background Remover

在线图片去背景工具：上传 JPG / PNG / WebP，即可下载透明 PNG。

## 架构

```
Cloudflare Pages (静态前端) + Cloudflare Worker (独立去背景 API)
```

- **前端**：Next.js 静态导出（`output: 'export'`），部署在 Cloudflare Pages
- **API**：独立 Cloudflare Worker，调用 remove.bg

## 本地开发

```bash
pnpm install
cp .env.example .env.local
# 填入 NEXT_PUBLIC_REMOVE_BG_API_URL（本地开发可不填，用默认相对路径）
pnpm dev
```

## 部署步骤

### 第一步：部署独立 Worker

```bash
cd worker

# 设置 API Key（仅生产环境需要）
wrangler secret put REMOVE_BG_API_KEY
# 输入你的 remove.bg API key

# 部署到 Cloudflare Workers
wrangler deploy
```

部署成功后，Worker URL 格式为：
`https://haima-imagine-remove-bg.<your-account>.workers.dev`

### 第二步：部署前端到 Cloudflare Pages

在 Cloudflare Dashboard：

1. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. 选择 repo：`lrv201haima/remover`
3. 配置构建：

   | 设置项 | 值 |
   |---------|-----|
   | Framework preset | Next.js |
   | Build command | `pnpm build` |
   | Build output directory | `out` |
   | Root directory | `(留空)` |
   | Node.js version | `22` |

4. 添加环境变量（Production + Preview）：

   | 变量名 | 值 |
   |---------|-----|
   | `NEXT_PUBLIC_REMOVE_BG_API_URL` | `https://haima-imagine-remove-bg.<account>.workers.dev`（第一步的 Worker URL）|

5. **Deploy**

每次推送到 GitHub，自动触发新部署。

## 环境变量

| 变量名 | 说明 |
|--------|------|
| `REMOVE_BG_API_KEY` | remove.bg API key（Worker 环境变量，通过 `wrangler secret` 设置）|
| `NEXT_PUBLIC_REMOVE_BG_API_URL` | 去背景 Worker 的公网 URL（前端读取）|

## NPM Scripts

```bash
pnpm dev        # 本地开发
pnpm build      # 构建 Next.js 静态输出到 out/
pnpm pages:build  # （保留，暂不使用）
```

## 文件结构

```
remover/
├── app/                      # Next.js 前端
│   └── page.tsx              # 落地页
├── components/
│   └── upload-tool.tsx       # 上传组件（调用 Worker API）
├── functions/
│   └── api/                  # ⚠️ 已废弃（Pages Functions 模式，不再使用）
│       └── remove-background.ts
├── worker/                   # ⭐ 独立 Cloudflare Worker（当前使用的 API）
│   ├── index.ts
│   └── wrangler.toml
└── out/                      # Next.js 静态导出目录（部署到 Pages）
```

## 注意事项

- Worker 和 Pages 是独立部署的，Pages 只负责托管静态文件
- API 请求全部走 Worker，不走 Pages Functions
- 如果 Worker 部署到 `.workers.dev` 域名，无需额外配置 CORS
- 如果绑定自定义域名，Worker 和 Pages 都可以使用同一域名
