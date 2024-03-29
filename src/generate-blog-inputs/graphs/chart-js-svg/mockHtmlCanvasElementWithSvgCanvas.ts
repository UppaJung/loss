import { Rect2D, SvgCanvas, SvgCanvas2DGradient } from "https://esm.sh/stable/red-agate-svg-canvas@0.5.0";
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

  // Hack to remove textLength values that mess up x axis labels
  svg = svg.replaceAll(RegExp(`textLength="[\\d\\.]+"`, "g"), "");

  return svg;
}
