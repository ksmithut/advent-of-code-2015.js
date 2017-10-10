'use strict'

// Part 1
// ======

const checker = conditions => {
  return val =>
    conditions.every(condition => {
      return condition(val)
    })
}

function part1 (input) {
  const isNice = checker([
    val => (val.match(/(a|e|i|o|u)/g) || []).length >= 3,
    val => /(.)\1/.test(val),
    val => !/(ab|cd|pq|xy)/.test(val)
  ])
  return input.split('\n').filter(isNice).length
}

// Part 2
// ======

function part2 (input) {
  const isNice = checker([
    val => /(..).*\1/.test(val),
    val => /(.).\1/.test(val)
  ])
  return input.split('\n').filter(isNice).length
}

module.exports = { part1, part2 }
