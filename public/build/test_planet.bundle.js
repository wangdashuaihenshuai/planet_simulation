/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Planet = __webpack_require__(1);

	var ctx = document.getElementById("canvas").getContext("2d");

	var planet = new Planet({
	    width: 20,
	    x: 50,
	    y: 50,
	    vX: 10,
	    vY: 10,
	    color: '#00ff00'
	}, ctx, 1);

	planet.draw();

	// test planet draw and move
	/* console.log(planet.x, planet.y); */
	// planet.move(100, 100);
	// console.log(planet.x, planet.y, planet.quantity);
	/* planet.draw(); */


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(2);

	exports = module.exports = Planet;

	function Planet (options, ctx, id) {
	    this.width = options.width;
	    this.x = options.x;
	    this.y = options.y;
	    this.vX = options.vX;
	    this.vY = options.vY;
	    this.quantity = constant.PI*this.width*this.width*constant.DENSITY;
	    this.color = options.color || '#000000';


	    this.ctx = ctx;
	    this.id = id;
	}

	Planet.prototype.draw = function () {
	    var circle = new Path2D();
	    this.ctx.fillStyle = this.color;
	    circle.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
	    this.ctx.fill(circle);
	};

	Planet.prototype.move = function (fX, fY) {
	    this.vX = this.vX + (fX * constant.TIME/ this.quantity);
	    this.vY = this.vY + (fY * constant.TIME/ this.quantity);
	    this.x = this.x + this.vX * constant.TIME;
	    this.y = this.y + this.vY * constant.TIME;
	};



/***/ },
/* 2 */
/***/ function(module, exports) {

	exports.G = 9.8;
	exports.DENSITY = 0.01;
	exports.PI = 3.14;
	exports.TIME = 1;


/***/ }
/******/ ]);