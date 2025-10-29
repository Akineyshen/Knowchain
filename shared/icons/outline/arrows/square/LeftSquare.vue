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
        d="M11.75 7.75L9.45711 10.0429C9.06658 10.4334 9.06658 11.0666 9.45711 11.4571L11.75 13.75M5.75 20.75H15.75C18.5114 20.75 20.75 18.5114 20.75 15.75V5.75C20.75 2.98858 18.5114 0.75 15.75 0.75H5.75C2.98858 0.75 0.75 2.98858 0.75 5.75V15.75C0.75 18.5114 2.98858 20.75 5.75 20.75Z"
        :stroke="props.color ?? 'white'"
        stroke-width="1.5"
        stroke-linecap="round"
    />
  </svg>
</template>