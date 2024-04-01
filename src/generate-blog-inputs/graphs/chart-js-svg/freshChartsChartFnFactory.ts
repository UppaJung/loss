// Copyright 2024 Stuart Schechter. All rights reserved. MIT license.

import { SvgRenderingOptions } from "./SvgRenderingOptions.ts";
import { wrapChartJsToReturnSvg } from "./wrapChartJsToReturnSvg.ts";
import { SvgRewritingOptions, rewriteSvgString } from "./SvgRewritingOptions.ts";
import { SafeChartConfiguration } from "./wrapChartJsToReturnSvg.ts";

/**
  * Given a ChartJS class object prototype, return  chart function mirroring the interface
  * of Deno FreshCharts provides at
  * https://github.com/denoland/fresh_charts/blob/312653853994b129905662c3df48260f2651ab96/core.ts#L85C1-L106C1
  * ```ts
  * import { Chart as ChartJSChart } from "chart.js";
  * const chart = chartFnFactory(ChartJSChart);
  * ```
 * @param chartJsClassPrototype 
 * @returns 
 */
export function freshChartsChartFnFactory<CHART_CONFIGURATION>(
    chartJsClassPrototype: {
      new(canvas: HTMLCanvasElement, args: CHART_CONFIGURATION): void;
    }
  ) {
  /**
   * Given a ChartJS class object prototype, return  chart function mirroring the interface
   * of Deno FreshCharts provides at
   * https://github.com/denoland/fresh_charts/blob/312653853994b129905662c3df48260f2651ab96/core.ts#L85C1-L106C1
   * @param args.width The width of the SVG.
   * @param args.height The height of the SVG.
   * @param args.fontHeightRatio The ratio of the font height to the height of the SVG. (optional, default 2)
   * @param args.svgClass The class attribute of the SVG.
   * @param args.svgStyle The style attribute of the SVG.
   * @param args The remaining arguments are the ones that would be passed to ChartJS as the
   * second parameter of the Chart object constructor. 
   * @returns 
   */
  const chart = function(
    {
      width, height, fontHeightRatio, svgClass, svgStyle, ...safeChartConfiguration
    }: SvgRenderingOptions & SvgRewritingOptions & SafeChartConfiguration<CHART_CONFIGURATION>
  ): string {
    const svgOptions = { width, height, fontHeightRatio };
    const chartJsFn = wrapChartJsToReturnSvg(chartJsClassPrototype);
    let svgString = chartJsFn(svgOptions, safeChartConfiguration as SafeChartConfiguration<CHART_CONFIGURATION>);
    svgString = rewriteSvgString(svgString, {svgClass, svgStyle});
    return svgString;
  }
  return chart;
};

