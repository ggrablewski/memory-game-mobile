import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';

// Lista wszystkich obrazków do preloadingu
const cardImages = [
  require('../assets/images/inside_00.png'),
  require('../assets/images/inside_01.png'),
  require('../assets/images/inside_02.png'),
  require('../assets/images/inside_03.png'),
  require('../assets/images/inside_04.png'),
  require('../assets/images/inside_05.png'),
  require('../assets/images/inside_06.png'),
  require('../assets/images/inside_07.png'),
  require('../assets/images/inside_08.png'),
  require('../assets/images/inside_09.png'),
  require('../assets/images/inside_10.png'),
  require('../assets/images/inside_11.png'),
  require('../assets/images/inside_12.png'),
  require('../assets/images/inside_13.png'),
  require('../assets/images/inside_14.png'),
  require('../assets/images/inside_15.png'),
  require('../assets/images/inside_16.png'),
  require('../assets/images/inside_17.png'),
  require('../assets/images/inside_18.png'),
  require('../assets/images/inside_19.png'),
  require('../assets/images/inside_20.png'),
  require('../assets/images/inside_21.png'),
  require('../assets/images/inside_22.png'),
  require('../assets/images/inside_23.png'),
  require('../assets/images/inside_24.png'),
  require('../assets/images/inside_25.png'),
  require('../assets/images/inside_26.png'),
  require('../assets/images/inside_27.png'),
  require('../assets/images/inside_28.png'),
  require('../assets/images/inside_29.png'),
  require('../assets/images/inside_30.png'),
  require('../assets/images/inside_31.png'),
  require('../assets/images/inside_32.png'),
  require('../assets/images/inside_33.png'),
  require('../assets/images/inside_34.png'),
  require('../assets/images/inside_35.png'),
  require('../assets/images/inside_36.png'),
  require('../assets/images/inside_37.png'),
  require('../assets/images/inside_38.png'),
  require('../assets/images/inside_39.png'),
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
