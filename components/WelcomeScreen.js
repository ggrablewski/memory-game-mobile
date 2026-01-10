import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { t } from '../i18n';

const KOMPUTER_NAME_LIST = [
  "Kleofas", "Euzebiusz", "Rufus", "Gotfryd", "Alcest", "Mikołajek", 
  "Ananiasz", "Kaczka Katastrofa", "Pies Pypeć", "Pan Kuleczka"
];

const SIZE_OPTIONS_PORTRAIT = [
  { name: "3×4", image: require('../assets/images/3x4_transparent.png') },
  { name: "5×6", image: require('../assets/images/5x6_transparent.png') },
  { name: "6×9", image: require('../assets/images/6x9_transparent.png') },
  { name: "8×10", image: require('../assets/images/8x10_transparent.png') }
];

const SIZE_OPTIONS_LANDSCAPE = [
  { name: "4×3", image: require('../assets/images/4x3_transparent.png') },
  { name: "6×5", image: require('../assets/images/6x5_transparent.png') },
  { name: "9×6", image: require('../assets/images/9x6_transparent.png') },
  { name: "10×8", image: require('../assets/images/10x8_transparent.png') }
];

export default function WelcomeScreen({ onStartGame, previousSettings, isPhone, unmuteSounds }) {
  const [player1Name, setPlayer1Name] = useState(previousSettings?.player1Name || 'Ignaś');
  const [player2Name, setPlayer2Name] = useState(previousSettings?.player2Name || 'Tato');
  const [boardSize, setBoardSize] = useState(previousSettings?.boardSize || '4');
  const [coverColor, setCoverColor] = useState(previousSettings?.coverColor || 'red');
  const [withComputer, setWithComputer] = useState(previousSettings?.withComputer || false);
  const [difficulty, setDifficulty] = useState(previousSettings?.difficulty || 51);
  const [humanName, setHumanName] = useState(previousSettings?.withComputer ? previousSettings.player1Name : previousSettings?.player2Name || 'Tato');
  const [computerName, setComputerName] = useState(KOMPUTER_NAME_LIST[Math.floor(Math.min(previousSettings?.difficulty || 50, 99) / 10)]);

  const SIZE_OPTIONS = isPhone ? SIZE_OPTIONS_PORTRAIT : SIZE_OPTIONS_LANDSCAPE;
  
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
    // Przywróć głośność przed startem gry
    if (unmuteSounds) {
      unmuteSounds();
    }

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
    <View style={[styles.container, !isPhone && styles.containerLandscape]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.form, !isPhone && styles.formLandscape]}>
          {/* Player names */}
          <View style={[styles.section, !isPhone && styles.sectionColumn]}>
            <Text style={styles.legend}>{t('players')}</Text>
            <Text style={styles.label}>{t('player1Name')}</Text>
            <TextInput
              style={styles.input}
              value={player1Name}
              onChangeText={setPlayer1Name}
            />
            <Text style={styles.label}>{t('player2Name')}</Text>
            <TextInput
              style={[styles.input, withComputer && styles.inputDisabled]}
              value={player2Name}
              onChangeText={setPlayer2Name}
              editable={!withComputer}
            />
          </View>

          {/* Board size */}
          <View style={[styles.section, !isPhone && styles.sectionColumn]}>
            <Text style={styles.legend}>{t('boardSize')}</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setBoardSize('4')}
              >
                <View style={[styles.radio, boardSize === '4' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>{SIZE_OPTIONS[0].name}</Text>
                <Image source={SIZE_OPTIONS[0].image} style={styles.boardImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setBoardSize('6')}
              >
                <View style={[styles.radio, boardSize === '6' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>{SIZE_OPTIONS[1].name}</Text>
                <Image source={SIZE_OPTIONS[1].image} style={styles.boardImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setBoardSize('9')}
              >
                <View style={[styles.radio, boardSize === '9' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>{SIZE_OPTIONS[2].name}</Text>
                <Image source={SIZE_OPTIONS[2].image} style={styles.boardImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setBoardSize('10')}
              >
                <View style={[styles.radio, boardSize === '10' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>{SIZE_OPTIONS[3].name}</Text>
                <Image source={SIZE_OPTIONS[3].image} style={styles.boardImage} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Cover color */}
          <View style={[styles.section, !isPhone && styles.sectionColumn]}>
            <Text style={styles.legend}>{t('coverColor')}</Text>
            <View style={[styles.coverGroup, !isPhone && styles.coverGroupLandscape]}>
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
          <View style={[styles.section, !isPhone && styles.sectionColumn]}>
            <Text style={styles.legend}>{t('computerPlayer')}</Text>
            <View style={styles.checkboxRow}>
              <Switch
                value={withComputer}
                onValueChange={handleComputerToggle}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={withComputer ? '#007AFF' : '#f4f3f4'}
              />
              <Text style={styles.checkboxLabel}>{t('playWithComputer')}</Text>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={[styles.label, !withComputer && styles.disabledText]}>
                {t('difficultyLevel')}: {Math.round(difficulty)}%
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
          <Text style={styles.startButtonText}>{t('startButton')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLandscape: {
    paddingBottom: 10,
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
  formLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionColumn: {
    flexShrink: 1,
    flexGrow: 0,
    marginBottom: 0,
    marginHorizontal: 5,
    minWidth: 150,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
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
  coverGroupLandscape: {
    flexDirection: 'column',
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
