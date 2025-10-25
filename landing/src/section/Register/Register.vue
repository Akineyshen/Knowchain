<script setup lang="ts">
  import Button from '@components/Button/Button.vue'
  import { Download, Globe } from 'lucide-vue-next'
</script>

<template>
  <section class="register">
    <div class="container">
      <div class="content">
        <h2 class="title">
          Register Within a Minutes and Start Invest Now
        </h2>
        <p class="description">
          Register in minutes and start investing today—quick, easy, and secure!
        </p>

        <div class="actions">
          <button class="btn btn-primary">
            <span>Download App</span>
            <Download :size="20" />
          </button>
          <Button class="btn btn-secondary">
            <span>Access From Web</span>
            <Globe :size="20" />
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Register.scss"></style>