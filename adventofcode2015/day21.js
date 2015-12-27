"use strict";
// RPG Simulator 20XX

function Item(name, cost, dmg, armor)
{
	this.name = name;
	this.cost = cost;
	this.dmg  = dmg;
	this.armor = armor;
}

function Character(name, hp, damage, armor)
{
	this.name = name;
	this.fullHP = hp;
	this.HP = hp;
	this.dmg = damage;
	this.armor = armor;
    this.equipment = [];
}
Character.prototype.getAtt = function(name)
{
	var value=this[name];
	this.equipment.forEach(function(e){
		value += e[name];
	});
	return value;
};

var Shop = {
	weapons : [ 
	  new Item("Dagger",8,4,0),
	  new Item("Shortsword",10,5,0),
	  new Item("Warhammer",25,6,0),
	  new Item("Longsword",40,7,0),
	  new Item("Greataxe",74,8,0),
	],
	armors : [
	  new Item("NoArmor",0,0,0),
	  new Item("Leather",13,0,1),
	  new Item("Chainmail",31,0,2),
	  new Item("Splintmail",53,0,3),
	  new Item("Bandedmail",75,0,4),
	  new Item("Platemail",102,0,5),
	],
	rings : [
	  new Item("no ring",0,0,0),
	  new Item("Damage +1",25,1,0),
	  new Item("Damage +2",50,2,0),
	  new Item("Damage +3",100,3,0),
	  new Item("Defense +1",20,0,1),
	  new Item("Defense +2",40,0,2),
	  new Item("Defense +3",80,0,3),
	]
};

function attack(attacker, defender)
{
	var dmg = attacker.getAtt("dmg") - defender.getAtt("armor");
	if (dmg < 1) {
		dmg=1;
	}
	defender.HP -= dmg;
	console.log(attacker.name + " attacks " + defender.name + " for " + dmg + " damage. HP:" + defender.HP);
}

function battle(chr1, chr2)
{
	chr1.HP = chr1.fullHP;
	chr2.HP = chr2.fullHP;
	while(true)
	{
		console.log(JSON.stringify(chr1) + " vs. " + JSON.stringify(chr2));
		attack(chr1, chr2);
		if (chr2.HP <= 0) {
			console.log(chr1.name + " wins!");
			return chr1;
		}
		attack(chr2, chr1);
		if (chr1.HP <= 0) {
			console.log(chr2.name + " wins!");
			return chr2;
		}
	}
}

// test for cheapest option:
// must buy 1 weapon, optional 1 armor, optional 0-2 rings
function allVariations(shop, player, enemy)
{
	var best = Number.MAX_VALUE;
	var beste = [];
	var worst = Number.MIN_VALUE;
	var worste = [];
	shop.weapons.forEach(function(weapon){
		shop.armors.forEach(function(armor){
			for (var l=0;l<shop.rings.length;++l)
			{
				var ringl = shop.rings[l];
				for (var r=0;r<shop.rings.length;++r)
				{
					if (r!=l) {
						var ringr = shop.rings[r];
						console.log("weapon: " + weapon.name
							+ " armor:" + armor.name + " left hand:" + ringl.name
							+ " right hand: " + ringr.name);
						var price = weapon.cost + armor.cost + ringl.cost + ringr.cost;
						console.log('price:' + price);
						player.equipment = [weapon, armor, ringl, ringr];
						if (battle(player, enemy)==player)
						{
							if (price < best)
							{
								best = price;
								beste = player.equipment.map(function(i){return i.name});
							}
						}
						if (battle(player, enemy)==enemy)
						{
							if (price > worst)
							{
								worst = price;
								worste = player.equipment.map(function(i){return i.name});
							}
						}
					}
				}
			}			
		});
	});
    console.log("===============================");
    console.log("best price win:" + best);
    console.log("equipment:" + beste);
    console.log("worst price lose:" + worst);
    console.log("equipment:" + worste);

}

//battle( new Character("player", 8, 5, 5), new Character("boss", 12, 7, 2));
//allVariations(Shop, new Character("player", 8, 5, 5), new Character("boss", 12, 7, 2));
allVariations(Shop, new Character("player", 100, 0, 0), new Character("boss", 100, 8, 2));
