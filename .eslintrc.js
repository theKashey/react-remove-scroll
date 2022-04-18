module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', ['parent', 'index', 'sibling']],
      },
    ],
    'padding-line-between-statements': [
      'error',
      // IMPORT
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      // EXPORT
      {
        blankLine: 'always',
        prev: '*',
        next: 'export',
      },
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'any',
        prev: ['const', 'let'],
        next: ['const', 'let'],
      },
      // BLOCKS
      {
        blankLine: 'always',
        prev: ['block', 'block-like', 'class', 'function', 'multiline-expression'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['block', 'block-like', 'class', 'function', 'return', 'multiline-expression'],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
