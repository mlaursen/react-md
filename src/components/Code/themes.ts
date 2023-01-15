// THIS FILE WAS GENERATED BY A SCRIPT AND SHOULD NOT BE UPDATED MANUALLY

export const DEFAULT_PRISM_THEMES = [
  "default",
  "coy",
  "dark",
  "funky",
  "okaidia",
  "solarizedlight",
  "tomorrow",
  "twilight",
] as const;
export const ADDITIONAL_THEMES = [
  "a11y-dark",
  "atom-dark",
  "base16-ateliersulphurpool.light",
  "cb",
  "coldark-cold",
  "coldark-dark",
  "coy-without-shadows",
  "darcula",
  "dracula",
  "duotone-dark",
  "duotone-earth",
  "duotone-forest",
  "duotone-light",
  "duotone-sea",
  "duotone-space",
  "ghcolors",
  "gruvbox-dark",
  "gruvbox-light",
  "holi-theme",
  "hopscotch",
  "lucario",
  "material-dark",
  "material-light",
  "material-oceanic",
  "night-owl",
  "nord",
  "one-dark",
  "one-light",
  "pojoaque",
  "shades-of-purple",
  "solarized-dark-atom",
  "synthwave84",
  "vs",
  "vsc-dark-plus",
  "xonokai",
  "z-touch",
  "vim-solarized-dark",
] as const;
export const PRISM_THEMES = [
  ...DEFAULT_PRISM_THEMES,
  ...ADDITIONAL_THEMES,
] as const;
export const LIGHT_BG_THEMES = new Set([
  "default",
  "coy",
  "funky",
  "solarizedlight",
  "base16-ateliersulphurpool.light",
  "coldark-cold",
  "coy-without-shadows",
  "duotone-light",
  "ghcolors",
  "gruvbox-light",
  "material-light",
  "one-light",
  "vs",
]);

export type PrismTheme = (typeof PRISM_THEMES)[number];
