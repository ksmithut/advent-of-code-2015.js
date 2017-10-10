'use strict'

// Part 1
// ======

const getType = obj => {
  const [, type] = Object.prototype.toString.call(obj).match(/(\w+)]$/)
  return type
}
const objectValues = obj => {
  if (Array.isArray(obj)) return obj
  return Object.keys(obj).map(key => obj[key])
}

const sumDeep = (
  obj,
  ignoreCase = () => {
    /* no-op */
  }
) => {
  switch (getType(obj)) {
    case 'Object':
      if (ignoreCase(obj)) return 0
    // fallthrough
    case 'Array':
      return objectValues(obj).reduce(
        (total, val) => total + sumDeep(val, ignoreCase),
        0
      )
    case 'Number':
      return obj
    default:
      return 0
  }
}

function part1 (input) {
  return sumDeep(JSON.parse(input))
}

// Part 2
// ======

function part2 (input) {
  return sumDeep(JSON.parse(input), obj => {
    return Object.keys(obj).some(key => obj[key] === 'red')
  })
}

module.exports = { part1, part2 }
