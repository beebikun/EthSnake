module.exports = {
  "globals": {
    "web3": true,
    "requestAnimationFrame": true,
  },
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "rules": {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-shadow": "error",
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
};
