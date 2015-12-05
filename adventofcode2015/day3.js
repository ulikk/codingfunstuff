'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day3-input.txt', 'UTF8');

// delivered presents storage delivered[x][y]
var delivered = {};
var pos = {
  'x' : 0,
  'y' : 0
};

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

function deliver(p, path)
{
  for (var i = 0, len = path.length; i < len; i++) 
  {
    switch (path[i]) 
    {
      case '^' : p.y=p.y-1; break;
      case 'v' : p.y=p.y+1; break;
      case '>' : p.x=p.x+1; break;
      case '<' : p.x=p.x-1; break;
      default: console.log('wrong input: c');
    }
    deliverPresent(p);
  }
}

deliverPresent(pos);
//deliver(pos, "^v^v^v^v^v");
deliver(pos, input);

console.log(JSON.stringify(delivered));
var total = 0;
for (var x in delivered) {
  total += Object.keys(delivered[x]).length;
}
console.log('total delivered: ' + total);
