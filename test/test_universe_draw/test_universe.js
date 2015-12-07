var assert = require('assert');
var expect = require('chai').expect;
var _ = require('underscore');

var Planet = require('../../src/planet.js');
var Universe = require('../../src/universe.js');
var constant = require('../../constant/constant.js');

var canvasId = 'canvas';
var universe = new Universe(canvasId);
var planet1 = {width: 20,x: 30,y: 30,vX: 30,vY: 40,color: '#00ff00',id: 2 };
var planet2 = {width: 20,x: 130,y: 130,vX: -30,vY: -40,color: '#00ff00',id: 2 };

universe.addPlanet(planet1);
universe.addPlanet(planet2);

window.requestAnimationFrame(function () {
    universe.run();
});

