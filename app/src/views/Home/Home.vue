<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Navbar from "@/components/layout/Navbar/Navbar.vue"
import Button from "@/components/ui/Button/Button.vue"
import Topbar from "@/components/layout/Topbar/Topbar.vue"
import Icon from "@/components/ui/Icon/Icon.vue"
import BaseModal from "@/components/modals/BaseModal/BaseModal.vue"
import { useTonConnect } from "@/composables/ton/useTonConnect.ts"
import { useUserStore } from '@/stores/useUserStore.ts'

const isPopupOpen = ref(false)
const popupStep = ref<'intro' | 'warning' | 'connect' | null>(null)

const {
  isConnected,
  isInitialized,
  walletAddress,
  connectWallet,
  formatAddress,
  // user — оставляем, но баланс берём из store
} = useTonConnect()

const userStore = useUserStore()

const formattedBalance = computed(() => {
  const balance = userStore.user?.tokens ?? 0
  return new Intl.NumberFormat('en-US').format(balance)
})

const popupTitle = computed(() => {
  if (popupStep.value === 'intro') return 'Witamy w Knowchain'
  if (popupStep.value === 'warning') return 'Chcesz kontynuować bez podłączenia portfela?'
  if (popupStep.value === 'connect') return 'Połącz swój portfel TON'
  return ''
})

const popupDescription = computed(() => {
  if (popupStep.value === 'intro') return 'Połącz swój portfel, aby zachować postępy i zapobiec utracie dostępu do konta.'
  if (popupStep.value === 'warning') return 'Jeśli zdecydujesz się kontynuować bez podłączenia portfela, wszystkie dane będą przechowywane lokalnie, mogą zostać utracone i nie będzie możliwości zapisania postępów.'
  if (popupStep.value === 'connect') return 'Połącz swój portfel TON, aby odblokować pełną funkcjonalność, zapisać postępy i korzystać z funkcji on-chain.'
  return ''
})

const showSecondary = computed(() => popupStep.value === 'intro' || popupStep.value === 'warning')
const secondaryText = computed(() => 'Kontynuuj bez portfela')
const confirmText = computed(() => 'Połącz portfel')

const hasSeenWalletIntro = ref(false)

if (typeof window !== 'undefined') {
  hasSeenWalletIntro.value = localStorage.getItem('seenWalletIntro') === '1'
}

const handleOpenConnect = () => {
  if (!isConnected.value) {
    popupStep.value = 'connect'
    isPopupOpen.value = true
  }
}

async function handleConfirm() {
  try {
    await connectWallet()
  } catch (e) {
    console.error(e)
  }
}

function handleSecondary() {
  if (popupStep.value === 'intro') {
    popupStep.value = 'warning'
    isPopupOpen.value = true
  } else if (popupStep.value === 'warning') {
    isPopupOpen.value = false
    popupStep.value = null

    hasSeenWalletIntro.value = true
    if (typeof window !== 'undefined') {
      localStorage.setItem('seenWalletIntro', '1')
    }
  }
}

watch(
    () => ({ ready: isInitialized.value, connected: isConnected.value }),
    ({ ready, connected }) => {
      if (!ready) return

      if (connected) {
        isPopupOpen.value = false
        popupStep.value = null
        return
      }

      if (!connected && !hasSeenWalletIntro.value && popupStep.value === null) {
        popupStep.value = 'intro'
        isPopupOpen.value = true
      }
    },
    { immediate: true }
)
</script>

<template>
  <Topbar>
    <template #left>
      <Button variant="circle" style="padding: 0">
        <img src="../../assets/avatar/Avatar.png" alt="avatar" style="width: 52px; height: 52px"/>
      </Button>
    </template>

    <template #center>
      <Button
          variant="secondary"
          :disabled="isConnected"
          @click="handleOpenConnect"
      >
        <Icon name="Wallet" :size="14"/>
        <span v-if="!isConnected">Connect Wallet</span>
        <span v-else>{{ formatAddress(walletAddress) }}</span>
      </Button>
    </template>

    <template #right>
      <Button variant="circle" as="router-link" to="/settings">
        <Icon name="Settings" :filled="false" />
      </Button>
    </template>
  </Topbar>

  <main class="content">
    <div class="balance-card">
      <div class="logo">
        <img src="../../../public/logo/logo_dark.svg" style="width: 10rem; height: 9rem" />
      </div>

      <div class="balance">
        {{ formattedBalance }} KNW
      </div>
    </div>
  </main>

  <BaseModal
      v-model="isPopupOpen"
      :title="popupTitle"
      :description="popupDescription"
      :confirm-text="confirmText"
      :show-secondary="showSecondary"
      :secondary-text="secondaryText"
      :close-on-overlay="popupStep === 'connect'"
      @confirm="handleConfirm"
      @secondary="handleSecondary"
  />

  <Navbar />
</template>

<style scoped lang="scss" src="./Home.scss"/>
