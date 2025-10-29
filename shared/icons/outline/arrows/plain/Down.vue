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
        d="M0.750016 0.749999L6.96907 6.08061C7.41845 6.4658 8.08158 6.4658 8.53096 6.08061L14.75 0.75"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
