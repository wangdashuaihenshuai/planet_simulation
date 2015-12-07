
var Planet = require('../../src/planet.js');
var Universe = require('../../src/universe.js');
var constant = require('../../constant/constant.js');

var canvasId = 'canvas';
var universe = new Universe(canvasId);

universe.initDraw('canvas');


var planet_num = 10;
var getC = function (num) {
    var arr = ['a', 'b', 'c' ,'d', 'e', 'f'];
    if(num < 10) {
        return num;
    }else{
        return arr[num - 10];
    }
};

var getColor = function () {
    var color = '#';
    for (var i = 0;i < 6;i ++) {
        color = color + String (getC(parseInt (Math.random()*16)));
    }
    return color;
};

for (var i=0; i< planet_num; i++) {
    var color = getColor();
    var rand = Math.random();
    var rand2 = Math.random();
    var planet = {width: 10,x: 2000*rand2,color:color, y: 1000*rand,vX: 150*rand,vY: 150*(1-rand)};
    universe.addPlanet(planet);
}

var planet4 = {width: 60,x: 1000,y: 500,vX: 0,color:'#ff0000',vY: 0,stop:true, density:200};
universe.addPlanet(planet4);

universe.clear();

window.requestAnimationFrame(function () {
    universe.run();
});

