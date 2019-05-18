module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'prettier/@typescript-eslint',
  ],
  parserOptions: {
      plugins: ['typescript'],
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json',
  },
  rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/array-type': ['error', 'array-simple'],
      '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
              allowExpressions: true,
          },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
              accessibility: 'explicit',
              overrides: {
                  accessors: 'off',
                  constructors: 'no-public',
                  methods: 'no-public',
                  properties: 'off',
                  parameterProperties: 'off',
              },
          },
      ],
  },
};
