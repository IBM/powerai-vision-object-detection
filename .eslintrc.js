module.exports = {
  "env": {
    "node": true,
  },
  "plugins": ["node"],
  "extends": [
    "eslint:recommended",
    "google",
    "plugin:node/recommended",
  ],
  "rules": {
    "no-console": 0,
  }
};