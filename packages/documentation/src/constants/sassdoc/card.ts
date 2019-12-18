/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-card-theme": {
      name: "rmd-card-theme",
      description:
        "This function is used to quickly get one of the card's theme values. This is really\njust for the `rmd-card-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/card/src/_functions.scss#L14-L16",
      packageName: "card",
      code: "@function rmd-card-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-card-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-card-theme-values, card);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-card-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the card's theme values.",
      },
    },
    "rmd-card-theme-var": {
      name: "rmd-card-theme-var",
      description:
        "This function is used to get one of the card's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-card-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/card/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-card", type: "mixin", packageName: "card" },
        { name: "rmd-card", type: "mixin", packageName: "card" },
        { name: "rmd-card", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      code: "@function rmd-card-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-card-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-card-theme-values, card, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-card-theme-values` map keys to set a value for.",
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
        description: "one of the card's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-card-theme": {
      name: "rmd-card-theme",
      description:
        "This function is used to quickly get one of the card's theme values. This is really\njust for the `rmd-card-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/card/src/_functions.scss#L14-L16",
      packageName: "card",
      code: "@function rmd-card-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-card-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-card-theme-values, card);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-card-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-card-theme-var": {
      name: "rmd-card-theme-var",
      description:
        "This function is used to get one of the card's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-card-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/card/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-card", type: "mixin", packageName: "card" },
        { name: "rmd-card", type: "mixin", packageName: "card" },
        { name: "rmd-card", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      code: "@function rmd-card-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-card-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-card-theme-values, card, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-card-theme-values` map keys to set a value for.",
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
    "rmd-card-background-color": {
      name: "rmd-card-background-color",
      description: "The base background color to apply to cards.\n",
      source: "packages/card/src/_variables.scss#L9",
      packageName: "card",
      type: "Color",
      value: "rmd-theme-var(surface)",
      compiled: "var(--rmd-theme-surface, #fff)",
      overridable: true,
    },
    "rmd-card-color": {
      name: "rmd-card-color",
      description: "The base primary text color to apply to cards.\n",
      source: "packages/card/src/_variables.scss#L13",
      packageName: "card",
      type: "Color",
      value: "rmd-theme-var(on-surface)",
      compiled: "var(--rmd-theme-on-surface, #000)",
      overridable: true,
    },
    "rmd-card-secondary-color": {
      name: "rmd-card-secondary-color",
      description:
        "The base secondary text color to apply to cards. The `CardSubtitle` and\n`CardContent` components will use this color by default unless the\n`disableSecondaryColor` prop is enabled.\n",
      source: "packages/card/src/_variables.scss#L19-L23",
      packageName: "card",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-theme-surface) == light,\n  rmd-theme-var(text-primary-on-light),\n  rmd-theme-var(text-primary-on-dark)\n)",
      compiled: "var(--rmd-theme-text-primary-on-light, #212121)",
      overridable: true,
    },
    "rmd-card-elevation": {
      name: "rmd-card-elevation",
      description: "The elevation to use for cards that are not raiseable.\n",
      source: "packages/card/src/_variables.scss#L27",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-card-base-elevation": {
      name: "rmd-card-base-elevation",
      description: "The starting elevation for a raiseable card.\n",
      source: "packages/card/src/_variables.scss#L31",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "1",
      overridable: true,
    },
    "rmd-card-raised-elevation": {
      name: "rmd-card-raised-elevation",
      description: "The ending elevation for a raiseable card.\n",
      source: "packages/card/src/_variables.scss#L35",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "8",
      overridable: true,
    },
    "rmd-card-border-radius": {
      name: "rmd-card-border-radius",
      description: "The border radius to apply to cards.\n",
      source: "packages/card/src/_variables.scss#L39",
      usedBy: [{ name: "rmd-card", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-card-header-padding": {
      name: "rmd-card-header-padding",
      description:
        "The amount of padding to apply to the `CardHeader` component.\n",
      source: "packages/card/src/_variables.scss#L43",
      usedBy: [{ name: "rmd-card-header", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-card-header-padding-top": {
      name: "rmd-card-header-padding-top",
      description:
        "Any extra amount of padding to apply to the top of the `cardHeader` component.\nThis is really just added since it looks a bit nicer to have extra padding top.\n",
      source: "packages/card/src/_variables.scss#L48",
      usedBy: [{ name: "rmd-card-header", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-card-header-spacing": {
      name: "rmd-card-header-spacing",
      description:
        "The amount of spacing to use between the main content in the header and the\n`beforeChildren` and `afterChildren` props. This really gets used with the\n`TextIconSpacing` component from the @react-md/icon package\n",
      source: "packages/card/src/_variables.scss#L54",
      usedBy: [{ name: "rmd-card-header", type: "mixin", packageName: "card" }],
      packageName: "card",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-card-content-padding": {
      name: "rmd-card-content-padding",
      description:
        "The amount of padding to apply to the `CardContent` component.\n",
      source: "packages/card/src/_variables.scss#L58",
      usedBy: [
        { name: "rmd-card-content", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-card-content-padding-extra": {
      name: "rmd-card-content-padding-extra",
      description:
        "When the `CardContent` component is the last child in the `Card`, it normally looks\na bit nicer to apply a bit more padding to it. So this is the extra `padding-bottom`\nthat will be applied in that case.\n",
      source: "packages/card/src/_variables.scss#L64",
      usedBy: [
        { name: "rmd-card-content", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-card-actions-padding": {
      name: "rmd-card-actions-padding",
      description:
        "The amount of padding to apply to the `CardActions` component.\n",
      source: "packages/card/src/_variables.scss#L68",
      usedBy: [
        { name: "rmd-card-actions", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-card-theme-values": {
      name: "rmd-card-theme-values",
      description:
        'A Map of all the "themeable" parts of the card package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/card/src/_variables.scss#L74-L78",
      usedBy: [
        { name: "rmd-card-theme", type: "function", packageName: "card" },
        { name: "rmd-card-theme-var", type: "function", packageName: "card" },
        { name: "rmd-card-theme", type: "mixin", packageName: "card" },
        {
          name: "rmd-card-theme-update-var",
          type: "mixin",
          packageName: "card",
        },
        { name: "react-md-card", type: "mixin", packageName: "card" },
      ],
      packageName: "card",
      type: "Map",
      value:
        "(\n  background-color: $rmd-card-background-color,\n  color: $rmd-card-color,\n  secondary-color: $rmd-card-secondary-color,\n)",
      compiled:
        "(\n  background-color: var(--rmd-theme-surface, #fff),\n  color: var(--rmd-theme-on-surface, #000),\n  secondary-color: var(--rmd-theme-text-primary-on-light, #212121),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
