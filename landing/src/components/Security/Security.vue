<script setup lang="ts">
import { Shield, Lock, Eye, Fingerprint } from 'lucide-vue-next'

const securityFeatures = [
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: '256-bit SSL encryption'
  },
  {
    icon: Lock,
    title: 'Cold Storage',
    description: '95% assets in cold wallets'
  },
  {
    icon: Eye,
    title: 'Regular Audits',
    description: 'Third-party security checks'
  },
  {
    icon: Fingerprint,
    title: '2FA Protection',
    description: 'Multi-factor authentication'
  }
]
</script>

<template>
  <section class="security">
    <div class="container">
      <div class="content">
        <div class="textContent">
          <h2 class="title">
            We are <span class="text-gradient">Ensure</span> your Security of Investment
          </h2>
          <p class="description">
            Your security is our top priority. We implement industry-leading security measures 
            to protect your assets and personal information at all times.
          </p>

          <div class="features">
            <div
              v-for="(feature, index) in securityFeatures"
              :key="index"
              class="feature"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <component :is="feature.icon" class="featureIcon" :size="24" />
              <div class="featureText">
                <div class="featureTitle">{{ feature.title }}</div>
                <div class="featureDescription">{{ feature.description }}</div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary">Learn About Security</button>
        </div>

        <div class="visualization">
<!--          <div :class="$style.shieldContainer">-->
<!--            <div :class="$style.shieldGlow"></div>-->
<!--            <div :class="$style.shield">-->
<!--              <Shield :size="120" :class="$style.shieldIcon" />-->
<!--            </div>-->
<!--            <div :class="$style.orbitRing :class="$style.orbit1">-->
<!--              <div :class="$style.orbitDot"></div>-->
<!--            </div>-->
<!--            <div :class="$style.orbitRing :class="$style.orbit2">-->
<!--              <div :class="$style.orbitDot"></div>-->
<!--            </div>-->
<!--            <div :class="$style.orbitRing :class="$style.orbit3">-->
<!--              <div :class="$style.orbitDot"></div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Security.scss"></style>
