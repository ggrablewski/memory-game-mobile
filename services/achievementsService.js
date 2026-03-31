import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACHIEVEMENTS } from '../constants/achievements';

const STORAGE_KEY = '@achievements';

/**
 * Odczytaj odblokowane osiągnięcia z AsyncStorage
 * @returns {Promise<Array<string>>} Tablica ID odblokowanych osiągnięć
 */
export const getUnlockedAchievements = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading achievements:', error);
    return [];
  }
};

/**
 * Zapisz odblokowane osiągnięcia do AsyncStorage
 * @param {Array<string>} unlockedIds - Tablica ID odblokowanych osiągnięć
 */
export const saveUnlockedAchievements = async (unlockedIds) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedIds));
  } catch (error) {
    console.error('Error saving achievements:', error);
  }
};

/**
 * Odblokuj pojedyncze osiągnięcie
 * @param {string} achievementId - ID osiągnięcia do odblokowania
 * @returns {Promise<boolean>} true jeśli osiągnięcie zostało właśnie odblokowane, false jeśli było już odblokowane
 */
export const unlockAchievement = async (achievementId) => {
  try {
    const unlocked = await getUnlockedAchievements();

    // Sprawdź czy osiągnięcie już nie jest odblokowane
    if (unlocked.includes(achievementId)) {
      return false; // Już było odblokowane
    }

    // Dodaj nowe osiągnięcie
    const updated = [...unlocked, achievementId];
    await saveUnlockedAchievements(updated);

    return true; // Świeżo odblokowane
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return false;
  }
};

/**
 * Sprawdź czy osiągnięcie jest odblokowane
 * @param {string} achievementId - ID osiągnięcia
 * @returns {Promise<boolean>} true jeśli odblokowane
 */
export const isAchievementUnlocked = async (achievementId) => {
  const unlocked = await getUnlockedAchievements();
  return unlocked.includes(achievementId);
};

/**
 * Sprawdź wszystkie osiągnięcia po zakończeniu gry
 * @param {Object} settings - Ustawienia gry
 * @param {string} winner - 'player1' lub 'player2'
 * @returns {Promise<Array<Object>>} Tablica nowo odblokowanych osiągnięć
 */
export const checkAchievements = async (settings, winner) => {
  const newlyUnlocked = [];

  for (const achievement of ACHIEVEMENTS) {
    // Sprawdź czy warunek osiągnięcia jest spełniony
    if (achievement.check(settings, winner)) {
      const wasUnlocked = await unlockAchievement(achievement.id);

      // Jeśli osiągnięcie zostało właśnie odblokowane (nie było wcześniej)
      if (wasUnlocked) {
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
};

/**
 * Pobierz statystyki osiągnięć
 * @returns {Promise<Object>} Obiekt ze statystykami
 */
export const getAchievementStats = async () => {
  const unlocked = await getUnlockedAchievements();
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = unlocked.length;

  // Oblicz łączne punkty
  const earnedPoints = ACHIEVEMENTS
    .filter(a => unlocked.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);

  const totalPoints = ACHIEVEMENTS.reduce((sum, a) => sum + a.points, 0);

  return {
    unlockedCount,
    totalAchievements,
    earnedPoints,
    totalPoints,
    progress: Math.round((unlockedCount / totalAchievements) * 100)
  };
};

/**
 * Resetuj wszystkie osiągnięcia (do celów testowych)
 */
export const resetAchievements = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting achievements:', error);
  }
};
