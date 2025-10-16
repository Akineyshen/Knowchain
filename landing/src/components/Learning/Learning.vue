<script setup lang="ts">
import { BookOpen, Video, FileText, Headphones } from 'lucide-vue-next'

const learningMethods = [
  {
    icon: BookOpen,
    title: 'Interactive Lessons',
    description: 'Learn through bite-sized, engaging lessons designed for all levels',
    color: '#4A7EFF'
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch expert-led video tutorials covering various crypto topics',
    color: '#7B61FF'
  },
  {
    icon: FileText,
    title: 'Quizzes & Tests',
    description: 'Test your knowledge and earn rewards for correct answers',
    color: '#FF6B9D'
  },
  {
    icon: Headphones,
    title: 'Audio Content',
    description: 'Learn on the go with our podcast-style crypto education',
    color: '#FFB84D'
  }
]
</script>

<template>
  <section id="learning" class="learning">
    <div class="container">
      <div class="content">
        <div class="textContent">
          <div class="badge">
            <span class="badgeIcon">📚</span>
            <span>Learn & Earn</span>
          </div>
          <h2 class="title">
            Multiple Ways to <span class="text-gradient">Learn Crypto</span>
          </h2>
          <p class="description">
            Choose your preferred learning style and start earning KNW tokens as you expand your crypto knowledge. Our diverse content library ensures there's something for everyone.
          </p>
        </div>

        <div class="methodsGrid">
          <div
            v-for="(method, index) in learningMethods"
            :key="index"
            class="methodCard"
            :style="{ 
              animationDelay: `${index * 0.1}s`,
              '--card-color': method.color
            }"
          >
            <div class="methodIcon">
              <component :is="method.icon" :size="28" />
            </div>
            <h3 class="methodTitle">{{ method.title }}</h3>
            <p class="methodDescription">{{ method.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Learning.scss"></style>
