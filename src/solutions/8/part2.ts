import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const antennas: Record<string, Vector2[]> = {};

  const map = input.split("\n").map((row) => row.trim());
  map.forEach((row, y) => {
    row.split("").forEach((node, x) => {
      if (node !== ".") {
        antennas[node] ||= [];
        antennas[node].push(new Vector2(x, y));
      }
    });
  });

  let antinodes = new Set<string>();
  for (const positions of Object.values(antennas)) {
    antinodes = antinodes.union(
      getAntinodes(positions, map[0].length, map.length)
    );
  }

  showInConstruction(ctx, antinodes.size);
};

const getAntinodes = (
  positions: Vector2[],
  width: number,
  height: number
): Set<string> => {
  const antinodes = new Set<string>();

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const delta = positions[i].subtract(positions[j]);

      for (
        let k = 0, antinode = positions[i].add(delta.multiply(k));
        antinode.isInBound(0, width - 1, 0, height - 1);
        k++
      ) {
        antinodes.add(antinode.toString());
        antinode = positions[i].add(delta.multiply(k));
      }
      for (
        let k = 0, antinode = positions[j].subtract(delta.multiply(k));
        antinode.isInBound(0, width - 1, 0, height - 1);
        k++
      ) {
        antinodes.add(antinode.toString());
        antinode = positions[j].subtract(delta.multiply(k));
      }
    }
  }

  return antinodes;
};
