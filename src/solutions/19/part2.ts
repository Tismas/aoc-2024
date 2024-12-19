import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawAvailablePatterns, rawDesiredPatterns] = input.split("\n\n");
  const availablePatterns = rawAvailablePatterns.split(", ");
  const desiredPatterns = rawDesiredPatterns.split("\n");
  availablePatterns.sort((a, b) => b.length - a.length);

  let result = 0;

  for (const desiredPattern of desiredPatterns) {
    result += countPossiblePatterns(desiredPattern, availablePatterns);
  }

  showInConstruction(ctx, result);
};

const cache: Record<string, number> = {};

const countPossiblePatterns = (desiredPattern: string, availablePatterns: string[]): number => {
  if (desiredPattern.length === 0) return 1;
  if (cache[desiredPattern]) return cache[desiredPattern];

  let possiblePatterns = 0;
  for (const pattern of availablePatterns) {
    if (desiredPattern.startsWith(pattern)) {
      possiblePatterns += countPossiblePatterns(desiredPattern.replace(pattern, ""), availablePatterns);
    }
  }
  cache[desiredPattern] = possiblePatterns;

  return possiblePatterns;
};
