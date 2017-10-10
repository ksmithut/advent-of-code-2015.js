'use strict'

// Part 1
// ======

const ACTIONS = {
  '(': floor => floor + 1, // Move up a floor
  ')': floor => floor - 1 // Move down a floor
}

function part1 (input) {
  return input.split('').reduce((floor, instruction) => {
    return ACTIONS[instruction](floor)
  }, 0)
}

// Part 2
// ======

function part2 (input) {
  let floor = 0
  return (
    input.split('').findIndex(instruction => {
      floor = ACTIONS[instruction](floor)
      return floor < 0
    }) + 1
  )
}

module.exports = { part1, part2 }
