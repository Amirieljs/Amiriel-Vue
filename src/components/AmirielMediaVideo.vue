<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { AmirielMedia } from "../types";
import { formatVideoDuration } from "../utils";

const props = withDefaults(defineProps<{
  media: AmirielMedia;
  controls?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
  showDurationBadge?: boolean;
}>(), {
  controls: false,
  muted: false,
  preload: "metadata",
  showDurationBadge: false,
});

const emit = defineEmits<{
  loadedmetadata: [event: Event];
  duration: [seconds: number];
}>();

const resolvedDuration = ref<number | undefined>(props.media.duration);
const formattedDuration = computed(() => formatVideoDuration(resolvedDuration.value ?? 0));

watch(
  () => props.media.duration,
  (duration) => {
    if (Number.isFinite(duration) && duration! > 0) resolvedDuration.value = duration;
  },
);

function onLoadedMetadata(event: Event) {
  const video = event.currentTarget as HTMLVideoElement;
  if (Number.isFinite(video.duration) && video.duration > 0) {
    resolvedDuration.value = video.duration;
    emit("duration", video.duration);
  }
  emit("loadedmetadata", event);
}
</script>

<template>
  <div class="amiriel-media-video">
    <video
      :src="media.url"
      class="amiriel-media-video__element"
      :controls="controls"
      :muted="muted"
      playsinline
      :preload="preload"
      @loadedmetadata="onLoadedMetadata"
    />
    <span v-if="showDurationBadge && formattedDuration" class="amiriel-media-video__duration" aria-hidden="true">
      {{ formattedDuration }}
    </span>
  </div>
</template>

<style>
.amiriel-media-video {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.amiriel-media-video__element {
  display: block;
  width: 100%;
  height: 100%;
  background: #050505;
  object-fit: contain;
}

.amiriel-media-video__duration {
  position: absolute;
  right: 0.35rem;
  bottom: 0.35rem;
  z-index: 2;
  padding: 0.1rem 0.35rem;
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-size: 0.65rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  line-height: 1.3;
  pointer-events: none;
}
</style>
