/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-table-theme": {
      name: "rmd-table-theme",
      description:
        "This function is used to quickly get one of the table's theme values. This is really\njust for the `rmd-table-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/table/src/_functions.scss#L14-L16",
      packageName: "table",
      code: "@function rmd-table-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-table-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-table-theme-values, table);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-table-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the table's theme values.",
      },
    },
    "rmd-table-theme-var": {
      name: "rmd-table-theme-var",
      description:
        "This function is used to get one of the table's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-table-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/table/src/_functions.scss#L29-L31",
      packageName: "table",
      code:
        "@function rmd-table-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-table-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-table-theme-values,\n    table,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-table-theme-values` map keys to set a value for.",
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
        description: "one of the table's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-table-theme": {
      name: "rmd-table-theme",
      description:
        "Creates the styles for one of the table's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      source: "packages/table/src/_mixins.scss#L24-L26",
      packageName: "table",
      code:
        "@mixin rmd-table-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-table-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-table-theme-values,\n    table\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-table-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-table-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-table-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-table-theme-update-var": {
      name: "rmd-table-theme-update-var",
      description:
        "Updates one of the table's theme variables with the new value for the section\nof your app.\n\n",
      source: "packages/table/src/_mixins.scss#L34-L36",
      packageName: "table",
      code: "@mixin rmd-table-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-table-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-table-theme-values,\n    table\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The table theme style type to update. This should be one\n  of the `$rmd-table-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
  },
  variables: {
    "rmd-table-theme-values": {
      name: "rmd-table-theme-values",
      description:
        'A Map of all the "themeable" parts of the table package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/table/src/_variables.scss#L26-L37",
      usedBy: [
        { name: "rmd-table-theme", type: "function", packageName: "table" },
        { name: "rmd-table-theme-var", type: "function", packageName: "table" },
        { name: "rmd-table-theme", type: "mixin", packageName: "table" },
        {
          name: "rmd-table-theme-update-var",
          type: "mixin",
          packageName: "table",
        },
      ],
      packageName: "table",
      type: "Map",
      value:
        "(\n  fixed-background-color: $rmd-table-fixed-background-color,\n  cell-height: $rmd-table-cell-height,\n  cell-padding: $rmd-table-cell-padding,\n  cell-padding-extra: $rmd-table-cell-padding-extra,\n  cell-dense-height: $rmd-table-cell-dense-height,\n  header-cell-color: $rmd-table-header-cell-color,\n  header-cell-font-size: $rmd-table-header-font-size,\n  data-cell-color: $rmd-table-data-cell-color,\n  data-cell-font-size: $rmd-table-data-cell-font-size,\n  hover-color: $rmd-table-row-hover-color,\n)",
      compiled:
        "(\n  fixed-background-color: var(--rmd-theme-background, #fafafa),\n  cell-height: 3rem,\n  cell-padding: 1rem,\n  cell-padding-extra: 3.5rem,\n  cell-dense-height: 2rem,\n  header-cell-color: var(--rmd-theme-text-secondary-on-background, #757575),\n  header-cell-font-size: 0.75rem,\n  data-cell-color: var(--rmd-theme-text-primary-on-background, #212121),\n  data-cell-font-size: 0.875rem,\n  hover-color: rgba(0, 0, 0, 0.12),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
