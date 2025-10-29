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
        d="M6.36951 0.75L1.03889 6.96905C0.653702 7.41844 0.653703 8.08156 1.03889 8.53095L6.36951 14.75"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
