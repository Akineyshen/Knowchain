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
      viewBox="0 0 24 24"
      fill="none"
  >
    <path d="M2.99985 20.9999L20.9997 3" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.99985 3.00015L20.9997 21" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>