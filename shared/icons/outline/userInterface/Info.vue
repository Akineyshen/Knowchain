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
      viewBox="0 0 22 22"
      fill="none"
  >
    <rect
        x="0.75"
        y="0.75"
        width="20"
        height="20"
        rx="10"
        :stroke="props.color"
        stroke-width="1.5"
    />
    <path
        d="M11.25 15.75L11.25 9.75"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M9.25 9.75L11.25 9.75"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M11.25 6.75L11.25 5.75"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
  </svg>
</template>