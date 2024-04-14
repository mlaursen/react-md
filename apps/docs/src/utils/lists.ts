export const chunk = <T>(list: readonly T[], size: number): readonly T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    result.push(list.slice(i, i + size));
  }

  return result;
};
