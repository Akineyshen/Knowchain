<script setup lang="ts">
  import { ref } from 'vue'
  import Navbar from "@components/Navbar/Navbar.vue"
  import Button from "@components/Button/Button.vue"
  import Topbar from "@components/Topbar/Topbar.vue"
  import Icon from "@components/Icon/Icon.vue"
  import BottomSheet from "@components/BottomSheet/BottomSheet.vue"
  import { useTonConnect } from "@composables/useTonConnect"

  const isPopupOpen = ref(false)
  const { isConnected, walletAddress, connectWallet, formatAddress } = useTonConnect()

  const handleOpenConnect = () => {
    if (!isConnected.value) {
      isPopupOpen.value = true
    }
  }

  async function handleConfirm() {
    try {
      await connectWallet()
      isPopupOpen.value = false
    } catch (e) {
      console.error(e)
    }
  }
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

      <Button variant="border">
        Your rank #57
      </Button>
    </div>
  </main>

  <BottomSheet
      v-model="isPopupOpen"
      title="Connect your TON wallet"
      description="Link your wallet to save your progress and prevent losing access to your account. Without linking, your data is stored locally and may be lost."
      confirm-text="Connect wallet"
      @confirm="handleConfirm"
  />

  <Navbar />
</template>

<style scoped lang="scss" src="./Home.scss"/>
