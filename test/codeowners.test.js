import { parseCodeownersFile, whoOwns } from '../src/codeowners'

describe('parseCodeownersFile', () => {
  it('reads file in this repo', () => {
    const ownerEntries = parseCodeownersFile('./CODEOWNERS')
    expect(ownerEntries).toEqual([
      {
        match: jasmine.any(Function),
        path: '*',
        usernames: ['@global-owner1', '@global-owner2'],
      },
      { match: jasmine.any(Function), path: '*.js', usernames: ['@js-owner'] },
      {
        match: jasmine.any(Function),
        path: '*.go',
        usernames: ['docs@example.com'],
      },
      {
        match: jasmine.any(Function),
        path: '/build/logs/',
        usernames: ['@doctocat'],
      },
      {
        match: jasmine.any(Function),
        path: 'docs/*',
        usernames: ['docs@example.com'],
      },
      { match: jasmine.any(Function), path: 'apps/', usernames: ['@octocat'] },
      {
        match: jasmine.any(Function),
        path: '/docs/',
        usernames: ['@doctocat'],
      },
    ])
  })
})

describe('whoOwns', () => {
  const ownerEntries = parseCodeownersFile('./CODEOWNERS')
  it('handles global', () => {
    expect(whoOwns(ownerEntries, 'no-match')).toEqual([
      '@global-owner1',
      '@global-owner2',
    ])
  })
  it('handles globs', () => {
    expect(whoOwns(ownerEntries, 'foo.js')).toEqual(['@js-owner'])
    expect(whoOwns(ownerEntries, 'foo.go')).toEqual(['docs@example.com'])
  })
  xit('handles root paths', () => {
    expect(whoOwns(ownerEntries, '/docs/somedoc')).toEqual(['@doctocat'])
  })
})
