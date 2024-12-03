import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { sum } from "../../helpers/array";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

export const part2 = (ctx: CanvasRenderingContext2D) => {
  let enabled = true;
  const commands = [
    ...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g),
  ];
  const products = commands.map(([command, a, b]) => {
    if (command.includes("don't")) {
      enabled = false;
      return 0;
    }
    if (command.includes("do")) {
      enabled = true;
      return 0;
    }
    if (!enabled) return 0;
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
