// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Modified (significantly enough that I deserve the blame) by Stuart Schechter under MIT License.
// (Original Deno code at https://github.com/denoland/fresh_charts/blob/312653853994b129905662c3df48260f2651ab96/core.ts)

import { Rect2D, SvgCanvas2DGradient } from "https://esm.sh/stable/red-agate-svg-canvas@0.5.0";
import { ChartSvgCanvas } from "./ChartSvgCanvas.ts";
import { SvgRenderingOptions } from "./SvgRenderingOptions.ts";

interface SvgCanvasExtras {
  canvas?: {
    width: number;
    height: number;
    style: Record<string, string>;
  };
  resetTransform?(): void;
};

export function mockHtmlCanvasElementWithSvgCanvas({
  width = 768, height = 384, fontHeightRatio = 2
}: SvgRenderingOptions,
  callbackProvidedMockedHTMLCanvasElement: (canvas: HTMLCanvasElement) => void
) {
  const ctx = new ChartSvgCanvas({width, height, fontHeightRatio});
  const savedGradient = globalThis.CanvasGradient;
  globalThis.CanvasGradient = SvgCanvas2DGradient as typeof CanvasGradient;

  try {
    callbackProvidedMockedHTMLCanvasElement(ctx.canvas);
  } finally {
    if (savedGradient) {
      globalThis.CanvasGradient = savedGradient;
    }
  }

  return ctx.render(new Rect2D(0, 0, width, height), "px");
}
