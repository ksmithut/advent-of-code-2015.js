'use strict'

/**
 * --- Day 3: Perfectly Spherical Houses in a Vacuum ---
 *
 * Santa is delivering presents to an infinite two-dimensional grid of houses.
 *
 * He begins by delivering a present to the house at his starting location, and
 * then an elf at the North Pole calls him via radio and tells him where to move
 * next. Moves are always exactly one house to the north (^), south (v), east (>),
 * or west (<). After each move, he delivers another present to the house at his
 * new location.
 *
 * However, the elf back at the north pole has had a little too much eggnog, and
 * so his directions are a little off, and Santa ends up visiting some houses
 * more than once. How many houses receive at least one present?
 *
 * For example:
 *
 * > delivers presents to 2 houses: one at the starting location, and one to the
 * east.
 *
 * ^>v< delivers presents to 4 houses in a square, including twice to the house
 * at his starting/ending location.
 *
 * ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2
 * houses.
 */

const UP = '^'
const DOWN = 'v'
const LEFT = '<'
const RIGHT = '>'
const ACTIONS = {
  [UP]: (pos) => ({ x: pos.x, y: pos.y - 1 }),
  [DOWN]: (pos) => ({ x: pos.x, y: pos.y + 1 }),
  [LEFT]: (pos) => ({ x: pos.x - 1, y: pos.y }),
  [RIGHT]: (pos) => ({ x: pos.x + 1, y: pos.y })
}
const houseSet = () => {
  const houses = new Set()
  return {
    visit: (pos) => houses.add(`${pos.x}:${pos.y}`),
    get visited() { return houses.size }
  }
}

function part1(input) {
  const houses = houseSet()
  let position = { x: 0, y: 0 }
  houses.visit(position)
  input.split('').forEach((char) => {
    position = ACTIONS[char](position)
    houses.visit(position)
  })
  return houses.visited
}

/**
 * --- Part Two ---
 *
 * The next year, to speed up the process, Santa creates a robot version of
 * himself, Robo-Santa, to deliver presents with him.
 *
 * Santa and Robo-Santa start at the same location (delivering two presents to
 * the same starting house), then take turns moving based on instructions from
 * the elf, who is eggnoggedly reading from the same script as the previous
 * year.
 *
 * This year, how many houses receive at least one present?
 *
 * For example:
 *
 * ^v delivers presents to 3 houses, because Santa goes north, and then
 * Robo-Santa goes south.
 *
 * ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back
 * where they started.
 *
 * ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction
 * and Robo-Santa going the other.
 */

const rotator = (length) => {
  let current = 0
  return () => {
    current = current >= length ? 0 : current
    return current++
  }
}

function part2(input) {
  const houses = houseSet()
  const positions = [
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]
  const getNext = rotator(positions.length)
  positions.forEach(houses.visit)
  input.split('').forEach((char) => {
    const index = getNext()
    let position = positions[index]
    position = ACTIONS[char](position)
    houses.visit(position)
    positions[index] = position
  })
  return houses.visited
}

module.exports = { part1, part2 }
