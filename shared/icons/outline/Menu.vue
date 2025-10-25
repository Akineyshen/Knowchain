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
      viewBox="0 0 18 14"
      fill="none"
  >
    <path d="M16.75 0.75L0.75 0.75" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M16.75 6.75L0.75 6.75" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M16.75 12.75L0.75 12.75" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</template>