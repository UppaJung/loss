// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Modified (significantly enough that I deserve the blame) by Stuart Schechter under MIT License.
// (Original Deno code at https://github.com/denoland/fresh_charts/blob/312653853994b129905662c3df48260f2651ab96/core.ts)

export interface SvgRewritingOptions {
  /** CSS class for the <svg> element of the chart. */
  svgClass?: string;
  /** CSS style for the <svg> element of the chart */
  svgStyle?: string;
}

export function rewriteSvgString(svgString: string, { svgClass, svgStyle }: SvgRewritingOptions) {
  if (svgStyle) {
    svgString = svgString.replace(
      "<svg ",
      `<svg style="${svgStyle.replaceAll('"', "&quot;")}" `
    );
  }
  if (svgClass) {
    svgString = svgString.replace(
      "<svg ",
      `<svg class="${svgClass.replaceAll('"', "&quot;")}" `
    );
  }
  return svgString;
}
