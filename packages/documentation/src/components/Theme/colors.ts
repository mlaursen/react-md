import scssVariables from "@react-md/theme/dist/scssVariables";

const colors = Object.keys(scssVariables).filter(
  (name) => !name.startsWith("rmd-theme")
);

export type ThemeMode = "light" | "dark";

/**
 * All the available primary color names.
 */
export const primaries = colors
  .filter((name) => /(?!-a-)-500$/.test(name))
  .map((name) => name.replace(/rmd-([a-z]+(-[a-z]+)*)-500/, "$1"));

export type PrimaryColor = typeof primaries[number];

/**
 * All the available secondary color names.
 */
export const secondaries = primaries.filter((name) =>
  colors.find((color) => color === `rmd-${name}-a-100`)
);

export type SecondaryColor = typeof secondaries[number];

/**
 * A list of the available accents for a color. This should be uses like: `-a-${accent}`
 */
export const accents = [100, 200, 400, 700];

export type ColorAccent = typeof accents[number];
