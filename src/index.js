// @flow

import fs from 'mz/fs'
import { testRegExpMatches } from './regexpMetrics'
import { countEslintRuleViolations } from './eslintMetrics'

const measureFile = async (filePath: string, spec) => {
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

async function walkSync(dir, spec) {
  const fileMetrics = {}

  const files = fs.readdirSync(dir) || []

  for (const file of files) {
    const subpath = `${dir}/${file}`
    if (fs.statSync(subpath).isDirectory()) {
      walkSync(`${subpath}/`, spec)
    } else {
      const metrics = await measureFile(subpath, spec)
      fileMetrics[subpath] = metrics
    }
  }

  return fileMetrics
}

const sampleSpec = {
  eslintRules: { 'no-console': true },
  regexpMetrics: { metrics: /metrics/ },
}

walkSync('src', sampleSpec).then(result => console.log(result))
