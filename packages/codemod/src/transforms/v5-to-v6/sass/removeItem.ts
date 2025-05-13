import { type TransformSassItemOptions } from "../../../utils/types.js";

const REMOVALS = new Set([
  // alert
  "$rmd-toast-two-line-min-height",
  "$rmd-toast-action-margin",
  "$rmd-toast-stacked-action-margin-top",
  "$rmd-toast-enter-duration",
  "$rmd-toast-exit-duration",
  "$rmd-alert-theme-values",

  // app-bar
  "rmd-app-bar-fixed",
  "rmd-app-bar-themes",
  "rmd-app-bar-nav",
  "rmd-app-bar-action-position",
  "rmd-app-bar-action",
  "rmd-app-bar-offset",
  "rmd-app-bar-offsets",
  "$rmd-app-bar-nav-margin",
  "$rmd-app-bar-primary-background-color",
  "$rmd-app-bar-primary-color",
  "$rmd-app-bar-secondary-background-color",
  "$rmd-app-bar-secondary-color",

  // avatar
  "rmd-avatar-color",
  "rmd-avatar-colors",

  // button
  "rmd-button-base",
  "rmd-button-icon",
  "rmd-button",
  "rmd-button-floating-positions",
  "rmd-fab",
  "$rmd-button-text-icon-inherit-color",
  "$rmd-button-outline-width",
  "$rmd-button-outline-color",
  "$rmd-button-box-shadow",
  "$rmd-button-background-color",
  "$rmd-button-color",
  "$rmd-button-contained-elevation-transition-time",

  // card
  "rmd-card",
  "rmd-card-header",
  "rmd-card-title",
  "rmd-card-subtitle",
  "rmd-card-content",
  "rmd-card-actions",
  "$rmd-card-dark-elevation-color",
  "$rmd-card-secondary-color",
  "$rmd-card-actions-padding",

  // chip
  "$rmd-chip-disable-focus-background-color",
  "$rmd-chip-box-shadow",

  // dialog
  "rmd-dialog",
  "rmd-dialog-header",
  "rmd-dialog-title",
  "rmd-dialog-content",
  "rmd-dialog-footer",
  "rmd-dialog-container",
  "rmd-dialog-overlay",
  "$rmd-dialog-light-background-color",
  "$rmd-dialog-dark-background-color",
  "$rmd-dialog-dark-elevation-background-color",
  "$rmd-dialog-background-color",

  // form
  "$rmd-label-floating-font-size",
  "$rmd-text-field-filled-border-radius",
  "$rmd-listbox-elevation",
  "$rmd-listbox-light-background-color",
  "$rmd-listbox-dark-elevation-background-color",
  "$rmd-listbox-dark-background-color",
  "$rmd-listbox-background-color",
  "$rmd-listbox-z-index",
  "$rmd-option-focused-styles",
  "$rmd-option-selected-offset",
  "$rmd-option-selected-content",
  "$rmd-option-horizontal-padding",
  "$rmd-text-field-active-color",
  // can't auto-migrate this one since there's only the split mixins now
  "react-md-form",

  // icon
  "rmd-icon-base",
  "rmd-icon-font",
  "rmd-icon-dense-theme",
  "rmd-icon-svg",
  "rmd-icon-text-icon-spacing",
  "rmd-icon-spaced-with-text",
  "rmd-icon-icon-rotator",
  "rmd-icon",
  "rmd-icon-spacing",
  "rmd-icon-material-icons-font-face",
  "rmd-icon-material-icons-class",
  "rmd-icon-host-material-icons",
  "$rmd-icon-material-icons-font",

  // layout
  "$rmd-layout-main-focus-shadow",
  "$rmd-layout-navigation-mini-z-index",
  "$rmd-layout-mini-navigation-width",

  // link
  "rmd-link",
  "rmd-link-skip",

  // list
  "rmd-list-unstyled",
  "rmd-list-dense-theme",
  "rmd-list",
  "rmd-list-item-base",
  "rmd-list-item-dense-theme",
  "rmd-list-item-addon-spacing",
  "rmd-list-item",
  "rmd-list-subheader",
  "$rmd-list-line-height",
  "$rmd-list-font-size",

  // media
  "rmd-media-responsive-item",
  "rmd-media-overlay-position",
  "$rmd-media-default-aspect-ratio",
  "$rmd-media-overlay-positions",

  // progress
  "rmd-progress-animation",
  "rmd-linear-progress-styles",
  "rmd-linear-progress-bar",
  "rmd-linear-progress",
  "rmd-circular-progress",

  // sheet
  "rmd-sheet-positions",
  "rmd-sheet",
  "$rmd-sheet-overlay-z-index",
  "$rmd-sheet-light-background-color",
  "$rmd-sheet-dark-elevation-background-color",
  "$rmd-sheet-dark-background-color",
  "$rmd-sheet-background-color",
  "$rmd-sheet-raised-light-background-color",
  "$rmd-sheet-raised-dark-elevation-background-color",
  "$rmd-sheet-raised-dark-background-color",
  "$rmd-sheet-raised-background-color",
  "$rmd-sheet-positions",
  "$rmd-sheet-enabled-positions",

  // states
  "$rmd-states-use-ripple",
  "$rmd-states-use-pressed-states-fallback",
  "$rmd-states-background-color",
  "$rmd-states-focus-shadow",

  // table
  "rmd-table",
  "rmd-thead",
  "rmd-table-cell-horizontal-alignments",
  "rmd-table-cell-vertical-alignments",
  "rmd-table-cell",
  "rmd-table-row",
  "$rmd-table-cell-horizontal-alignments",
  "$rmd-table-cell-vertical-alignments",

  // tabs
  "rmd-tabs",
  "rmd-tab",
  "rmd-tab-panels",
  "rmd-tab-panel",
  "$rmd-tabs-positions",

  // theme
  "rmd-theme-text-color",
  "rmd-theme-tone",
  "rmd-theme-dark-elevation-styles",
  "rmd-theme-dark-elevation",
  "$rmd-theme-default-contrast-ratio",
  "$rmd-theme-better-contrast-colors",
  "$rmd-theme-no-css-variables-fallback",
  "$rmd-theme-define-colors-with-rgba",
  "$rmd-theme-light",
  "$rmd-theme-dark-elevation",
  "$rmd-theme-dark-class",
  "$rmd-theme-on-surface",
  "$rmd-theme-light-text-colors",
  "$rmd-theme-dark-text-colors",
  "$rmd-theme-primary-text-on-light-color",
  "$rmd-theme-secondary-text-on-light-color",
  "$rmd-theme-hint-text-on-light-color",
  "$rmd-theme-disabled-text-on-light-color",
  "$rmd-theme-primary-text-on-dark-color",
  "$rmd-theme-secondary-text-on-dark-color",
  "$rmd-theme-hint-text-on-dark-color",
  "$rmd-theme-disabled-text-on-dark-color",
  "$rmd-theme-icon-on-light-color",
  "$rmd-theme-icon-on-dark-color",

  // tooltip
  "rmd-tooltip-position-to-property",
  "rmd-tooltip-inverse-position",
  "rmd-tooltip-base",
  "rmd-tooltip-line-wrap",
  "$rmd-tooltip-font-size",
  "$rmd-tooltip-line-height",
  "$rmd-tooltip-dense-font-size",
  "$rmd-tooltip-dense-line-height",
  "$rmd-tooltip-line-wrap-vertical-padding",
  "$rmd-tooltip-dense-line-wrap-vertical-padding",
  "$rmd-tooltip-position-values",

  // transition
  "rmd-transition",
  "rmd-transition-parent-shadow",
  "rmd-transition-pseudo-shadow",
  "rmd-collapse",
  "rmd-cross-fade",
  "rmd-transition-classes",
  "$rmd-collapse-enter-transition-func",
  "$rmd-collapse-leave-transition-func",
  "$rmd-transitions",

  // tree
  "rmd-tree-depths",
  "rmd-tree-item-at-depth",
  "rmd-tree",
  "rmd-tree-item",
  "rmd-tree-group",
  "$rmd-tree-item-focused-styles",
  "$rmd-tree-item-keyboard-focused-styles",
  "$rmd-tree-max-depth",

  // typography
  "rmd-typography-value",
  "rmd-typography-google-font-suffix",
  "rmd-typography-value",
  "rmd-typography-base",
  "rmd-typography",
  "rmd-text-container-base",
  "rmd-text-container-auto",
  "rmd-text-container",
  "rmd-typography-google-font-face",
  "rmd-typography-host-google-font",
  "$rmd-typography-mobile-max-line-length",
  "$rmd-typography-desktop-max-line-length",
  "$rmd-typography-text-container-breakpoint",
  "$rmd-typography-colors",
  "$rmd-typography-google-font-weight-suffixes",

  // utils
  "rmd-utils-rtl-auto",
  "rmd-utils-rtl-auto-group",
  "rmd-utils-block-centered",
  "rmd-utils-absolute-centered",
  "rmd-utils-scroll",
  "rmd-utils-hide-focus-outline",
  "rmd-utils-full-screen",
  "rmd-utils-sr-only-focusable",
]);

export function removeItem(options: TransformSassItemOptions): boolean {
  const { name, type } = options;
  if (REMOVALS.has(name)) {
    return true;
  }

  if (
    /rmd-.+-(theme-var|update-var)/.test(name) ||
    /^rmd-theme-(light|dark)$/.test(name)
  ) {
    return false;
  }

  if (/rmd-grid/.test(name)) {
    return true;
  }

  if (type !== "variable" && /rmd-expansion-panel/.test(name)) {
    return true;
  }

  if (type === "function" && /^rmd-([-a-z]+)-theme$/.test(name)) {
    return true;
  }

  if (
    type === "mixin" &&
    /^rmd-(?!utils)/.test(name) &&
    name !== "rmd-theme" &&
    !/^rmd-.+-theme$/.test(name)
  ) {
    return true;
  }

  return false;
}
