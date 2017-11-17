'use strict';

var fs = require('fs');

var DISPLAY = function(width, height) {
  this.width  = width;
  this.height = height;
  // initialize display
  this.N = new Array(this.height);
  for (var row=0; row<this.height; ++row) {
    this.N[row] = new Array(this.width);
  }
  this.clear();
}

DISPLAY.prototype.clear = function() {
  for (var row=0; row<this.height; ++row) {
    for (var col=0; col<this.width; ++col) {
      this.N[row][col] = '.';
    }
  }
}

DISPLAY.prototype.getCol = function(col) {
  var c=[];
  for (var row=0; row<this.height; ++row) {
    c.push(this.N[row][col]);
  }
  return c;
}

DISPLAY.prototype.setCol = function(col, c) {
  for (var row=0; row<this.height; ++row) {
    this.N[row][col] = c[row];
  }
}

DISPLAY.prototype.on = function(row, col) {
  this.N[row][col] = '#';
}

DISPLAY.prototype.rect = function(a, b) {
  for (var row=0; row<b; row++) {
    for(var col=0; col<a; col++) {
      this.on(row,col);
    }
  }
}

DISPLAY.prototype.rotate = function(arr, by) {
  return arr.slice(arr.length-by).concat(arr.slice(0,arr.length-by))
}

DISPLAY.prototype.rotate_row = function(row, by) {
  this.N[row] = this.rotate(this.N[row], by);
}

DISPLAY.prototype.rotate_col = function(col, by) {
  this.setCol( col, this.rotate(this.getCol(col), by) );
}

DISPLAY.prototype.toString = function() {
  var s = "";
  for (var row=0; row<this.height; ++row) {
    s += this.N[row].join('') + '\n';
  }
  return s;
}

DISPLAY.prototype.countOn = function() {
  var ons = 0;
    for (var row=0; row<this.height; ++row) {
    for (var col=0; col<this.width; ++col) {
      if (this.N[row][col] == '#') { ons++; }
    }
  }
  return ons;
}


function processLine(line) {
  var L = line.split(' ');
  if (L[0] == 'rect') {
    var S = L[1].split('x');
    D.rect(Number(S[0]), Number(S[1]));
  } else if (L[0] == 'rotate') {
    if (L[1] == 'row') {
      var S = L[2].split('=');
      var by = Number(L[4]);
      D.rotate_row(Number(S[1]), by);
    } else if (L[1] == 'column') {
      var S = L[2].split('=');
      var by = Number(L[4]);
      D.rotate_col(Number(S[1]), by);
    }
  }
}

/*
// unit tests 0
var d = new DISPLAY(7, 3);
console.log("1=====\n" + d.toString());
d.rect(3,2);
console.log("2=====\n" + d.toString());
d.rotate_col(1,1);
console.log("3=====\n" + d.toString());
d.rotate_row(0,4);
console.log("4=====\n" + d.toString());
d.rotate_col(1,1);
console.log("5=====\n" + d.toString());
*/

/*
var D = new DISPLAY(7,3);
var input = [
'rect 3x2',
'rotate column x=1 by 1',
'rotate row y=0 by 4',
'rotate column x=1 by 1'
];
*/

//console.log(processLine(input[0]));

var D = new DISPLAY(50,6);
var input = fs.readFileSync('day8-input.txt', 'UTF8').split('\n');

for (var i=0,len = input.length; i<len; i++) {
  processLine(input[i]);
  console.log("step:" + i + "\n" + D.toString());
}
console.log('on: ' + D.countOn() );
