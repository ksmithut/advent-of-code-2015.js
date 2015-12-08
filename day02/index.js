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

/**
 * The elves are running low on wrapping paper, and so they need to submit an
 * order for more. They have a list of the dimensions (length l, width w, and
 * height h) of each present, and only want to order exactly as much as they
 * need.
 *
 * Fortunately, every present is a box (a perfect right rectangular prism),
 * which makes calculating the required wrapping paper for each gift a little
 * easier: find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l. The
 * elves also need a little extra paper for each present: the area of the
 * smallest side.
 *
 * For example:
 *
 * A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet of
 * wrapping paper plus 6 square feet of slack, for a total of 58 square feet.
 *
 * A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet
 * of wrapping paper plus 1 square foot of slack, for a total of 43 square feet.
 *
 * All numbers in the elves' list are in feet. How many total square feet of
 * wrapping paper should they order?
 */

exports.part1 = function(input) {
  var DIMENSIONS_REGEX = /^(\d*)x(\d*)x(\d*)/;

  function wrappingPaper(length, width, height) {
    var lw = length * width;
    var wh = width * height;
    var hl = height * length;

    var main = 2 * (lw + wh + hl);
    var extra = [ lw, wh, hl ].sort(sortNumbers)[0];

    return main + extra;
  }

  function sortNumbers(a, b) { return a - b; }

  return input.split('\n').reduce(function(total, line) {
    var pieces = line.match(DIMENSIONS_REGEX);

    if (!pieces) return total;

    var length = parseInt(pieces[1], 10);
    var width = parseInt(pieces[2], 10);
    var height = parseInt(pieces[3], 10);

    return total + wrappingPaper(length, width, height);
  }, 0);
};

/**
 * --- Part Two ---
 *
 * The elves are also running low on ribbon. Ribbon is all the same width, so
 * they only have to worry about the length they need to order, which they would
 * again like to be exact.
 *
 * The ribbon required to wrap a present is the shortest distance around its
 * sides, or the smallest perimeter of any one face. Each present also requires
 * a bow made out of ribbon as well; the feet of ribbon required for the perfect
 * bow is equal to the cubic feet of volume of the present. Don't ask how they
 * tie the bow, though; they'll never tell.
 *
 * For example:
 *
 * A present with dimensions 2x3x4 requires 2+2+3+3 = 10 feet of ribbon to wrap
 * the present plus 2*3*4 = 24 feet of ribbon for the bow, for a total of 34
 * feet.
 *
 * A present with dimensions 1x1x10 requires 1+1+1+1 = 4 feet of ribbon to wrap
 * the present plus 1*1*10 = 10 feet of ribbon for the bow, for a total of 14
 * feet.
 *
 * How many total feet of ribbon should they order?
 */

exports.part2 = function(input) {
  var DIMENSIONS_REGEX = /^(\d*)x(\d*)x(\d*)/;

  function ribbons(length, width, height) {
    return [ length, width, height ]
      .sort(sortNumbers)
      .slice(0, 2)
      .reduce(function(total, length) {
        return total + (length * 2);
      }, length * width * height);
  }

  function sortNumbers(a, b) { return a - b; }

  return input.split('\n').reduce(function(total, line) {
    var pieces = line.match(DIMENSIONS_REGEX);

    if (!pieces) return total;

    var length = parseInt(pieces[1], 10);
    var width = parseInt(pieces[2], 10);
    var height = parseInt(pieces[3], 10);

    return total + ribbons(length, width, height);
  }, 0);
}
