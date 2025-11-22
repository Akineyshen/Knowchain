<script setup lang="ts">
  import LoadingOverlay from "@components/layout/LoadingOverlay/LoadingOverlay.vue";
  import InstallGate from "@components/pwa/InstallGate/InstallGate.vue";
</script>

<template>
  <InstallGate >
    <LoadingOverlay />
    <router-view />
  </InstallGate>
</template>
