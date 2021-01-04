module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: [2, 'single', {
      allowTemplateLiterals: true
    }],
    '@typescript-eslint/member-delimiter-style': [2, {
      multiline: {
        delimiter: 'none',
        requireLast: true
      },
      singleline: {
        requireLast: false
      }
    }],
    '@typescript-eslint/no-explicit-any': ['off']
  }
}
