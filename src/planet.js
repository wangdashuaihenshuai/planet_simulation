var constant = require('../constant/constant.js');
var utils = require('./utils.js');

exports = module.exports = Planet;

/**
 * @param {[type]}
 * @param {[type]}
 * @param {[type]}
 */
function Planet (options, ctx, id) {
    this.width = options.width;
    this.x = options.x;
    this.y = options.y;
    this.vX = options.vX;
    this.vY = options.vY;
    this.quantity = utils.caculateQuantity(this.width);
    this.color = options.color || '#000000';

    this.ctx = ctx;
    this.id = id;
}

/**
 * @return {[type]}
 */
Planet.prototype.draw = function () {
    var circle = new Path2D();
    this.ctx.fillStyle = this.color;
    circle.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    this.ctx.fill(circle);
};

/**
 * @param  {[type]}
 * @return {[type]}
 */
Planet.prototype.move = function (fAll) {
    /* this.show(); */
    /* console.log(fAll.fX, fAll.fY, '-----',this.id,'--------'); */
    var fX = fAll.fX;
    var fY = fAll.fY;
    this.vX = this.vX + (fX * constant.TIME/ this.quantity);
    this.vY = this.vY + (fY * constant.TIME/ this.quantity);
    this.x = this.x + this.vX * constant.TIME;
    this.y = this.y + this.vY * constant.TIME;
};

/**
 * @return {[type]}
 */
Planet.prototype.show = function () {
    console.log(this.x);
    console.log(this.y);
    console.log(this.vX);
    console.log(this.vY);
};
