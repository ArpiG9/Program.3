class Neutral extends LivingCreature{

    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in neutralArr) {
            if (this.x == neutralArr[i].x && this.y == neutralArr[i].y) {
                neutralArr.splice(i, 1);
                break;
            }
        }

    }
}
