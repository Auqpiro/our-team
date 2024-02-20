module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  rules: {
    'no-var': 'error',
    semi: 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  },
  ignorePatterns: ['dist', 'client', '.eslintrc.js'],
}
