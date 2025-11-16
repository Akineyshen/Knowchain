import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import pl from './locales/pl.json'

export type MessageSchema = typeof en

const messages = {
    en,
    pl,
}

const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n<[MessageSchema], 'en' | 'pl' >({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    messages
})

export default i18n