'use strict'

/**
 * --- Day 3: Perfectly Spherical Houses in a Vacuum ---
 *
 * Santa is delivering presents to an infinite two-dimensional grid of houses.
 *
 * He begins by delivering a present to the house at his starting location, and
 * then an elf at the North Pole calls him via radio and tells him where to
 * move next. Moves are always exactly one house to the north (`^`), south
 * (`v`), east (`>`), or west (`<`). After each move, he delivers another
 * present to the house at his new location.
 *
 * However, the elf back at the north pole has had a little too much eggnog,
 * and so his directions are a little off, and Santa ends up visiting some
 * houses more than once. How many houses receive at least one present?
 *
 * For example:
 *
 * - `>` delivers presents to `2` houses: one at the starting location, and one
 *   to the east.
 * - `^>v<` delivers presents to `4` houses in a square, including twice to the
 *   house at his starting/ending location.
 * - `^v^v^v^v^v` delivers a bunch of presents to some very lucky children at
 *   only `2` houses.
 */

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

/**
 * --- Part Two ---
 *
 * The next year, to speed up the process, Santa creates a robot version of
 * himself, Robo-Santa, to deliver presents with him.
 *
 * Santa and Robo-Santa start at the same location (delivering two presents to
 * the same starting house), then take turns moving based on instructions from
 * the elf, who is <span title="This absolutely real word was invented by
 * someone flipping eggnoggedly through a dictionary.">eggnoggedly</span>
 * reading from the same script as the previous year.
 *
 * This year, how many houses receive at least one present?
 *
 * For example:
 *
 * - `^v` delivers presents to `3` houses, because Santa goes north, and then
 *   Robo-Santa goes south.
 * - `^>v<` now delivers presents to `3` houses, and Santa and Robo-Santa end
 *   up back where they started.
 * - `^v^v^v^v^v` now delivers presents to `11` houses, with Santa going one
 *   direction and Robo-Santa going the other.
 */

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
