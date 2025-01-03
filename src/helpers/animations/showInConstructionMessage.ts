import { Vector2 } from "../Vector2";
import { AnimatedLabel } from "./AnimatedLabel";
import { runAnimation } from "./runAnimations";

export const showInConstruction = (
  ctx: CanvasRenderingContext2D,
  result: number | string,
  label = "Animation in construction... Result for the input:"
) => {
  const middle = new Vector2(ctx.canvas.width / 2, ctx.canvas.height / 2);
  const resultAnimation = new AnimatedLabel({
    ctx,
    label: `${label} ${result}`,
    position: middle,
    opacity: 0,
  }).animateOpacity(1, 1000);

  console.log(result);
  runAnimation(ctx, [resultAnimation]);
};
