import { SvgRenderingOptions } from "./wrap-chart-js-svg-pure.ts";
import { wrapChartJsChartClassToReturnSvg } from "./wrap-chart-js-svg.ts";
import * as Chart from "npm:chart.js@4.4.2/";
import { type ChartDataset, type Point} from "npm:chart.js@4.4.2/";

import { Chart as ChartJSChart } from "npm:chart.js@4.4.2/auto";

export type { ChartDataset, Point };

import type { RemoveUnsupportedChartJsOptions } from "./wrap-chart-js-svg.ts";

export type ChartOptions<TType extends Chart.ChartType = Chart.ChartType> =
  RemoveUnsupportedChartJsOptions<Chart.ChartOptions<TType>>;

export function chart<
  TType extends Chart.ChartType = Chart.ChartType,
  TData = Chart.DefaultDataPoint<TType>,
  TLabel = unknown
>(
  {
    width, height, svgClass, svgStyle, fontHeightRatio, ...chartJsConstructorOptions
  }: SvgRenderingOptions &
    Omit<Chart.ChartConfiguration<TType, TData, TLabel>, "options"> &
    {options: ChartOptions<TType>}
): string {
  const svgOptions = { width, height, svgClass, svgStyle, fontHeightRatio };
  const chartJsFn = wrapChartJsChartClassToReturnSvg(ChartJSChart, svgOptions);
  return chartJsFn(chartJsConstructorOptions);
}
