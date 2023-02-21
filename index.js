// SETUP - MAP DIMENSIONS

const cols = 80;
const rows = 24;

// CLASSES

class Creature {
   constructor(symbol, x, y) {
      this.symbol = symbol;
      this.x = x;
      this.y = y;
   }
}

class Player extends Creature {
   constructor(symbol, x, y, playerClass) {
      super(symbol, x, y);
      this.playerClass = playerClass;
      this.hp = playerClass === "Fighter" ? 10 : 6;
      this.xp = 0;
   }
}

const monster = new Creature("M", 20, 6);
const player = new Player("@", 40, 12, "Fighter");

// RENDER MAP

const title = " DUNGEON OF CODE ";

// centers string, based on width of terminal (cols)
// fills rest with
function center(string) {
   const freeSpace = cols - string.length;
   let returnString = "";
   for (let i = 0; i < Math.floor(freeSpace / 2); i++) returnString += "_";
   returnString += string;
   for (let i = 0; i < freeSpace / 2; i++) returnString += "_";
   return returnString;
}

console.clear();

console.log(center(title));

for (let y = 0; y < rows - 2; y++) {
   let rowOutput = "";
   for (let x = 0; x < cols; x++) {
      if (x === player.x && y === player.y) {
         rowOutput += player.symbol;
      } else if (x === monster.x && y === monster.y) {
         rowOutput += monster.symbol;
      } else {
         rowOutput += ".";
      }
   }
   console.log(rowOutput);
}

// RENDER STATUS BAR

console.log(
   ` Class: ${player.playerClass} | Lvl: 1 | 🛡️  Chain Mail | 🗡️  Longsword | HP: ${player.hp} | XP: 0`
);
