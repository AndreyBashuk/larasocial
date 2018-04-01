module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
    'plugin:vue/base',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  "rules": {
    "max-len": ["error", 120],
    "id-length": 0,
  }
}
