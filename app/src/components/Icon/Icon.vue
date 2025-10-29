<script setup lang="ts">
  import { computed } from 'vue'
  import * as Fill from "@shared/icons/fill"
  import * as Outline from "@shared/icons/outline"

  type Icon = keyof typeof Fill | keyof typeof Outline | string

  const props = withDefaults(defineProps<{
    name: Icon
    filled?: boolean
  }>(), {
    filled: true,
  })

  const IconComponent = computed(() => {
    const key = String(props.name)
    const set: Record<string, any> = props.filled ? Fill : Outline
    return (set as any)[key] || null
  })
</script>

<template>
  <component :is="IconComponent" v-if="IconComponent" v-bind="$attrs" />
</template>
