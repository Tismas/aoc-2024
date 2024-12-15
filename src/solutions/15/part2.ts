import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

type Move = "<" | "^" | ">" | "v";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawGrid, movements] = input.split("\n\n");
  const grid = rawGrid.split("\n").map((row) =>
    row
      .trim()
      .split("")
      .flatMap((cell) => {
        if (cell === "#") return ["#", "#"];
        if (cell === "O") return ["[", "]"];
        if (cell === ".") return [".", "."];
        if (cell === "@") return ["@", "."];
        return cell;
      })
  );

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
      if (cell === "[") {
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

const moveThing = (grid: string[][], currentPos: Vector2, delta: Vector2, check = true): boolean => {
  if (check && !canMove(grid, currentPos, delta)) return false;

  const target = currentPos.add(delta);
  if (isBox(grid[target.y][target.x])) {
    if (delta.x) {
      moveThing(grid, target.add(delta), delta);
      moveThing(grid, target, delta);
    } else {
      if (grid[target.y][target.x] === "[") {
        moveThing(grid, target.add(new Vector2(1, 0)), delta);
        moveThing(grid, target, delta, false);
      }
      if (grid[target.y][target.x] === "]") {
        moveThing(grid, target.add(new Vector2(-1, 0)), delta);
        moveThing(grid, target, delta, false);
      }
    }
  }

  grid[target.y][target.x] = grid[currentPos.y][currentPos.x];
  grid[currentPos.y][currentPos.x] = ".";

  return true;
};

const canMove = (grid: string[][], currentPos: Vector2, delta: Vector2): boolean => {
  const target = currentPos.add(delta);

  if (delta.y) {
    if (grid[target.y][target.x] === "[") {
      return canMove(grid, target, delta) && canMove(grid, target.add(new Vector2(1, 0)), delta);
    }
    if (grid[target.y][target.x] === "]") {
      return canMove(grid, target, delta) && canMove(grid, target.add(new Vector2(-1, 0)), delta);
    }
  }

  if (grid[target.y][target.x] === "#") return false;
  if (grid[target.y][target.x] === ".") return true;
  if (grid[target.y][target.x] === "[" || grid[target.y][target.x] === "]") return canMove(grid, target, delta);
  throw new Error(`Unknown state at ${target}`);
};

const moveToDelta: Record<Move, Vector2> = {
  "<": new Vector2(-1, 0),
  ">": new Vector2(1, 0),
  "^": new Vector2(0, -1),
  v: new Vector2(0, 1),
};

const isBox = (cell: string) => {
  return ["[", "]"].includes(cell);
};
