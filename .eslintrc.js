module.exports = {
  "env": {
    "node": true,
    "mocha": true,
  },
  "plugins": ["node"],
  "extends": [
    "eslint:recommended",
    "google",
    "plugin:node/recommended",
  ],
  "rules": {
    "no-console": 0,
    "node/no-unpublished-require": ["error", {"allowModules": ["chai", "sinon", "jsdom-global"]}],
  }
};