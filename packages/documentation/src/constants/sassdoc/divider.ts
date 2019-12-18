/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-divider-theme": {
      name: "rmd-divider-theme",
      description:
        "This function is used to quickly get one of the divider's theme values. This is really\njust for the `rmd-divider-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/divider/src/_functions.scss#L14-L16",
      packageName: "divider",
      code: "@function rmd-divider-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-divider-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-divider-theme-values,\n    divider\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-divider-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the divider's theme values.",
      },
    },
    "rmd-divider-theme-var": {
      name: "rmd-divider-theme-var",
      description:
        "This function is used to get one of the divider's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-divider-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/divider/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
      ],
      packageName: "divider",
      code:
        "@function rmd-divider-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-divider-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-divider-theme-values,\n    divider,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-divider-theme-values` map keys to set a value for.",
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
        description: "one of the divider's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-divider-theme": {
      name: "rmd-divider-theme",
      description:
        "Creates the styles for one of the divider's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      source: "packages/divider/src/_mixins.scss#L18-L20",
      usedBy: [
        { name: "rmd-divider-border", type: "mixin", packageName: "divider" },
        { name: "rmd-divider-border", type: "mixin", packageName: "divider" },
        { name: "rmd-divider-border", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
      ],
      packageName: "divider",
      code:
        "@mixin rmd-divider-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-divider-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-divider-theme-values,\n    divider\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-divider-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-divider-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-divider-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-divider-theme-update-var": {
      name: "rmd-divider-theme-update-var",
      description:
        "Updates one of the divider's theme variables with the new value for the section\nof your app.\n\n",
      source: "packages/divider/src/_mixins.scss#L28-L30",
      usedBy: [
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-dark", type: "mixin", packageName: "theme" },
      ],
      packageName: "divider",
      code: "@mixin rmd-divider-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-divider-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-divider-theme-values,\n    divider\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The divider theme style type to update. This should be one\n  of the `$rmd-divider-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-divider-border": {
      name: "rmd-divider-border",
      description:
        "This mixin allows you to add a custom border to any element if you don't want\nto add an extra element within your page for a divider.\n\n",
      source: "packages/divider/src/_mixins.scss#L37-L43",
      packageName: "divider",
      code: "@mixin rmd-divider-border($position) { … }",
      sourceCode:
        '@mixin rmd-divider-border($position) {\n  @include rmd-divider-theme(border-color, background-color);\n  @include rmd-divider-theme(border-width, size);\n  @include rmd-divider-theme("border-#{$position}-width", size);\n\n  border-#{$position}-style: solid;\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "position",
          description:
            "The border position to use. This should be one of `top`, `right`,\n  `bottom`, or `left`",
        },
      ],
    },
    "react-md-divider": {
      name: "react-md-divider",
      description:
        "Creates all the styles for the divider package as well as the root css variable theme.\n",
      source: "packages/divider/src/_mixins.scss#L46-L81",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "divider",
      code: "@mixin react-md-divider { … }",
      sourceCode:
        "@mixin react-md-divider {\n  @include rmd-theme-create-root-theme($rmd-divider-theme-values, divider);\n\n  .rmd-divider {\n    @include rmd-divider-theme(border-color, background-color);\n    @include rmd-divider-theme(border-width, size);\n    @include rmd-divider-theme(margin, spacing);\n    @include rmd-divider-theme(width, max-size);\n\n    display: block;\n    flex-shrink: 0;\n\n    &--vertical {\n      @include rmd-divider-theme(border-left-width, size);\n      @include rmd-divider-theme(border-left-color, background-color);\n      @include rmd-divider-theme(height, max-size);\n      @include rmd-divider-theme(margin, vertical-spacing);\n      @include rmd-divider-theme(width, size);\n\n      border-bottom-style: none;\n      border-left-style: inset;\n      display: inline-block;\n    }\n\n    &--inset {\n      @include rmd-divider-theme(margin-left, inset);\n      @include rmd-utils-rtl {\n        @include rmd-divider-theme(margin-right, inset);\n\n        margin-left: auto;\n      }\n\n      width: calc(\n        #{rmd-divider-theme-var(max-size)} - #{rmd-divider-theme-var(inset)}\n      );\n    }\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-divider-size": {
      name: "rmd-divider-size",
      description:
        "The size for the divider. This really just modifies the border-width.\n",
      source: "packages/divider/src/_variables.scss#L10",
      packageName: "divider",
      type: "Number",
      value: "1px",
      overridable: true,
    },
    "rmd-divider-max-size": {
      name: "rmd-divider-max-size",
      description:
        "The max size for the divider. This can be used to center a horizontal\ndivider within the page since the divider applies `margin-left: auto`\nand `margin-right: auto`.\n\nThis also applies to vertical dividers... sort of? If the divider's\ncontaining element has a static defined height, the vertical dividers\nwill be sized correctly. Otherwise the vertical divider will set the\nheight to `auto` which almost always resolves to `0` which will make\nyour divider not appear.\n",
      source: "packages/divider/src/_variables.scss#L22",
      packageName: "divider",
      type: "Number",
      value: "100%",
      overridable: true,
    },
    "rmd-divider-inset": {
      name: "rmd-divider-inset",
      description:
        "The amount of inset to apply to the divider. This should not be changed\nto create centered dividers. Its only purpose is to had spacing to the\nleft (or right in rtl languages) of the divider. See the `$rmd-divider-max-size`\nvariable for more information about centering.\n\n",
      source: "packages/divider/src/_variables.scss#L31",
      see: [
        {
          name: "rmd-divider-max-size",
          type: "variable",
          packageName: "divider",
        },
      ],
      packageName: "divider",
      type: "Number",
      value: "4rem",
      overridable: true,
    },
    "rmd-divider-spacing": {
      name: "rmd-divider-spacing",
      description: "The amount of margin to apply to horizontal dividers.\n",
      source: "packages/divider/src/_variables.scss#L35",
      packageName: "divider",
      type: "Number",
      value: "0.25rem auto",
      overridable: true,
    },
    "rmd-divider-vertical-spacing": {
      name: "rmd-divider-vertical-spacing",
      description: "The amount of margin to apply to vertical dividers.\n",
      source: "packages/divider/src/_variables.scss#L39",
      packageName: "divider",
      type: "Number",
      value: "auto 0.25rem",
      overridable: true,
    },
    "rmd-divider-background-color-on-light": {
      name: "rmd-divider-background-color-on-light",
      description: "The divider color to use on light backgrounds.\n",
      source: "packages/divider/src/_variables.scss#L43",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "divider",
      type: "Color",
      value: "rgba($rmd-black-base, 0.12)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-divider-background-color-on-dark": {
      name: "rmd-divider-background-color-on-dark",
      description: "The divider color to use on dark backgrounds.\n",
      source: "packages/divider/src/_variables.scss#L47",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "divider",
      type: "Color",
      value: "rgba($rmd-white-base, 0.12)",
      compiled: "rgba(255, 255, 255, 0.12)",
      overridable: true,
    },
    "rmd-divider-background-color": {
      name: "rmd-divider-background-color",
      description: "The default divider background color to use.\n",
      source: "packages/divider/src/_variables.scss#L51-L55",
      packageName: "divider",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-theme-background) == light,\n  $rmd-divider-background-color-on-light,\n  $rmd-divider-background-color-on-dark\n)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-divider-theme-values": {
      name: "rmd-divider-theme-values",
      description:
        'A Map of all the "themeable" parts of the divider package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/divider/src/_variables.scss#L61-L70",
      usedBy: [
        { name: "rmd-divider-theme", type: "function", packageName: "divider" },
        {
          name: "rmd-divider-theme-var",
          type: "function",
          packageName: "divider",
        },
        { name: "rmd-divider-theme", type: "mixin", packageName: "divider" },
        {
          name: "rmd-divider-theme-update-var",
          type: "mixin",
          packageName: "divider",
        },
        { name: "react-md-divider", type: "mixin", packageName: "divider" },
      ],
      packageName: "divider",
      type: "Map",
      value:
        "(\n  background-color: $rmd-divider-background-color,\n  background-color-on-light: $rmd-divider-background-color-on-light,\n  background-color-on-dark: $rmd-divider-background-color-on-dark,\n  size: $rmd-divider-size,\n  inset: $rmd-divider-inset,\n  spacing: $rmd-divider-spacing,\n  vertical-spacing: $rmd-divider-vertical-spacing,\n  max-size: $rmd-divider-max-size,\n)",
      compiled:
        "(\n  background-color: rgba(0, 0, 0, 0.12),\n  background-color-on-light: rgba(0, 0, 0, 0.12),\n  background-color-on-dark: rgba(255, 255, 255, 0.12),\n  size: 1px,\n  inset: 4rem,\n  spacing: 0.25rem auto,\n  vertical-spacing: auto 0.25rem,\n  max-size: 100%,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
