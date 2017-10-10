'use strict'

const ON = '#'
const OFF = '.'

// Part 1
// ======

const getGrid = input => {
  const grid = []
  input.split('\n').forEach((line, y) => {
    line.split('').forEach((char, x) => {
      grid[x] = grid[x] || []
      grid[x][y] = char
    })
  })
  return grid
}

const getNeighbors = (x, y, grid) => {
  const neighbors = []
  for (let xi = x - 1; xi <= x + 1; xi++) {
    if (!grid[xi]) continue // eslint-disable-line no-continue
    for (let yi = y - 1; yi <= y + 1; yi++) {
      if (xi === x && yi === y) continue // eslint-disable-line no-continue
      if (!grid[xi][yi]) continue // eslint-disable-line no-continue
      neighbors.push(grid[xi][yi])
    }
  }
  return neighbors
}

const nextVal = (x, y, grid) => {
  const val = grid[x][y]
  const numOn = getNeighbors(x, y, grid).filter(neighbor => neighbor === ON)
    .length
  if (val === ON) {
    return numOn === 2 || numOn === 3 ? ON : OFF
  }
  return numOn === 3 ? ON : OFF
}

const switchLights = grid => {
  const gridCopy = JSON.parse(JSON.stringify(grid))
  return grid.map((col, x) => {
    return col.map((cell, y) => {
      return nextVal(x, y, gridCopy)
    })
  })
}

const countGridVal = (grid, val) => {
  return grid.reduce((total, col) => {
    return col.reduce((colTotal, cell) => {
      return colTotal + (cell === val ? 1 : 0)
    }, total)
  }, 0)
}

function part1 (input) {
  const ITERATIONS = 100
  let grid = getGrid(input)
  for (let i = 0; i < ITERATIONS; i++) {
    grid = switchLights(grid)
  }
  return countGridVal(grid, ON)
}

// Part 2
// ======

const resetPoints = (grid, points, val) => {
  points.forEach(({ x, y }) => {
    grid[x][y] = val
  })
}

function part2 (input) {
  const ITERATIONS = 100
  let grid = getGrid(input)
  const corners = [
    { x: 0, y: 0 },
    { x: 0, y: grid[0].length - 1 },
    { x: grid.length - 1, y: 0 },
    { x: grid.length - 1, y: grid[0].length - 1 }
  ]
  resetPoints(grid, corners, ON)
  for (let i = 0; i < ITERATIONS; i++) {
    grid = switchLights(grid)
    resetPoints(grid, corners, ON)
  }
  return countGridVal(grid, ON)
}

module.exports = { part1, part2 }
