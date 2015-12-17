'use strict';

/**
 * --- Day 11: Corporate Policy ---
 *
 * Santa's previous password expired, and he needs help choosing a new one.
 *
 * To help him remember his new password after the old one expires, Santa has
 * devised a method of coming up with a password based on the previous one.
 * Corporate policy dictates that passwords must be exactly eight lowercase
 * letters (for security reasons), so he finds his new password by incrementing
 * his old password string repeatedly until it is valid.
 *
 * Incrementing is just like counting with numbers: xx, xy, xz, ya, yb, and so
 * on. Increase the rightmost letter one step; if it was z, it wraps around to
 * a, and repeat with the next letter to the left until one doesn't wrap around.
 *
 * Unfortunately for Santa, a new Security-Elf recently started, and he has
 * imposed some additional password requirements:
 *
 * Passwords must include one increasing straight of at least three letters,
 * like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd
 * doesn't count.
 *
 * Passwords may not contain the letters i, o, or l, as these letters can be
 * mistaken for other characters and are therefore confusing.
 *
 * Passwords must contain at least two different, non-overlapping pairs of
 * letters, like aa, bb, or zz.
 *
 * For example:
 *
 * hijklmmn meets the first requirement (because it contains the straight hij)
 * but fails the second requirement requirement (because it contains i and l).
 *
 * abbceffg meets the third requirement (because it repeats bb and ff) but fails
 * the first requirement.
 *
 * abbcegjk fails the third requirement, because it only has one double letter
 * (bb).
 *
 * The next password after abcdefgh is abcdffaa.
 *
 * The next password after ghijklmn is ghjaabcc, because you eventually skip all
 * the passwords that start with ghi..., since i is not allowed.
 *
 * Given Santa's current password (your puzzle input), what should his next
 * password be?
 */

const PAIR_OF_LETTERS = /(\w)\1/g;
const INVALID_LETTERS = /(i|o|l)/;

function charCode(char) {
  return char.charCodeAt(0);
}

function hasStraight(str, length) {
  let straightLength = 1;

  for (let i = 1, len = str.length; i < len; i++) {
    if (charCode(str[i]) === charCode(str[i - 1]) + 1) {
      straightLength++;
    } else {
      straightLength = 1;
    }
    if (straightLength >= length) { return true; }
  }

  return false;
}

function hasTwoDifferentPairs(str) {
  let combos = str.match(PAIR_OF_LETTERS) || [];

  let uniqueCombos = combos.filter((combo, i, arr) => arr.indexOf(combo) === i);

  return uniqueCombos.length >= 2;
}

function incrementChar(char) {
  return String.fromCharCode(charCode(char) + 1);
}

function replaceAt(str, index, char) {
  return str.substr(0, index) + char + str.substr(index + char.length);
}

function incrementStr(str) {
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] !== 'z') {
      str = replaceAt(str, i, incrementChar(str[i]));
      break;
    }
    str = replaceAt(str, i, 'a');
  }
  return str;
}

export function part1(input) {
  let invalidPassword = true;
  let nextPassword = input;

  while (invalidPassword && nextPassword.length === 8) {
    nextPassword = incrementStr(nextPassword);

    if (INVALID_LETTERS.test(nextPassword)) { continue; }
    if (!hasTwoDifferentPairs(nextPassword)) { continue; }
    if (!hasStraight(nextPassword, 3)) { continue; }

    invalidPassword = false;
  }

  return nextPassword;
}

export let part1Answer = 'hxbxxyzz';

/**
 * --- Part Two ---
 *
 * Santa's password expired again. What's the next one?
 */

export function part2(input) {
  return part1(part1(input));
}

export let part2Answer = 'hxcaabcc';
