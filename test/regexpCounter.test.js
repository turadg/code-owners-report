import { countRegExpMatches } from '../src/regexpMetrics'

describe('countRegExpMatches', () => {
  it('returns counts', () => {
    const counts = countRegExpMatches('bstrb', {
      a: /a/,
      b: /b/g,
      singleb: /b/,
    })
    expect(counts).toEqual({ a: 0, b: 2, singleb: 1 })
  })
})
