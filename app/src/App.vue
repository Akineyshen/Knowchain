<script setup lang="ts">

</script>

<template>
  <div class="coming-soon">
    <div class="container">
      <div class="logo">
        <img src="/logo/logo_dark.svg" alt="Knowchain Logo" class="logo-image">
      </div>
      <div class="content">
        <h1 class="title">Coming Soon</h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@shared/style/main.scss' as shared;

.coming-soon {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.logo-image {
  width: 22rem;
  height: 22rem;

  @media (max-width: 768px) {
    width: 10rem;
    height: 10rem;
  }
}

.title {
  font-size: 8rem;
  font-weight: 800;
  margin: 0;
  background: shared.$color-neutral-50;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 6rem;
  }

  @media (max-width: 480px) {
    font-size: 4rem;
  }
}

.subtitle {
  font-size: 1.5rem;
  color: shared.$color-text-secondary;
  margin: 1rem 0 0 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}
</style>
