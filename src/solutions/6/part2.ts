import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { isBetween } from "../../helpers/primitives";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

type Direction = "up" | "down" | "left" | "right";

interface Guard {
  position: Vector2;
  direction: Direction;
}

export const part2 = (ctx: CanvasRenderingContext2D) => {
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
  const startingPosition = new Vector2(guard.position.x, guard.position.y);

  const loopObstacles = new Set<string>();
  while (
    isBetween(guard.position.x, 0, width - 1) &&
    isBetween(guard.position.y, 0, height - 1)
  ) {
    const obstacle = getLoopObstacle(guard, obstacles, visited);
    if (obstacle) {
      loopObstacles.add(obstacle);
    }

    visited.add(guard.position.toString());
    moveGuard(guard, obstacles);
  }

  loopObstacles.delete(startingPosition.toString());

  const middle = new Vector2(ctx.canvas.width / 2, ctx.canvas.height / 2);
  const resultAnimation = new AnimatedLabel({
    ctx,
    label: `Animation in construction... Result for example input: ${loopObstacles.size}`,
    position: middle,
    opacity: 0,
  }).animateOpacity(1, 1000);

  runAnimation(ctx, [resultAnimation]);
};

const moveGuard = (guard: Guard, obstacles: Vector2[]) => {
  const delta = movementDelta[guard.direction];
  const nextPosition = guard.position.add(delta);
  for (const obstaclePosition of obstacles) {
    if (nextPosition.equals(obstaclePosition)) {
      guard.direction = nextDirection[guard.direction];
      return;
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
const oppositeDirection: Record<Direction, Direction> = {
  up: "down",
  right: "left",
  down: "up",
  left: "right",
};

const getObstaclesInRow = (obstacles: Vector2[], y: number) => {
  return obstacles.filter((o) => o.y === y);
};
const getObstaclesInColumn = (obstacles: Vector2[], x: number) => {
  return obstacles.filter((o) => o.x === x);
};

const getNextObstacle = (
  obstacles: Vector2[],
  position: Vector2,
  direction: Direction
): Vector2 | null => {
  const obstaclesInRow = getObstaclesInRow(obstacles, position.y);
  const obstaclesInColumn = getObstaclesInColumn(obstacles, position.x);

  let optionsByDistance: Vector2[] = [];
  if (direction === "up") {
    optionsByDistance = obstaclesInColumn
      .filter((o) => o.y < position.y)
      .sort((a, b) => b.y - a.y);
  } else if (direction === "down") {
    optionsByDistance = obstaclesInColumn
      .filter((o) => o.y > position.y)
      .sort((a, b) => a.y - b.y);
  } else if (direction === "left") {
    optionsByDistance = obstaclesInRow
      .filter((o) => o.x < position.x)
      .sort((a, b) => b.x - a.x);
  } else {
    optionsByDistance = obstaclesInRow
      .filter((o) => o.x > position.x)
      .sort((a, b) => a.x - b.x);
  }
  return optionsByDistance[0] || null;
};

const getLoopObstacle = (
  guard: Guard,
  obstacles: Vector2[],
  visited: Set<string>
): string | null => {
  const delta = movementDelta[guard.direction];
  const firstObstacle = guard.position.add(delta);
  if (
    obstacles.filter((obstacle) => obstacle.equals(firstObstacle)).length > 0 ||
    visited.has(firstObstacle.toString())
  ) {
    return null;
  }

  const hitObstacles: string[] = [];
  let lastObstacle: Vector2 | null = firstObstacle;
  let direction = guard.direction;
  while (lastObstacle) {
    hitObstacles.push(`${lastObstacle},${direction}`);
    lastObstacle = getNextObstacle(
      [...obstacles, firstObstacle],
      lastObstacle.add(movementDelta[oppositeDirection[direction]]),
      nextDirection[direction]
    );
    direction = nextDirection[direction];
    if (lastObstacle && hitObstacles.includes(`${lastObstacle},${direction}`)) {
      return firstObstacle.toString();
    }
  }

  return null;
};
