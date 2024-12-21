import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const grid = input.split("\n");
  const [start, end] = getStartAndEndPositions(grid);

  const path = pathFind(start, end, (pos) => grid[pos.y][pos.x] === "#");
  if (!path) {
    showInConstruction(ctx, "Not found");
    return;
  }
  const cheatRange = 2;
  const minSavedTime = 100;
  let validShortcuts = 0;
  for (let i = 0; i < path.length; i++) {
    for (let j = i + minSavedTime + 1; j < path.length; j++) {
      const distance = path[j].position.manhattanDistanceTo(path[i].position);
      const isInRange = distance <= cheatRange;
      const savedTime = j - i - distance;
      if (isInRange && savedTime >= minSavedTime) {
        validShortcuts++;
      }
    }
  }

  showInConstruction(ctx, validShortcuts);
};

const getStartAndEndPositions = (grid: string[]): [Vector2, Vector2] => {
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
  position: Vector2;
  parent: Node | null;
  cost: number;
  distanceFromGoal: number;
}

const pathFind = (from: Vector2, goal: Vector2, isObstacle: (pos: Vector2) => boolean): Node[] | null => {
  const toCheck: Record<string, Node> = {
    [from.toString()]: {
      position: from,
      cost: 0,
      distanceFromGoal: from.distanceTo(goal),
      parent: null,
    },
  };
  const visited: Record<string, Node> = { ...toCheck };

  while (Object.values(toCheck).length > 0) {
    const bestCandidate = getBestCandidate(toCheck);
    delete toCheck[bestCandidate.position.toString()];

    for (const position of bestCandidate.position.getAdjacent()) {
      if (isObstacle(position)) {
        continue;
      }
      const existingVisitedNode = visited[position.toString()];
      const existingToCheckNode = toCheck[position.toString()];

      const node: Node = {
        cost: bestCandidate.cost + 1,
        distanceFromGoal: position.distanceTo(goal),
        parent: bestCandidate,
        position,
      };

      if (position.equals(goal)) {
        return getPath(node);
      }

      if (existingVisitedNode && existingVisitedNode.cost > node.cost) {
        existingVisitedNode.cost = node.cost;
        existingVisitedNode.parent = node.parent;
      } else if (existingToCheckNode && existingToCheckNode.cost > node.cost) {
        existingToCheckNode.cost = node.cost;
        existingToCheckNode.parent = node.parent;
      } else if (!existingVisitedNode) {
        toCheck[position.toString()] = node;
        visited[position.toString()] = node;
      }
    }
  }

  return null;
};

const getBestCandidate = (toCheck: Record<string, Node>): Node => {
  const candidates = Object.values(toCheck);
  let bestCandidate = candidates[0];

  for (const candidate of candidates) {
    const total = candidate.cost + candidate.distanceFromGoal;
    if (total < bestCandidate.cost + bestCandidate.distanceFromGoal) {
      bestCandidate = candidate;
    }
  }

  return bestCandidate;
};

const getPath = (node: Node) => {
  const path: Node[] = [];

  let last: Node | null = node;
  while (last) {
    path.push(last);
    last = last.parent;
  }

  return path;
};
