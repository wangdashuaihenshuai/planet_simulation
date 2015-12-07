var constant = require('../constant/constant.js');
var _ = require('underscore');
var Planet = require('./planet.js');
var Matrix = require('./matrix.js');
var utils = require('./utils.js');

module.exports = exports = Universe;

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */


/**
 * the object of universe.
 * @constructor
 * @param {string} canvas - the id of canvas.
 */
function Universe(canvasId) {
    this.id = canvasId;
    this.planetId = 0;
    this.planets = [];
    this.planetsList = {};
    this.canvas = document.getElementById(this.id);
    this.ctx = this.canvas.getContext("2d");
    this.background = '#ffffff';
}

/**
 * add a planet in universe.
 * @param {object} options - the options of a planet,{}.
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
        _planet.matrix.flush();
    });
};

/**
 * add the f between two planets.
 * @param {object} planet1Info - the planet instance.
 * @param {object} planet2Info - the planet instance.
 */
Universe.prototype.addPlanetF = function (planet1Info, planet2Info) {
    var caculateF = utils.caculateF(planet1Info.planet, planet2Info.planet);
    planet1Info.matrix.addF(planet2Info.planet.id, caculateF.f1);
    planet2Info.matrix.addF(planet1Info.planet.id, caculateF.f2);
};


/**
 * update the f between two planets.
 * @param {object} planet1Info - the planet instance.
 * @param {object} planet2Info - the planet instance.
 */
Universe.prototype.updatePlanetF = function (planet1Info, planet2Info) {
    var caculateF = utils.caculateF(planet1Info.planet, planet2Info.planet);
    planet1Info.matrix.updateF(planet2Info.planet.planetId, caculateF.f1);
    planet2Info.matrix.updateF(planet1Info.planet.planetId, caculateF.f2);
};

/**
 * get the AllF in one planet and move it.
 */
Universe.prototype.move = function () {
    _.map(this.planets, function (_planet) {
        _planet.planet.move(_planet.matrix.getAllF());
    });
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

