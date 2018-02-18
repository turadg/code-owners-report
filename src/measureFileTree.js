// @flow
import fs from 'mz/fs'
import { testRegExpMatches } from './regexpMetrics'
import { countEslintRuleViolations } from './eslintMetrics'

import type { FileMetrics, FilesMetricsMap, ReportSpec } from './config'

const measureFile = async (
  filePath: string,
  spec: ReportSpec,
): Promise<FileMetrics> => {
  const metrics = {}

  const contents = await fs.readFile(filePath, { encoding: 'utf8' })

  if (spec.regexpMetrics) {
    Object.assign(metrics, testRegExpMatches(contents, spec.regexpMetrics))
  }

  if (spec.eslintRules) {
    Object.assign(
      metrics,
      countEslintRuleViolations(contents, spec.eslintRules),
    )
  }

  return metrics
}

export default async function measureFileTree(
  dir: string,
  spec: ReportSpec,
): Promise<FilesMetricsMap> {
  console.log('Measuring directory', dir)

  const metrics: FilesMetricsMap = {}

  // consider https://github.com/jergason/recursive-readdir
  const files = fs.readdirSync(dir) || []
  for (const file of files) {
    const subpath = `${dir}/${file}`
    if (fs.statSync(subpath).isDirectory()) {
      const treeMetrics: FilesMetricsMap = await measureFileTree(
        `${subpath}/`,
        spec,
      )
      Object.assign(metrics, treeMetrics)
    } else {
      console.log('  measuring file', subpath)
      const fileMetrics: FileMetrics = await measureFile(subpath, spec)
      metrics[subpath] = fileMetrics
    }
  }
  return metrics
}
