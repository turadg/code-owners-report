#!/usr/bin/env node
/**
 * No CLI tool yet, so the way to use this is by importing the utilities.
 */

const fs = require('mz/fs')

const { findCodeownersPath, generateReport, formatMarkdownReport } = require('../dist')

const sampleSpec = {
  omit: /Metrics.js$/,
  eslintFlags: { 'no-console': true },
  regexpMetrics: { FIXME: /FIXME/g, TODO: /TODO/g, 'Flowtype work': /\$Flow/g },
}

generateReport('src', sampleSpec, findCodeownersPath()).then(report => {
  const content = formatMarkdownReport(sampleSpec, report)
  fs.writeFileSync('docs/EXAMPLE_REPORT.md', content)
})
