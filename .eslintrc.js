module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-native',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Prettier
    'prettier/prettier': 'error',

    // React
    'react/react-in-jsx-scope': 'off',

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'error',

    // Console & comments
    'no-console': 'error',
    'react-native/no-inline-styles': 'warn',

    // Clean code
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // Formatting
    'react/jsx-curly-brace-presence': ['error', 'never'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
