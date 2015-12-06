'use strict';

var fs=require('fs');

// read input
var input = fs.readFileSync('day5-input.txt', 'UTF8').split('\n');


function isNice(s)
{
  var vowels=0;
  for (var i=0; i<s.length; ++i)
  {
    switch (s[i]) {
      case 'a': case 'e': case'i': case 'o': case 'u':
        ++vowels;
        break;
    }
  }
  if (vowels < 3) return false;
  
  var hasdouble=false;
  for (var i=0; i<s.length-1; ++i)
  {
    if (s[i] == s[i+1]) {
      hasdouble=true;
      break;
    }
  }
  if (!hasdouble) return false;
  
  if ( (s.indexOf("ab") > -1) || (s.indexOf("cd") > -1)
    || (s.indexOf("pq") > -1) || (s.indexOf("xy") > -1) )
    {
    return false;
    }
    
  return true;
}

function isNice2(s)
{
  // test pairs
  var hasPair = false;
  for (var i=0; i<s.length-1; ++i)
  {
    var t = s[i] + s[i+1];
    if (s.lastIndexOf(t) > (i+1))
    {
      hasPair=true; 
      break;
    }    
  }
  if (!hasPair) return false;
  
  for (var i=0; i<s.length-2; ++i)
  {
    if (s[i] == s[i+2]) 
          return true;
  }
  return false;
}

function test(s) 
{
  console.log(s + " is " + (isNice2(s) ? "nice" : "naughty") );
}

//test("ugknbfddgicrmopn");
//test("aaa");
//test("jchzalrnumimnmhp");
//test("haegwjzuvuyypxyu");
//test("dvszwmarrgswjxmb");
test("qjhvhtzxzqqjkmpb");
test("xxyxx");
test("uurcxstgmygtbstg");
test("ieodomkazucvgmuy");


var arenice=0;
input.forEach(function(s) {
  if (isNice2(s)) 
    arenice++;
});
console.log(arenice + " are nice.");
