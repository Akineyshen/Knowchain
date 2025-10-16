<script setup lang="ts">
import { Users, Target, Zap, Award } from 'lucide-vue-next'

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50K+', label: 'Tasks Completed' },
  { value: '100+', label: 'Countries' },
  { value: '95%', label: 'Satisfaction Rate' }
]

const features = [
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join a thriving community of learners and crypto enthusiasts'
  },
  {
    icon: Target,
    title: 'Mission Focused',
    description: 'Our goal is to make crypto education accessible to everyone'
  },
  {
    icon: Zap,
    title: 'Instant Rewards',
    description: 'Earn KNW tokens instantly as you learn and grow'
  },
  {
    icon: Award,
    title: 'Achievement System',
    description: 'Unlock badges and achievements as you progress'
  }
]
</script>

<template>
  <section id="about" class="about">
    <div class="container">
      <div class="header">
        <h2 class="title">
          About <span class="text-gradient">KNOWCHAIN</span>
        </h2>
        <p class="subtitle">
          We're revolutionizing crypto education through gamification and blockchain technology
        </p>
      </div>

      <div class="stats">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="statCard"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="statValue">{{ stat.value }}</div>
          <div class="statLabel">{{ stat.label }}</div>
        </div>
      </div>

      <div class="features">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="featureCard"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="featureIcon">
            <component :is="feature.icon" :size="32" />
          </div>
          <h3 class="featureTitle">{{ feature.title }}</h3>
          <p class="featureDescription">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./About.scss"></style>
