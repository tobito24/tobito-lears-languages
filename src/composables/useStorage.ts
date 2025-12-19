import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { DefaultValues } from '@/enums/default-values';
import { type AppLocale } from '@/translation/locales';

export const SETTINGS_STORAGE_KEY = 'tls-settings';

type Storage = {
  language: AppLocale | null;
  primaryColor: string;
  markedVocabItemIds: number[];
};

const defaultStorage: Storage = {
  language: null,
  primaryColor: DefaultValues.PRIMARY_COLOR,
  markedVocabItemIds: [],
};

const storage = useStorage<Storage>(SETTINGS_STORAGE_KEY, defaultStorage, undefined, { mergeDefaults: true });

export function useStorageData() {
  return {
    language: computed(() => storage.value.language),
    primaryColor: computed(() => storage.value.primaryColor),
    markedVocabItemIds: computed(() => storage.value.markedVocabItemIds),
    setLanguage(language: AppLocale | null) {
      storage.value.language = language;
    },
    setPrimaryColor(color: string) {
      storage.value.primaryColor = color;
    },
    setMarkedVocabItemIds(ids: number[]) {
      storage.value.markedVocabItemIds = ids;
    },
  };
}
