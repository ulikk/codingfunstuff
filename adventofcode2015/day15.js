'use strict';

var fs=require('fs');

// read input
var properties = ['capacity', 'durability', 'flavor', 'texture' ];

//var ingredients = {
// 'Butterscotch' : { 'capacity' : -1, 'durability' : -2, 'flavor' : 6, 'texture' : 3, 'calories' : 8 },
// 'Cinnamon' : { 'capacity' : 2, 'durability' : 3, 'flavor' : -2, 'texture' : -1, 'calories' : 3 }
//}

var ingredients = {
'Sprinkles':    { capacity: 2, durability: 0, flavor: -2, texture: 0, calories: 3 },
'Butterscotch': { capacity: 0, durability: 5, flavor: -3, texture: 0, calories: 3 },
'Chocolate':    { capacity: 0, durability: 0, flavor: 5, texture: -1, calories: 8 },
'Candy':        { capacity: 0, durability: -1, flavor: 0, texture: 5, calories: 8 }
}

function getScore(cookie)
{  
  var sum={};
  var calories = 0;
  properties.forEach(function(p){ sum[p] = 0 });
  Object.keys(cookie).forEach(function (i) {
    properties.forEach(function(p){
      //console.log('ingredient ' + i + ' property ' + p + ':' + ingredients[i][p]);
      sum[p] += cookie[i] * ingredients[i][p];
    });
    calories += cookie[i] * ingredients[i]['calories'];
  });
  if (calories != 500) return 0;
  var score=1;
  properties.forEach(function(p) { score *= (sum[p] > 0) ? sum[p] : 0; } );
  return score;  
}

//console.log(getScore({ 'Butterscotch' : 44, 'Cinnamon' : 56 }));

var TOTAL=100;
var best=0;

for (var sprinkles=1; sprinkles<TOTAL; ++sprinkles)
{
  for (var butterscotch = 1; butterscotch < (TOTAL-sprinkles); ++butterscotch)
  {
    for (var chocolate = 1; chocolate < (TOTAL-sprinkles-butterscotch); ++chocolate)
    {
      var candy = TOTAL-(sprinkles+butterscotch+chocolate);
      if (candy > 0)
      {
        var cookie = {
          'Sprinkles' : sprinkles,
          'Butterscotch' : butterscotch,
          'Chocolate' : chocolate,
          'Candy' : candy,
        };
        console.log(cookie);
        var score = getScore(cookie);
        if (score > best) { 
          best = score;
        }
      }
    }
  }
}
console.log('best: ' + best);

