import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawAvailablePatterns, rawDesiredPatterns] = input.split("\n\n");
  const availablePatterns = rawAvailablePatterns.split(", ");
  const desiredPatterns = rawDesiredPatterns.split("\n");
  availablePatterns.sort((a, b) => b.length - a.length);

  let result = 0;

  for (const desiredPattern of desiredPatterns) {
    if (isPatternPossible(desiredPattern, availablePatterns)) {
      result++;
    }
  }

  showInConstruction(ctx, result);
};

const isPatternPossible = (desiredPattern: string, availablePatterns: string[]): boolean => {
  if (desiredPattern.length === 0) return true;

  for (const pattern of availablePatterns) {
    if (desiredPattern.startsWith(pattern)) {
      if (isPatternPossible(desiredPattern.replace(pattern, ""), availablePatterns)) {
        return true;
      }
    }
  }

  return false;
};
