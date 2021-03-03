import fs from 'fs'
import path from 'path'
import random from 'lodash.random'

import { MAX_POKEMONS } from './constants'
import { daysInMonth } from './date'

export function generateMonthlyPokedex() {
  for (let i = 1; i <= daysInMonth(new Date().getMonth() + 1); i++) {
    const date = new Date()
      .toDateString()
      .replace(new Date().getUTCDate().toString().padStart(2, '0'), String(i))
    const id = random(MAX_POKEMONS)
    saveToHistory(id + 1, date)
  }
}

export function generateDailyPokemon() {
  const id = random(MAX_POKEMONS)
  saveToHistory(id + 1)
}

export function saveToHistory(pokemonId: number, date?: string) {
  const history = getHistory()
  const dateToSave = (date ? new Date(date) : new Date()).toLocaleDateString()

  history[dateToSave] = pokemonId

  const stringifiedHistory = JSON.stringify(history)

  const filePath = path.resolve('src', 'utils', 'history.json')
  fs.writeFileSync(filePath, stringifiedHistory)
}

export function getHistory() {
  const fileContent = fs.readFileSync(
    path.resolve('src', 'utils', 'history.json'),
    'utf8'
  )
  if (!fileContent) return {}

  return JSON.parse(fileContent)
}
