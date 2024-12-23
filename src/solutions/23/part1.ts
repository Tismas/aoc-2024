import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const network: Record<string, string[]> = {};

  for (const line of input.split("\n")) {
    const [computerA, computerB] = line.split("-");
    network[computerA] ||= [];
    network[computerA].push(computerB);
    network[computerB] ||= [];
    network[computerB].push(computerA);
  }

  let threeWithT = new Set<string>();
  const computersStartingWithT = Object.keys(network).filter((computer) => computer.startsWith("t"));
  for (const computer of computersStartingWithT) {
    const connections = network[computer];
    for (const connection of connections) {
      const secondConnections = network[connection];
      for (const secondConnection of secondConnections) {
        const thirdConnections = network[secondConnection];
        if (thirdConnections.includes(computer)) {
          threeWithT.add([computer, connection, secondConnection].sort((a, b) => a.localeCompare(b)).join(","));
        }
      }
    }
  }

  showInConstruction(ctx, threeWithT.size);
};
