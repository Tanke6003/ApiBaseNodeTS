import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  setupFiles: ["<rootDir>/jest.setup.ts"],
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules', '\\.pnp\\.[^\\\\]+$'],
};

export default config;
