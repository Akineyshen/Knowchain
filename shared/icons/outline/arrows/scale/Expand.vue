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
      viewBox="0 0 17 17"
      fill="none"
  >
    <path
        d="M5.36539 16.1349L1.75 16.1349C1.19772 16.1349 0.75 15.6871 0.75 15.1349L0.75 11.5195M1.51918 15.3657L6.9038 9.98112M16.1344 5.36539L16.1344 1.75C16.1344 1.19772 15.6867 0.75 15.1344 0.75L11.519 0.75M15.3652 1.51927L9.98054 6.90388"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
