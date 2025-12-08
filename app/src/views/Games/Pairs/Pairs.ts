import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAwardTokens } from "@composables/award/useAwardTokens.ts";

export interface PairCard {
    id: number
    value: string
    isRevealed: boolean
    isMatched: boolean
}

type PopupMode = 'info' | 'result'

const BOARD_SIZE = 16
const PAIR_COUNT = BOARD_SIZE / 2
const GAME_DURATION = 60
const STORAGE_KEY = 'pairsLastPlayDate'

const { awardTokens } = useAwardTokens()

const BASE_SYMBOLS = [
    'ADA',
    'BNB',
    'BTC',
    'DOGE',
    'ETH',
    'USDC',
    'USDT',
    'XRP'
]

export function usePairsGame() {
    const cards = ref<PairCard[]>([])
    // moves = число собранных пар
    const moves = ref(0)

    const remainingTime = ref(GAME_DURATION)
    const isPlaying = ref(false)
    const isChecking = ref(false)
    const isSending = ref(false)

    // попап
    const isPopupOpen = ref(false)
    const popupTitle = ref('Pairs')
    const popupDescription = ref('')
    const popupMode = ref<PopupMode>('info')

    // лимит 1 раз в день
    const hasPlayedToday = ref(false)

    let firstIndex: number | null = null
    let secondIndex: number | null = null
    let timerId: number | null = null

    const timeFormatted = computed(() => {
        const minutes = Math.floor(remainingTime.value / 60)
        const seconds = remainingTime.value % 60
        const mm = String(minutes).padStart(2, '0')
        const ss = String(seconds).padStart(2, '0')
        return `${mm}:${ss}`
    })

    function createShuffledBoard(): PairCard[] {
        const symbols = BASE_SYMBOLS.slice(0, PAIR_COUNT)
        const raw: PairCard[] = []
        let id = 0

        symbols.forEach((symbol) => {
            raw.push({
                id: id++,
                value: symbol,
                isRevealed: false,
                isMatched: false
            })
            raw.push({
                id: id++,
                value: symbol,
                isRevealed: false,
                isMatched: false
            })
        })

        for (let i = raw.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))

            const cardI = raw[i]
            const cardJ = raw[j]

            if (!cardI || !cardJ) continue

            raw[i] = cardJ
            raw[j] = cardI
        }


        return raw
    }

    function resetBoard() {
        cards.value = createShuffledBoard()
        moves.value = 0
        remainingTime.value = GAME_DURATION
        firstIndex = null
        secondIndex = null
        isChecking.value = false
    }

    function stopTimer() {
        if (timerId !== null) {
            clearInterval(timerId)
            timerId = null
        }
    }

    function startTimer() {
        stopTimer()
        timerId = window.setInterval(() => {
            if (remainingTime.value <= 1) {
                remainingTime.value = 0
                endGame()
            } else {
                remainingTime.value -= 1
            }
        }, 1000)
    }

    onMounted(() => {
        const today = new Date().toISOString().slice(0, 10)
        const lastPlay = localStorage.getItem(STORAGE_KEY)
        if (lastPlay === today) {
            hasPlayedToday.value = true
        }

        cards.value = createShuffledBoard()
    })

    function startGame() {
        if (hasPlayedToday.value || isPlaying.value || isSending.value) return

        resetBoard()
        isPlaying.value = true
        startTimer()
    }

    async function endGame() {
        if (!isPlaying.value) {
            stopTimer()
            return
        }

        isPlaying.value = false
        stopTimer()

        const finalPairs = moves.value
        const finalScore = finalPairs * 100
        const today = new Date().toISOString().slice(0, 10)

        try {
            isSending.value = true
            await sendScoreToBackend(finalPairs, finalScore)
            localStorage.setItem(STORAGE_KEY, today)
            hasPlayedToday.value = true
        } finally {
            isSending.value = false
            popupMode.value = 'result'
            popupTitle.value = `Congrats! You earned ${finalScore} points today.`
            popupDescription.value = ''
            isPopupOpen.value = true
        }
    }

    async function sendScoreToBackend(_pairs: number, points: number) {
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

    function handleCardClick(index: number) {
        if (!isPlaying.value) return
        if (isChecking.value) return

        const card = cards.value[index]
        // TS-фиксы: вдруг индекс невалидный
        if (!card) return

        if (card.isMatched || card.isRevealed) return

        card.isRevealed = true

        if (firstIndex === null) {
            firstIndex = index
            return
        }

        if (secondIndex === null) {
            secondIndex = index
            isChecking.value = true

            // сохраняем индексы в локальные константы,
            // чтобы TS не переживал из-за setTimeout
            const currentFirstIndex = firstIndex
            const currentSecondIndex = secondIndex

            setTimeout(() => {
                // доп.проверка на всякий случай
                if (
                    currentFirstIndex === null ||
                    currentSecondIndex === null
                ) {
                    isChecking.value = false
                    return
                }

                const firstCard = cards.value[currentFirstIndex]
                const secondCard = cards.value[currentSecondIndex]

                // TS-фиксы: проверяем, что карточки точно есть
                if (!firstCard || !secondCard) {
                    isChecking.value = false
                    return
                }

                if (firstCard.value === secondCard.value) {
                    firstCard.isMatched = true
                    secondCard.isMatched = true
                    moves.value += 1
                } else {
                    firstCard.isRevealed = false
                    secondCard.isRevealed = false
                }

                firstIndex = null
                secondIndex = null
                isChecking.value = false

                if (moves.value === PAIR_COUNT) {
                    endGame()
                }
            }, 400)
        }
    }

    function openInfoSheet() {
        popupMode.value = 'info'
        popupTitle.value = 'Pairs'
        popupDescription.value =
            'You have one minute to find as many pairs as possible. Each pair earns you 100 points, which are converted into rewards for your balance.'
        isPopupOpen.value = true
    }

    onBeforeUnmount(() => {
        stopTimer()
    })

    return {
        cards,
        moves,
        remainingTime,
        timeFormatted,
        isPlaying,
        isSending,
        hasPlayedToday,
        isPopupOpen,
        popupTitle,
        popupDescription,
        popupMode,
        startGame,
        handleCardClick,
        openInfoSheet
    }
}
