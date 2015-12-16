'use strict';

function totalNice(input, conditions) {
  return input
    .split('\n')
    .reduce((total, str) => {
      let isNice = conditions.every((condition) => condition(str));

      return total + (isNice ? 1 : 0);
    }, 0);
}

/**
 * --- Day 5: Doesn't He Have Intern-Elves For This? ---
 *
 * Santa needs help figuring out which strings in his text file are naughty or
 * nice.
 *
 * A nice string is one with all of the following properties:
 *
 * It contains at least three vowels (aeiou only), like aei, xazegov, or
 * aeiouaeiouaeiou.
 *
 * It contains at least one letter that appears twice in a row, like xx, abcdde
 * (dd), or aabbccdd (aa, bb, cc, or dd).
 *
 * It does not contain the strings ab, cd, pq, or xy, even if they are part of
 * one of the other requirements.
 *
 * For example:
 *
 * ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...),
 * a double letter (...dd...), and none of the disallowed substrings.
 *
 * aaa is nice because it has at least three vowels and a double letter, even
 * though the letters used by different rules overlap.
 *
 * jchzalrnumimnmhp is naughty because it has no double letter.
 *
 * haegwjzuvuyypxyu is naughty because it contains the string xy.
 *
 * dvszwmarrgswjxmb is naughty because it contains only one vowel.
 *
 * How many strings are nice?
 */

export function part1(input) {
  return totalNice(input, [
    // At least three vowels
    (str) => (str.match(/[aeiou]/g) || []).length >= 3,
    // Contains at least one letter that appers twice in a row
    (str) => (/(\w)\1/).test(str),
    // Must not contain certain string combinations
    (str) => !(/(ab|cd|pq|xy)/).test(str),
  ]);
}

export let part1Examples = [
  { input: 'ugknbfddgicrmopn', value: 1 },
  { input: 'aaa', value: 1 },
  { input: 'jchzalrnumimnmhp', value: 0 },
  { input: 'haegwjzuvuyypxyu', value: 0 },
  { input: 'dvszwmarrgswjxmb', value: 0 },
];

export let part1Answer = 238;

/**
 * --- Part Two ---
 *
 * Realizing the error of his ways, Santa has switched to a better model of
 * determining whether a string is naughty or nice. None of the old rules apply,
 * as they are all clearly ridiculous.
 *
 * Now, a nice string is one with all of the following properties:
 *
 * It contains a pair of any two letters that appears at least twice in the
 * string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like
 * aaa (aa, but it overlaps).
 *
 * It contains at least one letter which repeats with exactly one letter between
 * them, like xyx, abcdefeghi (efe), or even aaa.
 *
 * For example:
 *
 * qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a
 * letter that repeats with exactly one letter between them (zxz).
 *
 * xxyxx is nice because it has a pair that appears twice and a letter that
 * repeats with one between, even though the letters used by each rule overlap.
 *
 * uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a
 * single letter between them.
 *
 * ieodomkazucvgmuy is naughty because it has a repeating letter with one
 * between (odo), but no pair that appears twice.
 *
 * How many strings are nice under these new rules?
 */

export function part2(input) {
  return totalNice(input, [
    // One letter between repeated letters
    (str) => (/(\w)\w\1/).test(str),
    // Have two repeating
    (str) => (/(\w{2}).*\1/).test(str),
  ]);
}

export let part2Examples = [
  { input: 'qjhvhtzxzqqjkmpb', value: 1 },
  { input: 'xxyxx', value: 1 },
  { input: 'uurcxstgmygtbstg', value: 0 },
  { input: 'ieodomkazucvgmuy', value: 0 },
];

export let part2Answer = 69;
