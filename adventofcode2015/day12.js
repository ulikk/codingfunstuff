'use strict';

var fs=require('fs');

// JSAbacusFramework.io

var input = JSON.parse(fs.readFileSync('day12-input.txt', 'UTF8'));

function processEachElement(obj, f)
{
  if (!Array.isArray(obj)) {
    for (var k in obj)
    { if (obj[k] == 'red') return; }
  }
  
  for(var k in obj)
  {
    var element = obj[k];
    if (element !== null && typeof element === 'object') 
    {
      processEachElement(element, f);
    } 
    else 
    {
      f(element);
    }
  }
}

function testSum(input)
{
   var sum = 0;
   processEachElement(input, function(e) {
     //console.log('f(' + e + ') [' + typeof e + ']');
     if (typeof e === 'number')
     {
        sum += e;
     }
   });
   console.log(input);
   console.log('sum:' + sum);
}

//testSum(JSON.parse('[1,2,3]'));
//testSum(JSON.parse('{"a":2,"b":4}'));
//testSum(JSON.parse('[[[3]]]'));
//testSum(JSON.parse('{"a":{"b":4},"c":-1}'));
//testSum(JSON.parse('{"a":[-1,1]}'));
//testSum(JSON.parse('[-1,{"a":1}]'));
//testSum(JSON.parse('[]'));
//testSum(JSON.parse('{}'));
testSum([1,{"c":"red","b":2},3]);
testSum({"d":"red","e":[1,2,3,4],"f":5});
testSum([1,"red",5]);
testSum(input);