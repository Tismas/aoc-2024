import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const grid = input.split("\n");

  let result = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x] === "A") {
        const isXMas = checkWord(grid, x, y);
        if (isXMas) {
          result += 1;
        }
      }
    }
  }

  showInConstruction(ctx, result);
};

const checkWord = (grid: string[], x: number, y: number): boolean => {
  try {
    const upLeft = grid[y + 1][x - 1];
    const upRight = grid[y + 1][x + 1];
    const downLeft = grid[y - 1][x - 1];
    const downRight = grid[y - 1][x + 1];

    const diagonals = [
      upLeft === "M" && downRight === "S",
      upRight === "M" && downLeft === "S",
      downLeft === "M" && upRight === "S",
      downRight === "M" && upLeft === "S",
    ];
    return diagonals.filter(Boolean).length === 2;
  } catch {
    return false;
  }
};
