<p align="center">
  <img src="https://amiriel.com/logo/amiriel_256x256.webp" alt="Amiriel logo" width="96" height="96" />
</p>

<h1 align="center">Amiriel Vue</h1>

<p align="center">
  Vue 3 components for Amiriel letter documents.
</p>

`@amiriel/vue` provides a Vue implementation of the Amiriel document renderer
and editor. It is built on `@amiriel/core`, so the document model, themes, labels, and
normalization rules stay aligned with the React package.

[![npm version (beta)](https://img.shields.io/npm/v/@amiriel/vue/beta?style=flat-square)](https://www.npmjs.com/package/@amiriel/vue)
[![license](https://img.shields.io/npm/l/@amiriel/vue?style=flat-square)](https://www.npmjs.com/package/@amiriel/vue)
[![Vue](https://img.shields.io/badge/vue-3.5+-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-ready-3178C6?style=flat-square&logo=typescript&logoColor=white)]()

The full hosted product lives at [amiriel.com](https://amiriel.com).

## Features

- Page-by-page letter editor with themes, fonts, paper sizing, and text blocks
- Drag-and-drop media placement on each page
- Matching read-only renderer for preview and delivery flows
- Image/video lightbox and inline video helpers
- Host-controlled media upload via `media-request` events
- Shared model and document helpers from `@amiriel/core`
- TypeScript declarations

The package does not include storage, authentication, routing, database, or
delivery workflows. Host applications own those concerns.

## Install

```bash
npm install @amiriel/vue@beta vue
pnpm add @amiriel/vue@beta vue
yarn add @amiriel/vue@beta vue
bun add @amiriel/vue@beta vue
```

Import the stylesheet once:

```vue
<script setup lang="ts">
import "@amiriel/vue/style.css";
</script>
```

The package depends on `@amiriel/core` for the shared document model and declares
`vue` as a peer dependency.

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  AmirielBodyEditor,
  AmirielBodyRenderer,
  type AmirielDocument,
  type AmirielMediaRequest,
} from "@amiriel/vue";
import "@amiriel/vue/style.css";

const document = ref<AmirielDocument>({
  theme: "midnight",
  media: [],
  pages: [],
});

async function onMediaRequest(request: AmirielMediaRequest) {
  request.handled = true;
  try {
    const media = await uploadMediaSomewhere(request.file);
    request.resolve(media);
  } catch (error) {
    request.reject(error instanceof Error ? error.message : "Upload failed");
  }
}
</script>

<template>
  <AmirielBodyEditor
    v-model="document"
    locale="en"
    :show-github-link="true"
    @media-request="onMediaRequest"
  />

  <AmirielBodyRenderer :document="document" locale="en" />
</template>
```

Host applications own media upload and pass the resulting media object back
through `request.resolve(media)`.

## Main Exports

| Export | Description |
| --- | --- |
| `AmirielBodyEditor` | Controlled Vue editor shell |
| `AmirielBodyRenderer` | Read-only Vue renderer |
| `AmirielMediaLightbox` | Image/video lightbox |
| `AmirielMediaVideo` | Inline video component |
| `AmirielMediaVideoThumbnail` | Video thumbnail helper |
| Core types and helpers | Re-exported from `@amiriel/core` |

## Editor Props

| Prop | Default | Description |
| --- | --- | --- |
| `locale` | `"en"` | Built-in label locale: `en` or `zh` |
| `labels` | none | Partial override for UI labels |
| `themes` | none | Override built-in themes or register custom paper themes |
| `showGithubLink` | `true` | Show GitHub link on the text-block toolbar |
| `githubUrl` | `https://github.com/Amirieljs/Amiriel-Vue` | Target URL for the GitHub button |
| `defaultPaperSize` | `{ width: 720, height: 520 }` | Fallback paper size |
| `paperSizeLimits` | `{ minWidth: 320, maxWidth: 1600, minHeight: 240, maxHeight: 2200 }` | Paper resizing bounds |
| `paperResizable` | `true` | Allow users to edit paper width and height |

`AmirielBodyRenderer` accepts the same theme, label, and paper-size props so
read-only rendering can match the editor.

## Themes

Built-in themes: `midnight`, `paper`, `memorial`.

```vue
<script setup lang="ts">
import {
  AmirielBodyEditor,
  type AmirielThemeDefinition,
} from "@amiriel/vue";

const customThemes: AmirielThemeDefinition[] = [
  {
    id: "ocean",
    label: "Ocean dusk",
    swatch: "linear-gradient(135deg, #1e3a5f, #0a1628)",
    defaultTextColor: "white",
    vars: {
      paperBorder: "rgba(96, 165, 250, 0.28)",
      paperBg: "linear-gradient(180deg, #1a2f4a 0%, #0d1824 100%)",
      paperText: "#dbeafe",
      paperDivider: "rgba(96, 165, 250, 0.2)",
      paperAccent: "rgba(147, 197, 253, 0.88)",
    },
  },
];
</script>

<template>
  <AmirielBodyEditor v-model="document" :themes="customThemes" />
</template>
```

## Package Architecture

This repository is the Vue implementation. The shared framework-agnostic core
lives in [`@amiriel/core`](https://github.com/Amirieljs/Amiriel-Core), the meta package
[`amiriel`](https://github.com/Amirieljs/Amiriel) re-exports it, and the React
implementation lives in [`@amiriel/react`](https://github.com/Amirieljs/Amiriel-React).

## Release Sync

This repository listens for `core-release` events dispatched from
`Amirieljs/Amiriel-Core`. On sync, GitHub Actions upgrades `@amiriel/core`, runs checks,
bumps the Vue package beta version, publishes to npm, and creates a GitHub
release.

Configure these secrets:

- `NPM_TOKEN`: npm automation token used for publishing
- `AMIRIELJS_SYNC_TOKEN`: GitHub token with permission to push sync commits and tags

## License

MIT. The Vue editor package is open source and can be used commercially. The
official hosted Amiriel product at [amiriel.com](https://amiriel.com) may still
provide paid services around storage, accounts, delivery, hosting, collaboration,
or other product workflows.
