'use strict'

// Part 1
// ======

const lookAndSay = str =>
  str.replace(/(\d)\1*/g, group => {
    return `${group.length}${group.charAt(0)}`
  })

const iterateLookAndSay = (input, iterations) => {
  let output = input
  for (let i = 0; i < iterations; i++) {
    output = lookAndSay(output)
  }
  return output
}

function part1 (input) {
  return iterateLookAndSay(input, 40).length
}

// Part 2
// ======

function part2 (input) {
  return iterateLookAndSay(input, 50).length
}

module.exports = { part1, part2 }
