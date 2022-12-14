var LivingCreature = require("./LivingCreature");

class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply > 4) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}

module.exports = new Grass;
