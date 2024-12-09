import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { sum } from "../../helpers/array";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const validMultiplications = [
    ...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g),
  ];
  const result = validMultiplications.map(([_, a, b]) => {
    return Number(a) * Number(b);
  });

  showInConstruction(ctx, sum(result));
};
