# code-owners-report

Generate a report about the files in your repository, and aggregate them by [CODEOWNERS](https://help.github.com/articles/about-codeowners/).

## Usage

This is meant to be tailored to your workflow and CI, so for maximum flexibility the tool is offered as a library of utility methods. Will gladly accept PRs for a CLI.

See [docs/example.js] and its output [docs/EXAMPLE_REPORT.md], inlined here:

This report was autogenerated by code-owners-report.

| markdown | no-console |
| -------- | ---------- |
| 1        | 2          |

| owner          | markdown | no-console |
| -------------- | -------- | ---------- |
| @global-owner1 | -        | -          |
| @global-owner2 | -        | -          |
| @js-owner      | 1        | 2          |

| filename               | markdown | no-console |
| ---------------------- | -------- | ---------- |
| src/README.md          | -        | -          |
| src/aggregateCounts.js | -        | -          |
| src/codeowners.js      | -        | -          |
| src/config.js          | -        | -          |
| src/eslintMetrics.js   | -        | -          |
| src/formatMarkdown.js  | true     | -          |
| src/index.js           | -        | -          |
| src/measureFileTree.js | -        | 2          |
| src/regexpMetrics.js   | -        | -          |

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [formatReport](#formatreport)
    -   [Parameters](#parameters)
-   [generateReport](#generatereport)
    -   [Parameters](#parameters-1)
-   [measureFileTree](#measurefiletree)
    -   [Parameters](#parameters-2)

### formatReport

Format the report as Markdown text

#### Parameters

-   `reportSpec` **ReportSpec** 
-   `report` **any** 

### generateReport

Generate a report over the `basedir`

#### Parameters

-   `basedirOpt` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** 
-   `reportSpec` **ReportSpec** 
-   `ignores` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>**  (optional, default `[]`)
-   `codeownersPath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;CodeReport>** 

### measureFileTree

Report metrics on every file within `dir`

#### Parameters

-   `dir` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `spec` **ReportSpec** 
-   `ignoredPaths` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;FilesMetricsMap>** 

## Contributors

Thanks to [Diego Haz](https://github.com/diegohaz) for [nod](https://github.com/diegohaz/nod) and [Beau Gunderson](https://github.com/beaugunderson) for earlier work on [codeowners](https://github.com/beaugunderson/codeowners).
