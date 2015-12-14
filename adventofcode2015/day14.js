'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day14-input.txt', 'UTF8').split('\n');

//var reindeers = {
//  'Comet'  : { 'speed' : 14, 'duration' : 10, 'rest' : 127, 'distance' : 0 },
//  'Dancer' : { 'speed' : 16, 'duration' : 11, 'rest' : 162, 'distance' : 0 }
//};

var reindeers = {};

function parseLine(line)
{
  if (line == "") return;
  var l = line.split(' ');
  reindeers[l[0]] = {
    'speed' : parseInt(l[3]),
    'duration' : parseInt(l[6]),
    'rest' : parseInt(l[13]),
    'distance' : 0,
    'points' : 0
  };
}
input.forEach(parseLine);
//console.log(reindeers);

function getSpeed(reindeer, time)
{
  var index = time % (reindeer.duration+reindeer.rest);
  if (index < reindeer.duration) {
    return reindeer.speed;
  }
  return 0;
}

function simulate(seconds)
{
   for (var i=0; i<seconds; ++i)
   {
     var D=[];
     for (var r in reindeers)
     {
       reindeers[r].distance += getSpeed(reindeers[r], i);
       D.push(reindeers[r].distance);
     }
     var best = Math.max.apply(Math, D);
     for (var r in reindeers)
     {
       if (reindeers[r].distance == best) {
         reindeers[r].points++;
       }
     }   
   }   
}

simulate(2503);
console.log(reindeers);
