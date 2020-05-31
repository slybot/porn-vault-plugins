module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:prettier/recommended",
    "plugin:mocha/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ["mocha", "chai-friendly"],
  rules: {
    camcelcase: "off",
    "mocha/no-mocha-arrows": "off",
    // Disable the default rule
    "no-unused-expressions": 0,
    // Use the chai friendly rule
    "chai-friendly/no-unused-expressions": 2,
  },
};
