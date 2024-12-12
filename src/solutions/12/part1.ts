import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

interface Plot {
  plant: string;
  visited: boolean;
}

interface Region {
  size: number;
  perimeter: number;
  plant: string;
}

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const garden = input.split("\n").map((row) => row.split("").map((plant): Plot => ({ plant, visited: false })));
  const regions: Region[] = [];

  garden.forEach((row, y) => {
    row.forEach((plot, x) => {
      if (!plot.visited) {
        regions.push(getRegion(garden, new Vector2(x, y)));
      }
    });
  });

  showInConstruction(
    ctx,
    regions.reduce((acc, region) => acc + region.perimeter * region.size, 0)
  );
};

const getRegion = (garden: Plot[][], startLocation: Vector2, size = 1, perimeter = 0): Region => {
  const height = garden.length;
  const width = garden[0].length;
  const startingPlot = garden[startLocation.y][startLocation.x];
  startingPlot.visited = true;

  for (const neighbour of startLocation.getAdjacent()) {
    if (!neighbour.isInBound(0, width - 1, 0, height - 1)) {
      perimeter++;
      continue;
    }
    const plot = garden[neighbour.y][neighbour.x];
    if (plot.plant === startingPlot.plant) {
      if (plot.visited) continue;
      const region = getRegion(garden, neighbour);
      size += region.size;
      perimeter += region.perimeter;
    } else {
      perimeter++;
    }
  }

  return { size, perimeter, plant: startingPlot.plant };
};
