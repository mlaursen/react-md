/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-tree-theme": {
      name: "rmd-tree-theme",
      description:
        "This function is used to quickly get one of the tree's theme values. This is really\njust for the `rmd-tree-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/tree/src/_functions.scss#L14-L16",
      packageName: "tree",
      code: "@function rmd-tree-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tree-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tree-theme-values, tree);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tree-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the tree's theme values.",
      },
    },
    "rmd-tree-theme-var": {
      name: "rmd-tree-theme-var",
      description:
        "This function is used to get one of the tree's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-tree-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/tree/src/_functions.scss#L29-L31",
      packageName: "tree",
      code: "@function rmd-tree-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-tree-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-tree-theme-values, tree, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tree-theme-values` map keys to set a value for.",
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
        description: "one of the tree's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-tree-theme": {
      name: "rmd-tree-theme",
      description:
        "This function is used to quickly get one of the tree's theme values. This is really\njust for the `rmd-tree-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/tree/src/_functions.scss#L14-L16",
      packageName: "tree",
      code: "@function rmd-tree-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tree-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tree-theme-values, tree);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tree-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-tree-theme-var": {
      name: "rmd-tree-theme-var",
      description:
        "This function is used to get one of the tree's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-tree-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/tree/src/_functions.scss#L29-L31",
      packageName: "tree",
      code: "@function rmd-tree-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-tree-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-tree-theme-values, tree, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tree-theme-values` map keys to set a value for.",
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
    "rmd-tree-max-depth": {
      name: "rmd-tree-max-depth",
      description:
        "The default max-depth to create for the tree depths. This is used in the `rmd-tree-depths` mixin to generate offsets\nin css based on how deep a tree item is. If this value is less than or equal to 1, no depth styles will be created.\n\n",
      source: "packages/tree/src/_variables.scss#L11",
      packageName: "tree",
      type: "Number",
      value: "3",
      overridable: true,
    },
    "rmd-tree-item-padding-incrementor": {
      name: "rmd-tree-item-padding-incrementor",
      description:
        "The amount of padding that should be multiplied by the current depth and added to the `rmd-tree-item-padding-base`.\n\n",
      source: "packages/tree/src/_variables.scss#L18",
      see: [
        { name: "rmd-tree-depths", type: "mixin", packageName: "tree" },
        { name: "rmd-tree-item-at-depth", type: "mixin", packageName: "tree" },
      ],
      packageName: "tree",
      type: "Number",
      value: "$rmd-list-item-horizontal-padding * 1.5",
      compiled: "1.5rem",
      overridable: true,
    },
    "rmd-tree-item-padding-base": {
      name: "rmd-tree-item-padding-base",
      description:
        "The base amout of padding to apply to a tree item that has a depth greater than 1. This is set to a value\nthat assumes you have icons to the left of the items at the base level. If you do not, it would be better to\nset this value to something smaller or `$rmd-list-item-horizontal-padding * 2.5`.\n\n",
      source: "packages/tree/src/_variables.scss#L27",
      see: [
        { name: "rmd-tree-depths", type: "mixin", packageName: "tree" },
        { name: "rmd-tree-item-at-depth", type: "mixin", packageName: "tree" },
      ],
      packageName: "tree",
      type: "Number",
      value: "$rmd-list-item-text-keyline",
      compiled: "4.5rem",
      overridable: true,
    },
    "rmd-tree-item-focused-styles": {
      name: "rmd-tree-item-focused-styles",
      description:
        "The styles to apply when a tree item gains focus. These styles will be applied even\nafter a touch or mouse click.\n",
      source: "packages/tree/src/_variables.scss#L32",
      usedBy: [{ name: "rmd-tree-item", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      type: "Map",
      value: "()",
      overridable: true,
    },
    "rmd-tree-item-keyboard-focused-styles": {
      name: "rmd-tree-item-keyboard-focused-styles",
      description:
        "The styles to apply to a tree item that is **focused while in keyboard mode** only.\nIf you want to apply focus styles for all modes, use the `$rmd-tree-item-focused-styles`\ninstead and set this value to `null` or an empty Map `()`.\n\n",
      source: "packages/tree/src/_variables.scss#L40-L42",
      see: [
        {
          name: "rmd-tree-item-focused-styles",
          type: "variable",
          packageName: "tree",
        },
      ],
      usedBy: [{ name: "rmd-tree-item", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      type: "Map",
      value: "(\n  box-shadow: inset 0 0 0 2px $rmd-blue-500,\n)",
      compiled: "(\n  box-shadow: inset 0 0 0 2px #2196f3,\n)",
      overridable: true,
    },
    "rmd-tree-theme-values": {
      name: "rmd-tree-theme-values",
      description:
        'A Map of all the "themeable" parts of the tree package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/tree/src/_variables.scss#L48-L51",
      usedBy: [
        { name: "rmd-tree-theme", type: "function", packageName: "tree" },
        { name: "rmd-tree-theme-var", type: "function", packageName: "tree" },
        { name: "rmd-tree-theme", type: "mixin", packageName: "tree" },
        {
          name: "rmd-tree-theme-update-var",
          type: "mixin",
          packageName: "tree",
        },
        { name: "react-md-tree", type: "mixin", packageName: "tree" },
      ],
      packageName: "tree",
      type: "Map",
      value:
        "(\n  incrementor: $rmd-tree-item-padding-incrementor,\n  base-padding: $rmd-tree-item-padding-base,\n)",
      compiled: "(\n  incrementor: 1.5rem,\n  base-padding: 4.5rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
