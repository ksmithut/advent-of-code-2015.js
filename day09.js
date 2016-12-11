'use strict'

/**
 * --- Day 9: All in a Single Night ---
 *
 * Every year, Santa manages to deliver all of his presents in a single night.
 *
 * This year, however, he has some <span title="Bonus points if you recognize
 * all of the locations.">new locations</span> to visit; his elves have
 * provided him the distances between every pair of locations. He can start and
 * end at any two (different) locations he wants, but he must visit each
 * location exactly once. What is the shortest distance he can travel to
 * achieve this?
 *
 * For example, given the following distances:
 *
 *     London to Dublin = 464
 *     London to Belfast = 518
 *     Dublin to Belfast = 141
 *
 * The possible routes are therefore:
 *
 *     Dublin -> London -> Belfast = 982
 *     London -> Dublin -> Belfast = 605
 *     London -> Belfast -> Dublin = 659
 *     Dublin -> Belfast -> London = 659
 *     Belfast -> Dublin -> London = 605
 *     Belfast -> London -> Dublin = 982
 *
 * The shortest of these is `London -> Dublin -> Belfast = 605`, and so the
 * answer is `605` in this example.
 *
 * What is the distance of the shortest route?
 */

const sortNums = (arr) => arr.slice().sort((a, b) => a - b)

const parseLine = (line) => {
  const [ , from, to, distance ] = line.match(/^(\w*) to (\w*) = (\d*)/)
  return {
    from,
    to,
    distance: parseInt(distance, 10),
  }
}

const getDistances = (input) => {
  return input
    .split('\n')
    .map(parseLine)
    .reduce((distances, { from, to, distance }) => {
      distances[from] = distances[from] || {}
      distances[from][to] = distance
      distances[to] = distances[to] || {}
      distances[to][from] = distance
      return distances
    }, {})
}

const getPermutations = (arr) => {
  if (arr.length <= 1) return [ arr ]
  return arr.reduce((permutations, val, i) => {
    const subArray = arr.slice()
    subArray.splice(i, 1)
    const subPermutations = getPermutations(subArray)
      .map((permutation) => [ val ].concat(permutation))
    return permutations.concat(subPermutations)
  }, [])
}

const totalRoute = (distances, route) => {
  return route.reduce((total, city, i, arr) => {
    if (i === 0) return 0
    return total + distances[city][arr[i - 1]]
  }, 0)
}

const getTotals = (input) => {
  const distances = getDistances(input)
  const routes = getPermutations(Object.keys(distances))
  const totals = routes.map((route) => totalRoute(distances, route))
  return sortNums(totals)
}

function part1(input) {
  return getTotals(input)[0]
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
 * For example, given the distances above, the longest route would be `982` via
 * (for example) `Dublin -> London -> Belfast`.
 *
 * What is the distance of the longest route?
 */

function part2(input) {
  const sortedTotals = getTotals(input)
  return sortedTotals[sortedTotals.length - 1]
}

module.exports = { part1, part2 }
