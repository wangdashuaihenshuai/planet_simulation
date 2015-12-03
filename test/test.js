function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000";
    var circle = new Path2D();
    circle.arc(100, 100, 50, 0, 2 * Math.PI);

    ctx.fill(circle);
    var circle2 = new Path2D();
    circle2.arc(200, 200, 50, 0, 2 * Math.PI);

    ctx.fillStyle = "#D44400";
    ctx.fill(circle2);

  }
}
draw();

