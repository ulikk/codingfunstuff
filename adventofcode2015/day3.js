'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day3-input.txt', 'UTF8');

// delivered presents storage delivered[x][y]
var delivered = {};

function deliverPresent(p)
{
  if (!delivered[p.x]) 
  { 
     delivered[p.x] = {}; 
  }
  if (!delivered[p.x][p.y]) 
  { 
     delivered[p.x][p.y] = 1; 
  } else {
     delivered[p.x][p.y]++;
  }
}

function deliver(path)
{
  var posSanta = { 'x' : 0, 'y' : 0 };
  var posRobotSanta = { 'x' : 0, 'y' : 0 };

  var isRealSanta = true;

  deliverPresent(posSanta);
  deliverPresent(posRobotSanta);

  for (var i = 0, len = path.length; i < len; i++) 
  {
    var p = isRealSanta ? posSanta : posRobotSanta;
    switch (path[i]) 
    {
      case '^' : p.y=p.y-1; break;
      case 'v' : p.y=p.y+1; break;
      case '>' : p.x=p.x+1; break;
      case '<' : p.x=p.x-1; break;
      default: console.log('wrong input: c');
    }
    deliverPresent(p);
    isRealSanta = !isRealSanta;
  }
}

//deliverPresent(pos);
//deliver("^v");
//deliver("^>v<");
//deliver("^v^v^v^v^v");
deliver(input);

console.log(JSON.stringify(delivered));
var total = 0;
for (var x in delivered) {
  total += Object.keys(delivered[x]).length;
}
console.log('total delivered: ' + total);

