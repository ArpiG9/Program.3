

function generate(matrixSize, gr, grEat, ntr, ptr, fire, drt) {
    let matrix = []
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < ntr; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < ptr; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < fire; i++) {
        let x = 0
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    for (let i = 0; i < drt; i++) {
        let x = 0
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }

    }
    return matrix
}


let matrix = generate(35, 145, 20, 15, 45, 5, 10)


var side = 15;
let grassArr = []
let grassEaterArr = []
let neutralArr = []
let predatorArr = []
let fireArr = []
let dirtArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y))

            } else if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x, y))

            } else if (matrix[y][x] == 3) {
                neutralArr.push(new Neutral(x, y))

            } else if (matrix[y][x] == 4) {
                predatorArr.push(new Predator(x, y))

            } else if (matrix[y][x] == 5) {
                fireArr.push(new Thunder(x, y))

            } else if (matrix[y][x] == 6) {
                dirtArr.push(new Dirt(x, y))

            }

        }
    }
}

function draw() {

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

    for (var i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in dirtArr) {
        if (grassEaterArr.length == 0) {
            dirtArr[i].mul()
        }
    }

    for (var i in predatorArr) {
        predatorArr[i].eat()
        if (grassEaterArr.length == 0) {
            predatorArr[i].die()
        }
    }
    for (var i in neutralArr) {
        neutralArr[i].eat()
        if (grassEaterArr.length == 0) {
            neutralArr[i].die()
        }
    }
}
let count = 0
setInterval(() => {
    if (neutralArr.length > 0) {
        for (var i in fireArr) {
            fireArr[i].flash()
        }
    }
}, 100);
