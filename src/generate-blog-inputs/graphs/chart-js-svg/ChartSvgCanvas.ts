// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Modified (significantly enough that I deserve the blame) by Stuart Schechter under MIT License.
// (Original Deno code at https://github.com/denoland/fresh_charts/blob/312653853994b129905662c3df48260f2651ab96/core.ts)

import { SvgCanvas } from "https://esm.sh/stable/red-agate-svg-canvas@0.5.0";

interface MockCanvas {
  width: number;
  height: number;
  style: Record<string, string>;
  getContext: () => ChartSvgCanvas;
}

/**
 * Augments SvgCanvas to support specifics of ChartJS renderings
 */
export class ChartSvgCanvas extends SvgCanvas /* implements CanvasRenderingContext2D */ {
  // canvas, getContextAttributes, isPointInPath, isPointInStroke
  readonly canvas: HTMLCanvasElement = undefined as unknown as HTMLCanvasElement;

  constructor({width, height, fontHeightRatio}: {
    width: number;
    height: number;
    fontHeightRatio?: number;
  }) {
    super();
    const mockCanvas: MockCanvas = {
        width, height,
        style: { width: `${width}px`, height: `${height}px` },
        getContext: () => this
    }
    this.canvas = mockCanvas as unknown as HTMLCanvasElement;
    if (fontHeightRatio != null) {
      this.fontHeightRatio = fontHeightRatio;
    }
  }

  public override clearRect(x: number, y: number, w: number, h: number): void {
    this.save();
    this.fillStyle = "transparent";
    this.fillRect(x, y, w, h);
    this.restore();
  }

  /**
   * The creators of SvgCanvas failed to implement the resetTransform method.
   */
  public resetTransform() {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }

  /**
   * ChartJS is a very very naughty untyped javascript library that has been caught
   * pass null values to measureText even thought the interface demands a non-null string.
   * This override turns those null values into empty strings to prevent crashes.
   */
  public override measureText(text: string) {
    // So,  replace null with empty string.
    return super.measureText(text || "") as ReturnType<CanvasRenderingContext2D["measureText"]>;
  }

  public getContextAttributes(): CanvasRenderingContext2DSettings {
    throw new Error("Method not implemented.");
  }

  public isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
  public isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
  public isPointInPath(): boolean {
    throw new Error("Method not implemented.");
  }

  public isPointInStroke(x: number, y: number): boolean;
  public isPointInStroke(path: Path2D, x: number, y: number): boolean;
  public isPointInStroke(): boolean {
    throw new Error("Method not implemented.");
  }

  // createConicGradient
  // filter
  // createImageData
  // getImageData
}
