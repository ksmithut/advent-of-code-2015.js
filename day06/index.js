'use strict'

/**
 * --- Day 6: Probably a Fire Hazard ---
 *
 * Because your neighbors keep defeating you in the holiday house decorating
 * contest year after year, you've decided to deploy one million lights in a
 * 1000x1000 grid.
 *
 * Furthermore, because you've been especially nice this year, Santa has mailed
 * you instructions on how to display the ideal lighting configuration.
 *
 * Lights in your grid are numbered from 0 to 999 in each direction; the lights
 * at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions
 * include whether to turn on, turn off, or toggle various inclusive ranges
 * given as coordinate pairs. Each coordinate pair represents opposite corners
 * of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore
 * refers to 9 lights in a 3x3 square. The lights all start turned off.
 *
 * To defeat your neighbors this year, all you have to do is set up your lights
 * by doing the instructions Santa sent you in order.
 *
 * For example:
 *
 * turn on 0,0 through 999,999 would turn on (or leave on) every light.
 *
 * toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning
 * off the ones that were on, and turning on the ones that were off.
 *
 * turn off 499,499 through 500,500 would turn off (or leave off) the middle
 * four lights.
 *
 * After following the instructions, how many lights are lit?
 */

const ACTIONS = {
  TOGGLE: 'toggle',
  TURN_OFF: 'turn off',
  TURN_ON: 'turn on'
}

const PARSE_REGEX = /(toggle|turn off|turn on) (\d*),(\d*) through (\d*),(\d*)/
const parseLine = (line) => {
  const [, action, x1, y1, x2, y2] = line.match(PARSE_REGEX)
  return {
    action,
    x1: parseInt(x1, 10),
    y1: parseInt(y1, 10),
    x2: parseInt(x2, 10),
    y2: parseInt(y2, 10)
  }
}

const createGrid = (width, height, init = 0) => {
  return new Array(width)
    .fill(null)
    .map(() => new Array(height).fill(init))
}

const getBrightness = (width, height, input, actions) => {
  return input
    .split('\n')
    .reduce((grid, line) => {
      const { action, x1, y1, x2, y2 } = parseLine(line)
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          grid[x][y] = actions[action](grid[x][y])
        }
      }
      return grid
    }, createGrid(1000, 1000))
    .reduce((total, col) => {
      const colTotal = col.reduce((subTotal, cell) => subTotal + cell)
      return total + colTotal
    }, 0)
}

function part1(input) {
  return getBrightness(1000, 1000, input, {
    [ACTIONS.TOGGLE]: (val) => val ? 0 : 1, // eslint-disable-line no-confusing-arrow
    [ACTIONS.TURN_OFF]: (val) => 0,
    [ACTIONS.TURN_ON]: (val) => 1
  })
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
 * The phrase turn on actually means that you should increase the brightness of
 * those lights by 1.
 *
 * The phrase turn off actually means that you should decrease the brightness of
 * those lights by 1, to a minimum of zero.
 *
 * The phrase toggle actually means that you should increase the brightness of
 * those lights by 2.
 *
 * What is the total brightness of all lights combined after following Santa's
 * instructions?
 *
 * For example:
 *
 * turn on 0,0 through 0,0 would increase the total brightness by 1.
 *
 * toggle 0,0 through 999,999 would increase the total brightness by 2000000.
 */

function part2(input) {
  return getBrightness(1000, 1000, input, {
    [ACTIONS.TOGGLE]: (val) => val + 2,
    [ACTIONS.TURN_OFF]: (val) => val <= 0 ? 0 : val - 1,
    [ACTIONS.TURN_ON]: (val) => val + 1
  })
}

module.exports = { part1, part2 }
