<script setup lang="ts">
import { Shield, Zap, TrendingUp, Lock } from 'lucide-vue-next'

const features = [
  {
    icon: Shield,
    title: 'Super Secure',
    description: 'Bank-level encryption and multi-factor authentication to keep your assets safe.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Execute trades in milliseconds with our optimized infrastructure.'
  },
  {
    icon: TrendingUp,
    title: 'Best Rates',
    description: 'Get the most competitive rates with our advanced pricing algorithm.'
  },
  {
    icon: Lock,
    title: 'Full Privacy',
    description: 'Your data is encrypted and never shared with third parties.'
  }
]
</script>

<template>
  <section class="whyChoose">
    <div class="container">
      <div class="header">
        <h2 class="title">
          Why Like <span class="text-gradient">CryptoSwap</span>
        </h2>
        <p class="subtitle">
          Experience the most secure and user-friendly crypto platform
        </p>
      </div>

      <div class="grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="iconWrapper">
            <component :is="feature.icon" class="icon" :size="28" />
          </div>
          <h3 class="cardTitle">{{ feature.title }}</h3>
          <p class="cardDescription">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./WhyChoose.scss"></style>
