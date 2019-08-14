module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  extends: [
    'airbnb-base',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  overrides: [
    {
      files: [
        'test?(s)/*.js',
      ],

      env: {
        mocha: true,
      },

      // chai is weird
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
