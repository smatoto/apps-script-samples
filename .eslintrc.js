module.exports = {
  extends: 'google', // Google JS Style
  parserOptions: {
    ecmaVersion: 2017 // V8 engine compatibility
  },
  env: {
    node: true
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', { code: 110 }],
    camelcase: 'off', // Off for destructuring
    'async-await/space-after-async': 2,
    'async-await/space-after-await': 2,
    eqeqeq: 2,
    'guard-for-in': 'off',
    'no-var': 'off',
    'no-unused-vars': 'off'
  },
  plugins: ['async-await']
};
