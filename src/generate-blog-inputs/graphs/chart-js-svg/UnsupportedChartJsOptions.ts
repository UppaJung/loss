// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Modified (significantly enough that I deserve the blame) by Stuart Schechter under MIT License.
// (Original Deno code at https://github.com/denoland/fresh_charts/blob/312653853994b129905662c3df48260f2651ab96/core.ts)

export type ChartJsOptionsUnsupportedForSvgs = 
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
export type RemoveChartJsOptionsUnsupportedForSvgs<T> = Omit<T, ChartJsOptionsUnsupportedForSvgs>;
