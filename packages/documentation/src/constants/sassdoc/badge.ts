/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-badge-theme": {
      name: "rmd-badge-theme",
      description:
        "This function is used to quickly get one of the badge's theme values. This is really\njust for the `rmd-badge-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/badge/src/_functions.scss#L14-L16",
      packageName: "badge",
      code: "@function rmd-badge-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-badge-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-badge-theme-values, badge);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-badge-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the badge's theme values.",
      },
    },
    "rmd-badge-theme-var": {
      name: "rmd-badge-theme-var",
      description:
        "This function is used to get one of the badge's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-badge-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/badge/src/_functions.scss#L29-L31",
      packageName: "badge",
      code:
        "@function rmd-badge-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-badge-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-badge-theme-values,\n    badge,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-badge-theme-values` map keys to set a value for.",
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
        description: "one of the badge's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-badge-theme": {
      name: "rmd-badge-theme",
      description:
        "Creates the styles for one of the badge's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      source: "packages/badge/src/_mixins.scss#L20-L22",
      usedBy: [
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
      ],
      packageName: "badge",
      code:
        "@mixin rmd-badge-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-badge-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-badge-theme-values,\n    badge\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-badge-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-badge-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-badge-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-badge-theme-update-var": {
      name: "rmd-badge-theme-update-var",
      description:
        "Updates one of the badge's theme variables with the new value for the section\nof your app.\n\n",
      source: "packages/badge/src/_mixins.scss#L30-L32",
      packageName: "badge",
      code: "@mixin rmd-badge-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-badge-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-badge-theme-values,\n    badge\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The badge theme style type to update. This should be one\n  of the `$rmd-badge-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-badge": {
      name: "rmd-badge",
      description: "Creates all the styles for the badge component.\n",
      source: "packages/badge/src/_mixins.scss#L42-L76",
      usedBy: [{ name: "react-md-badge", type: "mixin", packageName: "badge" }],
      packageName: "badge",
      code: "@mixin rmd-badge { … }",
      sourceCode:
        "@mixin rmd-badge {\n  @include rmd-typography(body-1, (line-height font-size));\n  @include rmd-badge-theme(border-radius);\n  @include rmd-badge-theme(height, size);\n  @include rmd-badge-theme(width, size);\n  @include rmd-badge-theme(font-size);\n  @include rmd-badge-theme(right);\n  @include rmd-badge-theme(top);\n  @include rmd-utils-rtl {\n    @include rmd-badge-theme(left, right);\n\n    right: auto;\n  }\n\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  pointer-events: none; // badges are _kind_ of presentational and shouldn't trigger mouse events\n  position: absolute;\n\n  &--primary {\n    @include rmd-theme(background-color, primary);\n    @include rmd-theme(color, on-primary);\n  }\n\n  &--secondary {\n    @include rmd-theme(background-color, secondary);\n    @include rmd-theme(color, on-secondary);\n  }\n\n  &--default {\n    @include rmd-badge-theme(background-color);\n    @include rmd-badge-theme(color);\n  }\n}\n",
      type: "mixin",
    },
    "react-md-badge": {
      name: "react-md-badge",
      description:
        "Creates all the styles for this package as well as defining all the theme CSS variables.\n",
      source: "packages/badge/src/_mixins.scss#L79-L89",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "badge",
      code: "@mixin react-md-badge { … }",
      sourceCode:
        "@mixin react-md-badge {\n  @include rmd-theme-create-root-theme($rmd-badge-theme-values, badge);\n\n  .rmd-badge-container {\n    @include rmd-badge-container;\n  }\n\n  .rmd-badge {\n    @include rmd-badge;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-badge-size": {
      name: "rmd-badge-size",
      description: "The height and width to use for a circular badge.\n",
      source: "packages/badge/src/_variables.scss#L9",
      packageName: "badge",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-badge-border-radius": {
      name: "rmd-badge-border-radius",
      description: "The border radius to use for a circular badge.\n",
      source: "packages/badge/src/_variables.scss#L13",
      packageName: "badge",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-badge-default-background-color": {
      name: "rmd-badge-default-background-color",
      description: 'The "default" background color.\n',
      source: "packages/badge/src/_variables.scss#L17",
      packageName: "badge",
      type: "Color",
      value: "rgba($rmd-black-base, 0.2)",
      compiled: "rgba(0, 0, 0, 0.2)",
      overridable: true,
    },
    "rmd-badge-default-color": {
      name: "rmd-badge-default-color",
      description: 'The "default" themed text color.\n',
      source: "packages/badge/src/_variables.scss#L21-L25",
      packageName: "badge",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-badge-default-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-badge-font-size": {
      name: "rmd-badge-font-size",
      description: "The badge's font size.\n",
      source: "packages/badge/src/_variables.scss#L29",
      packageName: "badge",
      type: "Number",
      value: "0.625rem",
      overridable: true,
    },
    "rmd-badge-offset-top": {
      name: "rmd-badge-offset-top",
      description: "The `top` position for the badge.\n",
      source: "packages/badge/src/_variables.scss#L33",
      packageName: "badge",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-badge-offset-right": {
      name: "rmd-badge-offset-right",
      description:
        "The `right` position for the badge. This will be swapped to be `left` for rtl languages.\n",
      source: "packages/badge/src/_variables.scss#L37",
      packageName: "badge",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-badge-theme-values": {
      name: "rmd-badge-theme-values",
      description:
        'A Map of all the "themeable" parts of the badge package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/badge/src/_variables.scss#L43-L51",
      usedBy: [
        { name: "rmd-badge-theme", type: "function", packageName: "badge" },
        { name: "rmd-badge-theme-var", type: "function", packageName: "badge" },
        { name: "rmd-badge-theme", type: "mixin", packageName: "badge" },
        {
          name: "rmd-badge-theme-update-var",
          type: "mixin",
          packageName: "badge",
        },
        { name: "react-md-badge", type: "mixin", packageName: "badge" },
      ],
      packageName: "badge",
      type: "Map",
      value:
        "(\n  background-color: $rmd-badge-default-background-color,\n  color: $rmd-badge-default-color,\n  border-radius: $rmd-badge-border-radius,\n  font-size: $rmd-badge-font-size,\n  size: $rmd-badge-size,\n  top: $rmd-badge-offset-top,\n  right: $rmd-badge-offset-right,\n)",
      compiled:
        "(\n  background-color: rgba(0, 0, 0, 0.2),\n  color: #fff,\n  border-radius: 50%,\n  font-size: 0.625rem,\n  size: 1.5rem,\n  top: 0,\n  right: 0,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
