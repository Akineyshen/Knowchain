<script setup lang="ts">
import { watch, onMounted, onUnmounted, computed } from 'vue'
import Icon from '@components/Icon/Icon.vue'

const props = withDefaults(
    defineProps<{
      isOpen: boolean
      videoUrl: string
      title?: string
    }>(),
    {
      title: 'Video'
    }
)

const emit = defineEmits<{
  close: []
}>()

const processedVideoUrl = computed(() => {
  let url = props.videoUrl

  // Обработка YouTube ссылок для скрытия интерфейса
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const urlObj = new URL(url)

    // Добавляем параметры для скрытия интерфейса YouTube
    urlObj.searchParams.set('modestbranding', '1')
    urlObj.searchParams.set('rel', '0')
    urlObj.searchParams.set('showinfo', '0')
    urlObj.searchParams.set('iv_load_policy', '3')

    url = urlObj.toString()
  }

  return url
})

const handleClose = () => {
  emit('close')
}

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    handleClose()
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    handleClose()
  }
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="video-modal" @click="handleOverlayClick">
        <div class="video-modal__content">
          <button class="video-modal__close" @click="handleClose" aria-label="Close modal">
            <Icon name="Clicker" :size="24" color="#F5F5F5" />
          </button>

          <div class="video-modal__wrapper">
            <iframe
                :src="processedVideoUrl"
                :title="title"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped src="./VideoModal.scss" />