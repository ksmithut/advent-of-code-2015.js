'use strict';

/**
 * --- Day 17: No Such Thing as Too Much ---
 *
 * The elves bought too much eggnog again - 150 liters this time. To fit it all
 * into your refrigerator, you'll need to move it into smaller containers. You
 * take an inventory of the capacities of the available containers.
 *
 * For example, suppose you have containers of size 20, 15, 10, 5, and 5 liters.
 * If you need to store 25 liters, there are four ways to do it:
 *
 * 15 and 10
 * 20 and 5 (the first 5)
 * 20 and 5 (the second 5)
 * 15, 5, and 5
 *
 * Filling all containers entirely, how many different combinations of
 * containers can exactly fit all 150 liters of eggnog?
 */

function getPermutations(total, possibilities) {

  let permutations = [];
  let subPossibilities = possibilities.slice(0);

  possibilities.forEach((container) => {
    subPossibilities.splice(0, 1);

    if (container === total) { permutations.push([ container ]); }

    getPermutations(total - container, subPossibilities).forEach((subPermutation) => {
      permutations.push([ container, ...subPermutation ]);
    });
  });

  return permutations;
}

export function part1(input, totalLiters = 150) {
  let possibilities = input.split('\n').map((num) => parseInt(num, 10));

  return getPermutations(totalLiters, possibilities).length;
}

export let part1Examples = [
  {
    input: [
      [ '20', '15', '10', '5', '5' ].join('\n'),
      25,
    ],
    value: 4,
  },
];

export let part1Answer = 1304;

/**
 * --- Part Two ---
 *
 * While playing with all the containers in the kitchen, another load of eggnog
 * arrives! The shipping and receiving department is requesting as many
 * containers as you can spare.
 *
 * Find the minimum number of containers that can exactly fit all 150 liters of
 * eggnog. How many different ways can you fill that number of containers and
 * still hold exactly 150 litres?
 *
 * In the example above, the minimum number of containers was two. There were
 * three ways to use that many containers, and so the answer there would be 3.
 */

export function part2(input, totalLiters = 150) {
  let possibilities = input.split('\n').map((num) => parseInt(num, 10));
  let permutations = getPermutations(totalLiters, possibilities);

  return permutations.reduce(({ num, length }, permutation) => {
    if (length === null || permutation.length < length) {
      num = 1;
      length = permutation.length;
    } else if (permutation.length === length) { num++; }

    return { num, length };
  }, { num: 0, length: null }).num;
}

export let part2Examples = [
  {
    input: part1Examples[0].input,
    value: 3,
  },
];

export let part2Answer = 18;
