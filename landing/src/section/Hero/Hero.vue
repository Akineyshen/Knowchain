<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import Button from '@components/Button/Button.vue'
  import Icon from '@components/Icon/Icon.vue'

  const { t } = useI18n()

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-us')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openApp = () => {
    window.location.href = 'https://app.knowchain.eu/'
  }
</script>

<template>
  <section id="hero" class="hero" >
    <div class="container">
      <div class="content">
        <div class="badge">
          {{ t('hero.subtitle') }}
        </div>
        <div class="title">{{ t('hero.title_start') }} <br> {{ t('hero.title_end') }}</div>
        <div class="actions">
          <Button variant="primary" @click="openApp">{{ t('hero.buttonGetStarted') }}
            <Icon name="UpRightCircle" />
          </Button>
          <Button variant="secondary" class="button-secondary" @click="scrollToAbout">
            {{ t('hero.buttonLearnMore') }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Hero.scss"></style>