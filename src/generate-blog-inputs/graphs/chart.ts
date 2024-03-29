import type { ChartDataset, Point } from "npm:chart.js@4.4.2/";
import { Chart as ChartJSChart } from "npm:chart.js@4.4.2/auto";
import annotationPlugin from "npm:chartjs-plugin-annotation@3.0.1/";
import { chartFnFactory } from "./chart-js-svg/chartFnFactory.ts";

ChartJSChart.register(annotationPlugin);
export type { ChartDataset, Point };
export type { ChartOptions } from "./chart-js-svg/wrapChartJsToReturnSvg.ts";
export const chart = chartFnFactory(ChartJSChart);
