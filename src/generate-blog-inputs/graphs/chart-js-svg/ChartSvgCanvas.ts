import { SvgCanvas } from "https://esm.sh/stable/red-agate-svg-canvas@0.5.0";

/**
 * Augments SvgCanvas to support specifics of ChartJS renderings
 */
export class ChartSvgCanvas extends SvgCanvas {
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
  public override measureText(text: string): { width: number; } {
    // So,  replace null with empty string.
    return super.measureText(text || "");
  }
}
