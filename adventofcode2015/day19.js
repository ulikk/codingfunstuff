"use strict";
var fs=require('fs');

// Medicine for Rudolph

//  var RULES = {
//  "e" : ["H", "O"],
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
  console.log(POS);
  return molecules;
}


var steps=0;
function parseMolecule(parsestring, grammar)
{
  // find first matching replacement
  for (var lhs in grammar)
  {
    for (var i=0; i<grammar[lhs].length; ++i)
    {
      var rhs = grammar[lhs][i];
      var p = parsestring.indexOf(rhs);
      console.log(parsestring + " match " + rhs + ":" + p);
      if (lhs=="e" && parsestring==rhs)
      {
        return "e";
      }
      if ((p>-1) && (lhs!="e"))
      {
        // replace and continue
        steps = steps + 1;
        console.log(lhs + " -> " + rhs + ":"+parsestring);
        var repl = parsestring.substring(0,p) + lhs + parsestring.substring(p+rhs.length);
        return parseMolecule(repl, grammar);
      }  
    }
  }
  // worng
  console.log("ERROR couldnt match " + parsestring);
  return parsestring;
}

function test(molecule)
{
  console.log("distinct molecules: " + Object.keys(allVariations(RULES, molecule)).length);
}

function test2(molecule)
{
  steps=1;
  console.log(parseMolecule(molecule, RULES));
  console.log("steps: " + steps);
}

//test2("HOH");
//test2("HOHOHO")
test2("CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF");

//test("HOH");
//test("HOHOHO");
//test("CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF");
