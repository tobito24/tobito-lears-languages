import type { MessageSchema } from './schema'

export const en: MessageSchema = {
  ui: {
    appTitle: 'Tobito Learns Languages',
    currentLocale: 'en',
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
    currentColor: 'Current color: {color}',
    test: 'Current Language: EN',
  },
  indexCardLearning: {
    from: 'From:',
    to: 'To:',
    languageOptions: {
      en: 'English',
      de: 'German',
      es: 'Spanish',
    },
  },
}