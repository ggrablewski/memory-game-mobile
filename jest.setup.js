// Mock dla modułu i18n
jest.mock('./i18n', () => ({
  t: (key) => key,
}));

// Mock dla AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock dla Expo Audio
jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: jest.fn(() => Promise.resolve({ sound: { replayAsync: jest.fn() } })),
    },
    setAudioModeAsync: jest.fn(() => Promise.resolve()),
  },
}));

// Mock dla Expo Screen Orientation
jest.mock('expo-screen-orientation', () => ({
  lockAsync: jest.fn(() => Promise.resolve()),
  unlockAsync: jest.fn(() => Promise.resolve()),
  OrientationLock: {
    PORTRAIT: 1,
    LANDSCAPE: 2,
  },
}));

// Mock dla Slider
jest.mock('@react-native-community/slider', () => {
  const React = require('react');
  return React.forwardRef((props, ref) => {
    return React.createElement('Slider', { ...props, ref });
  });
});
