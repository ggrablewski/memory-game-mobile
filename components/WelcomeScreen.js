import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';

const KOMPUTER_NAME_LIST = [
  "Jaś Fasola", "Manny", "Fragley", "Rodrick", "Rowley", "Cwaniaczek Greg", 
  "Jeż Sonic", "Kaczka Katastrofa", "Pies Pypeć", "Pan Kuleczka"
];

export default function WelcomeScreen({ onStartGame, previousSettings }) {
  const [player1Name, setPlayer1Name] = useState(previousSettings?.player1Name || 'Ignaś');
  const [player2Name, setPlayer2Name] = useState(previousSettings?.player2Name || 'Tato');
  const [boardSize, setBoardSize] = useState(previousSettings?.boardSize || '4');
  const [coverColor, setCoverColor] = useState(previousSettings?.coverColor || 'red');
  const [withComputer, setWithComputer] = useState(previousSettings?.withComputer || false);
  const [difficulty, setDifficulty] = useState(previousSettings?.difficulty || 51);
  const [humanName, setHumanName] = useState(previousSettings?.withComputer ? previousSettings.player1Name : previousSettings?.player2Name || 'Tato');
  const [computerName, setComputerName] = useState(KOMPUTER_NAME_LIST[Math.floor(Math.min(previousSettings?.difficulty || 50, 99) / 10)]);

  useEffect(() => {
    const newComputerName = KOMPUTER_NAME_LIST[Math.floor(Math.min(difficulty, 99) / 10)];
    setComputerName(newComputerName);
    if (withComputer) {
      setPlayer2Name(newComputerName);
    }
  }, [difficulty, withComputer]);

  const handleComputerToggle = () => {
    if (!withComputer) {
      setHumanName(player2Name);
      setPlayer2Name(computerName);
      setWithComputer(true);
    } else {
      setPlayer2Name(humanName);
      setWithComputer(false);
    }
  };

  const handleStart = () => {
    const settings = {
      player1Name,
      player2Name,
      boardSize,
      coverColor,
      withComputer,
      difficulty
    };
    onStartGame(settings);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.form}>
          {/* Player names */}
          <View style={styles.section}>
            <Text style={styles.label}>Imię gracza 1</Text>
            <TextInput
              style={styles.input}
              value={player1Name}
              onChangeText={setPlayer1Name}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Imię gracza 2</Text>
            <TextInput
              style={[styles.input, withComputer && styles.inputDisabled]}
              value={player2Name}
              onChangeText={setPlayer2Name}
              editable={!withComputer}
            />
          </View>

          {/* Board size */}
          <View style={styles.section}>
            <Text style={styles.legend}>Rozmiar planszy</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setBoardSize('4')}
              >
                <View style={[styles.radio, boardSize === '4' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>4×3</Text>
                <Image source={require('../assets/images/4x3_transparent.png')} style={styles.boardImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setBoardSize('6')}
              >
                <View style={[styles.radio, boardSize === '6' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>6×5</Text>
                <Image source={require('../assets/images/6x5_transparent.png')} style={styles.boardImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setBoardSize('9')}
              >
                <View style={[styles.radio, boardSize === '9' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>9×6</Text>
                <Image source={require('../assets/images/9x6_transparent.png')} style={styles.boardImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setBoardSize('10')}
              >
                <View style={[styles.radio, boardSize === '10' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>10×8</Text>
                <Image source={require('../assets/images/10x8_transparent.png')} style={styles.boardImage} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Cover color */}
          <View style={styles.section}>
            <Text style={styles.legend}>Kolor okładki</Text>
            <View style={styles.coverGroup}>
              <TouchableOpacity
                style={styles.coverButton}
                onPress={() => setCoverColor('red')}
              >
                <View style={[styles.radio, coverColor === 'red' && styles.radioSelected]} />
                <Image source={require('../assets/images/cover_red.png')} style={styles.coverImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.coverButton}
                onPress={() => setCoverColor('blue')}
              >
                <View style={[styles.radio, coverColor === 'blue' && styles.radioSelected]} />
                <Image source={require('../assets/images/cover_blue.png')} style={styles.coverImage} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Computer options */}
          <View style={styles.section}>
            <View style={styles.checkboxRow}>
              <Switch
                value={withComputer}
                onValueChange={handleComputerToggle}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={withComputer ? '#007AFF' : '#f4f3f4'}
              />
              <Text style={styles.checkboxLabel}>Gram z komputerem</Text>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={[styles.label, !withComputer && styles.disabledText]}>
                Poziom trudności: {Math.round(difficulty)}%
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={difficulty}
                onValueChange={setDifficulty}
                disabled={!withComputer}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#000000"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Zaczynamy!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 15,
  },
  footer: {
    padding: 15,
    paddingBottom: 40,
    backgroundColor: 'transparent',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  legend: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: '#e0e0e0',
    borderColor: '#999',
  },
  radioGroup: {
    gap: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  boardImage: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  coverGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  coverButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  disabledText: {
    color: '#999',
  },
  sliderContainer: {
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
