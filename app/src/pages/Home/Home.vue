<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Navbar from "@components/Navbar/Navbar.vue"
import Button from "@components/Button/Button.vue"
import Topbar from "@components/Topbar/Topbar.vue"
import Icon from "@components/Icon/Icon.vue"
import BottomSheet from "@components/BottomSheet/BottomSheet.vue"
import { useTonConnect } from "@composables/useTonConnect"

const isPopupOpen = ref(false)

const popupStep = ref<'intro' | 'warning' | 'connect' | null>(null)

const { isConnected, isInitialized, walletAddress, connectWallet, formatAddress } = useTonConnect()

const popupTitle = computed(() => {
  if (popupStep.value === 'intro') {
    return 'Welcome to Knowchain'
  }
  if (popupStep.value === 'warning') {
    return 'Continue in demo mode?'
  }
  if (popupStep.value === 'connect') {
    return 'Connect your TON wallet'
  }
  return ''
})

const popupDescription = computed(() => {
  if (popupStep.value === 'intro') {
    return 'Link your wallet to save your progress and prevent losing access to your account'
  }
  if (popupStep.value === 'warning') {
    return 'If you continue without connecting a wallet, you will get only a demo version of the app. Some features, rewards and cross-device progress will not be available'
  }
  if (popupStep.value === 'connect') {
    return 'Link your TON wallet to unlock full functionality, save your progress and access on-chain features.'
  }
  return ''
})

const showSecondary = computed(() => popupStep.value === 'intro' || popupStep.value === 'warning')

const secondaryText = computed(() => {
  return 'Continue without wallet'
})

const confirmText = computed(() => 'Connect wallet')

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
        <img src="../../../public/logo/logo_dark.svg" style="width: 126px; height: 112px" />
      </div>

      <div class="balance">
        100,000 KNW
      </div>

      <Button variant="border" as="router-link" to="/ratings">
        Your rank #57
      </Button>
    </div>
  </main>

  <BottomSheet
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
