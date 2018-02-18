/**
 * No CLI tool yet, so the way to use this is by importing the utilities.
 */

const fs = require('mz/fs')

const { findCodeownersPath, report, formatMarkdownReport } = require('../dist')

const sampleSpec = {
  eslintFlags: { 'no-console': true },
  regexpMetrics: { FIXME: /FIXME/g, TODO: /TODO/g, 'Flowtype work': /\$Flow/g },
}

report('src', sampleSpec, findCodeownersPath()).then(report => {
  const content = formatMarkdownReport(sampleSpec, report)
  fs.writeFileSync('docs/EXAMPLE_REPORT.md', content)
})
