import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, StatusBar, Text, ActivityIndicator } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useImagePreloader } from './hooks/useImagePreloader';
import { useSoundPreloader } from './hooks/useSoundPreloader';
import { t } from './i18n';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import GameBoard from './components/GameBoard';

const STORAGE_KEY = '@player_names';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerNames, setPlayerNames] = useState({ player1: 'Ignaś', player2: 'Tato' });
  const [namesLoaded, setNamesLoaded] = useState(false);
  const imagesLoaded = useImagePreloader();
  const { soundsLoaded, audioRefs, unmuteSounds } = useSoundPreloader();

  // Wykryj typ urządzenia: smartfon = portrait, inne = landscape
  const isPhone = Device.deviceType === Device.DeviceType.PHONE;
  // const isPhone = false; // do testów w emulatorze

  // Odczytaj zapisane imiona graczy przy starcie aplikacji
  useEffect(() => {
    async function loadPlayerNames() {
      try {
        const savedNames = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedNames !== null) {
          const names = JSON.parse(savedNames);
          setPlayerNames(names);
        }
      } catch (error) {
        console.error('Error loading player names:', error);
      } finally {
        setNamesLoaded(true);
      }
    }
    loadPlayerNames();
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
  }, [isPhone]);

  const startGame = async (settings) => {
    const names = { player1: settings.player1Name, player2: settings.player2Name };

    // Zapisz imiona graczy
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(names));
    } catch (error) {
      console.error('Error saving player names:', error);
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

  if (!imagesLoaded || !soundsLoaded || !namesLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>{t('loadingGame')}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/images/dark_green_1.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <Header
        playerNames={playerNames}
        scores={scores}
        currentPlayer={currentPlayer}
        isPhone={isPhone}
      />
      {!gameStarted ? (
        <WelcomeScreen
          onStartGame={startGame}
          previousSettings={gameSettings}
          playerNames={playerNames}
          isPhone={isPhone}
          unmuteSounds={unmuteSounds}
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
          soundsLoaded={soundsLoaded}
          audioRefs={audioRefs}
        />
      )}
    </ImageBackground>
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
