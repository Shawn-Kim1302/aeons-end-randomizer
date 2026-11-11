import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en'
import ko from './locales/ko'

export const UI_LANGUAGES = { en: 'English', ko: '한국어' }
export type UiLanguage = keyof typeof UI_LANGUAGES

const STORAGE_KEY = 'ui-language'

const isUiLanguage = (value: unknown): value is UiLanguage =>
  typeof value === 'string' && value in UI_LANGUAGES

const detectLanguage = (): UiLanguage => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isUiLanguage(stored)) return stored
  } catch {
    // Storage can be blocked (private mode); fall back to the browser language.
  }
  return (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

i18next.use(initReactI18next).init({
  resources: { en: { translation: en }, ko: { translation: ko } },
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

document.documentElement.lang = i18next.language

export const changeUiLanguage = (language: UiLanguage) => {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {
    // Not persisted, but still switch for this session.
  }
  document.documentElement.lang = language
  i18next.changeLanguage(language)
}

export const currentUiLanguage = (): UiLanguage =>
  isUiLanguage(i18next.language) ? i18next.language : 'en'

// Every dot-separated key path of the English dictionary, e.g. "nav.settings".
type Paths<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${Paths<T[K]>}`
}[keyof T & string]

export type TranslationKey = Paths<typeof en>

export const t = (key: TranslationKey, options?: Record<string, unknown>) =>
  i18next.t(key, options) as string

export default i18next
