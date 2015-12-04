var assert = require('assert');
var expect = require('chai').expect;
var Planet = require('../src/planet.js');
var constant = require('../constant/constant.js');

describe('planet', function () {
    describe('.move(fAll)', function () {
        it('caculate planet move',
            function () {
                var planet1 = new Planet({
                    width: 2,
                    x: 1,
                    y: 2,
                    vX: 3,
                    vY: 4,
                    color: '#00ff00',
                    id: 2
                });
                assert.equal(2, planet1.width);

                var f1 = {fX:4, fY:3, fAll:5};
                planet1.move(f1);
                assert.equal(1 + (3 + (f1.fX * constant.TIME / planet1.quantity)) * constant.TIME, planet1.x);
                assert.equal(2 + (4 + (f1.fY * constant.TIME / planet1.quantity)) * constant.TIME, planet1.y);
            }
        );
    });
});


