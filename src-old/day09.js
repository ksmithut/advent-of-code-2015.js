'use strict'

// Part 1
// ======

const sortNums = arr => arr.slice().sort((a, b) => a - b)

const parseLine = line => {
  const [, from, to, distance] = line.match(/^(\w*) to (\w*) = (\d*)/)
  return {
    from,
    to,
    distance: parseInt(distance, 10)
  }
}

const getDistances = input => {
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

const getPermutations = arr => {
  if (arr.length <= 1) return [arr]
  return arr.reduce((permutations, val, i) => {
    const subArray = arr.slice()
    subArray.splice(i, 1)
    const subPermutations = getPermutations(subArray).map(permutation =>
      [val].concat(permutation)
    )
    return permutations.concat(subPermutations)
  }, [])
}

const totalRoute = (distances, route) => {
  return route.reduce((total, city, i, arr) => {
    if (i === 0) return 0
    return total + distances[city][arr[i - 1]]
  }, 0)
}

const getTotals = input => {
  const distances = getDistances(input)
  const routes = getPermutations(Object.keys(distances))
  const totals = routes.map(route => totalRoute(distances, route))
  return sortNums(totals)
}

function part1 (input) {
  return getTotals(input)[0]
}

// Part 2
// ======

function part2 (input) {
  const sortedTotals = getTotals(input)
  return sortedTotals[sortedTotals.length - 1]
}

module.exports = { part1, part2 }
