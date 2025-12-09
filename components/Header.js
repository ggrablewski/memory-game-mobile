import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ playerNames, scores, currentPlayer }) {
  return (
    <View style={styles.header}>
      <Text style={[styles.playerName, currentPlayer === 1 && styles.activePlayer]}>
        {playerNames.player1}
      </Text>
      <Text style={styles.score}>{scores.player1}</Text>
      <Text style={styles.separator}>:</Text>
      <Text style={styles.score}>{scores.player2}</Text>
      <Text style={[styles.playerName, currentPlayer === 2 && styles.activePlayer]}>
        {playerNames.player2}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playerName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 10,
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
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 24,
    color: 'white',
    marginHorizontal: 5,
  },
});
