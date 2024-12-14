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

export const range = (min: number, max: number, step = 1): number[] => {
  const result = [];

  for (let i = min; i < max; i += step) {
    result.push(i);
  }

  return result;
};

export const chunk = <T>(arr: Array<T>, chunksCount: number): Array<Array<T>> => {
  const chunkSize = arr.length / chunksCount;
  const chunks = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }

  return chunks;
};

export const groupBy = <T>(arr: Array<T>, by: (el: T) => string | number): Record<string, T[]> => {
  const groups: Record<string, T[]> = {};

  arr.forEach((el) => {
    const index = by(el);
    groups[index] ||= [];
    groups[index].push(el);
  });

  return groups;
};
