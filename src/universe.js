var constant = require('../constant/constant.js');
var _ = require('underscore');
var Planet = rquire('./planet.js');
var Matrix = require('./matrix.js');
var utils = require('./utils.js');

module.exports = exports = Universe;

function Universe(canvasId) {
    this.id = canvasId;
    this.planetId = 0;
    this.planets = [];
    this.planetsList = {};
    this.ctx = document.getElementById(this.id).getContext("2d");
    this.background = '#ffffff';
}

Universe.prototype.addPlanet = function (options) {
    // init planet
    var planet = new planet(options, this.ctx, this.planetId);
    var matrix = new Matrix();
    this.planets.push( {
        planet:planet,
        matrix: matrix
    });
    this.planetsList[planetId] = planet;

    // add planet influence
    _.map(this.planets, function (_planet) {
        if (_planet.planet.planetId != planetId) {
            this.addPlanetF(planet, _planet);
        }
    });

    this.planetId ++;
};

Universe.prototype.caculate = function () {

    _.map(this.planets, function (_planet) {
        _.map(_planet.matrix.filterPlanetId(), function (planetId) {
            this.updatePlanetF(_planet, this.planetsList[planetId]);
        });
    });

    _.map(this.planets, function (_planet) {
        _planet.matrix.flush();
    });
};

Universe.prototype.addPlanetF = function (planet1Info, planet2Info) {
    var caculateF = utils.caculateF(planet1Info.planet, planet2.planet);
    planet1Info.matrix.addF(planet2.planetId, caculateF.f1);
    planet2Info.matrix.addF(planet1.planetId, caculateF.f2);
};


Universe.prototype.updatePlanetF = function (planet1Info, planet2Info) {
    var caculateF = utils.caculateF(planet1Info.planet, planet2.planet);
    planet1Info.matrix.updateF(planet2.planetId, caculateF.f1);
    planet2Info.matrix.updateF(planet1.planetId, caculateF.f2);
};

Universe.prototype.move = function () {
    _.map(this.planets, function (_planet) {
        _planet.planet.move(_planet.matrix.allF);
    });
};

Universe.prototype.draw = function () {
    _.map(this.planets, function (_planet) {
        _planet.planet.draw();
    });
};

Universe.prototype.clear = function () {

};

Universe.prototype.run = function  () {
    this.caculate();
    this.clear();
    this.draw();
};

