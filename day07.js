/* eslint-disable no-bitwise */

'use strict'

// Part 1
// ======

const ASSIGN = 'ASSIGN'
const CIRCUIT_REGEX = /(\b[a-z0-9]*\b)? ?(AND|OR|LSHIFT|RSHIFT|NOT)? ?(\b[a-z0-9]*\b)? -> (\w*)$/ // eslint-disable-line max-len
const parseLine = (line) => {
  const [ , left, command = ASSIGN, right, signal ] = line.match(CIRCUIT_REGEX)
  return { left, command, right, signal }
}

const memoize = (fn) => {
  const cache = {}
  return (...args) => {
    const hash = JSON.stringify(args)
    if (cache[hash] == null) {
      cache[hash] = fn(...args)
    }
    return cache[hash]
  }
}

const isNumber = (val) => !Number.isNaN(parseInt(val, 10))
const getSignal = (signals, val) => {
  return isNumber(val)
    ? () => parseInt(val, 10)
    : signals[val]
}

const ACTIONS = {
  ASSIGN: (left) => left(),
  AND: (left, right) => left() & right(),
  OR: (left, right) => left() | right(),
  LSHIFT: (left, right) => left() << right(),
  RSHIFT: (left, right) => left() >> right(),
  NOT: (left, right) => ~right(),
}

const getSignals = (input) => {
  return input.split('\n').reduce((acc, line) => {
    const { left, right, command, signal } = parseLine(line)
    acc[signal] = memoize(() => {
      const signalLeft = getSignal(acc, left)
      const signalRight = getSignal(acc, right)
      return ACTIONS[command](signalLeft, signalRight)
    })
    return acc
  }, {})
}

function part1(input) {
  const signals = getSignals(input)
  return signals.a()
}

// Part 2
// ======

function part2(input) {
  const signals = getSignals(input)
  signals.b = memoize(() => part1(input))
  return signals.a()
}

module.exports = { part1, part2 }
