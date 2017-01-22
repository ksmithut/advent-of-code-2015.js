'use strict'

// Part 1
// ======

const PARSE_REGEX = /^(\w+) .* (\d+) km\/s .* (\d+) seconds, .* (\d+) seconds.$/
const parseLine = (line) => {
  const [ , name, speed, duration, rest ] = line.match(PARSE_REGEX)
  return {
    name,
    speed: parseInt(speed, 10),
    duration: parseInt(duration, 10),
    rest: parseInt(rest, 10),
  }
}

class Racer {
  constructor({ name, speed, duration, rest }) {
    this.name = name
    this.speed = speed
    this.duration = duration
    this.rest = rest
    this.distance = 0
    this.speedCountdown = this.duration
    this.restCountdown = 0
    this.points = 0
  }
  tick() {
    if (this.speedCountdown > 0) {
      this.speedCountdown--
      this.distance += this.speed
      if (this.speedCountdown <= 0) this.restCountdown = this.rest
    }
    else {
      this.restCountdown--
      if (this.restCountdown <= 0) this.speedCountdown = this.duration
    }
  }
}

const getLeads = (reindeer) => {
  return reindeer.reduce((leads, curr) => {
    if (!leads.length) return [ curr ]
    if (curr.distance > leads[0].distance) return [ curr ]
    if (curr.distance === leads[0].distance) return leads.concat(curr)
    return leads
  }, [])
}

const race = (input, duration) => {
  const reindeer = input.split('\n').map((line) => {
    return new Racer(parseLine(line))
  })
  for (let i = 0; i < duration; i++) {
    reindeer.forEach((deer) => deer.tick())
    getLeads(reindeer).forEach((deer) => deer.points++)
  }
  return reindeer
}

function part1(input) {
  return getLeads(race(input, 2503))[0].distance
}

// Part 2
// ======

function part2(input) {
  return race(input, 2503).reduce((winner, curr) => {
    return winner.points > curr.points ? winner : curr
  }).points
}

module.exports = { part1, part2 }
