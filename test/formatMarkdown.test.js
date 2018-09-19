import { markdownFileTable } from '../src/formatMarkdown'

describe('markdownFileTable', () => {
  it('renders', () => {
    const metricKeys = ['metric1', 'metric2']
    const metricsMap = {
      file1: { owners: ['alice', 'bob'], metric1: 9, metric2: true },
      file2: { owners: ['cathy', 'dan'], metric1: -1, metric2: false },
    }
    expect(markdownFileTable(metricKeys, metricsMap)).toMatchSnapshot()
  })
})
