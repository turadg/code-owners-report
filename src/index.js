// @flow

import measureFileTree from './measureFileTree'

import { sumAll } from './aggregateCounts'

import type { ReportSpec } from './config'

const sampleSpec: ReportSpec = {
  eslintRules: { 'no-console': true },
  regexpMetrics: { metrics: /metrics/ },
}

measureFileTree('src', sampleSpec).then(filesMetricsMap => {
  const all = sumAll(sampleSpec, filesMetricsMap)
  console.log({ all })
})
