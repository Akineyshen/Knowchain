<script setup lang="ts">
  import { ref } from 'vue'
  import Button from '@components/Button/Button.vue'
  import Icon from '@components/Icon/Icon.vue'

  const isMobileMenuOpen = ref(false)

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const navLinks = [
    { name: 'About us', href: '#about-us' },
    { name: 'Learn', href: '#learn' },
    { name: 'Play', href: '#play' },
    { name: 'Buy KNW', href: '#buyKNW' },
    { name: 'Roadmap', href: '#roadmap' }
  ]
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="#hero" class="logo" style="text-decoration: none;">
          <img class="logo-icon" src="/logo_dark.svg" alt="Knowchain Logotype"/>
          <span class="logo-text">KNOWCHAIN</span>
        </a>

        <ul class="navLinks">
          <li v-for="link in navLinks" :key="link.name">
            <a :href="link.href" class="navLink">{{ link.name }}</a>
          </li>
        </ul>

        <div class="actions">
          <Button variant="primary">Launch App</Button>
        </div>

        <button class="mobileMenuBtn" @click="toggleMobileMenu">
          <Icon name="Menu" :filled="false" v-if="!isMobileMenuOpen" :size="24" />
          <Icon name="Close" :filled="false" v-else :size="24" />
        </button>
      </nav>

      <div v-if="isMobileMenuOpen" class="mobileMenu">
        <ul class="mobileNavLinks">
          <li v-for="link in navLinks" :key="link.name">
            <a :href="link.href" class="mobileNavLink" @click="toggleMobileMenu">
              {{ link.name }}
            </a>
          </li>
        </ul>
        <div class="mobileActions">
          <Button variant="primary" style="width: 100%">Launch App</Button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped src="./Header.scss"/>
