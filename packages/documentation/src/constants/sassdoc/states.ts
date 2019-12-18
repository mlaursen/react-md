/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-states-theme": {
      name: "rmd-states-theme",
      description:
        "This function is used to quickly get one of the states's theme values. This is really\njust for the `rmd-states-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/states/src/_functions.scss#L14-L16",
      packageName: "states",
      code: "@function rmd-states-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-states-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-states-theme-values, states);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-states-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the states's theme values.",
      },
    },
    "rmd-states-theme-var": {
      name: "rmd-states-theme-var",
      description:
        "This function is used to get one of the states's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-states-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/states/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        {
          name: "rmd-states-surface-selected",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-states-surface-selected",
          type: "mixin",
          packageName: "states",
        },
      ],
      packageName: "states",
      code:
        "@function rmd-states-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-states-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-states-theme-values, states, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-states-theme-values` map keys to set a value for.",
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
        description: "one of the states's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-states-theme": {
      name: "rmd-states-theme",
      description:
        "This function is used to quickly get one of the states's theme values. This is really\njust for the `rmd-states-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/states/src/_functions.scss#L14-L16",
      packageName: "states",
      code: "@function rmd-states-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-states-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-states-theme-values, states);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-states-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-states-theme-var": {
      name: "rmd-states-theme-var",
      description:
        "This function is used to get one of the states's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-states-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/states/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        {
          name: "rmd-states-surface-selected",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-states-surface-selected",
          type: "mixin",
          packageName: "states",
        },
      ],
      packageName: "states",
      code:
        "@function rmd-states-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-states-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-states-theme-values, states, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-states-theme-values` map keys to set a value for.",
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
    "rmd-states-use-ripple": {
      name: "rmd-states-use-ripple",
      description:
        "Boolean if the pressed and keyboard focus interaction states should use\nthe ripple effect. If this is set to false, a different background color\nwill be applied for each interaction state instead.\n\nNote: You will still need to update the `InteractionStatesContext` to\ndisable the ripple effects in javascript.\n\n",
      source: "packages/states/src/_variables.scss#L18",
      usedBy: [
        { name: "react-md-states", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-states-use-pressed-states-fallback": {
      name: "rmd-states-use-pressed-states-fallback",
      description:
        "Boolean if the pressed states fallback should also be included. You'd normally\nwant to disable this if only using the ripple effects, but there isn't too\nmuch code to it so you'd only save a few bytes by disabling it.\n",
      source: "packages/states/src/_variables.scss#L24",
      usedBy: [
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-states-use-focus-shadow": {
      name: "rmd-states-use-focus-shadow",
      description:
        "Boolean if the focus state should still us a box-shadow outline for keyboard users.\nThis is generally recommended for accessibility since the default `outline-style`\nis removed, and just a `background-color` change normally isn't enough to help\nusers determine the current focus of the page at a glance.\n\n",
      source: "packages/states/src/_variables.scss#L32",
      usedBy: [
        { name: "react-md-link", type: "mixin", packageName: "link" },
        {
          name: "rmd-states-focus-shadow",
          type: "mixin",
          packageName: "states",
        },
      ],
      packageName: "states",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-states-light-theme-background-color": {
      name: "rmd-states-light-theme-background-color",
      description:
        "The base background color to use for the different interaction states for\na light themed application. This is the color that gets different opacities\napplied to it.\n",
      source: "packages/states/src/_variables.scss#L38",
      packageName: "states",
      type: "Color",
      value: "$rmd-black-base",
      compiled: "#000",
      overridable: true,
    },
    "rmd-states-dark-theme-background-color": {
      name: "rmd-states-dark-theme-background-color",
      description:
        "The base background color to use for the different interaction states for\na dark themed application. This is the color that gets different opacities\napplied to it. This is currently the same color as the light themed version,\nbut it's available for reconfiguration if it's desired.\n",
      source: "packages/states/src/_variables.scss#L45",
      packageName: "states",
      type: "Color",
      value: "$rmd-black-base",
      compiled: "#000",
      overridable: true,
    },
    "rmd-states-light-theme-hover-color": {
      name: "rmd-states-light-theme-hover-color",
      description: "The hover color to use for light themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L49",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-light-theme-background-color, 0.08)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-light-theme-focus-color": {
      name: "rmd-states-light-theme-focus-color",
      description:
        "The keyboard focus color to use for light themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L53",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-light-theme-background-color, 0.24)",
      compiled: "rgba(0, 0, 0, 0.24)",
      overridable: true,
    },
    "rmd-states-light-theme-pressed-color": {
      name: "rmd-states-light-theme-pressed-color",
      description: "The pressed color to use for light themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L57-L60",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba(\n  $rmd-states-light-theme-background-color,\n  0.32\n)",
      compiled: "rgba(0, 0, 0, 0.32)",
      overridable: true,
    },
    "rmd-states-light-theme-selected-color": {
      name: "rmd-states-light-theme-selected-color",
      description: "The selected color to use for light themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L64-L67",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba(\n  $rmd-states-light-theme-background-color,\n  0.16\n)",
      compiled: "rgba(0, 0, 0, 0.16)",
      overridable: true,
    },
    "rmd-states-dark-theme-hover-color": {
      name: "rmd-states-dark-theme-hover-color",
      description: "The hover color to use for dark themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L71",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-dark-theme-background-color, 0.04)",
      compiled: "rgba(0, 0, 0, 0.04)",
      overridable: true,
    },
    "rmd-states-dark-theme-focus-color": {
      name: "rmd-states-dark-theme-focus-color",
      description:
        "The keyboard focus color to use for dark themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L75",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-dark-theme-background-color, 0.12)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-states-dark-theme-pressed-color": {
      name: "rmd-states-dark-theme-pressed-color",
      description: "The pressed color to use for dark themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L79",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-dark-theme-background-color, 0.16)",
      compiled: "rgba(0, 0, 0, 0.16)",
      overridable: true,
    },
    "rmd-states-dark-theme-selected-color": {
      name: "rmd-states-dark-theme-selected-color",
      description: "The selected color to use for dark themed backgrounds.\n",
      source: "packages/states/src/_variables.scss#L83",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-states-dark-theme-background-color, 0.12)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-states-light-theme-ripple-background-color": {
      name: "rmd-states-light-theme-ripple-background-color",
      description:
        "The base background color to use for the ripple effect in a light themed\napplication.\n",
      source: "packages/states/src/_variables.scss#L88",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-black-base, 0.08)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-dark-theme-ripple-background-color": {
      name: "rmd-states-dark-theme-ripple-background-color",
      description:
        "The base background color to use for the ripple effect in a dark themed\napplication.\n",
      source: "packages/states/src/_variables.scss#L93",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "states",
      type: "Color",
      value: "rgba($rmd-black-base, 0.08)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-background-color": {
      name: "rmd-states-background-color",
      description:
        "The background color to use for the different states. The default behavior\nis to use a base color and apply different opacities depending on the interaction\nwith the element.\n",
      source: "packages/states/src/_variables.scss#L99-L103",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-background-color,\n  $rmd-states-dark-theme-background-color\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-states-hover-color": {
      name: "rmd-states-hover-color",
      description:
        "The default hover color to use. This will be determined based on the current theme type\nof light or dark.\n",
      source: "packages/states/src/_variables.scss#L108-L112",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-hover-color,\n  $rmd-states-dark-theme-hover-color\n)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-focus-color": {
      name: "rmd-states-focus-color",
      description:
        "The default focus color to use. This will be determined based on the current theme type\nof light or dark.\n",
      source: "packages/states/src/_variables.scss#L117-L121",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-focus-color,\n  $rmd-states-dark-theme-focus-color\n)",
      compiled: "rgba(0, 0, 0, 0.24)",
      overridable: true,
    },
    "rmd-states-pressed-color": {
      name: "rmd-states-pressed-color",
      description:
        "The default pressed color to use. This will be determined based on the current theme type\nof light or dark.\n",
      source: "packages/states/src/_variables.scss#L126-L130",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-pressed-color,\n  $rmd-states-dark-theme-pressed-color\n)",
      compiled: "rgba(0, 0, 0, 0.32)",
      overridable: true,
    },
    "rmd-states-selected-color": {
      name: "rmd-states-selected-color",
      description:
        "The default selected color to use. This will be determined based on the current theme type\nof light or dark.\n",
      source: "packages/states/src/_variables.scss#L135-L139",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-selected-color,\n  $rmd-states-dark-theme-selected-color\n)",
      compiled: "rgba(0, 0, 0, 0.16)",
      overridable: true,
    },
    "rmd-states-focus-shadow-width": {
      name: "rmd-states-focus-shadow-width",
      description:
        "The keyboard focus shadow width to use when the `$rmd-states-use-focus-shadow`\nvariable is enabled.\n",
      source: "packages/states/src/_variables.scss#L144",
      usedBy: [{ name: "react-md-link", type: "mixin", packageName: "link" }],
      packageName: "states",
      type: "Number",
      value: "0.125rem",
      overridable: true,
    },
    "rmd-states-focus-shadow-color": {
      name: "rmd-states-focus-shadow-color",
      description:
        "The keyboard focus shadow color to use when the `$rmd-states-use-focus-shadow`\nvariable is enabled.\n",
      source: "packages/states/src/_variables.scss#L149",
      usedBy: [{ name: "react-md-link", type: "mixin", packageName: "link" }],
      packageName: "states",
      type: "Color",
      value: "$rmd-blue-500",
      compiled: "#2196f3",
      overridable: true,
    },
    "rmd-states-focus-shadow": {
      name: "rmd-states-focus-shadow",
      description:
        "The box-shadow to use when the user keyboard-focuses an element\nand the `$rmd-states-use-focus-shadow` variable is enabled.\n",
      source: "packages/states/src/_variables.scss#L154",
      packageName: "states",
      type: "String",
      value:
        "inset 0 0 0 $rmd-states-focus-shadow-width $rmd-states-focus-shadow-color",
      compiled: "inset 0 0 0 0.125rem #2196f3",
      overridable: true,
    },
    "rmd-states-ripple-background-color": {
      name: "rmd-states-ripple-background-color",
      description: "The base background color for the ripple effect.\n",
      source: "packages/states/src/_variables.scss#L158-L162",
      packageName: "states",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-states-light-theme-ripple-background-color,\n  $rmd-states-dark-theme-ripple-background-color\n)",
      compiled: "rgba(0, 0, 0, 0.08)",
      overridable: true,
    },
    "rmd-states-ripple-transform-duration": {
      name: "rmd-states-ripple-transform-duration",
      description:
        "The transition duration for the ripple transformation animation. This is the expanding circle\nanimation that overlaps a bit with the fade out animation.\n",
      source: "packages/states/src/_variables.scss#L167",
      packageName: "states",
      type: "Number",
      value: "0.45s",
      overridable: true,
    },
    "rmd-states-ripple-opacity-duration": {
      name: "rmd-states-ripple-opacity-duration",
      description:
        "The transition duration for the ripple opacity animation. This will be triggered\nwhen the ripple starts its exit animation.\n",
      source: "packages/states/src/_variables.scss#L172",
      packageName: "states",
      type: "Number",
      value: "0.3s",
      overridable: true,
    },
    "rmd-states-pressed-class-name": {
      name: "rmd-states-pressed-class-name",
      description:
        "The class name to use when using the pressed interaction fallback\n",
      source: "packages/states/src/_variables.scss#L176",
      usedBy: [
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
      ],
      packageName: "states",
      type: "String",
      value: "'.rmd-states--pressed'",
      compiled: ".rmd-states--pressed",
      overridable: true,
    },
    "rmd-states-theme-values": {
      name: "rmd-states-theme-values",
      description:
        'A Map of all the "themeable" parts of the states package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/states/src/_variables.scss#L182-L200",
      usedBy: [
        { name: "rmd-states-theme", type: "function", packageName: "states" },
        {
          name: "rmd-states-theme-var",
          type: "function",
          packageName: "states",
        },
        { name: "rmd-states-theme", type: "mixin", packageName: "states" },
        {
          name: "rmd-states-theme-update-var",
          type: "mixin",
          packageName: "states",
        },
        { name: "react-md-states", type: "mixin", packageName: "states" },
      ],
      packageName: "states",
      type: "Map",
      value:
        "(\n  background-color: transparent,\n  hover-color: $rmd-states-hover-color,\n  focus-color: $rmd-states-focus-color,\n  focus-shadow: $rmd-states-focus-shadow,\n  pressed-color: $rmd-states-pressed-color,\n  selected-color: $rmd-states-selected-color,\n  ripple-background-color: $rmd-states-ripple-background-color,\n  light-hover-color: $rmd-states-light-theme-hover-color,\n  light-focus-color: $rmd-states-light-theme-focus-color,\n  light-pressed-color: $rmd-states-light-theme-pressed-color,\n  light-selected-color: $rmd-states-light-theme-selected-color,\n  light-ripple-background-color: $rmd-states-light-theme-ripple-background-color,\n  dark-hover-color: $rmd-states-dark-theme-hover-color,\n  dark-focus-color: $rmd-states-dark-theme-focus-color,\n  dark-pressed-color: $rmd-states-dark-theme-pressed-color,\n  dark-selected-color: $rmd-states-dark-theme-selected-color,\n  dark-ripple-background-color: $rmd-states-dark-theme-ripple-background-color,\n)",
      compiled:
        "(\n  background-color: transparent,\n  hover-color: rgba(0, 0, 0, 0.08),\n  focus-color: rgba(0, 0, 0, 0.24),\n  focus-shadow: inset 0 0 0 0.125rem #2196f3,\n  pressed-color: rgba(0, 0, 0, 0.32),\n  selected-color: rgba(0, 0, 0, 0.16),\n  ripple-background-color: rgba(0, 0, 0, 0.08),\n  light-hover-color: rgba(0, 0, 0, 0.08),\n  light-focus-color: rgba(0, 0, 0, 0.24),\n  light-pressed-color: rgba(0, 0, 0, 0.32),\n  light-selected-color: rgba(0, 0, 0, 0.16),\n  light-ripple-background-color: rgba(0, 0, 0, 0.08),\n  dark-hover-color: rgba(0, 0, 0, 0.04),\n  dark-focus-color: rgba(0, 0, 0, 0.12),\n  dark-pressed-color: rgba(0, 0, 0, 0.16),\n  dark-selected-color: rgba(0, 0, 0, 0.12),\n  dark-ripple-background-color: rgba(0, 0, 0, 0.08),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
