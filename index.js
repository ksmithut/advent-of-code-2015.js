'use strict';

import path from 'path';
import Promise from 'bluebird';
import inquirer from 'inquirer';
import glob from 'glob';
import fs from 'fs';
import chalk from 'chalk';

Promise.promisifyAll(fs);

const DAY_REGEX = new RegExp(`^${__dirname}${path.sep}(.*)${path.sep}index.js$`);
const RIGHT = chalk.green('✓');
const WRONG = chalk.red('✗');
const NOT_CHECKED = chalk.cyan('-');

const DAYS = glob
  .sync(path.join(__dirname, '*', 'index.js'))
  .map((filepath) => filepath.replace(DAY_REGEX, '$1'))
  .reverse();

const ask = new Promise((resolve) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'day',
      message: 'Which day would you like to run?',
      choices: DAYS,
    },
  ], resolve);
});

ask
  .then(({ day }) => {
    return Promise.all([
      fs.readFileAsync(path.join(__dirname, day, 'input.txt'), 'utf8'),
      require(`./${day}`),
    ]);
  })
  .then(([ input, dayModule ]) => {
    console.log();
    console.log('Part 1:\n-------');
    runPart(dayModule.part1, input, dayModule.part1Answer, dayModule.part1Examples);
    console.log('Part 2:\n-------');
    runPart(dayModule.part2, input, dayModule.part2Answer, dayModule.part2Examples);
  });

function runPart(method, mainInput, answer, examples = []) {
  if (!method) { return console.log('Not Implemented'); }

  examples.forEach(({ input, value }) => {
    let output = method(input);

    if (method(input) === value) {
      console.log(` ${RIGHT} ${input} === ${value}`);
    } else {
      console.log(` ${WRONG} expected ${value}, given ${output}`);
    }
  });

  let output = method(mainInput);
  let consoleOutput = `\nanswer: ${output} `;

  if (typeof answer === 'undefined') {
    consoleOutput += NOT_CHECKED;
  } else {
    consoleOutput += output === answer ? RIGHT : WRONG;
  }

  console.log(consoleOutput);
  console.log();
}
