import { useEffect, useState, useRef } from 'react';
import { Audio } from 'expo-av';

export function useSoundPreloader() {
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  const audioRefs = useRef({});

  useEffect(() => {
    async function loadSounds() {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: false,
          staysActiveInBackground: false,
        });
        
        audioRefs.current.start = await Audio.Sound.createAsync(require('../assets/sounds/start.mp3'));
        audioRefs.current.uncover = await Audio.Sound.createAsync(require('../assets/sounds/bounce_1.mp3'));
        audioRefs.current.wrong = await Audio.Sound.createAsync(require('../assets/sounds/bounce_2.mp3'));
        audioRefs.current.correct = await Audio.Sound.createAsync(require('../assets/sounds/dog.mp3'));
        audioRefs.current.cheers = await Audio.Sound.createAsync(require('../assets/sounds/cheers.mp3'));
        setSoundsLoaded(true);
      } catch (error) {
        console.error('Error loading sounds:', error);
        setSoundsLoaded(true); // Kontynuuj mimo błędu
      }
    }

    loadSounds();

    return () => {
      Object.values(audioRefs.current).forEach((soundObj) => {
        if (soundObj?.sound) {
          soundObj.sound.unloadAsync();
        }
      });
    };
  }, []);

  return { soundsLoaded, audioRefs: audioRefs.current };
}
