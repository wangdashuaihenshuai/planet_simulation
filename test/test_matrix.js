var assert = require('assert');
var expect = require('chai').expect;
var _ = require('underscore');

var Matrix = require('../src/matrix.js');
var constant = require('../constant/constant.js');

describe('matrix', function () {
    describe('.isExists(planetId)', function () {
        it('judge planet id Exists',
            function () {
                var matrix = new Matrix();
                assert.equal(false, matrix.isExists(1));
                var f1 = { f: {fX: 4, fY: 3, fAll: 5}, changed: 1, caculate: true};
                matrix.addF(1, f1);
                assert.equal(true, matrix.isExists(1));
            }
        );
    });

    describe('.addF(planetId, F)', function () {
        it('add a F in matrix',
            function () {
                var matrix = new Matrix();
                var f = { f: {fX: 4, fY: 3, fAll: 5}, changed: 1, caculate: true};
                var planetId = 1;
                matrix.addF(planetId, f);
                assert.equal(true, matrix.isExists(1));
                expect(f).to.deep.equal(matrix.matrixF[planetId]);

                matrix.addF(planetId, f);
                assert.equal(1, matrix.matrixList.length);
            }
        );
    });

    describe('.updateF(planetId, F)', function () {
        it('update a F in matrix',
            function () {
                var matrix = new Matrix();
                var f1 = { f: {fX: 4, fY: 3, fAll: 5}, changed: 1, caculate: true};
                var planetId = 1;
                matrix.addF(planetId, f1);

                var f2 = { f: {fX: 5, fY: 12, fAll: 12}, changed: 1, caculate: true};

                console.log(planetId, f2);
                matrix.updateF(planetId, f2);
                expect(f2.f).to.deep.equal(matrix.matrixF[planetId].f);
                assert.equal(1.4, matrix.matrixF[planetId].changed);
            }
        );
    });

    describe('.removeF(planetId)', function () {
        it('remove a F in matrix',
            function () {
                var matrix = new Matrix();
                var planetId = 1;
                matrix.removeF(planetId);

                var f = { f: {fX: 4, fY: 3, fAll: 5}, changed: 1, caculate: true};
                matrix.addF(planetId, f);

                matrix.removeF(planetId);
                expect({}).to.deep.equal(matrix.matrixF);

                assert.equal(0, matrix.matrixList.length);
            }
        );
    });
    describe('.flsuh()', function () {
        it('flush all f caculate to false',
            function () {
                var matrix = new Matrix();

                var planetId_1 = 1;
                var f1 = { f: {fX: 4, fY: 3, fAll: 5}, changed: 1, caculate: true};
                matrix.addF(planetId_1, f1);

                var planetId_2 = 2;
                var f2 = { f: {fX: 5, fY: 12, fAll: 13}, changed: 1, caculate: true};
                matrix.addF(planetId_2, f2);

                _.map(matrix.matrixF, function (F, plantId) {
                    assert.equal(true, F.caculate);
                });

                matrix.flush();

                _.map(matrix.matrixF, function (F, plantId) {
                    assert.equal(false, F.caculate);
                });
            }
        );
    });
    describe('.getAllF()', function () {
        it('get All F in this planet',
            function () {
                var matrix = new Matrix();

                var planetId_1 = 1;
                var f1 = {fX: 2, fY: 3, fAll: 5};
                matrix.addF(planetId_1, f1);

                var planetId_2 = 2;
                var f2 = {fX: 3, fY: 9, fAll: 13};
                matrix.addF(planetId_2, f2);

                assert.equal(13, matrix.getAllF());
            }
        );
    });
    describe('.filterPlanetId()', function () {
        it('get All planetId which not caculate',
            function () {
                var matrix = new Matrix();

                var planetId_1 = 1;
                var f1 = { f: {fX: 2, fY: 3, fAll: 5}, changed: 1, caculate: true};
                matrix.addF(planetId_1, f1);

                var planetId_2 = 2;
                var f2 = { f: {fX: 3, fY: 9, fAll: 13}, changed: 1, caculate: true};
                matrix.addF(planetId_2, f2);

                expect([]).to.deep.equal(matrix.filterPlanetId());
                matrix.flush();
                expect(['1' ,'2']).to.deep.equal(matrix.filterPlanetId());
            }
        );
    });

});

