import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdBanner from './AdBanner';

export default function Header({ playerNames, scores, currentPlayer, gameStarted, isPhone, topCutout }) {
  return (
    !gameStarted 
    ? (<AdBanner />) 
    : (
      <View style={[styles.header, { paddingTop: topCutout + (isPhone ? 30 : 0) }]}>
        <View style={styles.playerColumn}>
          <View style={[styles.playerNameBorder, gameStarted && currentPlayer === 1 && styles.activeBorder]}>
            <Text style={styles.playerName}>
              {playerNames.player1}
            </Text>
          </View>
        </View>
        <View style={styles.scoreColumn}>
          <Text style={styles.score}   
            numberOfLines={2}
            adjustsFontSizeToFit={true}
          >{scores.player1}</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.score}>{scores.player2}</Text>
        </View>
        <View style={styles.playerColumn}>
          <View style={[styles.playerNameBorder, gameStarted && currentPlayer === 2 && styles.activeBorder]}>
            <Text style={styles.playerName}
              numberOfLines={2}
              adjustsFontSizeToFit={true}
            >{playerNames.player2}
            </Text>
          </View>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    marginBottom: 20,
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
