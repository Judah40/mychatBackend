// const { createDefaultPreset } = require("ts-jest");
import { createDefaultPreset } from "ts-jest";
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config = {
  testEnvironment: "node",

  transform: {
    ...tsJestTransformCfg,
  },

  moduleNameMapper: {
    "^file-type$": "<rootDir>/__mocks__/file-type.js",
    "^@prisma/client$": "<rootDir>/__mocks__/prisma.js",
    "^redis$": "<rootDir>/__mocks__/redis.js",
  },
};
export default config;
