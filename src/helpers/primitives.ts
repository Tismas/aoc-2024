export const isNumeric = (str: string): boolean => {
  return !Number.isNaN(Number(str));
};
