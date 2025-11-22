<script lang="ts" setup>
  import Icon from "@components/ui/Icon/Icon.vue";
  import Button from "@components/ui/Button/Button.vue";
  import Topbar from "@components/layout/Topbar/Topbar.vue";
</script>

<template>
  <div class="settings-page">
    <Topbar>
      <template #left>
        <Button variant="circle" as="router-link" to="/">
          <Icon name="Left" :filled="false" :size="24" />
        </Button>
      </template>

      <template #center>
        <div>Settings</div>
      </template>
    </Topbar>

    <main class="settings-content">

    </main>
  </div>
</template>

<style scoped lang="scss" src="./Settings.scss"/>