'use strict'

/**
 * --- Day 6: Probably a Fire Hazard ---
 *
 * Because your neighbors keep defeating you in the holiday house decorating
 * contest year after year, you've decided to deploy one million lights in a
 * <span title="Hey, be glad I'm not asking for the resistance between two
 * points!">1000x1000 grid</span>.
 *
 * Furthermore, because you've been especially nice this year, Santa has mailed
 * you instructions on how to display the ideal lighting configuration.
 *
 * Lights in your grid are numbered from 0 to 999 in each direction; the lights
 * at each corner are at `0,0`, `0,999`, `999,999`, and `999,0`. The
 * instructions include whether to `turn on`, `turn off`, or `toggle` various
 * inclusive ranges given as coordinate pairs. Each coordinate pair represents
 * opposite corners of a rectangle, inclusive; a coordinate pair like `0,0
 * through 2,2` therefore refers to 9 lights in a 3x3 square. The lights all
 * start turned off.
 *
 * To defeat your neighbors this year, all you have to do is set up your lights
 * by doing the instructions Santa sent you in order.
 *
 * For example:
 *
 * - `turn on 0,0 through 999,999` would turn on (or leave on) every light.
 * - `toggle 0,0 through 999,0` would toggle the first line of 1000 lights,
 *   turning off the ones that were on, and turning on the ones that were off.
 * - `turn off 499,499 through 500,500` would turn off (or leave off) the
 *   middle four lights.
 *
 * After following the instructions, how many lights are lit?
 */

const INSTRUCTION_REGEX = /^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/ // eslint-disable-line max-len
const parseLine = (line) => {
  const [ , command, x1, y1, x2, y2 ] = line.match(INSTRUCTION_REGEX)
  return {
    command,
    x1: parseInt(x1, 10),
    y1: parseInt(y1, 10),
    x2: parseInt(x2, 10),
    y2: parseInt(y2, 10),
  }
}

const createGrid = (width, length, defaultVal) => {
  return new Array(width)
    .fill(null)
    .map(() => new Array(length).fill(defaultVal))
}

const sumGrid = (grid) => {
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

function part1(input) {
  const ACTIONS = {
    'turn on': (grid, command) => {
      gridSectionMap(grid, command, () => 1)
    },
    'turn off': (grid, command) => {
      gridSectionMap(grid, command, () => 0)
    },
    'toggle': (grid, command) => {
      gridSectionMap(grid, command, (val) => {
        return val ? 0 : 1
      })
    },
  }
  const grid = createGrid(1000, 1000, 0)
  input.split('\n').forEach((line) => {
    const command = parseLine(line)
    ACTIONS[command.command](grid, command)
  })
  return sumGrid(grid)
}

/**
 * --- Part Two ---
 *
 * You just finish implementing your winning light pattern when you realize you
 * mistranslated Santa's message from Ancient Nordic Elvish.
 *
 * The light grid you bought actually has individual brightness controls; each
 * light can have a brightness of zero or more. The lights all start at zero.
 *
 * The phrase `turn on` actually means that you should increase the brightness
 * of those lights by `1`.
 *
 * The phrase `turn off` actually means that you should decrease the brightness
 * of those lights by `1`, to a minimum of zero.
 *
 * The phrase `toggle` actually means that you should increase the brightness
 * of those lights by `2`.
 *
 * What is the total brightness of all lights combined after following Santa's
 * instructions?
 *
 * For example:
 *
 * - `turn on 0,0 through 0,0` would increase the total brightness by `1`.
 * - `toggle 0,0 through 999,999` would increase the total brightness by
 *   `2000000`.
 */

function part2(input) {
  const ACTIONS = {
    'turn on': (grid, command) => {
      gridSectionMap(grid, command, (val) => val + 1)
    },
    'turn off': (grid, command) => {
      gridSectionMap(grid, command, (val) => Math.max(val - 1, 0))
    },
    'toggle': (grid, command) => {
      gridSectionMap(grid, command, (val) => val + 2)
    },
  }
  const grid = createGrid(1000, 1000, 0)
  input.split('\n').forEach((line) => {
    const command = parseLine(line)
    ACTIONS[command.command](grid, command)
  })
  return sumGrid(grid)
}

module.exports = { part1, part2 }
