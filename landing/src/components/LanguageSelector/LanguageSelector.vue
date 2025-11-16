<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  import Down from '@shared/icons/outline/arrows/plain/Down.vue'
  import Icon from '@components/Icon/Icon.vue'

  type Language = {
    code: 'en' | 'pl'
    flag: string
    shortName: string
    name: string
  }

  const { locale } = useI18n()
  const isOpen = ref(false)
  const selectorRef = ref<HTMLDivElement | null>(null)

  const languages: readonly Language[] = [
    { code: 'en', flag: 'EN', shortName: 'ENG', name: 'English' },
    { code: 'pl', flag: 'PL', shortName: 'POL', name: 'Polski' },
  ] as const

  const currentLanguage = computed(() => {
    const lang = languages.find(lang => lang.code === locale.value)
    if (!lang) return languages[0]
    return lang
  })

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }

  const selectLanguage = (code: Language['code']) => {
    locale.value = code
    localStorage.setItem('locale', code)
    isOpen.value = false
  }

  const closeDropdown = () => {
    isOpen.value = false
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (selectorRef.value && !selectorRef.value.contains(event.target as Node)) {
      closeDropdown()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<template>
  <div v-if="currentLanguage" ref="selectorRef" class="language-selector" @click.stop>
    <button class="language-btn" @click="toggleDropdown">
      <Icon :name="currentLanguage.flag" :filled="true" class="flag-icon" />
      <span class="name">{{ currentLanguage.shortName }}</span>
      <Down :size="12" :color="'currentColor'" class="arrow" :class="{ open: isOpen }" />
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown">
        <button
            v-for="lang in languages"
            :key="lang.code"
            class="dropdown-item"
            :class="{ active: lang.code === locale }"
            @click="selectLanguage(lang.code)"
        >
          <span class="name">{{ lang.name }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped src="./LanguageSelector.scss" />
