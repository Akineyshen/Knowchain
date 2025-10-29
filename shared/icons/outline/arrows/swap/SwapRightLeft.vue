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
      viewBox="0 0 16 17"
      fill="none"
  >
    <path
        d="M3.33579 15.75L1.04289 13.4571C0.652369 13.0666 0.652369 12.4334 1.04289 12.0429L3.33579 9.75M1.33579 12.75L13.3358 12.75M12.3358 6.75L14.6287 4.45711C15.0192 4.06658 15.0192 3.43342 14.6287 3.04289L12.3358 0.75M14.3358 3.75L2.33579 3.75"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
