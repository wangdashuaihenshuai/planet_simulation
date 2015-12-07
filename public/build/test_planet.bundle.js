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

	//test planet draw and move
	console.log(planet.x, planet.y, planet.quantity);
	planet.move({fX:100, fY:100, FAll: 120});
	console.log(planet.x, planet.y, planet.quantity);
	planet.draw();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(2);
	var utils = __webpack_require__(3);

	exports = module.exports = Planet;

	/**
	 * @param {object} options - the options of planet, {width:float, x:float, y:float, vX:float, vY:float, color:string}.
	 * @param {object} ctx - the ctx of canvas.
	 * @param {number} id - id of planet, int.
	 */
	function Planet (options, ctx, id) {
	    this.width = options.width;
	    this.x = options.x;
	    this.y = options.y;
	    this.vX = options.vX;
	    this.vY = options.vY;
	    this.density = options.density || constant.DENSITY;
	    this.quantity = utils.caculateQuantity(this.width, this.density);
	    this.color = options.color || '#cc7065';
	    this.stop = options.stop || false;
	    this.ctx = ctx;
	    this.id = id;
	}

	/**
	 * init draw the planet.
	 */
	Planet.prototype.initDraw = function (ctx) {
	    this.ctx = ctx;
	};

	/**
	 * draw the planet.
	 */
	Planet.prototype.draw = function () {
	    var circle = new Path2D();
	    this.ctx.fillStyle = this.color;
	    circle.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
	    this.ctx.fill(circle);
	};

	/**
	 * put in f, and move the planet.
	 * @param  {object} fAll - the object of f, {fX:float, fY:float, fAll:float}.
	 */
	Planet.prototype.move = function (fAll) {
	    if (this.stop) return;
	    var fX = fAll.fX;
	    var fY = fAll.fY;

	    this.vX = this.vX + (fX * constant.TIME/ this.quantity);
	    this.vY = this.vY + (fY * constant.TIME/ this.quantity);
	    this.x = this.x + this.vX * constant.TIME;
	    this.y = this.y + this.vY * constant.TIME;
	    this.show();
	};

	Planet.prototype.show = function () {
	    console.log('id', this.id, '-------');
	    console.log('position', this.x, this.y);
	    console.log('V', this.vX, this.vY);
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	exports.G = 10;
	exports.DENSITY = 100;
	exports.PI = 5;
	exports.TIME = 0.02;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(2);

	/**
	 * caculate the fAll of the F.
	 * @param {object} f - the object of F, {fX:float, fY:float, fAll:float}.
	 * @return {Number} - the fAll of the F.
	 */
	function caculateFAll (f) {
	    return Math.sqrt( Math.pow(f.fX, 2) + Math.pow(f.fY, 2) );
	}

	/**
	 * caculate the changed of two f.
	 * @param  {Number} fOld - the old f.
	 * @param  {Number} fNew - the new f.
	 * @return {Number} changed - how much the f changed.
	 */
	function caculateFChange (fOld, fNew){
	    var changed = (fNew - fOld) / fOld;
	    return changed;
	}

	/**
	 * caculate the area of the planet.
	 * @param  {Number} width - the width of the planet.
	 * @return {Number} - the area of the planet.
	 */
	function caculateQuantity (width, density) {
	    return constant.PI*Math.pow(width, 2)*density;
	}

	/**
	 * @param  {Object} planet1 - the instance of the Planet.
	 * @param  {Object} planet2 - the instance of the Planet.
	 * @return {object} - two F between two planet.
	 */
	function caculateF (planet1, planet2) {
	    var distancePow = Math.pow( (planet1.x - planet2.x), 2) + Math.pow( (planet1.y - planet2.y), 2);

	    if (distancePow === 0) {
	        return {
	            f1:{fX: 0, fY:0, fAll:0},
	            f2:{fX: 0, fY:0, fAll:0},
	        };
	    }

	    var distance = Math.sqrt(distancePow);

	    if (distance <= (planet1.width + planet2.width)) {
	        distance = planet1.width + planet2.width;
	        distancePow = Math.pow(distance, 2);
	    }

	    var f = constant.G * planet1.quantity * planet2.quantity / distancePow;
	    f1x = (planet2.x - planet1.x) * f / distance;
	    f2x = (planet1.x - planet2.x) * f / distance;
	    f1y = (planet2.y - planet1.y) * f / distance;
	    f2y = (planet1.y - planet2.y) * f / distance;

	    return {
	        f1:{fX: f1x, fY:f1y, fAll:f},
	        f2:{fX: f2x, fY:f2y, fAll:f},
	    };
	}

	utils = {
	    'caculateFAll': caculateFAll,
	    'caculateFChange': caculateFChange,
	    'caculateQuantity': caculateQuantity,
	    'caculateF': caculateF
	};

	module.exports = exports = utils;


/***/ }
/******/ ]);