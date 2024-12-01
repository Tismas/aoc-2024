export interface Animatable {
  tick(): boolean;
}

export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}
