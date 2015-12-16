'use strict';

const PARSE_LINE = /^(\w*) to (\w*) = (\d*)$/;

function parseLine(line) {
  let [ , city1, city2, distance ] = line.match(PARSE_LINE);

  return { city1, city2, distance: parseInt(distance, 10) };
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

export function part1(input) {

  let distanceMapping = {};

  input.split('\n').forEach((line) => {
    let { city1, city2, distance } = parseLine(line);

    distanceMapping[city1] = distanceMapping[city1] || {};
    distanceMapping[city1][city2] = distance;

    distanceMapping[city2] = distanceMapping[city2] || {};
    distanceMapping[city2][city1] = distance;
  });

  let possibleCities = Object.keys(distanceMapping);
  let permutations = getPermutation(possibleCities);

  let shortestDistance = permutations.reduce((shortest, permutation) => {
    let distance = 0;

    for (let i = 1; i < permutation.length; i++) {
      distance += distanceMapping[permutation[i - 1]][permutation[i]];
    }

    if (shortest === null || distance < shortest) { return distance; }
    return shortest;
  }, null);

  return shortestDistance;

}

export let part1Examples = [

];

export let part1Answer = 0;

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
  let distanceMapping = {};

  input.split('\n').forEach((line) => {
    let { city1, city2, distance } = parseLine(line);

    distanceMapping[city1] = distanceMapping[city1] || {};
    distanceMapping[city1][city2] = distance;

    distanceMapping[city2] = distanceMapping[city2] || {};
    distanceMapping[city2][city1] = distance;
  });

  let possibleCities = Object.keys(distanceMapping);
  let permutations = getPermutation(possibleCities);

  let longestDistance = permutations.reduce((longest, permutation) => {
    let distance = 0;

    for (let i = 1; i < permutation.length; i++) {
      distance += distanceMapping[permutation[i - 1]][permutation[i]];
    }

    if (longest === null || distance > longest) { return distance; }
    return longest;
  }, null);

  return longestDistance;
}

export let part2Examples = [

];

export let part2Answer = 0;
