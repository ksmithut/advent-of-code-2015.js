'use strict';

const RACE_DURATION = 2503;

const PARSE_LINE = /^(\w*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds\.$/;

function parseLine(line) {
  let [ , name, speed, duration, rest ] = line.match(PARSE_LINE);

  return {
    name,
    speed: parseInt(speed, 10),
    duration: parseInt(duration, 10),
    rest: parseInt(rest, 10),
  };
}

/**
 * --- Day 14: Reindeer Olympics ---
 *
 * This year is the Reindeer Olympics! Reindeer can fly at high speeds, but must
 * rest occasionally to recover their energy. Santa would like to know which of
 * his reindeer is fastest, and so he has them race.
 *
 * Reindeer can only either be flying (always at their top speed) or resting
 * (not moving at all), and always spend whole seconds in either state.
 *
 * For example, suppose you have the following Reindeer:
 *
 * Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
 *
 * Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
 *
 * After one second, Comet has gone 14 km, while Dancer has gone 16 km. After
 * ten seconds, Comet has gone 140 km, while Dancer has gone 160 km. On the
 * eleventh second, Comet begins resting (staying at 140 km), and Dancer
 * continues on for a total distance of 176 km. On the 12th second, both
 * reindeer are resting. They continue to rest until the 138th second, when
 * Comet flies for another ten seconds. On the 174th second, Dancer flies for
 * another 11 seconds.
 *
 * In this example, after the 1000th second, both reindeer are resting, and
 * Comet is in the lead at 1120 km (poor Dancer has only gotten 1056 km by that
 * point). So, in this situation, Comet would win (if the race ended at 1000
 * seconds).
 *
 * Given the descriptions of each reindeer (in your puzzle input), after exactly
 * 2503 seconds, what distance has the winning reindeer traveled?
 */

function race(raceDuration, { speed, duration, rest }) {
  let i = 0;
  let distance = 0;
  let flyDistance = 0;
  let restDistance = 0;
  let isFlying = true;
  let distances = [];

  while (i++ < raceDuration) {
    if (flyDistance >= duration) {
      isFlying = false;
      flyDistance = 0;
    } else if (restDistance >= rest) {
      isFlying = true;
      restDistance = 0;
    }

    if (isFlying) {
      distance += speed;
      flyDistance++;
    } else {
      restDistance++;
    }

    distances.push(distance);
  }

  return distances;
}

export function part1(input) {

  return input.split('\n').reduce((highest, line) => {
    let distance = race(RACE_DURATION, parseLine(line)).pop();

    if (highest === null || distance > highest) { return distance; }
    return highest;
  }, null);

}

/**
 * --- Part Two ---
 *
 * Seeing how reindeer move in bursts, Santa decides he's not pleased with the
 * old scoring system.
 *
 * Instead, at the end of each second, he awards one point to the reindeer
 * currently in the lead. (If there are multiple reindeer tied for the lead,
 * they each get one point.) He keeps the traditional 2503 second time limit, of
 * course, as doing otherwise would be entirely ridiculous.
 *
 * Given the example reindeer from above, after the first second, Dancer is in
 * the lead and gets one point. He stays in the lead until several seconds into
 * Comet's second burst: after the 140th second, Comet pulls into the lead and
 * gets his first point. Of course, since Dancer had been in the lead for the
 * 139 seconds before that, he has accumulated 139 points by the 140th second.
 *
 * After the 1000th second, Dancer has accumulated 689 points, while poor Comet,
 * our old champion, only has 312. So, with the new scoring system, Dancer would
 * win (if the race ended at 1000 seconds).
 *
 * Again given the descriptions of each reindeer (in your puzzle input), after
 * exactly 2503 seconds, how many points does the winning reindeer have?
 */

export function part2(input) {
  let reindeer = input.split('\n').reduce((deer, line) => {
    let singleDeer = parseLine(line);

    singleDeer.points = 0;

    singleDeer.race = race(RACE_DURATION, singleDeer);

    deer.push(singleDeer);
    return deer;
  }, []);

  new Array(RACE_DURATION).fill(null).forEach((val, second) => {
    if (second === 0) { return; } // Skip the zeroeth second

    let highest = reindeer.reduce((lead, singleDeer, i) => {
      let distance = singleDeer.race[second];

      if (lead === null || distance > lead.distance) {
        return { pos: [ i ], distance };
      }
      if (distance === lead.distance) { lead.pos.push(i); }
      return lead;
    }, null);

    highest.pos.forEach((i) => {
      reindeer[i].points++;
    });
  });

  return reindeer.reduce((highest, { points }) => {
    if (highest === null || points > highest) { return points; }
    return highest;
  }, null);
}
