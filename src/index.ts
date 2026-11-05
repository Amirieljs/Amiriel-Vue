import "./style.css";

export { default as AmirielBodyEditor } from "./components/AmirielBodyEditor.vue";
export { default as AmirielBodyRenderer } from "./components/AmirielBodyRenderer.vue";
export { default as AmirielMediaLightbox } from "./components/AmirielMediaLightbox.vue";
export { default as AmirielMediaVideo } from "./components/AmirielMediaVideo.vue";
export { default as AmirielMediaVideoThumbnail } from "./components/AmirielMediaVideoThumbnail.vue";

export type {
  AmirielCallout,
  AmirielCalloutStroke,
  AmirielCalloutTarget,
  AmirielCalloutTargetPage,
  AmirielCalloutTargetPlacement,
  AmirielDocument,
  AmirielEditorLimits,
  AmirielFont,
  AmirielLabels,
  AmirielMedia,
  AmirielMediaPlacement,
  AmirielMediaRequest,
  AmirielMediaUploadProgress,
  AmirielNormalizeOptions,
  AmirielPage,
  AmirielPaperSize,
  AmirielPaperSizeLimits,
  AmirielTextBlock,
  AmirielTextColor,
  AmirielTheme,
  AmirielBuiltinTheme,
} from "./types";

export type { AmirielPaperThemeVars, AmirielThemeDefinition } from "./themes";

export {
  AMIRIEL_DEFAULT_LABELS,
  formatAmirielLabel,
  resolveAmirielLabels,
} from "./labels";

export {
  AMIRIEL_BUILTIN_THEME_DEFINITIONS,
  AMIRIEL_BUILTIN_THEME_IDS,
  amirielThemeCssVars,
  findAmirielThemeDefinition,
  mergeAmirielThemeDefinitions,
  themeDefaultTextColorFor,
} from "./themes";

export {
  AMIRIEL_DEFAULT_EDITOR_LIMITS,
  AMIRIEL_DEFAULT_PAPER_SIZE,
  AMIRIEL_DEFAULT_PAPER_SIZE_LIMITS,
  AMIRIEL_FONT_OPTIONS,
  AMIRIEL_FONT_STACKS,
  AMIRIEL_TEXT_COLORS,
  AMIRIEL_TEXT_COLOR_OPTIONS,
  AMIRIEL_THEME_DEFAULT_TEXT_COLOR,
  AMIRIEL_THEME_OPTIONS,
  calloutStrokes,
  calloutTargetFromPagePoint,
  combinedPageText,
  formatVideoDuration,
  normalizeCallouts,
  normalizeDocument,
  normalizeEditorLimits,
  normalizePaperSize,
  normalizePaperSizeLimits,
  normalizeTextHref,
  themeDefaultTextBlockColor,
} from "./utils";
