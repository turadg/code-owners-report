// @flow

import type { FilesMetricsMap, ReportSpec } from './config'

import { whoOwns, type OwnersEntry } from './codeowners'

const mkInitialCounts = (spec: ReportSpec) => {
  const headings = [].concat(
    spec.regexpMetrics && Object.keys(spec.regexpMetrics),
    spec.eslintFlags && Object.keys(spec.eslintFlags),
  )
  const counts = {}
  for (const heading of headings) {
    if (!heading) continue
    counts[heading] = 0
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
        // metric value may be boolean, but that'll cast here to 1 or 0
        ownerCounts[owner][heading] += fileMetrics[heading]
      }
    }
  }

  return ownerCounts
}
