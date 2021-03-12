const fs = require('fs')
const path = require('path')
const random = require('lodash.random')

const MAX_POKEMONS = 880

function daysInMonth(month) {
  return new Date(new Date().getFullYear(), month, 0).getDate()
}

function generateMonthlyPokedex(month, yearlyPokemons) {
  const pokemons = {}
  for (let day = 1; day <= daysInMonth(month); day++) {
    let id = random(MAX_POKEMONS)

    while (yearlyPokemons.includes(id + 1)) {
      id = random(MAX_POKEMONS)
    }

    yearlyPokemons.push(id + 1)
    pokemons[day] = id + 1
  }
  return { pokemons, updatedList: yearlyPokemons }
}

const START_YEAR = 2020
const FINAL_YEAR = 2028

function generate() {
  for (let year = START_YEAR; year <= FINAL_YEAR; year++) {
    const yearPath = path.resolve('src', 'data', String(year))
    !fs.existsSync(yearPath) && fs.mkdirSync(yearPath);
    let yearlyPokemons = []

    for (let month = 1; month <= 12; month++) {
      const monthPath = path.resolve(yearPath, [month, 'json'].join('.'))

      const { pokemons, updatedList } = generateMonthlyPokedex(month, yearlyPokemons)
      yearlyPokemons = updatedList

      const content = JSON.stringify(pokemons)

      fs.writeFile(monthPath, content, { flag: 'wx' }, function (err) {
        if (err) throw err;
        console.log("It's saved!");
    });
    }
  }
}

generate()