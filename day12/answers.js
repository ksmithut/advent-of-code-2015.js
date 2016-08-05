'use strict'

exports.part1 = {
  answer: 111754,
  examples: [
    { input: '[1,2,3]', value: 6 },
    { input: '{"a":2,"b":4}', value: 6 },
    { input: '[[[3]]]', value: 3 },
    { input: '{"a":{"b":4},"c":-1}', value: 3 },
    { input: '{"a":[-1,1]}', value: 0 },
    { input: '[-1,{"a":1}]', value: 0 },
    { input: '[]', value: 0 },
    { input: '{}', value: 0 },
  ]
}

exports.part2 = {
  answer: 65402,
  examples: [
    { input: '[1,2,3]', value: 6 },
    { input: '[1,{"c":"red","b":2},3]', value: 4 },
    { input: '{"d":"red","e":[1,2,3,4],"f":5}', value: 0 },
    { input: '[1,"red",5]', value: 6 },
  ]
}
