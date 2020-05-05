/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-dialog-theme": {
      name: "rmd-dialog-theme",
      description:
        "This function is used to quickly get one of the dialog's theme values. This is really just for the `rmd-dialog-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/dialog/src/_functions.scss#L15-L17",
      packageName: "dialog",
      code: "@function rmd-dialog-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-dialog-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-dialog-theme-values,\n    dialog\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-dialog-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the dialog's theme values.",
      },
    },
    "rmd-dialog-theme-var": {
      name: "rmd-dialog-theme-var",
      description:
        "This function is used to get one of the dialog's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-dialog-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/dialog/src/_functions.scss#L32-L34",
      packageName: "dialog",
      code:
        "@function rmd-dialog-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-dialog-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-dialog-theme-values,\n    dialog,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-dialog-theme-values` map keys to set a value for.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "An optional fallback color to apply. This is set to `null` by default and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the dialog's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-dialog-theme": {
      name: "rmd-dialog-theme",
      description:
        "Creates the styles for one of the dialog's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/dialog/src/_mixins.scss#L25-L27",
      packageName: "dialog",
      code:
        "@mixin rmd-dialog-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-dialog-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-dialog-theme-values,\n    dialog\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-dialog-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-dialog-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-dialog-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-dialog-theme-update-var": {
      name: "rmd-dialog-theme-update-var",
      description:
        "Updates one of the dialog's theme variables with the new value for the section of your app.",
      source: "packages/dialog/src/_mixins.scss#L35-L37",
      packageName: "dialog",
      code: "@mixin rmd-dialog-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-dialog-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-dialog-theme-values,\n    dialog\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The dialog theme style type to update. This should be one of the `$rmd-dialog-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "react-md-dialog": {
      name: "react-md-dialog",
      description: "Creates all the styles for the dialog package.\n",
      source: "packages/dialog/src/_mixins.scss#L218-L248",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "dialog",
      code: "@mixin react-md-dialog { … }",
      sourceCode:
        "@mixin react-md-dialog {\n  @include rmd-theme-create-root-theme($rmd-dialog-theme-values, dialog);\n\n  .rmd-dialog-container {\n    @include rmd-dialog-container;\n  }\n\n  .rmd-dialog-overlay {\n    @include rmd-dialog-overlay;\n  }\n\n  .rmd-dialog {\n    @include rmd-dialog;\n\n    &__header {\n      @include rmd-dialog-header;\n    }\n\n    &__content {\n      @include rmd-dialog-content;\n    }\n\n    &__footer {\n      @include rmd-dialog-footer;\n    }\n\n    &__title {\n      @include rmd-dialog-title;\n    }\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-dialog-elevation": {
      name: "rmd-dialog-elevation",
      description:
        "The elevation (box-shadow) to use for the dialog when it is not full page.\nThis should be a number between 0 and 24 since it gets passed to the `rmd-elevation` mixin.\n",
      source: "packages/dialog/src/_variables.scss#L11",
      packageName: "dialog",
      type: "Number",
      value: "16",
      overridable: true,
    },
    "rmd-dialog-z-index": {
      name: "rmd-dialog-z-index",
      description:
        "The z-index for dialogs. This value is a bit larger than overlays just in case other components are using the overlay as well. The dialog's overlay will also gain this z-index value.",
      source: "packages/dialog/src/_variables.scss#L19",
      packageName: "dialog",
      type: "Number",
      value: "$rmd-overlay-z-index + 10",
      compiled: "26",
      overridable: true,
    },
    "rmd-dialog-vertical-margin": {
      name: "rmd-dialog-vertical-margin",
      description:
        "The amount of vertical viewport spacing there should be between the edge of the screen and a non-full page dialog. This value should be big enough so that users can still touch the overlay when a dialog is visible.\n",
      source: "packages/dialog/src/_variables.scss#L25",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-horizontal-margin": {
      name: "rmd-dialog-horizontal-margin",
      description:
        "The amount of horizontal viewport spacing there should be between the edge of the screen and a non-full page dialog. This value should be big enough so that users can still touch the overlay when a dialog is visible.\n",
      source: "packages/dialog/src/_variables.scss#L31",
      packageName: "dialog",
      type: "Number",
      value: "2.5rem",
      overridable: true,
    },
    "rmd-dialog-header-padding": {
      name: "rmd-dialog-header-padding",
      description:
        "The amount of padding to apply to the `DialogHeader` component.\n",
      source: "packages/dialog/src/_variables.scss#L35",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-header-padding-bottom": {
      name: "rmd-dialog-header-padding-bottom",
      description:
        "The amount of padding-bottom to apply to the `DialogHeader` component. This is a bit smaller than the `$rmd-dialog-header-padding` value since it is usually used alongside the `DialogContent` component which has its own padding attached.\n",
      source: "packages/dialog/src/_variables.scss#L42",
      packageName: "dialog",
      type: "Number",
      value: "1.25rem",
      overridable: true,
    },
    "rmd-dialog-content-padding": {
      name: "rmd-dialog-content-padding",
      description:
        "The amount of padding to apply to the `DialogContent` component.\n",
      source: "packages/dialog/src/_variables.scss#L46",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-footer-padding": {
      name: "rmd-dialog-footer-padding",
      description:
        "The amount of padding to apply to the `DialogFooter` component.\n",
      source: "packages/dialog/src/_variables.scss#L50",
      packageName: "dialog",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-dialog-transition-distance": {
      name: "rmd-dialog-transition-distance",
      description:
        'The distance that the dialog should travel while animating in and out of view. By default, this animation will cause the dialog to "fly" upwards. If you change this value to be a negative number, it will "fly" downwards.\n',
      source: "packages/dialog/src/_variables.scss#L56",
      packageName: "dialog",
      type: "Number",
      value: "1.875rem",
      overridable: true,
    },
    "rmd-dialog-enter-duration": {
      name: "rmd-dialog-enter-duration",
      description:
        "The enter animation duration. This should match the `timeout` prop for the `Dialog` component.\n",
      source: "packages/dialog/src/_variables.scss#L61",
      packageName: "dialog",
      type: "Number",
      value: "0.2s",
      overridable: true,
    },
    "rmd-dialog-leave-duration": {
      name: "rmd-dialog-leave-duration",
      description:
        "The leave animation duration. This should match the `timeout` prop for the `Dialog` component.\n",
      source: "packages/dialog/src/_variables.scss#L66",
      packageName: "dialog",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-dialog-min-width": {
      name: "rmd-dialog-min-width",
      description:
        "The min width for a centered dialog. This is really just applied so you don't have super tiny dialogs if there isn't enough content in the dialog.\n",
      source: "packages/dialog/src/_variables.scss#L71",
      packageName: "dialog",
      type: "Number",
      value: "17.5rem",
      overridable: true,
    },
    "rmd-dialog-theme-values": {
      name: "rmd-dialog-theme-values",
      description:
        'A Map of all the "themeable" parts of the dialog package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/dialog/src/_variables.scss#L77-L86",
      usedBy: [
        { name: "rmd-dialog-theme", type: "function", packageName: "dialog" },
        {
          name: "rmd-dialog-theme-var",
          type: "function",
          packageName: "dialog",
        },
        { name: "rmd-dialog-theme", type: "mixin", packageName: "dialog" },
        {
          name: "rmd-dialog-theme-update-var",
          type: "mixin",
          packageName: "dialog",
        },
        { name: "react-md-dialog", type: "mixin", packageName: "dialog" },
      ],
      packageName: "dialog",
      type: "Map",
      value:
        "(\n  horizontal-margin: $rmd-dialog-horizontal-margin,\n  vertical-margin: $rmd-dialog-vertical-margin,\n  min-width: $rmd-dialog-min-width,\n  header-padding: $rmd-dialog-header-padding,\n  header-padding-bottom: $rmd-dialog-header-padding-bottom,\n  content-padding: $rmd-dialog-content-padding,\n  footer-padding: $rmd-dialog-footer-padding,\n  z-index: $rmd-dialog-z-index,\n)",
      compiled:
        "(\n  horizontal-margin: 2.5rem,\n  vertical-margin: 1.5rem,\n  min-width: 17.5rem,\n  header-padding: 1.5rem,\n  header-padding-bottom: 1.25rem,\n  content-padding: 1.5rem,\n  footer-padding: 0.5rem,\n  z-index: 26,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
