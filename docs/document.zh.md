## 目录

- [基本](#基本)
- [模板](#模板)
- [重定向](#重定向)
- [中间件](#中间件)
- [二级路由](#二级路由)

PS. API 列表在 [这里](https://github.com/SME-FE/sme-router/blob/master/docs/api.md) 可以看到

## Languages

- [中文](https://github.com/SME-FE/sme-router/blob/master/docs/document.zh.md)
- [English](https://github.com/SME-FE/sme-router/blob/master/docs/document.md)

### 基本

[#live demo](https://sme-fe.github.io/sme-router/#/spring/1945?month=10&day=24) [#source code](https://github.com/SME-FE/sme-router/blob/master/example/pages/spring/index.js)

SME Router 是仿照 express 的风格编写的，前端路由库。所以 api 跟 express 有点类似。

跟 express 一样，在 SME Router 中，路由和中间件注册的顺序也是非常重要的。先注册的路由会先匹配，先注册的中间件也会先执行。

```js
import SMERouter from 'sme-router'

const router = new SMERouter('router-view')

router.route('/user/:id', (req, res, next) => {
  const { params, query, body , url, route } = req

  console.log(params.id) // output => 123
  console.log(query.name) // output => hwen
  console.log(body.mes) // output => hallo world
  console.log(url) // output => /user/123?name=hwen
  console.log(route) // output => /user/:id
})

router.go('/user/123?name=hwen', { mes: 'hallo world'})

```

### 模板

[#live demo](https://sme-fe.github.io/sme-router/#/autumn/1918?month=11&day=12) [#source code](https://github.com/SME-FE/sme-router/blob/master/example/pages/autumn/index.js)

你可以使用任何 webpack 支持的 [template-loader](https://doc.webpack-china.org/loaders/#-templating-),因为 `res.render` 只是简单地插入字符串

下面例子的 webpack 完整配置，可以在 [这里](https://github.com/SME-FE/sme-router/blob/master/build/webpack.example.config.js) 查看

使用前，你应该安装 `pug-loader` 或 `handlebars-loader`

1.using pug

因为 pug-loader 在 webpack3 使用有 bug（2017-10-22），所以你应该安装`"pug-loader": "~2.2.1"`.
并在 loader 的配置后面加上 `?`，不然还是会报错

webpack config

```js
 module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader?'
      }
  }
```

```js
import pugTemplate from './autumn.pug'

export default function autumn (req, res, next) {
  var { params, query, body } = req
  res.render(pugTemplate(req))
}
```

2.using handlebars

webpack config

```js
 module: {
    rules: [
      {
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader'
        }
      }
  }
```

```js
import hbsTemplate from './autumn.hbs'

export default function autumn (req, res, next) {
  var { params, query, body } = req

  // 你可以使用 handlebars 自定义 json helpers 来处理 json
  res.render(hbsTemplate({
    paramsStr: JSON.stringify(params),
    queryStr: JSON.stringify(query),
    bodyStr: JSON.stringify(body),
    body: body
  }))
}
```

### 重定向

[#live demo](https://sme-fe.github.io/sme-router/#/spring/1945?month=10&day=24) [#source code](https://github.com/SME-FE/sme-router/blob/master/example/index.js#L19)

重定向需要用到 `router.route('*')`

```js
import SMERouter from 'sme-router'

const router = new SMERouter('router-view')

router.route('/index', (req, res, next) => {
  res.render('hallo world')
})

router.route('*', (req, res, next) => {
  res.redirect('/index')
})

router.go('/other') // will be redirected to /index
```

### 中间件

[#live demo](https://sme-fe.github.io/sme-router/#/spring/1945?month=10&day=24) [#source code](https://github.com/SME-FE/sme-router/blob/master/example/index.js#L24)

中间件添加使用 `router.use`，跟路由一样，注册的顺序也是很重要的。中间件会在每个匹配路由的 `handler` 执行前，先执行一遍

```js
import SMERouter from 'sme-router'

const router = new SMERouter('router-view')

router.use((req) => {
  req.body.count += 3
})

router.use((req) => {
  req.body.count *= 2
})

router.use((req) => {
  req.body.order = `NO.${req.body.count}`
})

router.route('/user/:name', (req, res, next) => {
  console.log(req.body.count) // output => 8
  console.log(req.body.order) // output => NO.8
})

router.go('/user/Leo', { count: 1 })
```

### 二级路由

[#live demo](https://sme-fe.github.io/sme-router/#/summer/1914?month=07&day=30) [#source code](https://github.com/SME-FE/sme-router/blob/master/example/pages/summer/index.js#L5)

二级路由需要用到 `next()` 方法传递下去，以及 `res.subRoute()` 生成二级页面渲染的节点

```js
import SMERouter from 'sme-router'

const router = new SMERouter('router-view')

router.route('/main', (req, res, next) => {
  next(`
    <h2>Main title</h2>
    ${res.subRoute()}
  `)
})

router.route('/main/:content', (req, res, next) => {
  res.render(
    `Iam nested content`
  )
})

router.go('/main/sample')
```
