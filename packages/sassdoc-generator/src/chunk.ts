export const chunk = <T>(list: readonly T[], size = 20): readonly T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i <= list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }

  return chunks;
};
