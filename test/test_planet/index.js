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

// test planet draw and move
/* console.log(planet.x, planet.y); */
// planet.move(100, 100);
// console.log(planet.x, planet.y, planet.quantity);
/* planet.draw(); */
