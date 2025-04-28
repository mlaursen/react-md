interface Options {
  search: string;
  list: readonly string[];
}

export function caseInsensitiveSearch(options: Options): readonly string[] {
  const { list, search } = options;
  const q = search.toLowerCase().trim();
  if (!q) {
    return list;
  }

  return list.filter((item) => item.toLowerCase().trim().includes(q));
}
