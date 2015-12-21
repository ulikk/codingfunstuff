"use strict";
var fs=require('fs');

// Medicine for Rudolph

//var RULES = {
//  "H" : [ "HO", "OH" ],
//  "O" : [ "HH" ]
//};
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
  // get tokens
  for (var atom in ruleset)
  {
    var rpos = getAllPos(molecule, atom);
    rpos.forEach(function(i){ tokens[i]=atom;});
    total += rpos.length * ruleset[atom].length;
    //console.log(atom + ":" + rpos);
  }
  console.log("tokens:" + tokens);
  console.log("total replacements: " + total);

  for (var i = 0; i<tokens.length; ++i) 
  {
    // test all variations at this position
    for (var j = 0; j<ruleset[tokens[i]].length; ++j)
    {
       var t = tokens.slice();
       t[i] = ruleset[tokens[i]][j];  // replace
       var molecule = t.join("");
       //console.log("molecule: " + molecule);
       molecules[molecule] = true;
    }
  }
  return molecules;
}

function test(molecule)
{
  console.log("distinct molecules: " + Object.keys(allVariations(RULES, molecule)).length);
}

//test("HOH");
//test("HOHOHO");
test("CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF");
