var express = require('express');
var app = express();
//var server = require('http').createServer(app);
//var io = require('socket.io')(server);


app.use(express.static("GrassEater_JS"));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

app.listen(3000, function(){
    console.log("Barev");
    
});
