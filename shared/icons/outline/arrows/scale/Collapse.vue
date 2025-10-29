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
      viewBox="0 0 20 20"
      fill="none"
  >
    <path
        d="M3.84607 11.5377L7.46146 11.5377C8.01374 11.5377 8.46146 11.9854 8.46146 12.5377L8.46146 16.1531"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
    <path
        d="M7.69227 12.3068L2.30765 17.6914"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
    <path
        d="M11.5381 3.84612L11.5381 7.4615C11.5381 8.01379 11.9858 8.4615 12.5381 8.4615L16.1535 8.4615"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
    <path
        d="M12.3074 7.69224L17.692 2.30762"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
