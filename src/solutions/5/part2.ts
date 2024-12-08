import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import input from "./input.txt?raw";

export const part2 = (ctx: CanvasRenderingContext2D) => {
  const [rawOrdering, rawUpdates] = input.split("\n\n");

  const ordering = rawOrdering
    .split("\n")
    .map((order) => order.split("|").map(Number));
  const updates = rawUpdates
    .split("\n")
    .map((update) => update.split(",").map(Number));

  let result = 0;
  for (const update of updates) {
    if (!isCorrect(update, ordering)) {
      const fixedUpdate = fixUpdate(update, ordering);
      result += fixedUpdate[Math.floor(update.length / 2)];
    }
  }

  showInConstruction(ctx, result);
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
