import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

const numericKeypad = {
  "7": new Vector2(0, 0),
  "8": new Vector2(1, 0),
  "9": new Vector2(2, 0),
  "4": new Vector2(0, 1),
  "5": new Vector2(1, 1),
  "6": new Vector2(2, 1),
  "1": new Vector2(0, 2),
  "2": new Vector2(1, 2),
  "3": new Vector2(2, 2),
  "0": new Vector2(1, 3),
  A: new Vector2(2, 3),
} as const;
type NumericKeyPad = typeof numericKeypad;
type NumericButton = keyof NumericKeyPad;

const directionalKeypad = {
  "^": new Vector2(1, 0),
  A: new Vector2(2, 0),
  "<": new Vector2(0, 1),
  v: new Vector2(1, 1),
  ">": new Vector2(2, 1),
} as const;
type DirectionalKeyPad = typeof directionalKeypad;
type DirectionalButton = keyof DirectionalKeyPad;

type Paths = Record<string, Record<string, Set<string>>>;

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const paths: Paths = {};
  buildNumericKeypadPaths(paths);
  buildDirectionalKeypad(paths);

  let result = 0;
  for (const keys of input.split("\n")) {
    result += getShortestPath(keys, paths, 26) * parseInt(keys);
  }

  showInConstruction(ctx, result);
};

const getShortestPath = (keys: string, paths: Paths, depth: number, cache: Record<string, number> = {}): number => {
  if (depth === 0) {
    return keys.length;
  }
  const cacheKey = `${depth}-${keys}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  let total = 0;
  while (keys) {
    const subSequence = keys.substring(0, keys.indexOf("A") + 1);
    keys = keys.substring(keys.indexOf("A") + 1).trim();

    const subPaths = getPath(subSequence, paths);
    const min = Math.min(...subPaths.map((subPath) => getShortestPath(subPath, paths, depth - 1, cache)));
    total += min;
  }

  cache[cacheKey] = total;
  return total;
};

const getPath = (
  keys: string,
  paths: Paths,
  index = 0,
  prevKey: string = "A",
  currPath = "",
  result: string[] = []
) => {
  if (index === keys.length) {
    result.push(currPath);
  } else {
    for (const path of paths[prevKey][keys[index]]) {
      getPath(keys, paths, index + 1, keys[index], currPath + path + "A", result);
    }
  }

  return result;
};

const buildNumericKeypadPaths = (paths: Paths): Paths => {
  for (const from of Object.keys(numericKeypad)) {
    paths[from] ||= {};
    for (const to of Object.keys(numericKeypad)) {
      paths[from][to] ||= new Set<string>();
      paths[from][to] = paths[from][to].union(
        getNumericKeypadInstructions(numericKeypad[from as NumericButton], numericKeypad[to as NumericButton])
      );
    }
  }

  return paths;
};
const buildDirectionalKeypad = (paths: Paths): Paths => {
  for (const from of Object.keys(directionalKeypad)) {
    paths[from] ||= {};
    for (const to of Object.keys(directionalKeypad)) {
      paths[from][to] ||= new Set<string>();
      paths[from][to] = paths[from][to].union(
        getDirectionalKeypadInstructions(
          directionalKeypad[from as DirectionalButton],
          directionalKeypad[to as DirectionalButton]
        )
      );
    }
  }

  return paths;
};

const getNumericKeypadInstructions = (from: Vector2, to: Vector2): Set<string> => {
  let res: string[] = [];
  let res2: string[] = [];
  const currentPos = from.copy();
  let currentPos2 = currentPos.copy();

  if (currentPos.y === 3 && to.x === 0) {
    while (currentPos.y !== to.y) {
      currentPos.y--;
      currentPos2.y--;
      res.push("^");
      res2.push("^");
    }
  } else if (currentPos.x === 0 && to.y === 3) {
    while (currentPos.x !== to.x) {
      currentPos.x++;
      currentPos2.x++;
      res.push(">");
      res2.push(">");
    }
  }
  while (currentPos2.x !== to.x) {
    const direction = Math.sign(to.x - currentPos2.x);
    currentPos2.x += direction;
    res2.push(direction < 0 ? "<" : ">");
  }
  while (currentPos2.y !== to.y) {
    const direction = Math.sign(to.y - currentPos2.y);
    currentPos2.y += direction;
    res2.push(direction < 0 ? "^" : "v");
  }

  while (currentPos.y !== to.y) {
    const direction = Math.sign(to.y - currentPos.y);
    currentPos.y += direction;
    res.push(direction < 0 ? "^" : "v");
  }
  while (currentPos.x !== to.x) {
    const direction = Math.sign(to.x - currentPos.x);
    currentPos.x += direction;
    res.push(direction < 0 ? "<" : ">");
  }

  return new Set([res.join(""), res2.join("")]);
};

const getDirectionalKeypadInstructions = (from: Vector2, to: Vector2): Set<string> => {
  let currentPos = from.copy();
  let res: string[] = [];
  let currentPos2 = currentPos.copy();
  let res2: string[] = [];

  if (currentPos.y === 0 && to.x === 0) {
    while (currentPos.y !== to.y) {
      currentPos.y++;
      currentPos2.y++;
      res.push("v");
      res2.push("v");
    }
  } else if (currentPos.x === 0 && to.y === 0) {
    while (currentPos.x !== to.x) {
      currentPos.x++;
      currentPos2.x++;
      res.push(">");
      res2.push(">");
    }
  }

  while (currentPos2.x !== to.x) {
    const direction = Math.sign(to.x - currentPos2.x);
    currentPos2.x += direction;
    res2.push(direction < 0 ? "<" : ">");
  }
  while (currentPos2.y !== to.y) {
    const direction = Math.sign(to.y - currentPos2.y);
    currentPos2.y += direction;
    res2.push(direction < 0 ? "^" : "v");
  }

  while (currentPos.y !== to.y) {
    const direction = Math.sign(to.y - currentPos.y);
    currentPos.y += direction;
    res.push(direction < 0 ? "^" : "v");
  }
  while (currentPos.x !== to.x) {
    const direction = Math.sign(to.x - currentPos.x);
    currentPos.x += direction;
    res.push(direction < 0 ? "<" : ">");
  }

  return new Set([res.join(""), res2.join("")]);
};
