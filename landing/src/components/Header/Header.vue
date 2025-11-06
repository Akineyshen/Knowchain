<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import Button from '@components/Button/Button.vue'
  import Icon from '@components/Icon/Icon.vue'
  import LanguageSelector from "@components/LanguageSelector/LanguageSelector.vue";

  const { t } = useI18n()
  const isMobileMenuOpen = ref(false)

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const openApp = () => {
    window.location.href = 'https://app.knowchain.eu/'
  }

  const navLinks = [
    { key: 'header.aboutUs', href: '#about-us' },
    { key: 'header.benefits', href: '#benefits' },
    { key: 'header.learn', href: '#learning' },
    { key: 'header.play', href: '#minigames' },
  ]
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="#hero" class="logo" style="text-decoration: none;">
          <img class="logo-icon" src="/logo/logo_dark.svg" alt="Knowchain Logotype"/>
          <span class="logo-text">KNOWCHAIN</span>
        </a>

        <ul class="navLinks">
          <li v-for="link in navLinks" :key="link.key">
            <a :href="link.href" class="navLink">{{ t(link.key) }}</a>
          </li>
        </ul>

        <div class="actions">
          <LanguageSelector class="language-selector"/>
          <Button variant="primary" @click="openApp">{{ t('header.launchApp') }}</Button>
        </div>

        <button class="mobileMenuBtn" @click="toggleMobileMenu">
          <Icon name="Menu" :filled="false" v-if="!isMobileMenuOpen" :size="24" />
          <Icon name="Close" :filled="false" v-else :size="24" />
        </button>
      </nav>

      <div v-if="isMobileMenuOpen" class="mobileMenu">
        <ul class="mobileNavLinks">
          <li v-for="link in navLinks" :key="link.key">
            <a :href="link.href" class="mobileNavLink" @click="toggleMobileMenu">
              {{ t(link.key) }}
            </a>
          </li>
        </ul>
        <LanguageSelector />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped src="./Header.scss"/>
