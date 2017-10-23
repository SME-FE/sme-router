module.exports = {
    root: true,
    "env": {
      "browser": true,
      "mocha": true,
      "es6": true
    },
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // add your custom rules here
    'rules': {
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      'no-trailing-spaces': 1,
      "no-unused-vars": 1,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
  }
