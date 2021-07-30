module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/lib/',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
