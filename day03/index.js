'use strict';

const UP = '^';
const RIGHT = '>';
const DOWN = 'v';
const LEFT = '<';
const ACTIONS = {
  [UP]: (pos) => pos.y--,
  [DOWN]: (pos) => pos.y++,
  [LEFT]: (pos) => pos.x--,
  [RIGHT]: (pos) => pos.x++,
};

/**
 * --- Day 3: Perfectly Spherical Houses in a Vacuum ---
 *
 * Santa is delivering presents to an infinite two-dimensional grid of houses.
 *
 * He begins by delivering a present to the house at his starting location, and
 * then an elf at the North Pole calls him via radio and tells him where to move
 * next. Moves are always exactly one house to the north (^), south (v), east (>),
 * or west (<). After each move, he delivers another present to the house at his
 * new location.
 *
 * However, the elf back at the north pole has had a little too much eggnog, and
 * so his directions are a little off, and Santa ends up visiting some houses
 * more than once. How many houses receive at least one present?
 *
 * For example:
 *
 * > delivers presents to 2 houses: one at the starting location, and one to the
 * east.
 *
 * ^>v< delivers presents to 4 houses in a square, including twice to the house
 * at his starting/ending location.
 *
 * ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2
 * houses.
 */

export function part1(input) {
  const pos = { x: 0, y: 0 };
  const visits = {};

  function visit(x, y) {
    const key = `${x}x${y}`;

    visits[key] = visits[key] || 0;
    visits[key]++;
  }

  for (let i = 0, len = input.length; i < len; i++) {
    ACTIONS[input[i]](pos);
    visit(pos.x, pos.y);
  }

  return Object.keys(visits).length;
}

export let part1Examples = [

];

export let part1Answer = 0;

/**
 * --- Part Two ---
 *
 * The next year, to speed up the process, Santa creates a robot version of
 * himself, Robo-Santa, to deliver presents with him.
 *
 * Santa and Robo-Santa start at the same location (delivering two presents to
 * the same starting house), then take turns moving based on instructions from
 * the elf, who is eggnoggedly reading from the same script as the previous
 * year.
 *
 * This year, how many houses receive at least one present?
 *
 * For example:
 *
 * ^v delivers presents to 3 houses, because Santa goes north, and then
 * Robo-Santa goes south.
 *
 * ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back
 * where they started.
 *
 * ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction
 * and Robo-Santa going the other.
 */

export function part2(input) {
  const couriers = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  let currentCourier = 0;
  const visits = {};

  function getCourier() {
    if (++currentCourier >= couriers.length) { currentCourier = 0; }
    return couriers[currentCourier];
  }

  function visit(x, y) {
    const key = `${x}x${y}`;

    visits[key] = visits[key] || 0;
    visits[key]++;
  }

  for (let i = 0, len = input.length; i < len; i++) {
    const pos = getCourier();

    ACTIONS[input[i]](pos);
    visit(pos.x, pos.y);
  }

  return Object.keys(visits).length;
}

export let part2Examples = [

];

export let part2Answer = 0;
