'use strict'

const crypto = require('crypto')

/**
 * --- Day 4: The Ideal Stocking Stuffer ---
 *
 * Santa needs help mining some AdventCoins (very similar to bitcoins) to use as
 * gifts for all the economically forward-thinking little girls and boys.
 *
 * To do this, he needs to find MD5 hashes which, in hexadecimal, start with at
 * least five zeroes. The input to the MD5 hash is some secret key (your puzzle
 * input, given below) followed by a number in decimal. To mine AdventCoins, you
 * must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...)
 * that produces such a hash.
 *
 * For example:
 *
 * If your secret key is abcdef, the answer is 609043, because the MD5 hash of
 * abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest
 * such number to do so.
 *
 * If your secret key is pqrstuv, the lowest number it combines with to make an
 * MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of
 * pqrstuv1048970 looks like 000006136ef....
 */

const hashStr = (data) => crypto
  .createHash('md5')
  .update(data)
  .digest('hex')

function* hashGenerator(key, start = 0) {
  let i = start
  while (true) {
    yield { i, hash: hashStr(`${key}${i}`).toString() }
    i++
  }
}

function part1(input) {
  for (const { i, hash } of hashGenerator(input)) {
    if (hash.startsWith('00000')) return i
  }
}

/**
 * --- Part Two ---
 *
 * Now find one that starts with six zeroes.
 */

function part2(input) {
  for (const { i, hash } of hashGenerator(input)) {
    if (hash.startsWith('000000')) return i
  }
}

module.exports = { part1, part2 }
