# SME Router

A lightweight router lib that implement with express route style

![Travis branch](https://img.shields.io/travis/SME-FE/sme-router/master.svg?style=flat-square)
![coverage](https://img.shields.io/coveralls/github/SME-FE/sme-router/master.svg?style=flat-square)
![download](https://img.shields.io/npm/dm/sme-router.svg?style=flat-square)
![version](https://img.shields.io/npm/v/sme-router.svg?style=flat-square)
![license](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)

## Languages

- [中文](https://sme-fe.github.io/website-router/zh/)
- [English](https://sme-fe.github.io/website-router/)

## Documentation

- [Doc](https://sme-fe.github.io/website-router/)

## Get Start

### Installation

```bash
npm i --save sme-router
```

### Usage

[![Edit sme-router example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5w4q410wjn)

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
<script type="text/javascript" src="https://unpkg.com/sme-router"></script>
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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/6712767?v=4" width="100px;"/><br /><sub>hwen</sub>](https://github.com/hwen)<br />[🤔](#ideas "Ideas & Planning") [💻](https://github.com/SME-FE/sme-router/commits?author=hwen "Code") [🎨](#design "Design") [📖](https://github.com/SME-FE/sme-router/commits?author=hwen "Documentation") [💡](#example "Examples") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, hwen <hwenleung@gmail.com>
