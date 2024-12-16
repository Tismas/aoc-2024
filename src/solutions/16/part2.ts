import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

type Direction = "E" | "W" | "N" | "S";
let visited: Record<string, number | undefined> = {};
let bestPaths: Array<Set<string>> = [];
let cheapest = Infinity;
const maxCost = 100_000;

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const grid = input.split("\n").map((row) => row.trim().split(""));

  let [start, end] = getStartAndEndPositions(grid);
  grid[start.y][start.x] = ".";
  grid[end.y][end.x] = ".";

  visited = {};
  bestPaths = [];
  cheapest = Infinity;
  findWay(grid, start, end);
  const partOfBestPaths = bestPaths.reduce((acc, history) => acc.union(history), new Set<string>());

  showInConstruction(ctx, partOfBestPaths.size);
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
  cost = 0,
  history = new Set<string>()
): number => {
  const delta = directionToDelta[direction];
  const nextPos = currentPos.add(delta);

  const cacheKey = `${currentPos},${direction}`;
  const prevCost = visited[cacheKey];
  if ((prevCost && prevCost < cost) || cost > Math.min(cheapest, maxCost)) return Infinity;
  visited[cacheKey] = cost;

  history.add(currentPos.toString());
  if (currentPos.equals(target)) {
    if (cheapest > cost) {
      bestPaths = [history];
      cheapest = cost;
    } else if (cheapest === cost) {
      bestPaths.push(history);
    }
    return cost;
  }

  if (grid[nextPos.y][nextPos.x] === "#") {
    return Math.min(
      findWay(grid, currentPos, target, clockwise[direction], cost + 1000, new Set(history)),
      findWay(grid, currentPos, target, counterClockwise[direction], cost + 1000, new Set(history))
    );
  }

  return Math.min(
    findWay(grid, nextPos, target, direction, cost + 1, new Set(history)),
    findWay(grid, currentPos, target, clockwise[direction], cost + 1000, new Set(history)),
    findWay(grid, currentPos, target, counterClockwise[direction], cost + 1000, new Set(history))
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
