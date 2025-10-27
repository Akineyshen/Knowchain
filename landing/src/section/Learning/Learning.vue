<script setup lang="ts">
  import Button from '@components/Button/Button.vue'
  import Icon from '@components/Icon/Icon.vue'
</script>

<template>
  <section id="learning" class="learning">
    <div class="container">
      <div class="heroCard">
        <div class="left">
          <h2 class="title">
            Begin your journey in
            <span class="text-gradient">digital finance</span>
          </h2>

          <p class="description">
            Level up, explore crypto, and unlock new earning opportunities.
            Everything begins with knowledge, because only by understanding
            the rules of the game can you win.
          </p>

          <div class="actions">
            <Button variant="primary">
              Try Knowchain
              <Icon name="UpRightCircle" />
            </Button>
          </div>
        </div>

        <div class="right">
          <img class="mockImage" src="../../assets/image/phone/learning.png" alt="Learning mockup placeholder" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Learning.scss"></style>
