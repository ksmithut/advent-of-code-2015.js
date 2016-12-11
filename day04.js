'use strict'

const crypto = require('crypto')

/**
 * --- Day 4: The Ideal Stocking Stuffer ---
 *
 * Santa needs help [mining](https://en.wikipedia.org/wiki/Bitcoin#Mining) some
 * <span title="Hey, mined your own business!">AdventCoins</span> (very similar
 * to [bitcoins](https://en.wikipedia.org/wiki/Bitcoin)) to use as gifts for
 * all the economically forward-thinking little girls and boys.
 *
 * To do this, he needs to find [MD5](https://en.wikipedia.org/wiki/MD5) hashes
 * which, in [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal), start
 * with at least five zeroes. The input to the MD5 hash is some secret key
 * (your puzzle input, given below) followed by a number in decimal. To mine
 * AdventCoins, you must find Santa the lowest positive number (no leading
 * zeroes: `1`, `2`, `3`, ...) that produces such a hash.
 *
 * For example:
 *
 * - If your secret key is `abcdef`, the answer is `609043`, because the MD5
 *   hash of `abcdef609043` starts with five zeroes (`000001dbbfa...`), and it
 *   is the lowest such number to do so.
 * - If your secret key is `pqrstuv`, the lowest number it combines with to
 *   make an MD5 hash starting with five zeroes is `1048970`; that is, the MD5
 *   hash of `pqrstuv1048970` looks like `000006136ef...`.
 */

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

/**
 * --- Part Two ---
 *
 * Now find one that starts with six zeroes.
 */

function part2(input) {
  let i = -1
  while (true) { // eslint-disable-line no-constant-condition
    if (hash(`${input}${++i}`).startsWith('000000')) return i
  }
}

module.exports = { part1, part2 }
