# @amiriel/vue

完整约定见本仓库 `AGENTS.md`。

Vue 3 编辑器与渲染器。类型和 `normalizeDocument` 从 `@amiriel/core` 来，不要在本仓库复制。上传、账号、存储和投递属于宿主应用。

公共出口是 `src/index.ts`。样式是 `src/style.css`，消费方单独引入。选项按钮内图标与标题同一行，不要用 `flex-col`。

没有明确要求时不改 version、不发布、不推 tag。验证：`pnpm typecheck` 和 `pnpm build`。
