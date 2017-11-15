'use strict';

var fs = require('fs');
var input = fs.readFileSync('day3-input.txt', 'UTF8').split('\n');

var possible = 0;

function countPossible(A,B,C) {
  if (((A < (B+C)) && (B < (A+C)) && (C < (A+B))) ) {
    possible++;
  }
}

for (var i=0,len = input.length; i<len-1; i+=3) {
  var A0 = Number(input[i].substring(0,5));
  var B0 = Number(input[i].substring(5,10));
  var C0 = Number(input[i].substring(10,15));
  var A1 = Number(input[i+1].substring(0,5));
  var B1 = Number(input[i+1].substring(5,10));
  var C1 = Number(input[i+1].substring(10,15));
  var A2 = Number(input[i+2].substring(0,5));
  var B2 = Number(input[i+2].substring(5,10));
  var C2 = Number(input[i+2].substring(10,15));
  countPossible(A0,A1,A2);
  countPossible(B0,B1,B2);
  countPossible(C0,C1,C2);
}
console.log("total:" + (input.length-1) + " possible:" + possible);
