import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,

  {
    ignores: ['.astro/**'],
  },

  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        fetch: 'readonly',
        window: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        console: 'readonly',
        Fragment: 'readonly',
      },
    },
    plugins: {
      astro,
    },
    rules: {
      'no-unused-vars': 'off', // TypeScript plugin will handle this
      'astro/no-unused-css-selector': 'off',
    },
  },

  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        fetch: 'readonly',
        window: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'no-undef': 'off',
    },
  },
];
