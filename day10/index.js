'use strict';

/**
 * --- Day 10: Elves Look, Elves Say ---
 *
 * Today, the Elves are playing a game called look-and-say. They take turns
 * making sequences by reading aloud the previous sequence and using that
 * reading as the next sequence. For example, 211 is read as "one two, two
 * ones", which becomes 1221 (1 2, 2 1s).
 *
 * Look-and-say sequences are generated iteratively, using the previous value as
 * input for the next step. For each step, take the previous value, and replace
 * each run of digits (like 111) with the number of digits (3) followed by the
 * digit itself (1).
 *
 * For example:
 *
 * 1 becomes 11 (1 copy of digit 1).
 *
 * 11 becomes 21 (2 copies of digit 1).
 *
 * 21 becomes 1211 (one 2 followed by one 1).
 *
 * 1211 becomes 111221 (one 1, one 2, and two 1s).
 *
 * 111221 becomes 312211 (three 1s, two 2s, and one 1).
 *
 * Starting with the digits in your puzzle input, apply this process 40 times.
 * What is the length of the result?
 */

function repeatStr(str, num) {
  return new Array(num + 1).join(str);
}

function describeNumber(input) {
  let curChar = null;
  let curLength = 0;
  let output = '';

  for (let i = 0, len = input.length; i < len; i++) {
    if (!curChar) {
      curChar = input[i];
      curLength = 1;
    } else if (input[i] === curChar) {
      curLength++;
    } else {
      output += curLength + curChar;
      curLength = 1;
      curChar = input[i];
    }
  }

  output += curLength + curChar;

  return output;
}

export function part1(input, iterations = 40) {
  let output = input;

  for (let i = 0; i < iterations; i++) {
    output = describeNumber(output);
  }

  return output.length;
}

export let part1Examples = [
  { input: [ '1', 1 ], value: 2 },
  { input: [ '11', 1 ], value: 2 },
  { input: [ '21', 1 ], value: 4 },
  { input: [ '1211', 1 ], value: 6 },
  { input: [ '111221', 1 ], value: 6 },
];

export let part1Answer = 252594;

/**
 * --- Part Two ---
 *
 * Neat, right? You might also enjoy hearing John Conway talking about this
 * sequence (that's Conway of Conway's Game of Life fame).
 *
 * Now, starting again with the digits in your puzzle input, apply this process
 * 50 times. What is the length of the new result?
 */

export function part2(input) {
  return part1(input, 50);
}

export let part2Answer = 3579328;
