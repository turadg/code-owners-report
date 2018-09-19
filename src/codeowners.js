// @flow
// Lots copied from https://github.com/beaugunderson/codeowners/blob/master/codeowners.js

import findUp from 'find-up'
import fs from 'fs'
import ignore from 'ignore'
import path from 'path'
import trueCasePath from 'true-case-path'

export type OwnersEntry = {
  path: string, // .gitignore style
  usernames: string[],
  match: string => boolean,
}

export const findCodeownersPath = (): string => {
  const codeownersPath = findUp.sync('CODEOWNERS', { cwd: process.cwd() })

  if (!codeownersPath) {
    throw new Error('findCodeownersPath() failed. Please specify instead.')
  }

  const trueCaseCodeownersPath = trueCasePath(codeownersPath)

  const codeownersFile = path.basename(trueCaseCodeownersPath)

  if (codeownersFile !== 'CODEOWNERS') {
    throw new Error(
      `Found a CODEOWNERS file but it was lower-cased: ${trueCaseCodeownersPath}`,
    )
  }
  return trueCaseCodeownersPath
}

function ownerMatcher(pathString) {
  const matcher = ignore().add(pathString)

  return function(fileString) {
    return matcher.ignores(fileString)
  }
}

export const parseCodeownersFile = (pathname: string): OwnersEntry[] => {
  const lines = fs
    .readFileSync(pathname)
    .toString()
    .split('\n')
  const ownerEntries = []

  lines.forEach(line => {
    if (!line) {
      return
    }

    if (line.startsWith('#')) {
      return
    }

    const [pathString, ...usernames] = line.split(/\s+/)

    ownerEntries.push({
      path: pathString,
      usernames,
      match: ownerMatcher(pathString),
    })
  })
  return ownerEntries
}

/*
 * Return list of owners per CODEOWNERS for the given file.
 */
// TODO memoize to cache between repeated calls from different sites
export const whoOwns = (
  ownersEntries: OwnersEntry[],
  filePath: string,
): string[] => {
  let lastMatchingEntry = { usernames: [] }
  for (const entry of ownersEntries) {
    if (entry.match(filePath)) {
      lastMatchingEntry = entry
    }
  }
  return lastMatchingEntry.usernames
}

export const addOwners = (
  ownersEntries: OwnersEntry[],
  filePath: string,
  metrics: Object,
) => {
  const owners = whoOwns(ownersEntries, filePath).join(', ')
  Object.assign(metrics, { owners })
}
