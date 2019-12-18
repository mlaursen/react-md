/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-tabs-theme": {
      name: "rmd-tabs-theme",
      description:
        "This function is used to quickly get one of the tabs's theme values. This is really\njust for the `rmd-tabs-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/tabs/src/_functions.scss#L14-L16",
      packageName: "tabs",
      code: "@function rmd-tabs-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tabs-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tabs-theme-values, tabs);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tabs-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the tabs's theme values.",
      },
    },
    "rmd-tabs-theme-var": {
      name: "rmd-tabs-theme-var",
      description:
        "This function is used to get one of the tabs's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-tabs-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/tabs/src/_functions.scss#L29-L31",
      packageName: "tabs",
      code: "@function rmd-tabs-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-tabs-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-tabs-theme-values, tabs, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tabs-theme-values` map keys to set a value for.",
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
        description: "one of the tabs's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-tabs-theme": {
      name: "rmd-tabs-theme",
      description:
        "This function is used to quickly get one of the tabs's theme values. This is really\njust for the `rmd-tabs-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/tabs/src/_functions.scss#L14-L16",
      packageName: "tabs",
      code: "@function rmd-tabs-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tabs-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tabs-theme-values, tabs);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tabs-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-tabs-theme-var": {
      name: "rmd-tabs-theme-var",
      description:
        "This function is used to get one of the tabs's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-tabs-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/tabs/src/_functions.scss#L29-L31",
      packageName: "tabs",
      code: "@function rmd-tabs-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-tabs-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-tabs-theme-values, tabs, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tabs-theme-values` map keys to set a value for.",
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
    "rmd-tab-height": {
      name: "rmd-tab-height",
      description: "The default height for a tab.\n",
      source: "packages/tabs/src/_variables.scss#L10",
      packageName: "tabs",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-tab-stacked-height": {
      name: "rmd-tab-stacked-height",
      description:
        "The default height for a tab that has stacked text with an icon.\n",
      source: "packages/tabs/src/_variables.scss#L14",
      packageName: "tabs",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-tab-horizontal-padding": {
      name: "rmd-tab-horizontal-padding",
      description:
        "The amount of padding to apply to the left and right of the tab's content\n",
      source: "packages/tabs/src/_variables.scss#L18",
      packageName: "tabs",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-tab-vertical-padding": {
      name: "rmd-tab-vertical-padding",
      description:
        "The amount of padding to apply to the top and bottom of the tab's content\n",
      source: "packages/tabs/src/_variables.scss#L22",
      packageName: "tabs",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-tab-min-width": {
      name: "rmd-tab-min-width",
      description:
        "The minimum width for a tab. The way tabs work is that they will grow as needed\nto fill the entire space of the `Tabs` container width. This also means that\nthey will shrink if the `Tabs` container is small.\n",
      source: "packages/tabs/src/_variables.scss#L28",
      packageName: "tabs",
      type: "Number",
      value: "5.625rem",
      overridable: true,
    },
    "rmd-tab-max-width": {
      name: "rmd-tab-max-width",
      description:
        "The maxium width for a tab. The way tabs work is that they will grow as needed\nto fill the entire space of the `Tabs` container width. This also means that\nthey will shrink if the `Tabs` container is small.\n",
      source: "packages/tabs/src/_variables.scss#L34",
      packageName: "tabs",
      type: "Number",
      value: "20rem",
      overridable: true,
    },
    "rmd-tab-indicator-color": {
      name: "rmd-tab-indicator-color",
      description: "The tab indicator color to use.\n",
      source: "packages/tabs/src/_variables.scss#L38",
      packageName: "tabs",
      type: "Color|String",
      value: "rmd-theme-var(primary)",
      compiled: "var(--rmd-theme-primary, #9c27b0)",
      overridable: true,
    },
    "rmd-tab-active-color": {
      name: "rmd-tab-active-color",
      description: "The color to use when a tab has become active.\n",
      source: "packages/tabs/src/_variables.scss#L42",
      packageName: "tabs",
      type: "Color|String",
      value: "rmd-theme(text-primary-on-background)",
      compiled: "#212121",
      overridable: true,
    },
    "rmd-tab-inactive-color": {
      name: "rmd-tab-inactive-color",
      description: "The color to use when a tab is inactive.\n",
      source: "packages/tabs/src/_variables.scss#L46",
      packageName: "tabs",
      type: "Color|String",
      value: "rmd-theme(text-secondary-on-background)",
      compiled: "#757575",
      overridable: true,
    },
    "rmd-tab-disabled-color": {
      name: "rmd-tab-disabled-color",
      description: "The color to use when a tab is disabled.\n",
      source: "packages/tabs/src/_variables.scss#L50",
      packageName: "tabs",
      type: "Color|String",
      value: "rmd-theme(text-disabled-on-background)",
      compiled: "#9e9e9e",
      overridable: true,
    },
    "rmd-tab-active-indicator-height": {
      name: "rmd-tab-active-indicator-height",
      description: "The height for the active tab indicator divider.\n",
      source: "packages/tabs/src/_variables.scss#L54",
      packageName: "tabs",
      type: "Number",
      value: "0.125rem",
      overridable: true,
    },
    "rmd-tabs-positions": {
      name: "rmd-tabs-positions",
      description:
        "A list of alignments that should be supported by the Tabs component. These values\nshould be valid values for the `justify-content` property.\n",
      source: "packages/tabs/src/_variables.scss#L59",
      packageName: "tabs",
      type: "List",
      value: "(left center right)",
      overridable: true,
    },
    "rmd-tabs-scrollable-padding": {
      name: "rmd-tabs-scrollable-padding",
      description:
        "The amount of padding to use when the `scollable` prop is enabled on the `Tabs` component that\nwill be added to the left of the first tab (or right for RTL languages). This padding is useful\nto help users know that the content is scrollable.\n",
      source: "packages/tabs/src/_variables.scss#L65",
      packageName: "tabs",
      type: "Number",
      value: "3.25rem",
      overridable: true,
    },
    "rmd-tabs-theme-values": {
      name: "rmd-tabs-theme-values",
      description: "A map of all the themeable parts of the tabs package.\n",
      source: "packages/tabs/src/_variables.scss#L69-L74",
      usedBy: [
        { name: "rmd-tabs-theme", type: "function", packageName: "tabs" },
        { name: "rmd-tabs-theme-var", type: "function", packageName: "tabs" },
        { name: "rmd-tabs-theme", type: "mixin", packageName: "tabs" },
        {
          name: "rmd-tabs-theme-update-var",
          type: "mixin",
          packageName: "tabs",
        },
        { name: "react-md-tabs", type: "mixin", packageName: "tabs" },
      ],
      packageName: "tabs",
      type: "Map",
      value:
        "(\n  active: $rmd-tab-active-color,\n  inactive: $rmd-tab-inactive-color,\n  disabled: $rmd-tab-disabled-color,\n  indicator-color: $rmd-tab-indicator-color,\n)",
      compiled:
        "(\n  active: #212121,\n  inactive: #757575,\n  disabled: #9e9e9e,\n  indicator-color: var(--rmd-theme-primary, #9c27b0),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
