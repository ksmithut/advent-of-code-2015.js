'use strict'

exports.part1 = {
  answer: 74,
  examples: [
    { input: '(())', value: 0 },
    { input: '()()', value: 0 },
    { input: '(((', value: 3 },
    { input: '(()(()(', value: 3 },
    { input: '))(((((', value: 3 },
    { input: '())', value: -1 },
    { input: '))(', value: -1 },
    { input: ')))', value: -3 },
    { input: ')())())', value: -3 },
  ],
}

exports.part2 = {
  answer: 1795,
  examples: [
    { input: ')', value: 1 },
    { input: '()())', value: 5 }
  ],
}
