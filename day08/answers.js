'use strict'

exports.part1 = {
  answer: 1371,
  examples: [
    { input: '""', value: 2 },
    { input: '"abc"', value: 2 },
    { input: '"aaa\\"aaa"', value: 3 },
    { input: '"\\x27"', value: 5 },
  ],
}

exports.part2 = {
  answer: 2117,
  examples: [
    { input: '""', value: 4 },
    { input: '"abc"', value: 4 },
    { input: '"aaa\\"aaa"', value: 6 },
    { input: '"\\x27"', value: 5 },
  ],
}
