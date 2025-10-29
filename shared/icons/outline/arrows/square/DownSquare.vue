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
    <path
        d="M7.75 9.75L10.0429 12.0429C10.4334 12.4334 11.0666 12.4334 11.4571 12.0429L13.75 9.75M0.75 15.75L0.75 5.75C0.75 2.98858 2.98858 0.75 5.75 0.75L15.75 0.75C18.5114 0.75 20.75 2.98858 20.75 5.75V15.75C20.75 18.5114 18.5114 20.75 15.75 20.75H5.75C2.98858 20.75 0.75 18.5114 0.75 15.75Z"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>