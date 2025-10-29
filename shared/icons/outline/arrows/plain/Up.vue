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
      viewBox="0 0 16 8"
      fill="none"
  >
    <path
        d="M0.75 6.36963L6.96905 1.03901C7.41844 0.653824 8.08156 0.653825 8.53095 1.03901L14.75 6.36963"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
