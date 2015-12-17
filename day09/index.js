'use strict';

/**
 * --- Day 9: All in a Single Night ---
 *
 * Every year, Santa manages to deliver all of his presents in a single night.
 *
 * This year, however, he has some new locations to visit; his elves have
 * provided him the distances between every pair of locations. He can start and
 * end at any two (different) locations he wants, but he must visit each
 * location exactly once. What is the shortest distance he can travel to achieve
 * this?
 *
 * For example, given the following distances:
 *
 * London to Dublin = 464
 * London to Belfast = 518
 * Dublin to Belfast = 141
 * The possible routes are therefore:
 *
 * Dublin -> London -> Belfast = 982
 * London -> Dublin -> Belfast = 605
 * London -> Belfast -> Dublin = 659
 * Dublin -> Belfast -> London = 659
 * Belfast -> Dublin -> London = 605
 * Belfast -> London -> Dublin = 982
 * The shortest of these is London -> Dublin -> Belfast = 605, and so the answer
 * is 605 in this example.
 *
 * What is the distance of the shortest route?
 */

function parseLine(line) {
  let [ , city1, city2, distance ] = line.match(/^(\w*) to (\w*) = (\d*)$/);

  return { city1, city2, distance: parseInt(distance, 10) };
}

function getPermutations(array, start = 0, result = []) {
  if (start >= array.length) {
    result.push(array.slice(0));
    return result;
  }

  for (let i = start; i < array.length; i++) {
    [ array[i], array[start] ] = [ array[start], array[i] ];
    result = getPermutations(array, start + 1, result);
    [ array[i], array[start] ] = [ array[start], array[i] ];
  }
  return result;
}

function getRoutes(input) {
  let distanceMapping = {};

  input.split('\n').forEach((line) => {
    let { city1, city2, distance } = parseLine(line);

    distanceMapping[city1] = distanceMapping[city1] || {};
    distanceMapping[city1][city2] = distance;

    distanceMapping[city2] = distanceMapping[city2] || {};
    distanceMapping[city2][city1] = distance;
  });

  let possibleCities = Object.keys(distanceMapping);
  let permutations = getPermutations(possibleCities);

  return permutations.reduce((arr, permutation) => {
    permutation.distance = permutation.reduce((total, index, i) => {
      if (i === 0) { return total; }

      return total + distanceMapping[permutation[i - 1]][permutation[i]];
    }, 0);

    arr.push(permutation);
    return arr;
  }, []);
}

export function part1(input) {
  return getRoutes(input).reduce((shortest, { distance }) => {
    return (shortest === null || distance < shortest) ? distance : shortest;
  }, null);
}

export let part1Examples = [
  {
    input: [
      'London to Dublin = 464',
      'London to Belfast = 518',
      'Dublin to Belfast = 141',
    ].join('\n'),
    value: 605,
  },
];

export let part1Answer = 251;

/**
 * --- Part Two ---
 *
 * The next year, just to show off, Santa decides to take the route with the
 * longest distance instead.
 *
 * He can still start and end at any two (different) locations he wants, and he
 * still must visit each location exactly once.
 *
 * For example, given the distances above, the longest route would be 982 via
 * (for example) Dublin -> London -> Belfast.
 *
 * What is the distance of the longest route?
 */
export function part2(input) {
  return getRoutes(input).reduce((longest, { distance }) => {
    return (longest === null || distance > longest) ? distance : longest;
  }, null);
}

export let part2Examples = [
  {
    input: [
      'London to Dublin = 464',
      'London to Belfast = 518',
      'Dublin to Belfast = 141',
    ].join('\n'),
    value: 982,
  },
];

export let part2Answer = 898;
