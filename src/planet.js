var constant = require('../constant/constant.js');
var utils = require('./utils.js');
var _ = require('underscore');

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
    this.stop = options.stop || false;
    this.ctx = ctx;
    this.id = id;
    this.locus = [{x:this.x, y:this.y}];
    this.locusLen = 500;
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
    this.drawLocus();
    var circle = new Path2D();
    this.ctx.fillStyle = this.color;
    circle.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    this.ctx.fill(circle);
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
    this.addLocus(this.x, this.y);
    this.show();
};

Planet.prototype.addLocus = function (x, y) {
    var position = {x:x, y:y};

    if (this.locus.length > this.locusLen) {
        this.locus.shift(position);
        this.locus.push(position);
    }else{
        this.locus.push(position);
    }
};

Planet.prototype.drawLocus = function (x, y) {
    var self = this;
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.locus[0].x,this.locus[0].y);
    _.map(this.locus, function (position) {
        self.ctx.lineTo(position.x, position.y);
    });
    this.ctx.stroke();
};

Planet.prototype.show = function () {
    console.log('id', this.id, '-------');
    console.log('position', this.x, this.y);
    console.log('V', this.vX, this.vY);
};
