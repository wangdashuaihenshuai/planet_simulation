var constant = require('../constant/default.js');

exports = module.exports = Planet;

function Planet (options, ctx, id) {
    this.width = options.width;
    this.x = options.x;
    this.y = options.y;
    this.vX = options.vX;
    this.vY = options.vY;
    this.quantity = constant.PI*this.width*this.width*constant.DENSITY;
    this.color = options.color || '#000000';


    this.ctx = ctx;
    this.id = id;
}

Planet.prototype.draw = function () {
    var circle = new Path2D();
    this.ctx.fillStyle = this.color;
    circle.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    this.ctx.fill(circle);
};

Planet.prototype.move = function (fX, fY) {
    this.vX = this.vX + (fX * constant.TIME/ this.quantity);
    this.vY = this.vY + (fY * constant.TIME/ this.quantity);
    this.x = this.x + this.vX * constant.TIME;
    this.y = this.y + this.vY * constant.TIME;
};
