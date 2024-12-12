import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { groupBy } from "../../helpers/array";
import { Vector2 } from "../../helpers/Vector2";

interface Plot {
  plant: string;
  visited: boolean;
}

interface Region {
  size: number;
  perimeter: number;
  plant: string;
  plots: Vector2[];
}

interface Edge {
  index: number;
  side: "before" | "after";
}

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const garden = input.split("\n").map((row) => row.split("").map((plant): Plot => ({ plant, visited: false })));
  const regions: Region[] = [];

  garden.forEach((row, y) => {
    row.forEach((plot, x) => {
      if (!plot.visited) {
        regions.push(getRegion(garden, new Vector2(x, y)));
      }
    });
  });

  let sum = 0;
  for (const region of regions) {
    const rows = groupBy(region.plots, (plot) => plot.y);
    const columns = groupBy(region.plots, (plot) => plot.x);

    const edgesX = getEdges(rows, (plot) => plot.x);
    const edgesY = getEdges(columns, (plot) => plot.y);

    const sidesX = getSides(edgesX);
    const sidesY = getSides(edgesY);
    const sides = sidesX + sidesY;

    sum += region.size * sides;
  }

  showInConstruction(ctx, sum);
};

const getRegion = (
  garden: Plot[][],
  startLocation: Vector2,
  plots: Vector2[] = [startLocation],
  size = 1,
  perimeter = 0
): Region => {
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
      plots.push(...region.plots);
    } else {
      perimeter++;
    }
  }

  return { size, perimeter, plots, plant: startingPlot.plant };
};

const getEdges = (elements: Vector2[][], by: (plot: Vector2) => number): Array<Array<Edge>> => {
  const edges: Array<Array<Edge>> = [];

  elements.forEach((el, y) => {
    const sides = new Array<Edge>();
    for (const plot of el.toSorted((a, b) => by(a) - by(b))) {
      const value = by(plot);
      const connectedSide = sides.find((edge) => edge.index === value && edge.side === "after");
      if (connectedSide) {
        sides.splice(sides.indexOf(connectedSide), 1);
      } else {
        sides.push({ index: value - 1, side: "before" });
      }
      sides.push({ index: value + 1, side: "after" });
    }
    edges[y] = sides;
  });

  return edges;
};

const getSides = (edges: Array<Array<Edge>>): number => {
  let sides = edges[0].length;

  for (let i = 1; i < edges.length; i++) {
    const prevEdges = edges[i - 1];
    const curEdges = edges[i];
    for (const edge of curEdges) {
      const sameEdge = prevEdges.find((e) => e.index === edge.index && e.side === edge.side);
      if (!sameEdge) {
        sides++;
      }
    }
  }

  return sides;
};
