'use strict'

const crypto = require('crypto')

// Part 1
// ======

const hash = (str) => crypto
  .createHash('md5')
  .update(str)
  .digest('hex')

function part1(input) {
  let i = -1
  while (true) { // eslint-disable-line no-constant-condition
    if (hash(`${input}${++i}`).startsWith('00000')) return i
  }
}

// Part 2
// ======

function part2(input) {
  let i = -1
  while (true) { // eslint-disable-line no-constant-condition
    if (hash(`${input}${++i}`).startsWith('000000')) return i
  }
}

module.exports = { part1, part2 }
