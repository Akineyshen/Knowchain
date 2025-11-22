<script setup lang="ts">
import Navbar from '@components/layout/Navbar/Navbar.vue'
import Button from '@components/ui/Button/Button.vue'

interface GameItem {
  id: 'pairs' | 'clicker' | 'roulette'
  title: string
  route: string
}

const games: GameItem[] = [
  {
    id: 'pairs',
    title: 'Pairs',
    route: '/games/pairs'
  },
  {
    id: 'clicker',
    title: 'Clicker',
    route: '/games/clicker'
  },
  {
    id: 'roulette',
    title: 'Roulette',
    route: '/games/roulette'
  }
]
</script>

<template>
  <div class="minigames-page">
    <main class="minigames-content">
      <h1 class="minigames-title">Minigames</h1>

      <div class="minigames-list">
        <div
            v-for="game in games"
            :key="game.id"
            class="minigames-item"
        >
          <div class="minigames-item__left">
            <div
                class="minigames-item__icon"
                :class="`minigames-item__icon--${game.id}`"
            >
              <!-- тут можно потом вставить свои svg-иконки -->
            </div>
            <div class="minigames-item__name">
              {{ game.title }}
            </div>
          </div>

          <Button
              variant="primary"
              as="router-link"
              :to="game.route"
              class="minigames-item__play"
          >
            Play
          </Button>
        </div>
      </div>
    </main>

    <!-- нижнее меню -->
    <Navbar />
  </div>
</template>

<style lang="scss" scoped src="./Games.scss" />
