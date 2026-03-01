// Polyfills for React Native testing environment

// Mock Dimensions
const mockDimensions = {
  window: { width: 400, height: 800, scale: 2, fontScale: 1 },
  screen: { width: 400, height: 800, scale: 2, fontScale: 1 },
};

// Mock PixelRatio
const mockPixelRatio = {
  get: () => 2,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (size) => size * 2,
  roundToNearestPixel: (size) => Math.round(size),
};

// Apply mocks to global scope
global.mockDimensions = mockDimensions;
global.mockPixelRatio = mockPixelRatio;

// Setup React Native environment
if (typeof global.window !== 'undefined') {
  global.window.__DEV__ = true;
}

global.__DEV__ = true;
