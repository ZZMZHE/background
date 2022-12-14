module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-empty': 'off',
    'space-before-function-paren': 0,
    'indent': [2, 4],
    "no-irregular-whitespace": "off"//这禁止掉 空格报错检查
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
