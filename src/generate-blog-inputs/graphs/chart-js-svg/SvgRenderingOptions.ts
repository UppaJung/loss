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
