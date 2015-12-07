var utils = require('../src/utils.js');
var assert = require('assert');
var expect = require('chai').expect;
var Planet = require('../src/planet.js');
var constant = require('../constant/constant.js');

describe('utils', function () {
    describe('.caculateFAll()', function () {
        it('caculate fx and fy sum vector fAll',
            function () {
                var f1 = {
                    fX: 3,
                    fY: 4,
                    fAll: 5
                };
                assert.equal(5, utils.caculateFAll(f1));
                var f2 = {
                    fX: 5,
                    fY: 12,
                    fAll: 13
                };
                assert.equal(13, utils.caculateFAll(f2));
            }
        );
    });

    describe('.caculateFChange()', function () {
        it('caculate how much changed between f1 and f2',
           function () {
                var f1 = 4;
                var f2 = 8;
                assert.equal(1, utils.caculateFChange(f1, f2));
            }
        );
    });

    describe('.caculateQuantity()', function () {
        it('caculate the planet quantity',
           function () {
                assert.equal(constant.PI * 100 *constant.DENSITY, utils.caculateQuantity(10));
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
                var result_1 = { f1: { fX: 0, fY: 0, fAll: 0 }, f2: { fX: 0, fY: 0, fAll: 0 } };
                expect(result_1).to.deep.equal(utils.caculateF(planet1_1, planet2_1));

                var planet1_2 = new Planet({
                    width: 4,
                    x: 1,
                    y: 1,
                    vX: 0,
                    vY: 0,
                });
                planet1_2.quantity = 10;
                var planet2_2 = new Planet({
                    width: 1,
                    x: 0,
                    y: 0,
                    vX: 0,
                    vY: 0,
                });
                planet2_2.quantity = 5;

                f_2_unit = (constant.G * 10 * 5)/(25 * 5);
                var result_2 = { f1: { fX: - f_2_unit*1, fY: - f_2_unit*1, fAll: f_2_unit*5 }, f2: { fX: f_2_unit*1, fY: f_2_unit*1, fAll: f_2_unit*5 } };
                expect(result_2).to.deep.equal(utils.caculateF(planet1_2, planet2_2));
            }
        );
    });
});
