/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-overlay-theme": {
      name: "rmd-overlay-theme",
      description:
        "This function is used to quickly get one of the overlay's theme values. This is really\njust for the `rmd-overlay-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/overlay/src/_functions.scss#L14-L16",
      packageName: "overlay",
      code: "@function rmd-overlay-theme($style) { … }",
      sourceCode:
        "@function rmd-overlay-theme($style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-overlay-theme-values, overlay);\n}",
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
        "This function is used to get one of the overlay's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-overlay-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/overlay/src/_functions.scss#L29-L31",
      packageName: "overlay",
      code:
        "@function rmd-overlay-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-overlay-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-overlay-theme-values, overlay, $fallback);\n}",
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
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
        "This function is used to quickly get one of the overlay's theme values. This is really\njust for the `rmd-overlay-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/overlay/src/_functions.scss#L14-L16",
      packageName: "overlay",
      code: "@function rmd-overlay-theme($style) { … }",
      sourceCode:
        "@function rmd-overlay-theme($style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-overlay-theme-values, overlay);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "One of the `$rmd-overlay-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-overlay-theme-var": {
      name: "rmd-overlay-theme-var",
      description:
        "This function is used to get one of the overlay's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-overlay-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/overlay/src/_functions.scss#L29-L31",
      packageName: "overlay",
      code:
        "@function rmd-overlay-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-overlay-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-overlay-theme-values, overlay, $fallback);\n}",
      type: "mixin",
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
    },
  },
  variables: {
    "rmd-overlay-z-index": {
      name: "rmd-overlay-z-index",
      description: "The z-index for overlays.\n",
      source: "packages/overlay/src/_variables.scss#L10",
      packageName: "overlay",
      type: "Number",
      value: "16",
      overridable: true,
    },
    "rmd-overlay-transition-duration": {
      name: "rmd-overlay-transition-duration",
      description:
        "The transition duration for overlays entering and leaving.\n",
      source: "packages/overlay/src/_variables.scss#L14",
      usedBy: [{ name: "rmd-overlay", type: "mixin", packageName: "overlay" }],
      packageName: "overlay",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-overlay-color": {
      name: "rmd-overlay-color",
      description:
        "The background color for the overlay. It is recommended to make sure that an opacity\nis applied instead of a static color.\n",
      source: "packages/overlay/src/_variables.scss#L19",
      packageName: "overlay",
      type: "Color",
      value: "rgba($rmd-black-base, 0.4)",
      compiled: "rgba(0, 0, 0, 0.4)",
      overridable: true,
    },
    "rmd-overlay-theme-values": {
      name: "rmd-overlay-theme-values",
      description:
        'A Map of all the "themeable" parts of the overlay package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the overlay as\nneeded.\n',
      source: "packages/overlay/src/_variables.scss#L25-L29",
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
