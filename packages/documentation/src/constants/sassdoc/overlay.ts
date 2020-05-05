/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-overlay-theme": {
      name: "rmd-overlay-theme",
      description:
        "This function is used to quickly get one of the overlay's theme values. This is really just for the `rmd-overlay-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/overlay/src/_functions.scss#L15-L17",
      packageName: "overlay",
      code: "@function rmd-overlay-theme($style) { … }",
      sourceCode:
        "@function rmd-overlay-theme($style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-overlay-theme-values,\n    overlay\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "One of the `$rmd-overlay-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the overlay's theme values.",
      },
    },
    "rmd-overlay-theme-var": {
      name: "rmd-overlay-theme-var",
      description:
        "This function is used to get one of the overlay's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-overlay-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/overlay/src/_functions.scss#L32-L34",
      packageName: "overlay",
      code:
        "@function rmd-overlay-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-overlay-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-overlay-theme-values,\n    overlay,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-overlay-theme-values` map keys to set a value for.",
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
        description: "one of the overlay's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-overlay-theme": {
      name: "rmd-overlay-theme",
      description:
        "Creates the styles for one of the overlay's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/overlay/src/_mixins.scss#L22-L24",
      usedBy: [{ name: "rmd-overlay", type: "mixin", packageName: "overlay" }],
      packageName: "overlay",
      code:
        "@mixin rmd-overlay-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-overlay-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-overlay-theme-values,\n    overlay\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-overlay-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-overlay-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-overlay-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-overlay-theme-update-var": {
      name: "rmd-overlay-theme-update-var",
      description:
        "Updates one of the overlay's theme variables with the new value for the section of your app.",
      source: "packages/overlay/src/_mixins.scss#L32-L34",
      packageName: "overlay",
      code: "@mixin rmd-overlay-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-overlay-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-overlay-theme-values,\n    overlay\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The overlay theme style type to update. This should be one of the `$rmd-overlay-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-overlay": {
      name: "rmd-overlay",
      description: "Creates the styles for the overlay component.\n",
      source: "packages/overlay/src/_mixins.scss#L37-L59",
      usedBy: [
        { name: "react-md-overlay", type: "mixin", packageName: "overlay" },
      ],
      packageName: "overlay",
      code: "@mixin rmd-overlay { … }",
      sourceCode:
        "@mixin rmd-overlay {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-overlay-theme(background-color);\n  @include rmd-overlay-theme(z-index);\n  @include rmd-transition(standard);\n  @include rmd-utils-full-screen;\n\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity $rmd-overlay-transition-duration;\n\n  &--active {\n    @include rmd-overlay-theme(opacity, active-opacity);\n  }\n\n  &--clickable {\n    cursor: pointer;\n  }\n\n  &--visible {\n    pointer-events: auto;\n  }\n}\n",
      type: "mixin",
    },
    "react-md-overlay": {
      name: "react-md-overlay",
      description:
        "Creates the styles for overlays within react-md and also creates all the theme css variables for overlays.\n",
      source: "packages/overlay/src/_mixins.scss#L63-L69",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "overlay",
      code: "@mixin react-md-overlay { … }",
      sourceCode:
        "@mixin react-md-overlay {\n  @include rmd-theme-create-root-theme($rmd-overlay-theme-values, overlay);\n\n  .rmd-overlay {\n    @include rmd-overlay;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-overlay-z-index": {
      name: "rmd-overlay-z-index",
      description: "The z-index for overlays.\n",
      source: "packages/overlay/src/_variables.scss#L11",
      usedBy: [
        { name: "rmd-dialog-z-index", type: "variable", packageName: "dialog" },
        {
          name: "rmd-sheet-raised-z-index",
          type: "variable",
          packageName: "sheet",
        },
      ],
      packageName: "overlay",
      type: "Number",
      value: "16",
      overridable: true,
    },
    "rmd-overlay-transition-duration": {
      name: "rmd-overlay-transition-duration",
      description: "The transition duration for overlays entering and leaving.",
      source: "packages/overlay/src/_variables.scss#L17",
      usedBy: [{ name: "rmd-overlay", type: "mixin", packageName: "overlay" }],
      packageName: "overlay",
      type: "Number",
      value: "$rmd-transition-standard-time",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-overlay-color": {
      name: "rmd-overlay-color",
      description:
        "The background color for the overlay. It is recommended to make sure that an opacity is applied instead of a static color.",
      source: "packages/overlay/src/_variables.scss#L24",
      packageName: "overlay",
      type: "Color",
      value: "rgba($rmd-black-base, 0.4)",
      compiled: "rgba(0, 0, 0, 0.4)",
      overridable: true,
    },
    "rmd-overlay-theme-values": {
      name: "rmd-overlay-theme-values",
      description:
        'A Map of all the "themeable" parts of the overlay package. Every key in this map will be used to create a css variable to dynamically update the values of the overlay as needed.\n',
      source: "packages/overlay/src/_variables.scss#L30-L34",
      usedBy: [
        { name: "rmd-overlay-theme", type: "function", packageName: "overlay" },
        {
          name: "rmd-overlay-theme-var",
          type: "function",
          packageName: "overlay",
        },
        { name: "rmd-overlay-theme", type: "mixin", packageName: "overlay" },
        {
          name: "rmd-overlay-theme-update-var",
          type: "mixin",
          packageName: "overlay",
        },
        { name: "react-md-overlay", type: "mixin", packageName: "overlay" },
      ],
      packageName: "overlay",
      type: "Map",
      value:
        "(\n  background-color: $rmd-overlay-color,\n  active-opacity: 1,\n  z-index: $rmd-overlay-z-index,\n)",
      compiled:
        "(\n  background-color: rgba(0, 0, 0, 0.4),\n  active-opacity: 1,\n  z-index: 16,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
