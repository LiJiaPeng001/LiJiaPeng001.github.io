# peeeng

个人站仓库。放作品、记想法，偶尔做一点小小的实验。

线上地址：[https://lijia-peng001.github.io/](https://lijia-peng001.github.io/)

## 技术栈

- Vue 3 + Vite + Vue Router
- Naive UI
- Less
- Three.js（`/360` 全景页）
- ESLint / Oxlint / Prettier
- `@peeeng/css`、`@peeeng/utils`

## 本地开发

需要 Node.js `>= 24.6.0`。

```sh
npm install
npm run dev
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建，产物输出到 `own/` |
| `npm run preview` | 预览构建结果 |
| `npm run lint` | 代码检查 |
| `npm run format` | 格式化 `src/` |

## 目录说明

```text
src/
  views/           # 页面
    HomeView.vue   # 首页
    panorama/      # 360° 全景
  router/          # 路由
own/               # 构建产物（已 gitignore）
.github/workflows/ # CI / 部署
```

## 分支与部署

| 分支 | 用途 |
| --- | --- |
| `master` | 源码开发 |
| `release` | GitHub Pages 发布内容 |

推送到 `master` 后，GitHub Actions 会自动：

1. 安装依赖并执行 `npm run build`
2. 将 `own/` 发布到 `release` 分支

也可在 Actions 里手动触发 **Deploy** 工作流。

## 页面

- `/`：个人站首页
- `/360`：全景查看（支持默认预览 / 本地上传）
