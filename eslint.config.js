import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const globals = {
  afterEach: 'readonly',
  beforeEach: 'readonly',
  clearTimeout: 'readonly',
  console: 'readonly',
  crypto: 'readonly',
  describe: 'readonly',
  document: 'readonly',
  expect: 'readonly',
  fetch: 'readonly',
  globalThis: 'readonly',
  HTMLElement: 'readonly',
  KeyboardEvent: 'readonly',
  MouseEvent: 'readonly',
  process: 'readonly',
  setTimeout: 'readonly',
  test: 'readonly',
  URL: 'readonly',
  WebAssembly: 'readonly',
  window: 'readonly',
};

export default [
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'docs/reference/api/**',
      'node_modules/**',
      'storybook-static/**',
      'test-results/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,cts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
      sourceType: 'commonjs',
    },
  },
  {
    files: ['**/*.{ts,tsx,cts}'],
    rules: {
      'no-undef': 'off',
    },
  },
];
