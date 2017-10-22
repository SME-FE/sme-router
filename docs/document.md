## Table of contents

- [Basic](#Basic)
- [Template](#Template)
- [Redirect](#Redirect)
- [Middleware](#Middleware)
- [Nested-routes](#Nested-routes)

By the way, you can check the api in [API List](https://github.com/SME-FE/sme-router/blob/master/docs/api.md)

## Languages

- [中文](https://github.com/SME-FE/sme-router/blob/master/docs/document.zh.md)
- [English](https://github.com/SME-FE/sme-router/blob/master/docs/document.md)

### Basic

[#live demo]() [#source code]()

SME Router is written with express style, api look like express.

The same as express the order of registering route and middlewares is important.The order in which you define route or middleware with `router.route()` or `router.use()` is very important. They are invoked sequentially, thus the order defines route and middleware precedence

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

### Template

```js
```

### Redirect

[#live demo]() [#source code]()

You should use `router.route('*')` to redirect unmatch url

```js
import SMERouter from 'sme-router'

const router = new SMERouter('router-view')

router.route('/index', (req, res, next) => {
  res.render('hallo world')
})

router.route('*', (req, res, next) => {
  res.redirect('/index)
})

router.go('/other') // will be redirected to /index
```

### Middleware

[#live demo]() [#source code]()

You can add middleware to the router. Middlwares will be called in order before executing each route handler. It's useful to parse request object.

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

### Nested-routes

[#live demo]() [#source code]()

Nested Route by calling `next()` and `res.subRoute()`

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


