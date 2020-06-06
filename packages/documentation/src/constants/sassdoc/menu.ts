/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-menu-theme": {
      name: "rmd-menu-theme",
      description:
        "This function is used to quickly get one of the menu's theme values. This is really just for the `rmd-menu-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/menu/src/_functions.scss#L15-L17",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-menu-theme-values",
          type: "variable",
          packageName: "menu",
        },
      ],
      packageName: "menu",
      code: "@function rmd-menu-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-menu-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-menu-theme-values, menu);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-menu-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the menu's theme values.",
      },
    },
    "rmd-menu-theme-var": {
      name: "rmd-menu-theme-var",
      description:
        "This function is used to get one of the menu's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-menu-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/menu/src/_functions.scss#L32-L34",
      usedBy: [{ name: "react-md-menu", type: "mixin", packageName: "menu" }],
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-menu-theme-values",
          type: "variable",
          packageName: "menu",
        },
      ],
      packageName: "menu",
      code: "@function rmd-menu-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-menu-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-menu-theme-values,\n    menu,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-menu-theme-values` map keys to set a value for.",
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
        description: "one of the menu's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-menu-theme": {
      name: "rmd-menu-theme",
      description:
        "Creates the styles for one of the menu's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/menu/src/_mixins.scss#L25-L27",
      usedBy: [{ name: "rmd-menu", type: "mixin", packageName: "menu" }],
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-menu-theme-values",
          type: "variable",
          packageName: "menu",
        },
      ],
      packageName: "menu",
      code:
        "@mixin rmd-menu-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-menu-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-menu-theme-values,\n    menu\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-menu-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-menu-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-menu-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-menu-theme-update-var": {
      name: "rmd-menu-theme-update-var",
      description:
        "Updates one of the menu's theme variables with the new value for the section of your app.",
      source: "packages/menu/src/_mixins.scss#L35-L37",
      requires: [
        {
          name: "rmd-theme-update-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-menu-theme-values",
          type: "variable",
          packageName: "menu",
        },
      ],
      packageName: "menu",
      code: "@mixin rmd-menu-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-menu-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-menu-theme-values,\n    menu\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The menu theme style type to update. This should be one of the `$rmd-menu-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-menu": {
      name: "rmd-menu",
      description: "",
      source: "packages/menu/src/_mixins.scss#L40-L53",
      usedBy: [{ name: "react-md-menu", type: "mixin", packageName: "menu" }],
      requires: [
        {
          name: "rmd-utils-hide-focus-outline",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-utils-scroll", type: "mixin", packageName: "utils" },
        { name: "rmd-elevation", type: "mixin", packageName: "elevation" },
        { name: "rmd-menu-theme", type: "mixin", packageName: "menu" },
        { name: "rmd-menu-elevation", type: "variable", packageName: "menu" },
      ],
      packageName: "menu",
      code: "@mixin rmd-menu { … }",
      sourceCode:
        "@mixin rmd-menu {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-utils-scroll;\n  @include rmd-elevation($rmd-menu-elevation);\n  @include rmd-menu-theme(background-color);\n  @include rmd-menu-theme(color);\n  @include rmd-menu-theme(min-width);\n  @include rmd-menu-theme(z-index);\n\n  &--horizontal {\n    display: flex;\n    flex-wrap: nowrap;\n  }\n}\n",
      type: "mixin",
    },
    "react-md-menu": {
      name: "react-md-menu",
      description: "Creates all the styles for the @react-md/menu package.\n",
      source: "packages/menu/src/_mixins.scss#L56-L66",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        { name: "rmd-menu", type: "mixin", packageName: "menu" },
        {
          name: "rmd-icon-theme-update-var",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-menu-theme-var", type: "function", packageName: "menu" },
        {
          name: "rmd-menu-theme-values",
          type: "variable",
          packageName: "menu",
        },
      ],
      packageName: "menu",
      code: "@mixin react-md-menu { … }",
      sourceCode:
        "@mixin react-md-menu {\n  @include rmd-theme-create-root-theme($rmd-menu-theme-values, menu);\n\n  .rmd-menu {\n    @include rmd-menu;\n  }\n\n  .rmd-menu-item {\n    @include rmd-icon-theme-update-var(\n      text-spacing,\n      #{rmd-menu-theme-var(icon-spacing)}\n    );\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-menu-background-color": {
      name: "rmd-menu-background-color",
      description: "The background color to use for menus",
      source: "packages/menu/src/_variables.scss#L13",
      requires: [
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
      ],
      packageName: "menu",
      type: "Color",
      value: "rmd-theme-var(surface)",
      compiled: "var(--rmd-theme-surface, #fff)",
      overridable: true,
    },
    "rmd-menu-color": {
      name: "rmd-menu-color",
      description: "The text color to use for menus",
      source: "packages/menu/src/_variables.scss#L19",
      requires: [
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
      ],
      packageName: "menu",
      type: "Color",
      value: "rmd-theme-var(on-surface)",
      compiled: "var(--rmd-theme-on-surface, #000)",
      overridable: true,
    },
    "rmd-menu-z-index": {
      name: "rmd-menu-z-index",
      description: "The z-index for menus.",
      source: "packages/menu/src/_variables.scss#L25",
      requires: [
        {
          name: "rmd-utils-temporary-element-z-index",
          type: "variable",
          packageName: "utils",
        },
      ],
      packageName: "menu",
      type: "Number",
      value: "$rmd-utils-temporary-element-z-index",
      compiled: "30",
      overridable: true,
    },
    "rmd-menu-elevation": {
      name: "rmd-menu-elevation",
      description:
        "The elevation for menus. This should be a number from 0 to 24 (inclusive) as it gets passed to the `rmd-elevation` mixin.\n",
      source: "packages/menu/src/_variables.scss#L30",
      usedBy: [{ name: "rmd-menu", type: "mixin", packageName: "menu" }],
      packageName: "menu",
      type: "Number",
      value: "8",
      overridable: true,
    },
    "rmd-menu-min-width": {
      name: "rmd-menu-min-width",
      description: "The min-width to apply to menus.\n",
      source: "packages/menu/src/_variables.scss#L34",
      packageName: "menu",
      type: "Number",
      value: "7rem",
      overridable: true,
    },
    "rmd-menu-icon-spacing": {
      name: "rmd-menu-icon-spacing",
      description:
        'The amount of spacing to use between icons and text within menu items. This really overwrites the additional spacing provided in the base `list` package since menu items are normally more dense and don\'t need to align with specific "keylines" in your app.\n',
      source: "packages/menu/src/_variables.scss#L41",
      packageName: "menu",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-menu-theme-values": {
      name: "rmd-menu-theme-values",
      description:
        'A Map of all the "themeable" parts of the menu package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/menu/src/_variables.scss#L47-L53",
      usedBy: [
        { name: "rmd-menu-theme", type: "function", packageName: "menu" },
        { name: "rmd-menu-theme-var", type: "function", packageName: "menu" },
        { name: "rmd-menu-theme", type: "mixin", packageName: "menu" },
        {
          name: "rmd-menu-theme-update-var",
          type: "mixin",
          packageName: "menu",
        },
        { name: "react-md-menu", type: "mixin", packageName: "menu" },
      ],
      packageName: "menu",
      type: "Map",
      value:
        "(\n  background-color: $rmd-menu-background-color,\n  color: $rmd-menu-color,\n  min-width: $rmd-menu-min-width,\n  icon-spacing: $rmd-menu-icon-spacing,\n  z-index: $rmd-menu-z-index,\n)",
      compiled:
        "(\n  background-color: var(--rmd-theme-surface, #fff),\n  color: var(--rmd-theme-on-surface, #000),\n  min-width: 7rem,\n  icon-spacing: 1rem,\n  z-index: 30,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
