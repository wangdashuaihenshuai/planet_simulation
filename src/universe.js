var constant = require('../constant/constant.js');
var _ = require('underscore');
var Planet = require('./planet.js');
var Matrix = require('./matrix.js');
var utils = require('./utils.js');

module.exports = exports = Universe;

/**
 * the object of universe.
 * @constructor
 * @param {string} canvas - the id of canvas.
 */
function Universe() {
    this.planetId = 0;
    this.planets = [];
    this.planetsList = {};
    this.background = '#000000';
}

/**
 * add a planet in universe.
 * @param {object} options - the options of a planet,{width:float, x:float, y:float, vX:float, vY:float, color:string}.
 */
Universe.prototype.addPlanet = function (options) {
    // init planet
    var self = this;
    var planet = new Planet(options, this.ctx, this.planetId);
    var matrix = new Matrix();
    var planetInfo = {
        planet:planet,
        matrix: matrix
    };
    this.planets.push(planetInfo);
    this.planetsList[this.planetId] = planetInfo;

    // add planet influence
    _.map(this.planets, function (_planet) {
        if (_planet.planet.id != self.planetId) {
            self.addPlanetF(planetInfo, _planet);
        }
    });

    this.planetId ++;
};

/**
 *caculate all F in the planets.
 */
Universe.prototype.caculate = function () {
    var self = this;
    _.map(this.planets, function (_planet) {
        _.map(_planet.matrix.filterPlanetId(), function (planetId) {
            self.updatePlanetF(_planet, self.planetsList[planetId]);
        });
    });

    _.map(this.planets, function (_planet) {
        _planet.matrix.flush();
    });
};

/**
 * add the f between two planets.
 * @param {Object} planet1Info - the planetInfo instance, { planet:planet, matrix: matrix }.
 * @param {Object} planet1Info - the planetInfo instance, { planet:planet, matrix: matrix }.
 */
Universe.prototype.addPlanetF = function (planet1Info, planet2Info) {
    var caculateF = utils.caculateF(planet1Info.planet, planet2Info.planet);
    f1Info = {f:caculateF.f1, changed: 1, caculate:true};
    f2Info = {f:caculateF.f2, changed: 1, caculate:true};
    planet1Info.matrix.addF(planet2Info.planet.id, f1Info);
    planet2Info.matrix.addF(planet1Info.planet.id, f2Info);
};


/**
 * update the f between two planets.
 * @param {Object} planet1Info - the planetInfo instance, { planet:planet, matrix: matrix }.
 * @param {Object} planet1Info - the planetInfo instance, { planet:planet, matrix: matrix }.
 */
Universe.prototype.updatePlanetF = function (planet1Info, planet2Info) {
    var caculateF = utils.caculateF(planet1Info.planet, planet2Info.planet);
    f1Info = {f:caculateF.f1, changed: 1, caculate:true};
    f2Info = {f:caculateF.f2, changed: 1, caculate:true};
    planet1Info.matrix.updateF(planet2Info.planet.id, f1Info);
    planet2Info.matrix.updateF(planet1Info.planet.id, f2Info);

};

/**
 * get the AllF in one planet and move it.
 */
Universe.prototype.move = function () {
    var self = this;
    _.map(this.planets, function (_planet) {
        _planet.planet.move(_planet.matrix.getAllF());

        /* if (_planet.planet.x > self.canvasWidth || _planet.planet.x < 0) { */
            // _planet.planet.vX =  - _planet.planet.vX;
        // }
        // if (_planet.planet.y > self.canvasHeight || _planet.planet.y < 0) {
            // _planet.planet.vY =  - _planet.planet.vY;
        /* } */

    });
};

/**
 * init draw contents.
 * @param {string} canvasId - the id of <canvas></canvas>.
 */
Universe.prototype.initDraw = function (canvasId, canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.id = canvasId;
    this.canvas = document.getElementById(this.id);
    this.ctx = this.canvas.getContext("2d");
};

/**
 * draw all planets.
 */
Universe.prototype.draw = function () {
    _.map(this.planets, function (_planet) {
        _planet.planet.draw();
    });
};

/**
 * clear the canvas.
 */
Universe.prototype.clear = function () {
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

};

/**
 * run the universe.
 */
Universe.prototype.run = function () {
    var self = this;
    self.caculate();
    self.move();
    self.clear();
    self.draw();
    window.requestAnimationFrame(function () {
        self.run();
    });
};
