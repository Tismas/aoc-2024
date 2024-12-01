import { Animatable, Drawable } from "./Traits";

export const runAnimation = (
  ctx: CanvasRenderingContext2D,
  animatedElements: Array<Animatable>,
  staticElements: Array<Drawable> = []
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const tick = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      staticElements.forEach((element) => element.draw(ctx));

      const done = animatedElements
        .map((element) => element.tick())
        .every(Boolean);
      if (!done) requestAnimationFrame(tick);
      else resolve();
    };
    tick();
  });
};
