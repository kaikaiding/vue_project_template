module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "parser": 'babel-eslint'
        
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'no-unused-vars': 'warn',
        'no-inner-declarations': 'off'
    }
};