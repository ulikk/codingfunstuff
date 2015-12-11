'use strict';

// Elves Look, Elves Say

//var sequence = [ 1 ];
var sequence = [1,1,1,3,1,2,2,1,1,3];

function lookAndSay(seq)
{
  var sayseq = [];
  var lastDigit = -1;
  var count = 0;
  for (var i=0; i<seq.length; ++i)
  {
    if (seq[i] != lastDigit) 
    {
      if (count > 0) 
      {
        sayseq.push(count);
        sayseq.push(lastDigit);
      }
      lastDigit = seq[i];
      count = 0;
    }
    ++count;
  }
  sayseq.push(count);
  sayseq.push(lastDigit);
  return sayseq;
}

console.log(JSON.stringify(sequence));
for (var j = 0; j < 50; ++j)
{
  sequence = lookAndSay(sequence);
  //console.log(JSON.stringify(sequence));
}

console.log("length:" + sequence.length);