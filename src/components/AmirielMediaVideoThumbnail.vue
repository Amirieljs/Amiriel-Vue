<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { PlayIcon } from "@heroicons/vue/24/solid";
import type { AmirielMedia } from "../types";
import { formatVideoDuration } from "../utils";

const props = defineProps<{
  media: AmirielMedia;
}>();

const resolvedDuration = ref(props.media.duration);
const frameReady = ref(Boolean(props.media.thumbnailUrl));

const formattedDuration = computed(() => formatVideoDuration(resolvedDuration.value ?? 0));

const previewSrc = computed(() => {
  if (props.media.thumbnailUrl) return "";
  const hashIndex = props.media.url.indexOf("#");
  const base = hashIndex >= 0 ? props.media.url.slice(0, hashIndex) : props.media.url;
  return `${base}#t=0.05`;
});

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
  }
}

function primeFrame(event: Event) {
  const video = event.currentTarget as HTMLVideoElement;
  if (video.currentTime > 0.01) {
    frameReady.value = true;
    return;
  }
  const target = video.duration && Number.isFinite(video.duration)
    ? Math.min(0.1, video.duration * 0.05)
    : 0.05;
  try {
    video.currentTime = target;
  } catch {
    frameReady.value = true;
  }
}

function onSeeked() {
  frameReady.value = true;
}
</script>

<template>
  <div class="amiriel-media-video-thumb" :class="{ 'is-ready': frameReady }">
    <img
      v-if="media.thumbnailUrl"
      :src="media.thumbnailUrl"
      :alt="media.objectKey || 'video'"
      class="amiriel-media-video-thumb__frame"
    />
    <video
      v-else
      :src="previewSrc"
      class="amiriel-media-video-thumb__frame"
      muted
      playsinline
      preload="metadata"
      @loadedmetadata="onLoadedMetadata"
      @loadeddata="primeFrame"
      @seeked="onSeeked"
    />
    <span class="amiriel-media-video-thumb__shade" aria-hidden="true" />
    <span class="amiriel-media-video-thumb__play" aria-hidden="true">
      <PlayIcon />
    </span>
    <span v-if="formattedDuration" class="amiriel-media-video-thumb__duration" aria-hidden="true">
      {{ formattedDuration }}
    </span>
  </div>
</template>

<style>
.amiriel-media-video-thumb {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #0a0a0a;
}

.amiriel-media-video-thumb__frame {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.amiriel-media-video-thumb.is-ready .amiriel-media-video-thumb__frame {
  opacity: 1;
}

.amiriel-media-video-thumb__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.42));
  pointer-events: none;
}

.amiriel-media-video-thumb__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.92);
  pointer-events: none;
}

.amiriel-media-video-thumb__play svg {
  width: 1.35rem;
  height: 1.35rem;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45));
}

.amiriel-media-video-thumb__duration {
  position: absolute;
  right: 0.3rem;
  bottom: 0.3rem;
  z-index: 2;
  padding: 0.08rem 0.3rem;
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-size: 0.6rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  line-height: 1.3;
  pointer-events: none;
}
</style>
