import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

// Mapa wszystkich talii kart (statyczna - wymagane przez Metro bundler)
const DECK_IMAGES = {
  art: {
    cards: {
      '00': require('../assets/images/art_00.png'),
      '01': require('../assets/images/art_01.png'),
      '02': require('../assets/images/art_02.png'),
      '03': require('../assets/images/art_03.png'),
      '04': require('../assets/images/art_04.png'),
      '05': require('../assets/images/art_05.png'),
      '06': require('../assets/images/art_06.png'),
      '07': require('../assets/images/art_07.png'),
      '08': require('../assets/images/art_08.png'),
      '09': require('../assets/images/art_09.png'),
      '10': require('../assets/images/art_10.png'),
      '11': require('../assets/images/art_11.png'),
      '12': require('../assets/images/art_12.png'),
      '13': require('../assets/images/art_13.png'),
      '14': require('../assets/images/art_14.png'),
      '15': require('../assets/images/art_15.png'),
      '16': require('../assets/images/art_16.png'),
      '17': require('../assets/images/art_17.png'),
      '18': require('../assets/images/art_18.png'),
      '19': require('../assets/images/art_19.png'),
      '20': require('../assets/images/art_20.png'),
      '21': require('../assets/images/art_21.png'),
      '22': require('../assets/images/art_22.png'),
      '23': require('../assets/images/art_23.png'),
      '24': require('../assets/images/art_24.png'),
      '25': require('../assets/images/art_25.png'),
      '26': require('../assets/images/art_26.png'),
      '27': require('../assets/images/art_27.png'),
      '28': require('../assets/images/art_28.png'),
      '29': require('../assets/images/art_29.png'),
      '30': require('../assets/images/art_30.png'),
      '31': require('../assets/images/art_31.png'),
      '32': require('../assets/images/art_32.png'),
      '33': require('../assets/images/art_33.png'),
      '34': require('../assets/images/art_34.png'),
      '35': require('../assets/images/art_35.png'),
      '36': require('../assets/images/art_36.png'),
      '37': require('../assets/images/art_37.png'),
      '38': require('../assets/images/art_38.png'),
      '39': require('../assets/images/art_39.png'),
    },
    covers: {
      red: require('../assets/images/cover_red.png'),
      blue: require('../assets/images/cover_blue.png')
    }
  },
  fv: {
    cards: {
      '00': require('../assets/images/fv_00.png'),
      '01': require('../assets/images/fv_01.png'),
      '02': require('../assets/images/fv_02.png'),
      '03': require('../assets/images/fv_03.png'),
      '04': require('../assets/images/fv_04.png'),
      '05': require('../assets/images/fv_05.png'),
      '06': require('../assets/images/fv_06.png'),
      '07': require('../assets/images/fv_07.png'),
      '08': require('../assets/images/fv_08.png'),
      '09': require('../assets/images/fv_09.png'),
      '10': require('../assets/images/fv_10.png'),
      '11': require('../assets/images/fv_11.png'),
      '12': require('../assets/images/fv_12.png'),
      '13': require('../assets/images/fv_13.png'),
      '14': require('../assets/images/fv_14.png'),
      '15': require('../assets/images/fv_15.png'),
      '16': require('../assets/images/fv_16.png'),
      '17': require('../assets/images/fv_17.png'),
      '18': require('../assets/images/fv_18.png'),
      '19': require('../assets/images/fv_19.png'),
      '20': require('../assets/images/fv_20.png'),
      '21': require('../assets/images/fv_21.png'),
      '22': require('../assets/images/fv_22.png'),
      '23': require('../assets/images/fv_23.png'),
      '24': require('../assets/images/fv_24.png'),
      '25': require('../assets/images/fv_25.png'),
      '26': require('../assets/images/fv_26.png'),
      '27': require('../assets/images/fv_27.png'),
      '28': require('../assets/images/fv_28.png'),
      '29': require('../assets/images/fv_29.png'),
      '30': require('../assets/images/fv_30.png'),
      '31': require('../assets/images/fv_31.png'),
      '32': require('../assets/images/fv_32.png'),
      '33': require('../assets/images/fv_33.png'),
      '34': require('../assets/images/fv_34.png'),
      '35': require('../assets/images/fv_35.png'),
      '36': require('../assets/images/fv_36.png'),
      '37': require('../assets/images/fv_37.png'),
      '38': require('../assets/images/fv_38.png'),
      '39': require('../assets/images/fv_39.png'),
    },
    covers: {
      red: require('../assets/images/cover_red.png'),
      blue: require('../assets/images/cover_blue.png')
    }
  },
  old: {
    cards: {
      '00': require('../assets/images/old/old_00.png'),
      '01': require('../assets/images/old/old_01.png'),
      '02': require('../assets/images/old/old_02.png'),
      '03': require('../assets/images/old/old_03.png'),
      '04': require('../assets/images/old/old_04.png'),
      '05': require('../assets/images/old/old_05.png'),
      '06': require('../assets/images/old/old_06.png'),
      '07': require('../assets/images/old/old_07.png'),
      '08': require('../assets/images/old/old_08.png'),
      '09': require('../assets/images/old/old_09.png'),
      '10': require('../assets/images/old/old_10.png'),
      '11': require('../assets/images/old/old_11.png'),
      '12': require('../assets/images/old/old_12.png'),
      '13': require('../assets/images/old/old_13.png'),
      '14': require('../assets/images/old/old_14.png'),
      '15': require('../assets/images/old/old_15.png'),
      '16': require('../assets/images/old/old_16.png'),
      '17': require('../assets/images/old/old_17.png'),
      '18': require('../assets/images/old/old_18.png'),
      '19': require('../assets/images/old/old_19.png'),
      '20': require('../assets/images/old/old_20.png'),
      '21': require('../assets/images/old/old_21.png'),
      '22': require('../assets/images/old/old_22.png'),
      '23': require('../assets/images/old/old_23.png'),
      '24': require('../assets/images/old/old_24.png'),
      '25': require('../assets/images/old/old_25.png'),
      '26': require('../assets/images/old/old_26.png'),
      '27': require('../assets/images/old/old_27.png'),
      '28': require('../assets/images/old/old_28.png'),
      '29': require('../assets/images/old/old_29.png'),
      '30': require('../assets/images/old/old_30.png'),
      '31': require('../assets/images/old/old_31.png'),
      '32': require('../assets/images/old/old_32.png'),
      '33': require('../assets/images/old/old_33.png'),
      '34': require('../assets/images/old/old_34.png'),
      '35': require('../assets/images/old/old_35.png'),
      '36': require('../assets/images/old/old_36.png'),
      '37': require('../assets/images/old/old_37.png'),
      '38': require('../assets/images/old/old_38.png'),
      '39': require('../assets/images/old/old_39.png'),
    },
    covers: {
      red: require('../assets/images/old/old_cover_red.png'),
      blue: require('../assets/images/old/old_cover_blue.png')
    }
  }
};

export default function Card({ card, isFlipped, isMatched, coverColor, deckType, onCardClick }) {
  const handlePress = () => {
    if (!isFlipped && !isMatched) {
      onCardClick(card.id);
    }
  };

  if (isMatched) {
    return <View style={styles.emptyCard} />;
  }

  // Pobierz odpowiednią talię na podstawie deckType
  const deck = DECK_IMAGES[deckType] || DECK_IMAGES.fv; // fallback na 'fv' jeśli deckType nieprawidłowy

  // Konwertuj card.value na string z padding (np. 0 -> '00', 5 -> '05')
  const cardKey = String(card.value).padStart(2, '0');
  const imageSource = isFlipped ? deck.cards[cardKey] : deck.covers[coverColor];

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
