"use strict";
// Opening the Turing Lock
var fs=require('fs');
//var INPUT = "inc a\njio a, +2\ntpl a\ninc a".split('\n');
var INPUT = fs.readFileSync('day23-input.txt', 'UTF8').split('\n');

var ROM = [];
var PC = 0;
var REGS = {
 'a' : 1,
 'b' : 0
};

var INSTRUCTIONS = {
 'hlf' : function() { REGS[this.p1] /= 2; },
 'tpl' : function() { REGS[this.p1] *= 3; },
 'inc' : function() { REGS[this.p1]++; },
 'jmp' : function() { PC += this.p1 - 1; },
 'jie' : function() { if (REGS[this.p1]%2==0) PC += this.p2-1; },
 'jio' : function() { if (REGS[this.p1]==1) PC += this.p2-1; },
}

function OP(mne, p1, p2)
{
  this.mnemonic = mne;
  this.apply = INSTRUCTIONS[mne];
  this.p1 = p1;
  this.p2 = p2;
}
OP.prototype.toString = function() {
  var s=this.mnemonic;
  if (this.p1) s += " " + this.p1;
  if (this.p2) s += " " + this.p2;
  return s;
}

//---------------

function interpret() 
{
  while (PC < ROM.length && ROM[PC])
  {
    console.log('[' + PC + ']' + ROM[PC].toString());
    ROM[PC++].apply();
  }
  console.log('** execution ends **');
  console.log(REGS);
}

function parseLine(line) {
  var T = line.split(" ");
  if (T.length==3) {
    T[1] = T[1].split(",")[0];
  }
  var op = new OP(T[0], T[1], T[2]);
  //console.log(op.toString());
  ROM.push(op);  
}

INPUT.forEach(parseLine);
interpret();
