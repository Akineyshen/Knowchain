<script setup lang="ts">
  import Icon from "../../components/Icon/Icon.vue"
</script>

<template>
  <section id="minigames" class="learning">
    <div class="container">
      <div class="heroCard">
        <div class="left">
          <img class="mockImage" src="../../assets/image/phone/minigames.png" alt="App mockup" />
        </div>

        <div class="right">
          <div class="contentWrap">
            <h2 class="title">
              Play between lessons and earn <span class="text-gradient">extra KNW</span>
            </h2>

            <ul class="features">
              <li class="featureItem">
                <img class="iconWrap" src="../../assets/image/minigames/roulette.png" alt="Roulette"/>
                <span class="label">Roulette</span>
              </li>
              <li class="featureItem">
                <img class="iconWrap" src="../../assets/image/minigames/pairs.png" alt="Pairs"/>
                <span class="label">Pairs</span>
              </li>
              <li class="featureItem">
                <img class="iconWrap" src="../../assets/image/minigames/clicker.png" alt="Pairs"/>
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
