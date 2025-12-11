import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ playerNames, scores, currentPlayer }) {
  return (
    <View style={styles.header}>
      <View style={styles.playerColumn}>
        <Text style={[styles.playerName, currentPlayer === 1 && styles.activePlayer]}>
          {playerNames.player1}
        </Text>
      </View>
      <View style={styles.scoreColumn}>
        <Text style={[styles.score, currentPlayer === 1 && styles.activePlayer]}>{scores.player1}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={[styles.score, currentPlayer === 2 && styles.activePlayer]}>{scores.player2}</Text>
      </View>
      <View style={styles.playerColumn}>
        <Text style={[styles.playerName, currentPlayer === 2 && styles.activePlayer]}>
          {playerNames.player2}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playerColumn: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  scoreColumn: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activePlayer: {
    color: '#ffeb3b',
    textShadowColor: 'rgba(255, 235, 59, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  score: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
  separator: {
    fontSize: 24,
    color: 'white',
    marginHorizontal: 3,
  }
});
