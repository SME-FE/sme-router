import History from './History'

export default class Html5History extends History {
  /**
   * Creates an instance of Html5History.
   * @param {Object} options 
   *             
   * @memberof Html5History
   */
  constructor (options) {
    super(options)

    this._init()
    window.addEventListener('load', this._listen)
    window.addEventListener('popstate', this._listen)
  }

  _init () {
    // bind this._listen with this
    this._listen = (event) => {
      const path = `${location.pathname}${location.search}`
      const matchedRoutes = this.matcher.match(path)
      this._matchedCount = matchedRoutes.length
      this._fireHandlers(matchedRoutes, event.state)
    }
  }

  _routeTo (url, body) {
    const matchedRoutes = this.matcher.match(url)
    this._matchedCount = matchedRoutes.length

    this._fireHandlers(matchedRoutes, body)
  }

  go (url, body) {
    history.pushState(body, '', url)
    this._routeTo(url, body)
  }

  redirect (url, body) {
    history.replaceState(body, '', url)
    this._routeTo(url, body)
  }

  back () {
    history.go(-1)
  }

  stop () {
    window.removeEventListener('load', this._listen)
    window.removeEventListener('popstate', this._listen)
  }
}
