import chroma from 'chroma-js'
import random from 'lodash.random'

import { colorByType } from '@/utils/constants'

type generateMainColorType = (
  types: string[] | string,
  opts?: { randomDefault?: boolean }
) => string
type generateAverageColorType = (types: string[]) => string

export const generateMainColor: generateMainColorType = function (types, opts) {
  let placeholderColor = 'gray'
  if (opts?.randomDefault) {
    placeholderColor = Object.keys(colorByType)[
      random(Object.keys(colorByType).length - 1)
    ]
  }

  const type = typeof types === 'object' ? types?.[0] : types
  return colorByType[type] || placeholderColor
}

export const generateAverageColor: generateAverageColorType = function (types) {
  return types?.length > 1
    ? chroma.average(types.map((i) => colorByType[i]))
    : generateMainColor(types)
}
