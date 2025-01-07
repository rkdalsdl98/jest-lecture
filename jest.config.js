/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  rootDir: "src",
  setupFilesAfterEnv: ["./testSetup.js"]
};
// 이곳에 jest extended의 env?를 import한 파일 등록
