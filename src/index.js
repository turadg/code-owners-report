// @flow
import fs from 'mz/fs'

import measureFileTree from './measureFileTree'
import { parseCodeownersFile, findCodeownersPath } from './codeowners'

import { sumAll, sumByOwner } from './aggregateCounts'

import {formatReport} from './formatMarkdown'

import type { ReportSpec } from './config'

const sampleSpec: ReportSpec = {
  eslintRules: { 'no-console': true },
  regexpMetrics: { metrics: /metrics/ },
}

export const report = async (
  basedir: string,
  reportSpec: ReportSpec,
  codeownersPath?: string,
) => {
  const ownerEntries = codeownersPath
    ? parseCodeownersFile(codeownersPath)
    : null

  const byFile = await measureFileTree('src', sampleSpec)

  const byAll = sumAll(sampleSpec, byFile)
  const byOwner = ownerEntries
    ? sumByOwner(sampleSpec, byFile, ownerEntries)
    : null
  return { byFile, byAll, byOwner }
}

report('src', sampleSpec, findCodeownersPath()).then(report => {
  const content = formatReport(sampleSpec, report)
  fs.writeFileSync('REPORT.md', content)
})
