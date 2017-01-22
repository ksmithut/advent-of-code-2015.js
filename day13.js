'use strict'

// Part 1
// ======

const LINE_REGEX = /^(\w+) .* (lose|gain) (\d+) .* (\w+).$/
const parseLine = (line) => {
  const [ , name, modifier, amount, neighbor ] = line.match(LINE_REGEX)
  const parsedAmount = parseInt(amount, 10)
  return {
    name,
    amount: modifier === 'lose' ? -parsedAmount : parsedAmount,
    neighbor,
  }
}

const permute = (items) => {
  if (items.length === 1) return [ items ]
  return items.reduce((combos, item, i) => {
    const prefix = [ item ]
    const subItems = items.slice()
    subItems.splice(i, 1)
    return combos.concat(permute(subItems).map((combo) => prefix.concat(combo)))
  }, [])
}

const getPreferences = (input) => {
  return input.split('\n').reduce((people, line) => {
    const { name, amount, neighbor } = parseLine(line)
    people[name] = people[name] || {}
    people[name][neighbor] = amount
    return people
  }, {})
}

const sumHappiness = (combo, preferences) => {
  return combo.reduce((total, person, i, arr) => {
    const lastIndex = arr.length - 1
    const prev = i === 0
      ? arr[lastIndex]
      : arr[i - 1]
    const next = i === lastIndex
      ? arr[0]
      : arr[i + 1]
    return total + preferences[person][prev] + preferences[person][next]
  }, 0)
}

const optimalSeatingArrangement = (preferences) => {
  const combos = permute(Object.keys(preferences))
  return combos
    .map((combo) => sumHappiness(combo, preferences))
    .reduce((happiest, curr) => {
      return curr > happiest ? curr : happiest
    })
}

function part1(input) {
  const preferences = getPreferences(input)
  return optimalSeatingArrangement(preferences)
}

// Part 2
// ======

function part2(input) {
  const preferences = getPreferences(input)
  preferences.self = {}
  Object.keys(preferences).forEach((person) => {
    preferences[person].self = 0
    preferences.self[person] = 0
  })
  return optimalSeatingArrangement(preferences)
}

module.exports = { part1, part2 }
