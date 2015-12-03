var constant = require('../constant/constant.js');

function caculateFAll (f) {
    return Math.sqrt( Math.pow(f.fX) + Math.pow(f.fY) );
}

function caculateFChange (fOld, fNew){
    var fOldAll = caculateFAll(fOld);
    var fNewAll = caculateFAll(fNew);
    var changed = Math.abs( (fNewAll - fOldAll) / fOldAll );
    return changed;
}

function caculateF (planet1, planet2) {
    distancePow = Math.pow( (planet1.x - planet2.x), 2) + Math.pow( (planet1.y - planet2.y), 2);
    distance = Math.sqrt(distancePow);
    f = constant.G * planet1.quantity * planet2.quantity / distancePow;
    f1.x = (planet2.x - planet1.x) * f / distance;
    f2.x = (planet1.x - planet2.x) * f / distance;
    f1.y = (planet2.y - planet1.y) * f / distance;
    f2.y = (planet1.y - planet2.y) * f / distance;
    return {
        f1:{fX: f1x, fY:f1y, fAll:f},
        f2:{fX: f2x, fY:f2y, fAll:f},
    };
}

utils = {
    'caculateFAll': caculateFAll,
    'caculateFChange': caculateFChange,
    'caculateF': caculateF
};

module.exports = exports = utils;
