import * as Localization from 'expo-localization';

const translations = {
  pl: {
    players: 'Gracze',
    player1Name: 'Imię gracza 1',
    player2Name: 'Imię gracza 2',
    boardSize: 'Rozmiar planszy',
    coverColor: 'Kolor okładki',
    computerPlayer: 'Gracz Komputer',
    playWithComputer: 'Gram z komputerem',
    difficultyLevel: 'Poziom trudności',
    now: 'Teraz',
    winnerM: 'Wygrał',
    winnerF: 'Wygrała',
    draw: 'REMIS !!!',
    loadingGame: 'Ładowanie gry...',
    startButton: 'Zaczynamy!',
    congrats: 'Brawo!',
    escape: 'Koniec',
  },
  de: {
    players: 'Spieler',
    player1Name: 'Spieler\'in 1 Name',
    player2Name: 'Spieler\'in 2 Name',
    boardSize: 'Spielfeldgröße',
    coverColor: 'Deckfarbe',
    computerPlayer: 'Computergegner',
    playWithComputer: 'Spiele gegen den Computer',
    difficultyLevel: 'Schwierigkeit',
    now: 'Der nächste Spieler\'in ist',
    winnerM: 'Der Sieger ist',
    winnerF: 'Die Siegerin ist',
    draw: 'Unentschieden !!!',
    loadingGame: 'Wird geladen...',
    startButton: 'Fangen wir an!',
    congrats: 'Bravo!',
    escape: 'Zurück',
  },
  en: {
    players: 'Players',
    player1Name: 'Player 1 name',
    player2Name: 'Player 2 name',
    boardSize: 'Board size',
    coverColor: 'Cover color',
    computerPlayer: 'Computer player',
    playWithComputer: 'Play against computer',
    difficultyLevel: 'Difficulty level',
    now: 'The next player is',
    winnerM: 'The winner is',
    winnerF: 'The winner is',
    draw: 'That\'s a DRAW !!!',
    loadingGame: 'Loading game...',
    startButton: 'Let\'s start!',
    congrats: 'Congratulations!',
    escape: 'Escape',
  }
};

// Automatyczne wykrycie języka urządzenia
const getDeviceLanguage = () => {
  try {
    // Próbujemy pobrać lokalizację z getLocales() (nowsza metoda)
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
      return locales[0].languageCode;
    }
    // Fallback na starą metodę
    if (Localization.locale) {
      return Localization.locale?.split('-')[0] || 'en';
    }
  } catch (error) {
    console.warn('Error getting device language:', error);
    return 'en'; // Domyślny język jeśli nic nie zadziała
  }
};

const deviceLanguage = getDeviceLanguage();

const getCurrentLanguage = () => {
  switch (deviceLanguage) {
    case 'pl':
      return 'pl';
    case 'de':
      return 'de';
    default:
      return 'en';
  }
};

const currentLanguage = getCurrentLanguage();

// Funkcja pomocnicza do pobierania tłumaczeń
export const t = (key) => translations[currentLanguage][key] || key;