export interface GetNextThemeNameOptions {
  /**
   * expects: `(...)` or will just return
   */
  params: string;
  index: 0 | 1;
  rename: (themeName: string) => string;
}

export function getNextThemeName(options: GetNextThemeNameOptions): string {
  const { params, index, rename } = options;
  const openIndex = params.indexOf("(");
  const closeIndex = params.lastIndexOf(")");
  if (openIndex === -1 || closeIndex === -1) {
    return params;
  }

  const args = params.substring(openIndex + 1, closeIndex).split(",");
  const themeStyle = args[index]?.trim() ?? args[0]?.trim();
  if (!themeStyle) {
    return params;
  }

  const renamed = rename(themeStyle);
  if (renamed === themeStyle) {
    return params;
  }

  args[index] = renamed;
  if (index === 1 && renamed === args[0].trim()) {
    args.pop();
  }

  return (
    params.substring(0, openIndex) +
    "(" +
    args.map((a) => a.trim()).join(", ") +
    ")" +
    params.substring(closeIndex + 1)
  );
}
