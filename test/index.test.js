import { generateReport } from '../src/index'

describe('generateReport', () => {
  it('reads files from one path', async () => {
    const result = await generateReport('src/forExample', {}, './CODEOWNERS')
    expect(result.eachFile).toEqual({
      'src/forExample/badFile.js': { owners: '@js-owner' },
      'src/forExample/goodFile.js': { owners: '@js-owner' },
    })
    expect(result.allSum).toEqual({ 'files count': 2 })
    expect(result.ownerSum).toEqual({ '@js-owner': { 'files count': 2 } })
  })

  it('reads files from multiple paths', async () => {
    const result = await generateReport(
      ['src/forExample', 'src/forExample2'],
      {},
      './CODEOWNERS',
    )
    expect(result.eachFile).toEqual({
      'src/forExample/badFile.js': { owners: '@js-owner' },
      'src/forExample/goodFile.js': { owners: '@js-owner' },
      'src/forExample2/badFile2.js': { owners: '@js-owner' },
      'src/forExample2/empty.go': { owners: 'docs@example.com' },
    })
    expect(result.allSum).toEqual({ 'files count': 4 })
    expect(result.ownerSum).toEqual({
      '@js-owner': { 'files count': 3 },
      'docs@example.com': { 'files count': 1 },
    })
  })
})
