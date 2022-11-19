class Thunder{
    constructor(x, y) {
        super(x,y)
        this.directions = [];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    flash() {


        if (this.x >= 0 && this.x < matrix[0].length && this.y >= 0 && this.y < matrix.length) {

            this.x++
            if (matrix[this.y][this.x] == 1) {
                for (var i in grassArr) {
                    if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[this.y][this.x] == 2) {
                for (var i in grassEaterArr) {
                    if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[this.y][this.x] == 3) {
                for (var i in neutralArr) {
                    if (this.x == neutralArr[i].x && this.y == neutralArr[i].y) {
                        neutralArr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[this.y][this.x] == 4) {
                for (var i in predatorArr) {
                    if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }


            matrix[this.y][this.x] = 5

        }

        if (this.x == 34) {
            this.x = 0
        }

    }

}

module.exports = new Thunder;