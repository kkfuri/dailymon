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

export function getYearsBefore(year) {
  const fileContent = fs.readdirSync(
    path.resolve('src', 'data'),
    'utf8'
  )

  return fileContent.filter(i => Number(i) <= Number(year))
}

export function getPastPokemons() {
  const today = dayjs()
  const yesterday = today.subtract(1, 'day')
  const possibleYears = getYearsBefore(yesterday.year())

  const pokemonFromPast = {}

  possibleYears.map(year => {
    pokemonFromPast[year] = {}
    Array(12).fill(0).map((_, idx) => {
      pokemonFromPast[year][idx + 1] = getHistory(year, idx + 1)
    })
  })

  return pokemonFromPast
}

export function getThreeDayRangePokemons() {
  const today = dayjs()
  const tomorrow = today.add(1, 'day')
  const yesterday = today.subtract(1, 'day')
  const range = [today, tomorrow, yesterday]
  const pokemonForRange = range.map(date => getHistory(date.year(), date.month() + 1)[date.date()])

  return pokemonForRange
}
