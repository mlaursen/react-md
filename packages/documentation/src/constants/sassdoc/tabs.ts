/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-tabs-theme": {
      name: "rmd-tabs-theme",
      description:
        "This function is used to quickly get one of the tabs's theme values. This is really just for the `rmd-tabs-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/tabs/src/_functions.scss#L15-L17",
      packageName: "tabs",
      code: "@function rmd-tabs-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tabs-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tabs-theme-values, tabs);\n}\n",
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
        "This function is used to get one of the tabs's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-tabs-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/tabs/src/_functions.scss#L32-L34",
      packageName: "tabs",
      code: "@function rmd-tabs-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-tabs-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-tabs-theme-values,\n    tabs,\n    $fallback\n  );\n}\n",
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
            "An optional fallback color to apply. This is set to `null` by default and not used since the link's theme variables should always exist.",
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
        "Creates the styles for one of the tabs's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/tabs/src/_mixins.scss#L26-L28",
      packageName: "tabs",
      code:
        "@mixin rmd-tabs-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-tabs-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-tabs-theme-values,\n    tabs\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-tabs-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-tabs-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-tabs-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-tabs-theme-update-var": {
      name: "rmd-tabs-theme-update-var",
      description:
        "Updates one of the tabs's theme variables with the new value for the section of your app.",
      source: "packages/tabs/src/_mixins.scss#L36-L38",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-dark", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-dark", type: "mixin", packageName: "theme" },
      ],
      packageName: "tabs",
      code: "@mixin rmd-tabs-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-tabs-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-tabs-theme-values,\n    tabs\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The tabs theme style type to update. This should be one of the `$rmd-tabs-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "react-md-tabs": {
      name: "react-md-tabs",
      description:
        "Creates all the styles for this package as well as defining all the theme CSS variables.\n",
      source: "packages/tabs/src/_mixins.scss#L244-L262",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "tabs",
      code: "@mixin react-md-tabs { … }",
      sourceCode:
        "@mixin react-md-tabs {\n  @include rmd-theme-create-root-theme($rmd-tabs-theme-values, tabs);\n\n  .rmd-tabs {\n    @include rmd-tabs;\n  }\n\n  .rmd-tab {\n    @include rmd-tab;\n  }\n\n  .rmd-tab-panels {\n    @include rmd-tab-panels;\n  }\n\n  .rmd-tab-panel {\n    @include rmd-tab-panel;\n  }\n}\n",
      type: "mixin",
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
        "The minimum width for a tab. The way tabs work is that they will grow as needed to fill the entire space of the `Tabs` container width. This also means that they will shrink if the `Tabs` container is small.\n",
      source: "packages/tabs/src/_variables.scss#L28",
      packageName: "tabs",
      type: "Number",
      value: "5.625rem",
      overridable: true,
    },
    "rmd-tab-max-width": {
      name: "rmd-tab-max-width",
      description:
        "The maxium width for a tab. The way tabs work is that they will grow as needed to fill the entire space of the `Tabs` container width. This also means that they will shrink if the `Tabs` container is small.\n",
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
        "A list of alignments that should be supported by the Tabs component. These values should be valid values for the `justify-content` property.\n",
      source: "packages/tabs/src/_variables.scss#L59",
      packageName: "tabs",
      type: "List",
      value: "(left center right)",
      overridable: true,
    },
    "rmd-tabs-scrollable-padding": {
      name: "rmd-tabs-scrollable-padding",
      description:
        "The amount of padding to use when the `scollable` prop is enabled on the `Tabs` component that will be added to the left of the first tab (or right for RTL languages). This padding is useful to help users know that the content is scrollable.\n",
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
