'use strict'

// Part 1
// ======

function part1(input) {
  const max = parseInt(input, 10)
  const cap = max / 10
  const houses = []
  for (let elf = 1; elf <= cap; elf++) {
    for (let house = elf; house <= cap; house += elf) {
      const presents = elf * 10
      houses[house] = (houses[house] || 0) + presents
    }
  }
  return houses.findIndex((presents) => presents >= max)
}

// Part 2
// ======

function part2(input) {
  const max = parseInt(input, 10)
  const cap = max / 10
  const houses = []
  for (let elf = 1; elf <= cap; elf++) {
    for (let house = elf, i = 0; i < 50 && house <= cap; house += elf, i++) {
      const presents = elf * 11
      houses[house] = (houses[house] || 0) + presents
    }
  }
  return houses.findIndex((presents) => presents >= max)
}

module.exports = { part1, part2 }
