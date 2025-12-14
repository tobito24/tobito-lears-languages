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
    shuffleCards: 'Shuffle Cards',
    activeCards: 'There are {count} active cards',
    languageOptions: {
      en: 'English',
      de: 'German',
      es: 'Spanish',
    },
  },
}