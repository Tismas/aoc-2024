import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

export const part2 = (ctx: CanvasRenderingContext2D) => {
  const [rawOrdering, rawUpdates] = input.split("\n\n");

  const ordering = rawOrdering
    .split("\n")
    .map((order) => order.split("|").map(Number));
  const updates = rawUpdates
    .split("\n")
    .map((update) => update.split(",").map(Number));

  let sum = 0;
  for (const update of updates) {
    if (!isCorrect(update, ordering)) {
      const fixedUpdate = fixUpdate(update, ordering);
      sum += fixedUpdate[Math.floor(update.length / 2)];
    }
  }

  const middle = new Vector2(ctx.canvas.width / 2, ctx.canvas.height / 2);
  const resultAnimation = new AnimatedLabel({
    ctx,
    label: `Animation in construction... Result for example input: ${sum}`,
    position: middle,
    opacity: 0,
  }).animateOpacity(1, 1000);

  runAnimation(ctx, [resultAnimation]);
};

const isCorrect = (update: number[], ordering: number[][]): boolean => {
  for (const order of ordering) {
    const [before, after] = order;

    if (
      update.includes(after) &&
      update.indexOf(before) > update.indexOf(after)
    ) {
      return false;
    }
  }
  return true;
};

const fixUpdate = (update: number[], ordering: number[][]): number[] => {
  const fixed = [...update];

  for (const order of ordering) {
    const [before, after] = order;
    if (
      update.includes(after) &&
      update.indexOf(before) > update.indexOf(after)
    ) {
      fixed.splice(fixed.indexOf(before), 1);
      fixed.splice(fixed.indexOf(after), 0, before);
    }
  }

  if (isCorrect(fixed, ordering)) {
    return fixed;
  } else {
    return fixUpdate(fixed, ordering);
  }

  // return [...update].sort((a, b) => {
  //   for (const order of ordering) {
  //     const [before, after] = order;
  //     if (a === after && b === before) return -1;
  //     if (a === before && b === after) return 1;
  //   }
  //   return 0;
  // });
};
