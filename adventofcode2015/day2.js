'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day2-input.txt', 'UTF8').split('\n');


function getArea(l,w,h) 
{
  var s1 = l*w;
  var s2 = w*h;
  var s3 = h*l;
  var area = 2*s1 + 2*s2 + 2*s3;
  var smallestside = Math.min(s1, Math.min(s2,s3));
  //console.log(l + "x" + w + "x" + h + " : " + area + " area + " + smallestside + " extra paper.");
  return area + smallestside;
}

function getRibbon(L,W,H)
{
  var p1 = 2*L+2*W;
  var p2 = 2*W+2*H;
  var p3 = 2*H+2*L;
  var p = Math.min(p1,Math.min(p2,p3));
  var rb = (p + (L*W*H));
  //console.log('L:' + L + ' W:' +W + ' H:' + H + ' p1: ' + p1 + ' p2: ' + p2 + ' p3: ' + p3 + ' p: ' + p +  ' rb:' + rb);
  return rb;
}

function test(l,w,h)
{
  var area = getArea(l,w,h);
  var ribbon = getRibbon(l,w,h);
  console.log(l+'x'+w+'x'+h+' -> area: ' + area + ' ribbon: ' + ribbon);
}

test(2,3,4);
test(1,1,10);

var totalArea   = 0.0;
var totalRibbon = 0.0;

for(var i=0; i<input.length; ++i)
{
  var line=input[i];
  var e = line.split('x');
  var l_ = e[0];
  var w_ = e[1];
  var h_ = e[2];
  //test(l_,w_,h_);
  totalArea += getArea(l_,w_,h_);
  totalRibbon += getRibbon(l_,w_,h_);
}

input.forEach(function (line)
{
});

console.log('total area of wrapping paper: ' + totalArea);
console.log('total ribbon length: ' + totalRibbon);

