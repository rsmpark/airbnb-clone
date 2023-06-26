// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["airbnb", "eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "18.2",
    },
  },
  plugins: [],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "no-underscore-dangle": "off",
    "no-plusplus": off,
  },
};
