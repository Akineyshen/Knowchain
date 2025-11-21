// clicker.ts
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'

const GAME_DURATION = 60 // секунд

type PopupMode = 'info' | 'result'

export function useClickerGame() {
    const score = ref(0)
    const isPlaying = ref(false)
    const remainingTime = ref(GAME_DURATION)
    const isSending = ref(false)

    // попап
    const isPopupOpen = ref(false)
    const popupTitle = ref('Clicker')
    const popupDescription = ref('')
    const popupMode = ref<PopupMode>('info')

    // лимит 1 раз в день
    const hasPlayedToday = ref(false)

    let timerId: number | null = null

    const formattedTime = computed(() => {
        const minutes = Math.floor(remainingTime.value / 60)
        const seconds = remainingTime.value % 60
        const mm = String(minutes)
        const ss = String(seconds).padStart(2, '0')
        return `${mm}:${ss}`
    })

    onMounted(() => {
        const today = new Date().toISOString().slice(0, 10)
        const lastPlay = localStorage.getItem('clickerLastPlayDate')
        if (lastPlay === today) {
            hasPlayedToday.value = true
        }
    })

    function startGame() {
        if (hasPlayedToday.value || isPlaying.value || isSending.value) return

        score.value = 0
        remainingTime.value = GAME_DURATION
        isPlaying.value = true

        if (timerId) {
            clearInterval(timerId)
            timerId = null
        }

        timerId = window.setInterval(() => {
            if (remainingTime.value <= 1) {
                remainingTime.value = 0
                endGame()
            } else {
                remainingTime.value -= 1
            }
        }, 1000)
    }

    function handleCircleClick() {
        if (!isPlaying.value) return
        score.value += 1
    }

    async function endGame() {
        isPlaying.value = false

        if (timerId) {
            clearInterval(timerId)
            timerId = null
        }

        const finalScore = score.value
        const today = new Date().toISOString().slice(0, 10)

        try {
            isSending.value = true
            await sendScoreToBackend(finalScore)
            localStorage.setItem('clickerLastPlayDate', today)
            hasPlayedToday.value = true
        } finally {
            isSending.value = false
            // попап с наградой
            popupMode.value = 'result'
            popupTitle.value = `Congrats! You earned ${finalScore} points today.`
            popupDescription.value = '' // без описания
            isPopupOpen.value = true
        }
    }

    async function sendScoreToBackend(finalScore: number) {
        try {
            await fetch('/api/clicker/finish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ score: finalScore })
            })
        } catch (e) {
            console.error('Ошибка отправки результата кликера', e)
        }
    }

    onBeforeUnmount(() => {
        if (timerId) clearInterval(timerId)
    })

    function openInfoSheet() {
        popupMode.value = 'info'
        popupTitle.value = 'Clicker'
        popupDescription.value =
            'You have 60 seconds to tap the button as many times as you can. Each tap gives you points that are converted into rewards for your balance.'
        isPopupOpen.value = true
    }

    return {
        // state
        score,
        isPlaying,
        remainingTime,
        isSending,
        isPopupOpen,
        popupTitle,
        popupDescription,
        popupMode,
        hasPlayedToday,
        formattedTime,
        // methods
        startGame,
        handleCircleClick,
        openInfoSheet
    }
}