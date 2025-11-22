<script setup lang="ts">
  const props = defineProps({
    size: { type: Number, default: 24 },
    color: { type: String, default: "currentColor" }
  })
</script>

<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 21 21"
      fill="none"
  >
    <path
        d="M0 10.0625C0 7.76245 1.12988 5.60918 3.02254 4.30229L8.22716 0.70845C9.59516 -0.236165 11.4048 -0.236167 12.7728 0.708449L17.9775 4.30228C19.8701 5.60918 21 7.76245 21 10.0625V15.3894C21 18.1508 18.7614 20.3894 16 20.3894H14.5317C13.5376 20.3894 12.7317 19.5835 12.7317 18.5894V15.639C12.7317 15.0868 12.284 14.639 11.7317 14.639H9.33732C8.78503 14.639 8.33732 15.0868 8.33732 15.639V18.5894C8.33732 19.5835 7.53143 20.3894 6.53732 20.3894H5C2.23858 20.3894 0 18.1508 0 15.3894V10.0625Z"
        :fill="props.color"
    />
  </svg>
</template>