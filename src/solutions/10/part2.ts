import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const map = input.split("\n").map((row) => row.split("").map(Number));

  let sum = 0;

  map.forEach((row, y) => {
    row.forEach((height, x) => {
      if (height === 0) {
        sum += getTrailScore(map, new Vector2(x, y));
      }
    });
  });

  showInConstruction(ctx, sum);
};

const getTrailScore = (map: number[][], pos: Vector2, score = 0): number => {
  const currentHeight = map[pos.y][pos.x];

  if (currentHeight === 9) {
    return 1;
  }

  getValidNeighbors(map, pos, currentHeight).forEach((neighbour) => {
    score += getTrailScore(map, neighbour);
  });

  return score;
};

const getValidNeighbors = (map: number[][], currentPosition: Vector2, currentHeight: number): Vector2[] => {
  const neighbors = [];
  const width = map[0].length;
  const height = map.length;

  for (const move of [new Vector2(-1, 0), new Vector2(1, 0), new Vector2(0, -1), new Vector2(0, 1)]) {
    const pos = currentPosition.add(move);

    if (pos.isInBound(0, width - 1, 0, height - 1) && map[pos.y][pos.x] === currentHeight + 1) {
      neighbors.push(pos);
    }
  }

  return neighbors;
};
