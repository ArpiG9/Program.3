var LivingCreature = require("./LivingCreature");

module.exports = class Oc extends LivingCreature {

   mul() {
      var emptyCells = this.chooseCell(0);
      var newCell = emptyCells[Math.round(Math.random() * emptyCells.length)];

      if (newCell) {
         var newX = newCell[0];
         var newY = newCell[1];
         matrix[newY][newX] = 6;

         var newGrassEater = new GrassEater(newX, newY);
         grassEaterArr.push(newGrassEater);
         this.energy = 9;
      }
   }
   eat() {
      var emptyCells = this.chooseCell(4);
      var emptyCells1 = this.chooseCell(2);
      var newCell = emptyCells[Math.round(Math.random() * emptyCells.length)];
      var newCell1 = emptyCells1[Math.round(Math.random() * emptyCells1.length)];
      if (newCell) {
         this.energy++
         var newX = newCell[0];
         var newY = newCell[1];
         matrix[newY][newX] = matrix[this.y][this.x]
         matrix[this.y][this.x] = 0
         this.x = newX
         this.y = newY
         for (var i in ocArr) {
            if (newX == ocArr[i].x && newY == ocArr[i].y) {
               ocArr.splice(i, 1);
               break;
            }
         }
         if (this.energy >= 10) {
            this.mul()
         }
         else {
            this.move()
         }
      } else if (newCell1) {
         this.energy++
         var newX1 = newCell1[0];
         var newY1 = newCell1[1];
         matrix[newY1][newX1] = matrix[this.y][this.x]
         matrix[this.y][this.x] = 0
         this.x = newX1
         this.y = newY1
         for (var i in ocArr) {
            if (newX1 == ocArr[i].x && newY1 == ocArr[i].y) {
               ocArr.splice(i, 1);
               break;
            }
         }
         if (this.energy >= 10) {
            this.mul()
         }
         else {
            this.move()
         }
      }
   }
   die() {
      matrix[this.y][this.x] = 0
      for (var i in ocArr) {
         if (this.x == ocArr[i].x && this.y == ocArr[i].y) {
            ocArr.splice(i, 0);
            break;
         }
      }

   }

}
