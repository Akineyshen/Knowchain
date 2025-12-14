<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHttp } from '@/api'
import { useUserStore } from '@/stores/useUserStore'
import Navbar from '@/components/layout/Navbar/Navbar.vue'

const amount = ref(1000)
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const { post } = useHttp()
const userStore = useUserStore()

const user = computed(() => userStore.user)

const canWithdraw = computed(() => {
  return (
      typeof user.value?.tokens === 'number' &&
      user.value.tokens >= amount.value &&
      amount.value >= 1000
  )
})

async function onWithdraw() {
  error.value = null
  success.value = false

  if (!canWithdraw.value) return

  try {
    loading.value = true

    await post('/withdraw', {
      internalAmount: amount.value
    })

    userStore.updateTokens(user.value!.tokens - amount.value)
    success.value = true
  } catch (e: any) {
    error.value = e?.message || 'Ошибка вывода'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="withdraw">
    <h1 class="title">Wypłata tokenów</h1>

    <div class="card">
      <div class="row">
        <span class="label">Saldo</span>
        <span class="value">{{ user?.tokens ?? 0 }}</span>
      </div>

      <div class="row">
        <span class="label">Kurs</span>
        <span class="value">1000 = 1 KNW</span>
      </div>
    </div>

    <div class="card">
      <label class="input-label">Ile wypłacić</label>

      <input
          type="number"
          min="1000"
          step="1000"
          v-model.number="amount"
          placeholder="Minimum 1000"
      />

      <button
          class="primary"
          :disabled="loading || !canWithdraw"
          @click="onWithdraw"
      >
        {{ loading ? 'Przetwarzanie...' : 'Wypłacić KNW' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Tokeny zostały pomyślnie wycofane</p>
    </div>

    <div class="card hint">
      <p>
        Prowizja sieci jest opłacana z Twojego portfela TON.
      </p>
    </div>

    <Navbar />
  </div>
</template>

<style scoped lang="scss" src="./Withdraw.scss"/>