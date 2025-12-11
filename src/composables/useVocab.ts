import { ref } from 'vue'

export interface VocabItem {
  word: string
  translation: string
  language: string
}

const VOCAB_URL =
  'https://raw.githubusercontent.com/tobito24/tobito-data/refs/heads/main/tobito-learns-languages/test-vocab.json'

export function useVocab() {
  const vocab = ref<VocabItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadVocab = async () => {
    try {
      isLoading.value = true
      error.value = null

      const res = await fetch(VOCAB_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      vocab.value = await res.json()
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load vocab'
    } finally {
      isLoading.value = false
    }
  }

  return { vocab, isLoading, error, loadVocab }
  return { vocab, isLoading, error, loadVocab }
}
