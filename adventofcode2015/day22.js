"use strict";
// RPG Wizard Simulator 20XX

function Effect(name, turns, dmg, armor, apply)
{
	this.name  = name;
	this.short = name[0];
	this.turns = turns;
	this.dmg   = dmg;
	this.armor = armor;
    this.apply = apply;
}

var SPELLS = 
{
	'Magic Missile' : {
		'mana': 53,
		'apply' : function(self, enemy){ enemy.HP -= 4; }
	},
	'Drain' : {
		'mana': 73,
		'apply' : function(self, enemy){ 
			self.HP += 2; enemy.HP -= 2; 
		}   
    },
    'Shield' : {
    	'mana': 113,
    	'apply' : function(self, enemy){
    		self.effects["Shield"] = new Effect("Shield", 6, 0, 7);
    	}
    },
    'Poison' : {
    	'mana': 173,
    	'apply' : function(self, enemy){
    		enemy.effects["Poison"] = new Effect("Poison", 6, 0, 0,
    			function(chr){
    				chr.HP -= 3;
    				console.log("poison does 3 dmg to " + chr.name + " remaining HP:"+chr.HP);
    			});
    	}
    },
   'Recharge' : {
    	'mana': 229,
    	'apply' : function(self, enemy){
    		self.effects["Recharge"] = new Effect("Recharge", 5, 0, 0,
    			function(chr){
    				console.log(chr.name + " recharges 101 mana.");
    				chr.mana += 101;
    			});
    	}
    }
 };

function Character(name, hp, damage, armor, mana)
{
	this.name = name;
	this.fullHP = hp;
	this.HP = hp;
	this.dmg = damage;
	this.armor = armor;
    this.mana = mana;
    this.effects = {};
}
Character.prototype.getAtt = function(name)
{
	var value=this[name];
	//console.log("getAtt["+name+"]"+JSON.stringify(this.effects));
	for (var effect in this.effects)
	{
		//console.log("effect:"+effect)
		value += this.effects[effect][name];
	}
	return value;
};
Character.prototype.processEffects =  function()
{
	for (var effect in this.effects)
	{
		var e=this.effects[effect];
		e.turns--;
		if (e.apply) { 
			console.log("Applying effect:" + e.name 
			      + " turns left:" + e.turns);
			e.apply(this); 
		}
		if (e.turns == 0)
		{
			delete this.effects[effect];
			console.log(effect + " expired.");
		}
	}
};
Character.prototype.toString = function()
{
	var effstr="";
	for (var e in this.effects)
	{
		effstr += this.effects[e].short;
	}
	return this.name + " [HP:" + this.HP + "/" + this.fullHP 
	     + " M:" + this.mana + " ATT:" + this.getAtt("dmg") + " DEF:" + this.getAtt("armor") + " EFF:"
         + effstr + "]";
};


function attack(attacker, defender, spell)
{
	console.log(attacker + " <> " + defender);
	console.log("==" + attacker.name + "'s turn ==");
	var S = SPELLS[spell];
	var dmg = 0;
	attacker.processEffects();
	defender.processEffects();
	if (attacker.HP <= 0 || defender.HP <= 0) 
	{
		return true;   
	}
	if (S)
	{
		// see if the spell can be cast
		console.log(attacker.name + " casts " + spell );
		if (attacker.mana < S.mana ) 
		{
			return false;	// not enough mana
		}
		attacker.mana -= S.mana;
		S.apply(attacker, defender);
	} else {
		var dmg = attacker.getAtt("dmg") - defender.getAtt("armor");
		if (dmg < 1) {
			dmg=1;
		}
		defender.HP -= dmg;
		console.log(attacker.name + " attacks " + defender.name + " for " + dmg + " damage. ");
	}
	return true;
}


function checkWin(chr1,chr2)
{
	if (chr2.HP <= 0) {
		console.log(chr1.name + " wins!");
		return chr1;
	}
	if (chr1.HP <= 0) {
		console.log(chr2.name + " wins!");
		return chr2;
	}
	return null;	
}

function battle(chr1, chr2, spells)
{
	//console.log(JSON.stringify(chr1) + " vs. " + JSON.stringify(chr2));
	chr1.HP = chr1.fullHP;
	chr2.HP = chr2.fullHP;
	for (var i=0; i<spells.length; ++i)
	{
		var spell=spells[i];
		if (!attack(chr1, chr2, spell))
		{
			console.log("could not attack.");
			return chr2;
		}
		var winner = checkWin(chr1,chr2);
		if(winner) return winner;
		attack(chr2, chr1);
		var winner = checkWin(chr1,chr2);
		if(winner) return winner;
	}
}


//battle( new Character("player", 10, 0, 0, 250), 
//	    new Character("boss", 13, 8, 0, 0),
//	['Poison','Magic Missile','Magic Missile','Magic Missile','Magic Missile','Drain','Magic Missile']);

battle( new Character("player", 10, 0, 0, 250), 
	    new Character("boss", 14, 8, 0, 0),
	['Recharge','Shield','Drain','Poison','Magic Missile','Drain','Magic Missile']);

