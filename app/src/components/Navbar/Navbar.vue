<script setup lang="ts">
const props = defineProps<{ onConnect?: () => void }>()
</script>

<template>
  <header class="navbar">
    <div class="navbar__left">
      <div class="avatar">
        <img src="https://i.pravatar.cc/64?img=5" alt="avatar" />
      </div>
    </div>

    <button class="connect" @click="props.onConnect?.()">
      <span class="icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h10a2 2 0 0 1 2 2v2h-3.5a3.5 3.5 0 0 0 0 7H18v2a2 2 0 0 1-2 2H6a2.5 2.5 0 0 1-2.5-2.5v-10Z" stroke="currentColor" stroke-width="1.5"/>
          <rect x="14.5" y="10" width="7" height="6" rx="2.5" fill="currentColor" opacity="0.25"/>
        </svg>
      </span>
      Connect wallet
    </button>

    <button class="settings" aria-label="settings">
      <span class="gear">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M19.4 8.5 21 7l-2-3-2 .7a7.97 7.97 0 0 0-2.7-1.1L14 1h-4l-.3 2.6a7.97 7.97 0 0 0-2.7 1.1l-2-.7-2 3 1.6 1.5c-.15.5-.25 1.02-.3 1.55-.05.53-.05 1.07 0 1.6l-1.6 1.5 2 3 2-.7c.83.52 1.75.9 2.7 1.1L10 23h4l.3-2.6c.95-.2 1.87-.58 2.7-1.1l2 .7 2-3-1.6-1.5c.05-.53.05-1.07 0-1.6-.05-.53-.15-1.05-.3-1.55Z" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>
        </svg>
      </span>
    </button>
  </header>
</template>

<style lang="scss" scoped>
@use '../../../shared/style/main.scss' as *;

.navbar {
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 16px 20px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: 0 0 0 2px $color-border-light, 0 6px 18px rgba(0,0,0,.3);
  img { width: 100%; height: 100%; display: block; }
}

.connect {
  justify-self: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #fff;
  background: radial-gradient(100% 100% at 0% 0%, rgba(255,255,255,.18) 0%, rgba(255,255,255,0) 35%),
  linear-gradient(180deg, $color-blue-500, $color-blue-600);
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 8px 24px rgba(59,130,246,.35), inset 0 0 0 1px rgba(255,255,255,.08);
  border-radius: 20px;
  font-weight: 600;
}

.settings {
  justify-self: end;
  width: 44px; height: 44px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid $color-border;
  display: grid; place-items: center;
  color: $color-text-primary;
  box-shadow: 0 6px 18px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.04);
}

</style>