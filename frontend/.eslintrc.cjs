module.exports = {
  // parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    // requireConfigFile: false, // важно для @babel/eslint-parser
  },
  plugins: ["react", "testing-library"],
  rules: {
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "react/prop-types": 0,
    "no-console": 0,
    "react/react-in-jsx-scope": 0,
    "no-underscore-dangle": ["error", { allow: ["__filename", "__dirname"] }],
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "testing-library/no-debug": 0,
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx"] },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
