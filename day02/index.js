'use strict';

var input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

var DIMENSIONS_REGEX = /^(\d*)x(\d*)x(\d*)/;

function wrappingPaper(length, width, height) {
  var lw = length * width;
  var wh = width * height;
  var hl = height * length;

  var main = 2 * (lw + wh + hl);
  var extra = [ lw, wh, hl ].sort(sortNumbers)[0];

  return main + extra;
}

function ribbons(length, width, height) {
  return [ length, width, height ]
    .sort(sortNumbers)
    .slice(0, 2)
    .reduce(function(total, length) {
      return total + (length * 2);
    }, length * width * height);
}

function sortNumbers(a, b) { return a - b; }

var total = input.split('\n').reduce(function(total, line) {
  var pieces = line.match(DIMENSIONS_REGEX);

  if (!pieces) return total;

  var length = parseInt(pieces[1], 10);
  var width = parseInt(pieces[2], 10);
  var height = parseInt(pieces[3], 10);

  total.wrappingPaper += wrappingPaper(length, width, height);
  total.ribbons += ribbons(length, width, height);

  return total;
}, { wrappingPaper: 0, ribbons: 0 });

console.log('wrapping paper ft^2 needed:', total.wrappingPaper);
console.log('ribbon ft needed:', total.ribbons);
