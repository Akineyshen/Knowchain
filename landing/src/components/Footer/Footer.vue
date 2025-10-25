<script setup lang="ts">
  import Icon from '@components/Icon/Icon.vue'

  const socialLinks = [
    { icon: 'GitHub', href: 'https://github.com/Akineyshen/Knowchain', label: 'GitHub' },
    { icon: 'Telegram', href: 'https://github.com/Akineyshen/Knowchain', label: 'Telegram' },
  ]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footerMain">
        <div class="footerBrand">
          <div class="logo">
            <img class="logoIcon" src="/logo_dark.svg" alt="Knowchain"/>
            <span class="logoText">KNOWCHAIN</span>
          </div>
          <p class="description">
            Our mission is to raise awareness of digital assets by offering an accessible and captivating way to learn.
          </p>
          <div class="socialLinks">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              target="_blank"
              class="socialLink"
              rel="noopener noreferrer"
              :aria-label="social.label"
            >
              <Icon :name="social.icon" :filled="true" :size="24" />
            </a>
          </div>
        </div>
      </div>

      <div class="footerBottom">
        <p class="copyright">
          © 2025 Knowchain. All rights reserved.
        </p>
        <div class="bottomLinks">
          <a href="#privacy" class="bottomLink">Privacy Policy</a>
          <a href="#terms" class="bottomLink">Terms of Service</a>
          <a href="#cookies" class="bottomLink">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped src="./Footer.scss"></style>
