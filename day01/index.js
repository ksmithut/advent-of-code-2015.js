'use strict';

var input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

var UP = '(';
var DOWN = ')';

var curFloor = 0;
var basementPosition = null;

for (var i = 0, len = input.length; i < len; i++) {
  if (input[i] === UP) { curFloor++; }
  else if (input[i] === DOWN) { curFloor--; }

  if (curFloor < 0 && basementPosition === null) {
    basementPosition = i + 1;
  }
}

console.log('basementPosition:', basementPosition);
console.log('finalFloor:', curFloor);
