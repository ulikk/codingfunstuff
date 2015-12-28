"use strict";

var N=36000000;
var M=N/10;

var house = new Array(N/10);
house.fill(0);

for (var i=1; i<M; ++i)
{
  for (var j=i; j<M; j+=i)
  {
    house[j] += i*10;
  }
}
//console.log(house);
//console.log("---------------------");
console.log(house.indexOf(N));

/*
House 1049160 got 36000000 presents. **DONE**

function toHouse(n)
{
	var presents=0;
	for (var j=1; j<=n; ++j)
	{
		if (n%j == 0)
		{
			presents += j*10;
		}
	}
	return presents;
}


for (var i=900000; i<NUMBER; ++i)
{
	var presents=toHouse(i);

    if (i%10000==0) {
    	console.log("House " + i + " got " + toHouse(i) + " presents.");
	}
    if (presents == NUMBER)
    {
    	console.log("House " + i + " got " + presents + " presents.");
		break;
	}
}
*/