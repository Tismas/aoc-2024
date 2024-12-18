import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const obstacles: Vector2[] = [];
  const mapSize = 71;

  for (const line of input.split("\n")) {
    const [x, y] = line.split(",").map(Number);
    obstacles.push(new Vector2(x, y));
  }

  let lowerBound = 1024;
  let upperBound = obstacles.length;
  let currentGuess = Math.floor((lowerBound + upperBound) / 2);
  while (lowerBound < upperBound) {
    const limitedObstacles = obstacles.slice(0, currentGuess);

    const path = pathFind(
      new Vector2(0, 0),
      new Vector2(70, 70),
      mapSize,
      (pos) => !!limitedObstacles.find((o) => o.equals(pos))
    );

    if (path) {
      console.log(`path found for ${currentGuess}`);
      lowerBound = currentGuess + 1;
    } else {
      console.log(`path not found for ${currentGuess}`);
      upperBound = currentGuess;
    }
    currentGuess = Math.floor((lowerBound + upperBound) / 2);
  }

  showInConstruction(ctx, obstacles[upperBound - 1].toString());
};

interface Node {
  position: Vector2;
  parent: Node | null;
  cost: number;
  distanceFromGoal: number;
}

const pathFind = (
  from: Vector2,
  goal: Vector2,
  mapSize: number,
  isObstacle: (pos: Vector2) => boolean
): Node[] | null => {
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
      if (isObstacle(position) || position.x < 0 || position.y < 0 || position.x >= mapSize || position.y >= mapSize) {
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
