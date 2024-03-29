import type { SvgRenderingOptions } from "./SvgRenderingOptions.ts";
import { RemoveUnsupportedChartJsOptions } from "./UnsupportedChartJsOptions.ts";
import type { ChartItem, ChartConfiguration, ChartType, DefaultDataPoint, ChartOptions as UnsafeChartOptions } from "npm:chart.js@4.4.2/";
import { wrapChartJsToReturnSvgWithTypesUnmodified } from "./wrapChartJsToReturnSvgWithTypesUnmodified.ts";

export type ChartOptions<TType extends ChartType = ChartType> = RemoveUnsupportedChartJsOptions<UnsafeChartOptions<TType>>;
;
/**
 * Wrap the ChartJS Chart class prototype to create a function that creates a factory that replaces
 * the first argument of the constructor (a canvas) with an argument specifying a set of rendering
 * options for creating an SVG (`SvgRenderingOptions`), returning the chart rendered into an SVG string.
 * @param chartJsClassPrototype Import this from the auto directory of chart.js, e.g.,
 * ```ts
 *   import { Chart as ChartJSChart } from "npm:chart.js/auto"; // or
 *   import { Chart as ChartJSChart } from "npm:chart.js@4.4.2/auto"; // for the version you would like to use
 * ```
 * @returns A function that returns an SVG string.
 */

export function wrapChartJsToReturnSvg<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown>(
    chartJsClassPrototype: {
      new(canvas: ChartItem, args: ChartConfiguration<TType, TData, TLabel>): void;
    }
  ) {
  return wrapChartJsToReturnSvgWithTypesUnmodified(chartJsClassPrototype) as (svgRenderingOptions: SvgRenderingOptions, args: Omit<ChartConfiguration<TType, TData, TLabel>, "options"> &
  { options: ChartOptions<TType>; }
  ) => string;
};
