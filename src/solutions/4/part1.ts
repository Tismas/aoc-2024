import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

export const part1 = (ctx: CanvasRenderingContext2D) => {
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

  const middle = new Vector2(ctx.canvas.width / 2, ctx.canvas.height / 2);
  const resultAnimation = new AnimatedLabel({
    ctx,
    label: `Animation in construction... Result for example input: ${result}`,
    position: middle,
    opacity: 0,
  }).animateOpacity(1, 1000);

  runAnimation(ctx, [resultAnimation]);
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
