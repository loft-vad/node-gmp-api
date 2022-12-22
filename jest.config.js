/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  textMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  cleanMocks: true,
  setupFiles: ["./src/tests/testEnv.ts"]
};