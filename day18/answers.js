'use strict'

exports.part1 = {
  answer: 814,
  examples: [
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
  ]
}

exports.part2 = {
  answer: 924,
  examples: [
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
  ]
}
