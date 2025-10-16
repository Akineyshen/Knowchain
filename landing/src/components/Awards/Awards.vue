<script setup lang="ts">
import { Trophy, Star, Medal, Crown } from 'lucide-vue-next'

const awards = [
  {
    icon: Crown,
    title: 'Diamond Master',
    description: 'Complete all lessons with perfect scores',
    rarity: 'Legendary',
    color: '#FFD700'
  },
  {
    icon: Trophy,
    title: 'Quiz Champion',
    description: 'Win 100 quizzes in a row',
    rarity: 'Epic',
    color: '#9D4EDD'
  },
  {
    icon: Star,
    title: 'Knowledge Seeker',
    description: 'Complete 50 different lessons',
    rarity: 'Rare',
    color: '#4A7EFF'
  },
  {
    icon: Medal,
    title: 'First Steps',
    description: 'Complete your first lesson',
    rarity: 'Common',
    color: '#10B981'
  }
]
</script>

<template>
  <section id="awards" class="awards">
    <div class="container">
      <div class="header">
        <div class="badge">
          <span class="badgeIcon">🏆</span>
          <span>Achievements</span>
        </div>
        <h2 class="title">
          Unlock <span class="text-gradient">Exclusive Rewards</span>
        </h2>
        <p class="subtitle">
          Earn unique NFT badges and achievements as you progress through your learning journey
        </p>
      </div>

      <div class="awardsGrid">
        <div
          v-for="(award, index) in awards"
          :key="index"
          class="awardCard"
          :style="{ 
            animationDelay: `${index * 0.15}s`,
            '--award-color': award.color
          }"
        >
          <div class="awardGlow"></div>
          <div class="awardIcon">
            <component :is="award.icon" :size="40" />
          </div>
          <div class="rarityBadge">{{ award.rarity }}</div>
          <h3 class="awardTitle">{{ award.title }}</h3>
          <p class="awardDescription">{{ award.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Awards.scss"></style>
