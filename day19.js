'use strict'

// Part 1
// ======

const parseInput = (input) => {
  const [ definitions, medicine ] = input.split('\n\n')
  const replacements = definitions.split('\n').map((line) => {
    const [ from, to ] = line.split(' => ')
    return { from, to }
  })
  return { replacements, medicine }
}

function part1(input) {
  const { replacements, medicine } = parseInput(input)
  const combos = replacements.reduce((hash, { from, to }) => {
    let index = 0
    while ((index = medicine.indexOf(from, index)) >= 0) {
      const prefix = medicine.substr(0, index)
      const suffix = medicine.substr(index).replace(from, to)
      const combo = prefix + suffix
      hash[combo] = true
      index++
    }
    return hash
  }, {})
  return Object.keys(combos).length
}

// Part 2
// ======

function part2(input) {
  const { medicine } = parseInput(input)
  const numElements = medicine.match(/[A-Z]/g).length
  const numParens = medicine.match(/(Rn|Ar)/g).length
  const numCommas = medicine.match(/Y/g).length
  return numElements - numParens - (2 * numCommas) - 1
}

module.exports = { part1, part2 }
