module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: [
      'error',
      'always',
    ],
    quotes: [
      'error',
      'single',
    ],
    'spaced-comment': 'off',
    'max-len': ['error', { code: 200 }],
    'import/no-cycle': 'off',
    'no-underscore-dangle': 'off',
  },
};
