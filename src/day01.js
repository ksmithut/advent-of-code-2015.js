'use strict'

const R = require('ramda') // eslint-disable-line no-unused-vars

// Part 1
// ======

const UP = R.equals('(')
const DOWN = R.equals(')')
const FIRST_FLOOR = 0
const INITIAL_STATE = {
  index: 0,
  floor: FIRST_FLOOR
}

const step = R.curry((floor, instruction) => {
  return R.cond([
    [UP, R.always(R.inc(floor))],
    [DOWN, R.always(R.dec(floor))],
    [R.T, R.always(floor)]
  ])(instruction)
})

const stepState = R.curry((previousState, instruction) => {
  return R.evolve({
    index: R.inc,
    floor: step(R.__, instruction)
  })(previousState)
})

const findFinalFloor = R.reduce(stepState, INITIAL_STATE)

const part1 = R.pipe(findFinalFloor, R.prop('floor'))

// Part 2
// ======
const findBasementEntry = R.reduceWhile(
  R.propSatisfies(R.lte(FIRST_FLOOR), 'floor'),
  stepState,
  INITIAL_STATE
)

const part2 = R.pipe(findBasementEntry, R.prop('index'))

module.exports = { part1, part2 }
