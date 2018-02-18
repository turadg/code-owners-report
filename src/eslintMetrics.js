// @flow

import { CLIEngine } from 'eslint'

import type { RuleFlags } from './config'

const eslinter = new CLIEngine({
  useEslintrc: true,
})

type Counter = boolean => number

export const countEslintRuleViolations = (
  contents: string,
  ruleFlags: RuleFlags,
): $ObjMap<RuleFlags, Counter> => {
  const { results } = eslinter.executeOnText(contents)

  // only one result possible for executeOnText()
  const fileMessages = results[0].messages

  const eslintCounts = fileMessages.reduce((acc = {}, message) => {
    const { ruleId } = message
    if (ruleFlags[ruleId]) {
      acc[ruleId] = 1 + (acc[ruleId] || 0)
    }
    return acc
  }, {})

  return eslintCounts
}
