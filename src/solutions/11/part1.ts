import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { chunk, range, sum } from "../../helpers/array";

interface Stone {
  occurrences: number;
  nextOccurrences: number;
  value: number;
}

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const stones: Array<Stone> = input
    .split(" ")
    .map(Number)
    .map((value) => ({ value, occurrences: 1, nextOccurrences: 1 }));

  for (const _ of range(0, 25)) {
    for (const stone of [...stones]) {
      if (stone.occurrences === 0) continue;
      stone.nextOccurrences -= stone.occurrences;
      for (const nextStone of getNumberOfStones(stone.value)) {
        const existing = stones.find((s) => s.value === nextStone);
        if (existing) existing.nextOccurrences += stone.occurrences;
        else {
          stones.push({
            value: nextStone,
            occurrences: stone.occurrences,
            nextOccurrences: stone.occurrences,
          });
        }
      }
    }

    for (const stone of stones) stone.occurrences = stone.nextOccurrences;
  }

  showInConstruction(ctx, sum(stones.map((stone) => stone.occurrences)));
};

const cache = new Map<number, number[]>([
  [0, [1]],
  [1, [2024]],
]);

const getNumberOfStones = (stone: number): number[] => {
  const cached = cache.get(stone);
  if (cached) return cached;

  if (String(stone).length % 2 === 0) {
    const [left, right] = chunk(Array.from(String(stone)), 2);
    cache.set(stone, [Number(left.join("")), Number(right.join(""))]);
  } else {
    cache.set(stone, [stone * 2024]);
  }

  return getNumberOfStones(stone);
};
