import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default (async () => {
  const eslintPluginJest = await import("eslint-plugin-jest");
  return [
    js.configs.recommended,
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          jsx: true,
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        globals: {
          process: 'readonly', // ✅ Fixes the 'process is not defined' issue
          setTimeout: "readonly", // ✅ Define `setTimeout` as a global
          setInterval: "readonly",
          clearTimeout: "readonly",
          clearInterval: "readonly",
          globalThis: "readonly", // ✅ Use `globalThis` instead of `global`
          describe: "readonly",
          test: "readonly",
          expect: "readonly",
          beforeEach: "readonly",
          afterEach: "readonly",
          jest: "readonly"
        }
      },
      plugins: {
        '@typescript-eslint': tsPlugin,
        jest: eslintPluginJest.default, // ✅ Use ESM import
        import: importPlugin
      },
      rules: {
        'import/first': 'error', // ✅ Fixes 'import/first' rule error
        'linebreak-style': 'off',
        'max-len': 'off',
        'spaced-comment': ['error', 'always'],
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-underscore-dangle': ['error', { allow: ['_id', "_dirname", "_filename"] }],
        camelcase: ['error', { allow: ['oauth2_v2', 'user_id'], properties: 'never' }],
        'func-names': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
        semi: 'error',
        'no-extra-semi': 'off',
        'no-unused-vars': 'off',
        'dot-notation': 'off',
        'class-methods-use-this': 'off',
        'comma-dangle': ['error', { arrays: 'never', objects: 'never', imports: 'never', exports: 'never', functions: 'ignore' }],
        'handle-callback-err': 'error',
        quotes: ['error', 'single'],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
      }
    }
  ];
})
