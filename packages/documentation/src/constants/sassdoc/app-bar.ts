/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-app-bar-theme": {
      name: "rmd-app-bar-theme",
      description:
        "This function is used to quickly get one of the app-bar's theme values. This is really\njust for the `rmd-app-bar-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/app-bar/src/_functions.scss#L14-L16",
      packageName: "app-bar",
      code: "@function rmd-app-bar-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-app-bar-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-app-bar-theme-values, app-bar);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-app-bar-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the app-bar's theme values.",
      },
    },
    "rmd-app-bar-theme-var": {
      name: "rmd-app-bar-theme-var",
      description:
        "This function is used to get one of the app-bar's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-app-bar-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/app-bar/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-app-bar-fixed", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-dense-theme",
          type: "mixin",
          packageName: "app-bar",
        },
        {
          name: "rmd-app-bar-dense-theme",
          type: "mixin",
          packageName: "app-bar",
        },
      ],
      packageName: "app-bar",
      code:
        "@function rmd-app-bar-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-app-bar-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-app-bar-theme-values, app-bar, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-app-bar-theme-values` map keys to set a value for.",
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
        description: "one of the app-bar's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-app-bar-theme": {
      name: "rmd-app-bar-theme",
      description:
        "This function is used to quickly get one of the app-bar's theme values. This is really\njust for the `rmd-app-bar-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/app-bar/src/_functions.scss#L14-L16",
      packageName: "app-bar",
      code: "@function rmd-app-bar-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-app-bar-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-app-bar-theme-values, app-bar);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-app-bar-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-app-bar-theme-var": {
      name: "rmd-app-bar-theme-var",
      description:
        "This function is used to get one of the app-bar's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-app-bar-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/app-bar/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-app-bar-fixed", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-dense-theme",
          type: "mixin",
          packageName: "app-bar",
        },
        {
          name: "rmd-app-bar-dense-theme",
          type: "mixin",
          packageName: "app-bar",
        },
      ],
      packageName: "app-bar",
      code:
        "@function rmd-app-bar-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-app-bar-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-app-bar-theme-values, app-bar, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-app-bar-theme-values` map keys to set a value for.",
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
    "rmd-app-bar-z-index": {
      name: "rmd-app-bar-z-index",
      description:
        'The z-index to use for the fixed app bar. Ideally this value should be less than\nany of the "temporary" materials like overlays, sheets, and menus.\n',
      source: "packages/app-bar/src/_variables.scss#L13",
      usedBy: [
        { name: "rmd-app-bar-fixed", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "10",
      overridable: true,
    },
    "rmd-app-bar-fixed-elevation": {
      name: "rmd-app-bar-fixed-elevation",
      description:
        'The elevation to use for "fixed" app bars. This should be a number between 0 and 16.\n',
      source: "packages/app-bar/src/_variables.scss#L17",
      usedBy: [
        { name: "rmd-app-bar-fixed", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-app-bar-height": {
      name: "rmd-app-bar-height",
      description: "The height for the app bar.\n",
      source: "packages/app-bar/src/_variables.scss#L21",
      packageName: "app-bar",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-app-bar-dense-height": {
      name: "rmd-app-bar-dense-height",
      description: "The dense height for the app bar.\n",
      source: "packages/app-bar/src/_variables.scss#L25",
      packageName: "app-bar",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-app-bar-prominent-height": {
      name: "rmd-app-bar-prominent-height",
      description: "The prominent/extended height for the app bar.\n",
      source: "packages/app-bar/src/_variables.scss#L29",
      packageName: "app-bar",
      type: "Number",
      value: "$rmd-app-bar-height * 2",
      compiled: "7rem",
      overridable: true,
    },
    "rmd-app-bar-prominent-dense-height": {
      name: "rmd-app-bar-prominent-dense-height",
      description:
        "The prominent/extended height for the app bar when the `dense` prop is also enabled.\n",
      source: "packages/app-bar/src/_variables.scss#L33",
      packageName: "app-bar",
      type: "Number",
      value: "$rmd-app-bar-dense-height * 2",
      compiled: "6rem",
      overridable: true,
    },
    "rmd-app-bar-keyline": {
      name: "rmd-app-bar-keyline",
      description:
        "The default keyline to use for either the `AppBarNav` or `AppBarTitle`. This makes the icon in the `AppBarNav` or\nthe first letter in the `AppBarTitle` appear at this distance.\n",
      source: "packages/app-bar/src/_variables.scss#L38",
      usedBy: [
        { name: "rmd-app-bar-title", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-app-bar-nav-margin": {
      name: "rmd-app-bar-nav-margin",
      description:
        "The amount of margin to apply to the `AppBarNav` based on the `$rmd-app-bar-keyline` so that the icon will be positioned\nat the keyline (ignoring the button padding).\n",
      source: "packages/app-bar/src/_variables.scss#L43",
      packageName: "app-bar",
      type: "Number",
      value:
        "$rmd-app-bar-keyline - (($rmd-button-icon-size - $rmd-icon-size) / 2)",
      compiled: "0.25rem",
      overridable: false,
    },
    "rmd-app-bar-title-keyline": {
      name: "rmd-app-bar-title-keyline",
      description:
        "The keyline for the `AppBarTitle` to use when used with the `AppBarNav` or the `offset` prop is enabled.\n",
      source: "packages/app-bar/src/_variables.scss#L47",
      usedBy: [
        { name: "rmd-app-bar-title", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-app-bar-title-nav-margin": {
      name: "rmd-app-bar-title-nav-margin",
      description:
        "The amount of margin to apply to the title when used with the `AppBarNav` component.\n",
      source: "packages/app-bar/src/_variables.scss#L51-L52",
      usedBy: [
        { name: "rmd-app-bar-nav", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value:
        "$rmd-app-bar-title-keyline - $rmd-app-bar-nav-margin -\n  $rmd-button-icon-size",
      compiled: "1.25rem",
      overridable: false,
    },
    "rmd-app-bar-lr-margin": {
      name: "rmd-app-bar-lr-margin",
      description:
        "The amount of margin to apply to the first and last element within the app bar (per row basis). This will automatically be\napplied if using the `AppBarNav` component and will be applied to the `AppBarAction` component that enables the `last` prop.\n",
      source: "packages/app-bar/src/_variables.scss#L57",
      usedBy: [
        { name: "rmd-app-bar-nav", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-action-position",
          type: "mixin",
          packageName: "app-bar",
        },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-app-bar-primary-background-color": {
      name: "rmd-app-bar-primary-background-color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"primary"`.\n',
      source: "packages/app-bar/src/_variables.scss#L61",
      packageName: "app-bar",
      type: "Color",
      value: "rmd-theme-var(primary)",
      compiled: "var(--rmd-theme-primary, #9c27b0)",
      overridable: true,
    },
    "rmd-app-bar-primary-color": {
      name: "rmd-app-bar-primary-color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"primary"`.\n',
      source: "packages/app-bar/src/_variables.scss#L65",
      packageName: "app-bar",
      type: "Color",
      value: "rmd-theme-var(on-primary)",
      compiled: "var(--rmd-theme-on-primary, #000)",
      overridable: true,
    },
    "rmd-app-bar-secondary-background-color": {
      name: "rmd-app-bar-secondary-background-color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"secondary"`.\n',
      source: "packages/app-bar/src/_variables.scss#L69",
      packageName: "app-bar",
      type: "Color",
      value: "rmd-theme-var(secondary)",
      compiled: "var(--rmd-theme-secondary, #f50057)",
      overridable: true,
    },
    "rmd-app-bar-secondary-color": {
      name: "rmd-app-bar-secondary-color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"secondary"`.\n',
      source: "packages/app-bar/src/_variables.scss#L73",
      packageName: "app-bar",
      type: "Color",
      value: "rmd-theme-var(on-secondary)",
      compiled: "var(--rmd-theme-on-secondary, #000)",
      overridable: true,
    },
    "rmd-app-bar-default-light-theme-background-color": {
      name: "rmd-app-bar-default-light-theme-background-color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"default"`\nand the app is currently using a light theme.\n',
      source: "packages/app-bar/src/_variables.scss#L78",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "app-bar",
      type: "Color",
      value: "$rmd-grey-100",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-app-bar-default-light-theme-color": {
      name: "rmd-app-bar-default-light-theme-color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"default"` and\nthe app is currently using a light theme.\n',
      source: "packages/app-bar/src/_variables.scss#L83-L87",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "app-bar",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-light-theme-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-app-bar-default-dark-theme-background-color": {
      name: "rmd-app-bar-default-dark-theme-background-color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"default"`\nand the app is currently using a dark theme.\n',
      source: "packages/app-bar/src/_variables.scss#L92",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "app-bar",
      type: "Color",
      value: "$rmd-grey-900",
      compiled: "#212121",
      overridable: true,
    },
    "rmd-app-bar-default-dark-theme-color": {
      name: "rmd-app-bar-default-dark-theme-color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"default"` and\nthe app is currently using a dark theme.\n',
      source: "packages/app-bar/src/_variables.scss#L97-L101",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "app-bar",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-dark-theme-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-app-bar-default-background-color": {
      name: "rmd-app-bar-default-background-color",
      description:
        "The background color to use for the app bar that is using the `default` theme. This\nvalue is derived based on the current background color of the app for light or dark\nthemed apps.\n",
      source: "packages/app-bar/src/_variables.scss#L107-L111",
      packageName: "app-bar",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-theme-background) == light,\n  $rmd-app-bar-default-light-theme-background-color,\n  $rmd-app-bar-default-dark-theme-background-color\n)",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-app-bar-default-color": {
      name: "rmd-app-bar-default-color",
      description:
        "The text color to use for the app bar that is using the `default` theme. This\nvalue is derived based on the current background color of the app for light or dark\nthemed apps.\n",
      source: "packages/app-bar/src/_variables.scss#L117-L121",
      packageName: "app-bar",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-background-color) == light,\n  $rmd-app-bar-default-light-theme-color,\n  $rmd-app-bar-default-dark-theme-color\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-app-bar-theme-values": {
      name: "rmd-app-bar-theme-values",
      description:
        'A Map of all the "themeable" parts of the app-bar package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/app-bar/src/_variables.scss#L127-L144",
      usedBy: [
        { name: "rmd-app-bar-theme", type: "function", packageName: "app-bar" },
        {
          name: "rmd-app-bar-theme-var",
          type: "function",
          packageName: "app-bar",
        },
        { name: "rmd-app-bar-theme", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-theme-update-var",
          type: "mixin",
          packageName: "app-bar",
        },
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Map",
      value:
        "(\n  background-color: transparent,\n  color: initial,\n  primary: $rmd-app-bar-primary-background-color,\n  on-primary: $rmd-app-bar-primary-color,\n  secondary: $rmd-app-bar-secondary-background-color,\n  on-secondary: $rmd-app-bar-secondary-color,\n  default-background-color: $rmd-app-bar-default-background-color,\n  default-light-background-color: $rmd-app-bar-default-light-theme-background-color,\n  default-dark-background-color: $rmd-app-bar-default-dark-theme-background-color,\n  default-color: $rmd-app-bar-default-color,\n  default-light-color: $rmd-app-bar-default-light-theme-color,\n  default-dark-color: $rmd-app-bar-default-dark-theme-color,\n  height: $rmd-app-bar-height,\n  dense-height: $rmd-app-bar-dense-height,\n  prominent-height: $rmd-app-bar-prominent-height,\n  prominent-dense-height: $rmd-app-bar-prominent-dense-height,\n)",
      compiled:
        "(\n  background-color: transparent,\n  color: initial,\n  primary: var(--rmd-theme-primary, #9c27b0),\n  on-primary: var(--rmd-theme-on-primary, #000),\n  secondary: var(--rmd-theme-secondary, #f50057),\n  on-secondary: var(--rmd-theme-on-secondary, #000),\n  default-background-color: #f5f5f5,\n  default-light-background-color: #f5f5f5,\n  default-dark-background-color: #212121,\n  default-color: #000,\n  default-light-color: #000,\n  default-dark-color: #fff,\n  height: 3.5rem,\n  dense-height: 3rem,\n  prominent-height: 7rem,\n  prominent-dense-height: 6rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
