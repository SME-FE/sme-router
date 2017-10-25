
import RouteMatcher from '@/utils/route-matcher'
import Html5History from '@/history/Html5History'
import HashHistory from '@/history/HashHistory'

export default class Router {
  constructor (mount, mode = 'hash') {
    this._mount = document.getElementById(mount)
    if (!this._mount) {
      throw new Error(`Can not get mount point document.getElementById(#${mount})...`)
    }

    this._subRouteView = '<div id="__sub-route-view"></div>'
    this._subMount = null
    this._isPassing = false
    this._cache = {}
    this._middlewares = []
    this._matcher = new RouteMatcher()

    this._history = mode === 'hash'
      ? new HashHistory({ matcher: this._matcher })
      : new Html5History({ matcher: this._matcher })
  }

  /**
   * render to mount point
   * @param {string} dom 
   * @memberof Router
   */
  render (dom) {
    if (this._isPassing) {
      this._subMount.innerHTML = dom
    } else {
      this._mount.innerHTML = dom
    }
  }

  /**
   * render parent route and passing to next router
   * @param {string} dom 
   * @memberof Router
   */
  next (dom) {
    this._mount.innerHTML = dom
    // only passing to the next router while matched router more then 1
    this._isPassing = this._history.getMatchedCount() > 1
    this._subMount = document.querySelector('#__sub-route-view')
  }

  /**
   * 
   * @returns {string} subroute
   * @memberof Router
   */
  subRoute () {
    return this._subRouteView
  }

  /**
   * add middleware to router instance
   * 
   * @param {Function} middleware 
   * @memberof Router
   */
  use (middleware) {
    this._middlewares.push(middleware)
  }

  /**
   * 注册路由
   * 
   * @param {any} path 
   * @param {any} middleware 
   * @memberof Router
   */
  route (path, middleware) {
    this._matcher.add(path, (request) => {
      // run configed middlewares only when not '*' path and not get request from cache
      if (path !== '*' && !request._id) {
        for (let i = 0; i < this._middlewares.length; i++) {
          this._middlewares[i](request)
        }
      }
      middleware(request, this, this.next.bind(this))
    })
  }

  /**
   * go to a url
   * 
   * @param {string} url 
   * @param {Object} body 
   * @memberof Router
   */
  go (url, body) {
    this._isPassing = false
    this._history.go(url, body)
  }

  /**
   * redirect to url
   * 
   * @memberof Router
   */
  redirect (url, body) {
    this._isPassing = false
    this._history.redirect(url, body)
  }

  /**
   * back to history
   * 
   * @memberof Router
   */
  back () {
    this._isPassing = false
    this._history.back()
  }

  /**
   * remove all listeners
   * 
   * @memberof Router
   */
  stop () {
    this._history.stop()
  }
}
