'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day2-input.txt', 'UTF8').split('\n');

var totalArea = 0.0;

function getArea(l,w,h) {
  var s1 = l*w;
  var s2 = w*h;
  var s3 = h*l;
  var area = 2*s1 + 2*s2 + 2*s3;
  var smallestside = Math.min(s1, Math.min(s2,s3));
  //console.log(l + "x" + w + "x" + h + " : " + area + " area + " + smallestside + " extra paper.");
  return area + smallestside;
}

//console.log('total: ' + getArea(2,3,4));
//console.log('total: ' + getArea(1,1,10));


input.forEach(function (line)
{
  var e = line.split('x');
  var l = e[0];
  var w = e[1];
  var h = e[2];
  totalArea += getArea(l,w,h);
});

console.log('total area of wrapping paper:' + totalArea);
