'use strict'

// Part 1
// ======

const parseInput = input => {
  const [, row, column] = input.match(/row (\d+), column (\d+)/)
  return { row: parseInt(row, 10), column: parseInt(column, 10) }
}

const incrementCode = code => (code * 252533) % 33554393

const getCode = (initCode, searchRow, searchColumn) => {
  let code = initCode
  let row = 1
  let column = 1
  while (row !== searchRow || column !== searchColumn) {
    code = incrementCode(code)
    if (row === 1) {
      row = column + 1
      column = 1
    } else {
      column++
      row--
    }
  }
  return code
}

function part1 (input) {
  const { row, column } = parseInput(input)
  return getCode(20151125, row, column)
}

// Part 2
// ======

function part2 (input) {
  return input
}

module.exports = { part1, part2 }
