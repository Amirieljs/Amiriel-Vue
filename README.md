<p align="center">
  <img src="https://amiriel.com/logo/amiriel_256x256.webp" alt="Amiriel logo" width="96" height="96" />
</p>

<h1 align="center">Amiriel Vue</h1>

<p align="center">
  Portable Vue 3 body editor and renderer for Amiriel letter-style documents.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/amiriel"><img src="https://img.shields.io/npm/v/amiriel/beta?style=flat-square" alt="npm version (beta)" /></a>
  <a href="https://www.npmjs.com/package/amiriel"><img src="https://img.shields.io/npm/dm/amiriel?style=flat-square" alt="npm downloads" /></a>
  <a href="https://www.npmjs.com/package/amiriel"><img src="https://img.shields.io/npm/l/amiriel?style=flat-square" alt="license" /></a>
  <img src="https://img.shields.io/badge/vue-3.5+-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3.5+" />
  <img src="https://img.shields.io/badge/typescript-ready-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

## Features

- Page-by-page letter editor with themes, fonts, paper sizing, and text blocks
- Drag-and-drop media placement on each page
- Matching read-only renderer for preview and delivery flows
- Image/video lightbox and inline video helpers
- Host-controlled media upload via `media-request` events
- Shared model and document helpers from `@amiriel/core`
- No storage, authentication, database, or hosted workflow bundled

The full hosted product lives at [amiriel.com](https://amiriel.com).

## Install

Pre-release builds are published under the `beta` dist-tag:

```bash
npm install amiriel@beta
pnpm add amiriel@beta
yarn add amiriel@beta
bun add amiriel@beta
```

After the first stable release, install without the tag:

```bash
npm install amiriel
```

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  AmirielBodyEditor,
  AmirielBodyRenderer,
  type AmirielDocument,
  type AmirielMediaRequest,
} from "amiriel";
import "amiriel/style.css";

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
} from "amiriel";

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
lives in `@amiriel/core`, and the React implementation lives in
`@amiriel/react`.

The Vue package keeps local compatibility exports for historical users, while
delegating shared types, labels, theme definitions, and utility functions to
`@amiriel/core`.

## Release Sync

This repository listens for `core-release` events dispatched from
`Amirieljs/Amiriel`. On sync, GitHub Actions upgrades `@amiriel/core`, runs
checks, bumps the Vue package beta version, publishes to npm, and creates a
GitHub release.

Configure these secrets:

- `NPM_TOKEN`: npm automation token used for publishing
- `AMIRIELJS_SYNC_TOKEN`: GitHub token with permission to push sync commits and tags

## License

MIT. The Vue editor package is open source and can be used commercially. The
official hosted Amiriel product may still provide paid services around storage,
accounts, delivery, hosting, collaboration, or other product workflows.
