import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { sum } from "../../helpers/array";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

export const part1 = (ctx: CanvasRenderingContext2D) => {
  const validMultiplications = [
    ...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g),
  ];
  const products = validMultiplications.map(([_, a, b]) => {
    return Number(a) * Number(b);
  });

  const middle = new Vector2(ctx.canvas.width / 2, ctx.canvas.height / 2);
  const result = new AnimatedLabel({
    ctx,
    label: `Animation in construction... Result for example input: ${sum(
      products
    )}`,
    position: middle,
    opacity: 0,
  }).animateOpacity(1, 1000);

  runAnimation(ctx, [result]);
};
