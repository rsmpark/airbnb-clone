// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "18.2",
    },
  },
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "no-alert": "off",
    "no-plusplus": "off",
    "no-shadow": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "react-refresh/only-export-components": "warn",
    "react/prop-types": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Packages `react` related packages come first.
          ["^react", "^@?\\w"],
          // Internal packages.
          ["^(@|components)(/.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.?(css)$"],
        ],
      },
    ],
  },
};
