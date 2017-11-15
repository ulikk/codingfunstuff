'use strict';

var FIELD = function() {
  this.pad = [
    "       ",
    "   1   ",
    "  234  ",
    " 56789 ",
    "  ABC  ",
    "   D   ",
    "       "
  ];
  // start at 5
  this.x = 1;
  this.y = 3;  
  this.move = {}
  this.move['U'] = ()=>{ if (this.isbutton(this.x,this.y-1)) { this.y--; }; };
  this.move['D'] = ()=>{ if (this.isbutton(this.x,this.y+1)) { this.y++; }; };
  this.move['L'] = ()=>{ if (this.isbutton(this.x-1,this.y)) { this.x--; }; };
  this.move['R'] = ()=>{ if (this.isbutton(this.x+1,this.y)) { this.x++; }; };
}
FIELD.prototype.isbutton = function(x,y) {
  return this.pad[y][x]!=' ';
}
FIELD.prototype.code = function() {
  return this.pad[this.y][this.x];
}


var fs = require('fs');
var input = fs.readFileSync('day2-input.txt', 'UTF8').split('\n');

var code = '';

for (var i=0,len = input.length; i<len; i++) {
  var line = input[i];
  var P = new FIELD();
  for (var j=0, len=line.length; j<len; j++) {
    P.move[line[j]]();
  }
  console.log('line ' + i + ' ' + ' seq ' + j + ' -> pos:' + P.x + "," + P.y + " code: " + P.code());
  code += P.code();
}

console.log(code);
