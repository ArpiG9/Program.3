var LivingCreature = require("./LivingCreature");

module.exports = class Bomb extends LivingCreature{
    
    mul() {
        var emptyCells1 = this.chooseCell(0);
        var newCell1 = emptyCells1[Math.round(Math.random()*emptyCells1.length)];
        var emptyCells2 = this.chooseCell(1);
        var newCell2 = emptyCells2[Math.round(Math.random()*emptyCells2.lenghth)];
        var emptyCells3 = this.chooseCell(5);
        var newCell3 = emptyCells3[Math.round(Math.random()*emptyCells3.lenghth)];

        if (newCell1) {
            var newX1 = newCell1[0];
            var newY1 = newCell1[1];
            matrix[newY1][newX1] = 6;

            var newbomb = new Bomb(newX1, newY1);
            bombArr.push(newbomb);
        } else if (newCell2) {
            var newX2 = newCell2[0];
            var newY2 = newCell2[1];
            matrix[newY2][newX2] = 6;

            var newbomb = new Bomb(newX2, newY2);
            bombArr.push(newbomb);
        } else if (newCell3) {
            var newX3 = newCell3[0];
            var newY3 = newCell3[1];
            matrix[newY3][newX3] = 6;

            var newbomb = new Bomb(newX3, newY3);
            bombArr.push(newbomb);
        }

    }

}
