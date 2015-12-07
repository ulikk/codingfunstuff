'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day6-input.txt', 'UTF8').split('\n');

var lights = {};

function getLight(x,y)
{
  if (!lights[x])    {  lights[x] = {};      }
  if (!lights[x][y]) { lights[x][y] = { 'val' : 0 }; }
  return lights[x][y];
}

function parse(line, cmd, callback)
{
  if (line.indexOf(cmd) > -1)
  {
    var rest = line.substr(line.indexOf(cmd) + cmd.length).split("through");
    var p1 = rest[0].split(",");
    var p2 = rest[1].split(",");
    var l = Number(p1[0]);
    var t = Number(p1[1]);
    var r = Number(p2[0]);
    var b = Number(p2[1]);
    for (var y=t; y<=b; ++y)
    {
      for (var x=l; x<=r; ++x)
      {
        callback(x,y);
      }
    }
  }
}

function processLine(line)
{
  parse(line, "turn on", function(x,y) {
      getLight(x,y).val += 1;
  });
  parse(line, "turn off", function(x,y) {
      var l=getLight(x,y);
      l.val -= 1;
      if (l.val < 0) l.val=0;      
  });
  parse(line, "toggle", function(x,y) {
    getLight(x,y).val += 2;
  });
}

//processLine("turn on 0,0 through 999,999");
//processLine("toggle 0,0 through 999,0");
//processLine("turn off 499,499 through 500,500");
//processLine("toggle 0,0 through 999,999");
//processLine("turn on 0,0 through 0,0");

input.forEach(processLine);
//console.log(JSON.stringify(lights));
var total = 0;
for (var x in lights) {
  for (var y in lights[x]) {
    total += lights[x][y].val;
  }
}
console.log('total lit lights: ' + total);

