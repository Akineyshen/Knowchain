<script setup lang="ts">
  import { useInstallGate } from './InstallGate.ts'
  import Button from '@/components/ui/Button/Button.vue'

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
          Pobierz
        </Button>
        <Button variant="ghost" class="btn-ghost" @click="continueInBrowser">
          Kontynuuj w przeglądarce
        </Button>
      </div>

      <h2 class="section-title">O Knowchain</h2>
      <p class="description">
        Ucz się, graj w minigry i zdobywaj tokeny za wiedzę. Zainstaluj aplikację
        na ekranie głównym i korzystaj z Knowchain jak z natywnej aplikacji mobilnej.
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
        <h2>Jak zainstalować na iPhone/iPad</h2>

        <div v-if="iosInstructionImages.length" class="modal-images">
          <img
              v-for="(img, idx) in iosInstructionImages"
              :key="idx"
              :src="img"
              alt="iOS installation step"
          />
        </div>

        <ol>
          <li>Naciśnij przycisk <strong>«Udostępnij»</strong> na dole ekranu (kwadrat ze strzałką).</li>
          <li>Przewiń listę i wybierz <strong>«Dodaj do ekranu głównego»</strong>.</li>
          <li>Kliknij <strong>«Dodaj»</strong> w prawym górnym rogu.</li>
        </ol>
        <p class="hint">
          Po dodaniu uruchom Knowchain z ikony na ekranie głównym.
        </p>
        <button class="modal-btn" @click="showIosHelp = false">Gotowe</button>
      </div>
    </div>

    <div v-if="showAndroidHelp" class="modal-backdrop">
      <div class="modal">
        <h2>Jak zainstalować na Androidzie</h2>

        <div v-if="androidInstructionImages.length" class="modal-images">
          <img
              v-for="(img, idx) in androidInstructionImages"
              :key="idx"
              :src="img"
              alt="Android installation step"
          />
        </div>

        <ol>
          <li>W wyświetlonym oknie przeglądarki kliknij <strong>«Pobierz»</strong>.</li>
          <li>
            Jeśli okno się nie pojawi, otwórz menu przeglądarki (⋮) i wybierz
            <strong>«Dodaj do ekranu głównego»</strong> lub
            <strong>«Zainstaluj aplikację»</strong>.
          </li>
          <li>Potwierdź instalację.</li>
        </ol>
        <p class="hint">
          Po instalacji otwórz Knowchain z ikony na ekranie głównym.
        </p>
        <button class="modal-btn" @click="showAndroidHelp = false">Gotowe</button>
      </div>
    </div>
  </div>

  <div v-else>
    <slot />
  </div>
</template>

<style scoped lang="scss" src="./InstallGate.scss"></style>