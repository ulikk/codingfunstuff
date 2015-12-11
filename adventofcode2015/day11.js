'use strict';

// Corporate Policy
var validchars = "abcdefghjkmnpqrstuvwxyz"
  
function isValidPassword(pwd)
{
  // first requirement
  var req1 = false;
  for (var i=0; i<pwd.length-3; ++i)
  {
    if ( pwd.charCodeAt(i)+1 == pwd.charCodeAt(i+1)
      && pwd.charCodeAt(i+1)+1 == pwd.charCodeAt(i+2) )
      {
        req1 = true;
      }
  }
  if (req1 == false) return false;
  
  // second requirement
  if (pwd.indexOf('i') > -1 || pwd.indexOf('o') > -1 || pwd.indexOf('l') > -1)
  {
    return false;
  }
  
  // third requirement
  var doubles=0;
  for (var c = "a".charCodeAt(0); c <= "z".charCodeAt(0); ++c)
  {
    var test = String.fromCharCode(c) + String.fromCharCode(c);
    if (pwd.indexOf(test) > -1) 
    {
      ++doubles;
      if (doubles >= 2) return true;    
    }    
  }
  return false;
}

function incPos(str, pos)
{
  //console.log('incPos(' + str + "," + pos + ')');
  if (str[pos] == 'z') 
  {
    var s = str.substr(0,pos) + "a" + str.substr(pos+1);
    if (pos > 0) { return incPos(s, pos-1); }
    return s;
  } 
  else 
  {
    //console.log('increment:' + str[pos] + " " + str.charCodeAt(pos) + "->" + String.fromCharCode(str.charCodeAt(pos)+1));
    return str.substr(0,pos) + String.fromCharCode(str.charCodeAt(pos)+1) + str.substr(pos+1);
  }  
}
                    
function nextPassword(pwd)
{
  var newpwd = pwd;
  do
  {
    newpwd = incPos(newpwd, newpwd.length-1);
    //console.log(newpwd);
  } while (isValidPassword(newpwd) == false);
  return newpwd;
}

//console.log(isValidPassword('ghjaabcc'));

var p1 = nextPassword('vzbxkghb');
console.log(p1);
var p2 = nextPassword(p1);
console.log(p2);
