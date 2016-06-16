# stc-babel

Use babel to transpile ES2015+ to ES5

## Install

```sh
npm install stc-babel
```

## How to use

```js
// stc.config.js
var babel = require('stc-babel');

stc.transpile({
  babel: {plugin: babel, include: /\.es$/, options: {}}
});

```
