var utils = require('../src/utils.js');
var assert = require('assert');
var Planet = require('../src/planet.js');

before(function (){
    console.log('test utils....');
});

describe('utils', function () {
    describe('.caculateFAll()', function () {
        it('caculate fx and fy sum vector fAll',
            function () {
                var f1 = {
                    fX:3,
                    fY:4
                };
                assert.equal(5, utils.caculateFAll(f1));
                var f2 = {
                    fX:5,
                    fY:12
                };
                assert.equal(13, utils.caculateFAll(f2));
            }
        );
    });
    describe('.caculateFChange()', function () {
        it('caculate how much changed between f1 and f2',
           function () {
                var f1 = {
                    fX:3,
                    fY:4
                };
                var f2 = {
                    fX:5,
                    fY:12
                };
                assert.equal(1.6, utils.caculateFChange(f1, f2));
            }
        );
    });
    describe('.caculateQuantity()', function () {
        it('caculate the planet quantity',
           function () {
                assert.equal(3, utils.caculateQuantity(10));
            }
        );
    });
    describe('.caculateF()', function () {
        it('caculate the f between two planet',
           function () {
                var planet1_1= new Planet({
                    width: 2,
                    x: 0,
                    y: 0,
                    vX: 0,
                    vY: 0,
                });
                var planet2_1= new Planet({
                    width: 2,
                    x: 0,
                    y: 0,
                    vX: 0,
                    vY: 0,
                });
                var result_1 = utils.caculateF(planet1_1, planet2_1);
                assert.equal(0, result_1.f1.fX);
                assert.equal(0, result_1.f1.fY);
                assert.equal(0, result_1.f2.fX);
                assert.equal(0, result_1.f2.fY);

                var planet1_2 = new Planet({
                    width: 4,
                    x: 2,
                    y: 2,
                    vX: 0,
                    vY: 0,
                });

                var planet2_2 = new Planet({
                    width: 2,
                    x: 0,
                    y: 0,
                    vX: 0,
                    vY: 0,
                });
            }
        );
    });
});
