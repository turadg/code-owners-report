// @flow

import measureFileTree from './measureFileTree'
import { parseCodeownersFile, findCodeownersPath } from './codeowners'

import { sumAll, sumByOwner } from './aggregateCounts'

import type { ReportSpec } from './config'

const sampleSpec: ReportSpec = {
  eslintRules: { 'no-console': true },
  regexpMetrics: { metrics: /metrics/ },
}

const ownerEntries = parseCodeownersFile(findCodeownersPath())

measureFileTree('src', sampleSpec).then(filesMetricsMap => {
  const all = sumAll(sampleSpec, filesMetricsMap)
  const byOwner = sumByOwner(sampleSpec, filesMetricsMap, ownerEntries)
  console.log({ byOwner, all })
})
