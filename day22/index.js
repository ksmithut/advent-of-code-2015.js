'use strict';

/**
 * --- Day 22: Wizard Simulator 20XX ---
 *
 * Little Henry Case decides that defeating bosses with swords and stuff is
 * boring. Now he's playing the game with a wizard. Of course, he gets stuck on
 * another boss and needs your help again.
 *
 * In this version, combat still proceeds with the player and the boss taking
 * alternating turns. The player still goes first. Now, however, you don't get
 * any equipment; instead, you must choose one of your spells to cast. The first
 * character at or below 0 hit points loses.
 *
 * Since you're a wizard, you don't get to wear armor, and you can't attack
 * normally. However, since you do magic damage, your opponent's armor is
 * ignored, and so the boss effectively has zero armor as well. As before, if
 * armor (from a spell, in this case) would reduce damage below 1, it becomes 1
 * instead - that is, the boss' attacks always deal at least 1 damage.
 *
 * On each of your turns, you must select one of your spells to cast. If you
 * cannot afford to cast any spell, you lose. Spells cost mana; you start with
 * 500 mana, but have no maximum limit. You must have enough mana to cast a
 * spell, and its cost is immediately deducted when you cast it. Your spells are
 * Magic Missile, Drain, Shield, Poison, and Recharge.
 *
 * Magic Missile costs 53 mana. It instantly does 4 damage.
 *
 * Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit
 * points.
 *
 * Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it
 * is active, your armor is increased by 7.
 *
 * Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the
 * start of each turn while it is active, it deals the boss 3 damage.
 *
 * Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the
 * start of each turn while it is active, it gives you 101 new mana.
 *
 * Effects all work the same way. Effects apply at the start of both the
 * player's turns and the boss' turns. Effects are created with a timer (the
 * number of turns they last); at the start of each turn, after they apply any
 * effect they have, their timer is decreased by one. If this decreases the
 * timer to zero, the effect ends. You cannot cast a spell that would start an
 * effect which is already active. However, effects can be started on the same
 * turn they end.
 *
 * For example, suppose the player has 10 hit points and 250 mana, and that the
 * boss has 13 hit points and 8 damage:
 *
 * -- Player turn --
 * - Player has 10 hit points, 0 armor, 250 mana
 * - Boss has 13 hit points
 * Player casts Poison.
 *
 * -- Boss turn --
 * - Player has 10 hit points, 0 armor, 77 mana
 * - Boss has 13 hit points
 * Poison deals 3 damage; its timer is now 5.
 * Boss attacks for 8 damage.
 *
 * -- Player turn --
 * - Player has 2 hit points, 0 armor, 77 mana
 * - Boss has 10 hit points
 * Poison deals 3 damage; its timer is now 4.
 * Player casts Magic Missile, dealing 4 damage.
 *
 * -- Boss turn --
 * - Player has 2 hit points, 0 armor, 24 mana
 * - Boss has 3 hit points
 * Poison deals 3 damage. This kills the boss, and the player wins.
 *
 *
 * Now, suppose the same initial conditions, except that the boss has 14 hit
 * points instead:
 *
 * -- Player turn --
 * - Player has 10 hit points, 0 armor, 250 mana
 * - Boss has 14 hit points
 * Player casts Recharge.
 *
 * -- Boss turn --
 * - Player has 10 hit points, 0 armor, 21 mana
 * - Boss has 14 hit points
 * Recharge provides 101 mana; its timer is now 4.
 * Boss attacks for 8 damage!
 *
 * -- Player turn --
 * - Player has 2 hit points, 0 armor, 122 mana
 * - Boss has 14 hit points
 * Recharge provides 101 mana; its timer is now 3.
 * Player casts Shield, increasing armor by 7.
 *
 * -- Boss turn --
 * - Player has 2 hit points, 7 armor, 110 mana
 * - Boss has 14 hit points
 * Shield's timer is now 5.
 * Recharge provides 101 mana; its timer is now 2.
 * Boss attacks for 8 - 7 = 1 damage!
 *
 * -- Player turn --
 * - Player has 1 hit point, 7 armor, 211 mana
 * - Boss has 14 hit points
 * Shield's timer is now 4.
 * Recharge provides 101 mana; its timer is now 1.
 * Player casts Drain, dealing 2 damage, and healing 2 hit points.
 *
 * -- Boss turn --
 * - Player has 3 hit points, 7 armor, 239 mana
 * - Boss has 12 hit points
 * Shield's timer is now 3.
 * Recharge provides 101 mana; its timer is now 0.
 * Recharge wears off.
 * Boss attacks for 8 - 7 = 1 damage!
 *
 * -- Player turn --
 * - Player has 2 hit points, 7 armor, 340 mana
 * - Boss has 12 hit points
 * Shield's timer is now 2.
 * Player casts Poison.
 *
 * -- Boss turn --
 * - Player has 2 hit points, 7 armor, 167 mana
 * - Boss has 12 hit points
 * Shield's timer is now 1.
 * Poison deals 3 damage; its timer is now 5.
 * Boss attacks for 8 - 7 = 1 damage!
 *
 * -- Player turn --
 * - Player has 1 hit point, 7 armor, 167 mana
 * - Boss has 9 hit points
 * Shield's timer is now 0.
 * Shield wears off, decreasing armor by 7.
 * Poison deals 3 damage; its timer is now 4.
 * Player casts Magic Missile, dealing 4 damage.
 *
 * -- Boss turn --
 * - Player has 1 hit point, 0 armor, 114 mana
 * - Boss has 2 hit points
 * Poison deals 3 damage. This kills the boss, and the player wins.
 *
 *
 * You start with 50 hit points and 500 mana points. The boss's actual stats are
 * in your puzzle input. What is the least amount of mana you can spend and
 * still win the fight? (Do not include mana recharge effects as "spending"
 * negative mana.)
 */

const PARSE_MAP = {
  'Hit Points': 'hitPoints',
  'Damage': 'damage',
};

function parseStats(input) {
  return input.split('\n').reduce((stats, line) => {
    let [ stat, value ] = line.split(': ');

    stats[PARSE_MAP[stat]] = parseInt(value, 10);
    return stats;
  }, {});
}

// function memoize(fn) {
//   let cache = {};
//
//   return function(...args) {
//     let key = JSON.stringify(args);
//
//     cache[key] = cache[key] || { value: fn(...args) };
//
//     return cache[key].value;
//   };
// }

function copy(obj) { return JSON.parse(JSON.stringify(obj)); }

const DEFAULT_SPELL = {
  damage: 0,
  armor: 0,
  heal: 0,
  mana: 0,
  duration: null,
};

const SPELLS = [
  { name: 'Magic Missle', cost: 53, damage: 4 },
  { name: 'Drain', cost: 73, damage: 2, heal: 2 },
  { name: 'Shield', cost: 113, armor: 7, duration: 6 },
  { name: 'Poison', cost: 173, damage: 3, duration: 6 },
  { name: 'Recharge', cost: 229, mana: 101, duration: 5 },
].map((spell) => Object.assign({}, DEFAULT_SPELL, spell));

function applySpells(boss, player, activeSpells) {

  player.armor = 0;

  return Object.keys(activeSpells).reduce((newSpells, spellId) => {
    let spell = copy(activeSpells[spellId]);

    player.health += spell.heal;
    player.mana += spell.mana;
    player.armor += spell.armor;
    boss.health -= spell.damage;

    if (--spell.duration > 0) { newSpells[spellId] = spell; }

    return newSpells;
  }, {});
}

function round(boss, player, activeSpells = {}) {
  let solutions = [];

  boss = copy(boss);
  player = player(player);

  // ===========
  // Player Turn
  // ===========

  // Apply spell effects
  //   - Decrease timer
  //   - Wear off
  activeSpells = applySpells(boss, player, activeSpells);

  // Select Spell to cast
  //   - You cannot select a spell that is already in effect
  //   - If you can't afford one, then you lose
  let possibleSpells = SPELLS
    .filter(({ cost, name }) => !activeSpells[name] && cost <= player.mana);

  // If you can't afford a spell, you lose
  if (possibleSpells.length === 0) { return false; }

  // If the boss dies, then you win :) solution found
  if (boss.health <= 0) { return true; }

  possibleSpells.forEach((spell) => {

    // Cast a spell
    if (spell.duration) {
      activeSpells[spell.name] = copy(spell);
    }

    // =========
    // Boss Turn
    // =========

    // Apply spell effects
    //   - Decrease timer
    //   - Wear off

    // Boss attacks
    //   - Apply armor

  });

}


export function part1(input, player = { health: 50, mana: 100 }) {
  let boss = parseStats(input);

  let outcomes = round(boss, player);

}