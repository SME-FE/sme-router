
import path2Reg from 'path-to-regexp'
import { parseQuery } from './query-parser'

export default class RouteMatcher {
  constructor () {
    this._routes = []
    this._id = 0
  }

  /**
   * 
   * @param {any} url 
   * @returns {Object} return matched routes
   * @memberof RouteMatcher
   */
  match (url) {
    let matchedRoutes = []
    let queryStr = ''
    let idx = url.indexOf('?')
    let notMatched = true

    if (idx > -1) {
      queryStr = url.substr(idx)
      url = url.slice(0, idx)
    }

    for (let i = 0; i < this._routes.length; i++) {
      let route = this._routes[i]
      let result = route.reg.exec(url)

      if (result) {
        if (route.path !== '*') notMatched = false
        // after matched a path then ignore '*' path
        if (!notMatched && route.path === '*') continue

        matchedRoutes.push({
          _id: route._id,
          path: route.path,
          url: url + queryStr,
          params: this._getParams(route.params, result),
          query: parseQuery(queryStr),
          handler: route.handler
        })
      }
    }

    return matchedRoutes
  }

  /**
   * 
   * add new routeConfig
   * @param {string} path
   * @param {Function} handler
   * @memberof RouteMatcher
   */
  add (path, handler) {
    let complied = this._toReg({
      path: path,
      handler: handler
    })
    // generate unique id by register order
    complied._id = ++this._id
    this._routes.push(complied)
  }

  _toReg (routeConfig) {
    routeConfig.params = []
    routeConfig.reg = routeConfig.path === '*'
      ? /[\w\W]*/i
      : path2Reg(routeConfig.path, routeConfig.params, { end: false })

    return routeConfig
  }

  _getParams (keys = [], matchedResult) {
    let params = {}
    for (let i = 0; i < keys.length; i++) {
      params[keys[i].name] = matchedResult[i + 1]
    }

    return params
  }
}
