import type { MessageSchema } from './schema'

export const de: MessageSchema = {
  ui: {
    appTitle: 'Tobito lernt Sprachen',
    currentLocale: 'de',
    navigation: {
      home: 'Startseite',
      learn: 'Lernen',
      games: 'Spiele',
      settings: 'Einstellungen',
    }
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
    languageLabel: 'Sprache auswählen (App):',
    languageOptions: {
      en: 'Englisch',
      de: 'Deutsch',
    }

  },
  indexCardLearning: {
    from: 'Von:',
    to: 'Zu:',
    shuffleCards: 'Karten mischen',
    activeCards: 'Es sind {count} Karten aktiv',
    languageOptions: {
      en: 'Englisch',
      de: 'Deutsch',
      es: 'Spanisch',
    },
  },
}