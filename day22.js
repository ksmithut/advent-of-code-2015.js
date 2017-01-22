'use strict'

// Part 1
// ======

/**
 * @class Spell
 */
class Spell {
  constructor({ cost = 0, damage = 0, heal = 0, armor = 0, recharge = 0, duration = 0 } = {}) { // eslint-disable-line max-len
    this.cost = cost
    this.damage = damage
    this.heal = heal
    this.armor = armor
    this.recharge = recharge
    this.duration = duration
  }
  start(source) {
    if (this.cost) source.mana -= this.cost
    if (this.armor) source.armor += this.armor
  }
  run(source, target) {
    if (this.damage) target.hp -= Math.max(this.damage - target.armor, 1)
    if (this.heal) source.hp += this.heal
    if (this.recharge) source.mana += this.recharge
  }
  end(source) {
    if (this.armor) source.armor -= this.armor
  }
}

/**
 * @class Player
 */
class Player {
  constructor({ hp = 0, mana = 0 } = {}) {
    this.hp = hp
    this.mana = mana
    this.armor = 0
  }
  copy() {
    return new Player(this)
  }
  isDead() {
    return this.hp <= 0
  }
  canCast(spell) {
    return this.mana >= spell.cost
  }
}

/**
 * @class ActiveSpell
 */
class ActiveSpell {
  constructor({ spell, source, target, isCopy = false } = {}) {
    if (!(spell instanceof Spell)) throw new TypeError('spell not passed in')
    this.spell = spell
    this.source = source
    this.target = target
    this.duration = spell.duration

    if (!isCopy) {
      this.spell.start(this.source, this.target)
      if (this.isDone()) this.run()
    }
  }
  copy({ source, target }) {
    const activeSpell = new ActiveSpell({
      spell: this.spell,
      source,
      target,
      isCopy: true,
    })
    activeSpell.duration = this.duration
    return activeSpell
  }
  run() {
    this.spell.run(this.source, this.target)
    this.duration--
    if (this.isDone()) this.spell.end(this.source, this.target)
  }
  isDone() {
    return this.duration <= 0
  }
}

/**
 * @class Simulation
 */
class Simulation {
  constructor({ playerHp, playerMana, bossHp, bossDamage } = {}) {
    this.player = new Player({
      hp: playerHp,
      mana: playerMana,
    })
    this.player.isPlayer = true
    this.boss = new Player({ hp: bossHp })
    this.bossDamage = bossDamage
    this.bossSpell = new Spell({ mana: 0, damage: bossDamage })
    this.activeSpells = []
    this.spellHistory = []
  }
  copy() {
    const newSim = new Simulation({
      playerHp: this.player.hp,
      playerMana: this.player.mana,
      bossHp: this.boss.hp,
      bossDamage: this.bossDamage,
    })
    newSim.player.armor = this.player.armor
    newSim.activeSpells = this.activeSpells.map((spell) => {
      return spell.copy({
        source: newSim.player,
        target: newSim.boss,
      })
    })
    newSim.spellHistory = this.spellHistory.slice()
    return newSim
  }
  applySpells() {
    this.activeSpells = this.activeSpells.filter((spell) => {
      spell.run()
      return !spell.isDone()
    })
  }
  castSpell(spell, source, target) {
    const spellInstance = new ActiveSpell({ spell, source, target })
    if (!spellInstance.isDone()) this.activeSpells.push(spellInstance)
  }
  playerTurn(spell) {
    if (!this.player.isDead() && this.player.canCast(spell)) {
      this.castSpell(spell, this.player, this.boss)
      this.spellHistory.push(spell)
      return true
    }
    return false
  }
  bossTurn() {
    if (this.boss.isDead()) return
    this.castSpell(this.bossSpell, this.boss, this.player)
  }
  run(spell) {
    // this.stats('Player')
    this.applySpells()
    const didCast = this.playerTurn(spell)
    if (this.isDone()) return didCast
    // this.stats('Boss')
    this.applySpells()
    this.bossTurn()
    return didCast
  }
  stats(turn) {
    console.log(`\n-- ${turn} turn --`)
    console.log(`- Player has ${this.player.hp} hit points, ${this.player.armor} armor, ${this.player.mana} mana`)
    console.log(`- Boss has ${this.boss.hp} hit points`)
  }
  isDone() {
    return this.player.isDead() || this.boss.isDead()
  }
  didWin() {
    return this.boss.isDead()
  }
}

// Spell Definitions
// const SPELLS = {
//   MAGIC_MISSLE: new Spell({ cost: 53, damage: 4 }),
//   DRAIN: new Spell({ cost: 73, damage: 2, heal: 2 }),
//   SHIELD: new Spell({ cost: 113, duration: 6, armor: 7 }),
//   POISON: new Spell({ cost: 173, damage: 3, duration: 6 }),
//   RECHARGE: new Spell({ cost: 229, duration: 5, recharge: 101 }),
// }
const SPELLS = {
  RECHARGE: new Spell({ cost: 229, duration: 5, recharge: 101 }),
  POISON: new Spell({ cost: 173, damage: 3, duration: 6 }),
  SHIELD: new Spell({ cost: 113, duration: 6, armor: 7 }),
  MAGIC_MISSLE: new Spell({ cost: 53, damage: 4 }),
  DRAIN: new Spell({ cost: 73, damage: 2, heal: 2 }),
}
const SPELLS_ARRAY = Object.keys(SPELLS).map((name) => {
  const spell = SPELLS[name]
  spell.name = name
  return spell
})

const getWinningGames = (prevGame, depth = 0) => {
  if (depth > 12) return []
  if (prevGame.didWin()) return [ prevGame ]
  if (prevGame.isDone()) return []
  return SPELLS_ARRAY.reduce((winning, spell) => {
    const newGame = prevGame.copy()
    newGame.run(spell)
    getWinningGames(newGame, depth + 1).forEach((game) => {
      winning.push(game)
    })
    return winning
  }, [])
}

const parseInput = (input) => {
  const [ hp, damage ] = input.split('\n')
    .map((val) => val.replace(/[^\d]/g, ''))
    .map(Number)
  return { hp, damage }
}

function part1(input) {
  const playerHp = 50
  const playerMana = 500
  const { hp: bossHp, damage: bossDamage } = parseInput(input)
  const rootGame = new Simulation({ playerHp, playerMana, bossHp, bossDamage })
  return getWinningGames(rootGame)
    .map((game, i) => {
      return game.spellHistory.reduce((total, { cost }) => total + cost, 0)
    })
    .sort((a, b) => a - b)[0]
}

// Part 2
// ======

function part2(input) {
  return input
}

module.exports = { part1, part2 }
