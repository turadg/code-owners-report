// @flow

import measureFileTree from './measureFileTree'

const sampleSpec = {
  eslintRules: { 'no-console': true },
  regexpMetrics: { metrics: /metrics/ },
}

measureFileTree('src', sampleSpec).then(result => console.log({ result }))
