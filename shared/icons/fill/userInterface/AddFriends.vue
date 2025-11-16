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
      viewBox="0 0 20 19"
      fill="none"
  >
    <circle
        cx="4"
        cy="4"
        r="4"
        transform="matrix(-1 0 0 1 11.75 0.75)"
        :fill="props.color"
        :stroke="props.color"
        stroke-width="1.5"
    />
    <path
        d="M0.75 14.6847C0.75 13.8243 1.29085 13.0568 2.10109 12.7675C5.75404 11.4628 9.74596 11.4628 13.3989 12.7675C14.2091 13.0568 14.75 13.8243 14.75 14.6847V16.0002C14.75 17.1876 13.6983 18.0998 12.5228 17.9318L11.5684 17.7955C9.03565 17.4337 6.46435 17.4337 3.93162 17.7955L2.97721 17.9318C1.8017 18.0998 0.75 17.1876 0.75 16.0002V14.6847Z"
        :fill="props.color"
        :stroke="props.color"
        stroke-width="1.5"
    />
    <path
        d="M14.75 8.75H18.75"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M16.75 6.75L16.75 10.75"
        :stroke="props.color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
  </svg>
</template>