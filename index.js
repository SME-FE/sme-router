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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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

var _routeMatcher = __webpack_require__(1);

var _routeMatcher2 = _interopRequireDefault(_routeMatcher);

var _Html5History = __webpack_require__(4);

var _Html5History2 = _interopRequireDefault(_Html5History);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router(mount) {
    _classCallCheck(this, Router);

    this._mount = document.getElementById(mount);
    this._subRouteView = '<div id="sub-route-view"></div>';
    this._subMount = null;
    this._isSubRoute = false;

    this._cache = {};

    this.routeIdx = 0;

    if (!this._mount) {
      throw new Error('Can not get mount point...');
    }

    this._matcher = new _routeMatcher2.default();

    this.iterator = false;

    this.history = new _Html5History2.default({
      recoginizer: this._recoginizer,
      matcher: this._matcher
    });
  }

  /**
   * 注册渲染（挂载）的位置
   * 
   * @memberof Router
   */


  _createClass(Router, [{
    key: 'render',
    value: function render(dom) {
      if (this._isSubRoute) {
        this._subMount.innerHTML = dom;
        this._isSubRoute = false;
      } else {
        this._mount.innerHTML = dom;
      }
    }
  }, {
    key: 'next',
    value: function next(dom) {
      this._mount.innerHTML = dom;
      this._isSubRoute = true;
      this._subMount = document.querySelector('#sub-route-view');
    }
  }, {
    key: 'subRoute',
    value: function subRoute() {
      return this._subRouteView;
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
      var self = this;
      // this._recoginizer.add([{
      //   path: path,
      //   handler: function(request) {
      //     middleware(request, self, self.iterator)
      //   } 
      // }])

      this._matcher.add(path, function (request) {
        middleware(request, self, self.next.bind(self));
      });
    }

    /**
     * 
     * 
     * @param {string} url 
     * @param {Object} body 
     * @memberof Router
     */

  }, {
    key: 'go',
    value: function go(url, body) {
      this.history.go(url, body);
    }

    /**
     * 重定向到某一路由
     * 
     * @memberof Router
     */

  }, {
    key: 'redirect',
    value: function redirect() {}

    /**
     * 回跳到历史
     * 
     * @memberof Router
     */

  }, {
    key: 'back',
    value: function back() {}
  }]);

  return Router;
}();

exports.default = Router;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegexp = __webpack_require__(2);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _queryParser = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteMatcher = function () {
  function RouteMatcher() {
    _classCallCheck(this, RouteMatcher);

    this._routes = [];
  }

  /**
   * 
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

      if (idx > -1) {
        queryStr = url.substr(idx);
        url = url.slice(0, idx);
      }

      for (var i = 0; i < this._routes.length; i++) {
        var route = this._routes[i];
        var result = route.reg.exec(url);

        if (result) {
          matchedRoutes.push({
            path: route.path,
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
     * @param {Object} routeConfig
     *                  - {string} path 
     *                  - {Function} handler 
     * @memberof RouteMatcher
     */

  }, {
    key: 'add',
    value: function add(path, handler) {
      this._routes.push(this._toReg({
        path: path,
        handler: handler
      }));
    }
  }, {
    key: '_toReg',
    value: function _toReg(routeConfig) {
      routeConfig.params = [];
      routeConfig.reg = (0, _pathToRegexp2.default)(routeConfig.path, routeConfig.params, { end: false });

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
/* 2 */
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
  var defaultDelimiter = (options && options.delimiter) || '/'
  var delimiters = (options && options.delimiters) || './'
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
  var delimiter = escapeString(options.delimiter || '/')
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      if (keys) keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a delimiter at the end of a match.
  if (!strict) {
    route += '(?:' + delimiter + '(?=' + endsWith + '))?'
  }

  if (end) {
    route += endsWith === '$' ? endsWith : '(?=' + endsWith + ')'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += '(?=' + delimiter + '|' + endsWith + ')'
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseQuery = parseQuery;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Html5History = function () {
  /**
   * Creates an instance of Html5History.
   * @param {Object} options 
   *             
   * @memberof Html5History
   */
  function Html5History(options) {
    _classCallCheck(this, Html5History);

    this.matcher = options.matcher;
    this.onRouteMatched = options.onRouteMatched;

    window.addEventListener('load', this.listen.bind(this));
    window.addEventListener('popstate', this.listen.bind(this));
  }

  _createClass(Html5History, [{
    key: 'listen',
    value: function listen(event) {
      var path = '' + location.pathname + location.hash + location.search;

      var matchedRoutes = this.matcher.match(path);
      for (var i = 0; i < matchedRoutes.length; i++) {
        var item = matchedRoutes[i];
        item.handler({
          body: event.state,
          query: item.query,
          params: item.params
        });
      }
    }
  }, {
    key: 'go',
    value: function go(url, body) {
      // const preState = location.url
      history.pushState(body, '', url);
      var matchedRoutes = this.matcher.match(url);

      for (var i = 0; i < matchedRoutes.length; i++) {
        var item = matchedRoutes[i];
        item.handler({
          body: body,
          query: item.query,
          params: item.params
        });
      }
    }
  }]);

  return Html5History;
}();

exports.default = Html5History;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;
exports.stateToPath = stateToPath;
function getType(source) {
  return Object.prototype.toString.call(source).slice(8, -1);
}

function stateToPath(baseUrl, info) {}

/***/ })
/******/ ]);
});