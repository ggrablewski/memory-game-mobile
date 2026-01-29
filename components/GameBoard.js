import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { t } from '../i18n';
import Card from './Card';

const ROZMIARY_PORTRAIT = { '4': [3, 4], '6': [5, 6], '9': [6, 9], '10': [8, 10] };
const ROZMIARY_LANDSCAPE = { '4': [4, 3], '6': [6, 5], '9': [9, 6], '10': [10, 8] };

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

export default function GameBoard({ settings, currentPlayer, playerNames, scores, onIncrementScore, onSwitchPlayer, onResetGame, isPhone, audioRefs, cutout }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isClickable, setIsClickable] = useState(true);
  const [showMessage, setShowMessage] = useState(null);
  const [remainingPairs, setRemainingPairs] = useState(0);
  const [memory, setMemory] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [showAllCards, setShowAllCards] = useState(false);
  const computerMoveInProgress = useRef(false);
  const currentFlippedCards = useRef([]);

  // Wybierz rozmiary w zależności od typu urządzenia
  const ROZMIARY = isPhone ? ROZMIARY_PORTRAIT : ROZMIARY_LANDSCAPE;
  const boardSize = ROZMIARY[settings.boardSize];
  const [cols, rows] = boardSize;
  const totalCards = cols * rows;

  const playSound = async (soundName) => {
    try {
      const soundObj = audioRefs[soundName];
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

    // Pokaż który gracz zaczyna (bez zmiany gracza)
    showPlayerMessage(currentPlayer);

    if (settings.withComputer) {
      const newMemory = Array.from({ length: 40 }, () => []);
      setMemory(newMemory);
      const moves = shuffleArray(newCards.map(card => card.id));
      setPossibleMoves(moves);
    }
  }, []); // Uruchom tylko raz przy montowaniu - wszystkie wartości są stałe dla danej gry

  const isComputerTurn = useCallback(() => {
    return settings.withComputer && currentPlayer === 2;
  }, [settings.withComputer, currentPlayer]);

  const endGame = useCallback((finalScores = scores) => {
    playSound('cheers');

    // Odkryj wszystkie karty
    setShowAllCards(true);

    let message;
    if (finalScores.player1 === finalScores.player2) {
      message = t('draw');
    } else {
      const winner = finalScores.player1 > finalScores.player2 ? playerNames.player1 : playerNames.player2;
      const firstWord = winner.split(' ')[0];
      const koncowka = ['a', 'A'].includes(firstWord[firstWord.length - 1]) ? 'a' : '';
      const winnerText = koncowka === 'a' ? t('winnerF') : t('winnerM');
      message = `${winnerText}\n${winner}`;
    }

    // Pokaż odkryte karty przez 3 sekundy, potem wyświetl modal z wynikiem
    setTimeout(() => {
      setShowMessage({ type: 'endGame', text: message });
    }, 3000);
  }, [scores, playerNames]);

  const showPlayerMessage = useCallback((player) => {
    setShowMessage({
      type: 'playerChange',
      text: `${t('now')}\n${playerNames[`player${player}`]}`
    });
    setTimeout(() => {
      setShowMessage(null);
      setIsClickable(true);
    }, 1000);
  }, [playerNames]);

  const showPlayerChange = useCallback(() => {
    const newPlayer = onSwitchPlayer(); // Zmień gracza i pobierz nową wartość
    showPlayerMessage(newPlayer);
  }, [onSwitchPlayer, showPlayerMessage]);

  const handleCardClick = useCallback((cardId, isComputerMove = false) => {
    // Blokuj kliknięcia użytkownika podczas komunikatu lub ruchu komputera
    // Ale pozwól komputerowi wykonać ruch
    if (!isComputerMove && (showMessage !== null || isComputerTurn())) {
      return;
    }

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
  }, [isClickable, isComputerTurn, matchedCards, cards, settings, remainingPairs, currentPlayer, onIncrementScore, endGame, showPlayerChange, scores, showMessage]);

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
          handleCardClick(ids[0], true);
          setTimeout(() => {
            handleCardClick(ids[1], true);
            computerMoveInProgress.current = false;
          }, 1000);
        } else if (possibleMoves.length > 0) {
          const firstCardId = possibleMoves[0];
          const firstCard = cards.find(c => c.id === firstCardId);
          if (firstCard) {
            handleCardClick(firstCardId, true);
            const otherId = findOtherCard(firstCard.value, firstCardId);
            if (otherId !== -1) {
              setTimeout(() => {
                handleCardClick(otherId, true);
                computerMoveInProgress.current = false;
              }, 1000);
            } else if (possibleMoves.length > 1) {
              setTimeout(() => {
                handleCardClick(possibleMoves[1], true);
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

  const screenWidth = Dimensions.get('window').width - cutout.left - cutout.right;
  const screenHeight = Dimensions.get('window').height - cutout.top - cutout.bottom;

  // Oblicz rozmiar karty biorąc pod uwagę dostępną przestrzeń
  // Nagłówek ma wysokość około 130px (2x imiona + wynik + marginesy 2x większe)
  const headerHeight = cutout.top + 100;
  const returnButtonHeight = isPhone ? 60 : 0; // Wysokość przycisku powrotu (tylko na telefonie)
  const returnButtonWidth = isPhone ? 0 : 120; // Szerokość przycisku powrotu (tylko na nie-telefonie)
  const footerHeight = cutout.bottom + 20; // Margines na dolne ikony systemowe
  const availableHeight = screenHeight - headerHeight - returnButtonHeight - footerHeight;
  const availableWidth = screenWidth - cutout.left - cutout.right - 20 - returnButtonWidth;

  const cardSizeByWidth = availableWidth / cols;
  const cardSizeByHeight = availableHeight / rows;
  let cardSize = Math.min(cardSizeByWidth, cardSizeByHeight);

  const boardHeight = rows * cardSize;
  const boardWidth = cols * cardSize;
  cardSize = cardSize - 4; // -4 dla marginesów
  const verticalMargin = ((availableHeight - boardHeight)/2) - isPhone ? 20 : 0;

  const buttonColor = settings.coverColor === 'red' 
  ? '#e36968' 
  : settings.deckType === 'old' ? '#818F98' : '#528c97';

  return (
    <View style={[styles.container, {
      paddingTop: cutout.top,
      paddingBottom: cutout.bottom,
      paddingLeft: cutout.left,
      paddingRight: cutout.right } ]}>
      {/* Przycisk powrotu - tablet (prawy górny róg) */}
      {!isPhone && (
        <TouchableOpacity style={[styles.returnButtonTablet, {
              top: cutout.top + 20,
              right: cutout.right + 20,
              minWidth: 120,
              backgroundColor: buttonColor 
            }]} onPress={onResetGame}>
          <Text style={styles.returnButtonText}>{t('escape')}</Text>
        </TouchableOpacity>
      )}

      <View style={[styles.board, {
        width: boardWidth,
        height: boardHeight,
        // marginTop: verticalMargin
      }]}>
        {cards.map(card => (
          <View
            key={card.id}
            style={{ width: cardSize, height: cardSize, margin: 1 }}
            pointerEvents={(showMessage !== null || isComputerTurn()) ? 'none' : 'auto'}
          >
            <Card
              card={card}
              isFlipped={flippedCards.includes(card.id)}
              isMatched={matchedCards.includes(card.id)}
              showAllCards={showAllCards}
              coverColor={settings.coverColor}
              deckType={settings.deckType}
              onCardClick={handleCardClick}
            />
          </View>
        ))}
      </View>

      {/* Przycisk powrotu - telefon (na dole) */}
      {isPhone && (
        <TouchableOpacity style={[styles.returnButtonPhone, { 
              bottom: cutout.bottom + 10,
              left: cutout.left + 20,
              right: cutout.right + 20,
              backgroundColor: buttonColor
            }]} onPress={onResetGame}>
          <Text style={styles.returnButtonText}>{t('escape')}</Text>
        </TouchableOpacity>
      )}

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
                <Text style={styles.modalButtonText}>{t('congrats')}</Text>
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
    justifyContent: 'flex-start',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
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
  returnButtonPhone: {
    position: 'absolute',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  returnButtonTablet: {
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 100,
  },
  returnButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
