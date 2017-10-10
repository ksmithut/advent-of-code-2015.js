'use strict'

// Part 1
// ======

const parseLine = line => {
  const [, id, parts] = line.match(/Sue (\d+): (.*)$/)
  const items = parts.split(', ').map(part => {
    const [name, value] = part.split(': ')
    return { name, value: parseInt(value, 10) }
  })
  return { id, items }
}

const getAunts = input => input.split('\n').map(parseLine)

const isAunt = (description, aunt) => {
  return aunt.items.every(item => {
    return description[item.name](item.value)
  })
}

const findAunt = (input, definition) => {
  return getAunts(input).find(aunt => isAunt(definition, aunt))
}

function part1 (input) {
  return findAunt(input, {
    children: val => val === 3,
    cats: val => val === 7,
    samoyeds: val => val === 2,
    pomeranians: val => val === 3,
    akitas: val => val === 0,
    vizslas: val => val === 0,
    goldfish: val => val === 5,
    trees: val => val === 3,
    cars: val => val === 2,
    perfumes: val => val === 1
  }).id
}

// Part 2
// ======

function part2 (input) {
  return findAunt(input, {
    children: val => val === 3,
    cats: val => val > 7,
    samoyeds: val => val === 2,
    pomeranians: val => val < 3,
    akitas: val => val === 0,
    vizslas: val => val === 0,
    goldfish: val => val < 5,
    trees: val => val > 3,
    cars: val => val === 2,
    perfumes: val => val === 1
  }).id
}

module.exports = { part1, part2 }
