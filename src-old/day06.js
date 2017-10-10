'use strict'

// Part 1
// ======

const INSTRUCTION_REGEX = /^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/ // eslint-disable-line max-len
const parseLine = line => {
  const [, command, x1, y1, x2, y2] = line.match(INSTRUCTION_REGEX)
  return {
    command,
    x1: parseInt(x1, 10),
    y1: parseInt(y1, 10),
    x2: parseInt(x2, 10),
    y2: parseInt(y2, 10)
  }
}

const createGrid = (width, length, defaultVal) => {
  return new Array(width)
    .fill(null)
    .map(() => new Array(length).fill(defaultVal))
}

const sumGrid = grid => {
  return grid.reduce((total, row) => {
    return total + row.reduce((subTotal, cell) => subTotal + cell)
  }, 0)
}

const gridSectionMap = (grid, { x1, y1, x2, y2 }, fn) => {
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      grid[x][y] = fn(grid[x][y])
    }
  }
}

function part1 (input) {
  const ACTIONS = {
    'turn on': (grid, command) => {
      gridSectionMap(grid, command, () => 1)
    },
    'turn off': (grid, command) => {
      gridSectionMap(grid, command, () => 0)
    },
    toggle: (grid, command) => {
      gridSectionMap(grid, command, val => {
        return val ? 0 : 1
      })
    }
  }
  const grid = createGrid(1000, 1000, 0)
  input.split('\n').forEach(line => {
    const command = parseLine(line)
    ACTIONS[command.command](grid, command)
  })
  return sumGrid(grid)
}

// Part 2
// ======

function part2 (input) {
  const ACTIONS = {
    'turn on': (grid, command) => {
      gridSectionMap(grid, command, val => val + 1)
    },
    'turn off': (grid, command) => {
      gridSectionMap(grid, command, val => Math.max(val - 1, 0))
    },
    toggle: (grid, command) => {
      gridSectionMap(grid, command, val => val + 2)
    }
  }
  const grid = createGrid(1000, 1000, 0)
  input.split('\n').forEach(line => {
    const command = parseLine(line)
    ACTIONS[command.command](grid, command)
  })
  return sumGrid(grid)
}

module.exports = { part1, part2 }
