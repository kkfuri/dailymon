export function daysInMonth(month: number) {
  return new Date(new Date().getFullYear(), month, 0).getDate()
}

export function today() {
  return new Date().toLocaleDateString()
}
