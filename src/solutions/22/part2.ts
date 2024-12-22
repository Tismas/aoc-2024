import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { sum } from "../../helpers/array";

const sequences: Record<string, number[]> = {};

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const initialPrices = input.split("\n").map(BigInt);

  for (const priceIndex in initialPrices) {
    let price = initialPrices[priceIndex];
    let seq = [];
    for (let i = 0; i < 2000; i++) {
      const nextPrice = calculateNextPrice(price);
      const diff = (nextPrice % 10n) - (price % 10n);
      seq.push(diff);
      if (seq.length > 4) seq.shift();
      price = nextPrice;

      if (seq.length === 4) {
        sequences[seq.join(",")] ||= [];
        sequences[seq.join(",")][priceIndex] ||= Number(price % 10n);
      }
    }
  }

  let maxBananams = 0;
  for (const bananams of Object.values(sequences)) {
    const s = sum(bananams);
    if (s > maxBananams) {
      maxBananams = s;
    }
  }

  showInConstruction(ctx, maxBananams);
};

const calculateNextPrice = (price: bigint): bigint => {
  price ^= price * 64n;
  price %= 16777216n;

  price ^= price / 32n;
  price %= 16777216n;

  price ^= price * 2048n;
  price %= 16777216n;

  return price;
};
