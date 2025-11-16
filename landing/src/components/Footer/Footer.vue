<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import Icon from '@components/Icon/Icon.vue'

  const { t } = useI18n()

  const socialLinks = [
    { icon: 'GitHub', href: 'https://github.com/Akineyshen/Knowchain', label: 'GitHub' },
    { icon: 'Telegram', href: 'https://github.com/Akineyshen/Knowchain', label: 'Telegram' },
    { icon: 'X', href: 'https://x.com', label: 'X' },
  ]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footerMain">
        <div class="footerBrand">
          <div class="logo">
            <img class="logoIcon" src="/logo/logo_dark.svg" alt="Knowchain"/>
            <span class="logoText">KNOWCHAIN</span>
          </div>
          <p class="description">{{ t('footer.description') }}</p>
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
          <a href="https://www.figma.com/deck/40IBiVc3jTAvD3GmUb5nGq/Presentation-Diplom?node-id=1-2&t=nEFH6TbsiYR7tTtG-1" class="bottomLink">Presentation Diploma</a>
          <a href="https://www.figma.com/proto/1M7SelGJyNzk8dEUrASjd0/Application?page-id=134%3A78&node-id=1105-967&viewport=-153%2C-4128%2C0.52&t=H3WmDUhI6AjXinaw-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1105%3A967" class="bottomLink">Figma Design App</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped src="./Footer.scss"></style>
