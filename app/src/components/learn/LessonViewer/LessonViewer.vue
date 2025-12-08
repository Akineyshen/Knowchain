<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const currentIndex = ref(0);

const lessonImages = {
  '1': ['/img/image1.jpg', '/img/image2.jpg', '/img/image3.jpg'],
  '2': ['/img/imageA.jpg', '/img/imageB.jpg'],
};

const images = ref([]);

onMounted(() => {
  images.value = lessonImages[props.id] || [];
});

const currentImage = computed(() => images.value[currentIndex.value]);

function nextImage() {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++;
  }
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function closeLesson() {
  router.push('/Learn');
}
</script>

<template>
  <div class="lesson-viewer">
    <div class="image-container">
      <img :src="currentImage" alt="Lesson content" />
    </div>
    <div class="navigation">
      <button @click="prevImage" :disabled="currentIndex === 0">Назад</button>
      <span>{{ currentIndex + 1 }} / {{ images.length }}</span>
      <button @click="nextImage" :disabled="currentIndex === images.length - 1">Вперед</button>
    </div>
    <button @click="closeLesson" class="close-btn">Завершить</button>
  </div>
</template>

<style land="scss" scoped src="./LessonViewer.scss"/>