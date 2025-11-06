<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isModalOpen = ref(false)
const videoUrl = 'https://www.youtube.com/embed/IyqqPUjpS8U?si=h-_EHm26vFLmdUuT&rel=0&modestbranding=1&color=white&iv_load_policy=3'

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <section id="about-us" class="about">
    <div class="container">
      <div class="content-wrapper">
        <div class="text-content">
          <div class="badge">{{ t('aboutUs.badge') }}</div>
          <h2 class="title">{{ t('aboutUs.title') }}</h2>
          <p class="subtitle">{{ t('aboutUs.description') }}</p>
        </div>

        <div class="video-preview" @click="openModal">
          <div class="video-thumbnail">
            <div class="play-button">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#079BFF" opacity="0.9"/>
                <path d="M32 25L55 40L32 55V25Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно для видео -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <button class="close-button" @click="closeModal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="video-container">
              <iframe
                  :src="videoUrl"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped src="./About.scss"></style>