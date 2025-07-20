import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'url'

const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default [
  includeIgnoreFile(gitIgnorePath),
  js.configs.recommended,
  stylistic.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // React правила
      'react/prop-types': 'off',
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.js', '.jsx'] },
      ],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],

      // Базовые правила
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],

      // Стилистические правила (@stylistic)
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
