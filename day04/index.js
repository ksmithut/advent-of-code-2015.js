'use strict';

var input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');
var crypto = require('crypto');

var TARGET_START = /^0{6}/;

function getHash(data) {
  var hash = crypto.createHash('md5');
  hash.update(data);
  return hash.digest('hex');
}


for (var i = 0, hash = ''; !TARGET_START.test(hash); i++) {
  hash = getHash(input + i);
}

var lowestNumber = i - 1;

console.log('lowest number:', lowestNumber)
