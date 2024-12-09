import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { isBetween } from "../../helpers/primitives";
import { Vector2 } from "../../helpers/Vector2";

type Direction = "up" | "down" | "left" | "right";

interface Guard {
  position: Vector2;
  direction: Direction;
}

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const map = input.split("\n");
  const height = map.length;
  const width = map[0].length;
  const obstacles: Vector2[] = [];
  const guard: Guard = {
    position: new Vector2(-1, -1),
    direction: "up",
  };
  const visited = new Set<string>();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === "#") {
        obstacles.push(new Vector2(x, y));
      }
      if (map[y][x] === "^") {
        guard.position.x = x;
        guard.position.y = y;
      }
    }
  }

  while (
    isBetween(guard.position.x, 0, width - 1) &&
    isBetween(guard.position.y, 0, height - 1)
  ) {
    visited.add(`${guard.position.x},${guard.position.y}`);
    moveGuard(guard, obstacles);
  }

  showInConstruction(ctx, visited.size);
};

const moveGuard = (guard: Guard, obstacles: Vector2[]) => {
  const delta = movementDelta[guard.direction];
  const nextPosition = guard.position.add(delta);
  for (const obstaclePosition of obstacles) {
    if (nextPosition.equals(obstaclePosition)) {
      guard.direction = nextDirection[guard.direction];
      return moveGuard(guard, obstacles);
    }
  }
  guard.position = nextPosition;
};

const movementDelta: Record<Direction, Vector2> = {
  up: new Vector2(0, -1),
  right: new Vector2(1, 0),
  down: new Vector2(0, 1),
  left: new Vector2(-1, 0),
};
const nextDirection: Record<Direction, Direction> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};
