'use strict'

exports.part1 = {
  answer: 1304,
  examples: [
    {
      input: [
        [ '20', '15', '10', '5', '5' ].join('\n'),
        25,
      ],
      value: 4,
    },
  ]
}

exports.part2 = {
  answer: 18,
  examples: [
    {
      input: exports.part1.examples[0].input,
      value: 3,
    },
  ]
}
