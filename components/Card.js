import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

const cardImages = {
  '00': require('../assets/images/inside_00.png'),
  '01': require('../assets/images/inside_01.png'),
  '02': require('../assets/images/inside_02.png'),
  '03': require('../assets/images/inside_03.png'),
  '04': require('../assets/images/inside_04.png'),
  '05': require('../assets/images/inside_05.png'),
  '06': require('../assets/images/inside_06.png'),
  '07': require('../assets/images/inside_07.png'),
  '08': require('../assets/images/inside_08.png'),
  '09': require('../assets/images/inside_09.png'),
  '10': require('../assets/images/inside_10.png'),
  '11': require('../assets/images/inside_11.png'),
  '12': require('../assets/images/inside_12.png'),
  '13': require('../assets/images/inside_13.png'),
  '14': require('../assets/images/inside_14.png'),
  '15': require('../assets/images/inside_15.png'),
  '16': require('../assets/images/inside_16.png'),
  '17': require('../assets/images/inside_17.png'),
  '18': require('../assets/images/inside_18.png'),
  '19': require('../assets/images/inside_19.png'),
  '20': require('../assets/images/inside_20.png'),
  '21': require('../assets/images/inside_21.png'),
  '22': require('../assets/images/inside_22.png'),
  '23': require('../assets/images/inside_23.png'),
  '24': require('../assets/images/inside_24.png'),
  '25': require('../assets/images/inside_25.png'),
  '26': require('../assets/images/inside_26.png'),
  '27': require('../assets/images/inside_27.png'),
  '28': require('../assets/images/inside_28.png'),
  '29': require('../assets/images/inside_29.png'),
  '30': require('../assets/images/inside_30.png'),
  '31': require('../assets/images/inside_31.png'),
  '32': require('../assets/images/inside_32.png'),
  '33': require('../assets/images/inside_33.png'),
  '34': require('../assets/images/inside_34.png'),
  '35': require('../assets/images/inside_35.png'),
  '36': require('../assets/images/inside_36.png'),
  '37': require('../assets/images/inside_37.png'),
  '38': require('../assets/images/inside_38.png'),
  '39': require('../assets/images/inside_39.png'),
};

const coverImages = {
  red: require('../assets/images/cover_red.png'),
  blue: require('../assets/images/cover_blue.png'),
};

export default function Card({ card, isFlipped, isMatched, coverColor, onCardClick }) {
  const handlePress = () => {
    if (!isFlipped && !isMatched) {
      onCardClick(card.id);
    }
  };

  if (isMatched) {
    return <View style={styles.emptyCard} />;
  }

  const imageSource = isFlipped ? cardImages[card.value] : coverImages[coverColor];

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isFlipped}
      activeOpacity={0.7}
      style={styles.card}
    >
      <Image source={imageSource} style={styles.cardImage} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  emptyCard: {
    flex: 1,
    margin: 2,
  },
});
