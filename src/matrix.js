var _ = require('underscore');
var utils = require('./utils.js');
module.exports = exports = Matrix;

function Matrix() {
    this.matrixF = {};
    this.matrixList = [];
    this.allF = {fX:0, fY:0, fAll:0};
}

Matrix.prototype.isExists = function (plantId) {
    return (this.matrixList.indexOf(plantId) == -1) ? false : true;
};

// f = { f: {fX:float, fY:float, fAll:float}, changed: int (defalt 1), caculate: true}
Matrix.prototype.addF = function (plantId, F) {
    if (this.isExists(plantId)) return;
    this.matrixList.push(plantId);
    this.matrixF[plantId] = F;
};

Matrix.prototype.removeF = function (plantId) {
    if (!this.isExists(plantId)) return;
    this.matrixList.pop(this.matrixList.indexOf(plantId));
    delete this.matrixF[plantId];
};

// F = { f: {fX:float, fY:float, fAll:float}, changed: int (defalt 1), caculate: true}
Matrix.prototype.updateF = function (plantId, F) {
    if (!this.isExists(plantId)) return;
    var changed = utils.caculateFChange(this.matrixF[plantId].f.fAll, F.f.fAll);
    F.changed = changed;
    F.caculate = true;
    this.matrixF[plantId] = F;
};

Matrix.prototype.flush = function () {
    _.map(this.matrixList, function (value, key) {
        value.caculate = false;
    });
};

Matrix.prototype.getAllF = function () {
    _.map(this.matrixF, function (value, key){
        this.allF.fX = this.allF.fx + value.f.fX;
        this.allF.fY = this.allF.fY + value.f.fY;
    });
    this.allF.fAll = utils.caculateFAll(this.allF);
    return this.allF.fAll;
};

Matrix.prototype.filterPlanetId = function () {
    return _.filter(this.matrixList, function (_id) {
        return ! this.matrixF[_id].caculate;
    });
};
