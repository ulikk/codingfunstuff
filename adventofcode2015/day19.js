"use strict";
var fs=require('fs');

// Medicine for Rudolph

// var RULES = {
//  "H" : [ "HO", "OH" ],
//  "O" : [ "HH" ]
// };
var RULES={};
var input = fs.readFileSync('day19-input.txt', 'UTF8').split('\n');
input.forEach(function(line){
  var T=line.split("=>");
  var atom = T[0].trim();
  var repl = T[1].trim();
  if (!RULES[atom]) RULES[atom]=[];
  RULES[atom].push(repl);
});

console.log(JSON.stringify(RULES,null,2));

function getAllPos(s, f) {
  var r = [];
  for (var i = 0; i < s.length; ++i) 
  { if (s.substring(i, i + f.length) == f) { r.push(i); } }
  return r;
}

function allVariations(ruleset, molecule)
{
  console.log('## molecule: ' + molecule);
  var tokens=[];
  var total = 0;
  var molecules = {};
  var POS={};
  // get tokens
  for (var atom in ruleset)
  {
    POS[atom]=[];
    var rpos = getAllPos(molecule, atom);
    rpos.forEach(function(i){ 
      //tokens[i]=atom;
      POS[atom].push(i);
    });
    total += rpos.length * ruleset[atom].length;
    //console.log(atom + ":" + rpos);
  }
  //console.log("tokens:" + tokens);
  console.log(POS);
  console.log("total replacements: " + total);

  // perform replacement
  for (var atom in POS)
  {
    for (var i=0; i<POS[atom].length; ++i)
    {
      var p=POS[atom][i];
      for (var r=0; r<ruleset[atom].length;++r)
      {
        var repl = ruleset[atom][r];
        var R = molecule.substring(0, p) + repl + molecule.substring(p+atom.length); 
        //console.log(R);
        molecules[R] = true;
      }
    }
  }

  // for (var i = 0; i<tokens.length; ++i) 
  // {
  //   // test all variations at this position
  //   for (var j = 0; j<ruleset[tokens[i]].length; ++j)
  //   {
  //      var t = tokens.slice();
  //      t[i] = ruleset[tokens[i]][j];  // replace
  //      var molecule = t.join("");
  //      //console.log("molecule: " + molecule);
  //      molecules[molecule] = true;
  //   }
  // }
  console.log(POS);
  return molecules;
}

function test(molecule)
{
  console.log("distinct molecules: " + Object.keys(allVariations(RULES, molecule)).length);
}

//test("HOH");
//test("HOHOHO");
test("CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF");
