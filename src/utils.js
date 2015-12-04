var constant = require('../constant/constant.js');

function caculateFAll (f) {
    return Math.sqrt( Math.pow(f.fX, 2) + Math.pow(f.fY, 2) );
}

function caculateFChange (fOld, fNew){
    var changed = (fNew - fOld) / fOld;
    return changed;
}

function caculateQuantity (width) {
    return constant.PI*Math.pow(width, 2)*constant.DENSITY;
}

function caculateF (planet1, planet2) {
    var distancePow = Math.pow( (planet1.x - planet2.x), 2) + Math.pow( (planet1.y - planet2.y), 2);

    if (distancePow === 0) {
        return {
            f1:{fX: 0, fY:0, fAll:0},
            f2:{fX: 0, fY:0, fAll:0},
        };
    }

    var distance = Math.sqrt(distancePow);

    if (distance <= (planet1.width + planet2.width)) {
        distance = planet1.width + planet2.width;
        distancePow = Math.pow(distance, 2);
    }

    var f = constant.G * planet1.quantity * planet2.quantity / distancePow;
    f1x = (planet2.x - planet1.x) * f / distance;
    f2x = (planet1.x - planet2.x) * f / distance;
    f1y = (planet2.y - planet1.y) * f / distance;
    f2y = (planet1.y - planet2.y) * f / distance;

    return {
        f1:{fX: f1x, fY:f1y, fAll:f},
        f2:{fX: f2x, fY:f2y, fAll:f},
    };
}

utils = {
    'caculateFAll': caculateFAll,
    'caculateFChange': caculateFChange,
    'caculateQuantity': caculateQuantity,
    'caculateF': caculateF
};

module.exports = exports = utils;
