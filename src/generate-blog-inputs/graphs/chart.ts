import type { ChartDataset, Point, ChartType, ChartOptions as UnsafeChartOptions } from "npm:chart.js@4.4.2/";
import { Chart as ChartJSChart } from "npm:chart.js@4.4.2/auto";
import annotationPlugin from "npm:chartjs-plugin-annotation@3.0.1/";
import { freshChartsChartFnFactory } from "./chart-js-svg/freshChartsChartFnFactory.ts";
import { RemoveChartJsOptionsUnsupportedForSvgs } from "./chart-js-svg/UnsupportedChartJsOptions.ts";

ChartJSChart.register(annotationPlugin);
export type { ChartDataset, Point };
export const chart = freshChartsChartFnFactory(ChartJSChart);
export type ChartOptions<TType extends ChartType = ChartType> = RemoveChartJsOptionsUnsupportedForSvgs<UnsafeChartOptions<TType>>
