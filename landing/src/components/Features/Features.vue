<script setup lang="ts">
import { Smartphone, ArrowRight, DollarSign, BarChart3, PieChart, Wallet } from 'lucide-vue-next'

const features = [
  {
    title: 'Potential Earnings From Crypto Invest',
    description: 'Maximize your returns with our advanced trading algorithms and real-time market analysis. Start earning passive income today.',
    tag: 'Investment',
    image: 'phone1',
    stats: ['15% Average ROI', 'Smart Portfolio'],
    color: 'primary'
  },
  {
    title: 'All Use-Friendly Features Are Easily Accessible',
    description: 'Intuitive interface designed for both beginners and professionals. Access all features with just a few taps.',
    tag: 'Easy to Use',
    image: 'phone2',
    features: ['One-tap Trading', 'Live Tracking', 'Instant Transfers', 'Portfolio Analytics'],
    color: 'secondary'
  }
]
</script>

<template>
  <section class="features">
    <div class="container">
      <!-- Feature 1 - Left aligned -->
      <div class="featureRow reverse">
        <div class="content">
          <div class="tag">💰 {{ features[0].tag }}</div>
          <h2 class="title">{{ features[0].title }}</h2>
          <p class="description">{{ features[0].description }}</p>
          
          <div class="stats">
            <div
              v-for="(stat, index) in features[0].stats"
              :key="index"
              class="statBadge"
            >
              {{ stat }}
            </div>
          </div>
          
          <button class="btn btn-primary">
            Learn More
            <ArrowRight :size="20" />
          </button>
        </div>

        <div class="phoneContainer">
          <div class="phoneGlow"></div>
          <div class="phoneCard">
            <div class="phoneHeader">
              <div class="phoneHeaderBar"></div>
            </div>
            <div class="phoneBody">
              <div class="balanceCard">
                <DollarSign class="balanceIcon" :size="32" />
                <div class="balanceText">$15,293.4</div>
                <div class="balanceChange">+$2,453</div>
              </div>
              <div class="chartMini">
                <PieChart :size="80" class="chartIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature 2 - Right aligned -->
      <div class="featureRow">
        <div class="content">
          <div class="tag">⚡ {{ features[1].tag }}</div>
          <h2 class="title">{{ features[1].title }}</h2>
          <p class="description">{{ features[1].description }}</p>
          
          <div class="featureList">
            <div
              v-for="(feature, index) in features[1].features"
              :key="index"
              class="featureItem"
            >
              <div class="featureCheck">✓</div>
              <span>{{ feature }}</span>
            </div>
          </div>
          
          <button class="btn btn-primary">
            Explore Features
            <ArrowRight :size="20" />
          </button>
        </div>

        <div class="phoneContainer">
          <div class="phoneGlow"></div>
          <div class="phoneCard">
            <div class="phoneHeader">
              <div class="phoneHeaderBar"></div>
            </div>
            <div class="phoneBody">
              <div class="quickActions">
                <div class="actionBtn">
                  <Wallet :size="24" />
                  <span>Wallet</span>
                </div>
                <div class="actionBtn">
                  <BarChart3 :size="24" />
                  <span>Trade</span>
                </div>
              </div>
              <div class="assetList">
                <div class="assetItem">
                  <div class="assetInfo">
                    <div class="assetIcon">₿</div>
                    <div>
                      <div class="assetName">Bitcoin</div>
                      <div class="assetAmount">0.032 BTC</div>
                    </div>
                  </div>
                  <div class="assetValue">$1,234</div>
                </div>
                <div class="assetItem">
                  <div class="assetInfo">
                    <div class="assetIcon">Ξ</div>
                    <div>
                      <div class="assetName">Ethereum</div>
                      <div class="assetAmount">2.45 ETH</div>
                    </div>
                  </div>
                  <div class="assetValue">$4,523</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Features.scss"></style>
