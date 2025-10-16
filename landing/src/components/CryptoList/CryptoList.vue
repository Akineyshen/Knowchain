<script setup lang="ts">
const cryptos = [
  { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA' },
  { name: 'Tether', symbol: 'USDT', icon: '₮', color: '#26A17B' },
  { name: 'Cardano', symbol: 'ADA', icon: '₳', color: '#0033AD' },
  { name: 'Solana', symbol: 'SOL', icon: '◎', color: '#00FFA3' },
  { name: 'Polkadot', symbol: 'DOT', icon: '●', color: '#E6007A' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð', color: '#C2A633' },
  { name: 'Ripple', symbol: 'XRP', icon: 'X', color: '#23292F' },
]

const cryptos2 = [
  { name: 'Litecoin', symbol: 'LTC', icon: 'Ł', color: '#345D9D' },
  { name: 'Chainlink', symbol: 'LINK', icon: '⬡', color: '#375BD2' },
  { name: 'Polygon', symbol: 'MATIC', icon: '⬢', color: '#8247E5' },
  { name: 'Avalanche', symbol: 'AVAX', icon: '▲', color: '#E84142' },
  { name: 'Cosmos', symbol: 'ATOM', icon: '⚛', color: '#2E3148' },
  { name: 'Uniswap', symbol: 'UNI', icon: '🦄', color: '#FF007A' },
  { name: 'Stellar', symbol: 'XLM', icon: '✦', color: '#08B5E5' },
  { name: 'Monero', symbol: 'XMR', icon: 'ɱ', color: '#FF6600' },
]
</script>

<template>
  <section class="cryptoList">
    <div class="container">
      <div class="header">
        <h2 class="title">
          Popular <span class="text-gradient">Crypto Assets</span>
        </h2>
        <p class="subtitle">
          Trade over 150+ cryptocurrencies with the best rates in the market
        </p>
      </div>

      <!-- Scrolling row 1 -->
      <div class="scrollWrapper">
        <div class="scrollTrack">
          <div v-for="(crypto, index) in [...cryptos, ...cryptos]" :key="`1-${index}`" class="cryptoCard">
            <div class="cryptoIcon" :style="{ background: crypto.color }">
              {{ crypto.icon }}
            </div>
            <div class="cryptoInfo">
              <div class="cryptoName">{{ crypto.name }}</div>
              <div class="cryptoSymbol">{{ crypto.symbol }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scrolling row 2 (reverse) -->
      <div class="scrollWrapper">
        <div class="scrollTrack reverse">
          <div v-for="(crypto, index) in [...cryptos2, ...cryptos2]" :key="`2-${index}`" class="cryptoCard">
            <div class="cryptoIcon" :style="{ background: crypto.color }">
              {{ crypto.icon }}
            </div>
            <div class="cryptoInfo">
              <div class="cryptoName">{{ crypto.name }}</div>
              <div class="cryptoSymbol">{{ crypto.symbol }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./CryptoList.scss"></style>
