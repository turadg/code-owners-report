// @flow

import type { FilesMetricsMap, ReportSpec } from './config'

import { whoOwns, type OwnersEntry } from './codeowners'

import { FILES_SUM_METRIC_KEY } from './config'

const mkInitialCounts = (spec: ReportSpec) => {
  const headings = [FILES_SUM_METRIC_KEY].concat(
    spec.regexpMetrics && Object.keys(spec.regexpMetrics),
    spec.eslintFlags && Object.keys(spec.eslintFlags),
  )
  const counts = {}
  for (const heading of headings) {
    if (heading) {
      counts[heading] = 0
    }
  }
  return counts
}

export const sumAll = (spec: ReportSpec, filesMetricsMap: FilesMetricsMap) => {
  const counts = mkInitialCounts(spec)

  for (const filename of Object.keys(filesMetricsMap)) {
    const fileMetrics = filesMetricsMap[filename]
    for (const heading of Object.keys(fileMetrics)) {
      // metric value may be boolean, but that'll cast here to 1 or 0
      counts[heading] += fileMetrics[heading]
    }
  }

  counts[FILES_SUM_METRIC_KEY] = Object.keys(filesMetricsMap).length

  return counts
}

export const sumByOwner = (
  spec: ReportSpec,
  filesMetricsMap: FilesMetricsMap,
  ownerEntries: OwnersEntry[],
) => {
  const ownerCounts: { [owner: string]: { [heading: string]: number } } = {}

  for (const filename of Object.keys(filesMetricsMap)) {
    const owners = whoOwns(ownerEntries, filename)
    for (const owner of owners) {
      if (!ownerCounts[owner]) {
        ownerCounts[owner] = mkInitialCounts(spec)
      }
      const fileMetrics = filesMetricsMap[filename]
      for (const heading of Object.keys(fileMetrics)) {
        // HACK for passing owners info on the metrics object
        // eslint-disable-next-line no-continue
        if (heading === 'owners') continue
        // metric value may be boolean, but that'll cast here to 1 or 0
        ownerCounts[owner][heading] += fileMetrics[heading]
      }
      ownerCounts[owner][FILES_SUM_METRIC_KEY] += 1
    }
  }

  return ownerCounts
}
