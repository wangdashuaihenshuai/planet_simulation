var express = require('express');
var app = express();

app.use(express.static('public'));

server.listen(8000, function () {
    console.log("listen port 8000");
});
