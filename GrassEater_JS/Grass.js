var LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x,y);
        this.multiply = 0;
        this.mulTime = 8;
    }
    
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.round(Math.random()*emptyCells.length)];

        if (newCell && this.multiply > this.mulTime) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}
