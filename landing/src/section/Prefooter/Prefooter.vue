<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import Button from '@components/Button/Button.vue'

  const { t } = useI18n()

  const openApp = () => {
    window.location.href = 'https://app.knowchain.eu/'
  }
</script>

<template>
  <section class="register">
    <div class="container">
      <div class="content">
        <h2 class="title">{{ t('prefooter.title') }}</h2>
        <div class="actions">
          <Button variant="primary" @click="openApp">{{ t('prefooter.button') }}</Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Prefooter.scss"></style>