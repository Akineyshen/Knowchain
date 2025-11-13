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
      viewBox="0 0 22 20"
      fill="none"
      class="icon"
  >
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 0.78493L9.91337 0.75242C7.24 -0.250807 4.26 -0.250807 1.58663 0.75242C0.651734 1.10326 0 1.97207 0 2.97907V16.8297C0 18.3446 1.58232 19.2432 2.91836 18.7418C4.73537 18.06 6.76463 18.06 8.58164 18.7418L10 19.2741V0.78493ZM11.5 19.2741L12.9184 18.7418C14.7354 18.06 16.7646 18.06 18.5816 18.7418C19.9177 19.2432 21.5 18.3446 21.5 16.8297V2.97907C21.5 1.97207 20.8483 1.10326 19.9134 0.75242C17.24 -0.250807 14.26 -0.250807 11.5866 0.75242L11.5 0.78493V19.2741Z"
        :fill="props.color ?? 'white'"
    />
  </svg>
</template>