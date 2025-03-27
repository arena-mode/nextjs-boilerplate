import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import nextPlugin from 'eslint-plugin-next';
import nextConfig from 'eslint-config-next/eslint.config.js';

export default [
  js.configs.recommended,
  ...nextConfig,
  {
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'next': nextPlugin,
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
