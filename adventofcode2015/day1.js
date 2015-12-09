'use strict';

var fs = require('fs');

var input = fs.readFileSync('day1-input.txt', 'UTF8');

var floor=0, inBasement=-1;

for (var i = 0, len = input.length; i < len; i++) {
  switch (input[i]) 
  {
    case '(': floor++; break;
    case ')': floor--; break;
    default: console.log('malformed input:' + input[i]); break;
  }
  if (floor==-1 && inBasement==-1) {
    inBasement = i+1;
  }
}

console.log('santa is on floor:' + floor);
console.log('santa entered the basement at position ' + inBasement);
