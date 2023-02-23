// ---------- CLASSES ----------

export class Creature {
   constructor(name, symbol, x, y) {
      this.name = name;
      this.symbol = symbol;
      this.x = x;
      this.y = y;
      this.hp = 3; // noch fest
   }
   hit(target) {
      // ToDo: Schaden auswürfeln (Longsword - 1D8)
      // Spell - ???
      if (target.hp > 0) target.hp--;
      if (this.level && target.hp === 0) this.xp++;
   }
}

export class Player extends Creature {
   constructor(name, symbol, x, y, playerClass) {
      super(name, symbol, x, y);
      this.playerClass = playerClass;
      this.maxHp = playerClass === "Fighter" ? 10 : 6;
      this.hp = this.maxHp;
      this.maxMp = playerClass === "Fighter" ? 0 : 4;
      this.mp = this.maxMp;
      this.xp = 0;
      this.level = 1;
   }
}

export class Attack {
   constructor(name, type, damage, cost) {
      this.name = name;
      this.type = type;
      this.damage = damage;
      this.cost = cost;
   }
}
