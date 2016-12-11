/* eslint-disable no-bitwise */

'use strict'

/**
 * --- Day 7: Some Assembly Required ---
 *
 * This year, Santa brought little Bobby Tables a set of wires and [bitwise
 * logic gates](https://en.wikipedia.org/wiki/Bitwise_operation)!
 * Unfortunately, little Bobby is a little under the recommended age range, and
 * he needs help <span title="You had one of these as a kid, right?">assembling
 * the circuit</span>.
 *
 * Each wire has an identifier (some lowercase letters) and can carry a
 * [16-bit](https://en.wikipedia.org/wiki/16-bit) signal (a number from `0` to
 * `65535`). A signal is provided to each wire by a gate, another wire, or some
 * specific value. Each wire can only get a signal from one source, but can
 * provide its signal to multiple destinations. A gate provides no signal until
 * all of its inputs have a signal.
 *
 * The included instructions booklet describes how to connect the parts
 * together: `x AND y -> z` means to connect wires `x` and `y` to an AND gate,
 * and then connect its output to wire `z`.
 *
 * For example:
 *
 * - `123 -> x` means that the signal `123` is provided to wire `x`.
 * - `x AND y -> z` means that the [bitwise
 *   AND](https://en.wikipedia.org/wiki/Bitwise_operation#AND) of wire `x` and
 *   wire `y` is provided to wire `z`.
 * - `p LSHIFT 2 -> q` means that the value from wire `p` is
 *   [left-shifted](https://en.wikipedia.org/wiki/Logical_shift) by `2` and
 *   then provided to wire `q`.
 * - `NOT e -> f` means that the [bitwise
 *   complement](https://en.wikipedia.org/wiki/Bitwise_operation#NOT) of the
 *   value from wire `e` is provided to wire `f`.
 *
 * Other possible gates include `OR` ([bitwise
 * OR](https://en.wikipedia.org/wiki/Bitwise_operation#OR)) and `RSHIFT`
 * ([right-shift](https://en.wikipedia.org/wiki/Logical_shift)). If, for some
 * reason, you'd like to emulate the circuit instead, almost all programming
 * languages (for example,
 * [C](https://en.wikipedia.org/wiki/Bitwise_operations_in_C),
 * [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators),
 * or [Python](https://wiki.python.org/moin/BitwiseOperators)) provide
 * operators for these gates.
 *
 * For example, here is a simple circuit:
 *
 *     123 -> x
 *     456 -> y
 *     x AND y -> d
 *     x OR y -> e
 *     x LSHIFT 2 -> f
 *     y RSHIFT 2 -> g
 *     NOT x -> h
 *     NOT y -> i
 *
 * After it is run, these are the signals on the wires:
 *
 *     d: 72
 *     e: 507
 *     f: 492
 *     g: 114
 *     h: 65412
 *     i: 65079
 *     x: 123
 *     y: 456
 *
 * In little Bobby's kit's instructions booklet (provided as your puzzle
 * input), what signal is ultimately provided to wire `a`?
 */

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

/**
 * --- Part Two ---
 *
 * Now, take the signal you got on wire `a`, override wire `b` to that signal,
 * and reset the other wires (including wire `a`). What new signal is
 * ultimately provided to wire `a`?
 */

function part2(input) {
  const signals = getSignals(input)
  signals.b = memoize(() => part1(input))
  return signals.a()
}

module.exports = { part1, part2 }
