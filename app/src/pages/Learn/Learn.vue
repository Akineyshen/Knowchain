<script setup lang="ts">
  import { ref } from 'vue'
  import Navbar from "@components/Navbar/Navbar.vue"
  import CourseCard from "@components/CourseCard/CourseCard.vue"

  interface Course {
    id: number
    title: string
    points: number
    image: string
    isLocked: boolean
  }

  const courses = ref<Course[]>([
    {
      id: 1,
      title: 'Основы блокчейна',
      points: 100,
      image: 'https://via.placeholder.com/400x225/0066ff/ffffff?text=Blockchain+Basics',
      isLocked: false
    },
    {
      id: 2,
      title: 'Криптовалюты',
      points: 150,
      image: 'https://via.placeholder.com/400x225/00cc66/ffffff?text=Cryptocurrency',
      isLocked: false
    },
    {
      id: 3,
      title: 'Смарт-контракты',
      points: 200,
      // Используем заглушку для демонстрации
      image: 'https://via.placeholder.com/400x225/cc33ff/ffffff?text=Smart+Contracts',
      isLocked: true
    },
    {
      id: 4,
      title: 'NFT и цифровые активы',
      points: 175,
      // Используем заглушку для демонстрации
      image: 'https://via.placeholder.com/400x225/ff6600/ffffff?text=NFT',
      isLocked: true
    },
  ])

  const startCourse = (courseId: number) => {
    console.log('Starting course', courseId)
    // Здесь будет логика запуска курса
  }
</script>

<template>
  <div class="learn-page">
    <Navbar />
    <div class="learn-container">
      <h1 class="page-title">Обучающие курсы</h1>

      <div class="courses-grid">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :title="course.title"
          :points="course.points"
          :image="course.image"
          :is-locked="course.isLocked"
          @start="startCourse(course.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Learn.scss" />