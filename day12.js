'use strict'

/**
 * --- Day 12: JSAbacusFramework.io ---
 *
 * Santa's Accounting-Elves need help balancing the books after a recent order.
 * Unfortunately, their accounting software uses a peculiar storage format.
 * That's where you come in.
 *
 * They have a [JSON](http://json.org/) document which contains a variety of
 * things: arrays (`[1,2,3]`), objects (`{"a":1, "b":2}`), numbers, and
 * strings. Your first job is to simply find all of the numbers throughout the
 * document and add them together.
 *
 * For example:
 *
 * - `[1,2,3]` and `{"a":2,"b":4}` both have a sum of `6`.
 * - `[[[3]]]` and `{"a":{"b":4},"c":-1}` both have a sum of `3`.
 * - `{"a":[-1,1]}` and `[-1,{"a":1}]` both have a sum of `0`.
 * - `[]` and `{}` both have a sum of `0`.
 *
 * You will not <span title="Nor are you likely to be eaten by a grue... during
 * *this* puzzle, anyway.">encounter</span> any strings containing numbers.
 *
 * What is the sum of all numbers in the document?
 */

const getType = (obj) => {
  const [ , type ] = Object.prototype.toString.call(obj).match(/(\w+)]$/)
  return type
}
const objectValues = (obj) => {
  if (Array.isArray(obj)) return obj
  return Object.keys(obj).map((key) => obj[key])
}

const sumDeep = (obj, ignoreCase = () => { /* no-op */ }) => {
  switch (getType(obj)) {
  case 'Object':
    if (ignoreCase(obj)) return 0
    // fallthrough
  case 'Array':
    return objectValues(obj)
      .reduce((total, val) => total + sumDeep(val, ignoreCase), 0)
  case 'Number':
    return obj
  default:
    return 0
  }
}

function part1(input) {
  return sumDeep(JSON.parse(input))
}

/**
 * --- Part Two ---
 *
 * Uh oh - the Accounting-Elves have realized that they double-counted
 * everything red.
 *
 * Ignore any object (and all of its children) which has any property with the
 * value `"red"`. Do this only for objects (`{...}`), not arrays (`[...]`).
 *
 * - `[1,2,3]` still has a sum of `6`.
 * - `[1,{"c":"red","b":2},3]` now has a sum of `4`, because the middle object
 *   is ignored.
 * - `{"d":"red","e":[1,2,3,4],"f":5}` now has a sum of `0`, because the entire
 *   structure is ignored.
 * - `[1,"red",5]` has a sum of `6`, because `"red"` in an array has no effect.
 */

function part2(input) {
  return sumDeep(JSON.parse(input), (obj) => {
    return Object.keys(obj).some((key) => obj[key] === 'red')
  })
}

module.exports = { part1, part2 }
