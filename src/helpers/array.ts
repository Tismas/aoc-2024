export const zip = <E>(...arrays: Array<Array<E>>) => {
  const result = [];

  for (let i = 0; i < arrays[0].length; i++) {
    result[i] = [] as Array<E>;
    for (let j = 0; j < arrays.length; j++) {
      result[i][j] = arrays[j][i];
    }
  }

  return result;
};

export const sum = (arr: number[]): number => {
  return arr.reduce((acc, v) => acc + v, 0);
};
