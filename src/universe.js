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
    this.ctx = document.getElementById(this.id).getContext("2d");
}

Universe.prototype.addPlanet = function (options) {
    var planet = new planet(options, this.ctx, this.planetId);
    this.planetId ++;
    var matrix = new Matrix();
    this.planets.push( {
        planet:planet,
        matrix: matrix
    });
};

Universe.prototype.caculate = function () {
};

Universe.prototype.draw = function () {

};

Universe.prototype.run = function  () {
    this.caculate();
    this.draw();
};

