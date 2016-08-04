'use strict'

exports.part1 = {
  answer: 956,
  examples: [
    {
      input: [
        [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> e',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ].join('\n'),
        'g',
      ],
      value: 114,
    },
  ]
}

exports.part2 = {
  answer: 40149
}
