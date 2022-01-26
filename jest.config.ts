import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.{js,ts}'],
  coverageReporters: ['html', 'text-summary'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
};

export default config;
