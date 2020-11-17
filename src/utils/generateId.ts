export function generateId() {
  const date = new Date()
  const generatedNumber =
    date.getFullYear() + date.getUTCDate() + date.getUTCMonth()
  const id = generatedNumber > 800 ? generatedNumber / 4 : generatedNumber

  return Math.round(id)
}
