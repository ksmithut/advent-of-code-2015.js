'use strict'

exports.part1 = {
  answer: 543903,
  examples: [
    {
      input: [
        'turn on 0,0 through 999,999',
        'toggle 0,0 through 999,0',
        'turn off 499,499 through 500,500'
      ].join('\n'),
      value: 998996,
    },
  ]
}

exports.part2 = {
  answer: 14687245,
  examples: [
    { input: 'turn on 0,0 through 0,0', value: 1 },
    { input: 'toggle 0,0 through 999,999', value: 2000000 },
  ]
}
