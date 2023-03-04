var socket = io();
var clear = document.getElementById("clear");
var winter = document.getElementById("winter");
var summer = document.getElementById("summer");
var spring = document.getElementById("spring");
var autumn = document.getElementById("autumn");
var lightning = document.getElementById("lightning");
var bomb = document.getElementById("bomb");

bomb.addEventListener("click", loo); 
function loo() {
    socket.emit("bomb")
}

lightning.addEventListener("click", send); 
function send() {
    console.log(lightning);
    
    socket.emit("lightning", lightning)
}

clear.addEventListener("click", Clear); 
function Clear() {
    socket.emit("clear")
}

winter.addEventListener("click", foo);
function foo(){
    console.log("foo")
    socket.emit("wint", winter)
}

summer.addEventListener("click", boo);
function boo(){
    socket.emit("sum", summer)
}

spring.addEventListener("click", too);
function too(){
    socket.emit("spr", spring)
}

autumn.addEventListener("click", woo);
function woo(){
    socket.emit("aut", autumn)
}

socket.on('send matrix', drawing);
socket.on('send weather', drawing);

side = 20;


function setup() {
    frameRate(5);
    createCanvas(35 * side, 35 * side);
    background('#acacac');

}
let matrixLOc = []
function drawing(info) {
 console.log(info.matrix);
 
    
    for (var y = 0; y < info.matrix.length; y++) {
        for (var x = 0; x < info.matrix[y].length; x++) {

            if (info.matrix[y][x] == 1) {
                if (info.weather == "dzmer") {
                    fill("#99baba");
                } else if(info.weather == "amar"){
                    fill("green");
                }
                else if(info.weather == "garun"){
                    fill("pink");
                }else if(info.weather == "ashun"){
                    fill("orange");
                 }
                
                   
            }
            else if (info.matrix[y][x] == 0) {
                fill("white");
            }
            else if (info.matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (info.matrix[y][x] == 3) {
                fill("purple");
            }
            else if (info.matrix[y][x] == 4) {
                fill("red");
            }
            else if (info.matrix[y][x] == 5) {
                fill("blue");
            }
            else if (info.matrix[y][x] == 6) {
                fill("black");
            }

            rect(x * side, y * side, side, side);


        }
    }
}

socket.on("grasseater", statistics);
console.log(matrixLOc);

function statistics(stat) {
    document.getElementById("grass").innerHTML = stat.grass;
    document.getElementById("grasseater").innerHTML = stat.grasseater;
    document.getElementById("predator").innerHTML = stat.predator;
    document.getElementById("neutral").innerHTML = stat.neutral;
}

