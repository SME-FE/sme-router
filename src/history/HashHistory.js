import History from './History'

export default class HashHistory extends History {
  /**
   * Creates an instance of HashHistory.
   * @param {Object} options 
   *             
   * @memberof HashHistory
   */
  constructor (options) {
    super(options)

    this._cache = {}
    this._init()
    window.addEventListener('load', this._listen)
    window.addEventListener('hashchange', this._listen)
  }

  _getHash () {
    return location.hash.slice(1)
  }

  _init () {
    // bind this._listen with this
    this._listen = (event) => {
      const path = this._getHash()
      const matchedRoutes = this.matcher.match(path)
      this._matchedCount = matchedRoutes.length
      this._fireHandlers(matchedRoutes, this._cache[path])
    }
  }

  go (url, body) {
    this._cache[url] = body
    location.hash = `${url}`
  }

  redirect (url, body) {
    const href = location.href
    const index = href.indexOf('#')
    url = index > 0
      ? `${href.slice(0, index)}#${url}`
      : `${href.slice(0, 0)}#${url}`

    this._cache[url] = body
    location.replace(url)
  }

  back () {
    history.go(-1)
  }

  stop () {
    window.removeEventListener('load', this._listen)
    window.removeEventListener('hashchange', this._listen)
  }
}
