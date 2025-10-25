module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.module\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
