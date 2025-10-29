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
        d="M7.55 12.05L10.0672 9.33915C10.4628 8.91308 11.1372 8.91308 11.5328 9.33915L14.05 12.05M0.75 10.75C0.75 5.22715 5.22715 0.75 10.75 0.75C16.2728 0.75 20.75 5.22715 20.75 10.75C20.75 16.2728 16.2728 20.75 10.75 20.75C5.22715 20.75 0.75 16.2728 0.75 10.75Z"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>
