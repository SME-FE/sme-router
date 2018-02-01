# SME Router

A lightweight router lib that implement with express route style

![Travis branch](https://img.shields.io/travis/SME-FE/sme-router/master.svg?style=flat-square)
![coverage](https://img.shields.io/coveralls/github/SME-FE/sme-router/master.svg?style=flat-square)
![download](https://img.shields.io/npm/dm/sme-router.svg?style=flat-square)
![version](https://img.shields.io/npm/v/sme-router.svg?style=flat-square)
![license](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)

## 语言

- [中文](https://github.com/SME-FE/sme-router/blob/master/README.zh.md)
- [English](https://github.com/SME-FE/sme-router/blob/master/README.md)

## 文档

- [文档](https://github.com/SME-FE/sme-router/blob/master/docs/document.zh.md)
- [API](https://github.com/SME-FE/sme-router/blob/master/docs/api.md)

## Get Start

### 安装

```bash
npm i --save sme-router
```
·
### 用法

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

**注意:** 如果你的项目没有使用 webpack 等构建工具，你可以通过 html 引入

```html
<script type="text/javascript" src="https://unpkg.com/sme-router"></script>
```

具体用法请见 [文档](https://github.com/SME-FE/sme-router/blob/master/docs/document.zh.md)

## 在线 Demo

[点我看Demo](https://sme-fe.github.io/sme-router/)

## 在本地跑

1.先clone仓库

```shell
npm i
npm run dev
```

打开 http://localhost:8080/ 即可看到 example

2.测试

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

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, hwen <hwenleung@gmail.com>
