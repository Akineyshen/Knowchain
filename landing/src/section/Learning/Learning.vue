<script setup lang="ts">
  import Button from '@components/Button/Button.vue'
  import Icon from '@components/Icon/Icon.vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const openApp = () => {
    window.location.href = 'https://app.knowchain.eu/'
  }
</script>

<template>
  <section id="learning" class="learning">
    <div class="container">
      <div class="heroCard">
        <div class="left">
          <h2 class="title">{{ t('learn.title') }}</h2>
          <p class="description">{{ t('learn.description') }}</p>

          <div class="actions">
            <Button variant="primary" @click="openApp">
              {{ t('learn.button') }}
              <Icon name="UpRightCircle" />
            </Button>
          </div>
        </div>

        <div class="right">
          <img class="mockImage" src="../../assets/image/phone/learning.png" alt="Learning mockup placeholder" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Learning.scss"></style>
