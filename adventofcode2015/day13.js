'use strict';

var fs=require('fs');

// read input
//var input = fs.readFileSync('day13-input_test.txt', 'UTF8').split('\n');
var input = fs.readFileSync('day13-input.txt', 'UTF8').split('\n');

var persons = {}

function parseLine(line)
{
  if (line=='') return;
  var t = line.split(' ');
  var p1=t[0];
  var p2=t[10].substring(0,t[10].length-1);
  if (!persons[p1]) { persons[p1] = {}; }
  persons[p1][p2] = (t[2] == 'gain') ? parseInt(t[3]) : -parseInt(t[3]);
}
input.forEach(parseLine);

var P = Object.keys(persons);
persons['myself'] = {};
P.forEach(function(other) {
  persons['myself'][other] = 0;
  persons[other]['myself'] = 0;
});

var result = Object.keys(persons).reduce(function permute(res, item, key, arr) {
    return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(function(perm) { return [item].concat(perm); }) || item);
}, []);
console.log("testing " + result.length + " possibilities for " + Object.keys(persons).length + " persons.");

//console.log(persons);

var best=0;

function getHappiness(person1, person2)
{
  return persons[person1][person2] + persons[person2][person1];
}

function testArrangement(arrangement){
  // test always the right conneection
  //console.log('testing : ' + arrangement);
  var sum=0;
  for (var i=0; i<arrangement.length-1; ++i)
  {
    //console.log(arrangement[i] + ' next to ' + arrangement[i+1] + ' : ' + persons[arrangement[i]][arrangement[i+1]]);
    sum += getHappiness(arrangement[i], arrangement[i+1]);
  }
  sum += getHappiness(arrangement[arrangement.length-1],arrangement[0]);
  //console.log('sum: ' + sum);
  if (sum > best) best = sum;
}

//testArrangement(['Alice', 'David', 'Carol', 'Bob']);

result.forEach(testArrangement);
console.log('best: ' + best);
