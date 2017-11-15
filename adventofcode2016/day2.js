'use strict';

var POS = function() {
  this.x = 1;
  this.y = 1;
  this.move = {}
  this.move['U'] = ()=>{ if (this.y>0) { this.y--; }; };
  this.move['D'] = ()=>{ if (this.y<2) { this.y++; }; };
  this.move['L'] = ()=>{ if (this.x>0) { this.x--; }; };
  this.move['R'] = ()=>{ if (this.x<2) { this.x++; }; };
}
POS.prototype.code = function() {
  return String( (this.y*3) + this.x + 1 );
}

var fs = require('fs');
var input = fs.readFileSync('day2-input.txt', 'UTF8').split('\n');

var code = '';

for (var i=0,len = input.length; i<len; i++) {
  var line = input[i];
  var P = new POS();
  for (var j=0, len=line.length; j<len; j++) {
    P.move[line[j]]();
  }
  console.log('line ' + i + ' ' + ' seq ' + j + ' -> pos:' + P.x + "," + P.y + " code: " + P.code());
  code += P.code();
}

console.log(code);
