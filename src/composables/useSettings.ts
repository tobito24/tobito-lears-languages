import { computed } from 'vue';
import { setLocale } from '@/translation/main';
import { type AppLocale } from '@/translation/locales';
import { updatePrimaryPalette, palette } from '@primeuix/themes';
import type { PaletteDesignToken } from '@primeuix/themes/types';
import { useStorageData } from '@/composables/useStorage';

const storage = useStorageData();

export function useSettings() {
  function isHex(color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color);
  }

  function setPrimaryColor(color: string) {
    const newColor = color.startsWith('#') ? color : `#${color}`;
    if (!color || !isHex(newColor)) return;
    storage.setPrimaryColor(newColor);
    updatePrimaryPalette(palette(newColor) as PaletteDesignToken);
  }

  function setLanguage(language: AppLocale) {
    storage.setLanguage(language);
    setLocale(language);
  }

  return {
    currentLanguage: computed(() => storage.language.value),
    primaryColor: computed(() => storage.primaryColor.value),
    setLanguage,
    setPrimaryColor,
  };
}
