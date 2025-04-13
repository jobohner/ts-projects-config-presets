// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import * as importPlugin from 'eslint-plugin-import'
import eslintConfigPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type { import("eslint").Linter.Config[] } */
export const customConfig = [
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      /* Use // eslint-disable-next-line no-console
       * to explicitly use console.log. This way it is also documented that
       * the `console.log` is used on purpose and is not a forgotten debugging
       * relic. */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      'import/no-unresolved': 'off',
      'import/extensions': ['error', 'ignorePackages'],
    },
  },
  {
    files: ['*.cjs'],
    languageOptions: {
      globals: {
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  importPlugin.flatConfigs?.recommended,
  eslintConfigPrettierRecommended,
  customConfig,
)
