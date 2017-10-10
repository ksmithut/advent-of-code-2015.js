'use strict'

// Part 1
// ======

const EMPTY_SLOT = { cost: 0, damage: 0, armor: 0 }
const ITEMS = {
  weapons: [
    { cost: 8, damage: 4, armor: 0 },
    { cost: 10, damage: 5, armor: 0 },
    { cost: 25, damage: 6, armor: 0 },
    { cost: 40, damage: 7, armor: 0 },
    { cost: 74, damage: 8, armor: 0 }
  ],
  armor: [
    EMPTY_SLOT,
    { cost: 13, damage: 0, armor: 1 },
    { cost: 31, damage: 0, armor: 2 },
    { cost: 53, damage: 0, armor: 3 },
    { cost: 75, damage: 0, armor: 4 },
    { cost: 102, damage: 0, armor: 5 }
  ],
  rings: [
    EMPTY_SLOT,
    EMPTY_SLOT,
    { cost: 25, damage: 1, armor: 0 },
    { cost: 50, damage: 2, armor: 0 },
    { cost: 100, damage: 3, armor: 0 },
    { cost: 20, damage: 0, armor: 1 },
    { cost: 40, damage: 0, armor: 2 },
    { cost: 80, damage: 0, armor: 3 }
  ]
}

const getPermutations = (arr, min = 0, max = Infinity) => {
  const permutations = []
  if (max < 0) return permutations
  if (min === 0) permutations.push([])
  arr.forEach((elem, i) => {
    const subMin = Math.max(min - 1, 0)
    const subArr = arr.slice(0)
    subArr.splice(i)
    getPermutations(subArr, subMin, max - 1).forEach(permutation => {
      permutations.push([elem, ...permutation])
    })
  })
  return permutations
}

const possibleCombos = items => {
  const mainPermutation = items.slice(0)[0]
  const subPermutations = items.slice(1)
  if (!subPermutations.length) return mainPermutation

  const subCombos = possibleCombos(subPermutations)
  return mainPermutation.reduce((combos, permutation) => {
    subCombos.forEach(subPermutation => {
      combos.push(permutation.concat(subPermutation))
    })
    return combos
  }, [])
}

const possiblePlayers = hp => {
  const playerTemplate = { hp, damage: 0, armor: 0, cost: 0 }
  const items = [
    getPermutations(ITEMS.weapons, 1, 1),
    getPermutations(ITEMS.armor, 0, 1),
    getPermutations(ITEMS.rings, 0, 2)
  ]
  return possibleCombos(items).map(itemsCombo => {
    return itemsCombo.reduce((player, item) => {
      player.damage += item.damage
      player.armor += item.armor
      player.cost += item.cost
      return player
    }, Object.assign({ items: itemsCombo }, playerTemplate))
  })
}

const roundsToWin = (attacker, defender) => {
  const damagePerTurn = Math.max(attacker.damage - defender.armor, 1)
  return Math.ceil(defender.hp / damagePerTurn)
}

const canWin = (player, boss) => {
  return roundsToWin(player, boss) <= roundsToWin(boss, player)
}

const getBossStats = input => {
  const [hp, damage, armor] = input
    .split('\n')
    .map(line => line.replace(/[^\d]*/g, ''))
    .map(Number)
  return { hp, damage, armor }
}

const sortByCost = (a, b) => a.cost - b.cost
const descending = sort => (a, b) => sort(b, a)

function part1 (input) {
  const PLAYER_HEALTH = 100
  const boss = getBossStats(input)
  return possiblePlayers(PLAYER_HEALTH)
    .filter(player => canWin(player, boss))
    .sort(sortByCost)[0].cost
}

// Part 2
// ======

function part2 (input) {
  const PLAYER_HEALTH = 100
  const boss = getBossStats(input)
  return possiblePlayers(PLAYER_HEALTH)
    .filter(player => !canWin(player, boss))
    .sort(descending(sortByCost))[0].cost
}

module.exports = { part1, part2 }
