import { SvgRenderingOptions } from "./SvgRenderingOptions.ts";
import { wrapChartJsToReturnSvg, ChartOptions } from "./wrapChartJsToReturnSvg.ts";
import { SvgRewritingOptions, rewriteSvgString } from "./SvgRewritingOptions.ts";
import type { ChartItem, ChartType, DefaultDataPoint, ChartConfiguration } from "npm:chart.js@4.4.2/";

export function chartFnFactory<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown>(
    chartJsClassPrototype: {
      new(canvas: ChartItem, args: ChartConfiguration<TType, TData, TLabel>): void;
    }
  ) {
  const chart = function(
    {
      width, height, svgClass, svgStyle, fontHeightRatio, ...chartJsConstructorOptions
    }: SvgRenderingOptions & SvgRewritingOptions &
      Omit<ChartConfiguration<TType, TData, TLabel>, "options"> &
      {options: ChartOptions<TType>}
  ): string {
    const svgOptions = { width, height, fontHeightRatio };
    const chartJsFn = wrapChartJsToReturnSvg(chartJsClassPrototype);
    let svgString = chartJsFn(svgOptions, chartJsConstructorOptions);
    svgString = rewriteSvgString(svgString, {svgClass, svgStyle});
    return svgString;
  }
  return chart;
};

