'use strict'

// Part 1
// ======

const parseLine = (line) => {
  const [ , command, data ] = line.match(/(\w+) (.+)/)
  let offset, register
  if (command === 'jmp') {
    offset = parseInt(data, 10)
    register = null
  }
  else if (command.startsWith('ji')) {
    const [ , subRegister, subOffset ] = data.match(/(\w+), (.+)/)
    register = subRegister
    offset = parseInt(subOffset, 10)
  }
  else {
    offset = null
    register = data
  }
  return { command, register, offset }
}

const isEven = (num) => !(num % 2)

const RUN = {
  hlf: (command, registers, i) => {
    registers[command.register] /= 2
    return i + 1
  },
  tpl: (command, registers, i) => {
    registers[command.register] *= 3
    return i + 1
  },
  inc: (command, registers, i) => {
    registers[command.register]++
    return i + 1
  },
  jmp: (command, registers, i) => {
    return i + command.offset
  },
  jie: (command, registers, i) => {
    const offset = isEven(registers[command.register]) ? command.offset : 1
    return i + offset
  },
  jio: (command, registers, i) => {
    const offset = registers[command.register] === 1 ? command.offset : 1
    return i + offset
  },
}

function runProgram(input, registers) {
  const program = input.split('\n').map(parseLine)
  for (let i = 0; i < program.length;) {
    const command = program[i]
    i = RUN[command.command](command, registers, i)
  }
  return registers
}

function part1(input) {
  const registers = runProgram(input, {
    a: 0,
    b: 0,
  })
  return registers.b
}

// Part 2
// ======

function part2(input) {
  const registers = runProgram(input, {
    a: 1,
    b: 0,
  })
  return registers.b
}

module.exports = { part1, part2 }
