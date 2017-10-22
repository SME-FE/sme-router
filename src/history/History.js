import { getCache, setCache } from '@/utils/cache-body'
import { def } from '@/utils'

export default class History {
  /**
   * Creates an instance of History.
   * @param {Object} options 
   *             
   * @memberof History
   */
  constructor (options) {
    this.matcher = options.matcher
    this._matchedCount = 0
  }

  _fireHandlers (matchedRoutes, body) {
    for (let i = 0; i < matchedRoutes.length; i++) {
      const item = matchedRoutes[i]
      const cache = this._getCache(item)

      const request = {
        body: body || cache,
        query: item.query,
        params: item.params
      }

      def(request, 'route', item.path)
      def(request, 'url', item.url)

      if (!body && cache) request._id = item._id

      item.handler(request)

      this._cacheBody(body, item)
    }
  }

  _getCache (routeConfig) {
    return getCache(routeConfig._id)
  }

  _cacheBody (state, routeConfig) {
    if (state) {
      setCache(routeConfig._id, state)
    }
  }

  getMatchedCount () {
    return this._matchedCount
  }

  go (url, body) {}
  redirect (url, body) {}
  back () {}
  stop () {}
}
