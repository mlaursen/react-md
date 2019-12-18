/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-dialog-theme": {
      name: "rmd-dialog-theme",
      description:
        "This function is used to quickly get one of the dialog's theme values. This is really\njust for the `rmd-dialog-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/dialog/src/_functions.scss#L14-L16",
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
        "This function is used to get one of the dialog's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-dialog-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/dialog/src/_functions.scss#L29-L31",
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
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
        "Creates the styles for one of the dialog's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      source: "packages/dialog/src/_mixins.scss#L22-L24",
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
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-dialog-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-dialog-theme-update-var": {
      name: "rmd-dialog-theme-update-var",
      description:
        "Updates one of the dialog's theme variables with the new value for the section\nof your app.\n\n",
      source: "packages/dialog/src/_mixins.scss#L32-L34",
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
            "The dialog theme style type to update. This should be one\n  of the `$rmd-dialog-theme-values` keys.",
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
      source: "packages/dialog/src/_mixins.scss#L210-L240",
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
        "The elevation (box-shadow) to use for the dialog when it is not full page. This\nshould be a number between 0 and 24 since it gets passed to the `rmd-elevation`\nmixin.\n",
      source: "packages/dialog/src/_variables.scss#L11",
      packageName: "dialog",
      type: "Number",
      value: "16",
      overridable: true,
    },
    "rmd-dialog-z-index": {
      name: "rmd-dialog-z-index",
      description:
        "The z-index for dialogs. This value is a bit larger than overlays just in case\nother components are using the overlay as well. The dialog's overlay will also\ngain this z-index value.\n",
      source: "packages/dialog/src/_variables.scss#L17",
      packageName: "dialog",
      type: "Number",
      value: "$rmd-overlay-z-index + 10",
      compiled: "26",
      overridable: true,
    },
    "rmd-dialog-vertical-margin": {
      name: "rmd-dialog-vertical-margin",
      description:
        "The amount of vertical viewport spacing there should be between the edge of the\nscreen and a non-full page dialog. This value should be big enough so that users\ncan still touch the overlay when a dialog is visible.\n",
      source: "packages/dialog/src/_variables.scss#L23",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-horizontal-margin": {
      name: "rmd-dialog-horizontal-margin",
      description:
        "The amount of horizontal viewport spacing there should be between the edge of the\nscreen and a non-full page dialog. This value should be big enough so that users\ncan still touch the overlay when a dialog is visible.\n",
      source: "packages/dialog/src/_variables.scss#L29",
      packageName: "dialog",
      type: "Number",
      value: "2.5rem",
      overridable: true,
    },
    "rmd-dialog-header-padding": {
      name: "rmd-dialog-header-padding",
      description:
        "The amount of padding to apply to the `DialogHeader` component.\n",
      source: "packages/dialog/src/_variables.scss#L33",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-header-padding-bottom": {
      name: "rmd-dialog-header-padding-bottom",
      description:
        "alongside the `DialogContent` component which has its own padding attached.\n",
      source: "packages/dialog/src/_variables.scss#L39",
      packageName: "dialog",
      type: "Number",
      value: "1.25rem",
      overridable: true,
    },
    "rmd-dialog-content-padding": {
      name: "rmd-dialog-content-padding",
      description:
        "The amount of padding to apply to the `DialogContent` component.\n",
      source: "packages/dialog/src/_variables.scss#L43",
      packageName: "dialog",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-dialog-footer-padding": {
      name: "rmd-dialog-footer-padding",
      description:
        "The amount of padding to apply to the `DialogFooter` component.\n",
      source: "packages/dialog/src/_variables.scss#L47",
      packageName: "dialog",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-dialog-transition-distance": {
      name: "rmd-dialog-transition-distance",
      description:
        'The distance that the dialog should travel while animating in and out of view. By\ndefault, this animation will cause the dialog to "fly" upwards. If you change this\nvalue to be a negative number, it will "fly" downwards.\n',
      source: "packages/dialog/src/_variables.scss#L53",
      packageName: "dialog",
      type: "Number",
      value: "1.875em",
      overridable: true,
    },
    "rmd-dialog-enter-duration": {
      name: "rmd-dialog-enter-duration",
      description:
        "The enter animation duration. This should match the `timeout` prop for the `Dialog`\ncomponent.\n",
      source: "packages/dialog/src/_variables.scss#L58",
      packageName: "dialog",
      type: "Number",
      value: "0.2s",
      overridable: true,
    },
    "rmd-dialog-leave-duration": {
      name: "rmd-dialog-leave-duration",
      description:
        "The leave animation duration. This should match the `timeout` prop for the `Dialog`\ncomponent.\n",
      source: "packages/dialog/src/_variables.scss#L63",
      packageName: "dialog",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-dialog-min-width": {
      name: "rmd-dialog-min-width",
      description:
        "The min width for a centered dialog. This is really just applied so you don't have\nsuper tiny dialogs if there isn't enough content in the dialog.\n",
      source: "packages/dialog/src/_variables.scss#L68",
      packageName: "dialog",
      type: "Number",
      value: "17.5rem",
      overridable: true,
    },
    "rmd-dialog-theme-values": {
      name: "rmd-dialog-theme-values",
      description:
        'A Map of all the "themeable" parts of the dialog package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/dialog/src/_variables.scss#L74-L83",
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
