// @flow

export type FileMetrics = { [measure: string]: number | boolean }

export type FilesMetricsMap = { [filename: string]: FileMetrics }

export type ExpressionMap = {
  [key: string]: RegExp,
}

export type RuleFlags = { [ruleId: string]: boolean }

export type ReportSpec = {
  regexpMetrics?: ExpressionMap,
  eslintFlags?: RuleFlags,
}

export const FILES_SUM_METRIC_KEY = 'files count'
