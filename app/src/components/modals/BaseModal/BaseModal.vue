<script setup lang="ts">
import { watch } from 'vue'
import Button from '@/components/ui/Button/Button.vue'

interface Props {
  modelValue: boolean
  title?: string
  description?: string
  confirmText?: string
  closeOnOverlay?: boolean
  showSecondary?: boolean
  secondaryText?: string
  closeOnConfirm?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnOverlay: true,
  confirmText: 'Połącz portfel',
  showSecondary: false,
  secondaryText: 'Kontynuuj bez portfela',
  closeOnConfirm: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'confirm': []
  'secondary': []
}>()

function closePopup() {
  emit('update:modelValue', false)
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    closePopup()
  }
}

function handleConfirm() {
  emit('confirm')
  if (props.closeOnConfirm) {
    closePopup()
  }
}

function handleSecondary() {
  emit('secondary')
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.modelValue && props.closeOnOverlay) {
    closePopup()
  }
}

watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue) {
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleEscape)
      } else {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEscape)
      }
    },
    { immediate: true }
)
</script>

<template>
  <Transition name="popup">
    <div v-if="modelValue" class="popup-overlay" @click="handleOverlayClick">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <h2 v-if="title || $slots.title" class="popup-title">
            <slot name="title">{{ title }}</slot>
          </h2>
        </div>

        <div class="popup-body">
          <p v-if="description || $slots.description" class="popup-description">
            <slot name="description">{{ description }}</slot>
          </p>
          <slot />
        </div>

        <div class="popup-footer">
          <slot name="footer">
            <Button
                variant="primary"
                class="popup-button"
                @click="handleConfirm"
            >
              {{ confirmText }}
            </Button>

            <Button
                v-if="showSecondary"
                variant="ghost"
                class="popup-button popup-button--secondary"
                @click="handleSecondary"
            >
              {{ secondaryText }}
            </Button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped src="./BaseModal.scss"/>
