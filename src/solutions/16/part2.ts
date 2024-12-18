import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

const directions = ["E", "W", "N", "S"] as const;
type Direction = (typeof directions)[number];

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const grid = input.split("\n").map((row) => row.trim().split(""));

  let [start, end] = getStartAndEndPositions(grid);
  grid[start.y][start.x] = ".";
  grid[end.y][end.x] = ".";

  const result = findWay(grid, start, end);
  const partsOfBestPaths = new Set<string>();

  let last: Node[] = result ? [result] : [];
  while (last.length) {
    const nextLast: Node[] = [];

    for (const node of last) {
      partsOfBestPaths.add(node.position.toString());
      nextLast.push(...node.prev);
    }

    last = nextLast;
  }

  showInConstruction(ctx, partsOfBestPaths.size);
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
  prev: Node[];
}

const findWay = (grid: string[][], startingPosition: Vector2, target: Vector2): Node | undefined => {
  const visited: Record<string, Node> = {};
  const startingNode: Node = {
    cost: 0,
    direction: "E",
    position: startingPosition,
    prev: [],
  };
  visited[`${startingPosition.toString()},${startingNode.direction}`] = startingNode;

  let toCheck = [startingNode];
  while (toCheck.length) {
    const nextCheck: Node[] = [];

    for (const node of toCheck) {
      for (const direction of directions) {
        const nextPosition = node.position.add(directionToDelta[direction]);
        if (grid[nextPosition.y][nextPosition.x] !== ".") continue;

        const nextNode = getNextNode(node, nextPosition, direction);
        const nodeKey = `${nextNode.position.toString()},${nextNode.direction}`;
        const existingNode = visited[nodeKey];

        if (existingNode && existingNode.cost == nextNode.cost) {
          existingNode.prev.push(node);
        }
        if (!existingNode || existingNode.cost > nextNode.cost) {
          visited[nodeKey] = nextNode;
          nextCheck.push(nextNode);
        }
      }
    }

    toCheck = nextCheck;
  }

  return Object.values(visited)
    .sort((a, b) => a.cost - b.cost)
    .find((v) => v.position.equals(target));
};

const getNextNode = (parent: Node, nextPosition: Vector2, direction: Direction): Node => {
  if (direction === parent.direction) {
    return {
      cost: parent.cost + 1,
      direction,
      position: nextPosition,
      prev: [parent],
    };
  }

  const cost = parent.cost + (direction === oppositeDirection[parent.direction] ? 2000 : 1000);

  return {
    cost,
    direction,
    position: parent.position,
    prev: [parent],
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
