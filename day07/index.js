'use strict';

const PARSE_GATE = /(\b[a-z0-9]*\b)? ?(AND|OR|LSHIFT|RSHIFT|NOT)? ?(\b[a-z0-9]*\b)? -> (\w*)$/;

const COMMANDS = {
  ASSIGN: (a) => a(),
  AND: (a, b) => a() & b(),
  OR: (a, b) => a() | b(),
  LSHIFT: (a, b) => a() << b(),
  RSHIFT: (a, b) => a() >> b(),
  NOT: (a, b) => ~b(),
};

function parseLine(line) {
  let [ , input1, command, input2, wireName ] = line.match(PARSE_GATE);

  return { input1, command, input2, wireName };
}

function normalize(input, wires) {
  let parsedInput = parseInt(input, 10);

  return isNaN(parsedInput) ? () => wires[input]() : () => parsedInput;
}

function once(fn) {
  let called = false;
  let value;

  return () => {
    if (!called) {
      called = true;
      value = fn();
    }
    return value;
  };
}

/**
 * --- Day 7: Some Assembly Required ---
 *
 * This year, Santa brought little Bobby Tables a set of wires and bitwise logic
 * gates! Unfortunately, little Bobby is a little under the recommended age
 * range, and he needs help assembling the circuit.
 *
 * Each wire has an identifier (some lowercase letters) and can carry a 16-bit
 * signal (a number from 0 to 65535). A signal is provided to each wire by a
 * gate, another wire, or some specific value. Each wire can only get a signal
 * from one source, but can provide its signal to multiple destinations. A gate
 * provides no signal until all of its inputs have a signal.
 *
 * The included instructions booklet describes how to connect the parts
 * together: x AND y -> z means to connect wires x and y to an AND gate, and
 * then connect its output to wire z.
 *
 * For example:
 *
 * 123 -> x means that the signal 123 is provided to wire x.
 *
 * x AND y -> z means that the bitwise AND of wire x and wire y is provided to
 * wire z.
 *
 * p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and
 * then provided to wire q.
 *
 * NOT e -> f means that the bitwise complement of the value from wire e is
 * provided to wire f.
 *
 * Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If,
 * for some reason, you'd like to emulate the circuit instead, almost all
 * programming languages (for example, C, JavaScript, or Python) provide
 * operators for these gates.
 *
 *
 * For example, here is a simple circuit:
 *
 * 123 -> x
 * 456 -> y
 * x AND y -> d
 * x OR y -> e
 * x LSHIFT 2 -> f
 * y RSHIFT 2 -> g
 * NOT x -> h
 * NOT y -> i
 * After it is run, these are the signals on the wires:
 *
 * d: 72
 * e: 507
 * f: 492
 * g: 114
 * h: 65412
 * i: 65079
 * x: 123
 * y: 456
 *
 * In little Bobby's kit's instructions booklet (provided as your puzzle input),
 * what signal is ultimately provided to wire a?
 */

export function part1(input, wire = 'a') {

  const wires = {};

  input.split('\n').forEach((line) => {
    let { input1, command = 'ASSIGN', input2, wireName } = parseLine(line);

    input1 = normalize(input1, wires);
    input2 = normalize(input2, wires);

    wires[wireName] = once(() => COMMANDS[command](input1, input2));
  });

  return wires[wire]();
}

export let part1Examples = [
  {
    input: [
      [
        '123 -> x',
        '456 -> y',
        'x AND y -> d',
        'x OR y -> e',
        'x LSHIFT 2 -> f',
        'y RSHIFT 2 -> g',
        'NOT x -> h',
        'NOT y -> i',
      ].join('\n'),
      'g',
    ],
    value: 114,
  },
];

export let part1Answer = 956;

/**
 * --- Part Two ---
 *
 * Now, take the signal you got on wire a, override wire b to that signal, and
 * reset the other wires (including wire a). What new signal is ultimately
 * provided to wire a?
 */

export function part2(input, wire = 'a') {

  const wires = {};

  input.split('\n').forEach((line) => {
    let { input1, command = 'ASSIGN', input2, wireName } = parseLine(line);

    if (wireName === 'b') {
      input1 = part1(input);
    }

    input1 = normalize(input1, wires);
    input2 = normalize(input2, wires);

    wires[wireName] = once(() => COMMANDS[command](input1, input2));
  });

  return wires[wire]();
}

export let part2Examples = [

];

export let part2Answer = 40149;
