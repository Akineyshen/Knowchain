<script setup lang="ts">
  import { watch, onMounted, onUnmounted, ref } from 'vue'
  import Icon from '@components/Icon/Icon.vue'

  const props = withDefaults(
      defineProps<{
        isOpen: boolean
        title?: string
      }>(),
      {
        title: 'Video'
      }
  )

  const emit = defineEmits<{
    close: []
  }>()

  const videoRef = ref<HTMLVideoElement | null>(null)
  const VIDEO_SRC = 'public/video/intro.mp4'

  const handleClose = () => {
    if (videoRef.value) {
      videoRef.value.pause()
      videoRef.value.currentTime = 0
    }
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
      if (videoRef.value) {
        videoRef.value.pause()
      }
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
            <Icon name="Close" :filled="false" color="#F5F5F5" />
          </button>

          <div class="video-modal__wrapper">
            <video
                ref="videoRef"
                :title="title"
                :src="VIDEO_SRC"
                controls
                playsinline
                preload="metadata"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped src="./VideoModal.scss" />