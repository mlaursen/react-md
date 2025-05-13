import {
  type RenameEntries,
  renameFromRenameEntries,
  renameRecordToEntries,
} from "../../../utils/sassRenames.js";
import { type TransformSassItemOptions } from "../../../utils/types.js";

const THEME_REMOVED_VARIABLES = new Set([
  "light-background",
  "light-surface",
  "dark-background",
  "dark-surface",
  "text-primary-on-light",
  "text-secondary-on-light",
  "text-hint-on-light",
  "text-disabled-on-light",
  "text-icon-on-light",
  "text-primary-on-dark",
  "text-secondary-on-dark",
  "text-hint-on-dark",
  "text-disabled-on-dark",
  "text-icon-on-dark",
]);
const THEME_RENAMED_VARIABLES = renameRecordToEntries({
  "on-surface": "inverse-color",
  "^(background|surface|(on-)?(primary|secondary|warning|error|success))$":
    "$1-color",
  "^text-(primary|secondary|hint|disabled)-on-background": "text-$1-color",
});

const APP_BAR_REMOVED_VARIABLES = new Set([
  "background-color",
  "color",
  "primary",
  "on-primary",
  "secondary",
  "on-secondary",
  "default-background-color",
  "default-color",
  "default-light-background-color",
  "default-light-color",
  "default-dark-background-color",
  "default-dark-color",
  "dense-height",
  "priminent-height",
  "prominent-dense-height",
]);

const BUTTON_REMOVED_VARIABLES = new Set(["outline", "outline-width"]);
const BUTTON_RENAMED_VARIABLES: Record<string, string> = {
  "text-border-radius": "border-radius",
  "text-height": "text-min-height",
};

const CARD_REMOVED_VARIABLES = new Set(["secondary-color"]);

const DIALOG_REMOVED_VARIABLES = new Set(["background-color"]);
const DIALOG_RENAMED_VARIABLES: Record<string, string> = {
  "min-width": "width",
};

const DIVIDER_REMOVED_VARIABLES = new Set([
  "background-color-on-light",
  "background-color-on-dark",
]);
const DIVIDER_RENAMED_VARIABLES: Record<string, string> = {
  "background-color": "color",
};

const FORM_REMOVED_VARIABLES = new Set([
  "error-color",
  "error-hover-color",
  "disabled-color",
  "toggle-inset",
  "toggle-dense-inset",
  "indeterminate-height",
  "indeterminate-dense-height",
  "floating-dense-top",
  "listbox-background-color",
  "text-offset",
  "text-active-color",
  "text-border-hover-color",
  "text-label-height",
  "text-label-dense-height",
  "text-placeholder-height",
  "text-placeholder-dense-height",
]);
const FORM_RENAMED_VARIABLES: Record<string, string> = {
  "floating-top": "floating-y",
  "label-left-offset": "floating-active-x",
  "label-top-offset": "floating-active-y",
  "label-active-padding": "active-padding",
  "text-padding-left": "padding-left",
  "text-padding-right": "padding-right",
  "text-border-color": "border-color",
  "text-filled-color": "filled-color",
  "text-height": "height",
  "textarea-padding": "padding",
};

const ICON_RENAMED_VARIABLES: Record<string, string> = {
  "text-spacing": "spacing",
};

const LAYOUT_REMOVED_VARIABLES = new Set(["mini-nav-width", "main-offset"]);
const LAYOUT_RENAMED_VARIABLES: Record<string, string> = {
  "nav-width": "size",
};

const LIST_REMOVED_VARIABLES = new Set([
  "vertical-padding",
  "horizontal-padding",
  "font-size",
  "text-keyline",
  "item-height",
  "item-medium-height",
  "item-large-height",
  "item-extra-large-height",
  "item-three-line-height",
  "item-vertical-padding",
  "item-horizontal-padding",
  "item-secondary-three-line-height",
  "dense-font-size",
  "dense-vertical-padding",
  "dense-horizontal-padding",
  "dense-item-height",
  "dense-item-medium-height",
  "dense-item-large-height",
  "dense-item-extra-large-height",
  "dense-item-three-line-height",
  "dense-item-secondary-three-line-height",
  "media-size",
  "media-spacing",
  "media-large-size",
]);

const OVERLAY_REMOVED_VARIABLES = new Set(["active-opacity"]);

const PROGRESS_RENAMED_VARIABLES: Record<string, string> = {
  "circular-width": "circular-stroke-width",
};

const SHEET_REMOVED_VARIABLES = new Set([
  "background-color",
  "raised-background-color",
]);
const SHEET_RENAMED_VARIABLES: Record<string, string> = {
  "touchable-max-height": "touch-max-height",
};

const STATES_REMOVED_VARIABLES = new Set([
  "focus-shadow",
  "light-hover-color",
  "light-focus-color",
  "light-pressed-color",
  "light-selected-color",
  "light-ripple-background-color",
  "dark-hover-color",
  "dark-focus-color",
  "dark-pressed-color",
  "dark-selected-color",
  "dark-ripple-background-color",
]);
const STATES_RENAMED_VARIABLES: Record<string, string> = {
  "hover-color": "hover-background-color",
  "focus-color": "focus-background-color",
  "pressed-color": "press-background-color",
  "selected-color": "selected-background-color",
};

const TABLE_REMOVED_VARIABLES = new Set(["cell-dense-height"]);
const TABLE_RENAMED_VARIABLES: Record<string, string> = {
  "cell-h-padding": "cell-horizontal-padding",
  "cell-v-padding": "cell-vertical-padding",
};

const TABS_RENAMED_VARIABLES: Record<string, string> = {
  active: "active-color",
  inactive: "inactive-color",
  disabled: "disabled-color",
  "indicator-color": "indicator-background",
};

const TOOLTIP_REMOVED_VARIABLES = new Set([
  "pacing",
  "font-size",
  "line-height",
  "dense-spacing",
  "dense-font-size",
  "dense-line-height",
]);

const TREE_RENAMED_VARIABLES: Record<string, string> = {
  incrementor: "item-padding-incrementor",
  "base-padding": "item-padding-base",
};

const TYPOGRAPHY_REMOVED_VARIABLES = new Set([
  "mobile-line-width",
  "desktop-line-width",
]);
const TYPOGRAPHY_RENAMED_VARIABLES: Record<string, string> = {
  "line-width": "line-length",
};

const REMOVED_VARIABLES: Record<string, ReadonlySet<string>> = {
  "app-bar": APP_BAR_REMOVED_VARIABLES,
  button: BUTTON_REMOVED_VARIABLES,
  card: CARD_REMOVED_VARIABLES,
  dialog: DIALOG_REMOVED_VARIABLES,
  divider: DIVIDER_REMOVED_VARIABLES,
  form: FORM_REMOVED_VARIABLES,
  layout: LAYOUT_REMOVED_VARIABLES,
  list: LIST_REMOVED_VARIABLES,
  overlay: OVERLAY_REMOVED_VARIABLES,
  sheet: SHEET_REMOVED_VARIABLES,
  states: STATES_REMOVED_VARIABLES,
  table: TABLE_REMOVED_VARIABLES,
  theme: THEME_REMOVED_VARIABLES,
  tooltip: TOOLTIP_REMOVED_VARIABLES,
  typography: TYPOGRAPHY_REMOVED_VARIABLES,
};
const RENAMED_VARIABLES: Record<
  string,
  Readonly<Record<string, string>> | RenameEntries
> = {
  button: BUTTON_RENAMED_VARIABLES,
  dialog: DIALOG_RENAMED_VARIABLES,
  divider: DIVIDER_RENAMED_VARIABLES,
  form: FORM_RENAMED_VARIABLES,
  icon: ICON_RENAMED_VARIABLES,
  layout: LAYOUT_RENAMED_VARIABLES,
  progress: PROGRESS_RENAMED_VARIABLES,
  sheet: SHEET_RENAMED_VARIABLES,
  states: STATES_RENAMED_VARIABLES,
  table: TABLE_RENAMED_VARIABLES,
  tabs: TABS_RENAMED_VARIABLES,
  theme: THEME_RENAMED_VARIABLES,
  tree: TREE_RENAMED_VARIABLES,
  typography: TYPOGRAPHY_RENAMED_VARIABLES,
};

function isRenameEntries(
  renames: Readonly<Record<string, string>> | RenameEntries
): renames is RenameEntries {
  return "length" in renames;
}

interface ThemeMigrationOptions extends TransformSassItemOptions {
  group: string;
}

interface ThemeMigration {
  icon?: boolean;
  form?: string;
  removed?: true;
  renamed?: string;
}

export function getThemeMigration(
  options: ThemeMigrationOptions
): ThemeMigration {
  const { group, name, type } = options;
  const removedVariables = REMOVED_VARIABLES[group];
  const renamedVariables = RENAMED_VARIABLES[group];
  if (removedVariables?.has(name)) {
    return { removed: true };
  }

  // theme-use-var(color, text-icon-on-background) -> icon-use-var(color)
  // theme-set-var(text-icon-on-background, red) -> icon-set-var(color, red)
  if (group === "theme" && name.includes("text-icon-on-background")) {
    return {
      icon: true,
    };
  }

  if (!renamedVariables) {
    return {};
  }

  if (isRenameEntries(renamedVariables)) {
    const renamed = renameFromRenameEntries({
      name,
      type,
      entries: renamedVariables,
      entriesType: "any",
    });

    return { renamed };
  }

  const renamed = renamedVariables[name];
  let form: string | undefined;
  if (group === "form") {
    if (/^label-/.test(name) || name === "floating-top") {
      form = "label";
    } else if (/^(addon|text)/.test(name)) {
      form = "text-field";
    } else if (/^textarea-/.test(name)) {
      form = "text-area";
    }
  }

  return { renamed, form };
}
