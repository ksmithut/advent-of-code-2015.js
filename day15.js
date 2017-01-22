'use strict'

// Part 1
// ======

const PARSE_REGEX = /^(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/ // eslint-disable-line max-len
const parseLine = (line) => {
  const [ ,
    name,
    capacity,
    durability,
    flavor,
    texture,
    calories,
  ] = line.match(PARSE_REGEX)
  return {
    name,
    capacity: parseInt(capacity, 10),
    durability: parseInt(durability, 10),
    flavor: parseInt(flavor, 10),
    texture: parseInt(texture, 10),
    calories: parseInt(calories, 10),
  }
}

const sortBy = (key) => (a, b) => b[key] - a[key]
const POINT_PROPS = [ 'capacity', 'durability', 'flavor', 'texture' ]
const STATS_PROPS = [ ...POINT_PROPS, 'calories' ]

const permute = (length, total) => {
  if (length <= 1) return [[ total ]]
  const combos = []
  for (let i = 0; i < total; i++) {
    const prefix = [ i ]
    permute(length - 1, total - i).forEach((combo) => {
      combos.push(prefix.concat(combo))
    })
  }
  return combos
}

const cookieScore = (ingredients, combo) => {
  const cookie = ingredients.reduce((combined, ingredient, i) => {
    const amount = combo[i]
    STATS_PROPS.forEach((prop) => {
      combined[prop] = (combined[prop] || 0) + (ingredient[prop] * amount)
    })
    return combined
  }, {})
  const points = POINT_PROPS.reduce((product, prop) => {
    return product * Math.max(cookie[prop], 0)
  }, 1)
  return {
    points,
    calories: cookie.calories,
  }
}

const getCookies = (input, units) => {
  const ingredients = input.split('\n').map(parseLine)
  return permute(ingredients.length, units)
    .map((combo) => cookieScore(ingredients, combo))
}

function part1(input) {
  return getCookies(input, 100)
    .sort(sortBy('points'))[0].points
}

// Part 2
// ======

function part2(input) {
  return getCookies(input, 100)
    .filter((cookie) => cookie.calories === 500)
    .sort(sortBy('points'))[0].points
}

module.exports = { part1, part2 }
