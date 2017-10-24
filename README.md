# SME Router

A lightweight router lib that implement with express route style

![Travis branch](https://img.shields.io/travis/SME-FE/sme-router/master.svg?style=flat-square)
![coverage](https://img.shields.io/coveralls/github/SME-FE/sme-router/master.svg?style=flat-square)
![download](https://img.shields.io/npm/dm/sme-router.svg?style=flat-square)
![version](https://img.shields.io/npm/v/sme-router.svg?style=flat-square)
![license](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)

## Languages

- [中文](https://github.com/SME-FE/sme-router/blob/master/README.zh.md)
- [English](https://github.com/SME-FE/sme-router/blob/master/README.md)

## Documentation

- [Doc](https://github.com/SME-FE/sme-router/blob/master/docs/document.md)
- [API](https://github.com/SME-FE/sme-router/blob/master/docs/api.md)

## Get Start

### Installation

```bash
npm i --save sme-router
```

### Usage

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SME Router</title>
</head>
<body>
  <div id="app">
    <div id="router-view"></div>
  </div>
</body>
</html>

```

```js
import SMERouter from 'sme-router'

const router = new SMERouter('router-view')

// route config
router.route('/index', (req, res, next) => {
  res.render(
    `hallo world`
  )
})

router.route('*', (req, res, next) => {
  res.redirect('/index')
})
```

**Note:** if your are not using webpack, your can simply import it to your html file

```html
<script type="text/javascript" src="sme-router.min.js"></script>
```

Please see the [document](https://github.com/SME-FE/sme-router/blob/master/docs/document.md) for more details

## Live demo

[click me to see the demo](https://sme-fe.github.io/sme-router/)

## Running Example 

1.clone the repo

```shell
npm i
npm run dev
```

open http://localhost:8080/

2.Test

```shell
npm run test // or => karma start
```

3.lint

```shell
npm run lint
```

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, hwen <hwenleung@gmail.com>
