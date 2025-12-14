import { computed, reactive, watch } from 'vue'
import { DefaultValues } from '@/enums/default-values'
import { fallbackLocale, setLocale, type AppLocale } from '@/translation/main'
import { updatePrimaryPalette, palette } from '@primeuix/themes'
import type { PaletteDesignToken } from '@primeuix/themes/types'

const STORAGE_KEY = 'tls-settings'

export type Settings = {
    language: AppLocale
    primaryColor: string
}

const defaultSettings: Settings = {
    language: fallbackLocale,
    primaryColor: DefaultValues.PRIMARY_COLOR,
}

const state = reactive<Settings>(loadFromStorage())

function loadFromStorage(): Settings {
    if (typeof window === 'undefined') return defaultSettings
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultSettings
    try {
        return { ...defaultSettings, ...JSON.parse(raw) }
    } catch {
        return defaultSettings
    }
}

export function useSettings() {

    function updateLocalStorage() {
        if (typeof window === 'undefined') return
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }

    function isHex(color: string): boolean {
        return /^#[0-9A-F]{6}$/i.test(color);
    }

    function setPrimaryColor(color: string) {
        const newColor = color.startsWith('#') ? color : `#${color}`;
        if (!color || !isHex(newColor)) return;
        state.primaryColor = newColor;
        updatePrimaryPalette(palette(newColor) as PaletteDesignToken);
        updateLocalStorage();
    }

    function setLanguage(language: AppLocale) {
        state.language = language;
        // TODO: setLocale does not yet update the displayed texts immediately
        setLocale(language);
        updateLocalStorage();
    }

    return {
        currentLanguage: computed(() => state.language),
        primaryColor: computed(() => state.primaryColor),
        setLanguage,
        setPrimaryColor
    }
}
