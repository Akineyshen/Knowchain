<script setup lang="ts">
  import { ref } from 'vue'
  import { Menu, X } from 'lucide-vue-next'

  const isMobileMenuOpen = ref(false)

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Levels', href: '#levels' },
    { name: 'Rewards', href: '#rewards' }
  ]
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <!-- Logo -->
        <div class="logo">
          <img class="logoIcon" src="/logo_dark.svg"  alt="Knowchain"/>
          <span class="logoText">KNOWCHAIN</span>
        </div>

        <!-- Desktop Navigation -->
        <ul class="navLinks">
          <li v-for="link in navLinks" :key="link.name">
            <a :href="link.href" class="navLink">{{ link.name }}</a>
          </li>
        </ul>

        <!-- CTA Button -->
        <div class="actions">
          <button class="btn btn-primary">Launch App</button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobileMenuBtn" @click="toggleMobileMenu">
          <Menu v-if="!isMobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="mobileMenu">
        <ul class="mobileNavLinks">
          <li v-for="link in navLinks" :key="link.name">
            <a :href="link.href" class="mobileNavLink" @click="toggleMobileMenu">
              {{ link.name }}
            </a>
          </li>
        </ul>
        <div class="mobileActions">
          <button class="btn btn-primary" style="width: 100%">Launch App</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped src="./Header.scss"></style>
