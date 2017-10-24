
# router

## constructor

new SMERouter(domId, mode)

#### Parameters

- {String} `domId`: mount point id
- {String} `mode`: 'hash' or 'html5', if missing this parameter the default mode is 'hash' mode

## router.route(path, handler)

#### Parameters

- {String} `path`: route path
- {Function} `handler`: handler will be called with `handler(req, res, next)`
  - `req`: request obj
  - `res`: router instance
  - `next`: nest route function

## router.go(url, body)

#### Parameters

- {String} `url`: url
- {Object} `body`: you can pass a body object to the view

## router.redirect(url, body)

same as `router.go`, but `router.redirect` will be replace current history rather than push a new history

#### Parameters

- {String} `url`: url
- {Object} `body`: you can pass a body object to the view

## router.back()

same as window.history.go(-1)

#### Parameters

- No

## router.stop()

remove all listeners

#### Parameters

- No

## router.use(middleware)

register middleware

#### Parameters

- {Function} `middleware`: middleware will be called with `middleware(req)`

## router.render(template)

register middleware

#### Parameters

- {String} `template`: content to render in mount point

## router.subRoute()

return nested route mount point

#### Parameters

- No

## request object

#### Properties

- `query`: query object from parsing query string
- `params`: route params object
- `body`: body object
- `url`: original url，`writable: false`
- `route`: registered route，`writable: false`
