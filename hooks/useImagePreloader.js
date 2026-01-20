import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';

// Lista wszystkich obrazków do preloadingu
const cardImages = [
  require('../assets/images/art_00.png'),
  require('../assets/images/art_01.png'),
  require('../assets/images/art_02.png'),
  require('../assets/images/art_03.png'),
  require('../assets/images/art_04.png'),
  require('../assets/images/art_05.png'),
  require('../assets/images/art_06.png'),
  require('../assets/images/art_07.png'),
  require('../assets/images/art_08.png'),
  require('../assets/images/art_09.png'),
  require('../assets/images/art_10.png'),
  require('../assets/images/art_11.png'),
  require('../assets/images/art_12.png'),
  require('../assets/images/art_13.png'),
  require('../assets/images/art_14.png'),
  require('../assets/images/art_15.png'),
  require('../assets/images/art_16.png'),
  require('../assets/images/art_17.png'),
  require('../assets/images/art_18.png'),
  require('../assets/images/art_19.png'),
  require('../assets/images/art_20.png'),
  require('../assets/images/art_21.png'),
  require('../assets/images/art_22.png'),
  require('../assets/images/art_23.png'),
  require('../assets/images/art_24.png'),
  require('../assets/images/art_25.png'),
  require('../assets/images/art_26.png'),
  require('../assets/images/art_27.png'),
  require('../assets/images/art_28.png'),
  require('../assets/images/art_29.png'),
  require('../assets/images/art_30.png'),
  require('../assets/images/art_31.png'),
  require('../assets/images/art_32.png'),
  require('../assets/images/art_33.png'),
  require('../assets/images/art_34.png'),
  require('../assets/images/art_35.png'),
  require('../assets/images/art_36.png'),
  require('../assets/images/art_37.png'),
  require('../assets/images/art_38.png'),
  require('../assets/images/art_39.png'),
  require('../assets/images/cover_red.png'),
  require('../assets/images/cover_blue.png'),
  require('../assets/images/dark_green_1.jpg'),
];

export function useImagePreloader() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    async function loadImages() {
      try {
        const imageAssets = cardImages.map(image => Asset.fromModule(image).downloadAsync());
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
