// Definicje osiągnięć w grze
export const ACHIEVEMENTS = [
  {
    id: 'beat_mikolajek_5x6',
    titleKey: 'achievement_beat_mikolajek_5x6_title',
    descriptionKey: 'achievement_beat_mikolajek_5x6_desc',
    icon: '🏆',
    points: 10,
    // Warunek: Pokonaj Mikołajka (difficulty 50-59) na planszy 5×6
    check: (settings, winner) =>
      winner === 'player1' &&
      settings.withComputer &&
      settings.difficulty >= 50 &&
      settings.difficulty < 60 &&
      settings.boardSize === '6'
  },
  {
    id: 'beat_kaczka_5x6',
    titleKey: 'achievement_beat_kaczka_5x6_title',
    descriptionKey: 'achievement_beat_kaczka_5x6_desc',
    icon: '🦆',
    points: 20,
    // Warunek: Pokonaj Kaczkę Katastrofę (difficulty 70-79) na planszy 5×6
    check: (settings, winner) =>
      winner === 'player1' &&
      settings.withComputer &&
      settings.difficulty >= 70 &&
      settings.difficulty < 80 &&
      settings.boardSize === '6'
  },
  {
    id: 'beat_kuleczka_4x5',
    titleKey: 'achievement_beat_kuleczka_4x5_title',
    descriptionKey: 'achievement_beat_kuleczka_4x5_desc',
    icon: '⚽',
    points: 30,
    // Warunek: Pokonaj Pana Kuleczkę (difficulty 90-99) na planszy 4×5
    check: (settings, winner) =>
      winner === 'player1' &&
      settings.withComputer &&
      settings.difficulty >= 90 &&
      settings.boardSize === '5'
  },
  {
    id: 'beat_kuleczka_5x6',
    titleKey: 'achievement_beat_kuleczka_5x6_title',
    descriptionKey: 'achievement_beat_kuleczka_5x6_desc',
    icon: '🎯',
    points: 40,
    // Warunek: Pokonaj Pana Kuleczkę (difficulty 90-99) na planszy 5×6
    check: (settings, winner) =>
      winner === 'player1' &&
      settings.withComputer &&
      settings.difficulty >= 90 &&
      settings.boardSize === '6'
  },
  {
    id: 'beat_mikolajek_6x9',
    titleKey: 'achievement_beat_mikolajek_6x9_title',
    descriptionKey: 'achievement_beat_mikolajek_6x9_desc',
    icon: '🌟',
    points: 25,
    // Warunek: Pokonaj Mikołajka (difficulty 50-59) na planszy 6×9
    check: (settings, winner) =>
      winner === 'player1' &&
      settings.withComputer &&
      settings.difficulty >= 50 &&
      settings.difficulty < 60 &&
      settings.boardSize === '9'
  },
  {
    id: 'beat_mikolajek_8x10',
    titleKey: 'achievement_beat_mikolajek_8x10_title',
    descriptionKey: 'achievement_beat_mikolajek_8x10_desc',
    icon: '💪',
    points: 35,
    // Warunek: Pokonaj Mikołajka (difficulty 50-59) na planszy 8×10
    check: (settings, winner) =>
      winner === 'player1' &&
      settings.withComputer &&
      settings.difficulty >= 50 &&
      settings.difficulty < 60 &&
      settings.boardSize === '10'
  },
  {
    id: 'beat_kuleczka_5x6_art',
    titleKey: 'achievement_beat_kuleczka_5x6_art_title',
    descriptionKey: 'achievement_beat_kuleczka_5x6_art_desc',
    icon: '🎨',
    points: 50,
    // Warunek: Pokonaj Pana Kuleczkę (difficulty 90-99) na planszy 5×6 w talii artystycznej
    check: (settings, winner) =>
      winner === 'player1' &&
      settings.withComputer &&
      settings.difficulty >= 90 &&
      settings.boardSize === '6' &&
      settings.deckType === 'art'
  }
];

// Oblicz łączną liczbę punktów ze wszystkich osiągnięć
export const getTotalPoints = () => {
  return ACHIEVEMENTS.reduce((sum, achievement) => sum + achievement.points, 0);
};

// Znajdź osiągnięcie po ID
export const getAchievementById = (id) => {
  return ACHIEVEMENTS.find(achievement => achievement.id === id);
};
