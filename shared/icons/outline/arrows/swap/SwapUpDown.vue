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
      viewBox="0 0 17 16"
      fill="none"
  >
    <path
        d="M0.75 3.33579L3.04289 1.04289C3.43342 0.652369 4.06658 0.652369 4.45711 1.04289L6.75 3.33579M3.75 1.33579L3.75 13.3358M9.75 12.3358L12.0429 14.6287C12.4334 15.0192 13.0666 15.0192 13.4571 14.6287L15.75 12.3358M12.75 14.3358V2.33579"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
