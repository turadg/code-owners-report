import { generateReport } from '../src/index'

describe('generateReport', () => {
  it('reads file in this repo', async () => {
    const result = await generateReport('src/forExample', {}, './CODEOWNERS')
    console.log('result', result)
    expect(result.eachFile).toEqual({"src/forExample/badFile.js": {"owners": "@js-owner"}})
    expect(result.allSum).toEqual({"files count": 1})
    expect(result.ownerSum).toEqual({ '@js-owner': { 'files count': 1 } } )
  })
})
