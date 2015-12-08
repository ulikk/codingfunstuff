'use strict';

var fs=require('fs');

// read input
//var input = [ "", "abc", "aaa\"aaa", "\x27" ];
var input = fs.readFileSync('day8-input.txt', 'UTF8').split('\n');
//var input = fs.readFileSync('day8-input1.txt', 'UTF8').split('\n');

var total_code = 0;
var total_mem  = 0;

function parseLine(line)
{
     var l = line.trim();
     var s = eval(l);
     if (!s) { s = ""; }
     //console.log("line:" + l + " [" + l.length + "]" + " str:" + s + "[" + s.length + "]");
     total_code += l.length;
     total_mem  += s.length;
}

input.forEach(parseLine);
console.log('total code:' + total_code + ' total mem:' + total_mem + ' diff:' + (total_code-total_mem));

// part II

total_code    = 0;
var total_encoded = 0;

function encodeLine(line)
{
  var l = line.trim();
  total_code += l.length;
  if (l.length > 0) {
    total_encoded +=2;
  for (var i=0; i<l.length; ++i)
  {
    if (l[i] == "\\" || l[i]=="\"") 
    {
      total_encoded += 2;
    } else {
      ++total_encoded;
    }
  }  
  }
}
input.forEach(encodeLine);
console.log('total code:' + total_code + ' total encoded:' + total_encoded + ' diff:' + (total_encoded-total_code));
