'use strict';

/**
 * --- Day 18: Like a GIF For Your Yard ---
 *
 * After the million lights incident, the fire code has gotten stricter: now, at
 * most ten thousand lights are allowed. You arrange them in a 100x100 grid.
 *
 * Never one to let you down, Santa again mails you instructions on the ideal
 * lighting configuration. With so few lights, he says, you'll have to resort to
 * animation.
 *
 * Start by setting your lights to the included initial configuration (your
 * puzzle input). A # means "on", and a . means "off".
 *
 * Then, animate your grid in steps, where each step decides the next
 * configuration based on the current one. Each light's next state (either on or
 * off) depends on its current state and the current states of the eight lights
 * adjacent to it (including diagonals). Lights on the edge of the grid might
 * have fewer than eight neighbors; the missing ones always count as "off".
 *
 * For example, in a simplified 6x6 grid, the light marked A has the neighbors
 * numbered 1 through 8, and the light marked B, which is on an edge, only has
 * the neighbors marked 1 through 5:
 *
 * 1B5...
 * 234...
 * ......
 * ..123.
 * ..8A4.
 * ..765.
 * The state a light should have next is based on its current state (on or off)
 * plus the number of neighbors that are on:
 *
 * A light which is on stays on when 2 or 3 neighbors are on, and turns off
 * otherwise.
 * A light which is off turns on if exactly 3 neighbors are on, and stays off
 * otherwise.
 * All of the lights update simultaneously; they all consider the same current
 * state before moving to the next.
 *
 * Here's a few steps from an example configuration of another 6x6 grid:
 *
 * Initial state:
 * .#.#.#
 * ...##.
 * #....#
 * ..#...
 * #.#..#
 * ####..
 *
 * After 1 step:
 * ..##..
 * ..##.#
 * ...##.
 * ......
 * #.....
 * #.##..
 *
 * After 2 steps:
 * ..###.
 * ......
 * ..###.
 * ......
 * .#....
 * .#....
 *
 * After 3 steps:
 * ...#..
 * ......
 * ...#..
 * ..##..
 * ......
 * ......
 *
 * After 4 steps:
 * ......
 * ......
 * ..##..
 * ..##..
 * ......
 * ......
 * After 4 steps, this example has four lights on.
 *
 * In your grid of 100x100 lights, given your initial configuration, how many
 * lights are on after 100 steps?
 */

const ON = 1;
const OFF = 0;

const INITIAL_VALUE = {
  '.': OFF,
  '#': ON,
};

function createGrid(input) {
  return input.split('\n').reduce((grid, line) => {
    let column = [];

    for (let i = 0; i < line.length; i++) {
      column.push({
        state: INITIAL_VALUE[line[i]],
        nextState: null,
      });
    }

    grid.push(column);
    return grid;
  }, []);
}

function neighbors(x, y, grid) {
  let totalOn = 0;

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) { continue; }

      let state = (grid[i] && grid[i][j] && grid[i][j].state) || OFF;

      if (state === ON) { totalOn++; }
    }
  }

  return totalOn;
}

function nextState1(x, y, grid) {
  let isOn = grid[x][y].state === 1;
  let numNeighbors = neighbors(x, y, grid);

  if (isOn) {
    if (numNeighbors !== 2 && numNeighbors !== 3) {
      grid[x][y].nextState = OFF;
    } else {
      grid[x][y].nextState = ON;
    }
    return;
  }

  if (numNeighbors === 3) {
    grid[x][y].nextState = ON;
  } else {
    grid[x][y].nextState = OFF;
  }

}

function runStep(grid, nextState) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      nextState(x, y, grid);
    }
  }

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      grid[x][y].state = grid[x][y].nextState;
    }
  }
}

function printGrid(grid) {
  let output = '';

  for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
      output += grid[i][j].state;
    }
    output += '\n';
  }
  return output;
}

export function part1(input, steps = 100) {
  let grid = createGrid(input);

  for (let i = 0; i < steps; i++) {
    runStep(grid, nextState1);
  }

  return grid.reduce((total, col) => {
    return col.reduce((totalCol, cell) => totalCol + cell.state, total);
  }, 0);
}

export let part1Examples = [
  {
    input: [
      [
        '.#.#.#',
        '...##.',
        '#....#',
        '..#...',
        '#.#..#',
        '####..',
      ].join('\n'),
      4,
    ],
    value: 4,
  },
];

export let part1Answer = 814;

/**
 * --- Part Two ---
 *
 * You flip the instructions over; Santa goes on to point out that this is all
 * just an implementation of Conway's Game of Life. At least, it was, until you
 * notice that something's wrong with the grid of lights you bought: four
 * lights, one in each corner, are stuck on and can't be turned off. The example
 * above will actually run like this:
 *
 * Initial state:
 * ##.#.#
 * ...##.
 * #....#
 * ..#...
 * #.#..#
 * ####.#
 *
 * After 1 step:
 * #.##.#
 * ####.#
 * ...##.
 * ......
 * #...#.
 * #.####
 *
 * After 2 steps:
 * #..#.#
 * #....#
 * .#.##.
 * ...##.
 * .#..##
 * ##.###
 *
 * After 3 steps:
 * #...##
 * ####.#
 * ..##.#
 * ......
 * ##....
 * ####.#
 *
 * After 4 steps:
 * #.####
 * #....#
 * ...#..
 * .##...
 * #.....
 * #.#..#
 *
 * After 5 steps:
 * ##.###
 * .##..#
 * .##...
 * .##...
 * #.#...
 * ##...#
 * After 5 steps, this example now has 17 lights on.
 *
 * In your grid of 100x100 lights, given your initial configuration, but with
 * the four corners always in the on state, how many lights are on after 100
 * steps?
 */

function nextState2(x, y, grid) {
  let isTopOrBottom = x === 0 || x === grid.length - 1;
  let isLeftOrRight = y === 0 || y === grid[grid.length - 1].length - 1;

  if (isTopOrBottom && isLeftOrRight) {
    grid[x][y].nextState = ON;
    return;
  }

  nextState1(x, y, grid);
}

export function part2(input, steps = 100) {
  let grid = createGrid(input);

  grid[0][0].state = ON;
  grid[0][grid[0].length - 1].state = ON;
  grid[grid.length - 1][0].state = ON;
  grid[grid.length - 1][grid[0].length - 1].state = ON;

  for (let i = 0; i < steps; i++) {
    runStep(grid, nextState2);
  }

  return grid.reduce((total, col) => {
    return col.reduce((totalCol, cell) => totalCol + cell.state, total);
  }, 0);
}

export let part2Examples = [
  {
    input: [
      [
        '##.#.#',
        '...##.',
        '#....#',
        '..#...',
        '#.#..#',
        '####.#',
      ].join('\n'),
      5,
    ],
    value: 17,
  },
];
