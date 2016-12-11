'use strict'

/**
 * --- Day 11: Corporate Policy ---
 *
 * Santa's previous password expired, and he needs help choosing a new one.
 *
 * To help him remember his new password after the old one expires, Santa has
 * devised a method of coming up with a password based on the previous one.
 * Corporate policy dictates that passwords must be exactly eight lowercase
 * letters (for security reasons), so he finds his new password by incrementing
 * his old password string repeatedly until it is valid.
 *
 * Incrementing is just like counting with numbers: `xx`, `xy`, `xz`, `ya`,
 * `yb`, and so on. Increase the rightmost letter one step; if it was `z`, it
 * wraps around to `a`, and repeat with the next letter to the left until one
 * doesn't wrap around.
 *
 * Unfortunately for Santa, a new Security-Elf recently started, and he has
 * imposed some additional password requirements:
 *
 * - Passwords must include one increasing straight of at least three letters,
 *   like `abc`, `bcd`, `cde`, and so on, up to `xyz`. They cannot skip
 *   letters; `abd` doesn't count.
 * - Passwords may not contain the letters `i`, `o`, or `l`, as these letters
 *   can be mistaken for other characters and are therefore confusing.
 * - Passwords must contain at least two different, non-overlapping pairs of
 *   letters, like `aa`, `bb`, or `zz`.
 *
 * For example:
 *
 * - `hijklmmn` meets the first requirement (because it contains the straight
 *   `hij`) but fails the second requirement requirement (because it contains
 *   `i` and `l`).
 * - `abbceffg` meets the third requirement (because it repeats `bb` and `ff`)
 *   but fails the first requirement.
 * - `abbcegjk` fails the third requirement, because it only has one double
 *   letter (`bb`).
 * - The next password after `abcdefgh` is `abcdffaa`.
 * - The next password after `ghijklmn` is `ghjaabcc`, because you eventually
 *   skip all the passwords that start with `ghi...`, since `i` is not allowed.
 *
 * Given Santa's current password (your puzzle input), what should his next
 * password be?
 */

const toCharCode = (char) => char.charCodeAt(0)
const fromCharCode = (code) => String.fromCharCode(code)

const incrementStr = (str) => {
  const chars = str.split('')
  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i]
    if (char !== 'z') {
      chars[i] = fromCharCode(toCharCode(char) + 1)
      return chars.join('')
    }
    chars[i] = 'a'
  }
  chars.unshift('a')
  return chars.join('')
}

const passAll = (conditions) => {
  return (val) => conditions.every((condition) => condition(val))
}

const hasStraight = (val) => val
  .split('')
  .map(toCharCode)
  .some((code, i, arr) => {
    if (i < 2) return false
    return code === arr[i - 1] + 1 && code === arr[i - 2] + 2
  })
const hasValidChars = (val) => !(/(i|o|l)/).test(val)
const hasTwoPairs = (val) => (val.match(/(\w)\1/g) || [])
  .filter((pair, i, arr) => arr.indexOf(pair) === i)
  .length >= 2

const validPassword = passAll([
  hasStraight,
  hasValidChars,
  hasTwoPairs,
])

function part1(input) {
  let password = input
  while (true) { // eslint-disable-line no-constant-condition
    password = incrementStr(password)
    if (validPassword(password)) return password
  }
}

/**
 * --- Part Two ---
 *
 * Santa's password <span title="The corporate policy says your password
 * expires after 12 seconds.  For security.">expired again</span>. What's the
 * next one?
 */

function part2(input) {
  return part1(part1(input))
}

module.exports = { part1, part2 }
