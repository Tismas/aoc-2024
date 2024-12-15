import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

type Move = "<" | "^" | ">" | "v";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawGrid, movements] = input.split("\n\n");
  const grid = rawGrid.split("\n").map((row) => row.trim().split(""));

  let robot = getInitialRobotPosition(grid);
  grid[robot.y][robot.x] = ".";

  for (const move of movements.replaceAll("\n", "")) {
    const delta = moveToDelta[move as Move];
    const moved = moveThing(grid, robot, delta);
    if (moved) {
      robot = robot.add(delta);
    }
  }

  let result = 0;
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "O") {
        result += y * 100 + x;
      }
    });
  });

  showInConstruction(ctx, result);
};

const getInitialRobotPosition = (grid: string[][]): Vector2 => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "@") return new Vector2(x, y);
    }
  }
  throw new Error("Robot not found");
};

const moveThing = (grid: string[][], currentPos: Vector2, delta: Vector2): boolean => {
  if (!canMove(grid, currentPos, delta)) return false;

  const target = currentPos.add(delta);
  if (grid[target.y][target.x] === "O") moveThing(grid, target, delta);
  grid[target.y][target.x] = grid[currentPos.y][currentPos.x];
  grid[currentPos.y][currentPos.x] = ".";

  return true;
};

const canMove = (grid: string[][], currentPos: Vector2, delta: Vector2): boolean => {
  const target = currentPos.add(delta);
  if (grid[target.y][target.x] === "#") return false;
  if (grid[target.y][target.x] === ".") return true;
  if (grid[target.y][target.x] === "O") return canMove(grid, target, delta);
  throw new Error(`Unknown state at ${target}`);
};

const moveToDelta: Record<Move, Vector2> = {
  "<": new Vector2(-1, 0),
  ">": new Vector2(1, 0),
  "^": new Vector2(0, -1),
  v: new Vector2(0, 1),
};
