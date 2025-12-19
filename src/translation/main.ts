import { createI18n } from 'vue-i18n';
import type { MessageSchema } from './schema';
import { en } from './en';
import { de } from './de';
import { useStorageData } from '@/composables/useStorage';
import { supportedLanguages, fallbackLocale, type AppLocale } from '@/translation/locales';

function detectLocale(supportedLocales: readonly AppLocale[], fallback: AppLocale = fallbackLocale): AppLocale {
  const candidates = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language];

  for (const cand of candidates) {
    if (!cand) continue;
    const base = cand.toLowerCase().split('-')[0] as AppLocale;
    if (supportedLocales.includes(base)) return base;
  }
  return fallback;
}

function loadStoredLanguage(): AppLocale | null {
  const { language } = useStorageData();
  const storedLanguage = language.value;
  if (typeof storedLanguage !== 'string') return null;
  return supportedLanguages.includes(storedLanguage as AppLocale)
    ? (storedLanguage as AppLocale)
    : null;
}

const initialLocale: AppLocale = loadStoredLanguage() ?? detectLocale(supportedLanguages, fallbackLocale);

export const i18n = createI18n<[MessageSchema], AppLocale>({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: fallbackLocale,
  messages: {
    en,
    de,
  },
});

export function setLocale(locale: AppLocale) {
  const localeRef = i18n.global.locale as unknown as { value: AppLocale };
  localeRef.value = locale;
  document.title = i18n.global.t('ui.appTitle');
}
