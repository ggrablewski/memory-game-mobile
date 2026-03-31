import * as Localization from 'expo-localization';

const translations = {
  pl: {
    players: 'Gracze',
    player1Name: 'Imię gracza 1',
    player2Name: 'Imię gracza 2',
    boardSize: 'Rozmiar planszy',
    coverColor: 'Kolor okładki',
    deckType: 'Talia',
    computerPlayer: 'Gracz Komputer',
    playWithComputer: 'Gram z komputerem',
    difficultyLevel: 'Poziom trudności',
    soundFx: 'Dźwięki',
    turnedOn: 'Włączone',
    turnedOff: 'Wyłączone',
    now: 'Teraz',
    winnerM: 'Wygrał',
    winnerF: 'Wygrała',
    draw: 'REMIS !!!',
    loadingGame: 'Ładowanie gry...',
    startButton: 'Zaczynamy!',
    congrats: 'Brawo!',
    escape: 'Koniec',
    // Osiągnięcia
    achievements: 'Osiągnięcia',
    points: 'pkt',
    close: 'Zamknij',
    achievementUnlocked: 'Osiągnięcie odblokowane!',
    // Tytuły osiągnięć
    achievement_beat_mikolajek_5x6_title: 'Zwycięstwo nad Mikołajkiem',
    achievement_beat_mikolajek_5x6_desc: 'Pokonaj Mikołajka na planszy 5×6',
    achievement_beat_kaczka_5x6_title: 'Pokonaj Kaczkę Katastrofę',
    achievement_beat_kaczka_5x6_desc: 'Pokonaj Kaczkę Katastrofę na planszy 5×6',
    achievement_beat_kuleczka_4x5_title: 'Mistrz małej planszy',
    achievement_beat_kuleczka_4x5_desc: 'Pokonaj Pana Kuleczkę na planszy 4×5',
    achievement_beat_kuleczka_5x6_title: 'Mistrz średniej planszy',
    achievement_beat_kuleczka_5x6_desc: 'Pokonaj Pana Kuleczkę na planszy 5×6',
    achievement_beat_mikolajek_6x9_title: 'Mistrz dużej planszy',
    achievement_beat_mikolajek_6x9_desc: 'Pokonaj Mikołajka na planszy 6×9',
    achievement_beat_mikolajek_8x10_title: 'Mistrz gigantycznej planszy',
    achievement_beat_mikolajek_8x10_desc: 'Pokonaj Mikołajka na planszy 8×10',
    achievement_beat_kuleczka_5x6_art_title: 'Mistrz sztuki',
    achievement_beat_kuleczka_5x6_art_desc: 'Pokonaj Pana Kuleczkę na planszy 5×6 w talii artystycznej',
  },
  de: {
    players: 'Spieler',
    player1Name: 'Spieler\'in 1 Name',
    player2Name: 'Spieler\'in 2 Name',
    boardSize: 'Spielfeldgröße',
    coverColor: 'Deckfarbe',
    deckType: 'Deck',
    computerPlayer: 'Computergegner',
    playWithComputer: 'Spiele gegen den Computer',
    difficultyLevel: 'Schwierigkeit',
    soundFx: 'Klänge',
    turnedOn: 'Eingeschaltet',
    turnedOff: 'Ausgeschaltet',
    now: 'Jetzt',
    winnerM: 'Der Sieger ist',
    winnerF: 'Die Siegerin ist',
    draw: 'Unentschieden !!!',
    loadingGame: 'Wird geladen...',
    startButton: 'Fangen wir an!',
    congrats: 'Bravo!',
    escape: 'Zurück',
  },
  bg: {
    players: 'Играчи',
    player1Name: 'Име на играч 1',
    player2Name: 'Име на играч 2',
    boardSize: 'Размер на дъската',
    coverColor: 'Цвят на корицата',
    deckType: 'Карти',
    computerPlayer: 'Компютър играч',
    playWithComputer: 'Играя си с компютъра',
    difficultyLevel: 'Ниво на трудност',
    soundFx: 'Звук',
    turnedOn: 'Активирано',
    turnedOff: 'Деактивирано',
    now: 'Сега',
    winnerM: 'Спечелил',
    winnerF: 'Спечелила',
    draw: 'РАВЕН !!!',
    loadingGame: 'Играта се зарежда...',
    startButton: 'Ето го!',
    congrats: 'Браво!',
    escape: 'Край',
  },
  ru: {
    players: 'Игроки',
    player1Name: 'Имя игрока 1',
    player2Name: 'Имя игрока 2',
    boardSize: 'Размер совета',
    coverColor: 'Цвет обложки',
    deckType: 'Колода',
    computerPlayer: 'Игрок-компьютер',
    playWithComputer: 'Я играю с компьютером',
    difficultyLevel: 'Уровень сложности',
    soundFx: 'Звуки',
    turnedOn: 'Включены',
    turnedOff: 'Выключены',
    now: 'Сейчас',
    winnerM: 'Победил',
    winnerF: 'Победила',
    draw: 'НИЧЬЯ !!!',
    loadingGame: 'Загрузка игры...',
    startButton: 'Начнём!',
    congrats: 'Браво!',
    escape: 'Конец',
  },
  uk: {
    players: 'Гравці',
    player1Name: 'Ім\'я гравця 1',
    player2Name: 'Ім\'я гравця 2',
    boardSize: 'Розмір дошки',
    coverColor: 'Колір обкладинки',
    deckType: 'Колода',
    computerPlayer: 'Гравець комп\'ютер',
    playWithComputer: 'Граю з комп\'ютером',
    difficultyLevel: 'Рівень складності',
    soundFx: 'Звуки',
    turnedOn: 'Увімкнено',
    turnedOff: 'Вимкнено',
    now: 'Зараз',
    winnerM: 'Переміг',
    winnerF: 'Перемогла',
    draw: 'НІЧИЯ !!!',
    loadingGame: 'Завантаження гри...',
    startButton: 'Почнемо!',
    congrats: 'Браво!',
    escape: 'Кінець',
  },
  el: {
    players: 'Παίκτες',
    player1Name: 'Όνομα παίκτη 1',
    player2Name: 'Όνομα παίκτη 2',
    boardSize: 'Μέγεθος πίνακα',
    coverColor: 'Χρώμα εξωφύλλου',
    deckType: 'Τράπουλα',
    computerPlayer: 'Παίκτης υπολογιστών',
    playWithComputer: 'Παίζω εναντίον του υπολογιστή',
    difficultyLevel: 'Επίπεδο δυσκολίας',
    soundFx: 'Ήχοι',
    turnedOn: 'Ενεργοποιημένοι',
    turnedOff: 'Απενεργοποιημένοι',
    now: 'Τώρα',
    winnerM: 'Νικητής είναι ο',
    winnerF: 'Νικητής είναι η',
    draw: 'ΙΣΟΠΑΛΊΑ !!!',
    loadingGame: 'Φόρτωση παιχνιδιού...',
    startButton: 'Ας ξεκινήσουμε!',
    congrats: 'Μπράβο!',
    escape: 'Έξοδος',
  },
  ko: {
    players: '참가자',
    player1Name: '참가자 이름 1',
    player2Name: '참가자 이름 2',
    boardSize: '보드 크기',
    coverColor: '표지 색상',
    deckType: '덱',
    computerPlayer: '컴퓨터 플레이어',
    playWithComputer: '컴퓨터와 시합하기',
    difficultyLevel: '난이도',
    soundFx: '소리',
    turnedOn: '켜짐',
    turnedOff: '꺼짐',
    now: '지금',
    winnerM: '승자',
    winnerF: '승자',
    draw: '무승부 !!!',
    loadingGame: '게임 로딩 중...',
    startButton: '시작!',
    congrats: '축하합니다!',
    escape: '종료하기',
  },
  ja: {
    players: 'プレイヤー',
    player1Name: 'プレイヤー1の名前',
    player2Name: 'プレイヤー2の名前',
    boardSize: 'ボードのサイズ',
    coverColor: '表紙の色',
    deckType: 'デッキ',
    computerPlayer: 'コンピュータプレーヤー',
    playWithComputer: '私はコンピュータと遊ます',
    difficultyLevel: '難易度',
    soundFx: '音',
    turnedOn: 'オン',
    turnedOff: 'オフ',
    now: '今',
    winnerM: '勝者',
    winnerF: '勝者',
    draw: '引き分け !!!',
    loadingGame: 'ゲームをロード中...',
    startButton: '始めましょう！',
    congrats: 'おめでとう！',
    escape: '終わり',
  },
  en: {
    players: 'Players',
    player1Name: 'Player 1 name',
    player2Name: 'Player 2 name',
    boardSize: 'Board size',
    coverColor: 'Cover color',
    deckType: 'Deck',
    computerPlayer: 'Computer player',
    playWithComputer: 'Play against computer',
    difficultyLevel: 'Difficulty level',
    soundFx: 'Sound FX',
    turnedOn: 'On',
    turnedOff: 'Off',
    now: 'Now',
    winnerM: 'The winner is',
    winnerF: 'The winner is',
    draw: 'That\'s a DRAW !!!',
    loadingGame: 'Loading game...',
    startButton: 'Let\'s start!',
    congrats: 'Congratulations!',
    escape: 'Exit',
    // Achievements
    achievements: 'Achievements',
    points: 'pts',
    close: 'Close',
    achievementUnlocked: 'Achievement Unlocked!',
    // Achievement titles
    achievement_beat_mikolajek_5x6_title: 'Victory over Mikołajek',
    achievement_beat_mikolajek_5x6_desc: 'Beat Mikołajek on 5×6 board',
    achievement_beat_kaczka_5x6_title: 'Beat Kaczka Katastrofa',
    achievement_beat_kaczka_5x6_desc: 'Beat Kaczka Katastrofa on 5×6 board',
    achievement_beat_kuleczka_4x5_title: 'Small Board Master',
    achievement_beat_kuleczka_4x5_desc: 'Beat Pan Kuleczka on 4×5 board',
    achievement_beat_kuleczka_5x6_title: 'Medium Board Master',
    achievement_beat_kuleczka_5x6_desc: 'Beat Pan Kuleczka on 5×6 board',
    achievement_beat_mikolajek_6x9_title: 'Large Board Master',
    achievement_beat_mikolajek_6x9_desc: 'Beat Mikołajek on 6×9 board',
    achievement_beat_mikolajek_8x10_title: 'Giant Board Master',
    achievement_beat_mikolajek_8x10_desc: 'Beat Mikołajek on 8×10 board',
    achievement_beat_kuleczka_5x6_art_title: 'Art Master',
    achievement_beat_kuleczka_5x6_art_desc: 'Beat Pan Kuleczka on 5×6 board with artistic deck',
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
    console.warn('Error getting device language: ', error);
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
    case 'bg':
      return 'bg';
    case 'ru':
      return 'ru';
    case 'uk':
      return 'uk';
    case 'el':
      return 'el';
    case 'ko':
      return 'ko';
    case 'ja':
      return 'ja';
    default:
      return 'en';
  }
};

const currentLanguage = getCurrentLanguage();

// Funkcja pomocnicza do pobierania tłumaczeń
export const t = (key) => translations[currentLanguage][key] || key;