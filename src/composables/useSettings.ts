import { computed, reactive, watch } from 'vue'
import { DefaultValues } from '@/enums/default-values'
import { fallbackLocale, setLocale, type AppLocale } from '@/translation/main'
import { updatePrimaryPalette, palette } from '@primeuix/themes'
import type { PaletteDesignToken } from '@primeuix/themes/types'

const STORAGE_KEY = 'tls-settings'

export type Settings = {
    language: AppLocale | null
    primaryColor: string
    markedVocabItemIds: number[] // TODO: if more settings are added, consider moving this to its own storage key
}

const defaultSettings: Settings = {
    language: null,
    primaryColor: DefaultValues.PRIMARY_COLOR,
    markedVocabItemIds: [],
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
        setLocale(language);
        updateLocalStorage();
    }

    function toggleMarkedVocabItemId(id?: number) {
        if (id === undefined) return;
        if (!state.markedVocabItemIds.includes(id)) {
            state.markedVocabItemIds.push(id);
        }
        else if (state.markedVocabItemIds.includes(id)) {
            state.markedVocabItemIds = state.markedVocabItemIds.filter(
                (itemId) => itemId !== id
            );
        }
        updateLocalStorage();
    }

    function isVocabItemIdMarked(id?: number): boolean {
        if (id === undefined) return false;
        return state.markedVocabItemIds.includes(id);
    }

    function resetMarkedVocabItemIds() {
        state.markedVocabItemIds = [];
        updateLocalStorage();
    }

    return {
        currentLanguage: computed(() => state.language),
        primaryColor: computed(() => state.primaryColor),
        markedVocabItemIds: computed(() => state.markedVocabItemIds),
        setLanguage,
        setPrimaryColor,
        toggleMarkedVocabItemId,
        isVocabItemIdMarked,
        resetMarkedVocabItemIds,
    }
}
