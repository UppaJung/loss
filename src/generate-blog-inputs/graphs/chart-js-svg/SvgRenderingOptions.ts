// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Modified (significantly enough that I deserve the blame) by Stuart Schechter under MIT License.
// (Original Deno code at https://github.com/denoland/fresh_charts/blob/312653853994b129905662c3df48260f2651ab96/core.ts)

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
  /** Passed to the rendering context
   *
   * Defaults to `2`.
  */
  fontHeightRatio?: number;
}
