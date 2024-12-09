import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { sum } from "../../helpers/array";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  let enabled = true;
  const commands = [
    ...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g),
  ];
  const result = commands.map(([command, a, b]) => {
    if (command.includes("don't")) {
      enabled = false;
      return 0;
    }
    if (command.includes("do")) {
      enabled = true;
      return 0;
    }
    if (!enabled) return 0;
    return Number(a) * Number(b);
  });

  showInConstruction(ctx, sum(result));
};
