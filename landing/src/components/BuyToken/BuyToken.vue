<script setup lang="ts">
import { ExternalLink, Coins, TrendingUp } from 'lucide-vue-next'

const exchanges = [
  {
    name: 'STON.fi',
    description: 'The leading DEX on TON blockchain with the best liquidity',
    logo: '💎',
    color: '#00A8E1',
    link: 'https://ston.fi'
  },
  {
    name: 'DeDust',
    description: 'Advanced DeFi platform with low fees and fast swaps',
    logo: '✨',
    color: '#7B61FF',
    link: 'https://dedust.io'
  }
]

const tokenStats = [
  { label: 'Current Price', value: '$0.0245', change: '+12.5%' },
  { label: 'Market Cap', value: '$5.2M', change: '+8.3%' },
  { label: 'Total Supply', value: '1B KNW', change: '' }
]
</script>

<template>
  <section id="buy-token" class="buyToken">
    <div class="container">
      <div class="header">
        <div class="badge">
          <span class="badgeIcon">💰</span>
          <span>Get KNW</span>
        </div>
        <h2 class="title">
          Buy <span class="text-gradient">KNW Token</span>
        </h2>
        <p class="subtitle">
          Purchase KNW tokens on leading decentralized exchanges and start earning rewards
        </p>
      </div>

      <div class="tokenStats">
        <div
          v-for="(stat, index) in tokenStats"
          :key="index"
          class="statCard"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="statLabel">{{ stat.label }}</div>
          <div class="statValue">{{ stat.value }}</div>
          <div v-if="stat.change" class="statChange positive">
            <TrendingUp :size="14" />
            {{ stat.change }}
          </div>
        </div>
      </div>

      <div class="exchangesGrid">
        <div
          v-for="(exchange, index) in exchanges"
          :key="index"
          class="exchangeCard"
          :style="{ 
            animationDelay: `${index * 0.15 + 0.3}s`,
            '--exchange-color': exchange.color
          }"
        >
          <div class="exchangeLogo">{{ exchange.logo }}</div>
          <h3 class="exchangeName">{{ exchange.name }}</h3>
          <p class="exchangeDescription">{{ exchange.description }}</p>
          <a :href="exchange.link" target="_blank" rel="noopener" class="btn btn-primary exchangeBtn">
            Buy on {{ exchange.name }}
            <ExternalLink :size="18" />
          </a>
        </div>
      </div>

      <div class="infoBox">
        <Coins :size="24" class="infoIcon" />
        <div class="infoContent">
          <h4 class="infoTitle">New to crypto trading?</h4>
          <p class="infoText">
            Check out our comprehensive guide on how to safely buy and store your KNW tokens
          </p>
        </div>
        <button class="btn btn-outline">Learn More</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./BuyToken.scss"></style>
