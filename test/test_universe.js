var assert = require('assert');
var expect = require('chai').expect;
var _ = require('underscore');

var Matrix = require('../src/matrix.js');
var Planet = require('../src/planet.js');
var Universe = require('../src/universe.js');
var constant = require('../constant/constant.js');

describe('universe', function () {
    describe('.constructor', function () {
        it('constructor of Univeser.',
            function () {
                var universe = new Universe();
                assert.equal(0, universe.planetId);
                expect({}).to.deep.equal(universe.planetsList);
                expect([]).to.deep.equal(universe.planets);
            }
        );
    });

    describe('.addPlanet(option)', function () {
        it('add planet in universe',
            function () {
                var universe = new Universe();
                var planet1 = {
                    width: 4,
                    x: 1,
                    y: 1,
                    vX: 3,
                    vY: 4,
                    id: 2,
                };
                universe.addPlanet(planet1);
                assert.equal(1, _.keys(universe.planetsList).length);
                assert.equal(1, universe.planets.length);
                planet1Info = {planet: new Planet(planet1, undefined, 0), matrix: new Matrix()};
                expect(planet1Info).to.deep.equal(universe.planetsList[0]);

                var planet2 = {
                    width: 1,
                    x: 0,
                    y: 0,
                    vX: 3,
                    vY: 4,
                    id: 2,
                };
                universe.addPlanet(planet2);
                assert.equal(2, _.keys(universe.planetsList).length);
                assert.equal(2, universe.planets.length);

                assert.equal(1, universe.planetsList[0].matrix.matrixList[0]);
                assert.equal(0, universe.planetsList[1].matrix.matrixList[0]);

            }
        );
    });

    describe('.caculate()', function () {
        it('caculate universe',
            function () {
                var universe = new Universe();
                var planet1 = {
                    width: 4,
                    x: 1,
                    y: 1,
                    vX: 3,
                    vY: 4,
                    id: 2
                };
                universe.addPlanet(planet1);

                var planet2 = {
                    width: 1,
                    x: 0,
                    y: 0,
                    vX: 3,
                    vY: 4,
                    id: 2
                };
                universe.addPlanet(planet2);

                universe.caculate();

            }
        );
    });
    describe('.move()', function () {
        it('caculate universe',
            function () {
                var universe = new Universe();
                var planet1 = {
                    width: 4,
                    x: 1,
                    y: 1,
                    vX: 3,
                    vY: 4,
                    id: 2
                };
                universe.addPlanet(planet1);

                var planet2 = {
                    width: 1,
                    x: 0,
                    y: 0,
                    vX: 3,
                    vY: 4,
                    id: 2
                };
                universe.addPlanet(planet2);

                universe.move();
            }
        );
    });

});

