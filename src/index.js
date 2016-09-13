
var Planet = require('./planet.js');
var Universe = require('./universe.js');
var constant = require('../constant/constant.js');

var canvasId = 'canvas';
var universe = new Universe(canvasId);

var planet_num = 20;
var canvasWidth = 1920;
var canvasHeight = 1080;

universe.initDraw('canvas', canvasWidth, canvasHeight);


var planet_num = 30;

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

var plantEnergy = 900;
var getV = function (cW, cH, _width, x2, y2, E) {
    var x1 = cW/2;
    var y1 = cH/2;
    var length = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    var vMax = E / Math.sqrt(length);
    var vX = vMax * (y2 - y1) / length;
    var vY = vMax * (x2 - x1) / length;
    return {
        vX: vX,
        vY: vY,
    }
}

for (var i=0; i< planet_num; i++) {
    var color = getColor();
    var backColor = getColor();
    var rand = Math.random();
    var rand2 = Math.random();
    var _width = 1 + 10*rand
    var pX = canvasWidth*rand2
    var pY = canvasHeight*rand
    var v = getV(canvasWidth, canvasHeight, _width, pX, pY, plantEnergy);
    var planet = {width: _width,x: pX,y: pY, color:color,backColor:backColor,vX: v.vX,vY: v.vY};
    universe.addPlanet(planet);
}

var sun = {width: 50,x: canvasWidth/2,y: canvasHeight/2,vX: 0,color:'#ff0000',vY: 0,stop:true, density:8};
universe.addPlanet(sun);

var randomSituation = function () {
    var planet_num = 20;
    for (var i=0; i< planet_num; i++) {
        var color = getColor();
        var rand = Math.random();
        var rand2 = Math.random();
        var planet = {width: 8,x: 2000*rand2,color:color, y: 1000*rand,vX: 150*rand,vY: 150*(1-rand)};
        universe.addPlanet(planet);
    }
};

var nomalSituation = function () {
    var planet0 = {width: 10,x: 1000,color:getColor(), y:900 ,vX:320,vY:0 };
    universe.addPlanet(planet0);

    var planet1 = {width: 10,x: 1000,color:getColor(), y:300 ,vX:-420,vY:0 };
    universe.addPlanet(planet1);

    var planet2 = {width: 10,x: 700,color:getColor(), y:500 ,vX:0,vY:-370 };
    universe.addPlanet(planet2);
};


// randomSituation();

universe.clear();

window.requestAnimationFrame(function () {
    universe.run();
});
