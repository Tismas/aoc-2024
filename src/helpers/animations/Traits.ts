export interface Animatable {
  tick(): boolean;
  draw(ctx: CanvasRenderingContext2D): void;
  keepDrawingAfterAnimation: boolean;
}
