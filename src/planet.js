var constant = require('../constant/constant.js');
var utils = require('./utils.js');

exports = module.exports = Planet;

/**
 * @param {object} options - the options of planet, {width:float, x:float, y:float, vX:float, vY:float, color:string}.
 * @param {object} ctx - the ctx of canvas.
 * @param {number} id - id of planet, int.
 */
function Planet (options, ctx, id) {
    this.width = options.width;
    this.x = options.x;
    this.y = options.y;
    this.vX = options.vX;
    this.vY = options.vY;
    this.density = options.density || constant.DENSITY;
    this.quantity = utils.caculateQuantity(this.width, this.density);
    this.color = options.color || '#cc7065';
    this.backColor = options.backColor || '#cc7065';
    this.stop = options.stop || false;
    this.ctx = ctx;
    this.id = id;
}

/**
 * init draw the planet.
 */
Planet.prototype.initDraw = function (ctx) {
    this.ctx = ctx;
};

/**
 * draw the planet.
 */
Planet.prototype.draw = function () {
    var circle = new Path2D();
    this.ctx.fillStyle = this.color;
    circle.arc(this.x, this.y, this.width*9/6, 0, 2 * Math.PI);
    this.ctx.fill(circle);

    var circle2 = new Path2D();
    this.ctx.fillStyle = '#3eb1bf';
    circle2.arc(this.x, this.y, this.width*8/6, 0, 2 * Math.PI);
    this.ctx.fill(circle2);

    var rGrd = this.ctx.createRadialGradient(this.x, this.y, 0,   this.x, this.y, this.width*1.5);
    rGrd.addColorStop(0, this.color);
    rGrd.addColorStop(1, this.backColor);
    this.ctx.fillStyle = rGrd;

    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.width,0,Math.PI*2,true);
    this.ctx.closePath();
    this.ctx.fill();
};

/**
 * put in f, and move the planet.
 * @param  {object} fAll - the object of f, {fX:float, fY:float, fAll:float}.
 */
Planet.prototype.move = function (fAll) {
    if (this.stop) return;
    var fX = fAll.fX;
    var fY = fAll.fY;

    this.vX = this.vX + (fX * constant.TIME/ this.quantity);
    this.vY = this.vY + (fY * constant.TIME/ this.quantity);
    this.x = this.x + this.vX * constant.TIME;
    this.y = this.y + this.vY * constant.TIME;
};

Planet.prototype.show = function () {
    console.log('id', this.id, '-------');
    console.log('position', this.x, this.y);
    console.log('V', this.vX, this.vY);
};
