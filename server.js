var express = require("express");
var fs = require("fs");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);


app.use(express.static("GrassEater_JS"));

app.get("/", function (req, res) {
  res.redirect("index.html");
});

server.listen(3000);

stat = {
  grass: 0,
  grasseater: 0,
  predator: 0,
  neutral: 0,
}

grassArr = [];
grassEaterArr = [];
neutralArr = [];
predatorArr = [];
thunderArr = [];
bombArr = [];

LivingCreature = require("./GrassEater_JS/LivingCreature");
Grass = require("./GrassEater_JS/Grass");
GrassEater = require("./GrassEater_JS/GrassEater");
Neutral = require("./GrassEater_JS/Neutral");
Predator = require("./GrassEater_JS/Predator");
Thunder = require("./GrassEater_JS/Thunder");
Bomb = require("./GrassEater_JS/Bomb");

function generate(matrixSize, gr, grEat, ntr, ptr, thunder, bomb) {
  matrix = [];
  for (let i = 0; i < matrixSize; i++) {
    matrix[i] = [];
    for (let j = 0; j < matrixSize; j++) {
      matrix[i][j] = 0;
    }
  }

  for (let i = 0; i < gr; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
    }
  }
  for (let i = 0; i < grEat; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
    }
  }
  for (let i = 0; i < ntr; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
    }
  }
  for (let i = 0; i < ptr; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 4;
    }
  }
  for (let i = 0; i < thunder; i++) {
    let x = 0;
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 5;
    }
  }
  for (let i = 0; i < bomb; i++) {
    let x = 0;
    let y = Math.floor(Math.random() * matrixSize);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 6;
    }
  }
  return matrix;
}

matrix = generate(35, 170, 40, 25, 25, 5, 10);

function createObject() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        grassArr.push(new Grass(x, y));
      } else if (matrix[y][x] == 2) {
        grassEaterArr.push(new GrassEater(x, y));
      } else if (matrix[y][x] == 3) {
        neutralArr.push(new Neutral(x, y));
      } else if (matrix[y][x] == 4) {
        predatorArr.push(new Predator(x, y));
      } else if (matrix[y][x] == 5) {
        thunderArr.push(new Thunder(x, y));
      } else if (matrix[y][x] == 6) {
        bombArr.push(new Bomb(x, y));
      }
    }
  }
}


function game() {
  for (var i in grassArr) {
    grassArr[i].mul();
  }

  stat.grass = i;
  for (let i in grassEaterArr) {
    grassEaterArr[i].eat();
  }

  stat.grasseater = i;
  

  stat.predator = i;
  for (var i in predatorArr) {
    predatorArr[i].eat();
    if (grassEaterArr.length == 0) {
      predatorArr[i].die();
    }
  }

  stat.neutral = i;
  for (var i in neutralArr) {
    neutralArr[i].eat();
    if (grassEaterArr.length == 0) {
      neutralArr[i].die();
    }
  }


  io.sockets.emit("grasseater", stat);

  io.sockets.emit("send matrix", info);
}

setInterval(game, 150);



function Flash() {
 setInterval(function(){

  for(let i  in thunderArr){
    thunderArr[i].flash()
   }
 }, 150);

  
}

function BOOM() {
  for (let i in bombArr) {
    bombArr[i].mul();
  }
  io.sockets.emit("send matrix", info);
}

info = {
  matrix: matrix,
  weather: "amar",
}

function hiver(winter) {
  console.log(winter);

  info.weather = "dzmer";
  for (var i in grassArr) {
    grassArr[i].mulTime = 14;
  }

  io.sockets.emit("send weather", info);
}
function ete() {
  info.weather = "amar";
  for (var i in grassEaterArr) {
    grassEaterArr[i].mulTime = 6;
  }

  io.sockets.emit("send weather", info);
}
function printemps() {
  info.weather = "garun";
  for (var i in grassArr) {
    grassArr[i].mulTime = 4;
  }

  io.sockets.emit("send weather", info);
}
function aut() {
  info.weather = "ashun";
  for (var i in predatorArr) {
    predatorArr[i].mulTime = 5;
  }

  io.sockets.emit("send weather", info);
}

function Clear() {
  grassArr = [];
  grassEaterArr = [];
  neutralArr = [];
  predatorArr = [];
  thunderArr = [];
  bombArr = [];

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("pls work".matrix);
}

io.on("connection", function (socket) {
  createObject();
  socket.on("wint", hiver);
  socket.on("sum", ete);
  socket.on("spr", printemps);
  socket.on("aut", aut);
  socket.on("clear", Clear);
  socket.on("lightning", Flash);
  socket.on("bomb", BOOM);
});



// !!!!!!!  Bomb-y darcnel kerpal ev +1 kerpar