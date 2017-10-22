# SME Router

## 语言

- [中文](https://github.com/SME-FE/sme-router/blob/master/README.zh.md)
- [English](https://github.com/SME-FE/sme-router/blob/master/README.md)

## 文档

- [文档](https://github.com/SME-FE/sme-router/blob/master/docs.document.md)
- [API](https://github.com/SME-FE/sme-router/blob/master/docs/api.md)

## Get Start

### 安装

```bash
npm i --save sme-router
```

### 用法

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
<script type="text/javascript" src="sme-router.min.js"></script>
```

## 在线 Demo

[点我看Demo]()

## 在本地跑

1.先clone仓库

```shell
npm i
npm run dev
```

打开 http://localhost:8080/ 即可看到 example

2.测试

```shell
karma start
```

3.lint

```shell
npm run lint
```

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, hwen <hwenleung@gmail.com>
