'use strict'

// Part 1
// ======

// TODO write this util yourself
const { combination } = require('js-combinatorics')

const sum = arr => arr.reduce((total, num) => total + num)
const product = arr => arr.reduce((total, num) => total * num)
const sortNums = (a, b) => a - b
const parseNum = num => parseInt(num, 10)

const getBestGroup1 = (packages, numGroups) => {
  const total = sum(packages)
  const groupSize = total / numGroups
  const validGroups = []
  for (let groupLength = 1; validGroups.length === 0; groupLength++) {
    const combos = combination(packages, groupLength)
    let currCombo
    while ((currCombo = combos.next())) {
      // TODO verify that the other groups are possible with this combo
      if (sum(currCombo) === groupSize) validGroups.push(currCombo)
    }
  }
  return validGroups.map(combo => product(combo)).sort(sortNums)[0]
}

const getPackages = input =>
  input
    .split('\n')
    .map(parseNum)
    .sort(sortNums)

function part1 (input) {
  const NUM_GROUPS = 3
  const packages = getPackages(input)
  return getBestGroup1(packages, NUM_GROUPS)
}

// Part 2
// ======

function part2 (input) {
  const NUM_GROUPS = 4
  const packages = getPackages(input)
  return getBestGroup1(packages, NUM_GROUPS)
}

module.exports = { part1, part2 }
