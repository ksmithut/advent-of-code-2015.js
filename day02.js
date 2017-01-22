'use strict'

// Part 1
// ======

const parseLine = (line) => {
  const [ , width, height, length ] = line.match(/(\d+)x(\d+)x(\d+)/)
  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
    length: parseInt(length, 10),
  }
}

const sum = (arr) => arr.reduce((total, num) => total + num)
const sortNums = (arr) => arr.slice().sort((a, b) => a - b)

function part1(input) {
  return input.split('\n').reduce((total, line) => {
    const { width, height, length } = parseLine(line)
    const sides = [
      width * height,
      height * length,
      length * width,
    ]
    const surfaceArea = sum(sides) * 2
    const extraPaper = sortNums(sides)[0]
    return total + surfaceArea + extraPaper
  }, 0)
}

// Part 2
// ======

const product = (arr) => arr.reduce((total, num) => total * num)

function part2(input) {
  return input.split('\n').reduce((total, line) => {
    const { width, height, length } = parseLine(line)
    const dimensions = [ width, height, length ]
    const smallestSides = sortNums(dimensions).slice(0, 2)
    const smallestPerimeter = sum(smallestSides) * 2
    const volume = product(dimensions)
    return total + smallestPerimeter + volume
  }, 0)
}

module.exports = { part1, part2 }
