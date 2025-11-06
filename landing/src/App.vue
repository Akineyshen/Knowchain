<script setup lang="ts">
  import Header from '@components/Header/Header.vue'
  import Hero from './section/Hero/Hero.vue'
  import About from './section/About/About.vue'
  import Benefits from './section/Benefits/Benefits.vue'
  import Learning from './section/Learning/Learning.vue'
  import Minigames from './section/Minigames/Minigames.vue'
  import Prefooter from './section/Prefooter/Prefooter.vue'
  import Footer from '@components/Footer/Footer.vue'
</script>

<template>
  <div class="app">
    <Header />
    <main>
      <Hero />
      <About />
      <Benefits />
      <Learning />
      <Minigames />
      <Prefooter />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@use '@shared/style/main.scss' as shared;
@use "style";

.app {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100vh;
    background: shared.$gradient-hero;
    pointer-events: none;
    z-index: 0;
  }

  main {
    position: relative;
    z-index: 1;
    padding-top: 0;
  }
}
</style>
