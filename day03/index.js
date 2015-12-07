'use strict';

var input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

var UP = '^';
var RIGHT = '>';
var DOWN = 'v';
var LEFT = '<';

var deliverers = [
  { x: 0, y: 0 },
//  { x: 0, y: 0 },
];
var curDeliverer = 0;

function getDeliverer() {
  if (deliverers[curDeliverer]) { return deliverers[curDeliverer++]; }
  curDeliverer = 0;
  return getDeliverer();
}

var visits = {};

function increment(x, y) {
  var key = x + '.' + y;

  if (typeof visits[key] === undefined) {
    visits[key] = 0;
  }

  visits[key]++;
}

for (var i = 0, len = input.length; i < len; i++) {
  var deliverer = getDeliverer();

  switch (input[i]) {
    case UP: deliverer.y--; break;
    case DOWN: deliverer.y++; break;
    case LEFT: deliverer.x--; break;
    case RIGHT: deliverer.x++; break;
    default: continue;
  }

  increment(deliverer.x, deliverer.y);
}

var uniqueHouses = Object.keys(visits).length;

console.log('Unique house visits:', uniqueHouses);
