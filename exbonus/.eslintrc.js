module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
      ],
      rules: {
        'no-unused-expressions': 'off',
        'no-unused-vars': ['error', { varsIgnorePattern: 'React' }],
        // variable is not defined
        'no-undef': 'off',
        'react/react-in-jsx-scope': 'off',

      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'default-param-last': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
