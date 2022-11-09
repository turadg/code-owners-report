// @flow
import measureFileTree from './measureFileTree'
import { addOwners, parseCodeownersFile } from './codeowners'
import { sumAll, sumByOwner } from './aggregateCounts'

import type { ReportSpec } from './config'

export type CodeReport = {
  eachFile: Object,
  allSum: Object,
  ownerSum?: ?Object,
}

/**
 * Generate a report over the `basedir`
 */
export const generateReport = async (
  basedirOpt: string[] | string,
  reportSpec: ReportSpec,
  ignores?: string[] = [],
  codeownersPath?: string,
): Promise<CodeReport> => {
  console.log({ignores})
  const ownerEntries = codeownersPath
    ? parseCodeownersFile(codeownersPath)
    : null

  const basedirs = Array.isArray(basedirOpt) ? basedirOpt : [basedirOpt]
  console.log('basedirs', basedirs)
  const filesByDir = await Promise.all(
    basedirs.map(d => measureFileTree(d, reportSpec, ignores)),
  )
  const eachFile = filesByDir.reduce((acc, curr) => ({ ...acc, ...curr }), {})

  const allSum = sumAll(reportSpec, eachFile)
  let ownerSum = null
  if (ownerEntries) {
    ownerSum = sumByOwner(reportSpec, eachFile, ownerEntries)
    for (const filename of Object.keys(eachFile)) {
      addOwners(ownerEntries, filename, eachFile[filename])
    }
  }
  return { eachFile, allSum, ownerSum }
}

export { findCodeownersPath } from './codeowners'
export { formatReport as formatMarkdownReport } from './formatMarkdown'
export type { ReportSpec }
