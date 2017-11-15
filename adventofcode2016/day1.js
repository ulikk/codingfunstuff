'use strict';

var fs = require('fs');
var input = fs.readFileSync('day1-input.txt', 'UTF8').split(', ');

// start at 0,0
var x = 0
var y = 0
// face north
var dx = 0
var dy = 1

var VISITED = {}

function visit(px, py) {
  var pos = 'X'+x+'Y'+y;
  if (pos in VISITED) {
    console.log('### first visited twice: ' + pos);
    process.exit();
  } else {
    VISITED[pos]=true;
  }
}

visit(0,0);

for (var i=0, len=input.length; i<len; i++) {
  var move = input[i];
  if (move[0] == 'L') { 
    // CCW (x,y) -> (-y, x)
    var tmp = dx;
    dx = -dy;
    dy = tmp;
  } else if (move[0] == 'R') {
    // CW: (x,y) -> (y,-x)
    var tmp = dy;
    var dy = -dx;
    var dx = tmp;
  } else console.log('error in line ' + i)
  var steps = Number(move.substring(1));
  for (var i=0; i<steps; ++i) {
  console.log('x:' + x + ' y:' + y + ' dx: ' + dx + ' dy: ' + dy + ' move:' + move + "s" + i);
    x += dx;
    y += dy;
    visit(x,y);
  }
}

console.log('x:' + x + ' y:' + y + ' dx: ' + dx + ' dy: ' + dy);

