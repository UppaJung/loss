// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Significantly modified/rewritten by Stuart Schechter (under MIT license)

import { Rect2D, SvgCanvas, SvgCanvas2DGradient } from "https://esm.sh/stable/red-agate-svg-canvas@0.5.0";

/**
 * Augments SvgCanvas to support specifics of ChartJS renderings
 */
class ChartSvgCanvas extends SvgCanvas {
  public override clearRect(x: number, y: number, w: number, h: number): void {
    this.save();
    this.fillStyle = "transparent";
    this.fillRect(x, y, w, h);
    this.restore();
  }

  public resetTransform() {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export interface SvgRenderingOptions {
  /** The width, in pixels, of the chart.
   *
   * Defaults to `768`.
   */
  width?: number;
  /** The height, in pixels, of the chart.
   *
   * Defaults to `384`.
   */
  height?: number;
  /** CSS class for the <svg> element of the chart. */
  svgClass?: string;
  /** CSS style for the <svg> element of the chart */
  svgStyle?: string;
  /** Passed to the rendering context
   * 
   * Defaults to `2`.
  */
  fontHeightRatio?: number;
}

interface SvgCanvasExtras {
  canvas?: {
    width: number;
    height: number;
    style: Record<string, string>;
  };
  resetTransform?(): void;
}

function mockHtmlCanvasElementWithSvgCanvas({
    width = 768,
    height = 384,
    fontHeightRatio = 2,
    svgClass,
    svgStyle,
  }: SvgRenderingOptions,
  callbackProvidedMockedHTMLCanvasElement: (canvas: HTMLCanvasElement) => void
) {
  const ctx = new ChartSvgCanvas() as SvgCanvas & SvgCanvasExtras;
  ctx.canvas = {
    width, height,
    style: { width: `${width}px`, height: `${height}px` },
  };
  ctx.fontHeightRatio = fontHeightRatio;
  const svgMockCanvas = { getContext: () => ctx } as unknown as HTMLCanvasElement;
  const savedGradient = globalThis.CanvasGradient;
  globalThis.CanvasGradient = SvgCanvas2DGradient as typeof CanvasGradient;

  try {
    callbackProvidedMockedHTMLCanvasElement(svgMockCanvas);
  } finally {
    if (savedGradient) {
      globalThis.CanvasGradient = savedGradient;
    }
  }

  let svg = ctx.render(new Rect2D(0, 0, width, height), "px");

  if (svgStyle) {
    svg = svg.replace(
      "<svg ",
      `<svg style="${svgStyle.replaceAll('"', "&quot;")}" `,
    );
  }
  if (svgClass) {
    svg = svg.replace(
      "<svg ",
      `<svg class="${svgClass.replaceAll('"', "&quot;")}" `,
    );
  }

  // Hack to remove textLength values that mess up x axis labels
	svg = svg.replaceAll(RegExp(`textLength="[\\d\\.]+"`, "g"), "");

  return svg;
};

export function wrapChartJsChartClassToReturnSvgWithTypesUnmodified<TArgs extends unknown[]>(
  chartJsClassPrototype: {
    new(canvas: HTMLCanvasElement, ...args: TArgs): unknown;
  },
  svgRenderingOptions: SvgRenderingOptions,
) {
return (...args: TArgs) =>
  mockHtmlCanvasElementWithSvgCanvas(svgRenderingOptions, (canvas) => { new chartJsClassPrototype(canvas, ...args); });
};



