'use strict';
// Like a GIF For Your Yard

var input = ".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..".split("\n");

var SIZE = 6;
var LIGHTS = [];
var currentline = 0;

function parseNextLine(line)
{
  LIGHTS[currentline]=new Array(line.length);
  for (var i=0;i<line.length;++i) 
  {
    LIGHTS[currentline][i] = (line[i] == "#");
  }
  ++currentline;
}

function countOnNeighbors(lights, x,y)
{
  var on = 0;
  function CN(X,Y) { if (lights[Y][X]) ++on; }
  if (lights[y-1]) {
    CN(x-1, y-1); CN(x, y-1); CN(x+1, y-1);
  }
  CN(x-1,y); CN(x+1,y); 
  if (lights[y+1]) {
    CN(x-1, y+1); CN(x, y+1); CN(x+1, y+1);
  }
  return on;
}

function processLights(lights)
{
  var result=new Array(SIZE);
  for(var i=0;i<SIZE;++i) result[i]=new Array(SIZE);
  
  for (var y=0; y<SIZE; ++y)
  {
    for (var x=0; x<SIZE; ++x)
    {
      var on = countOnNeighbors(lights, x,y);
      if (lights[y][x]) 
      { // is on
        result[y][x] = (on == 2 || on == 3);
      } else {
        // is off
        result[y][x] = (on == 3);
      }
    }
  }
  return result;
}

function printLights(lights)
{
  for(var y=0; y<SIZE; ++y){
    for(var x=0; x<SIZE; ++x){
      process.stdout.write(lights[y][x] ? '#' : '.');
    }
    process.stdout.write('\n');
  }
}

input.forEach(parseNextLine);
// console.log(lights);

printLights(LIGHTS);
LIGHTS = processLights(LIGHTS);
console.log('-');
printLights(LIGHTS);
