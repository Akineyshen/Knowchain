<script setup lang="ts">
  import Header from './components/Header/Header.vue'
  import Hero from './components/Hero/Hero.vue'
  import About from './components/About/About.vue'
  import Learning from './components/Learning/Learning.vue'
  import Awards from './components/Awards/Awards.vue'
  import Minigames from './components/Minigames/Minigames.vue'
  import Leaderboard from './components/Leaderboard/Leaderboard.vue'
  import BuyToken from './components/BuyToken/BuyToken.vue'
  import Security from './components/Security/Security.vue'
  import Footer from './components/Footer/Footer.vue'
</script>

<template>
  <div class="app">
    <Header />
    <main>
      <Hero />
      <About />
      <Learning />
      <Awards />
      <Minigames />
      <Leaderboard />
      <BuyToken />
      <Security />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@import './styles/global.scss';

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
    background: $gradient-hero;
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
