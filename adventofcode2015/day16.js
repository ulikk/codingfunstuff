'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day16-input.txt', 'UTF8').split('\n');

var aunts = {};

function parseInput(line)
{
  if (line.length == 0) return;
  var i=line.indexOf(':');
  //console.log(i);
  //console.log(line.substring(i+1));  
  var aunt = line.substring(0,i);
  var rest = line.substring(i+1).split(",");
  aunts[aunt] = {};
  rest.forEach( function(o) {
    var item = o.split(":");
    aunts[aunt][item[0].trim()] = Number(item[1]);
  });  
}

input.forEach(parseInput);
//console.log(aunts);

var search = {
  'children': 3,
  'cats': 7,
  'samoyeds': 2,
  'pomeranians': 3,
  'akitas': 0,
  'vizslas': 0,
  'goldfish': 5,
  'trees': 3,
  'cars': 2,
  'perfumes': 1
};

for (var auntname in aunts)
{
  var aunt=aunts[auntname];
  var found=true;
  for (var i in search) {
    if (aunt[i] != undefined) {
      if (i == 'cats' || i == 'trees') {
        if (aunt[i] <= search[i]) { found=false; }
      } else {
        if (i=='pomeranians' || i=='goldfish') {
          if (aunt[i] >= search[i]) { found=false; }
        } else {
          if (aunt[i] != search[i]) { found=false; }
        }
      }       
    }
  }
  if (found) { console.log(auntname); }
}
