# Loss Project Analysis Code & Blog

This project is built in TypeScript and runs in deno.

If you do not have deno, you will need to [install deno](https://docs.deno.com/runtime/manual/getting_started/installation).

#### Configuration

To analyze the raw data, you will need access to the tab-separated value exports generated from Qualtrics. They are generated with line-breaks removed. (We are not committing into the public repository lest we risk accidentally exposing PII that might have snuck in there.)

 - Create an `analysis-input-raw` directory and copy the .TSV files there. Current data files required for analysis are:
    - `Pilot6.tsv`

#### Analyzing the raw data files
To run the analysis that produces all the data macros and graphs, use the following command.

```bash
deno task analyze
```

The files generated are tracked in git, so make sure to validate that any new results are free of PII before committing changes.

#### Preview the blog

The blog is automatically built. You can preview your changes locally by running:

```bash
deno task serve
```
