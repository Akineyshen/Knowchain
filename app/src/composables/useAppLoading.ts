import { ref } from 'vue'

const isAppLoading = ref(true)

export function useAppLoading() {
    const finishLoading = () => {
        isAppLoading.value = false
    }

    return {
        isAppLoading,
        finishLoading,
    }
}