import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const grid = input.split("\n");
  const validWords = ["XMAS"];

  let result = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      for (const word of validWords) {
        if (grid[y][x] === word[0]) {
          result += checkWord(grid, word, x, y);
        }
      }
    }
  }

  showInConstruction(ctx, result);
};

const checkWord = (
  grid: string[],
  word: string,
  x: number,
  y: number
): number => {
  let res = 0;

  for (let deltaY = -1; deltaY <= 1; deltaY++) {
    for (let deltaX = -1; deltaX <= 1; deltaX++) {
      if (deltaX === 0 && deltaY === 0) continue;
      res += checkInDirection(grid, word, x, y, deltaX, deltaY);
    }
  }

  return res;
};

const checkInDirection = (
  grid: string[],
  word: string,
  startX: number,
  startY: number,
  deltaX: number,
  deltaY: number
): number => {
  for (let distance = 0; distance < word.length; distance++) {
    const x = startX + deltaX * distance;
    const y = startY + deltaY * distance;
    if (
      y < 0 ||
      x < 0 ||
      y >= grid.length ||
      x >= grid[0].length ||
      grid[y][x] !== word[distance]
    ) {
      return 0;
    }
  }
  return 1;
};
