// src/components/InstallGate/InstallGate.ts
import { ref, onMounted, onBeforeUnmount } from 'vue'

const SESSION_CONTINUE_KEY = 'install_gate_continue_browser_v1'
const LS_LATER_KEY = 'install_gate_later_v1'

export function useInstallGate() {
    const isIOS = ref(false)
    const isAndroid = ref(false)
    const isStandalone = ref(false)
    const isMobileOrTablet = ref(false)

    const showGate = ref(false)
    const showIosHelp = ref(false)
    const showAndroidHelp = ref(false)

    let deferredPrompt: any = null

    const screenshots = ref<string[]>([
        '/screenshots/Home.png',
        '/screenshots/Learning.png',
        '/screenshots/Minigames.png'
    ])

    const iosInstructionImages = ref<string[]>([
        '/install/ios-step-1.png',
        '/install/ios-step-2.png',
        '/install/ios-step-3.png'
    ])

    const androidInstructionImages = ref<string[]>([
        // '/install/android-step-1.png',
        // '/install/android-step-2.png'
    ])

    function detectPlatform() {
        const ua = navigator.userAgent.toLowerCase()

        isIOS.value = /iphone|ipad|ipod/.test(ua)
        isAndroid.value = /android/.test(ua)
        isMobileOrTablet.value =
            isIOS.value || isAndroid.value || /mobile|tablet/.test(ua)

        isStandalone.value =
            (window.matchMedia &&
                window.matchMedia('(display-mode: standalone)').matches) ||
            // iOS Safari
            (navigator as any).standalone === true
    }

    function maybeShowGate() {
        // на десктопе не показываем
        if (!isMobileOrTablet.value) {
            showGate.value = false
            return
        }

        // уже в standalone — не показываем
        if (isStandalone.value) {
            showGate.value = false
            return
        }

        // если юзер выбрал «Продолжить в браузере» — не показываем до конца сессии
        if (sessionStorage.getItem(SESSION_CONTINUE_KEY) === '1') {
            showGate.value = false
            return
        }

        // если выбрал «Установлю позже» — можно тоже не показывать (по желанию)
        if (localStorage.getItem(LS_LATER_KEY) === '1') {
            showGate.value = false
            return
        }

        showGate.value = true
    }

    function onBeforeInstallPrompt(e: any) {
        // Chrome/Android
        e.preventDefault()
        deferredPrompt = e
        if (sessionStorage.getItem(SESSION_CONTINUE_KEY) === '1' ||
            localStorage.getItem(LS_LATER_KEY) === '1') {
            return
        }

        maybeShowGate()
    }

    function onAppInstalled() {
        isStandalone.value = true
        showGate.value = false
        deferredPrompt = null
    }

    async function handleInstallClick() {
        if (isIOS.value) {
            showIosHelp.value = true
            return
        }

        if (isAndroid.value) {
            showAndroidHelp.value = true
            if (deferredPrompt) {
                deferredPrompt.prompt()
                try {
                    await deferredPrompt.userChoice
                } finally {
                    deferredPrompt = null
                }
            }
            return
        }
    }

    function continueInBrowser() {
        sessionStorage.setItem(SESSION_CONTINUE_KEY, '1')
        showGate.value = false
        window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    }

    onMounted(() => {
        detectPlatform()
        maybeShowGate()
        window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
        window.addEventListener('appinstalled', onAppInstalled)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
        window.removeEventListener('appinstalled', onAppInstalled)
    })

    return {
        isIOS,
        isAndroid,
        isStandalone,
        isMobileOrTablet,
        showGate,
        showIosHelp,
        showAndroidHelp,
        screenshots,
        iosInstructionImages,
        androidInstructionImages,
        handleInstallClick,
        continueInBrowser
    }
}
