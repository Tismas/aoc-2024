import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const entries = input.split("\n\n");
  const keys: number[][] = [];
  const locks: number[][] = [];

  entries.forEach((entry) => {
    if (entry[0][0] === "#") {
      locks.push(getHeights(entry.split("\n")));
    } else {
      keys.push(getHeights(entry.split("\n").toReversed()));
    }
  });

  let res = 0;
  for (const key of keys) {
    for (const lock of locks) {
      if (fits(key, lock)) res++;
    }
  }

  showInConstruction(ctx, res);
};

const getHeights = (rows: string[]): number[] => {
  const res = [0, 0, 0, 0, 0];

  for (let i = 1; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === "#") res[j]++;
    }
  }

  return res;
};

const fits = (key: number[], lock: number[]) => {
  for (let i = 0; i < key.length; i++) {
    if (key[i] + lock[i] > 5) return false;
  }
  return true;
};
