'use strict'

/**
 * --- Day 23: Opening the Turing Lock ---
 *
 * Little Jane Marie just got her very first computer for Christmas from some
 * <span title="Definitely not Wintermute.">unknown benefactor</span>. It comes
 * with instructions and an example program, but the computer itself seems to
 * be malfunctioning. She's curious what the program does, and would like you
 * to help her run it.
 *
 * The manual explains that the computer supports two
 * [registers](https://en.wikipedia.org/wiki/Processor_register) and six
 * [instructions](https://en.wikipedia.org/wiki/Instruction_set) (truly, it
 * goes on to remind the reader, a state-of-the-art technology). The registers
 * are named `a` and `b`, can hold any [non-negative
 * integer](https://en.wikipedia.org/wiki/Natural_number), and begin with a
 * value of `0`. The instructions are as follows:
 *
 * - `hlf r` sets register `r` to half its current value, then continues with
 *   the next instruction.
 * - `tpl r` sets register `r` to triple its current value, then continues with
 *   the next instruction.
 * - `inc r` increments register `r`, adding `1` to it, then continues with the
 *   next instruction.
 * - `jmp offset` is a jump; it continues with the instruction `offset` away
 *   relative to itself.
 * - `jie r, offset` is like `jmp`, but only jumps if register `r` is even
 *   ("jump if even").
 * - `jio r, offset` is like `jmp`, but only jumps if register `r` is `1`
 *   ("jump if one", not odd).
 *
 * All three jump instructions work with an offset relative to that
 * instruction. The offset is always written with a prefix `+` or `-` to
 * indicate the direction of the jump (forward or backward, respectively). For
 * example, `jmp +1` would simply continue with the next instruction, while
 * `jmp +0` would continuously jump back to itself forever.
 *
 * The program exits when it tries to run an instruction beyond the ones
 * defined.
 *
 * For example, this program sets `a` to `2`, because the `jio` instruction
 * causes it to skip the `tpl` instruction:
 *
 *     inc a
 *     jio a, +2
 *     tpl a
 *     inc a
 *
 * What is the value in register `b` when the program in your puzzle input is
 * finished executing?
 */

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

function part1(input) {
  const program = input.split('\n').map(parseLine)
  const registers = { a: 0, b: 0 }
  for (let i = 0; i < program.length;) {
    const command = program[i]
    i = RUN[command.command](command, registers, i)
  }
  return registers.b
}

/**
 * --- Part Two ---
 *
 * The unknown benefactor is very thankful for releasi-- er, helping little
 * Jane Marie with her computer. Definitely not to distract you, what is the
 * value in register `b` after the program is finished executing if register
 * `a` starts as `1` instead?
 */

function part2(input) {
  const program = input.split('\n').map(parseLine)
  const registers = { a: 1, b: 0 }
  for (let i = 0; i < program.length;) {
    const command = program[i]
    i = RUN[command.command](command, registers, i)
  }
  return registers.b
}

module.exports = { part1, part2 }
