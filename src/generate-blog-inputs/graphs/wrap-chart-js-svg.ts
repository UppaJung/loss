import type { ChartItem, ChartConfiguration, ChartType, DefaultDataPoint, ChartOptions } from "npm:chart.js@4.4.2/";
import { type SvgRenderingOptions, wrapChartJsChartClassToReturnSvgWithTypesUnmodified } from "./wrap-chart-js-svg-pure.ts";

type UnsupportedChartJsOptions = "responsive" |
  "responsiveAnimationDuration" |
  "events" |
  "legendCallback" |
  "onHover" |
  "onClick" |
  "onResize" |
  "hover" |
  "animation";
/** Remove chart options that cannot be supported when rendering to SVG */

export type RemoveUnsupportedChartJsOptions<T> = Omit<T, UnsupportedChartJsOptions>;

export function wrapChartJsChartClassToReturnSvg<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown>(
    chartJsClassPrototype: {
      new(canvas: ChartItem, args: ChartConfiguration<TType, TData, TLabel>): void;
    },
    svgRenderingOptions: SvgRenderingOptions
  ) {
  return wrapChartJsChartClassToReturnSvgWithTypesUnmodified(
    chartJsClassPrototype, svgRenderingOptions
  ) as (args: Omit<ChartConfiguration<TType, TData, TLabel>, "options"> &
  { options: RemoveUnsupportedChartJsOptions<ChartOptions<TType>>; }
  ) => string;
}
;
