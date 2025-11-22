<script setup lang="ts">
  import { computed, withDefaults } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'

  const props = withDefaults(defineProps<{
    variant?: 'pill' | 'circle' | 'ghost' | 'soft' | 'secondary' | 'border' | 'primary'
    loading?: boolean
    disabled?: boolean
    as?: 'button' | 'a' | 'router-link'
    href?: string
    to?: string | Record<string, any>
    ariaLabel?: string
    back?: boolean
  }>(), {
    variant: 'pill',
    loading: false,
    disabled: false,
    as: 'button',
    back: false,
  })

  const tag = computed(() => {
    if (props.as === 'router-link') return RouterLink
    if (props.as === 'a') return 'a'
    return 'button'
  })

  const isLink = computed(() => props.as === 'a' || props.as === 'router-link')

  const classes = computed(() => [
    'button',
    `${props.variant}`,
    { 'is-loading': props.loading, 'is-disabled': props.disabled },
  ])

  const router = useRouter()

  function handleClick(event: Event) {
    if (props.back) {
      event.preventDefault()
      router.back()
    }
  }
</script>

<template>
  <component
      :is="tag"
      :class="classes"
      :href="as === 'a' ? href : undefined"
      :to="as === 'router-link' ? to : undefined"
      :disabled="!isLink && disabled"
      :aria-disabled="isLink ? String(disabled) : undefined"
      :aria-busy="loading ? 'true' : undefined"
      :aria-label="ariaLabel"
      @click="handleClick"
  >
    <span v-if="$slots['icon-left']" class="icon-left">
      <slot name="icon-left" />
    </span>

    <slot />

    <span v-if="$slots['icon-right']" class="icon-right">
      <slot name="icon-right" />
    </span>
  </component>
</template>

<style lang="scss" src="./Button.scss" scoped/>