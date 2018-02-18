// @flow
import measureFileTree from './measureFileTree'
import { parseCodeownersFile } from './codeowners'
import { sumAll, sumByOwner } from './aggregateCounts'

import type { ReportSpec } from './config'

export type CodeReport = {
  byFile: Object,
  byAll: Object,
  byOwner?: ?Object,
}

/**
 * Generate a report over the `basedir`
 */
export const generateReport = async (
  basedir: string,
  reportSpec: ReportSpec,
  codeownersPath?: string,
): Promise<CodeReport> => {
  const ownerEntries = codeownersPath
    ? parseCodeownersFile(codeownersPath)
    : null

  const byFile = await measureFileTree(basedir, reportSpec)

  const byAll = sumAll(reportSpec, byFile)
  const byOwner = ownerEntries
    ? sumByOwner(reportSpec, byFile, ownerEntries)
    : null
  return { byFile, byAll, byOwner }
}

export { findCodeownersPath } from './codeowners'
export { formatReport as formatMarkdownReport } from './formatMarkdown'
export type { ReportSpec }
