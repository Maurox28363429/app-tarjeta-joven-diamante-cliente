module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'standard', 'prettier'],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    extraFileExtensions: ['.vue'],
    sourceType: 'module',
    ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
  },
  plugins: ['vue'],
  rules: {
    camelcase: 'off',
    quotes: ['warn', 'single', { avoidEscape: true }],
  },
};
