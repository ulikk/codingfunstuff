"use strict";

var NUMBER=36000000;

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


for (var i=100000; i<NUMBER; ++i)
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
