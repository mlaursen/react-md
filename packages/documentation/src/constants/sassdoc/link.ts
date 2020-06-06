/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-link-theme": {
      name: "rmd-link-theme",
      description:
        "This function is used to quickly get one of the link's theme values. This is really just for the `rmd-link-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/link/src/_functions.scss#L15-L17",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-link-theme-values",
          type: "variable",
          packageName: "link",
        },
      ],
      packageName: "link",
      code: "@function rmd-link-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-link-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-link-theme-values, link);\n}\n",
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
        "This function is used to get one of the link's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-link-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/link/src/_functions.scss#L32-L34",
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-link-theme-values",
          type: "variable",
          packageName: "link",
        },
      ],
      packageName: "link",
      code: "@function rmd-link-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-link-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-link-theme-values,\n    link,\n    $fallback\n  );\n}\n",
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
            "An optional fallback color to apply. This is set to `null` by default and not used since the link's theme variables should always exist.",
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
        "Creates the styles for one of the link's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/link/src/_mixins.scss#L23-L25",
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-link-theme-values",
          type: "variable",
          packageName: "link",
        },
      ],
      packageName: "link",
      code:
        "@mixin rmd-link-theme($property, $theme-style: property, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-link-theme($property, $theme-style: property, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-link-theme-values,\n    link\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-link-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          default: "property",
          description:
            "One of the keys of `rmd-link-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-link-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-link-theme-update-var": {
      name: "rmd-link-theme-update-var",
      description:
        "Updates one of the link's theme variables with the new value for the section of your app.",
      source: "packages/link/src/_mixins.scss#L33-L35",
      requires: [
        {
          name: "rmd-theme-update-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-link-theme-values",
          type: "variable",
          packageName: "link",
        },
      ],
      packageName: "link",
      code: "@mixin rmd-link-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-link-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-link-theme-values,\n    link\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The link theme style type to update. This should be one of the `$rmd-link-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "react-md-link": {
      name: "react-md-link",
      description: "Creates the styles for links within react-md.\n",
      source: "packages/link/src/_mixins.scss#L90-L100",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-link-theme-values",
          type: "variable",
          packageName: "link",
        },
      ],
      packageName: "link",
      code: "@mixin react-md-link { … }",
      sourceCode:
        "@mixin react-md-link {\n  @include rmd-theme-create-root-theme($rmd-link-theme-values, link);\n\n  .rmd-link {\n    @include rmd-link;\n  }\n\n  .rmd-link-skip {\n    @include rmd-link-skip;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-link-transition-time": {
      name: "rmd-link-transition-time",
      description: "The transition time for links to change color.",
      source: "packages/link/src/_variables.scss#L13",
      requires: [
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "link",
      type: "Number",
      value: "$rmd-transition-standard-time",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-link-color": {
      name: "rmd-link-color",
      description: "The default color to use for links.",
      source: "packages/link/src/_variables.scss#L19",
      requires: [
        { name: "rmd-blue-500", type: "variable", packageName: "theme" },
      ],
      packageName: "link",
      type: "Color",
      value: "$rmd-blue-500",
      compiled: "#2196f3",
      overridable: true,
    },
    "rmd-link-visited-color": {
      name: "rmd-link-visited-color",
      description: "The color to use for links that have been visited.",
      source: "packages/link/src/_variables.scss#L25",
      requires: [
        { name: "rmd-blue-600", type: "variable", packageName: "theme" },
      ],
      packageName: "link",
      type: "Color",
      value: "$rmd-blue-600",
      compiled: "#1e88e5",
      overridable: true,
    },
    "rmd-link-hover-color": {
      name: "rmd-link-hover-color",
      description: "The color to use for links that are being hovered.",
      source: "packages/link/src/_variables.scss#L31",
      requires: [
        { name: "rmd-blue-400", type: "variable", packageName: "theme" },
      ],
      packageName: "link",
      type: "Color",
      value: "$rmd-blue-400",
      compiled: "#42a5f5",
      overridable: true,
    },
    "rmd-link-skip-z-index": {
      name: "rmd-link-skip-z-index",
      description:
        "The z-index to apply for the skip to main content link. This should always be the biggest z-index in your app so it can be visible.\n",
      source: "packages/link/src/_variables.scss#L36",
      packageName: "link",
      type: "Number",
      value: "10000",
      overridable: true,
    },
    "rmd-link-skip-styles": {
      name: "rmd-link-skip-styles",
      description:
        "The default styles to apply to the skip to main content link.",
      source: "packages/link/src/_variables.scss#L42-L48",
      requires: [
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
      ],
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
        "The default styles to apply to the skip to main content link when it has become keyboard focused.",
      source: "packages/link/src/_variables.scss#L55-L57",
      requires: [
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
      ],
      packageName: "link",
      type: "Map",
      value: "(\n  outline: 0.25rem dashed $rmd-black-base,\n)",
      compiled: "(\n  outline: 0.25rem dashed #000,\n)",
      overridable: true,
    },
    "rmd-link-theme-values": {
      name: "rmd-link-theme-values",
      description:
        'A Map of all the "themeable" parts of the link package. Every key in this map will be used to create a css variable to dynamically update the values of the link as needed.\n',
      source: "packages/link/src/_variables.scss#L63-L67",
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
