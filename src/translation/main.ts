import { createI18n } from 'vue-i18n'
import type { MessageSchema } from './schema'
import { en } from './en'
import { de } from './de'
import { useSettings } from '@/composables/useSettings';

const { currentLanguage } = useSettings();

export const supportedLanguages = ['en', 'de'] as const;
export const fallbackLocale = 'en';
export type AppLocale = typeof supportedLanguages[number];
export const supportedLocales = supportedLanguages;

function detectLocale(supportedLocales: readonly AppLocale[], fallback: AppLocale = fallbackLocale): AppLocale {
  const candidates = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language]

  for (const cand of candidates) {
    if (!cand) continue
    const base = cand.toLowerCase().split('-')[0] as AppLocale
    if (supportedLocales.includes(base)) return base
  }
  return fallback
}

const initialLocale: AppLocale = currentLanguage.value ?? detectLocale(supportedLanguages, fallbackLocale)

export const i18n = createI18n<[MessageSchema], AppLocale>({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: fallbackLocale,
  messages: {
    en,
    de,
  },
})

export function setLocale(locale: AppLocale) {
  const localeRef = i18n.global.locale as unknown as { value: AppLocale }
  localeRef.value = locale
  document.title = i18n.global.t('ui.appTitle')
}
