module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|react-native-svg)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    '!components/**/*.test.{js,jsx}',
  ],
  coverageReporters: ['html', 'text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
};
