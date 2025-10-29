<script setup lang="ts">
  import { computed } from 'vue'

  type variant = 'primary' | 'secondary' | 'outline'

  const props = withDefaults(
      defineProps<{
        variant?: variant
        href?: string | null
        target?: '_self' | '_blank' | '_parent' | '_top'
        rel?: string | null
        type?: 'button' | 'submit' | 'reset'
      }>(),
      {
        variant: 'primary',
        href: null,
        target: '_blank',
        rel: null,
        type: 'button'
      }
  )

  const computedRel = computed(() => {
    if (props.rel) return props.rel
    return props.target === '_blank' ? 'noopener noreferrer' : undefined
  })
</script>

<template>
  <a v-if="props.href"
     :href="props.href!"
     :target="props.target"
     :rel="computedRel"
     class="button"
     :class="`button-${props.variant}`"
     v-bind="$attrs"
  >
    <slot />
  </a>

  <button v-else
          class="button"
          :class="`button-${props.variant}`"
          :type="props.type"
          v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped src="./Button.scss" />