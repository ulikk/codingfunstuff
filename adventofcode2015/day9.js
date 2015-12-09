'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day9-input.txt', 'UTF8').split('\n');

var locations = { };

function getLocation(loc)
{
  if (!locations[loc]) { locations[loc] = {}; }
  return locations[loc];
}

// build adjacency structure
function parseLine(line)
{
  if (line.trim().length > 0) 
  {
    var conn = line.split("=");
    var locs = conn[0].split("to");

    var dist = Number(conn[1]);
    var from = locs[0].trim();    
    var to   = locs[1].trim();
    
    getLocation(from)[to] = dist;   
    getLocation(to)[from] = dist;    
  }
}

// calculate cost of one path
function pathCost(path)
{
  var cost=0;
  for (i=0;i<path.length-1;++i)
  {
    if (!locations[path[i]][path[i+1]]) { return null;  } // no edge
    cost += locations[path[i]][path[i+1]];
  }
  return cost;
}

for (var i=0;i<input.length; ++i)
{
  parseLine(input[i]);
}

var indices = [];
var LOC = Object.keys(locations);
console.log('Locations: ' + LOC.length);
for (var i=0;i<LOC.length; ++i)
{
  indices.push(i);
}

// this nice function taken from http://stackoverflow.com/questions/9960908/permutations-in-javascript
var result = indices.reduce(function permute(res, item, key, arr) {
    return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(function(perm) { return [item].concat(perm); }) || item);
}, []);
console.log("testing " + result.length + " possibilities.");

var shortest = Number.MAX_VALUE;
var longest  = 0;
result.forEach(function(index)
{
  var path = index.map(function(val){ return LOC[val]; });
  var cost = pathCost(path);
  if (cost) {
    if (cost < shortest) shortest=cost;
    if (cost > longest)  longest=cost;
    //console.log(JSON.stringify(path) + " : " + pathCost(path));
  }
});

console.log("shortest: " + shortest);
console.log("longest: " + longest);
