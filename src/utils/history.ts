import dayjs from 'dayjs'
import fs from 'fs'
import path from 'path'

export function getHistory(year, month) {
  const fileContent = fs.readFileSync(
    path.resolve('src', 'data', String(year), [month, 'json'].join('.')),
    'utf8'
  )
  if (!fileContent) return {}

  return JSON.parse(fileContent)
}

export function getThreeDayRangePokemons() {
  const today = dayjs()
  const tomorrow = today.add(1, 'day')
  const yesterday = today.subtract(1, 'day')
  const range =  [today, tomorrow, yesterday]
  const pokemonForRange = range.map(date => getHistory(date.year(), date.month() + 1)[date.date()])

  return pokemonForRange
}
