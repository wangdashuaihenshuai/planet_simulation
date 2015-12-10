var constant = require('../constant/constant.js');

/**
 * caculate the fAll of the F.
 * @param {object} f - the object of F, {fX:float, fY:float, fAll:float}.
 * @return {Number} - the fAll of the F.
 */
function caculateFAll (f) {
    return Math.sqrt( Math.pow(f.fX, 2) + Math.pow(f.fY, 2) );
}

/**
 * caculate the changed of two f.
 * @param  {Number} fOld - the old f.
 * @param  {Number} fNew - the new f.
 * @return {Number} changed - how much the f changed.
 */
function caculateFChange (fOld, fNew){
    var changed = (fNew - fOld) / fOld;
    return changed;
}

/**
 * caculate the area of the planet.
 * @param  {Number} width - the width of the planet.
 * @return {Number} - the area of the planet.
 */
function caculateQuantity (width, density) {
    return constant.PI*Math.pow(width, 2)*density;
}

/**
 * @param  {Object} planet1 - the instance of the Planet.
 * @param  {Object} planet2 - the instance of the Planet.
 * @return {object} - two F between two planet.
 */
function caculateF (planet1, planet2) {
    var distancePow = Math.pow( (planet1.x - planet2.x), 2) + Math.pow( (planet1.y - planet2.y), 2);

    if (distancePow === 0) {
        return {
            f1:{fX: 0, fY:0, fAll:0},
            f2:{fX: 0, fY:0, fAll:0},
        };
    }

    var distance = Math.sqrt(distancePow);

    var trueDistance = distance;
    if (distance <= (planet1.width + planet2.width)) {
        distance = planet1.width + planet2.width;
        distancePow = Math.pow(distance, 2);
    }

    var f = constant.G * planet1.quantity * planet2.quantity / distancePow;
    f1x = (planet2.x - planet1.x) * f / (distance * Math.pow(constant.scale, 2));
    f2x = (planet1.x - planet2.x) * f / (distance * Math.pow(constant.scale, 2));
    f1y = (planet2.y - planet1.y) * f / (distance * Math.pow(constant.scale, 2));
    f2y = (planet1.y - planet2.y) * f / (distance * Math.pow(constant.scale, 2));

    if (distance <= (planet1.width + planet2.width)) {
        var bDistance = trueDistance / (planet1.width + planet2.width);
        return {
            f1:{fX: f1x*bDistance, fY:f1y*bDistance, fAll:f*bDistance},
            f2:{fX: f1x*bDistance, fY:f1y*bDistance, fAll:f*bDistance},
        };
    }

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
