var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static("."));

app.get('/', function (req, res) {
   res.send('index.html');
});

server.listen(3000,function(){
    console.log("Barev");
    
});