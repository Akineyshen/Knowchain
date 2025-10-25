<script setup lang="ts">
  import Icon from "../../components/Icon/Icon.vue"
</script>

<template>
  <section id="minigames" class="learning">
    <div class="container">
      <div class="heroCard">
        <div class="left">
          <img class="mockImage" src="../../assets/image/minigames.png" alt="App mockup" />
        </div>

        <div class="right">
          <div class="contentWrap">
            <h2 class="title">
              Play between lessons and earn <span class="text-gradient">extra KNW</span>
            </h2>

            <ul class="features">
              <li class="featureItem">
                <span class="iconWrap" aria-hidden="true">
                  <Icon name="Roulette" />
                </span>
                <span class="label">Roulette</span>
              </li>
              <li class="featureItem">
                <span class="iconWrap" aria-hidden="true">
                  <Icon name="Pairs" />
                </span>
                <span class="label">Pairs</span>
              </li>
              <li class="featureItem">
                <span class="iconWrap" aria-hidden="true">
                  <Icon name="Clicker" />
                </span>
                <span class="label">Clicker</span>
              </li>
              <li class="featureItem">
                <span class="iconWrap" aria-hidden="true">
                  <Icon name="Minigames" />
                </span>
                <span class="label">and others</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped src="./Minigames.scss"></style>
