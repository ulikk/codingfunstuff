'use strict';

var fs = require('fs');

function getABA(s, ABA) {
  for (var i=0, ie=s.length-2; i<ie; ++i) {
    if ( (s[i] == s[i+2]) && (s[i] != s[i+1]) ) {
      ABA[s.substring(i,i+3)] = true;
    }
  }
  return ABA;
}

function contains_ABA_BAB(aba, bab) {
  var N = Object.keys(aba);
  for (var i=0, ie=N.length; i<ie; ++i) {
    var t = N[i][1]+N[i][0]+N[i][1];
    if (t in bab) {
      return true;
    }
  }
  return false;
}

function processLine(line) {
  var IN = [];
  var OUT = [];
  var s = "";
  for (var i=0, ie=line.length; i<ie; ++i) {
    switch (line[i]) {
      case '[' : 
        OUT.push(s); s = "";
      break;
      case ']' : 
        IN.push(s); s = "";
        break;
      default: 
        s += line[i];
        break;
    }
  }
  if (s.length > 0) OUT.push(s);

  console.log("in:" + IN + " out:" + OUT);

  var ABA={};
  for (var k in IN) { getABA(IN[k], ABA); }
  var BAB={};
  for (var k in OUT) { getABA(OUT[k], BAB); }

  console.log(JSON.stringify(ABA) + " - " + JSON.stringify(BAB));
  return contains_ABA_BAB(ABA,BAB);
}

/*
var input = [
'aba[bab]xyz',
'xyx[xyx]xyx',
'aaa[kek]eke',
'zazbz[bzb]cdb'
];

console.log(processLine(input[0]));
console.log(processLine(input[1]));
console.log(processLine(input[2]));
console.log(processLine(input[3]));
*/

var input = fs.readFileSync('day7-input.txt', 'UTF8').split('\n');

var SSL = 0;

for (var i=0,len = input.length; i<len; i++) {
  if (processLine(input[i])) { SSL++; }
}
console.log('SSL supported:' + SSL);
