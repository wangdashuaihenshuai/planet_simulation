var _ = require('underscore');
var utils = require('./utils.js');
module.exports = exports = Matrix;

/**
 * init Matrix object
 */
function Matrix() {
    this.matrixF = {};
    this.matrixList = [];
    this.allF = {fX:0, fY:0, fAll:0};
}

/**
 * judge if the planet in the matrix.
 * @param  {Int} planetId - the id of planet.
 * @return {Boolean} - return if the planet in the matrix.
 */
Matrix.prototype.isExists = function (planetId) {
    return (this.matrixList.indexOf(planetId) == -1) ? false : true;
};

/**
 * @param {Int} planetId - the id of planet.
 * @param {Object} fInfo - the object of fInfo,{ f: {fX:float, fY:float, fAll:float}, changed: int (defalt 1), caculate: true}{ f: {fX:float, fY:float, fAll:float}, changed: int (defalt 1), caculate: true}.
 */
Matrix.prototype.addF = function (planetId, fInfo) {
    if (this.isExists(planetId)) return;
    this.matrixList.push(planetId);
    this.matrixF[planetId] = fInfo;
};

/**
 * @param {Int} planetId - the id of planet.
 */
Matrix.prototype.removeF = function (planetId) {
    if (!this.isExists(planetId)) return;
    this.matrixList.pop(this.matrixList.indexOf(planetId));
    delete this.matrixF[planetId];
};

/**
 * update the fInfo in the matrix.
 * @param {Int} planetId - the id of planet.
 * @param {Object} fInfo - the object of fInfo,{ f: {fX:float, fY:float, fAll:float}, changed: int (defalt 1), caculate: true}{ f: {fX:float, fY:float, fAll:float}, changed: int (defalt 1), caculate: true}.
 */
Matrix.prototype.updateF = function (planetId, fInfo) {
    if (!this.isExists(planetId)) return;
    var changed = utils.caculateFChange(this.matrixF[planetId].f.fAll, fInfo.f.fAll);
    fInfo.changed = changed;
    fInfo.caculate = true;
    this.matrixF[planetId] = fInfo;
};

/**
 * let all the Finfo.caculate = false.
 */
Matrix.prototype.flush = function () {
    _.map(this.matrixF, function (fInfo, planetId) {
        fInfo.caculate = false;
    });
};

/**
 * @return {Object} fAll - the object of F, {fX:float, fY:float, fAll:float}.
 */
Matrix.prototype.getAllF = function () {
    var self = this;
    this.allF = {fX:0, fY:0, fAll:0};
    _.map(this.matrixF, function (_fInfo, key){
        self.allF.fX = self.allF.fX + _fInfo.f.fX;
        self.allF.fY = self.allF.fY + _fInfo.f.fY;
    });
    this.allF.fAll = utils.caculateFAll(this.allF);
    return this.allF;
};

/**
 * filter the planets witch not caculate.
 * @return {Arry} filterPlanetId - filter the not caculate planets.
 */
Matrix.prototype.filterPlanetId = function () {
    var filterPlanetId = [];
    _.map(this.matrixF, function (F, planetId) {
        if (!F.caculate) filterPlanetId.push(planetId);
    });
    return filterPlanetId;
};
