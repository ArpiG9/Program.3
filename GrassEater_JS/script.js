var socket = io();
var restart = document.getElementById("restart");
// socket.emit("send restart", restart)

var winter = document.getElementById("winter");
var summer = document.getElementById("summer");

winter.addEventListener("click", weath);
summer.addEventListener("click", weath);

socket.on('send matrix', drawing);


side = 20;


function setup() {
    frameRate(5);
    createCanvas(35 * side, 35 * side);
    background('#acacac');

}

function drawing(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                    fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("purple");
            }
            else if (matrix[y][x] == 4) {
                fill("red");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            else if (matrix[y][x] == 6) {
                fill("black");
            }

            rect(x * side, y * side, side, side);


        }
    }
}

socket.on("grasseater", statistics);

console.log();

function statistics(stat) {
    document.getElementById("grass").innerHTML = stat.grass;
    document.getElementById("grasseater").innerHTML = stat.grasseater;
    document.getElementById("predator").innerHTML = stat.predator;
    document.getElementById("neutral").innerHTML = stat.neutral;
}

function weath(evt) {
    if (winter) {
        fill("white")
    }else{
        fill("green");
    }
}