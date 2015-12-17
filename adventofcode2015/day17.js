'use strict';
// No Such Thing as Too Much
var fs=require('fs');

//var sizes = [ 20, 15, 10, 5, 5 ];
//var amount = 25;

// read input
var sizes = fs.readFileSync('day17-input.txt', 'UTF8').split('\n').map(function(n){ return Number(n)});

console.log(sizes);

var amount = 150;
var ways=0;

var variations=Math.pow(2,sizes.length)

console.log("trying " + variations + " variations.");

var count = {};

for(var i=0; i<variations; ++i)
{
  var variation = i.toString(2);
  if (variation.length < sizes.length) {
    variation = new Array(sizes.length-variation.length+1).join('0') + variation;
  }
  var sum=0;
  var numcontainers=0;
  for (var j=0; j<sizes.length; ++j) {
    if (variation[j]=='1') 
    {
      sum+=sizes[j];
      numcontainers++;
    }
  }
  
  if (sum == amount) { 
    ways++; 
    if (!count[numcontainers]) { count[numcontainers]=0; }
    count[numcontainers]++; 
  }
  //console.log(variation + " ->" + sum);
}

console.log(ways);
console.log(count);
