
export type UnsupportedChartJsOptions = 
  "responsive" |
  "responsiveAnimationDuration" |
  "events" |
  "legendCallback" |
  "onHover" |
  "onClick" |
  "onResize" |
  "hover" |
  "animation";

/** Remove chart options that cannot be supported when rendering to SVG */
export type RemoveUnsupportedChartJsOptions<T> = Omit<T, UnsupportedChartJsOptions>;
