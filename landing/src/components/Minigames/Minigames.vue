<script setup lang="ts">
import { Gamepad2, Puzzle, Brain, Zap } from 'lucide-vue-next'

const games = [
  {
    icon: Brain,
    title: 'Crypto Trivia',
    description: 'Test your knowledge with fast-paced trivia questions',
    reward: '10-50 KNW',
    color: '#FF6B9D'
  },
  {
    icon: Puzzle,
    title: 'Blockchain Puzzle',
    description: 'Solve complex blockchain puzzles to earn rewards',
    reward: '50-100 KNW',
    color: '#7B61FF'
  },
  {
    icon: Zap,
    title: 'Speed Challenge',
    description: 'Race against time in rapid-fire crypto challenges',
    reward: '20-80 KNW',
    color: '#FFB84D'
  },
  {
    icon: Gamepad2,
    title: 'Daily Quest',
    description: 'Complete daily missions and earn bonus rewards',
    reward: '30-150 KNW',
    color: '#4A7EFF'
  }
]
</script>

<template>
  <section id="minigames" class="minigames">
    <div class="container">
      <div class="header">
        <div class="badge">
          <span class="badgeIcon">🎮</span>
          <span>Play & Earn</span>
        </div>
        <h2 class="title">
          Learn Through <span class="text-gradient">Fun Minigames</span>
        </h2>
        <p class="subtitle">
          Enhance your crypto knowledge through engaging minigames and earn KNW tokens while having fun
        </p>
      </div>

      <div class="gamesGrid">
        <div
          v-for="(game, index) in games"
          :key="index"
          class="gameCard"
          :style="{ 
            animationDelay: `${index * 0.1}s`,
            '--game-color': game.color
          }"
        >
          <div class="gameIcon">
            <component :is="game.icon" :size="36" />
          </div>
          <h3 class="gameTitle">{{ game.title }}</h3>
          <p class="gameDescription">{{ game.description }}</p>
          <div class="rewardBadge">
            <span class="rewardLabel">Reward:</span>
            <span class="rewardAmount">{{ game.reward }}</span>
          </div>
          <button class="btn btn-secondary playBtn">Play Now</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Minigames.scss"></style>
