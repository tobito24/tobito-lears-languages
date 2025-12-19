import type { MessageSchema } from './schema'

export const en: MessageSchema = {
  ui: {
    appTitle: 'Tobito Learns Languages',
    currentLocale: 'en',
    navigation: {
      home: 'Home',
      learn: 'Learn',
      games: 'Games',
      settings: 'Settings',
    }
  },
  home: {
    welcomeMessage: 'Welcome to Tobito Learns Languages!',
    getStartedMessage: 'Get started learning new vocab now.',
    currentVocabCount: 'Current vocab count: {count}',
    loadingVocab: 'Loading vocab…',
    errorLoadingVocab: 'Error loading vocab: {msg}',
  },
  settings: {
    title: 'Settings',
    colorPicker: 'Choose your favorite color:',
    languageLabel: 'Select Language (App):',
    languageOptions: {
      en: 'English',
      de: 'German',
    }
  },
  indexCardLearning: {
    from: 'From:',
    to: 'To:',
    loadingCards: 'Loading cards…',
    errorLoadingCards: 'Error loading cards: {msg}',
    noActiveCards: 'No active cards, please adjust your filters.',
    activeCards: 'There are {count} active cards',
    markedCards: 'There are {markedCount} / {allCount} marked cards',
    languageOptions: {
      en: 'English',
      de: 'German',
      es: 'Spanish',
    },
  },
  components: {
    vocabCard: {
      synonymsLabel: 'Synonyms',
      examplesLabel: 'Examples',
    }
  }
}