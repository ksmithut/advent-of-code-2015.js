'use strict'

// Part 1
// ======

const getContainers = (input) => input
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b)

function* combinations(items, total) {
  const subItems = items.slice()
  for (const val of items) {
    subItems.shift()
    if (val === total) yield [ val ]
    for (const combo of combinations(subItems, total - val)) {
      yield [ val, ...combo ]
    }
  }
}

function part1(input) {
  const LITRES = 150
  const items = getContainers(input)
  const combos = []
  for (const combo of combinations(items, LITRES)) {
    combos.push(combo)
  }
  return combos.length
}

// Part 2
// ======

function part2(input) {
  const LITRES = 150
  const items = getContainers(input)
  let minLength = Infinity
  let combos = []
  for (const combo of combinations(items, LITRES)) {
    if (combo.length < minLength) {
      combos = []
      minLength = combo.length
    }
    if (combo.length === minLength) combos.push(combo)
  }
  return combos.length
}

module.exports = { part1, part2 }
