import readlineSync from "readline-sync";
import chalk from "chalk";
import { Creature, Player, Attack } from "./classes.js";

// ---------- CONFIG ----------

const title = "DUNGEON OF CODE";
const cols = 80;
const rows = 24;

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

// ---------- CHECK FOR ITEM/MONSTER INTERACTION ----------

function checkColision(direction) {
   switch (direction) {
      case "up":
         if (
            player.x === monster.x &&
            player.y - 1 === monster.y &&
            monster.hp > 0
         ) {
            fight(monster);
         } else player.y--;
         break;
      case "left":
         if (
            player.x - 1 === monster.x &&
            player.y === monster.y &&
            monster.hp > 0
         ) {
            fight(monster);
         } else player.x--;
         break;
      case "down":
         if (
            player.x === monster.x &&
            player.y + 1 === monster.y &&
            monster.hp > 0
         ) {
            fight(monster);
         } else player.y++;
         break;
      case "right":
         if (
            player.x + 1 === monster.x &&
            player.y === monster.y &&
            monster.hp > 0
         ) {
            fight(monster);
         } else player.x++;
         break;
      default:
         // something
         break;
   }
}

// ---------- FIGHT ----------

function fight(monster) {
   player.hit(monster);
   monster.hit(player);
   if (monster.hp > 0)
      infoBar = `You attack the ${monster.name} with your ${player.weapon}`;
   else infoBar = title;
}

// ---------- RENDER SCREEN ----------

function render() {
   console.clear();

   // RENDER: Title Bar

   console.log(center(infoBar));

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
   // * Name
   // const renderName = player.name;
   // * Class
   // const renderClass = player.playerClass;

   // * Level
   const renderLevel = `Lvl ${player.level}`;

   // * Armor
   const renderArmor = `🛡️  Chain Mail`;

   // * Weapon
   const renderWeapon = `🗡️  Longsword`;

   // * HitPoints - Color depends on amount:
   // green: > 66%
   // yellow: 66% - 34%
   // red: <= 33%
   // skull: 0 HP (dead)
   let renderHP = "HP ";
   if (player.hp === player.maxHp) renderHP += player.hp;
   else if (player.hp > player.maxHp * 0.67) renderHP += chalk.green(player.hp);
   else if (player.hp > player.maxHp * 0.33)
      renderHP += chalk.yellow(player.hp);
   else if (player.hp > 0) renderHP += chalk.red(player.hp);
   else renderHP += "💀";

   // * Experience
   const renderXP = `XP ${player.xp}`;

   // * Menü
   const renderQuit = "[q]uit";

   const output = [
      player.name,
      player.playerClass,
      renderLevel,
      renderArmor,
      renderWeapon,
      renderHP,
      renderXP,
      renderQuit,
   ].join(chalk.dim(" | "));

   console.log(output);
   console.log("Hier History");
}

// ---------- INITIALIZATION ----------

// Creatures
const monster = new Creature("Goblin", "G", 38, 10);
// const goblin = new Creature("G", 32, 14);
// const monster = [ork, goblin];
const player = new Player("Bob", "@", 40, 12, "Fighter");

// Attacks
const spark = new Attack("Spark", "magical", "1D4", 1);
const longsword = new Attack("Longsword", "physical", "1D8", 0);

// ToDo: random position of monster(s)

// ---------- GAME LOOP ----------

let infoBar = title;

while (true) {
   // DRAW MAP
   render();

   // LISTEN TO KEYBOARD INPUT
   let key = readlineSync.keyIn("", {
      hideEchoBack: true,
      mask: "",
      limit: "wasdq",
   });
   if (key === "w") {
      checkColision("up");
   } else if (key === "a") {
      checkColision("left");
   } else if (key === "s") {
      checkColision("down");
   } else if (key === "d") {
      checkColision("right");
   } else if (key === "q") {
      break;
   }
}
