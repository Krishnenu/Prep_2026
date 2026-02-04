export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],

  // Coverage configuration
  collectCoverage: true, // Always collect coverage when running tests
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
    "!src/setupTests.ts",
    "!src/vite-env.d.ts",
  ],

  // Coverage thresholds - tests will fail if coverage is below these percentages
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Coverage reporters - generates both HTML report and terminal output
  coverageReporters: [
    "text", // Shows coverage in terminal
    "text-summary", // Shows summary in terminal
    "html", // Generates HTML report in coverage/ folder
    "lcov", // Generates lcov report for CI/CD tools
  ],

  // Coverage directory
  coverageDirectory: "coverage",

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
};
