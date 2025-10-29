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
      viewBox="0 0 8 16"
      fill="none"
  >
    <path
        d="M0.750015 14.75L6.08063 8.53095C6.46582 8.08156 6.46582 7.41844 6.08063 6.96905L0.750014 0.750001"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
