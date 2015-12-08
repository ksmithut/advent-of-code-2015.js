'use strict';

import path from 'path';
import Promise from 'bluebird';
import inquirer from 'inquirer';
import glob from 'glob';
import fs from 'fs';

Promise.promisifyAll(fs);

const DAY_REGEX = new RegExp(`^${__dirname}${path.sep}(.*)${path.sep}index.js$`);

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
    if (dayModule.part1) {
      console.log('part1:', dayModule.part1(input));
    }
    if (dayModule.part2) {
      console.log('part2:', dayModule.part2(input));
    }
  });
