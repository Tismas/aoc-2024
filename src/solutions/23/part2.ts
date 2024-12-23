import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const network: Record<string, string[]> = {};

  for (const line of input.split("\n")) {
    const [computerA, computerB] = line.split("-");
    network[computerA] ||= [];
    network[computerA].push(computerB);
    network[computerB] ||= [];
    network[computerB].push(computerA);
  }

  let completeNetworks = new Set<string>(Object.keys(network));

  while (completeNetworks.size > 1) {
    let largerCompleteNetworks = new Set<string>();
    for (const completeNetwork of [...completeNetworks]) {
      const firstNode = completeNetwork.split(",")[0];
      const candidates = network[firstNode].filter((node) => !completeNetwork.includes(node));
      for (const candidate of candidates) {
        const largerNetwork = [...completeNetwork.split(","), candidate];
        if (isCompleteGraph(largerNetwork, network)) {
          largerCompleteNetworks.add(largerNetwork.sort((a, b) => a.localeCompare(b)).join(","));
        }
      }
    }
    completeNetworks = largerCompleteNetworks;
  }

  showInConstruction(ctx, [...completeNetworks][0]);
};

const isCompleteGraph = (connectedTo: string[], network: Record<string, string[]>): boolean => {
  return connectedTo.every((node) =>
    isConnectedToEveryNode(
      node,
      connectedTo.filter((n) => n !== node),
      network
    )
  );
};

const isConnectedToEveryNode = (node: string, others: string[], network: Record<string, string[]>): boolean => {
  for (const other of others) {
    if (!network[other].includes(node)) {
      return false;
    }
  }
  return true;
};
