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


for (var i=1; i<NUMBER; ++i)
{
	//console.log("House " + i + " got " + toHouse(i) + " presents.");
    if (toHouse(i) == NUMBER)
    {
    	console.log("House " + i + " got " + toHouse(i) + " presents.");
    }
}
