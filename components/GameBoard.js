import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import Card from './Card';

const ROZMIARY = { '4': [4, 3], '6': [6, 5], '9': [9, 6], '10': [10, 8] };

const losuj = (max) => Math.floor(Math.random() * max);
const numer = (x) => x.toString().padStart(2, "0");

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = 0; i < arr.length * 3; i++) {
    const idx1 = losuj(arr.length);
    const idx2 = losuj(arr.length);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }
  return arr;
};

export default function GameBoard({ settings, currentPlayer, playerNames, scores, onIncrementScore, onSwitchPlayer, onResetGame }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isClickable, setIsClickable] = useState(true);
  const [showMessage, setShowMessage] = useState(null);
  const [remainingPairs, setRemainingPairs] = useState(0);
  const [memory, setMemory] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  const computerMoveInProgress = useRef(false);
  const currentFlippedCards = useRef([]);

  const audioRefs = useRef({});

  const boardSize = ROZMIARY[settings.boardSize];
  const [cols, rows] = boardSize;
  const totalCards = cols * rows;

  // Load sounds
  useEffect(() => {
    const loadSounds = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        audioRefs.current.start = await Audio.Sound.createAsync(require('../assets/sounds/start.mp3'));
        audioRefs.current.uncover = await Audio.Sound.createAsync(require('../assets/sounds/bounce_1.mp3'));
        audioRefs.current.wrong = await Audio.Sound.createAsync(require('../assets/sounds/bounce_2.mp3'));
        audioRefs.current.correct = await Audio.Sound.createAsync(require('../assets/sounds/dog.mp3'));
        audioRefs.current.cheers = await Audio.Sound.createAsync(require('../assets/sounds/cheers.mp3'));

        setSoundsLoaded(true);
      } catch (error) {
        console.error('Error loading sounds:', error);
        setSoundsLoaded(true); // Kontynuuj mimo błędu
      }
    };

    loadSounds();

    return () => {
      Object.values(audioRefs.current).forEach(async (sound) => {
        if (sound?.sound) {
          try {
            await sound.sound.unloadAsync();
          } catch (error) {
            console.error('Error unloading sound:', error);
          }
        }
      });
    };
  }, []);

  const playSound = async (soundName) => {
    try {
      const soundObj = audioRefs.current[soundName];
      if (soundObj?.sound) {
        await soundObj.sound.replayAsync();
      }
    } catch (error) {
      console.error(`Error playing sound ${soundName}:`, error);
    }
  };

  const prepareCards = useCallback(() => {
    const imageNumbers = shuffleArray(Array.from({ length: 40 }, (_, i) => numer(i)));
    const cardValues = [];
    for (let i = 0; i < totalCards / 2; i++) {
      const cardNum = imageNumbers[i];
      cardValues.push(cardNum, cardNum);
    }
    return shuffleArray(cardValues);
  }, [totalCards]);

  useEffect(() => {
    if (!soundsLoaded) return;

    const cardValues = prepareCards();
    const newCards = cardValues.map((value, index) => ({
      id: index,
      value,
      row: Math.floor(index / cols),
      col: index % cols
    }));
    setCards(newCards);
    setRemainingPairs(totalCards / 2);
    playSound('start');

    if (settings.withComputer) {
      const newMemory = Array.from({ length: 40 }, () => []);
      setMemory(newMemory);
      const moves = shuffleArray(newCards.map(card => card.id));
      setPossibleMoves(moves);
    }
  }, [soundsLoaded, prepareCards, totalCards, cols, settings.withComputer]);

  const isComputerTurn = useCallback(() => {
    return settings.withComputer && currentPlayer === 2;
  }, [settings.withComputer, currentPlayer]);

  const endGame = useCallback((finalScores = scores) => {
    playSound('cheers');
    let message;
    if (finalScores.player1 === finalScores.player2) {
      message = 'REMIS !!!';
    } else {
      const winner = finalScores.player1 > finalScores.player2 ? playerNames.player1 : playerNames.player2;
      const koncowka = ['a', 'A'].includes(winner[winner.length - 1]) ? 'a' : '';
      message = `Wygrał${koncowka}\n${winner}`;
    }
    setShowMessage({ type: 'endGame', text: message });
  }, [scores, playerNames]);

  const showPlayerChange = useCallback(() => {
    onSwitchPlayer();
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    setShowMessage({
      type: 'playerChange',
      text: `Teraz\n${playerNames[`player${nextPlayer}`]}`
    });
    setTimeout(() => {
      setShowMessage(null);
      setIsClickable(true);
    }, 1000);
  }, [currentPlayer, playerNames, onSwitchPlayer]);

  const handleCardClick = useCallback((cardId) => {
    if (!isClickable && !isComputerTurn()) return;
    if (currentFlippedCards.current.includes(cardId) || matchedCards.includes(cardId)) return;

    playSound('uncover');
    const card = cards.find(c => c.id === cardId);

    if (settings.withComputer) {
      if (losuj(100) < settings.difficulty) {
        setMemory(prevMemory => {
          const newMemory = [...prevMemory];
          const cardValue = parseInt(card.value);
          if (newMemory[cardValue].length === 0 ||
              (newMemory[cardValue].length === 1 && newMemory[cardValue][0] !== cardId)) {
            newMemory[cardValue].push(cardId);
            setPossibleMoves(prev => prev.filter(id => id !== cardId));
          }
          return newMemory;
        });
      } else if (isComputerTurn()) {
        setPossibleMoves(prev => {
          const newMoves = [...prev];
          const idx = newMoves.indexOf(cardId);
          if (idx === 0 && newMoves.length > 1) {
            const randomIdx = 1 + losuj(newMoves.length - 1);
            [newMoves[0], newMoves[randomIdx]] = [newMoves[randomIdx], newMoves[0]];
          }
          return newMoves;
        });
      }
    }

    if (currentFlippedCards.current.length === 0) {
      currentFlippedCards.current = [cardId];
      setFlippedCards([cardId]);
    } else if (currentFlippedCards.current.length === 1) {
      currentFlippedCards.current = [...currentFlippedCards.current, cardId];
      setFlippedCards(prev => [...prev, cardId]);
      setIsClickable(false);

      setTimeout(() => {
        const firstCardId = currentFlippedCards.current[0];
        const firstCard = cards.find(c => c.id === firstCardId);
        const secondCard = card;

        if (firstCard.value === secondCard.value) {
          playSound('correct');
          setMatchedCards(prev => [...prev, firstCardId, cardId]);
          currentFlippedCards.current = [];
          setFlippedCards([]);
          onIncrementScore(`player${currentPlayer}`);

          const newRemainingPairs = remainingPairs - 1;
          setRemainingPairs(newRemainingPairs);

          if (settings.withComputer) {
            setPossibleMoves(prev => prev.filter(id => id !== firstCardId && id !== cardId));
            setMemory(prevMemory => {
              const newMemory = [...prevMemory];
              newMemory[parseInt(firstCard.value)] = [];
              return newMemory;
            });
          }

          if (newRemainingPairs === 0) {
            const updatedScores = {
              ...scores,
              [`player${currentPlayer}`]: scores[`player${currentPlayer}`] + 1
            };
            endGame(updatedScores);
          } else {
            setIsClickable(true);
          }
        } else {
          playSound('wrong');
          currentFlippedCards.current = [];
          setFlippedCards([]);
          showPlayerChange();
        }
      }, 1000);
    }
  }, [isClickable, isComputerTurn, matchedCards, cards, settings, remainingPairs, currentPlayer, onIncrementScore, endGame, showPlayerChange, scores]);

  useEffect(() => {
    if (isComputerTurn() && isClickable && flippedCards.length === 0 && cards.length > 0 && !computerMoveInProgress.current) {
      computerMoveInProgress.current = true;

      setTimeout(() => {
        const findPairInMemory = () => {
          for (let i = 0; i < 40; i++) {
            if (memory[i] && memory[i].length === 2) {
              return i;
            }
          }
          return -1;
        };

        const findOtherCard = (cardValue, flippedId) => {
          const memEntry = memory[parseInt(cardValue)];
          if (!memEntry || memEntry.length === 0) return -1;
          for (let id of memEntry) {
            if (id !== flippedId) return id;
          }
          return -1;
        };

        const pairCardValue = findPairInMemory();
        if (pairCardValue !== -1 && memory[pairCardValue].length === 2) {
          const ids = [...memory[pairCardValue]];
          handleCardClick(ids[0]);
          setTimeout(() => {
            handleCardClick(ids[1]);
            computerMoveInProgress.current = false;
          }, 1000);
        } else if (possibleMoves.length > 0) {
          const firstCardId = possibleMoves[0];
          const firstCard = cards.find(c => c.id === firstCardId);
          if (firstCard) {
            handleCardClick(firstCardId);
            const otherId = findOtherCard(firstCard.value, firstCardId);
            if (otherId !== -1) {
              setTimeout(() => {
                handleCardClick(otherId);
                computerMoveInProgress.current = false;
              }, 1000);
            } else if (possibleMoves.length > 1) {
              setTimeout(() => {
                handleCardClick(possibleMoves[1]);
                computerMoveInProgress.current = false;
              }, 1000);
            } else {
              computerMoveInProgress.current = false;
            }
          } else {
            computerMoveInProgress.current = false;
          }
        } else {
          computerMoveInProgress.current = false;
        }
      }, 500);
    }
  }, [isComputerTurn, isClickable, flippedCards.length, cards, memory, possibleMoves, handleCardClick]);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Oblicz rozmiar karty biorąc pod uwagę dostępną przestrzeń
  // Odejmujemy header (około 40px) i trochę marginesu
  const availableHeight = screenHeight - 60;
  const availableWidth = screenWidth - 20;

  const cardSizeByWidth = availableWidth / cols;
  const cardSizeByHeight = availableHeight / rows;
  const cardSize = Math.min(cardSizeByWidth, cardSizeByHeight) - 4; // -4 dla marginesów

  return (
    <View style={styles.container}>
      <View style={[styles.board, { width: cols * cardSize }]}>
        {cards.map(card => (
          <View key={card.id} style={{ width: cardSize, height: cardSize }}>
            <Card
              card={card}
              isFlipped={flippedCards.includes(card.id)}
              isMatched={matchedCards.includes(card.id)}
              coverColor={settings.coverColor}
              onCardClick={handleCardClick}
            />
          </View>
        ))}
      </View>

      <Modal
        visible={showMessage !== null}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{showMessage?.text}</Text>
            {showMessage?.type === 'endGame' && (
              <TouchableOpacity style={styles.modalButton} onPress={onResetGame}>
                <Text style={styles.modalButtonText}>Brawo!</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 250,
  },
  modalText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
