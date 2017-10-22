/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _index = __webpack_require__(8);

var _index2 = _interopRequireDefault(_index);

var _spring = __webpack_require__(15);

var _spring2 = _interopRequireDefault(_spring);

var _summer = __webpack_require__(16);

var _autumn = __webpack_require__(21);

var _autumn2 = _interopRequireDefault(_autumn);

var _winter = __webpack_require__(22);

var _winter2 = _interopRequireDefault(_winter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = document.getElementById('app');
var router = new _index2.default('router-view');

// route config
router.route('/spring/:year', _spring2.default);
router.route('/summer/:year', _summer.summer);
router.route('/summer/:year/morn', _summer.morn);
router.route('/summer/:year/nightfall', _summer.nightfall);
router.route('/autumn/:year', _autumn2.default);
router.route('/winter/:year', _winter2.default);

// redirect example
router.route('*', function (req, res, next) {
  res.redirect('/spring/1945?month=10&day=24');
});

// middleware example
router.use(function (req) {
  if (!req.body) req.body = {};
  req.body.parsedByMiddleware = req.params.year + '-' + req.query.month + '-' + req.query.day;
});

// middleware example 2
router.use(function (req) {
  if (req.body && req.body.mes) {
    req.body.mes += ' ~~';
  }
});

router.route('/index', function (req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  next('\n    <div>Welcome to index page</div>\n    <strong>I\'am a parent route-view</strong>\n    ' + res.subRoute() + '\n  ');
});

router.route('/index/test', function (req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render('\n    <div style=\'color: red\'> hei I\'am a sub route-view</div>\n    ' + (query ? '<div> count: ' + query.count + ' </div>' : '') + '\n  ');
});

router.route('/user/:id', function (req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render('\n    <div>This is user page</div>\n    <div> my name is ' + params.id + ' </div>\n    ' + (body && body.mes ? '<div> hei mes is ' + body.mes + ' </div>' : 'nothing') + '\n  ');
});

/** interactive logic */
// const goTo = document.querySelector('.go-to')
// goTo.addEventListener('click', e => {
//   router.go('/user/tiger', {
//     mes: 'fuck you~~'
//   })
// })

// document.querySelector('.go-sub').addEventListener('click', e => {
//   router.go('/index/test?count=60')
// })

// router.render(routeView)

window.router = router;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n\nhtml, body {\n  color: #4a535a;\n  height: 100%;\n  background: url(" + __webpack_require__(5) + "); }\n\n#app {\n  height: 100%; }\n  #app code {\n    background-color: #e3e3e3;\n    border: 1px solid #dcdcdc;\n    border-radius: 4px;\n    display: inline-block;\n    padding: 1px 4px;\n    color: #6a737d; }\n  #app .left {\n    float: left;\n    height: 100%;\n    width: 180px;\n    margin-right: 20px;\n    background-color: white;\n    border-left: 1px solid #e3e3e3; }\n    #app .left .header {\n      text-align: center;\n      background-color: #8b80f9;\n      color: white;\n      padding: 16px; }\n      #app .left .header h3 {\n        margin-top: 0; }\n    #app .left ul {\n      padding: 0;\n      margin: 0;\n      list-style: none;\n      background-color: white; }\n      #app .left ul li {\n        height: 30px;\n        line-height: 30px;\n        padding: 5px;\n        text-align: center;\n        cursor: pointer;\n        color: #8b80f9; }\n        #app .left ul li:hover {\n          color: #fc7753; }\n  #app .right {\n    float: right;\n    height: 100%;\n    width: 300px;\n    margin-left: 20px;\n    background: url(" + __webpack_require__(6) + ");\n    background-size: cover;\n    background-position: center; }\n  #app .main {\n    box-sizing: border-box;\n    height: 100%;\n    overflow: hidden;\n    background: white;\n    padding: 30px 20px 10px 20px;\n    border: 1px solid #e3e3e3; }\n    #app .main .sub-title {\n      padding-bottom: 16px; }\n      #app .main .sub-title div {\n        height: 20px;\n        line-height: 20px;\n        padding: 5px 0; }\n      #app .main .sub-title .route {\n        color: #8b80f9;\n        font-weight: bold; }\n      #app .main .sub-title .desc {\n        color: #6a737d; }\n    #app .main .example-box {\n      margin-top: 40px; }\n      #app .main .example-box .example-head {\n        padding: 10px 0;\n        color: #8b80f9;\n        font-weight: bold; }\n      #app .main .example-box .mes {\n        margin: 16px 0;\n        padding: 10px;\n        border-left: 3px solid #8b80f9;\n        background: #f4f5f6; }\n  #app .fork-me-img {\n    z-index: 9999;\n    position: absolute;\n    top: 0;\n    right: 0;\n    border: 0; }\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aedce00e7bf3e83224d6a61a945bc1c2.jpg";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1a9aaf10018a98c62ce8a9709a3fd36b.jpg";

/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routeMatcher = __webpack_require__(9);

var _routeMatcher2 = _interopRequireDefault(_routeMatcher);

var _Html5History = __webpack_require__(12);

var _Html5History2 = _interopRequireDefault(_Html5History);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router(mount) {
    _classCallCheck(this, Router);

    this._mount = document.getElementById(mount);
    this._subRouteView = '<div id="sub-route-view"></div>';
    this._subMount = null;
    this._isPassing = false;

    this._cache = {};
    this._middlewares = [];

    this.routeIdx = 0;

    if (!this._mount) {
      throw new Error('Can not get mount point...');
    }

    this._matcher = new _routeMatcher2.default();

    this.iterator = false;

    this._history = new _Html5History2.default({
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
      console.log('is sub ? ' + this._isPassing);
      if (this._isPassing) {
        this._subMount.innerHTML = dom;
      } else {
        this._mount.innerHTML = dom;
      }
    }
  }, {
    key: 'next',
    value: function next(dom) {
      this._mount.innerHTML = dom;
      this._isPassing = this._history.getMatchedCount() > 1 ? true : false;
      this._subMount = document.querySelector('#sub-route-view');
    }
  }, {
    key: 'subRoute',
    value: function subRoute() {
      return this._subRouteView;
    }
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

      var self = this;
      this._matcher.add(path, function (request) {
        if (path !== '*') {
          for (var i = 0; i < _this._middlewares.length; i++) {
            _this._middlewares[i](request, _this, _this.next.bind(_this));
          }
        }
        middleware(request, _this, _this.next.bind(_this));
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
      this._isPassing = false;
      this._history.go(url, body);
    }

    /**
     * 重定向到某一路由
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
     * 回跳到历史
     * 
     * @memberof Router
     */

  }, {
    key: 'back',
    value: function back() {
      this._isPassing = false;
      this._history.back();
    }
  }]);

  return Router;
}();

exports.default = Router;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegexp = __webpack_require__(10);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _queryParser = __webpack_require__(11);

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
          if (route.path != '*') notMatched = false;
          if (!notMatched && route.path === '*') continue;

          matchedRoutes.push({
            _id: route._id,
            path: route.path,
            params: this._getParams(route.params, result),
            query: (0, _queryParser.parseQuery)(queryStr),
            handler: route.handler
          });
        }
      }

      console.log('====================');
      console.log(matchedRoutes);
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
      var complied = this._toReg({
        path: path,
        handler: handler
      });
      // generate unique id by register order
      complied._id = this._id++;

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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(13);

var _cacheBody2 = __webpack_require__(14);

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
    this._matchedCount = 0;

    window.addEventListener('load', this._listen.bind(this));
    window.addEventListener('popstate', this._listen.bind(this));
  }

  _createClass(Html5History, [{
    key: '_listen',
    value: function _listen(event) {
      var path = '' + location.pathname + location.hash + location.search;
      var matchedRoutes = this.matcher.match(path);
      this._matchedCount = matchedRoutes.length;

      this._fireHandlers(matchedRoutes, event.state);
    }
  }, {
    key: '_routeTo',
    value: function _routeTo(url, body) {
      var matchedRoutes = this.matcher.match(url);
      this._matchedCount = matchedRoutes.length;

      this._fireHandlers(matchedRoutes, body);
    }
  }, {
    key: '_fireHandlers',
    value: function _fireHandlers(matchedRoutes, body) {
      for (var i = 0; i < matchedRoutes.length; i++) {
        var item = matchedRoutes[i];
        var cache = this._getCache(item);

        item.handler({
          body: body || cache,
          query: item.query,
          params: item.params
        });

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
    key: 'getMatchedCount',
    value: function getMatchedCount() {
      return this._matchedCount;
    }
  }]);

  return Html5History;
}();

exports.default = Html5History;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;
function getType(source) {
  return Object.prototype.toString.call(source).slice(8, -1);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCache = setCache;
exports.getCache = getCache;

var session = sessionStorage;
var prefix = 'smer';
function setCache(id, body) {
  session.setItem('' + prefix + id, JSON.stringify(body));
}

function getCache(id) {
  try {
    var cache = session.getItem('' + prefix + id);
    return cache ? JSON.parse(cache) : null;
  } catch (err) {
    throw 'parse body err';
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = spring;
function spring(req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render('\n    <div class="content-container">\n      <h2 class="content-header">\u6625</h2>\n      <div class="sub-title">\n        <div class="route">/spring/:year</div>\n        <div class="desc">\u7B80\u5355\u4F8B\u5B50\uFF0C\u901A\u8FC7 <code>params</code>\uFF0C<code>query</code>\uFF0C<code>body</code> \u4F20\u9012\u53C2\u6570 \uD83D\uDE08</div>\n      </div>\n      <section>\n        <div>============================</div>\n        <div>params: ' + JSON.stringify(params) + '</div>\n        <div>query: ' + JSON.stringify(query) + '</div>\n        <div>body: ' + JSON.stringify(body) + '</div>\n        <div>============================</div>\n      </section>\n      <section class=\'example-box\'>\n        <div class=\'example-head\'># example</div>\n        <div>Current Day: <code>' + body.parsedByMiddleware + '</code></div>\n        <div class=\'mes\'>' + (body && body.mes ? '' + body.mes : 'Default Mes: I am hwen 😀') + '</div>\n      </section>\n    </div>\n  ');
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nightfall = exports.morn = undefined;
exports.summer = summer;

__webpack_require__(17);

var _morn = __webpack_require__(19);

var _morn2 = _interopRequireDefault(_morn);

var _nightfall = __webpack_require__(20);

var _nightfall2 = _interopRequireDefault(_nightfall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.morn = _morn2.default;
exports.nightfall = _nightfall2.default;
function summer(req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  next('\n    <div class="content-container">\n      <h2 class="content-header">\u971E</h2>\n      <div class="sub-title">\n        <div class="route">/summer/:year\uFF0C/summer/:year/morn\uFF0C/summer/:year/nightfall</div>\n        <div class="desc">\u4E8C\u7EA7\u8DEF\u7531\u6F14\u793A\uFF0C\u70B9\u51FB <code>\u671D</code> \u6216 <code>\u5915</code> \uFF0C\u6CE8\u610F url \u53D8\u5316 \uD83D\uDE1B</div>\n      </div>\n      <section>\n        <div>============================</div>\n        <div>params: ' + JSON.stringify(params) + '</div>\n        <div>query: ' + JSON.stringify(query) + '</div>\n        <div>body: ' + JSON.stringify(body) + '</div>\n        <div>============================</div>\n      </section>\n      <div class=\'sub-route-list\'>\n        <span id=\'morn\' onclick="router.go(\'/summer/1914/morn?month=07&day=30&some=morn\')">\u671D</span>\n        <span id=\'nightfall\' onclick="router.go(\'/summer/1914/nightfall?month=07&day=30&some=nightfall\')">\u5915</span>\n      </div>\n      <section class=\'example-box\'>\n        <div class=\'example-head\'># parent</div>\n        <div class=\'mes\'>I\'m parent route: <code>/autumn/:year</code></div>\n      </section>\n      ' + res.subRoute() + '\n    </div>\n  ');
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./summer.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./summer.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".sub-route-list {\n  margin: 24px 0 0; }\n  .sub-route-list span {\n    margin-right: 10px;\n    cursor: pointer;\n    display: inline-block;\n    text-align: center;\n    width: 26px;\n    height: 26px;\n    line-height: 26px;\n    border-radius: 14px;\n    border: 1px solid #8b80f9; }\n    .sub-route-list span:hover, .sub-route-list span.active {\n      color: white;\n      background: #8b80f9; }\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = morn;
function morn(req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render("\n  <section class='example-box'>\n    <div class='example-head'># " + query.some + "</div>\n    <div>Current Day: <code>" + body.parsedByMiddleware + "</code></div>\n    <div class='mes'>\n    \u3010\u4EB2\u7231\u7684isak \u73B0\u5728\u6211\u6B63\u5750\u5728\u6211\u4EEC\u7B2C\u4E00\u6B21\u89C1\u9762\u7684\u5730\u65B9 \u60F3\u7740\u4F60 \u9A6C\u4E0A\u5C31\u8981\u523021:21\u4E86 \u6211\u6709\u5343\u8A00\u4E07\u8BED\u8981\u544A\u8BC9\u4F60 \u6211\u5F88\u62B1\u6B49\u5413\u5230\u4E86\u4F60 \u6211\u5F88\u62B1\u6B49\u4F24\u5BB3\u4E86\u4F60 \u6211\u5F88\u62B1\u6B49\u6CA1\u6709\u544A\u8BC9\u4F60\u6211\u6709\u8E81\u90C1\u75C7 \u6211\u5BB3\u6015\u5931\u53BB\u4F60 \u6211\u5FD8\u8BB0\u4E86\u6CA1\u6709\u4EBA\u4F1A\u88AB\u5931\u53BB \u56E0\u4E3A\u6BCF\u4E2A\u4EBA\u90FD\u662F\u5B64\u72EC\u7684 \u8BB0\u4F4F \u5728\u5B87\u5B99\u7684\u53E6\u4E00\u4E2A\u5730\u65B9 \u6211\u4EEC\u6C38\u8FDC\u7684\u5728\u4E00\u8D77 \u7231\u4F60 even\u3011     \n    </div>\n  </section>\n  ");
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nightfall;
function nightfall(req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render("\n  <section class='example-box'>\n    <div class='example-head'># " + query.some + "</div>\n    <div>Current Day: <code>" + body.parsedByMiddleware + "</code></div>\n    <div class='mes'>\n      Mathilda: Is life always this hard.\n      <br>\n      Mathilda: Or is it just when you're a kid?\n      <br>\n      Leon: Always like this.\n    </div>\n  </section>\n  ");
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autumn;
function autumn(req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render('\n  <div class="content-container">\n    <h2 class="content-header">\u79CB</h2>\n    <div class="sub-title">\n      <div class="route">/autumn/:year</div>\n      <div class="desc">\u8FD9\u4E2A\u9875\u9762\u4F7F\u7528 <code>pug</code> \u6784\u5EFA \uD83D\uDC36</div>\n    </div>\n    <section>\n      <div>============================</div>\n      <div>params: ' + JSON.stringify(params) + '</div>\n      <div>query: ' + JSON.stringify(query) + '</div>\n      <div>body: ' + JSON.stringify(body) + '</div>\n      <div>============================</div>\n    </section>\n    <section class=\'example-box\'>\n      <div class=\'example-head\'># example</div>\n      <div>Current Day: <code>' + body.parsedByMiddleware + '</code></div>\n      <div class=\'mes\'>' + (body && body.mes ? '' + body.mes : 'Default Mes: Hallo world ~~') + '</div>\n    </section>\n  </div>\n  ');
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = winter;
function winter(req, res, next) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render('\n  <div class="content-container">\n    <h2 class="content-header">\u971C</h2>\n    <div class="sub-title">\n      <div class="route">/winter/:year</div>\n      <div class="desc">\u7B80\u5355\u4F8B\u5B50\uFF0C\u901A\u8FC7 <code>params</code>\uFF0C<code>query</code>\uFF0C<code>body</code> \u4F20\u9012\u53C2\u6570</div>\n    </div>\n    <section>\n      <div>============================</div>\n      <div>params: ' + JSON.stringify(params) + '</div>\n      <div>query: ' + JSON.stringify(query) + '</div>\n      <div>body: ' + JSON.stringify(body) + '</div>\n      <div>============================</div>\n    </section>\n    <section class=\'example-box\'>\n      <div class=\'example-head\'># example</div>\n      <div>Current Day: <code>' + body.parsedByMiddleware + '</code></div>\n      <div class=\'mes\'>' + (body && body.mes ? '' + body.mes : 'Default Mes: Hallo world ~~') + '</div>\n    </section>\n  </div>\n  ');
}

/***/ })
/******/ ]);
//# sourceMappingURL=example.js.map