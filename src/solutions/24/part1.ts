import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

type Gate = "AND" | "OR" | "XOR";
interface Equation {
  a: string;
  b: string;
  gate: Gate;
  out: string;
}
type Values = Record<string, number>;

const calculator: Record<Gate, (a: number, b: number) => number> = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
};

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawValues, rawEquations] = input.split("\n\n");

  const values = rawValues.split("\n").reduce(parseValue, {});
  let equations = rawEquations.split("\n").map(parseEquation);

  while (equations.length > 0) {
    equations = equations.filter(({ a, b, gate, out }) => {
      if (values[a] !== undefined && values[b] !== undefined) {
        values[out] = calculator[gate](values[a], values[b]);
        return false;
      }
      return true;
    });
  }

  const result = Object.entries(values)
    .filter(([name]) => name.startsWith("z"))
    .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
    .map(([_, value]) => value)
    .toReversed()
    .join("");

  showInConstruction(ctx, parseInt(result, 2));
};

const parseValue = (acc: Values, row: string) => {
  const [name, value] = row.split(": ");
  acc[name] = Number(value);
  return acc;
};

const parseEquation = (row: string): Equation => {
  const groups = row.match(/(?<a>\w+) (?<gate>\w+) (?<b>\w+) -> (?<out>\w+)/)?.groups;
  if (!groups) throw new Error("Failed to parse equation");
  return groups as unknown as Equation;
};
