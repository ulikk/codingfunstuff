'use strict';

var fs=require('fs');

// read input
//var input = "123 -> x\n456 -> y\nx AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\ny RSHIFT 2 -> g\nNOT x -> h\nNOT y -> i".split('\n');
var input = fs.readFileSync('day7-input.txt', 'UTF8').split('\n');

var wires = {};
var evaluated = {};

var OPS = {};
OPS['AND']     = function(par1, par2) { return parseInt(par1) & parseInt(par2); };
OPS['OR']      = function(par1, par2) { return parseInt(par1) | parseInt(par2); };
OPS['LSHIFT']  = function(par1, par2) { return (parseInt(par1) << parseInt(par2)) & 65535; };
OPS['RSHIFT']  = function(par1, par2) { return parseInt(par1) >> parseInt(par2); };
OPS['NOT']     = function(par1, par2) { return parseInt(par2) ^ 65535; };
OPS['SIGNAL']  = function(par1, par2) { return parseInt(par1); };

var parseLine = function(line)
{
    //console.log("parsing " + line);
    var T = line.split("->");
    var lhs = T[0].trim();
    var rhs = T[1].trim();
    
    if (Number(lhs)) 
    {
      // is a number
      wires[rhs] = {
        'OP' : 'SIGNAL',
        'par1' : lhs  
      };
    } 
    else 
    {
      var found=false;
      for (var o in OPS) 
      {
        if (lhs.indexOf(o) > -1) 
        {
          var T0 = lhs.split(o);
          //console.log("found OP:" + o + ":" + JSON.stringify(T0));
          wires[rhs] = {
            'OP': o,
            'par1' : T0[0].trim(),
            'par2' : T0[1].trim()
          };
          found=true;
          break;
        }
      }
      if (!found) {
        //console.log('found no op for:' + lhs + " : " + rhs);
        wires[rhs] = {
          'OP' : 'SIGNAL',
          'par1' : lhs          
        }
      }          
    }
};

function evaluate(wire)
{
  //console.log('evaluate ' + JSON.stringify(wire));
  
  if (!wire) return undefined;
  if (wire=="") return undefined;
  if (!isNaN(wire)) return wire;

  if (evaluated[wire]) return evaluated[wire];
  if (!wires[wire]) {
    console.log('wire ' + wire + ' not defined!');
    return undefined;
  }
  var result = OPS[wires[wire].OP](evaluate(wires[wire].par1), evaluate(wires[wire].par2));
  evaluated[wire] = result;
  return result;
}

input.forEach(parseLine);
//console.log(JSON.stringify(wires, null, 2));

//for (var w in wires)
//{
//  var wire = wires[w];
  //console.log(w + ' => ' + evaluate(w));
//}

console.log('a => ' + evaluate('a'));

var a_evaluated = evaluated['a'];

// part 2
console.log('part 2');
evaluated = {};
wires['b'] = {
  'OP' : 'SIGNAL',
  'par1' : a_evaluated
};
console.log('a => ' + evaluate('a'));


//console.log(JSON.stringify(evaluated, null, 2));
