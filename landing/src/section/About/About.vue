<script setup lang="ts">
  import Icon from '@components/Icon/Icon.vue'

  const features = [
    {
      icon: 'Book',
      title: 'Learning',
      description: 'Dive into the world of cryptocurrencies through interactive lessons and tasks'
    },
    {
      icon: 'Star',
      title: 'Rewards',
      description: 'Earn KNW tokens, exchange them, or withdraw them to external wallets'
    },
    {
      icon: 'Users',
      title: 'Community',
      description: 'Invite friends and compete in leaderboards.'
    },
  ]
</script>

<template>
  <section id="about-us" class="about">
    <div class="container">
      <div class="header">
        <h2 class="title">About us</h2>
        <p class="subtitle">
          Educational app, designed as a game, makes learning about cryptocurrencies engaging and accessible.
          We simplify complex blockchain concepts by blending education with gamification.
        </p>
      </div>

      <div class="features">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="featureCard"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="featureIcon">
            <Icon :name="feature.icon" :filled="false" :size="32" />
          </div>
          <h3 class="featureTitle">{{ feature.title }}</h3>
          <p class="featureDescription">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./About.scss"></style>
