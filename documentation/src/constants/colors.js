export const ACCENTABLE_COLORS = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',
  'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber',
  'orange', 'deep-orange',
];

export const NOT_ACCENTABLE_COLORS = ['brown', 'grey', 'blue-grey'];
export const PRIMARY_COLORS = ACCENTABLE_COLORS.concat(NOT_ACCENTABLE_COLORS);
export const SECONDARY_HUES = [100, 200, 400, 700];


export const PRIMARY = 'primary';
export const SECONDARY = 'secondary';
export const HUE = 'hue';
export const LIGHT = 'light';
export const THEME_KEYS = [PRIMARY, SECONDARY, HUE, LIGHT];
export const THEME_STORAGE_KEY = 'save-theme';
export const CUSTOM_THEME_ROUTE = 'themes';
