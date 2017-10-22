(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sme-router"] = factory();
	else
		root["sme-router"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cacheBody2 = __webpack_require__(6);

var _utils = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var History = function () {
  /**
   * Creates an instance of History.
   * @param {Object} options 
   *             
   * @memberof History
   */
  function History(options) {
    _classCallCheck(this, History);

    this.matcher = options.matcher;
    this._matchedCount = 0;
  }

  _createClass(History, [{
    key: '_fireHandlers',
    value: function _fireHandlers(matchedRoutes, body) {
      for (var i = 0; i < matchedRoutes.length; i++) {
        var item = matchedRoutes[i];
        var cache = this._getCache(item);

        var request = {
          body: body || cache,
          query: item.query,
          params: item.params
        };

        (0, _utils.def)(request, 'route', item.path);
        (0, _utils.def)(request, 'url', item.url);

        if (!body && cache) request._id = item._id;

        item.handler(request);

        this._cacheBody(body, item);
      }
    }
  }, {
    key: '_getCache',
    value: function _getCache(routeConfig) {
      return (0, _cacheBody2.getCache)(routeConfig._id);
    }
  }, {
    key: '_cacheBody',
    value: function _cacheBody(state, routeConfig) {
      if (state) {
        (0, _cacheBody2.setCache)(routeConfig._id, state);
      }
    }
  }, {
    key: 'getMatchedCount',
    value: function getMatchedCount() {
      return this._matchedCount;
    }
  }, {
    key: 'go',
    value: function go(url, body) {}
  }, {
    key: 'redirect',
    value: function redirect(url, body) {}
  }, {
    key: 'back',
    value: function back() {}
  }, {
    key: 'stop',
    value: function stop() {}
  }]);

  return History;
}();

exports.default = History;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routeMatcher = __webpack_require__(2);

var _routeMatcher2 = _interopRequireDefault(_routeMatcher);

var _Html5History = __webpack_require__(5);

var _Html5History2 = _interopRequireDefault(_Html5History);

var _HashHistory = __webpack_require__(8);

var _HashHistory2 = _interopRequireDefault(_HashHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router(mount) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hash';

    _classCallCheck(this, Router);

    this._mount = document.getElementById(mount);
    this._subRouteView = '<div id="__sub-route-view"></div>';
    this._subMount = null;
    this._isPassing = false;

    this._cache = {};
    this._middlewares = [];

    if (!this._mount) {
      throw new Error('Can not get mount point document.getElementById(#' + mount + ')...');
    }

    this._matcher = new _routeMatcher2.default();

    this.iterator = false;
    console.log('router mode is ' + mode);
    this._history = mode === 'hash' ? new _HashHistory2.default({ matcher: this._matcher }) : new _Html5History2.default({ matcher: this._matcher });
  }

  /**
   * render to mount point
   * @param {string} dom 
   * @memberof Router
   */


  _createClass(Router, [{
    key: 'render',
    value: function render(dom) {
      if (this._isPassing) {
        this._subMount.innerHTML = dom;
      } else {
        this._mount.innerHTML = dom;
      }
    }

    /**
     * render parent route and passing to next router
     * @param {string} dom 
     * @memberof Router
     */

  }, {
    key: 'next',
    value: function next(dom) {
      this._mount.innerHTML = dom;
      // only passing to the next router while matched router more then 1
      this._isPassing = this._history.getMatchedCount() > 1;
      this._subMount = document.querySelector('#__sub-route-view');
    }

    /**
     * 
     * @returns {string} subroute
     * @memberof Router
     */

  }, {
    key: 'subRoute',
    value: function subRoute() {
      return this._subRouteView;
    }

    /**
     * add middleware to router instance
     * 
     * @param {Function} middleware 
     * @memberof Router
     */

  }, {
    key: 'use',
    value: function use(middleware) {
      this._middlewares.push(middleware);
    }

    /**
     * 注册路由
     * 
     * @param {any} path 
     * @param {any} middleware 
     * @memberof Router
     */

  }, {
    key: 'route',
    value: function route(path, middleware) {
      var _this = this;

      this._matcher.add(path, function (request) {
        // run configed middlewares only when not '*' path and not get request from cache
        if (path !== '*' && !request._id) {
          for (var i = 0; i < _this._middlewares.length; i++) {
            _this._middlewares[i](request);
          }
        }
        middleware(request, _this, _this.next.bind(_this));
      });
    }

    /**
     * go to a url
     * 
     * @param {string} url 
     * @param {Object} body 
     * @memberof Router
     */

  }, {
    key: 'go',
    value: function go(url, body) {
      this._isPassing = false;
      this._history.go(url, body);
    }

    /**
     * redirect to url
     * 
     * @memberof Router
     */

  }, {
    key: 'redirect',
    value: function redirect(url, body) {
      this._isPassing = false;
      this._history.redirect(url, body);
    }

    /**
     * back to history
     * 
     * @memberof Router
     */

  }, {
    key: 'back',
    value: function back() {
      this._isPassing = false;
      this._history.back();
    }

    /**
     * remove all listeners
     * 
     * @memberof Router
     */

  }, {
    key: 'stop',
    value: function stop() {
      this._history.stop();
    }
  }]);

  return Router;
}();

exports.default = Router;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegexp = __webpack_require__(3);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _queryParser = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteMatcher = function () {
  function RouteMatcher() {
    _classCallCheck(this, RouteMatcher);

    this._routes = [];
    this._id = 0;
  }

  /**
   * 
   * @param {any} url 
   * @returns {Object} return matched routes
   * @memberof RouteMatcher
   */


  _createClass(RouteMatcher, [{
    key: 'match',
    value: function match(url) {
      var matchedRoutes = [];
      var queryStr = '';
      var idx = url.indexOf('?');
      var notMatched = true;

      if (idx > -1) {
        queryStr = url.substr(idx);
        url = url.slice(0, idx);
      }

      for (var i = 0; i < this._routes.length; i++) {
        var route = this._routes[i];
        var result = route.reg.exec(url);

        if (result) {
          if (route.path !== '*') notMatched = false;
          // after matched a path then ignore '*' path
          if (!notMatched && route.path === '*') continue;

          matchedRoutes.push({
            _id: route._id,
            path: route.path,
            url: url + queryStr,
            params: this._getParams(route.params, result),
            query: (0, _queryParser.parseQuery)(queryStr),
            handler: route.handler
          });
        }
      }

      return matchedRoutes;
    }

    /**
     * 
     * add new routeConfig
     * @param {string} path
     * @param {Function} handler
     * @memberof RouteMatcher
     */

  }, {
    key: 'add',
    value: function add(path, handler) {
      var complied = this._toReg({
        path: path,
        handler: handler
      });
      // generate unique id by register order
      complied._id = ++this._id;
      this._routes.push(complied);
    }
  }, {
    key: '_toReg',
    value: function _toReg(routeConfig) {
      routeConfig.params = [];
      routeConfig.reg = routeConfig.path === '*' ? /[\w\W]*/i : (0, _pathToRegexp2.default)(routeConfig.path, routeConfig.params, { end: false });

      return routeConfig;
    }
  }, {
    key: '_getParams',
    value: function _getParams() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var matchedResult = arguments[1];

      var params = {};
      for (var i = 0; i < keys.length; i++) {
        params[keys[i].name] = matchedResult[i + 1];
      }

      return params;
    }
  }]);

  return RouteMatcher;
}();

exports.default = RouteMatcher;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value))

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = ''
  var isEndDelimited = false

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?'
        } else {
          route += '(?:' + prefix + '(' + capture + '))?'
        }
      } else {
        route += prefix + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseQuery = parseQuery;

/**
 * 
 * @export
 * @param {string} queryStr 
 * @returns {Object} query - return a parsed query object 
 */
function parseQuery(queryStr) {
  var query = {};
  queryStr = queryStr.trim().replace(/^(\?|#|&)/, '');

  if (!queryStr) {
    return null;
  }

  queryStr.split('&').forEach(function (param) {
    var _param$split = param.split('='),
        _param$split2 = _slicedToArray(_param$split, 2),
        rawKey = _param$split2[0],
        rawValue = _param$split2[1];

    var _ref = [decodeURIComponent(rawKey), rawValue ? decodeURIComponent(rawValue) : null],
        key = _ref[0],
        val = _ref[1];

    query[key] = val;
  });

  return query;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _History2 = __webpack_require__(0);

var _History3 = _interopRequireDefault(_History2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Html5History = function (_History) {
  _inherits(Html5History, _History);

  /**
   * Creates an instance of Html5History.
   * @param {Object} options 
   *             
   * @memberof Html5History
   */
  function Html5History(options) {
    _classCallCheck(this, Html5History);

    var _this = _possibleConstructorReturn(this, (Html5History.__proto__ || Object.getPrototypeOf(Html5History)).call(this, options));

    _this._init();
    window.addEventListener('load', _this._listen);
    window.addEventListener('popstate', _this._listen);
    return _this;
  }

  _createClass(Html5History, [{
    key: '_init',
    value: function _init() {
      var _this2 = this;

      // bind this._listen with this
      this._listen = function (event) {
        var path = '' + location.pathname + location.search;
        var matchedRoutes = _this2.matcher.match(path);
        _this2._matchedCount = matchedRoutes.length;
        _this2._fireHandlers(matchedRoutes, event.state);
      };
    }
  }, {
    key: '_routeTo',
    value: function _routeTo(url, body) {
      var matchedRoutes = this.matcher.match(url);
      this._matchedCount = matchedRoutes.length;

      this._fireHandlers(matchedRoutes, body);
    }
  }, {
    key: 'go',
    value: function go(url, body) {
      history.pushState(body, '', url);
      this._routeTo(url, body);
    }
  }, {
    key: 'redirect',
    value: function redirect(url, body) {
      history.replaceState(body, '', url);
      this._routeTo(url, body);
    }
  }, {
    key: 'back',
    value: function back() {
      history.go(-1);
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.removeEventListener('load', this._listen);
      window.removeEventListener('popstate', this._listen);
    }
  }]);

  return Html5History;
}(_History3.default);

exports.default = Html5History;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCache = setCache;
exports.getCache = getCache;

var session = sessionStorage;
var prefix = 'smer';

/**
 * cache data to sessionStorage
 * @export
 * @param {string} id 
 * @param {Object} body 
 */
function setCache(id, body) {
  if (!body) return;
  session.setItem('' + prefix + id, JSON.stringify(body));
}

/**
 * 
 * get cache data from sessionStorage
 * @export
 * @param {string} id 
 * @returns {Object} cache 
 */
function getCache(id) {
  try {
    var cache = session.getItem('' + prefix + id);
    return cache ? JSON.parse(cache) : null;
  } catch (err) {
    throw new Error('parse body err');
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.def = def;
function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    writable: false,
    enumerable: true,
    value: value
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _History2 = __webpack_require__(0);

var _History3 = _interopRequireDefault(_History2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HashHistory = function (_History) {
  _inherits(HashHistory, _History);

  /**
   * Creates an instance of HashHistory.
   * @param {Object} options 
   *             
   * @memberof HashHistory
   */
  function HashHistory(options) {
    _classCallCheck(this, HashHistory);

    var _this = _possibleConstructorReturn(this, (HashHistory.__proto__ || Object.getPrototypeOf(HashHistory)).call(this, options));

    _this._cache = {};
    _this._init();
    window.addEventListener('load', _this._listen);
    window.addEventListener('hashchange', _this._listen);
    return _this;
  }

  _createClass(HashHistory, [{
    key: '_getHash',
    value: function _getHash() {
      return location.hash.slice(1);
    }
  }, {
    key: '_init',
    value: function _init() {
      var _this2 = this;

      // bind this._listen with this
      this._listen = function (event) {
        var path = _this2._getHash();
        var matchedRoutes = _this2.matcher.match(path);
        _this2._matchedCount = matchedRoutes.length;
        _this2._fireHandlers(matchedRoutes, _this2._cache[path]);
      };
    }
  }, {
    key: 'go',
    value: function go(url, body) {
      this._cache[url] = body;
      location.hash = '' + url;
    }
  }, {
    key: 'redirect',
    value: function redirect(url, body) {
      var href = location.href;
      var index = href.indexOf('#');
      url = index > 0 ? href.slice(0, index) + '#' + url : href.slice(0, 0) + '#' + url;

      this._cache[url] = body;
      location.replace(url);
    }
  }, {
    key: 'back',
    value: function back() {
      history.go(-1);
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.removeEventListener('load', this._listen);
      window.removeEventListener('hashchange', this._listen);
    }
  }]);

  return HashHistory;
}(_History3.default);

exports.default = HashHistory;

/***/ })
/******/ ]);
});