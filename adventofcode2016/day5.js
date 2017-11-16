'use strict';

const md5 = require('md5');

//var door_id='abc';
var door_id='uqwqemis';
var password=[];

var i = 0;

while(password.length < 8) {
  var t = door_id + String(i)
  var test = md5(t);
  if (i%10000 == 0) process.stdout.write(t + ":" + test + '\r');
  if (test.substring(0,5) == '00000') {
    console.log(test + ':' + i + "         ");
    password.push(test[5]);
  }
  i++;
}
console.log(password.join(''));
