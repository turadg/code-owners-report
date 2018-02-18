import {testRegExpMatches} from '../src/regexpMetrics'

describe('testRegExpMatches', () => {
  it('returns counts', () => {
    const counts = testRegExpMatches('bstr', {a: /a/, b: /b/})
    expect(counts).toEqual({a: false, b: true})
  })
})
