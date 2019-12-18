/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-link-theme": {
      name: "rmd-link-theme",
      description:
        "This function is used to quickly get one of the link's theme values. This is really\njust for the `rmd-link-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/link/src/_functions.scss#L14-L16",
      packageName: "link",
      code: "@function rmd-link-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-link-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-link-theme-values, link);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-link-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the link's theme values.",
      },
    },
    "rmd-link-theme-var": {
      name: "rmd-link-theme-var",
      description:
        "This function is used to get one of the link's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-link-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/link/src/_functions.scss#L29-L31",
      packageName: "link",
      code: "@function rmd-link-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-link-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-link-theme-values, link, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-link-theme-values` map keys to set a value for.",
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
        description: "one of the link's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-link-theme": {
      name: "rmd-link-theme",
      description:
        "This function is used to quickly get one of the link's theme values. This is really\njust for the `rmd-link-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/link/src/_functions.scss#L14-L16",
      packageName: "link",
      code: "@function rmd-link-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-link-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-link-theme-values, link);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-link-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-link-theme-var": {
      name: "rmd-link-theme-var",
      description:
        "This function is used to get one of the link's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-link-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/link/src/_functions.scss#L29-L31",
      packageName: "link",
      code: "@function rmd-link-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-link-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-link-theme-values, link, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-link-theme-values` map keys to set a value for.",
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
    "rmd-link-transition-time": {
      name: "rmd-link-transition-time",
      description: "The transition time for links to change color.\n",
      source: "packages/link/src/_variables.scss#L10",
      usedBy: [{ name: "react-md-link", type: "mixin", packageName: "link" }],
      packageName: "link",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-link-color": {
      name: "rmd-link-color",
      description: "The default color to use for links.\n",
      source: "packages/link/src/_variables.scss#L14",
      packageName: "link",
      type: "Color",
      value: "$rmd-blue-500",
      compiled: "#2196f3",
      overridable: true,
    },
    "rmd-link-visited-color": {
      name: "rmd-link-visited-color",
      description: "The color to use for links that have been visited.\n",
      source: "packages/link/src/_variables.scss#L18",
      packageName: "link",
      type: "Color",
      value: "$rmd-blue-600",
      compiled: "#1e88e5",
      overridable: true,
    },
    "rmd-link-hover-color": {
      name: "rmd-link-hover-color",
      description: "The color to use for links that are being hovered.\n",
      source: "packages/link/src/_variables.scss#L22",
      packageName: "link",
      type: "Color",
      value: "$rmd-blue-400",
      compiled: "#42a5f5",
      overridable: true,
    },
    "rmd-link-skip-z-index": {
      name: "rmd-link-skip-z-index",
      description:
        "The z-index to apply for the skip to main content link.\nThis should always be the biggest z-index in your app so it can be\nvisible.\n",
      source: "packages/link/src/_variables.scss#L28",
      usedBy: [{ name: "react-md-link", type: "mixin", packageName: "link" }],
      packageName: "link",
      type: "Number",
      value: "10000",
      overridable: true,
    },
    "rmd-link-skip-styles": {
      name: "rmd-link-skip-styles",
      description:
        "The default styles to apply to the skip to main content link.\n",
      source: "packages/link/src/_variables.scss#L32-L38",
      usedBy: [{ name: "react-md-link", type: "mixin", packageName: "link" }],
      packageName: "link",
      type: "Map",
      value:
        "(\n  color: rmd-theme-var(on-primary),\n  left: 50%,\n  padding: 0.25rem 1rem,\n  top: 0.25rem,\n  transform: translateX(-50%),\n)",
      compiled:
        "(\n  color: var(--rmd-theme-on-primary, #000),\n  left: 50%,\n  padding: 0.25rem 1rem,\n  top: 0.25rem,\n  transform: translateX(-50%),\n)",
      overridable: true,
    },
    "rmd-link-skip-active-styles": {
      name: "rmd-link-skip-active-styles",
      description:
        "The default styles to apply to the skip to main content link when it has become\nkeyboard focused.\n",
      source: "packages/link/src/_variables.scss#L43-L45",
      usedBy: [{ name: "react-md-link", type: "mixin", packageName: "link" }],
      packageName: "link",
      type: "Map",
      value: "(\n  outline: 0.25rem dashed $rmd-black-base,\n)",
      compiled: "(\n  outline: 0.25rem dashed #000,\n)",
      overridable: true,
    },
    "rmd-link-theme-values": {
      name: "rmd-link-theme-values",
      description:
        'A Map of all the "themeable" parts of the link package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the link as\nneeded.\n',
      source: "packages/link/src/_variables.scss#L51-L55",
      usedBy: [
        { name: "rmd-link-theme", type: "function", packageName: "link" },
        { name: "rmd-link-theme-var", type: "function", packageName: "link" },
        { name: "rmd-link-theme", type: "mixin", packageName: "link" },
        {
          name: "rmd-link-theme-update-var",
          type: "mixin",
          packageName: "link",
        },
        { name: "react-md-link", type: "mixin", packageName: "link" },
      ],
      packageName: "link",
      type: "Map",
      value:
        "(\n  color: $rmd-link-color,\n  hover-color: $rmd-link-hover-color,\n  visited-color: $rmd-link-visited-color,\n)",
      compiled:
        "(\n  color: #2196f3,\n  hover-color: #42a5f5,\n  visited-color: #1e88e5,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
