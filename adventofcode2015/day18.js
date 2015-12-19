'use strict';
// Like a GIF For Your Yard
var fs=require('fs');

//var input = ".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..".split("\n");
var input = fs.readFileSync('day18-input.txt', 'UTF8').split('\n');

var SIZE = 100;
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

function writePBM(lights, index)
{
  var pbm = "P1\n# ulikk adventofcode2015 day18\n" + SIZE + " " + SIZE + "\n";
  for(var y=0; y<SIZE; ++y){
    var line = [];
    for(var x=0; x<SIZE; ++x){
      line.push(lights[y][x] ? '1' : '0');
    }
    pbm = pbm.concat(line.join(" ") + "\n");
  }
  fs.writeFileSync("lights"+index+".pbm", pbm);
}

var I=0;
function doStep(l)
{
  var r = processLights(l);
  r[0][0] = true;
  r[99][0] = true;
  r[99][99] = true;
  r[0][99] = true;
  writePBM(r,I++);
  //printLights(r);
  //console.log('-');
  return r;
}

function countLights(lights)
{
  var count=0;
  for(var y=0; y<SIZE; ++y){
    for(var x=0; x<SIZE; ++x){
      if (lights[y][x]) count++;
    }
  }
  return count;
}

input.forEach(parseNextLine);
  LIGHTS[0][0] = true;
  LIGHTS[99][0] = true;
  LIGHTS[99][99] = true;
  LIGHTS[0][99] = true;
// console.log(lights);
//printLights(LIGHTS);
for (var steps=0; steps<100; ++steps)
{
  LIGHTS = doStep(LIGHTS);
}
console.log(countLights(LIGHTS));
