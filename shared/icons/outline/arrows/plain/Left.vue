<script setup lang="ts">
  const props = defineProps({
    size: { type: Number, default: 24 },
    color: { type: String, default: "white" }
  })
</script>

<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 9 16"
      fill="none"
  >
    <path
        d="M8.12769 14.75L1.15979 8.6531C0.613397 8.17501 0.613398 7.32501 1.15979 6.84692L8.12769 0.750011"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
</style>
