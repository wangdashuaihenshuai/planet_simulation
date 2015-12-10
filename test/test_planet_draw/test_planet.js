var Planet = require('../../src/planet.js');

var ctx = document.getElementById("canvas").getContext("2d");

var planet = new Planet({
    width: 20,
    x: 50,
    y: 50,
    vX: 10,
    vY: 10,
    color: '#00ff00'
}, ctx, 1);

planet.draw();

//test planet draw and move
console.log(planet.x, planet.y, planet.quantity);
planet.move({fX:100, fY:100, FAll: 120});
console.log(planet.x, planet.y, planet.quantity);
planet.draw();



var rGrd =ctx.createRadialGradient(450, 150, 30,   450, 150, 150);
rGrd.addColorStop(0, '#00ff00');
rGrd.addColorStop(1, '#ff0000');
ctx.fillStyle = rGrd;

ctx.beginPath();
ctx.arc(450,150,300,0,Math.PI*2,true);
ctx.closePath();
ctx.fill();
