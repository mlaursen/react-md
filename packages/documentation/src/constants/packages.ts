/** this file is generated from `yarn dev-utils docConstants` and should not be updated manually */

export const PACKAGE_NAMES = [
  "alert",
  "app-bar",
  "autocomplete",
  "avatar",
  "badge",
  "button",
  "card",
  "chip",
  "dialog",
  "divider",
  "elevation",
  "expansion-panel",
  "form",
  "icon",
  "layout",
  "link",
  "list",
  "material-icons",
  "media",
  "menu",
  "overlay",
  "portal",
  "progress",
  "sheet",
  "states",
  "table",
  "tabs",
  "theme",
  "tooltip",
  "transition",
  "tree",
  "typography",
  "utils",
];

export const TYPESCRIPT_PACKAGES = PACKAGE_NAMES.filter(
  (name) => !/elevation|theme/.test(name)
);

export const SCSS_PACKAGES = PACKAGE_NAMES.filter(
  (name) => !/autocomplete|material-icons|portal/.test(name)
);

export const DEMOABLE_PACKAGES = PACKAGE_NAMES.filter(
  (name) => !/layout/.test(name)
);
