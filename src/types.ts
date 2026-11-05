import type { AmirielMediaRequest as CoreAmirielMediaRequest } from "@amiriel/core";

export type {
  AmirielBuiltinTheme,
  AmirielCallout,
  AmirielCalloutStroke,
  AmirielCalloutTarget,
  AmirielCalloutTargetPage,
  AmirielCalloutTargetPlacement,
  AmirielDocument,
  AmirielEditorLimits,
  AmirielFont,
  AmirielIdFactory,
  AmirielLabels,
  AmirielLocale,
  AmirielMedia,
  AmirielMediaPlacement,
  AmirielMediaUploadProgress,
  AmirielNormalizeOptions,
  AmirielPage,
  AmirielPaperSize,
  AmirielPaperSizeLimits,
  AmirielTextBlock,
  AmirielTextColor,
  AmirielTheme,
} from "@amiriel/core";

export type AmirielMediaRequest = CoreAmirielMediaRequest<File>;
