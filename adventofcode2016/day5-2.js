'use strict';

const md5 = require('md5');

//var door_id='abc';
var door_id='uqwqemis';
var password=[];

var i = 0;
var done = false

while(!done) {
  var t = door_id + String(i)
  var test = md5(t);
  if (i%10000 == 0) process.stdout.write(t + ":" + test + '\r');
  if (test.substring(0,5) == '00000') {
    console.log(test + ':' + i + "         ");
    var pos = Number(test[5]);
    if (!password[pos]) password[pos]=test[6];
    var S='';
    done = true;
    for (var j=0;j<8;++j) { 
      if (password[j]) { S += password[j]; } 
      else             { S += "_"; done=false; }
    }
    console.log(S);
  }
  i++;
}
//console.log(password.join(''));
