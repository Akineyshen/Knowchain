<script setup lang="ts">
  import StonFiImg from '../../assets/image/stonfi.jpeg'
  import DeDustImg from '../../assets/image/dedust.png'
  import Button from '@components/Button/Button.vue'
  import Icon from '@components/Icon/Icon.vue'

const exchanges = [
  {
    name: 'STON.fi',
    // description: 'The leading DEX on TON blockchain with the best liquidity',
    image: StonFiImg,
    // color: '#00A8E1',
    link: 'https://app.ston.fi/swap?ft=TON&tt=EQCmMuu5rCFIqNRuVAyfBCVEtpXZpUGXqLtkPl5r8FLWSNiR&chartVisible=true&chartInterval=1w'
  },
  {
    name: 'DeDust',
    // description: 'Advanced DeFi platform with low fees and fast swaps',
    image: DeDustImg,
    // color: '#7B61FF',
    link: 'https://dedust.io/swap/TON/EQCmMuu5rCFIqNRuVAyfBCVEtpXZpUGXqLtkPl5r8FLWSNiR'
  }
]

const tokenStats = [
  {
    label: 'Current Price',
    value: '$0.000264',
  },
  {
    label: 'Market Cap',
    value: '$131.8K',
  },
  {
    label: 'Total Supply',
    value: '500M $KNW',
  }
]
</script>

<template>
  <section id="buy-token" class="buyToken">
    <div class="container">
      <div class="header">
        <h2 class="title">
          Buy <span class="text-gradient">KNW Token</span>
        </h2>
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
          <img class="exchangeLogo" v-if="exchange.image" :src="exchange.image" :alt="exchange.name" />
          <h3 class="exchangeName">{{ exchange.name }}</h3>
          <p class="exchangeDescription">{{ exchange.description }}</p>
          <Button variant="secondary" :href="exchange.link" target="_blank">
            Buy on {{ exchange.name }}
            <Icon name="UpRightCircle" :size="18" />
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./BuyToken.scss"></style>
