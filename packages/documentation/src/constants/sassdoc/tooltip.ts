/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-tooltip-theme": {
      name: "rmd-tooltip-theme",
      description:
        "This function is used to quickly get one of the tooltip's theme values. This is really\njust for the `rmd-tooltip-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/tooltip/src/_functions.scss#L15-L17",
      packageName: "tooltip",
      code: "@function rmd-tooltip-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tooltip-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tooltip-theme-values, tooltip);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tooltip-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the tooltip's theme values.",
      },
    },
    "rmd-tooltip-theme-var": {
      name: "rmd-tooltip-theme-var",
      description:
        "This function is used to get one of the tooltip's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-tooltip-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/tooltip/src/_functions.scss#L30-L32",
      usedBy: [
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
      ],
      packageName: "tooltip",
      code:
        "@function rmd-tooltip-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-tooltip-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-tooltip-theme-values, tooltip, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tooltip-theme-values` map keys to set a value for.",
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
        description: "one of the tooltip's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-tooltip-theme": {
      name: "rmd-tooltip-theme",
      description:
        "This function is used to quickly get one of the tooltip's theme values. This is really\njust for the `rmd-tooltip-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/tooltip/src/_functions.scss#L15-L17",
      packageName: "tooltip",
      code: "@function rmd-tooltip-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tooltip-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tooltip-theme-values, tooltip);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tooltip-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-tooltip-theme-var": {
      name: "rmd-tooltip-theme-var",
      description:
        "This function is used to get one of the tooltip's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-tooltip-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/tooltip/src/_functions.scss#L30-L32",
      usedBy: [
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        {
          name: "rmd-tooltip-dense-theme",
          type: "mixin",
          packageName: "tooltip",
        },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
      ],
      packageName: "tooltip",
      code:
        "@function rmd-tooltip-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-tooltip-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-tooltip-theme-values, tooltip, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tooltip-theme-values` map keys to set a value for.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
    },
  },
  variables: {
    "rmd-tooltip-background-color": {
      name: "rmd-tooltip-background-color",
      description: "The background color to use for tooltips.\n",
      source: "packages/tooltip/src/_variables.scss#L10",
      packageName: "tooltip",
      type: "Color",
      value: "#616161",
      overridable: true,
    },
    "rmd-tooltip-color": {
      name: "rmd-tooltip-color",
      description:
        "The text color to use for tooltips. By default, this will inherit the primary\ntext colors for a dark or light background color of the tooltip.\n",
      source: "packages/tooltip/src/_variables.scss#L15-L19",
      packageName: "tooltip",
      type: "Color",
      value:
        "if(\n  rmd-theme-contrast-tone($rmd-tooltip-background-color) == 'light',\n  rmd-theme-var(text-primary-on-dark),\n  rmd-theme-var(text-primary-on-light)\n)",
      compiled: "var(--rmd-theme-text-primary-on-dark, #d9d9d9)",
      overridable: true,
    },
    "rmd-tooltip-max-width": {
      name: "rmd-tooltip-max-width",
      description: "The max width to apply to tooltips.\n",
      source: "packages/tooltip/src/_variables.scss#L23",
      packageName: "tooltip",
      type: "Number",
      value: "15rem",
      overridable: true,
    },
    "rmd-tooltip-enter-duration": {
      name: "rmd-tooltip-enter-duration",
      description:
        "The enter transition time for the tooltip to enter or to exit.\n",
      source: "packages/tooltip/src/_variables.scss#L27",
      usedBy: [
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-tooltip-exit-duration": {
      name: "rmd-tooltip-exit-duration",
      description:
        "The exit transition time for the tooltip to enter or to exit.\n",
      source: "packages/tooltip/src/_variables.scss#L31",
      usedBy: [{ name: "rmd-tooltip", type: "mixin", packageName: "tooltip" }],
      packageName: "tooltip",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-tooltip-z-index": {
      name: "rmd-tooltip-z-index",
      description: "The z-index to use for tooltips when they are visible.\n",
      source: "packages/tooltip/src/_variables.scss#L35",
      packageName: "tooltip",
      type: "Number",
      value: "100",
      overridable: true,
    },
    "rmd-tooltip-font-size": {
      name: "rmd-tooltip-font-size",
      description: "The font size to use for tooltips\n\n",
      source: "packages/tooltip/src/_variables.scss#L41",
      see: [
        {
          name: "rmd-tooltip-dense-font-size",
          type: "variable",
          packageName: "tooltip",
        },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-tooltip-line-height": {
      name: "rmd-tooltip-line-height",
      description: "The default line-height to use for tooltips.\n",
      source: "packages/tooltip/src/_variables.scss#L45",
      packageName: "tooltip",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-tooltip-min-height": {
      name: "rmd-tooltip-min-height",
      description:
        "The min height to use for tooltips. This allows the tooltips to grow in height automatically\nbased on line wrapping. You will need to add additional padding in these cases though.\n\n",
      source: "packages/tooltip/src/_variables.scss#L52",
      see: [
        {
          name: "rmd-tooltip-dense-min-height",
          type: "variable",
          packageName: "tooltip",
        },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "2rem",
      overridable: true,
    },
    "rmd-tooltip-horizontal-padding": {
      name: "rmd-tooltip-horizontal-padding",
      description: "The left and right padding to apply to tooltips.\n\n",
      source: "packages/tooltip/src/_variables.scss#L58",
      see: [
        {
          name: "rmd-tooltip-dense-horizontal-padding",
          type: "variable",
          packageName: "tooltip",
        },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-tooltip-line-wrap-vertical-padding": {
      name: "rmd-tooltip-line-wrap-vertical-padding",
      description:
        "The top and bottom padding to apply to tooltips when line wrapping is enabled.\n\n",
      source: "packages/tooltip/src/_variables.scss#L64",
      see: [
        {
          name: "rmd-tooltip-dense-line-wrap-vertical-padding",
          type: "variable",
          packageName: "tooltip",
        },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "0.5625rem",
      overridable: true,
    },
    "rmd-tooltip-spacing": {
      name: "rmd-tooltip-spacing",
      description:
        "The amount of spacing to place between the tooltip and the tooltip's container element.\n\n",
      source: "packages/tooltip/src/_variables.scss#L70",
      see: [
        {
          name: "rmd-tooltip-dense-spacing",
          type: "variable",
          packageName: "tooltip",
        },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-tooltip-dense-font-size": {
      name: "rmd-tooltip-dense-font-size",
      description: "The font size to use for dense tooltips.\n",
      source: "packages/tooltip/src/_variables.scss#L74",
      packageName: "tooltip",
      type: "Number",
      value: "0.625rem",
      overridable: true,
    },
    "rmd-tooltip-dense-line-height": {
      name: "rmd-tooltip-dense-line-height",
      description: "The line height to use for dense tooltips.\n",
      source: "packages/tooltip/src/_variables.scss#L78",
      packageName: "tooltip",
      type: "Number",
      value: "0.825rem",
      overridable: true,
    },
    "rmd-tooltip-dense-min-height": {
      name: "rmd-tooltip-dense-min-height",
      description:
        "The min-height to use for dense tooltips. This allows the tooltips to grow in height automatically\nbased on line wrapping. You will need to add additional padding in these cases though.\n\n",
      source: "packages/tooltip/src/_variables.scss#L85",
      see: [
        {
          name: "rmd-tooltip-min-height",
          type: "variable",
          packageName: "tooltip",
        },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "1.375rem",
      overridable: true,
    },
    "rmd-tooltip-dense-horizontal-padding": {
      name: "rmd-tooltip-dense-horizontal-padding",
      description: "The left and right padding to use for dense tooltips\n",
      source: "packages/tooltip/src/_variables.scss#L89",
      packageName: "tooltip",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-tooltip-dense-line-wrap-vertical-padding": {
      name: "rmd-tooltip-dense-line-wrap-vertical-padding",
      description:
        "The top and bottom padding to apply to dense tooltips when line wrapping is enabled.\n\n",
      source: "packages/tooltip/src/_variables.scss#L95",
      see: [
        {
          name: "rmd-tooltip-line-wrap-vertical-padding",
          type: "variable",
          packageName: "tooltip",
        },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "0.375rem",
      overridable: true,
    },
    "rmd-tooltip-dense-spacing": {
      name: "rmd-tooltip-dense-spacing",
      description:
        "The amount of spacing to place between the dense tooltip and the tooltip's container element.\n",
      source: "packages/tooltip/src/_variables.scss#L99",
      packageName: "tooltip",
      type: "Number",
      value: "0.875rem",
      overridable: true,
    },
    "rmd-tooltip-border-radius": {
      name: "rmd-tooltip-border-radius",
      description: "The border radius to apply to tooltips\n",
      source: "packages/tooltip/src/_variables.scss#L103",
      usedBy: [
        { name: "rmd-tooltip-base", type: "mixin", packageName: "tooltip" },
      ],
      packageName: "tooltip",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-tooltip-transition-distance": {
      name: "rmd-tooltip-transition-distance",
      description:
        "The distance that the tooltip should animate from the tooltip's control element.\n",
      source: "packages/tooltip/src/_variables.scss#L107",
      packageName: "tooltip",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-tooltip-position-values": {
      name: "rmd-tooltip-position-values",
      description:
        "This is really just for internal use and a ncie way to loop over the four positions when creating styles.\n",
      source: "packages/tooltip/src/_variables.scss#L111",
      packageName: "tooltip",
      type: "List",
      value: "above below left right",
      overridable: false,
    },
    "rmd-tooltip-theme-values": {
      name: "rmd-tooltip-theme-values",
      description:
        'A Map of all the "themeable" parts of the overlay package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/tooltip/src/_variables.scss#L117-L135",
      usedBy: [
        { name: "rmd-tooltip-theme", type: "function", packageName: "tooltip" },
        {
          name: "rmd-tooltip-theme-var",
          type: "function",
          packageName: "tooltip",
        },
        { name: "rmd-tooltip-theme", type: "mixin", packageName: "tooltip" },
        {
          name: "rmd-tooltip-theme-update-var",
          type: "mixin",
          packageName: "tooltip",
        },
        { name: "react-md-tooltip", type: "mixin", packageName: "tooltip" },
      ],
      packageName: "tooltip",
      type: "Map",
      value:
        "(\n  background-color: $rmd-tooltip-background-color,\n  color: $rmd-tooltip-color,\n  transition-distance: $rmd-tooltip-transition-distance,\n  z-index: $rmd-tooltip-z-index,\n  spacing: $rmd-tooltip-spacing,\n  min-height: $rmd-tooltip-min-height,\n  max-width: $rmd-tooltip-max-width,\n  font-size: $rmd-tooltip-font-size,\n  line-height: $rmd-tooltip-line-height,\n  horizontal-padding: $rmd-tooltip-horizontal-padding,\n  vertical-padding: $rmd-tooltip-line-wrap-vertical-padding,\n  dense-spacing: $rmd-tooltip-dense-spacing,\n  dense-min-height: $rmd-tooltip-dense-min-height,\n  dense-font-size: $rmd-tooltip-dense-font-size,\n  dense-line-height: $rmd-tooltip-dense-line-height,\n  dense-horizontal-padding: $rmd-tooltip-dense-horizontal-padding,\n  dense-vertical-padding: $rmd-tooltip-dense-line-wrap-vertical-padding,\n)",
      compiled:
        "(\n  background-color: #616161,\n  color: var(--rmd-theme-text-primary-on-dark, #d9d9d9),\n  transition-distance: 0.5rem,\n  z-index: 100,\n  spacing: 1.5rem,\n  min-height: 2rem,\n  max-width: 15rem,\n  font-size: 1rem,\n  line-height: 1.5rem,\n  horizontal-padding: 1rem,\n  vertical-padding: 0.5625rem,\n  dense-spacing: 0.875rem,\n  dense-min-height: 1.375rem,\n  dense-font-size: 0.625rem,\n  dense-line-height: 0.825rem,\n  dense-horizontal-padding: 0.5rem,\n  dense-vertical-padding: 0.375rem,\n)",
      overridable: false,
    },
  },
};

export default sassdoc;
