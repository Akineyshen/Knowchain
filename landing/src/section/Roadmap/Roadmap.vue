<script setup lang="ts">
import { CheckCircle, Target, Rocket, Users, TrendingUp, Award } from 'lucide-vue-next'

const roadmapItems = [
  {
    quarter: '2025 Q4',
    title: 'Platform Launch',
    items: [
      'Beta platform release',
      'Token generation event',
      'Initial community building'
    ],
    icon: Rocket,
    position: 'top'
  },
  {
    quarter: '2026 Q1',
    title: 'Ecosystem Expansion',
    items: [
      'Mobile app launch',
      'Advanced learning modules',
      'Partnership announcements'
    ],
    icon: Target,
    position: 'bottom'
  },
  {
    quarter: '2026 Q2',
    title: 'Community Growth',
    items: [
      'Referral program enhancement',
      'Governance token launch',
      'Community DAO creation'
    ],
    icon: Users,
    position: 'top'
  },
  {
    quarter: '2026 Q3',
    title: 'Feature Enhancement',
    items: [
      'Advanced trading features',
      'NFT marketplace integration',
      'Cross-chain support'
    ],
    icon: TrendingUp,
    position: 'bottom'
  },
  {
    quarter: '2026 Q4',
    title: 'Global Expansion',
    items: [
      'Multi-language support',
      'Major exchange listings',
      'Strategic partnerships'
    ],
    icon: Award,
    position: 'top'
  }
]
</script>

<template>
  <section id="roadmap" class="roadmap">
    <div class="container">
      <div class="header">
        <h2 class="title">
          Our Journey to <span class="text-gradient">Excellence</span>
        </h2>
        <p class="description">
          Strategic milestones that will shape the future of crypto education and investment
        </p>
      </div>

      <div class="timeline-horizontal">
        <div class="timeline-track">
          <div
              v-for="(item, index) in roadmapItems"
              :key="index"
              class="timeline-item"
              :class="item.position"
              :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="timeline-card">
              <div class="card-header">
                <div class="icon-wrapper">
                  <component :is="item.icon" :size="22" />
                </div>
                <h3 class="card-quarter">{{ item.quarter }}</h3>
              </div>
              <h4 class="card-title">{{ item.title }}</h4>
              <ul class="card-list">
                <li v-for="(task, taskIndex) in item.items" :key="taskIndex">
                  <CheckCircle :size="14" />
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>
            <div class="connector-line"></div>
            <div class="timeline-dot">
              <div class="dot-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Roadmap.scss"></style>