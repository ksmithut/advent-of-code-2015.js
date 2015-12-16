'use strict';

const PARSE_LINE = /^(\w*) would (lose|gain) (\d*).* (\w*).$/;

function parseLine(line) {
  let [ , name1, action, points, name2 ] = line.match(PARSE_LINE);

  points = parseInt(points, 10);

  points = action === 'lose' ? -1 * points : points;

  return { name1, points, name2 };
}

function getPermutation(array, start = 0, result = []) {
  if (start >= array.length) {
    result.push(array.slice(0));
    return result;
  }

  for (let i = start; i < array.length; i++) {
    [ array[i], array[start] ] = [ array[start], array[i] ];
    result = getPermutation(array, start + 1, result);
    [ array[i], array[start] ] = [ array[start], array[i] ];
  }
  return result;
}

/**
 * --- Day 13: Knights of the Dinner Table ---
 *
 * In years past, the holiday feast with your family hasn't gone so well. Not
 * everyone gets along! This year, you resolve, will be different. You're going
 * to find the optimal seating arrangement and avoid all those awkward
 * conversations.
 *
 * You start by writing up a list of everyone invited and the amount their
 * happiness would increase or decrease if they were to find themselves sitting
 * next to each other person. You have a circular table that will be just big
 * enough to fit everyone comfortably, and so each person will have exactly two
 * neighbors.
 *
 * For example, suppose you have only four attendees planned, and you calculate
 * their potential happiness as follows:
 *
 * Alice would gain 54 happiness units by sitting next to Bob.
 * Alice would lose 79 happiness units by sitting next to Carol.
 * Alice would lose 2 happiness units by sitting next to David.
 * Bob would gain 83 happiness units by sitting next to Alice.
 * Bob would lose 7 happiness units by sitting next to Carol.
 * Bob would lose 63 happiness units by sitting next to David.
 * Carol would lose 62 happiness units by sitting next to Alice.
 * Carol would gain 60 happiness units by sitting next to Bob.
 * Carol would gain 55 happiness units by sitting next to David.
 * David would gain 46 happiness units by sitting next to Alice.
 * David would lose 7 happiness units by sitting next to Bob.
 * David would gain 41 happiness units by sitting next to Carol.
 *
 * Then, if you seat Alice next to David, Alice would lose 2 happiness units
 * (because David talks so much), but David would gain 46 happiness units
 * (because Alice is such a good listener), for a total change of 44.
 *
 * If you continue around the table, you could then seat Bob next to Alice (Bob
 * gains 83, Alice gains 54). Finally, seat Carol, who sits next to Bob (Carol
 * gains 60, Bob loses 7) and David (Carol gains 55, David gains 41). The
 * arrangement looks like this:
 *
 *      +41 +46
 * +55   David    -2
 * Carol       Alice
 * +60    Bob    +54
 *      -7  +83
 *
 * After trying every other seating arrangement in this hypothetical scenario,
 * you find that this one is the most optimal, with a total change in happiness
 * of 330.
 *
 * What is the total change in happiness for the optimal seating arrangement of
 * the actual guest list?
 */

function getTotalChange(names, mapping) {
  return names.reduce((total, name, i) => {
    let prevPos = (i === 0 ? names.length : i) - 1;
    let nextPos = (i === names.length - 1 ? -1 : i) + 1;
    let prev = names[prevPos];
    let next = names[nextPos];

    return total + mapping[name][prev] + mapping[name][next];
  }, 0);
}

export function part1(input) {
  let changeMapping = {};

  input.split('\n').forEach((line) => {
    let { name1, points, name2 } = parseLine(line);

    changeMapping[name1] = changeMapping[name1] || {};
    changeMapping[name1][name2] = points;
  });

  let possibilities = getPermutation(Object.keys(changeMapping));

  return possibilities.reduce((highest, permutation) => {
    let change = getTotalChange(permutation, changeMapping);

    if (highest === null || change > highest) { return change; }
    return highest;
  }, null);
}

export let part1Examples = [

];

export let part1Answer = 0;

/**
 * --- Part Two ---
 *
 * In all the commotion, you realize that you forgot to seat yourself. At this
 * point, you're pretty apathetic toward the whole thing, and your happiness
 * wouldn't really go up or down regardless of who you sit next to. You assume
 * everyone else would be just as ambivalent about sitting next to you, too.
 *
 * So, add yourself to the list, and give all happiness relationships that
 * involve you a score of 0.
 *
 * What is the total change in happiness for the optimal seating arrangement
 * that actually includes yourself?
 */
export function part2(input) {
  let changeMapping = {
    '_me': {},
  };

  input.split('\n').forEach((line) => {
    let { name1, points, name2 } = parseLine(line);

    changeMapping[name1] = changeMapping[name1] || {
      '_me': 0,
    };
    changeMapping[name1][name2] = points;
    changeMapping._me[name1] = 0;
  });

  let possibilities = getPermutation(Object.keys(changeMapping));

  return possibilities.reduce((highest, permutation) => {
    let change = getTotalChange(permutation, changeMapping);

    if (highest === null || change > highest) { return change; }
    return highest;
  }, null);
}

export let part2Examples = [

];

export let part2Answer = 0;
