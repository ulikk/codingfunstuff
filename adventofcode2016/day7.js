'use strict';

var fs = require('fs');

function hasABBA(s) {
  for (var i=0, ie=s.length-3; i<ie; ++i) {
    if ( (s[i] == s[i+3]) 
      && (s[i+1] == s[i+2]) 
      && (s[i] != s[i+1]) ) {
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
  
  //console.log("in:" + IN + " out:" + OUT);
  var hasin  = IN.map(hasABBA).reduce( (s,v) => { return s || v; }, false);
  var hasout = OUT.map(hasABBA).reduce( (s,v) => { return s || v; }, false);
  //console.log("hasin:" + hasin + " hasout:" + hasout);
  return hasout && !hasin;
}

/*
var input = [
'abba[mnop]qrst',
'abcd[bddb]xyyx',
'aaaa[qwer]tyui',
'ioxxoj[asdfgh]zxcvbn'
];
*/
//console.log(processLine(input[0]));


var input = fs.readFileSync('day7-input.txt', 'UTF8').split('\n');

var TLS = 0;

for (var i=0,len = input.length; i<len; i++) {
  if (processLine(input[i])) { TLS++; }
}
console.log('TLS supported:' + TLS);
