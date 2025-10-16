<script setup lang="ts">
import { Trophy, TrendingUp } from 'lucide-vue-next'

const topUsers = [
  {
    rank: 1,
    name: 'CryptoMaster',
    points: 15420,
    avatar: '👑',
    badge: 'gold'
  },
  {
    rank: 2,
    name: 'BlockchainPro',
    points: 14850,
    avatar: '🚀',
    badge: 'silver'
  },
  {
    rank: 3,
    name: 'TokenKing',
    points: 13920,
    avatar: '💎',
    badge: 'bronze'
  },
  {
    rank: 4,
    name: 'CryptoNinja',
    points: 12450,
    avatar: '🥷',
    badge: 'none'
  },
  {
    rank: 5,
    name: 'DeFiQueen',
    points: 11800,
    avatar: '👸',
    badge: 'none'
  },
  {
    rank: 6,
    name: 'Web3Wizard',
    points: 10920,
    avatar: '🧙',
    badge: 'none'
  }
]
</script>

<template>
  <section id="leaderboard" class="leaderboard">
    <div class="container">
      <div class="header">
        <div class="badge">
          <span class="badgeIcon">🏅</span>
          <span>Top Performers</span>
        </div>
        <h2 class="title">
          Global <span class="text-gradient">Leaderboard</span>
        </h2>
        <p class="subtitle">
          Compete with learners worldwide and climb to the top of the rankings
        </p>
      </div>

      <div class="leaderboardContainer">
        <div class="leaderboardHeader">
          <div class="headerItem">Rank</div>
          <div class="headerItem">Player</div>
          <div class="headerItem">Points</div>
          <div class="headerItem">Trend</div>
        </div>

        <div class="leaderboardList">
          <div
            v-for="(user, index) in topUsers"
            :key="index"
            class="leaderboardItem"
            :class="{ 
              'top-1': user.rank === 1,
              'top-2': user.rank === 2,
              'top-3': user.rank === 3
            }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="rankCell">
              <div class="rankNumber" :class="`badge-${user.badge}`">
                {{ user.rank }}
              </div>
            </div>
            
            <div class="playerCell">
              <div class="playerAvatar">{{ user.avatar }}</div>
              <div class="playerName">{{ user.name }}</div>
            </div>
            
            <div class="pointsCell">
              <Trophy :size="16" class="pointsIcon" />
              <span class="pointsValue">{{ user.points.toLocaleString() }}</span>
            </div>
            
            <div class="trendCell">
              <TrendingUp :size="16" class="trendIcon" />
            </div>
          </div>
        </div>

        <div class="viewMore">
          <button class="btn btn-outline">View Full Leaderboard</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Leaderboard.scss"></style>
