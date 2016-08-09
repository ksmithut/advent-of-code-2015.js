'use strict'

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

const LINE_PATTERN = /(\w*) to (\w*) = (\d*)/
const parseLine = (line) => {
  const [, city1, city2, distance] = line.match(LINE_PATTERN)
  return {
    city1,
    city2,
    distance: parseInt(distance)
  }
}

const removeIndex = (arr, i) => {
  arr = arr.slice()
  arr.splice(i, 1)
  return arr
}

const getOrderedPermutations = (arr) => {
  if (arr.length <= 1) return arr
  return arr.reduce((permutations, item, i) => {
    const subPermutations = getOrderedPermutations(removeIndex(arr, i))
      .map((permutation) => [item].concat(permutation))
    return permutations.concat(subPermutations)
  }, [])
}

const getDistances = (input) => {
  const cities = new Set()
  const distances = input.split('\n').reduce((hash, line) => {
    const { city1, city2, distance } = parseLine(line)
    cities.add(city1).add(city2)
    hash[`${city1}:${city2}`] = distance
    hash[`${city2}:${city1}`] = distance
    return hash
  }, {})
  const permutations = getOrderedPermutations(Array.from(cities))
  return permutations.map((permutation) => {
    let distance = 0
    for (let i = 1; i < permutation.length; i++) {
      distance += distances[`${permutation[i - 1]}:${permutation[i]}`]
    }
    return {
      order: permutation,
      distance
    }
  })
}

function part1(input) {
  return getDistances(input).reduce((min, { distance }) => {
    return distance < min ? distance : min
  }, Infinity)
}

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

function part2(input) {
  return getDistances(input).reduce((max, { distance }) => {
    return distance > max ? distance : max
  }, 0)
}

module.exports = { part1, part2 }
