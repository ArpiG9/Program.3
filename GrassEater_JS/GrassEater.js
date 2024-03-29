var LivingCreature = require("./LivingCreature");

module.exports = class GrassEater extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
        this.mulTime = 20;
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.round(Math.random()*emptyCells.length)];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8;
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = emptyCells[Math.round(Math.random()*emptyCells.length)];
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= this.mulTime) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
