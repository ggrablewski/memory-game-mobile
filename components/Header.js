import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ playerNames, scores, currentPlayer, gameStarted, isPhone }) {
  return (
    <View style={[styles.header, isPhone ? styles.headerPhone : styles.headerTablet]}>
      <View style={styles.playerColumn}>
        <View style={[styles.playerNameBorder, gameStarted && currentPlayer === 1 && styles.activeBorder]}>
          <Text style={styles.playerName}>
            {playerNames.player1}
          </Text>
        </View>
      </View>
      <View style={styles.scoreColumn}>
        <Text style={styles.score}>{scores.player1}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={styles.score}>{scores.player2}</Text>
      </View>
      <View style={styles.playerColumn}>
        <View style={[styles.playerNameBorder, gameStarted && currentPlayer === 2 && styles.activeBorder]}>
          <Text style={styles.playerName}>
            {playerNames.player2}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerPhone: {
    paddingTop: 60,
  },
  headerTablet: {
    paddingTop: 30,
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
  playerNameBorder: {
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeBorder: {
    borderColor: '#ffeb3b',
  },
  playerName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
