import { Animatable } from "./Traits";

let runningAnimations: Array<Animatable> = [];
let staticContent: Array<Animatable> = [];

const drawAnimations = (
  ctx: CanvasRenderingContext2D,
  resolve: VoidFunction
) => {
  if (runningAnimations.length === 0) return resolve();

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  staticContent.forEach((element) => element.draw(ctx));

  const notDoneAnimations: Array<Animatable> = [];
  runningAnimations.forEach((animation) => {
    const done = animation.tick();
    if (!done) notDoneAnimations.push(animation);
    else if (animation.keepDrawingAfterAnimation) staticContent.push(animation);
  });
  runningAnimations = notDoneAnimations;

  requestAnimationFrame(() => drawAnimations(ctx, resolve));
};

export const runAnimation = (
  ctx: CanvasRenderingContext2D,
  animatedElements: Array<Animatable>
): Promise<void> => {
  runningAnimations.push(...animatedElements);

  return new Promise<void>((resolve) => {
    drawAnimations(ctx, resolve);
  });
};

export const clearCanvas = () => {
  runningAnimations = [];
  staticContent = [];
};

export const removeStaticContent = (toRemove: Animatable[]) => {
  staticContent = staticContent.filter(
    (content) => !toRemove.includes(content)
  );
};
