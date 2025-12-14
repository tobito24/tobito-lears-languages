import type IndexCardLearning from "@/views/index-card-learning.vue"

export type MessageSchema = {
  ui: {
    appTitle: string,
    currentLocale: string,
    navigation: {
      home: string,
      learn: string,
      games: string,
      settings: string,
    }
  },
  home: {
    welcomeMessage: string,
    getStartedMessage: string,
    currentVocabCount: string,
    loadingVocab: string,
    errorLoadingVocab: string,
  },
  settings: {
    title: string,
    colorPicker: string,
    languageLabel: string,
    languageOptions: {
      en: string
      de: string
    }
  },
  indexCardLearning: {
    from: string,
    to: string,
    shuffleCards: string,
    activeCards: string,
    languageOptions: {
      en: string,
      de: string,
      es: string,
    }
  }
}