import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';

// Lista wszystkich obrazków do preloadingu
const menuItems = [
  require('../assets/images/cover_red.png'),
  require('../assets/images/cover_blue.png'),
  require('../assets/images/art_menu.jpg'),
  require('../assets/images/fv_menu.jpg'),
  require('../assets/images/old/old_menu.jpg'),
  require('../assets/images/dark_green_2.jpg'),
];

export function useImagePreloader() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    async function loadImages() {
      try {
        const imageAssets = menuItems.map(image => Asset.fromModule(image).downloadAsync());
        await Promise.all(imageAssets);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Kontynuuj mimo błędu
      }
    }

    loadImages();
  }, []);

  return imagesLoaded;
}

// Mapa wszystkich dostępnych talii kart (statyczna)
const DECK_CARD_IMAGES = {
  art: [
    require('../assets/images/art_00.jpg'),
    require('../assets/images/art_01.jpg'),
    require('../assets/images/art_02.jpg'),
    require('../assets/images/art_03.jpg'),
    require('../assets/images/art_04.jpg'),
    require('../assets/images/art_05.jpg'),
    require('../assets/images/art_06.jpg'),
    require('../assets/images/art_07.jpg'),
    require('../assets/images/art_08.jpg'),
    require('../assets/images/art_09.jpg'),
    require('../assets/images/art_10.jpg'),
    require('../assets/images/art_11.jpg'),
    require('../assets/images/art_12.jpg'),
    require('../assets/images/art_13.jpg'),
    require('../assets/images/art_14.jpg'),
    require('../assets/images/art_15.jpg'),
    require('../assets/images/art_16.jpg'),
    require('../assets/images/art_17.jpg'),
    require('../assets/images/art_18.jpg'),
    require('../assets/images/art_19.jpg'),
    require('../assets/images/art_20.jpg'),
    require('../assets/images/art_21.jpg'),
    require('../assets/images/art_22.jpg'),
    require('../assets/images/art_23.jpg'),
    require('../assets/images/art_24.jpg'),
    require('../assets/images/art_25.jpg'),
    require('../assets/images/art_26.jpg'),
    require('../assets/images/art_27.jpg'),
    require('../assets/images/art_28.jpg'),
    require('../assets/images/art_29.jpg'),
    require('../assets/images/art_30.jpg'),
    require('../assets/images/art_31.jpg'),
    require('../assets/images/art_32.jpg'),
    require('../assets/images/art_33.jpg'),
    require('../assets/images/art_34.jpg'),
    require('../assets/images/art_35.jpg'),
    require('../assets/images/art_36.jpg'),
    require('../assets/images/art_37.jpg'),
    require('../assets/images/art_38.jpg'),
    require('../assets/images/art_39.jpg'),
  ],
  fv: [
    require('../assets/images/fv_00.png'),
    require('../assets/images/fv_01.png'),
    require('../assets/images/fv_02.png'),
    require('../assets/images/fv_03.png'),
    require('../assets/images/fv_04.png'),
    require('../assets/images/fv_05.png'),
    require('../assets/images/fv_06.png'),
    require('../assets/images/fv_07.png'),
    require('../assets/images/fv_08.png'),
    require('../assets/images/fv_09.png'),
    require('../assets/images/fv_10.png'),
    require('../assets/images/fv_11.png'),
    require('../assets/images/fv_12.png'),
    require('../assets/images/fv_13.png'),
    require('../assets/images/fv_14.png'),
    require('../assets/images/fv_15.png'),
    require('../assets/images/fv_16.png'),
    require('../assets/images/fv_17.png'),
    require('../assets/images/fv_18.png'),
    require('../assets/images/fv_19.png'),
    require('../assets/images/fv_20.png'),
    require('../assets/images/fv_21.png'),
    require('../assets/images/fv_22.png'),
    require('../assets/images/fv_23.png'),
    require('../assets/images/fv_24.png'),
    require('../assets/images/fv_25.png'),
    require('../assets/images/fv_26.png'),
    require('../assets/images/fv_27.png'),
    require('../assets/images/fv_28.png'),
    require('../assets/images/fv_29.png'),
    require('../assets/images/fv_30.png'),
    require('../assets/images/fv_31.png'),
    require('../assets/images/fv_32.png'),
    require('../assets/images/fv_33.png'),
    require('../assets/images/fv_34.png'),
    require('../assets/images/fv_35.png'),
    require('../assets/images/fv_36.png'),
    require('../assets/images/fv_37.png'),
    require('../assets/images/fv_38.png'),
    require('../assets/images/fv_39.png'),
  ],
  old: [
    require('../assets/images/old/old_00.jpg'),
    require('../assets/images/old/old_01.jpg'),
    require('../assets/images/old/old_02.jpg'),
    require('../assets/images/old/old_03.jpg'),
    require('../assets/images/old/old_04.jpg'),
    require('../assets/images/old/old_05.jpg'),
    require('../assets/images/old/old_06.jpg'),
    require('../assets/images/old/old_07.jpg'),
    require('../assets/images/old/old_08.jpg'),
    require('../assets/images/old/old_09.jpg'),
    require('../assets/images/old/old_10.jpg'),
    require('../assets/images/old/old_11.jpg'),
    require('../assets/images/old/old_12.jpg'),
    require('../assets/images/old/old_13.jpg'),
    require('../assets/images/old/old_14.jpg'),
    require('../assets/images/old/old_15.jpg'),
    require('../assets/images/old/old_16.jpg'),
    require('../assets/images/old/old_17.jpg'),
    require('../assets/images/old/old_18.jpg'),
    require('../assets/images/old/old_19.jpg'),
    require('../assets/images/old/old_20.jpg'),
    require('../assets/images/old/old_21.jpg'),
    require('../assets/images/old/old_22.jpg'),
    require('../assets/images/old/old_23.jpg'),
    require('../assets/images/old/old_24.jpg'),
    require('../assets/images/old/old_25.jpg'),
    require('../assets/images/old/old_26.jpg'),
    require('../assets/images/old/old_27.jpg'),
    require('../assets/images/old/old_28.jpg'),
    require('../assets/images/old/old_29.jpg'),
    require('../assets/images/old/old_30.jpg'),
    require('../assets/images/old/old_31.jpg'),
    require('../assets/images/old/old_32.jpg'),
    require('../assets/images/old/old_33.jpg'),
    require('../assets/images/old/old_34.jpg'),
    require('../assets/images/old/old_35.jpg'),
    require('../assets/images/old/old_36.jpg'),
    require('../assets/images/old/old_37.jpg'),
    require('../assets/images/old/old_38.jpg'),
    require('../assets/images/old/old_39.jpg'),
  ]
};

export function useCardPreloader(deckType) {
  const [cardsLoaded, setCardsLoaded] = useState(false);

  useEffect(() => {
    // Jeśli deckType jest null, nie ładuj jeszcze kart
    if (!deckType) {
      setCardsLoaded(false);
      return;
    }

    // Resetuj stan ładowania gdy deckType się zmienia
    setCardsLoaded(false);

    async function loadCards() {
      try {
        // Pobierz obrazki dla wybranej talii
        const cardImages = DECK_CARD_IMAGES[deckType] || DECK_CARD_IMAGES.fv;
        const cardAssets = cardImages.map(image => Asset.fromModule(image).downloadAsync());
        await Promise.all(cardAssets);
        setCardsLoaded(true);
      } catch (error) {
        console.error('Error loading card images:', error);
        setCardsLoaded(true); // Kontynuuj mimo błędu
      }
    }

    loadCards();
  }, [deckType]);

  return cardsLoaded;
}
