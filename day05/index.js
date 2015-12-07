'use strict';

var input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

var VOWELS = /[aeiou]/g;
var DUPLICATE = /(\w)\1/;
var BLACKLIST = /(ab|cd|pq|xy)/;

function isNice(str) {
  var numVowels = (str.match(VOWELS) || []).length;
  var hasDuplicate = DUPLICATE.test(str);
  var hasBlacklisted = BLACKLIST.test(str);

  return (numVowels >= 3) && (hasDuplicate) && (!hasBlacklisted);
}

var ONE_LETTER_BETWEEN = /(\w)\w\1/;
var TWO_REPEATED = /(\w{2}).*\1/;

function isNiceTwo(str) {
  var hasOneLetterBetweenRepeat = ONE_LETTER_BETWEEN.test(str);
  var hasTwoRepeated = TWO_REPEATED.test(str);

  return hasOneLetterBetweenRepeat && hasTwoRepeated;
}

var numNice = input
  .split('\n')
  .reduce(function(total, str) {
    if (isNiceTwo(str)) { total++; }
    return total;
  }, 0);

console.log('Number of Nice:', numNice);
