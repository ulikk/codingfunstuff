'use strict';

var fs = require('fs');

var LETTER = function(c) {
  this.chr = c;
  this.count = 1;
}

var sum=0;

function processLine(line) {
  var s = line.split('[');
  var name = s[0].split('-');
  var id = Number(name[ name.length - 1]);
  var checksum = s[1].substring(0,s[1].length-1);
  // build checksum
  var L = {};
  for (var i=0, len=name.length-1; i<len; ++i) {
    var n = name[i];
    for (var j=0, jlen=n.length; j<jlen; ++j) {
      var c = n[j];
      if (c in L) {
        L[c].count++;
      } else {
        L[c] = new LETTER(c);
      }
    }
  }
  var R = Object.values(L);
  R.sort( (a,b) => {
    if(a.count > b.count) return -1;
    if(b.count > a.count) return 1;
    if(a.chr < b.chr) return -1;
    if(b.chr < a.chr) return 1;
    return 0;
  } );
  // validate checksum
  for (var i=0, len=checksum.length; i<len; ++i) {
    if (checksum[i] != R[i].chr) return 0;
  }
  return id;
  //console.log(JSON.stringify(R));
  //console.log("name:" + name + " id:" + id + " checksum:" + checksum);
}

// unit test

//console.log(processLine("aaaaa-bbb-z-y-x-123[abxyz]"));
//console.log(processLine("a-b-c-d-e-f-g-h-987[abcde]"));
//console.log(processLine("not-a-real-room-404[oarel]"));
//console.log(processLine("totally-real-room-200[decoy]"));

/*
var input = ['aaaaa-bbb-z-y-x-123[abxyz]',
'a-b-c-d-e-f-g-h-987[abcde]',
'not-a-real-room-404[oarel]',
'totally-real-room-200[decoy]',
''];
*/

var input = fs.readFileSync('day4-input.txt', 'UTF8').split('\n');

for (var i=0,len = input.length-1; i<len; i++) {
  sum += processLine(input[i]);
}
console.log(sum);
