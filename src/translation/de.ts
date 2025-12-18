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
    currentVocabCount: 'Aktuelle Vokabelanzahl: {count}',
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
    filterCards: 'Filter',
    shuffleCards: 'Karten mischen',
    activeCards: 'Es sind {count} Karten aktiv',
    markCard: 'markieren',
    unmarkCard: 'Markierung entfernen',
    resetMarked: 'Alle markierten Karten zurücksetzen',
    markedCards: 'Es sind {markedCount} / {allCount} Karten markiert',
    languageOptions: {
      en: 'Englisch',
      de: 'Deutsch',
      es: 'Spanisch',
    },
  },
  components: {
    vocabCard: {
      synonymsLabel: 'Synonyme',
      examplesLabel: 'Beispiele',
    }
  }
}