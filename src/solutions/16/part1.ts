import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

const directions = ["E", "W", "N", "S"] as const;
type Direction = (typeof directions)[number];

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const grid = input.split("\n").map((row) => row.trim().split(""));

  let [start, end] = getStartAndEndPositions(grid);
  grid[start.y][start.x] = ".";
  grid[end.y][end.x] = ".";

  const result = findWay(grid, start, end);

  showInConstruction(ctx, result.cost);
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

interface Node {
  cost: number;
  direction: Direction;
  position: Vector2;
  prev: Node | null;
}

const findWay = (grid: string[][], startingPosition: Vector2, target: Vector2): Node => {
  const nodes: Record<string, Node> = {};
  const startingNode: Node = {
    cost: 0,
    direction: "E",
    position: startingPosition,
    prev: null,
  };
  nodes[startingPosition.toString()] = startingNode;

  let toCheck = [startingNode];
  while (toCheck.length) {
    const nextCheck: Node[] = [];

    for (const node of toCheck) {
      for (const direction of directions) {
        const nextNode = getNextNodeInDirection(node, direction);
        if (grid[nextNode.position.y][nextNode.position.x] !== ".") continue;

        const existingNode = nodes[nextNode.position.toString()];
        if (!existingNode || existingNode.cost > nextNode.cost) {
          nodes[nextNode.position.toString()] = nextNode;
          nextCheck.push(nextNode);
        }
      }
    }

    toCheck = nextCheck;
  }

  return nodes[target.toString()];
};

const getNextNodeInDirection = (node: Node, direction: Direction): Node => {
  const cost =
    node.cost + (direction === node.direction ? 1 : direction === oppositeDirection[node.direction] ? 2001 : 1001);
  const position = node.position.add(directionToDelta[direction]);

  return {
    cost,
    direction,
    position,
    prev: node,
  };
};

const directionToDelta: Record<Direction, Vector2> = {
  W: new Vector2(-1, 0),
  E: new Vector2(1, 0),
  N: new Vector2(0, -1),
  S: new Vector2(0, 1),
};

const oppositeDirection: Record<Direction, Direction> = {
  W: "E",
  N: "S",
  E: "W",
  S: "N",
};
