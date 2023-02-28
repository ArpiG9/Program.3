var express = require("express");
var fs = require("fs");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);


app.use(express.static("GrassEater_JS"));

app.get("/", function(req, res) {
  res.redirect("index.html");
});

server.listen(3000);
matrix = [1, 1, 1];

io.on("connection", function(socket) {
  createObject();
});

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

matrix = generate(35, 170, 30, 25, 25, 5, 10);

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
  for (let i in bombArr) {
    if (grassEaterArr.length == 0) {
      bombArr[i].mul();
    }
  }

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
  if (grassEaterArr.length == 0){
    console.log("baaaa");
  }

  io.sockets.emit("grasseater", stat);

  io.sockets.emit("send matrix", matrix);
}

setInterval(game, 150);

setInterval(() => {
    if (grassEaterArr.length < 10) {
        for (var i in thunderArr) {
            thunderArr[i].flash()
        }
    }
}, 100);
