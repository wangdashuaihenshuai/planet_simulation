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
 * @param  {int}
 * @return {Boolean}
 */
Matrix.prototype.isExists = function (planetId) {
    return (this.matrixList.indexOf(planetId) == -1) ? false : true;
};

/**
 * @param {int}
 * @param {object F}
 */
Matrix.prototype.addF = function (planetId, F) {
    if (this.isExists(planetId)) return;
    this.matrixList.push(planetId);
    console.log(F, 'matrix addF');
    this.matrixF[planetId] = F;
};

/**
 * @param  {int} planetId 
 */
Matrix.prototype.removeF = function (planetId) {
    if (!this.isExists(planetId)) return;
    this.matrixList.pop(this.matrixList.indexOf(planetId));
    delete this.matrixF[planetId];
};

// F = { f: {fX:float, fY:float, fAll:float}, changed: int (defalt 1), caculate: true}
/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
Matrix.prototype.updateF = function (planetId, F) {
    if (!this.isExists(planetId)) return;
    var changed = utils.caculateFChange(this.matrixF[planetId].f.fAll, F.f.fAll);
    F.changed = changed;
    F.caculate = true;
    this.matrixF[planetId] = F;
};

/**
 * @return {[type]}
 */
Matrix.prototype.flush = function () {
    _.map(this.matrixF, function (F, planetId) {
        F.caculate = false;
    });
};

/**
 * @return {[type]}
 */
Matrix.prototype.getAllF = function () {
    var self = this;
    this.allF = {fX:0, fY:0, fAll:0};
    console.log(this.matrixF,"getAllF");
    _.map(this.matrixF, function (_f, key){
        self.allF.fX = self.allF.fX + _f.fX;
        self.allF.fY = self.allF.fY + _f.fY;
    });
    this.allF.fAll = utils.caculateFAll(this.allF);
    return this.allF.fAll;
};

/**
 * @return {[type]}
 */
Matrix.prototype.filterPlanetId = function () {
    var filterPlanetId = [];
    _.map(this.matrixF, function (F, planetId) {
        if (!F.caculate) filterPlanetId.push(planetId);
    });
    return filterPlanetId;
};
