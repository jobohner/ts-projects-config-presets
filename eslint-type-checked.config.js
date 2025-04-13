// @ts-check

/**
 * Uses computationally expensive checks in ts files. Use this configuration for
 * infrequent checks e. g. before build processes.
 */

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import * as importPlugin from 'eslint-plugin-import'
import eslintConfigPrettierRecommended from 'eslint-plugin-prettier/recommended'

import { customConfig } from './eslint.config.js'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  importPlugin.flatConfigs?.recommended,
  eslintConfigPrettierRecommended,
  customConfig,
)
