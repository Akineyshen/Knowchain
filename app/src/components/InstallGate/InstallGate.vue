<script setup lang="ts">
  import { useInstallGate } from './InstallGate'
  import Button from '@components/Button/Button.vue'

  const {
    isStandalone,
    showGate,
    showIosHelp,
    showAndroidHelp,
    screenshots,
    iosInstructionImages,
    androidInstructionImages,
    handleInstallClick,
    continueInBrowser
  } = useInstallGate()
</script>

<template>
  <div v-if="showGate && !isStandalone" class="install-page">
    <div class="install-card">
      <div class="header">
        <img src="/logo/icon-192.png" class="icon"></img>
        <div class="app-info">
          <div class="name">Knowchain</div>
          <div class="domain">app.knowchain.eu</div>
        </div>
      </div>

      <div class="buttons">
        <Button variant="primary" class="btn-primary" @click="handleInstallClick">
          Download
        </Button>
        <Button variant="ghost" class="btn-ghost" @click="continueInBrowser">
          Continue in browser
        </Button>
      </div>

      <h2 class="section-title">About Knowchain</h2>
      <p class="description">
        Learn, play mini-games, and earn tokens for knowledge. Install the app
        on your home screen and use Knowchain as a native mobile app.
      </p>

      <div v-if="screenshots.length" class="screenshots">
        <div
            v-for="(img, idx) in screenshots"
            :key="idx"
            class="screenshot"
        >
          <img :src="img" alt="Screenshots app" />
        </div>
      </div>
    </div>

    <div v-if="showIosHelp" class="modal-backdrop">
      <div class="modal">
        <h2>How to install on iPhone/iPad</h2>

        <div v-if="iosInstructionImages.length" class="modal-images">
          <img
              v-for="(img, idx) in iosInstructionImages"
              :key="idx"
              :src="img"
              alt="iOS installation step"
          />
        </div>

        <ol>
          <li>Press the button <strong>«Share»</strong> at the bottom (square with an arrow).</li>
          <li>Scroll through the list and select <strong>«Add to Home Screen»</strong>.</li>
          <li>Click <strong>«Add»</strong> in the upper right corner.</li>
        </ol>
        <p class="hint">
          After adding, launch Knowchain from the icon on the Home screen.
        </p>
        <button class="modal-btn" @click="showIosHelp = false">Done</button>
      </div>
    </div>

    <div v-if="showAndroidHelp" class="modal-backdrop">
      <div class="modal">
        <h2>How to install on Android</h2>

        <div v-if="androidInstructionImages.length" class="modal-images">
          <img
              v-for="(img, idx) in androidInstructionImages"
              :key="idx"
              :src="img"
              alt="Android installation step"
          />
        </div>

        <ol>
          <li>In the browser window that appears, click <strong>«Download»</strong>.</li>
          <li>
            If the window does not appear, open the browser menu (⋮) and select
            <strong>«Add to home screen»</strong> or
            <strong>«Install the application»</strong>.
          </li>
          <li>Confirm the installation.</li>
        </ol>
        <p class="hint">
          After installation, open Knowchain from the icon on your home screen.
        </p>
        <button class="modal-btn" @click="showAndroidHelp = false">Done</button>
      </div>
    </div>
  </div>

  <div v-else>
    <slot />
  </div>
</template>

<style scoped lang="scss" src="./InstallGate.scss"></style>