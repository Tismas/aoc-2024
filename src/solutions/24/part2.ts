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

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawValues, rawEquations] = input.split("\n\n");

  const initialValues = rawValues.split("\n").reduce(parseValue, {});
  const equations = rawEquations.split("\n").map(parseEquation);

  for (let i = 0; i < 45; i++) {
    initialValues[getKey("x", i)] = 0;
    initialValues[getKey("y", i)] = 0;
  }

  let susIndexes = [];
  for (let i = 0; i < 45; i++) {
    if (i > 0) {
      initialValues[getKey("x", i - 1)] = 0;
    }
    initialValues[getKey("x", i)] = 1;
    const values = runEquations({ ...initialValues }, [...equations]);
    const result = getNumber(values, "z");
    if (result !== Math.pow(2, i)) {
      susIndexes.push(i);
    }
  }

  showInConstruction(ctx, susIndexes.map((i) => getKey("z", i)).join(", "), "Sus nodes:");
};

const getKey = (letter: string, index: number) => `${letter}${index < 10 ? "0" : ""}${index}`;

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

const runEquations = (values: Values, equations: Equation[]) => {
  while (equations.length > 0) {
    equations = equations.filter(({ a, b, gate, out }) => {
      if (values[a] !== undefined && values[b] !== undefined) {
        values[out] = calculator[gate](values[a], values[b]);
        return false;
      }
      return true;
    });
  }

  return values;
};

const getNumber = (values: Values, register: string): number => {
  return parseInt(
    Object.entries(values)
      .filter(([name]) => name.startsWith(register))
      .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
      .map(([_, value]) => value)
      .toReversed()
      .join(""),
    2
  );
};
