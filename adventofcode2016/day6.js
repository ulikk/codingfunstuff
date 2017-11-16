'use strict';

var fs = require('fs');

var POS={};

function processLine(line) {
  for (var i=0, ie=line.length; i<ie; i++) {
    if (!POS[i]) { POS[i]={}; }
    if (!POS[i][line[i]]) { POS[i][line[i]]=0; }
    POS[i][line[i]]++;
  }
}

/*
var input = [
  'eedadn',
  'drvtee',
  'eandsr',
  'raavrd',
  'atevrs',
  'tsrnev',
  'sdttsa',
  'rasrtv',
  'nssdts',
  'ntnada',
  'svetve',
  'tesnvt',
  'vntsnd',
  'vrdear',
  'dvrsen',
  'enarar'
];
*/
 var input = fs.readFileSync('day6-input.txt', 'UTF8').split('\n');

for (var i=0,len = input.length; i<len; i++) {
  processLine(input[i]);
}

var RESULT=[];

// part 1: b[1]-a[1], part 2: a[1]-b[1]

for (var p in POS) {
  var letter = Object.entries(POS[p]).sort((a,b)=>{ return b[1]-a[1]; })[0][0];
  RESULT[p]=letter;
}
console.log(RESULT.join(''));
