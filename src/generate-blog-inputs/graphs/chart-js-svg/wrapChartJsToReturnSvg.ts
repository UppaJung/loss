// Copyright 2024 Stuart Schechter. All rights reserved. MIT license.

import type { SvgRenderingOptions } from "./SvgRenderingOptions.ts";
import { mockHtmlCanvasElementWithSvgCanvas } from "./mockHtmlCanvasElementWithSvgCanvas.ts";
import { RemoveChartJsOptionsUnsupportedForSvgs } from "./UnsupportedChartJsOptions.ts";

export type ReplaceField<OriginalType, KeyToReplace extends keyof OriginalType, ReplacementValue> =
  { [key in keyof OriginalType]: key extends KeyToReplace ? ReplacementValue : OriginalType[key] };
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
// AWAITING NEW VERSION OF TS WITH THIS FIXED:
//   https://github.com/microsoft/TypeScript/issues/57863
export type SafeChartConfiguration<CHART_CONFIGURATION> =
    CHART_CONFIGURATION extends {options?: object} ? CHART_CONFIGURATION :    
    // (
    //   Omit<CHART_CONFIGURATION, "options"> &
    //     { options: RemoveChartJsOptionsUnsupportedForSvgs<NonNullable<CHART_CONFIGURATION["options"]>>; }
    // ) :
    CHART_CONFIGURATION;

export function wrapChartJsToReturnSvg<CHART_CONFIGURATION>(
    chartJsClassPrototype: {
      new(canvas: HTMLCanvasElement, configuration: CHART_CONFIGURATION): void;
    }
  ) {
    /**
     * Generate a chart with ChartJS, render to an SVG, and return that SVG in string form.
     * @param svgRenderingOptions An object specifying the height and width of the SVG as integer values,
     *  and optionally a fontHeightRatio as a number (default 2).
     * @param chartJsArguments The object that would otherwise be passed as the second argument to the
     *  constructor when creating a ChartJS object.
     * @returns The chart in SVG format in string form.
     */
    const chartJsSvg = (svgRenderingOptions: SvgRenderingOptions, chartJsArguments: SafeChartConfiguration<CHART_CONFIGURATION>) =>
      mockHtmlCanvasElementWithSvgCanvas(svgRenderingOptions, (canvas) => {
        new chartJsClassPrototype(canvas, chartJsArguments as CHART_CONFIGURATION);
      });
    return chartJsSvg;
};
