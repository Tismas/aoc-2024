import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawOrdering, rawUpdates] = input.split("\n\n");

  const ordering = rawOrdering
    .split("\n")
    .map((order) => order.split("|").map(Number));
  const updates = rawUpdates
    .split("\n")
    .map((update) => update.split(",").map(Number));

  let result = 0;
  for (const update of updates) {
    if (isCorrect(update, ordering)) {
      result += update[Math.floor(update.length / 2)];
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
