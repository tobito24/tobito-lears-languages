import { computed, reactive } from 'vue'

export interface VocabTranslation {
  text: string,
  phoenetic?: string,
  synonyms?: string[],
  examples?: string[]
}

export interface VocabItem {
  id: number,
  translations: {
    en: VocabTranslation,
    de: VocabTranslation,
    es: VocabTranslation
  }
  tags: string[],
  level: string,
}

const VOCAB_URL =
  'https://raw.githubusercontent.com/tobito24/tobito-data/main/tobito-learns-languages/all-vocabulary.json'

const state = reactive<{
  vocab: VocabItem[],
  isLoading: boolean,
  error: string | null
}>({
  vocab: [],
  isLoading: false,
  error: null
})

export function useVocab() {
  const loadVocab = async () => {
    try {
      state.isLoading = true
      state.error = null

      const res = await fetch(VOCAB_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      state.vocab = await res.json() as VocabItem[]
    } catch (e: any) {
      state.error = e.message ?? 'Failed to load vocab'
    } finally {
      state.isLoading = false
    }
  }

  return {
    vocab: computed(() => state.vocab),
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),
    loadVocab
  }
}
