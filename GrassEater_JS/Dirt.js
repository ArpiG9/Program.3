class Dirt extends LivingCreature{
    
    mul() {
        var emptyCells1 = this.chooseCell(0);
        var newCell1 = random(emptyCells1);
        var emptyCells2 = this.chooseCell(1);
        var newCell2 = random(emptyCells2);
        var emptyCells3 = this.chooseCell(5);
        var newCell3 = random(emptyCells3);

        if (newCell1) {
            var newX1 = newCell1[0];
            var newY1 = newCell1[1];
            matrix[newY1][newX1] = 6;

            var newdirt = new Dirt(newX1, newY1);
            dirtArr.push(newdirt);
        } else if (newCell2) {
            var newX2 = newCell2[0];
            var newY2 = newCell2[1];
            matrix[newY2][newX2] = 6;

            var newdirt = new Dirt(newX2, newY2);
            dirtArr.push(newdirt);
        } else if (newCell3) {
            var newX3 = newCell3[0];
            var newY3 = newCell3[1];
            matrix[newY3][newX3] = 6;

            var newdirt = new Dirt(newX3, newY3);
            dirtArr.push(newdirt);
        }

    }

}
