import readlineSync from "readline-sync";
import chalk from "chalk";

// ---------- CONFIG ----------

const title = "DUNGEON OF CODE";
const cols = 80;
const rows = 24;

// ---------- CLASSES ----------

class Creature {
   constructor(symbol, x, y) {
      this.symbol = symbol;
      this.x = x;
      this.y = y;
      this.hp = 3;
   }
   hit(target) {
      if (target.hp > 0) target.hp--;
      if (target.hp === 0) player.xp++;
   }
}

class Player extends Creature {
   constructor(symbol, x, y, playerClass) {
      super(symbol, x, y);
      this.playerClass = playerClass;
      this.maxHp = playerClass === "Fighter" ? 10 : 6;
      this.hp = this.maxHp;
      this.maxMp = playerClass === "Fighter" ? 0 : 4;
      this.mp = this.maxMp;
      this.xp = 0;
      this.level = 1;
   }
}

class Attack {
   constructor(name, type, damage, cost) {
      this.name = name;
      this.type = type;
      this.damage = damage;
      this.cost = cost;
   }
}

// ---------- HELPER FUNCTIONS ----------

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

// ---------- RENDER SCREEN ----------

function render() {
   console.clear();

   // RENDER: Title Bar

   console.log(center(title));

   // RENDER: Map

   for (let y = 0; y < rows - 2; y++) {
      let rowOutput = "";
      for (let x = 0; x < cols; x++) {
         if (x === player.x && y === player.y) {
            rowOutput += chalk.bold.white(player.symbol);
         } else if (x === monster.x && y === monster.y) {
            if (monster.hp > 0) rowOutput += chalk.bold.red(monster.symbol);
            else rowOutput += chalk.bold.dim(monster.symbol);
         } else {
            rowOutput += chalk.gray(".");
         }
      }
      console.log(rowOutput);
   }

   // RENDER: Status Bar
   // * Class
   const renderClass = `Class: ${player.playerClass}`;
   // * Level
   const renderLevel = `Lvl: ${player.level}`;
   // * Armor
   const renderArmor = `🛡️  Chain Mail`;
   // * Weapon
   const renderWeapon = `🗡️  Longsword`;
   // * HitPoints
   let renderHP = "HP: ";
   if (player.hp === player.maxHp) renderHP += player.hp;
   else if (player.hp > player.maxHp * 0.67) renderHP += chalk.green(player.hp);
   else if (player.hp > player.maxHp * 0.33)
      renderHP += chalk.yellow(player.hp);
   else if (player.hp > 0) renderHP += chalk.red(player.hp);
   else renderHP += "💀";
   // * Experience
   const renderXP = `XP: ${player.xp}`;
   // * Menü
   const renderQuit = "[q]uit";

   const output = [
      renderClass,
      renderLevel,
      renderArmor,
      renderWeapon,
      renderHP,
      renderXP,
      renderQuit,
   ].join(chalk.dim(" | "));

   console.log(output);
}

// ---------- INITIALIZATION ----------

// Creatures
const monster = new Creature("O", 38, 10);
// const goblin = new Creature("G", 32, 14);
// const monster = [ork, goblin];
const player = new Player("@", 40, 12, "Fighter");

// Attacks
const spark = new Attack("Spark", "magical", "1D4", 1);
const longsword = new Attack("Longsword", "physical", "1D8", 0);

// ToDo: random position of monster(s)

// ---------- START GAME ----------

function checkColision(direction) {
   switch (direction) {
      case "left":
         // something
         break;
      case "up":
         if (player.x === monster.x && player.y - 1 === monster.y) {
            player.hit(monster);
            monster.hit(player);
         } else player.y--;
         break;
      default:
         // something
         break;
   }
}

while (true) {
   render();
   let key = readlineSync.keyIn("", {
      hideEchoBack: true,
      mask: "",
      limit: "wasdtq",
   });
   if (key === "w") {
      checkColision("up");
   } else if (key === "a") {
      player.x--;
   } else if (key === "s") {
      player.y++;
   } else if (key === "d") {
      player.x++;
   } else if (key === "t") {
      // Test
      monster.hit(player);
   } else if (key === "q") {
      break;
   }
   //  else {
   //    break;
   // }
}
