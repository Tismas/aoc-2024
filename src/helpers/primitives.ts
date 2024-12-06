export const isNumeric = (str: string): boolean => {
  return !Number.isNaN(Number(str));
};

export const isBetween = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
