'use strict'

// Part 1
// ======

const ACTIONS = {
  '^': ({ x, y }) => ({ x, y: y - 1 }),
  '>': ({ x, y }) => ({ x: x + 1, y }),
  'v': ({ x, y }) => ({ x, y: y + 1 }),
  '<': ({ x, y }) => ({ x: x - 1, y }),
}

const createGrid = () => {
  const visited = {}
  return {
    visit(pos) {
      const key = `${pos.x}:${pos.y}`
      visited[key] = (visited[key] || 0) + 1
    },
    get visited() {
      return Object.keys(visited).length
    },
  }
}

function part1(input) {
  const grid = createGrid()
  let pos = { x: 0, y: 0 }
  grid.visit(pos)
  input.split('').forEach((instruction) => {
    pos = ACTIONS[instruction](pos)
    grid.visit(pos)
  })
  return grid.visited
}

// Part 2
// ======

const createRotator = (length) => {
  let curr = 0
  return () => {
    if (curr >= length) curr = 0
    return curr++
  }
}

function part2(input) {
  const grid = createGrid()
  const deliverers = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]
  const getNext = createRotator(deliverers.length)
  grid.visit(deliverers[0])
  input.split('').forEach((instruction) => {
    const nextIndex = getNext()
    deliverers[nextIndex] = ACTIONS[instruction](deliverers[nextIndex])
    grid.visit(deliverers[nextIndex])
  })
  return grid.visited
}

module.exports = { part1, part2 }
