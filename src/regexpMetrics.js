// @flow

import type { ExpressionMap } from './config'

type Tester = RegExp => boolean

export const countRegExpMatches = (
  contents: string,
  expressionMap: ExpressionMap,
): $ObjMap<ExpressionMap, Tester> => {
  const matches = {}
  for (const key of Object.keys(expressionMap)) {
    const re = expressionMap[key]
    matches[key] = (contents.match(re) || []).length
  }
  return matches
}
