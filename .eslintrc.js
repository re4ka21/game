// @ts-nocheck
module.exports = {
  root: true,
  env: {
    "react-native/react-native": true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-native", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-native/recommended",
    "prettier",
  ],
  rules: {
    "react-native/no-inline-styles": "error",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
  },
  settings: {
    react: { version: "detect" },
  },
};
