import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const initialPrices = input.split("\n").map(BigInt);

  let result = 0n;
  for (const initialPrice of initialPrices) {
    let price = initialPrice;
    for (let i = 0; i < 2000; i++) {
      price = calculateNextPrice(price);
    }
    result += price;
  }

  showInConstruction(ctx, Number(result));
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
