/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-sheet-theme": {
      name: "rmd-sheet-theme",
      description:
        "This function is used to quickly get one of the sheet's theme values. This is really\njust for the `rmd-sheet-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/sheet/src/_functions.scss#L14-L16",
      packageName: "sheet",
      code: "@function rmd-sheet-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-sheet-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-sheet-theme-values, sheet);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-sheet-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the sheet's theme values.",
      },
    },
    "rmd-sheet-theme-var": {
      name: "rmd-sheet-theme-var",
      description:
        "This function is used to get one of the sheet's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-sheet-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/sheet/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
      ],
      packageName: "sheet",
      code:
        "@function rmd-sheet-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-sheet-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-sheet-theme-values, sheet, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-sheet-theme-values` map keys to set a value for.",
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
        description: "one of the sheet's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-sheet-theme": {
      name: "rmd-sheet-theme",
      description:
        "This function is used to quickly get one of the sheet's theme values. This is really\njust for the `rmd-sheet-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/sheet/src/_functions.scss#L14-L16",
      packageName: "sheet",
      code: "@function rmd-sheet-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-sheet-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-sheet-theme-values, sheet);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-sheet-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-sheet-theme-var": {
      name: "rmd-sheet-theme-var",
      description:
        "This function is used to get one of the sheet's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-sheet-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/sheet/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
      ],
      packageName: "sheet",
      code:
        "@function rmd-sheet-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-sheet-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-sheet-theme-values, sheet, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-sheet-theme-values` map keys to set a value for.",
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
    "rmd-sheet-z-index": {
      name: "rmd-sheet-z-index",
      description:
        "The z-index to use for sheets that normally appear without an overlay and inline with other content.\n",
      source: "packages/sheet/src/_variables.scss#L11",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "1",
      overridable: true,
    },
    "rmd-sheet-raised-z-index": {
      name: "rmd-sheet-raised-z-index",
      description:
        "The z-index to use for sheets that normally appear with an overlay and covering other elements on\nthe page.\n",
      source: "packages/sheet/src/_variables.scss#L16",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "$rmd-overlay-z-index + 1",
      compiled: "17",
      overridable: true,
    },
    "rmd-sheet-overlay-z-index": {
      name: "rmd-sheet-overlay-z-index",
      description:
        "The z-index to use for a sheet's overlay. This value just needs to be smaller than the\n`$rmd-sheet-raised-z-index` value so the overlay does not cover the sheet.\n",
      source: "packages/sheet/src/_variables.scss#L21",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "$rmd-sheet-raised-z-index - 1",
      compiled: "16",
      overridable: true,
    },
    "rmd-sheet-elevation": {
      name: "rmd-sheet-elevation",
      description:
        'This is the default elevation to use for sheets that do not have an overlay. This is normally\nused for showing sheets more "inline" with other content.\n',
      source: "packages/sheet/src/_variables.scss#L26",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-sheet-raised-elevation": {
      name: "rmd-sheet-raised-elevation",
      description:
        "The elevation to use for temporary sheets that usually display an overlay as well.\n",
      source: "packages/sheet/src/_variables.scss#L30",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "16",
      overridable: true,
    },
    "rmd-sheet-enter-duration": {
      name: "rmd-sheet-enter-duration",
      description: "The duration for the enter transition.\n",
      source: "packages/sheet/src/_variables.scss#L34",
      usedBy: [
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
      ],
      packageName: "sheet",
      type: "Number",
      value: "0.2s",
      overridable: true,
    },
    "rmd-sheet-leave-duration": {
      name: "rmd-sheet-leave-duration",
      description: "The duration for the leave transition.\n",
      source: "packages/sheet/src/_variables.scss#L38",
      packageName: "sheet",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-sheet-touch-margin": {
      name: "rmd-sheet-touch-margin",
      description:
        "The amount of horizontal margin to use between the viewport's edge and the sheet's edge. This\nis used so that mobile devies have an overlay \"touch target\" to close the sheet without requiring\none of the actions to be clicked.\n",
      source: "packages/sheet/src/_variables.scss#L44",
      packageName: "sheet",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-sheet-touch-width": {
      name: "rmd-sheet-touch-width",
      description: "The width of a sheet on small touch devices.\n",
      source: "packages/sheet/src/_variables.scss#L48",
      packageName: "sheet",
      type: "Number",
      value: "calc(100vw - #{$rmd-sheet-touch-margin})",
      compiled: "calc(100vw - 3.5rem)",
      overridable: true,
    },
    "rmd-sheet-static-width": {
      name: "rmd-sheet-static-width",
      description:
        'The width to apply to "static" width sheets. This width **should not** be used on phones but can be\nused for tablets or desktops.\n',
      source: "packages/sheet/src/_variables.scss#L53",
      packageName: "sheet",
      type: "Number",
      value: "16rem",
      overridable: true,
    },
    "rmd-sheet-max-height": {
      name: "rmd-sheet-max-height",
      description:
        "The max height to set for sheets. It is recommended to leave this as 100% and instead update the\n`$rmd-sheet-touchable-max-height` instead.\n",
      source: "packages/sheet/src/_variables.scss#L59",
      see: [
        {
          name: "rmd-sheet-touchable-max-height",
          type: "variable",
          packageName: "sheet",
        },
      ],
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "100%",
      overridable: true,
    },
    "rmd-sheet-touchable-max-height": {
      name: "rmd-sheet-touchable-max-height",
      description:
        'The max height for a sheet that has a "touchable" area that can be used to close the sheet without selecting\none of the actions.\n\n',
      source: "packages/sheet/src/_variables.scss#L65",
      packageName: "sheet",
      type: "Number",
      value: "calc(100% - #{$rmd-sheet-touch-margin})",
      compiled: "calc(100% - 3.5rem)",
      overridable: true,
    },
    "rmd-sheet-recommended-min-height": {
      name: "rmd-sheet-recommended-min-height",
      description:
        'The "recommended" min-height from the material design spec for bottom sheets.\n',
      source: "packages/sheet/src/_variables.scss#L69",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-sheet-recommended-max-height": {
      name: "rmd-sheet-recommended-max-height",
      description:
        'The "recommended" max-height from the material design spec for bottom sheets. I personally think it is better\nto either set the max-height to `calc(100% - 3.5rem)` or `100%` with a close button.\n',
      source: "packages/sheet/src/_variables.scss#L74",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-sheet-positions": {
      name: "rmd-sheet-positions",
      description:
        "A list of positions that are supported by the sheet component.\n",
      source: "packages/sheet/src/_variables.scss#L78",
      packageName: "sheet",
      type: "List",
      value: "top right bottom left",
      overridable: false,
    },
    "rmd-sheet-enabled-positions": {
      name: "rmd-sheet-enabled-positions",
      description:
        "The positions that are created by default with the `react-md-sheet` mixin. When generating\nstyles, this list will be looped through to create the correct position styles.\n",
      source: "packages/sheet/src/_variables.scss#L83",
      packageName: "sheet",
      type: "List",
      value: "$rmd-sheet-positions",
      compiled: "top,right,bottom,left",
      overridable: true,
    },
    "rmd-sheet-theme-values": {
      name: "rmd-sheet-theme-values",
      description:
        'A Map of all the "themeable" parts of the sheet package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/sheet/src/_variables.scss#L89-L97",
      usedBy: [
        { name: "rmd-sheet-theme", type: "function", packageName: "sheet" },
        { name: "rmd-sheet-theme-var", type: "function", packageName: "sheet" },
        { name: "rmd-sheet-theme", type: "mixin", packageName: "sheet" },
        {
          name: "rmd-sheet-theme-update-var",
          type: "mixin",
          packageName: "sheet",
        },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
      ],
      packageName: "sheet",
      type: "Map",
      value:
        "(\n  touch-width: $rmd-sheet-touch-width,\n  static-width: $rmd-sheet-static-width,\n  touchable-max-height: $rmd-sheet-touchable-max-height,\n  max-height: null,\n  height: null,\n  width: null,\n  transform-offscreen: null,\n)",
      compiled:
        "(\n  touch-width: calc(100vw - 3.5rem),\n  static-width: 16rem,\n  touchable-max-height: calc(100% - 3.5rem),\n  max-height: null,\n  height: null,\n  width: null,\n  transform-offscreen: null,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
