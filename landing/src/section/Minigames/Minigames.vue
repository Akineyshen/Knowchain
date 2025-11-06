<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<template>
  <section id="minigames" class="learning">
    <div class="container">
      <div class="heroCard">
        <div class="left">
          <img class="mockImage" src="../../assets/image/phone/minigames.png" alt="App mockup" />
        </div>

        <div class="right">
          <div class="contentWrap">
            <h2 class="title">{{ t('play.title') }}</h2>
            <ul class="features">
              <li class="featureItem">
                <img class="iconWrap" src="../../assets/image/minigames/roulette.png" alt="Roulette"/>
                <span class="label">{{ t('play.roulette') }}</span>
              </li>
              <li class="featureItem">
                <img class="iconWrap" src="../../assets/image/minigames/pairs.png" alt="Pairs"/>
                <span class="label">{{ t('play.pairs') }}</span>
              </li>
              <li class="featureItem">
                <img class="iconWrap" src="../../assets/image/minigames/clicker.png" alt="Pairs"/>
                <span class="label">{{ t('play.clicker') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Minigames.scss"></style>
