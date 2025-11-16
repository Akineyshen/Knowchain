<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import learningImg from '../../assets/image/benefits/learning.png'
  import rewardsImg from '../../assets/image/benefits/rewards.png'
  import communityImg from '../../assets/image/benefits/community.png'

  const { t } = useI18n()

  const advantages = [
    {
      title: 'benefits.cardLearningTitle',
      description: 'benefits.cardLearningDescription',
      image: learningImg
    },
    {
      title: 'benefits.cardRewardsTitle',
      description: 'benefits.cardRewardsDescription',
      image: rewardsImg
    },
    {
      title: 'benefits.cardCommunityTitle',
      description: 'benefits.cardCommunityDescription',
      image: communityImg
    }
  ]
</script>

<template>
  <section id="benefits" class="advantages">
    <div class="container">
      <div class="header">
        <div class="badge">{{ t('benefits.badge') }}</div>
        <h2 class="title">{{ t('benefits.title') }}</h2>
      </div>

      <div class="cards">
        <div
            v-for="(advantage, index) in advantages"
            :key="index"
            class="card"
        >
          <h3 class="card-title">{{ t(advantage.title) }}</h3>
          <p class="card-description">{{ t(advantage.description) }}</p>
          <div class="card-image">
            <img
                :src="advantage.image"
                :alt="t(advantage.title)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Benefits.scss"></style>