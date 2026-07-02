import type { AmirielMediaRequest as CoreAmirielMediaRequest } from "amiriel";

export type {
  AmirielBuiltinTheme,
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
} from "amiriel";

export type AmirielMediaRequest = CoreAmirielMediaRequest<File>;
