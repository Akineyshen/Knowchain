<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="content">
        <div class="badge">
          <span class="badgeIcon">🎓</span>
          <span>Crypto access, simplified</span>
        </div>
        
        <h1 class="title">
          Easily Access And<br />
          Manage Your <span class="text-gradient">Crypto Assets</span>
        </h1>
        
        <p class="description">
          Managing your crypto assets has never been simpler. Enjoy quick and effortless
          access to your digital currency portfolio today.
        </p>
        
        <div class="actions">
          <button class="btn btn-primary">
            Download App
            <ArrowRight :size="20" />
          </button>
          <button class="btn btn-outline">
            Access From Web
            <ArrowRight :size="20" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Hero.scss"></style>
