'use strict';

var fs = require('fs');

function processLine(line) {

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


var input = fs.readFileSync('input.txt', 'UTF8').split('\n');

for (var i=0,len = input.length; i<len; i++) {
  processLine(input[i]);
}
