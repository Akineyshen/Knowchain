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
      viewBox="0 0 22 17"
      fill="none"
  >
    <circle cx="3.40426" cy="3.40426" r="3.40426" transform="matrix(-1 0 0 1 14.617 1)" stroke="white" stroke-width="1.5"/>
    <path d="M5.25533 12.8594C5.25533 12.1272 5.71563 11.474 6.40519 11.2277C9.51408 10.1174 12.9115 10.1174 16.0204 11.2277C16.7099 11.474 17.1702 12.1272 17.1702 12.8594V13.979C17.1702 14.9896 16.2751 15.7659 15.2747 15.6229L14.9412 15.5753C12.4681 15.222 9.95742 15.222 7.48437 15.5753L7.15082 15.6229C6.15039 15.7659 5.25533 14.9896 5.25533 13.979V12.8594Z" :stroke="props.color ?? 'white'" stroke-width="1.5"/>
    <path d="M16.3192 7.90228C17.7964 7.90228 18.9939 6.70474 18.9939 5.22751C18.9939 3.75027 17.7964 2.55273 16.3192 2.55273" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M19.2486 14.0046L19.5107 14.042C20.2967 14.1543 21 13.5444 21 12.7503V11.8707C21 11.2953 20.6383 10.7821 20.0965 10.5886C19.5561 10.3956 19.0045 10.2453 18.4468 10.1377" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M5.68086 7.90228C4.20362 7.90228 3.00609 6.70474 3.00609 5.22751C3.00609 3.75027 4.20362 2.55273 5.68086 2.55273" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M2.7514 14.0046L2.48932 14.042C1.70327 14.1543 1 13.5444 1 12.7503V11.8707C1 11.2953 1.36167 10.7821 1.90347 10.5886C2.44392 10.3956 2.99546 10.2453 3.55319 10.1377" :stroke="props.color ?? 'white'" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</template>

<style scoped lang="scss">

</style>