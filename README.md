# @jobohner/ts-projects-config-presets

## Installation

```batch
npm install --save-dev @jobohner/ts-projects-config-presets
```

## General

Set `"type": "module"` in your `package.json`.

## Dependencies

This package comes with some [`dependencies`](/package.json) already installed,
so when installing this package, these dependencies don't necessarily need to be
installed manually. Make sure to install this package as one of the
*dev*Dependencies (like shown in the
[example installation prompt](installation)).

## TypeScript

### Config

I recommend using multiple `tsconfig` files:

One file `tsconfig.json` that will be used to check all your TypeScript files
including test files etc.:

```json
{
  "extends": "@jobohner/ts-projects-config-presets/tsconfig.json"
}
```

Optionally, project path specific compilerOptions may be added:

```json
{
  "extends": "@jobohner/ts-projects-config-presets/tsconfig.json",
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types"],
    "paths": { "index-alias": ["./src/index.js"] }
  }
}
```

This file can be used by your editor for hints. Additionally you may use a
command like `tsc --noEmit` to check all your TypeScript files including test
files and other files that would usually be disregarded during a build process.

Another file `tsconfig.build.json` may be used during compilation. It should
specify that only relevant files are compiled:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

Run `tsc --project tsconfig.build.json` to compile using this file.

### Execute `.ts`-files

Install `tsx` to run `.ts`-files (`npx tsx path/name.ts`)

## Prettier

If you just want to use the preset settings without modifications, you could
simply add a file `.prettierrc.mjs` with the following content:

```javascript
export default '@jobohner/ts-projects-config-presets/.prettierrc.mjs'
```

In order to extend that config, your `.prettierrc.mjs` could look something like
this:

```javascript
import config from '@jobohner/ts-projects-config-presets/.prettierrc.mjs'

/** @type {import("prettier").Config} */
export default {
  ...config,
  // additional config
}
```

## ESLint

If you just want to use the preset settings without modifications, you could
simply add a file `eslint.config.js` with the following content:

```javascript
export default '@jobohner/ts-projects-config-presets/eslint.config.js'
```

Or, with modifications:

```javascript
// @ts-check

import tseslint from 'typescript-eslint'
import configs from '@jobohner/ts-projects-config-presets/eslint.config.js'

/** @type {import('eslint').Linter.Config[]} */
export const customConfig = [
  { ignores: ['**/node_modules/', '**/dist/', '**/coverage/'] },
  // ... other local custom rules
]

export default tseslint.config(...configs, customConfig)
```

For linting including the more expensive type checks you can use a command like

```bash
eslint --max-warnings 0 --config ./node_modules/@jobohner/ts-projects-config-presets/eslint-type-checked.config.js .
```

or create a new eslint config file that utilizes `eslint.config.js`:

```javascript
// @ts-check

import tseslint from 'typescript-eslint'
import configs from '@jobohner/ts-projects-config-presets/eslint.config.js'

import { customConfig } from './eslint.config.js'

export default tseslint.config(...configs, customConfig)
```

The type checks of the latter file are not included in the standard
`eslint.config.js`, because they are more expensive, so that it is not desirable
to have them run by your editor's eslint plugin. Instead use these checks
infrequently, e. g. prior to initiating a build process.

## vitest

I recommend using **vitest** over jest, because it seems to work better with
TypeScript using ES-Modules.

```typescript
import { defineConfig, mergeConfig } from 'vitest/config'
import vitestConfig from '@jobohner/ts-projects-config-presets/vitest.config.js'

export default mergeConfig(
  vitestConfig,
  defineConfig({
    // additional config
  }),
)
```
