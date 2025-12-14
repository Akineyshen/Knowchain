// Roulette.ts
import { ref, computed, onMounted } from 'vue'
import { useAwardTokens } from "@/composables/award/useAwardTokens.ts";

type PopupMode = 'info' | 'result'

// порядок значений по кругу (по часовой, начиная СВЕРХУ)
const SEGMENT_VALUES = [100, 200, 300, 400, 500, 600, 700, 800]
const SEGMENT_COUNT = SEGMENT_VALUES.length
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT
const SPIN_DURATION = 4000 // ms
const STORAGE_KEY = 'rouletteLastPlayDate'
const { awardTokens } = useAwardTokens()

export function useRouletteGame() {
    const wheelRotation = ref(0)
    const isSpinning = ref(false)
    const isSending = ref(false)
    const hasPlayedToday = ref(false)

    const isPopupOpen = ref(false)
    const popupTitle = ref('Roulette')
    const popupDescription = ref('')
    const popupMode = ref<PopupMode>('info')

    // 0° — СВЕРХУ (из-за from -90deg в SCSS)
    const segments = computed(() =>
        SEGMENT_VALUES.map((value, index) => {
            const startAngle = index * SEGMENT_ANGLE
            const centerAngle = startAngle + SEGMENT_ANGLE / 2
            return { index, value, startAngle, centerAngle }
        })
    )

    onMounted(() => {
        const today = new Date().toISOString().slice(0, 10)
        const lastPlay = localStorage.getItem(STORAGE_KEY)
        if (lastPlay === today) {
            hasPlayedToday.value = true
        }
    })

    async function handleFinishSpin(selectedIndex: number) {
        const rewardValue = SEGMENT_VALUES[selectedIndex]

        // TS-фикс: на случай некорректного индекса
        if (rewardValue == null) {
            console.error('Invalid roulette index:', selectedIndex)
            return
        }

        const reward: number = rewardValue
        const today = new Date().toISOString().slice(0, 10)

        try {
            isSending.value = true
            await sendScoreToBackend(reward)
            localStorage.setItem(STORAGE_KEY, today)
            hasPlayedToday.value = true
        } finally {
            isSending.value = false
            popupMode.value = 'result'
            popupTitle.value = `Gratulacje! Zdobyłeś dziś ${reward} punktów.`
            popupDescription.value = ''
            isPopupOpen.value = true
        }
    }

    async function sendScoreToBackend(points: number) {
        try {
            const updatedUser = await awardTokens(points)

            if (updatedUser) {
                console.log(`Awarded ${points} tokens — new balance:`, updatedUser.tokens)
                popupDescription.value = `Your new balance: ${updatedUser.tokens ?? '—'} KNW`
            } else {
                console.warn('Tokens were not awarded (user not logged in or error)')
                popupDescription.value = ''
            }
        } catch (e) {
            console.error('Ошибка отправки результата Pairs', e)
            popupDescription.value = ''
        }
    }

    function startSpin() {
        if (hasPlayedToday.value || isSpinning.value || isSending.value) return

        isSpinning.value = true

        const index = Math.floor(Math.random() * SEGMENT_COUNT)
        const segment = segments.value[index]

        // TS-фикс: на случай, если индекс внезапно некорректный
        if (!segment) {
            console.error('Invalid segment index:', index)
            isSpinning.value = false
            return
        }

        const targetRotation = 360 * 4 - segment.centerAngle

        wheelRotation.value = targetRotation

        setTimeout(async () => {
            await handleFinishSpin(index)
            isSpinning.value = false
        }, SPIN_DURATION)
    }

    function openInfoSheet() {
        popupMode.value = 'info'
        popupTitle.value = 'Roulette'
        popupDescription.value =
            'Spin the wheel once a day to get a random reward from 100 to 800 points. Your prize is converted into rewards for your balance.'
        isPopupOpen.value = true
    }

    return {
        segments,
        wheelRotation,
        isSpinning,
        isSending,
        hasPlayedToday,
        isPopupOpen,
        popupTitle,
        popupDescription,
        popupMode,
        startSpin,
        openInfoSheet
    }
}
