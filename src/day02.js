'use strict'

const R = require('ramda') // eslint-disable-line no-unused-vars

// Part 1
// ======

const parseLine = R.pipe(
  R.split('x'),
  R.map(parseInt),
  R.zipObj(['length', 'width', 'height'])
)

const getSides = R.pipe(
  R.juxt([
    R.juxt([R.prop('length'), R.prop('width')]),
    R.juxt([R.prop('width'), R.prop('height')]),
    R.juxt([R.prop('height'), R.prop('length')])
  ])
)

const surfaceArea = R.pipe(R.map(R.product), R.sum, R.multiply(2))

const smallestSideArea = R.pipe(R.sortBy(R.sum), R.head, R.product)

const wrappingPaperArea = R.pipe(
  parseLine,
  getSides,
  R.juxt([surfaceArea, smallestSideArea]),
  R.sum
)

const sumLines = fn => R.pipe(R.split('\n'), R.map(fn), R.sum)

const part1 = sumLines(wrappingPaperArea)

// Part 2
// ======

const smallestPerimeter = R.pipe(R.sortBy(R.sum), R.head, R.sum, R.multiply(2))

const cubicArea = R.pipe(
  R.juxt([R.prop('length'), R.prop('width'), R.prop('height')]),
  R.product
)

const ribbonLength = R.pipe(
  parseLine,
  R.juxt([R.pipe(getSides, smallestPerimeter), cubicArea]),
  R.sum
)

const part2 = sumLines(ribbonLength)

module.exports = { part1, part2 }
