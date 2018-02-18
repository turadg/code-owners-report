// @flow

export type ExpressionMap = {
  [key: string]: RegExp,
}

type Tester = RegExp => boolean

export const testRegExpMatches = (
  contents: string,
  expressionMap: ExpressionMap,
): $ObjMap<ExpressionMap, Tester> => {
  const regexpReducer = (acc = {}, key) => {
    const re = expressionMap[key]
    acc[key] = !!contents.match(re)
    return acc
  }
  return Object.keys(expressionMap).reduce(regexpReducer, {})
}
