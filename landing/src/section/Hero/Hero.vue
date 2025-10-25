<script setup lang="ts">
  import { ref } from 'vue'
  import Button from '@components/Button/Button.vue'
  import Icon from '@components/Icon/Icon.vue'
  import VideoModal from '@components/VideoModal/VideoModal.vue'

  const isVideoModalOpen = ref(false)

  const videoUrl = 'https://www.youtube.com/embed/IyqqPUjpS8U?si=EIaVdlfqM9BxZrEr'

  const openVideoModal = () => {
    isVideoModalOpen.value = true
  }

  const closeVideoModal = () => {
    isVideoModalOpen.value = false
  }
</script>

<template>
  <section id="hero" class="hero" >
    <div class="container">
      <div class="content">
        <div class="badge">
          <Icon name="AcademicCap" :size="18" color="#F5F5F5" />
          <span>Learn & Earn</span>
        </div>

        <div class="title">
          Start your
          <span class="text-gradient">Crypto</span>
          journey with engaging
          <span class="text-gradient">Learning</span>
        </div>

        <p class="description">
          We turn blockchain learning into a game: complete tasks, earn KNW, level up, and get rewards for invites.
        </p>

        <div class="actions">
          <Button variant="primary">Launch App
            <Icon name="UpRightCircle" />
          </Button>
          <Button variant="outline" @click="openVideoModal">
            Watch intro
            <Icon name="Play" />
          </Button>
        </div>
      </div>
    </div>

    <VideoModal
        :is-open="isVideoModalOpen"
        :video-url="videoUrl"
        title="Knowchain Intro"
        @close="closeVideoModal"
    />
  </section>
</template>

<style lang="scss" scoped src="./Hero.scss"></style>