export interface SvgRewritingOptions {
  /** CSS class for the <svg> element of the chart. */
  svgClass?: string;
  /** CSS style for the <svg> element of the chart */
  svgStyle?: string;
}

export function rewriteSvgString(svgString: string, { svgClass, svgStyle }: SvgRewritingOptions) {
  if (svgStyle) {
    svgString = svgString.replace(
      "<svg ",
      `<svg style="${svgStyle.replaceAll('"', "&quot;")}" `
    );
  }
  if (svgClass) {
    svgString = svgString.replace(
      "<svg ",
      `<svg class="${svgClass.replaceAll('"', "&quot;")}" `
    );
  }
  return svgString;
}
