# @amiriel/vue

Vue 3 信件编辑器与渲染器。依赖 `@amiriel/core`，peer 是 `vue >= 3.5`。官网通过 npm 安装本包，不会直接编译这个目录。

## 边界

本包负责页面编辑、只读渲染、媒体灯箱和视频展示，以及 `src/style.css`（消费方另需 `import "@amiriel/vue/style.css"`）。

不负责账号、上传实现、R2、分享码、定时释信、数据库和路由。上传由宿主监听媒体请求完成：`AmirielMediaRequest` 在本包里特化为 `File`，定义在 `src/types.ts`，其余类型从 `@amiriel/core` 重导出。

`src/utils.ts`、`src/themes.ts`、`src/labels.ts` 应继续从 core 重导出。归一化、主题 id、纸张数学和内置文案只改 Amiriel-Core。不要在本仓库复制一份。

## 组件

| 文件 | 导出 |
| --- | --- |
| `src/components/AmirielBodyEditor.vue` | 分页编辑器 |
| `src/components/AmirielBodyRenderer.vue` | 只读渲染 |
| `src/components/AmirielMediaLightbox.vue` | 灯箱 |
| `src/components/AmirielMediaVideo.vue` | 视频 |
| `src/components/AmirielMediaVideoThumbnail.vue` | 视频封面 |

公共出口只经过 `src/index.ts`。图标用 `@heroicons/vue`，不要用 emoji 当按钮图标。

选项并排时，图标和标题在每个选项内部同一行。外层用 grid 或横向 flex；不要为桌面横排给选项按钮加 `flex-col`。

改交互时看窄容器、长文本、空页、上传中、失败可重试、达到页数或媒体限额。

## 规则与验证

- 说明用简体中文。不启动 Vite 开发服，除非用户明确要求。
- 没有明确要求时不改 `version`、不 `npm publish`、不推 tag。跟随 core 的发布走 `.github/workflows/sync-core.yml`；只改本包时走 `release.yml`。
- 网站是否已使用新版本，看 `Amiriel.com/home/package.json` 的 `@amiriel/vue`，不要假设本地 build 已被站点加载。

```bash
pnpm install && pnpm typecheck && pnpm build
```
