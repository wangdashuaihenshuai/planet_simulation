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
});
