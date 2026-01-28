import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, StatusBar, Text, ActivityIndicator } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useImagePreloader } from './hooks/useImagePreloader';
import { useSoundPreloader } from './hooks/useSoundPreloader';
import { t } from './i18n';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import GameBoard from './components/GameBoard';

const STORAGE_KEY = '@game_settings';
const OLD_STORAGE_KEY = '@player_names'; // dla wstecznej kompatybilności

function AppContent() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerNames, setPlayerNames] = useState({ player1: 'Ignaś', player2: 'Tato' });
  const [savedSettings, setSavedSettings] = useState(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const imagesLoaded = useImagePreloader(); // Ładuje menu + WSZYSTKIE talie kart
  const { soundsLoaded, audioRefs, unmuteSounds } = useSoundPreloader();

  // Wykryj typ urządzenia: smartfon = portrait, inne = landscape
  const isPhone = Device.deviceType === Device.DeviceType.PHONE;
  // const isPhone = false; // do testów w emulatorze
  const insets = useSafeAreaInsets();
  // insets.top = 30; // Test
  // insets.bottom = 100; // Test

  // Odczytaj zapisane ustawienia przy starcie aplikacji
  useEffect(() => {
    async function loadSettings() {
      try {
        // Spróbuj odczytać nowe ustawienia
        let savedData = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedData !== null) {
          const settings = JSON.parse(savedData);
          // settings.oldDeckEnabled = true; // do testów
          setSavedSettings(settings);
          setPlayerNames({ player1: settings.player1, player2: settings.player2 });
        } else {
          // Sprawdź stare ustawienia (tylko imiona) dla wstecznej kompatybilności
          const oldNames = await AsyncStorage.getItem(OLD_STORAGE_KEY);
          if (oldNames !== null) {
            const names = JSON.parse(oldNames);
            setPlayerNames(names);
            // Utwórz savedSettings z domyślnymi wartościami i starymi imionami
            setSavedSettings({
              player1: names.player1,
              player2: names.player2,
              boardSize: '4',
              coverColor: 'red',
              deckType: 'fv',
              withComputer: false,
              difficulty: 51,
              oldDeckEnabled: false
            });
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setSettingsLoaded(true);
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    async function setOrientation() {
      if (isPhone) {
        // Smartfon: portrait
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } else {
        // Tablet/inne: landscape
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    }
    setOrientation();
  }, []);

  const startGame = async (settings) => {
    const names = { player1: settings.player1Name, player2: settings.player2Name };

    // Zapisz wszystkie ustawienia gry
    try {
      const settingsToSave = {
        player1: settings.player1Name,
        player2: settings.humanName, // Zawsze zapisuj humanName (imię gracza 2 jako człowieka)
        boardSize: settings.boardSize,
        coverColor: settings.coverColor,
        deckType: settings.deckType,
        withComputer: settings.withComputer,
        difficulty: settings.difficulty,
        oldDeckEnabled: settings.oldDeckEnabled || shouldEnable(settings) // dla wstecznej kompatybilności
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
      setSavedSettings(settingsToSave);
    } catch (error) {
      console.error('Error saving game settings:', error);
    }

    setGameSettings(settings);
    setPlayerNames(names);
    setScores({ player1: 0, player2: 0 });
    setCurrentPlayer(1);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setScores({ player1: 0, player2: 0 });
    setCurrentPlayer(1);
    // Nie resetujemy deckType - karty są już załadowane i mogą być reużyte
  };

  const incrementScore = (player) => {
    setScores(prev => ({
      ...prev,
      [player]: prev[player] + 1
    }));
  };

  const switchPlayer = () => {
    const newPlayer = 3 - currentPlayer;
    setCurrentPlayer(newPlayer);
    return newPlayer;
  };

  const shouldEnable = (settings) => {
    const name1 = settings.player1Name.split(' ');
    const name2 = settings.humanName.split(' ');
    return name1.length > 1 &&name1[0] === 'Ignacy' && name1[1] === '#unlock' &&
           name2.length > 1 && name2[0] === 'Tatuś' && name2[1] === '#deck' &&
           settings.withComputer;
  }

  if (!imagesLoaded || !soundsLoaded || !settingsLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>{t('loadingGame')}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/images/dark_green_2.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <Header
        playerNames={playerNames}
        scores={scores}
        currentPlayer={currentPlayer}
        gameStarted={gameStarted}
        isPhone={isPhone}
        topCutout={insets.top}
      />
      {!gameStarted ? (
        <WelcomeScreen
          onStartGame={startGame}
          previousSettings={gameSettings}
          savedSettings={savedSettings}
          playerNames={playerNames}
          isPhone={isPhone}
          unmuteSounds={unmuteSounds}
          cutout={insets}
        />
      ) : (
        <GameBoard
          settings={gameSettings}
          currentPlayer={currentPlayer}
          playerNames={playerNames}
          scores={scores}
          onIncrementScore={incrementScore}
          onSwitchPlayer={switchPlayer}
          onResetGame={resetGame}
          isPhone={isPhone}
          audioRefs={audioRefs}
          cutout={insets}
        />
      )}
    </ImageBackground>
  );
}

// Główny komponent App z SafeAreaProvider
export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a4d2e',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
});
