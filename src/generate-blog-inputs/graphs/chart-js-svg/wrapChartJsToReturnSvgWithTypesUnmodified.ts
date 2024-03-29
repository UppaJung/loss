import type { SvgRenderingOptions } from "./SvgRenderingOptions.ts";
import { mockHtmlCanvasElementWithSvgCanvas } from "./mockHtmlCanvasElementWithSvgCanvas.ts";

export function wrapChartJsToReturnSvgWithTypesUnmodified<TArgs extends unknown[]>(
  chartJsClassPrototype: {
    new(canvas: HTMLCanvasElement, ...args: TArgs): unknown;
  }
) {
  return (svgRenderingOptions: SvgRenderingOptions, ...args: TArgs) =>
    mockHtmlCanvasElementWithSvgCanvas(svgRenderingOptions, (canvas) => { new chartJsClassPrototype(canvas, ...args); });
};



