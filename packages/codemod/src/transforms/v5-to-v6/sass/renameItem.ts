import {
  renameFromRenameEntries,
  renameRecordToEntries,
} from "../../../utils/sassRenames.js";
import { type TransformSassItemOptions } from "../../../utils/types.js";

const SIMPLE_RENAMES: Record<string, string> = {
  // colors
  "$rmd-white-base": "$white",
  "$rmd-black-base": "$black",

  // alert
  "react-md-alert": "snackbar-styles",
  "$rmd-toast-light-background-color": "$snackbar-light-theme-background-color",
  "$rmd-toast-light-color": "$snackbar-light-theme-color",
  "$rmd-toast-dark-background-color": "$snackbar-dark-theme-background-color",
  "$rmd-toast-dark-color": "$snackbar-dark-theme-color",

  // app-bar
  "$rmd-app-bar-z-index": "$app-bar-fixed-z-index",
  "$rmd-app-bar-nav-margin": "$app-bar-nav-keyline",
  "$rmd-app-bar-default-light-theme-background-color":
    "$app-bar-light-theme-surface-background-color",
  "$rmd-app-bar-default-dark-theme-background-color":
    "$app-bar-dark-theme-surface-background-color",
  "$rmd-app-bar-default-light-theme-color":
    "$app-bar-light-theme-surface-color",
  "$rmd-app-bar-default-dark-theme-color": "$app-bar-dark-theme-surface-color",
  "$rmd-app-bar-default-background-color": "$app-bar-surface-background-color",
  "$rmd-app-bar-default-color": "$app-bar-surface-color",

  // badge
  "$rmd-badge-default-background-color": "$badge-greyscale-background-color",
  "$rmd-badge-default-color": "$badge-greyscale-color",

  // button
  "rmd-button-reset": "button-unstyled",
  "rmd-button-unstyled": "button-unstyled",
  "rmd-button-text": "button-text-styles",
  "$rmd-button-text-height": "$button-text-min-height",
  "$rmd-button-contained-resting-elevation": "$button-contained-elevation",
  "$rmd-button-contained-pressed-elevation":
    "$button-contained-pressed-elevation",

  // card
  "$rmd-card-base-elevation": "$card-raisable-start-elevation",
  "$rmd-card-raised-elevation": "$card-raisable-end-elevation",
  "$rmd-card-content-padding-extra": "$card-content-padding-bottom",

  // chip
  "$rmd-chip-small-spacing": "$chip-addon-left-padding",
  "$rmd-chip-medium-spacing": "$chip-addon-right-padding",
  "$rmd-chip-large-spacing": "$chip-addon-horizontal-padding",
  "$rmd-chip-themed-background-color": "$chip-theme-background-color",
  "$rmd-chip-themed-color": "$chip-theme-color",
  "$rmd-chip-outline-light-color": "$chip-outline-light-text-color",
  "$rmd-chip-outline-dark-color": "$chip-outline-dark-text-color",
  "$rmd-chip-outline-color": "$chip-outline-text-color",
  "$rmd-chip-transition-duration": "$chip-outline-raisable-transition-duration",
  "$rmd-divider-background-color-on-light": "$divider-light-theme-color",
  "$rmd-divider-background-color-on-dark": "$divider-dark-theme-color",
  "$rmd-divider-background-color": "$divider-color",

  // divider
  "rmd-divider-border": "divider-border-style",

  // expansion-panel
  "$rmd-expansion-panel-header-padding": "$expansion-panel-padding",
  "$rmd-expansion-panel-expander-icon-spacing":
    "$expansion-panel-button-spacing",

  // form
  "$rmd-label-floating-top": "$label-floating-y",
  "$rmd-label-floating-dense-top": "$label-floating-y-dense",
  "$rmd-label-padding": "$label-floating-padding",
  "$rmd-select-native-multiple-padding":
    "$select-native-select-multiple-padding",
  "$rmd-select-native-addon-top": "$select-native-select-addon-top",
  "$rmd-option-selected-styles": "$select-option-selected-styles",
  "$rmd-slider-include-vertical": "$slider-disable-vertical",
  "$rmd-slider-disabled-thumb-color": "$slider-thumb-disabled-color",
  "$rmd-slider-thumb-radius": "$slider-thumb-border-radius",
  "$rmd-slider-thumb-value-caret-size": "$slider-tooltip-caret-size",
  "$rmd-slider-thumb-value-offset": "$slider-tooltip-offset",
  "$rmd-text-field-light-border-hover-color":
    "$text-field-light-hover-border-color",
  "$rmd-text-field-dark-border-hover-color":
    "$text-field-dark-hover-border-color",
  "$rmd-text-field-border-hover-color": "$text-field-hover-border-color",
  "$rmd-text-field-outline-padding": "$text-field-outlined-padding",
  "$rmd-text-field-underline-label-padding-top":
    "$text-field-underlined-label-padding-top",
  "$rmd-text-field-underline-label-left-offset":
    "$text-field-underlined-label-left-offset",
  "$rmd-text-field-underline-dense-padding-top":
    "$text-field-underlined-placeholder-addon-padding-top",
  "$rmd-text-field-underline-padding": "$text-field-underlined-padding",
  "$rmd-text-field-filled-light-background-color":
    "$text-field-light-filled-background-color",
  "$rmd-text-field-filled-dark-background-color":
    "$text-field-dark-filled-background-color",
  "$rmd-text-field-filled-background-color":
    "$text-field-filled-background-color",

  // icon
  "$rmd-icon-include-dense": "$icon-disable-dense",
  "$rmd-icon-use-font-icons": "$icon-disable-font",
  "$rmd-icon-use-svg-icons": "$icon-disable-svg",
  "$rmd-icon-spacing-with-text": "$icon-spacing",
  "$rmd-icon-rotator-transition-time": "$icon-rotate-duration",
  "$rmd-icon-rotator-from": "$icon-rotate-from",
  "$rmd-icon-rotator-to": "$icon-rotate-to",

  // layout
  "$rmd-layout-navigation-width": "$layout-navigation-static-width",

  // link
  "$rmd-link-transition-time": "$link-transition-duration",

  // list
  "$rmd-list-item-three-line-height": "$list-item-mulitline-height",
  "$rmd-list-item-dense-three-line-height": "$list-item-dense-mulitline-height",
  "$rmd-list-item-secondary-text-three-line-max-height":
    "$list-item-mulitline-max-height",
  "$rmd-list-item-dense-secondary-text-three-line-max-height":
    "$list-item-dense-mulitline-max-height",
  "$rmd-list-item-text-keyline": "$list-item-keyline",

  // media
  "@mixin rmd-media-aspect-ratio": "responsive-item-aspect-ratio",
  "@mixin rmd-media-aspect-ratio-container":
    "responsive-item-aspect-ratio-container",
  "@mixin rmd-media-forced-aspect-ratio-item":
    "responsive-item-forced-aspect-ratio",
  "@mixin rmd-media-overlay": "responsive-item-overlay-styles",
  "@mixin rmd-media-container": "responsive-item-base-styles",
  "$rmd-media-selectors": "$responsive-item-selectors",
  "$rmd-media-default-aspect-ratios": "$responsive-item-default-aspect-ratios",
  "$rmd-media-overlay-background-color":
    "$responsive-item-overlay-background-color",
  "$rmd-media-overlay-padding": "$responsive-item-overlay-padding",
  "$rmd-media-overlay-horizontal-width":
    "$responsive-item-overlay-horizontal-width",

  // overlay
  "$rmd-overlay-color": "$overlay-background-color",

  // progress
  "$rmd-progress-include-linear": "$progress-disable-linear",
  "$rmd-progress-include-circular": "$progress-disable-circular",
  "$rmd-circular-progress-small-size": "$progress-circular-dense-size",

  // sheet
  "$rmd-sheet-touchable-max-height": "$sheet-touch-max-height",

  // states
  "$rmd-states-use-focus-shadow": "$interaction-focus-box-shadow",
  "$rmd-states-use-focus-background": "$interaction-disable-focus-background",
  "$rmd-states-light-theme-background-color":
    "$interaction-light-surface-base-background-color",
  "$rmd-states-dark-theme-background-color":
    "$interaction-dark-surface-base-background-color",
  "$rmd-states-light-theme-hover-color":
    "$interaction-light-surface-hover-color",
  "$rmd-states-light-theme-focus-color":
    "$interaction-light-surface-focus-color",
  "$rmd-states-light-theme-pressed-color":
    "$interaction-light-surface-pressed-color",
  "$rmd-states-light-theme-selected-color":
    "$interaction-light-surface-selected-color",
  "$rmd-states-dark-theme-hover-color": "$interaction-dark-surface-hover-color",
  "$rmd-states-dark-theme-focus-color": "$interaction-dark-surface-focus-color",
  "$rmd-states-dark-theme-pressed-color":
    "$interaction-dark-surface-pressed-color",
  "$rmd-states-dark-theme-selected-color":
    "$interaction-dark-surface-selected-color",
  "$rmd-states-light-theme-ripple-background-color":
    "$interaction-light-surface-ripple-background-color",
  "$rmd-states-dark-theme-ripple-background-color":
    "$interaction-dark-surface-ripple-background-color",
  "$rmd-states-focus-shadow-width": "$interaction-focus-width",
  "$rmd-states-focus-shadow-color": "$interaction-focus-color",

  // table
  "$rmd-table-light-border-color": "$table-light-theme-border-color",
  "$rmd-table-dark-border-color": "$table-dark-theme-border-color",
  "$rmd-table-cell-sticky-position": "$table-sticky-cell-position",
  "$rmd-table-cell-sticky-z-index": "$table-sticky-cell-z-index",
  "$rmd-table-header-cell-height": "$table-cell-header-height",
  "$rmd-table-header-cell-dense-height": "$table-cell-header-dense-height",
  "$rmd-table-header-cell-color": "$table-cell-header-color",
  "$rmd-table-header-sticky-position": "$table-sticky-header-position",
  "$rmd-table-checkbox-padding": "$table-cell-input-toggle-horizontal-padding",

  // tabs
  "$rmd-tab-indicator-color": "$tabs-indicator-background",
  "$rmd-tab-active-indicator-height": "$tabs-indicator-height",
  "$rmd-tabs-scrollable-padding": "$tabs-tablist-scrollable-horizontal-padding",

  // theme
  "rmd-theme-get-swatch": "get-swatch",
  "rmd-theme-contrast-tone": "contrast-color",
  "rmd-theme-best-contrast-color": "contrast-color",

  // tooltip
  "rmd-tooltip-dense-theme": "tooltip-dense-variables",
  "$rmd-tooltip-exit-duration": "$tooltip-leave-duration",

  // transition
  "rmd-transition-shadow-transition": "box-shadow-transition",
  "$rmd-transition-sharp": "$sharp-timing-function",
  "$rmd-transition-standard": "$standard-timing-function",
  "$rmd-transition-acceleration": "$acceleration-timing-function",
  "$rmd-transition-deceleration": "$deceleration-timing-function",
  "$rmd-transition-standard-time": "$linear-duration",
  "$rmd-transition-enter-duration": "$enter-duration",
  "$rmd-transition-leave-duration": "$leave-duration",
  "$rmd-cross-fade-translate-distance": "$cross-fade-translate-distance",
  "$rmd-cross-fade-transition-duration": "$cross-fade-transition-duration",
  "$rmd-transition-scale-enter-duration": "$scale-transition-enter-duration",
  "$rmd-transition-scale-leave-duration": "$scale-transition-leave-duration",
  "$rmd-transition-scale-y-enter-duration":
    "$scale-y-transition-enter-duration",
  "$rmd-transition-scale-y-leave-duration":
    "$scale-y-transition-leave-duration",

  // typography
  "rmd-typography-text-overflow-ellipsis": "text-overflow",
  "rmd-typography-line-clamp": "line-clamp",
  "$rmd-typography-base": "$base-font-styles",

  // utils
  "react-md-utils": "styles",
};

const REGEXP_RENAMES = renameRecordToEntries({
  "\\$rmd-toast-": "$snackbar-",
  "\\$rmd-(white|black)-base": (_, color) => `$${color}`,

  "rmd-alert-theme-var$": "snackbar-get-var",
  "rmd-alert-theme-update-var$": "snackbar-set-var",
  "rmd-([-a-z]+)-theme-var$": "$1-get-var",
  "rmd-([-a-z]+)-theme-update-var$": "$1-set-var",
  "rmd-theme-var$": "theme-get-var",
  "rmd-theme-update-var$": "theme-set-var",
  "^rmd-theme-(light|dark)$": "use-$1-theme",
  "\\$rmd-(.+)-theme-values$": "$1-variables",

  "\\$rmd-link-skip-(.+)$": "$link-skip-to-main-$1",

  "\\$rmd-slider-(((in?)active)|disabled)-(track)": "$slider-$3-$1",

  "\\$rmd-theme-((on-)?(primary|secondary|warning|error|success))": (
    _,
    match
  ) => `$${match}-color`,

  "\\$rmd-theme-(light|dark)-(icon|((primary|secondary|hint|disabled)-text))-on-background-color":
    (_, lightOrDark, type) => `$${lightOrDark}-${type}`,

  "(\\$?)rmd-elevation": "$1box-shadow",

  "\\$rmd-(linear|circular)-progress-": "$progress-$1-",
  "\\$rmd-states-": "$intereraction-",
  "\\$rmd-tab-": "$tabs-",

  "\\$rmd-typgraphy-(thin|light|regular|medium|bold|semi-bold|black)":
    "$font-weight-$1",
  "\\$rmd-typgraphy-(default-)?font-weights": "$font-weights",
  "\\$rmd-typography-(alignments|decorations|transforms)": "$text-$1",
  "\\$rmd-typography-(default-)?(.+)-styles": (_, def, kind) =>
    `$${kind}-${def ? "recommended" : "custom"}-styles`,
  "\\$rmd-typography-": "$",

  "([.$])?rmd-": (_, prefix) => (typeof prefix === "string" ? prefix : ""),
});

const MIXIN_RENAMES = renameRecordToEntries({
  "rmd-alert-theme": "snackbar-use-var",
  "rmd-(.+)-dense-theme$": "$1-dense-variables",
  "rmd-([-a-z]+)-theme-update-var": "$1-set-var",
  "rmd-([-a-z]+)-theme": "$1-use-var",
  "rmd-theme$": "theme-use-var",
  "rmd-utils-": "",
});

export function renameItem(
  options: TransformSassItemOptions
): string | undefined {
  const { name, type } = options;
  return (
    SIMPLE_RENAMES[name] ||
    renameFromRenameEntries({
      name,
      type,
      entries: MIXIN_RENAMES,
      entriesType: "mixin",
    }) ||
    renameFromRenameEntries({
      name,
      type,
      entries: REGEXP_RENAMES,
      entriesType: "any",
    })
  );
}
