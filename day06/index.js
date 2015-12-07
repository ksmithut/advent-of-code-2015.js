'use strict';

var input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

// Setup
var X_LENGTH = 1000;
var Y_LENGTH = 1000;

var lights = [];

for (var i = 0; i < X_LENGTH; i++) {
  lights[i] = [];
  for (var j = 0; j < Y_LENGTH; j++) {
    lights[i][j] = false;
  }
}

// PARAMETERS
var ACTIONS = {
  'toggle': function(val) { return !val; },
  'turn off': function() { return false; },
  'turn on': function() { return true; },
};
var ACTIONS_TWO = {
  'toggle': function(val) { return (val || 0) + 2; },
  'turn off': function(val) {
    val = (val || 0) - 1;
    if (val < 0) { val = 0; }
    return val;
  },
  'turn on': function(val) { return (val || 0) + 1; },
};;
var COMMAND_PARSE = /^(toggle|turn off|turn on) (\d*),(\d*) through (\d*),(\d*)$/;

function int(num) {
  return parseInt(num, 10);
}

input
  .split('\n')
  .forEach(function(command, i) {
    command = command.match(COMMAND_PARSE);

    var action = command[1];
    var topLeft = { x: int(command[2]), y: int(command[3]) };
    var bottomRight = { x: int(command[4]), y: int(command[5]) };

    for (var x = topLeft.x; x <= bottomRight.x; x++) {
      for (var y = topLeft.y; y <= bottomRight.y; y++) {
        lights[x][y] = ACTIONS_TWO[action](lights[x][y]);
      }
    }
  });

var turnedOn = lights.reduce(function(total, col) {
  return total + col.reduce(function(total, light) {
    return total + ( light ? 1 : 0 );
  }, 0);
}, 0);

var brightness = lights.reduce(function(total, col) {
  return total + col.reduce(function(total, light) {
    return total + light;
  }, 0);
}, 0);

console.log('lights turned on:', turnedOn);
console.log('brightness:', brightness);
