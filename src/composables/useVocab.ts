import { computed, reactive } from 'vue';
import { useStorageData } from '@/composables/useStorage';

export interface VocabTranslation {
  text: string;
  phonetic?: string;
  synonyms?: string[];
  examples?: string[];
}

export interface VocabItem {
  id: number;
  translations: {
    en: VocabTranslation;
    de: VocabTranslation;
    es: VocabTranslation;
  };
  tags: string[];
  level: string;
}

const VOCAB_URL =
  'https://raw.githubusercontent.com/tobito24/tobito-data/main/tobito-learns-languages/all-vocabulary.json';

const state = reactive<{
  allVocabs: VocabItem[],
  activeVocabs: VocabItem[],
  isLoading: boolean,
  error: string | null
}>({
  allVocabs: [],
  activeVocabs: [],
  isLoading: false,
  error: null
});

const storage = useStorageData();

export function useVocab() {
  const loadVocab = async () => {
    try {
      state.isLoading = true;
      state.error = null;

      const res = await fetch(VOCAB_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // TODO: Add schema validation here later
      const raw = await res.json();

      state.allVocabs = raw;
      state.activeVocabs = [...state.allVocabs];
    } catch (e: unknown) {
      state.error = e instanceof Error ? e.message : 'Failed to load vocab';
    } finally {
      state.isLoading = false;
    }
  };

  const filterActiveVocabs = () => {
    // TODO: Add more filtering options in the future
    state.activeVocabs = state.allVocabs.filter(item =>
      isVocabItemIdMarked(item.id)
    );
  };

  const shuffleActiveVocabs = () => {
    for (let i = state.activeVocabs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = state.activeVocabs[i];
      state.activeVocabs[i] = state.activeVocabs[j]!;
      state.activeVocabs[j] = temp!;
    }
  };

  function toggleMarkedVocabItemId(id?: number) {
    if (id === undefined) return;
    if (!storage.markedVocabItemIds.value.includes(id)) {
      storage.setMarkedVocabItemIds([...storage.markedVocabItemIds.value, id]);
    }
    else if (storage.markedVocabItemIds.value.includes(id)) {
      storage.setMarkedVocabItemIds(
        storage.markedVocabItemIds.value.filter((itemId) => itemId !== id)
      );
    }
  }

  function isVocabItemIdMarked(id?: number): boolean {
    if (id === undefined) return false;
    return storage.markedVocabItemIds.value.includes(id);
  }

  function resetMarkedVocabItemIds() {
    storage.setMarkedVocabItemIds([]);
  }

  return {
    allVocabs: computed(() => state.allVocabs),
    activeVocabs: computed(() => state.activeVocabs),
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),
    loadVocab,
    filterActiveVocabs,
    shuffleActiveVocabs,
    resetMarkedVocabItemIds,
    toggleMarkedVocabItemId,
    isVocabItemIdMarked,
    markedVocabItemIdsLength: computed(() => storage.markedVocabItemIds.value.length)
  };
}
