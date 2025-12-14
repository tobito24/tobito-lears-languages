import type { MessageSchema } from './schema'

export const de: MessageSchema = {
  ui: {
    appTitle: 'Tobito lernt Sprachen',
    currentLocale: 'de',
  },
  home: {
    welcomeMessage: 'Willkommen bei Tobito lernt Sprachen!',
    getStartedMessage: 'Beginne jetzt mit dem Lernen neuer Vokabeln.',
    currentVocabCount: 'Aktuellee Vokabelanzahl: {count}',
    loadingVocab: 'Lade Vokabeln…',
    errorLoadingVocab: 'Fehler beim Laden der Vokabeln: {msg}',
  },
  settings: {
    title: 'Einstellungen',
    colorPicker: 'Wähle deine Lieblingsfarbe:',
    currentColor: 'Aktuelle Farbe: {color}',
    test: 'Aktuelle Sprache: DE',
  },
  indexCardLearning: {
    from: 'Von:',
    to: 'Zu:',
    languageOptions: {
      en: 'Englisch',
      de: 'Deutsch',
      es: 'Spanisch',
    },
  },
}