export default {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],

  // ✅ The test environment for Node.js
  testEnvironment: 'node',

  // ✅ Ensure Jest treats TypeScript files as ESM
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // ✅ Fix module resolution in ESM by appending file extensions
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // ✅ Enable experimental support for ESM
  transform: {}, // Disable ts-jest transform for ESM (no longer needed)
};
