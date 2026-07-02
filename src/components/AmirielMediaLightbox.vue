<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import type { AmirielMedia } from "../types";

const props = defineProps<{
  open: boolean;
  media: AmirielMedia | null;
  closeLabel?: string;
  imageLabel?: string;
  videoLabel?: string;
}>();

const emit = defineEmits<{ close: [] }>();
const videoRef = ref<HTMLVideoElement | null>(null);

watch(
  () => [props.open, props.media?.id] as const,
  async ([open]) => {
    if (!open || props.media?.type !== "video") return;
    await nextTick();
    videoRef.value?.play().catch(() => {});
  },
);

function closeLightbox() {
  videoRef.value?.pause();
  emit("close");
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && props.open) closeLightbox();
}

onMounted(() => document.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  videoRef.value?.pause();
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open && media"
      class="amiriel-lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="media.type === 'image' ? (imageLabel || 'Image') : (videoLabel || 'Video')"
      @click.self="closeLightbox"
    >
      <button type="button" class="amiriel-lightbox__close" :aria-label="closeLabel || 'Close'" @click="closeLightbox">
        <XMarkIcon class="amiriel-lightbox__close-icon" />
      </button>
      <img
        v-if="media.type === 'image'"
        :src="media.url"
        :alt="media.objectKey || 'media'"
        class="amiriel-lightbox__content"
      />
      <video
        v-else
        ref="videoRef"
        :src="media.url"
        class="amiriel-lightbox__content"
        controls
        playsinline
        preload="metadata"
      />
    </div>
  </Teleport>
</template>

<style>
.amiriel-lightbox {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(3, 3, 4, 0.92);
  backdrop-filter: blur(6px);
}

.amiriel-lightbox__content {
  max-width: min(96vw, 1200px);
  max-height: 92vh;
  width: auto;
  height: auto;
  border-radius: 0.75rem;
  background: #050505;
  object-fit: contain;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
}

.amiriel-lightbox__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  cursor: pointer;
}

.amiriel-lightbox__close:hover {
  background: rgba(255, 255, 255, 0.12);
}

.amiriel-lightbox__close-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
