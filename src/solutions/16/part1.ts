import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

type Direction = "E" | "W" | "N" | "S";
let visited: Record<string, number | undefined> = {};
let cheapest = Infinity;
const maxCost = 100_000;

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const grid = input.split("\n").map((row) => row.trim().split(""));

  let [start, end] = getStartAndEndPositions(grid);
  grid[start.y][start.x] = ".";
  grid[end.y][end.x] = ".";

  visited = {};
  cheapest = Infinity;
  const result = findWay(grid, start, end);

  showInConstruction(ctx, result);
};

const getStartAndEndPositions = (grid: string[][]): [Vector2, Vector2] => {
  let start: Vector2 | undefined, end: Vector2 | undefined;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "S") start = new Vector2(x, y);
      if (grid[y][x] === "E") end = new Vector2(x, y);
    }
  }

  if (!start || !end) throw new Error("Start or end not found");
  return [start, end];
};

const findWay = (
  grid: string[][],
  currentPos: Vector2,
  target: Vector2,
  direction: Direction = "E",
  cost = 0
): number => {
  const delta = directionToDelta[direction];
  const nextPos = currentPos.add(delta);

  const cacheKey = `${currentPos},${direction}`;
  const prevCost = visited[cacheKey];
  if ((prevCost && prevCost <= cost) || cost > Math.min(maxCost, cheapest)) return Infinity;
  visited[cacheKey] = cost;

  if (currentPos.equals(target)) {
    if (cheapest > cost) {
      cheapest = cost;
    }
    return cost;
  }

  if (grid[nextPos.y][nextPos.x] === "#") {
    return Math.min(
      findWay(grid, currentPos, target, clockwise[direction], cost + 1000),
      findWay(grid, currentPos, target, counterClockwise[direction], cost + 1000)
    );
  }

  return Math.min(
    findWay(grid, nextPos, target, direction, cost + 1),
    findWay(grid, currentPos, target, clockwise[direction], cost + 1000),
    findWay(grid, currentPos, target, counterClockwise[direction], cost + 1000)
  );
};

const directionToDelta: Record<Direction, Vector2> = {
  W: new Vector2(-1, 0),
  E: new Vector2(1, 0),
  N: new Vector2(0, -1),
  S: new Vector2(0, 1),
};

const clockwise: Record<Direction, Direction> = {
  W: "N",
  N: "E",
  E: "S",
  S: "W",
};
const counterClockwise: Record<Direction, Direction> = {
  W: "S",
  S: "E",
  E: "N",
  N: "W",
};
