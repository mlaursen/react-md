/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-table-theme": {
      name: "rmd-table-theme",
      description:
        "This function is used to quickly get one of the table's theme values. This is really just for the `rmd-table-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/table/src/_functions.scss#L15-L17",
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
        "This function is used to get one of the table's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-table-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/table/src/_functions.scss#L32-L34",
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
            "An optional fallback color to apply. This is set to `null` by default and not used since the link's theme variables should always exist.",
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
        "Creates the styles for one of the table's theme values. This is mostly going to be an internal helper mixin util.",
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
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-table-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-table-theme-update-var": {
      name: "rmd-table-theme-update-var",
      description:
        "Updates one of the table's theme variables with the new value for the section of your app.",
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
            "The table theme style type to update. This should be one of the `$rmd-table-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "react-md-table": {
      name: "react-md-table",
      description: "Creates all the styles for the table package.\n",
      source: "packages/table/src/_mixins.scss#L272-L298",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "table",
      code: "@mixin react-md-table { … }",
      sourceCode:
        "@mixin react-md-table {\n  @include rmd-theme-create-root-theme($rmd-table-theme-values, table);\n\n  .rmd-table-container {\n    @include rmd-utils-scroll;\n  }\n\n  .rmd-table {\n    @include rmd-table;\n  }\n\n  .rmd-thead {\n    @include rmd-thead;\n  }\n\n  .rmd-table-cell {\n    @include rmd-table-cell;\n  }\n\n  .rmd-tr {\n    @include rmd-table-row;\n  }\n\n  .rmd-caption {\n    @include rmd-typography(caption);\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-table-cell-horizontal-padding": {
      name: "rmd-table-cell-horizontal-padding",
      description:
        "The amount of padding to apply to the left and right of each `<td>` and `<th>` in a table.\n",
      source: "packages/table/src/_variables.scss#L11",
      packageName: "table",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-table-cell-vertical-padding": {
      name: "rmd-table-cell-vertical-padding",
      description:
        'The amount of padding to apply to the top or bottom for each `<th>` and `<th>` in a table when the cell\'s alignment is set to `"top"` or `"bottom"`.',
      source: "packages/table/src/_variables.scss#L17",
      packageName: "table",
      type: "Number",
      value: "0.375rem",
      overridable: true,
    },
    "rmd-table-cell-sticky-position": {
      name: "rmd-table-cell-sticky-position",
      description:
        "The default position to use for a sticky cell that appears within the `<tbody>` in all tables. This is mostly used if you want to have a custom `<th>` that describes an entire row and should always be visible.\n\nIf you want to update a specific table, you should use the `rmd-table-theme-update-var` mixin for the `sticky-cell` value.",
      source: "packages/table/src/_variables.scss#L27",
      packageName: "table",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-table-cell-sticky-z-index": {
      name: "rmd-table-cell-sticky-z-index",
      description:
        "The z-index to apply to all sticky cells within a table. This value doesn't matter too much, but it should just be greater than 1 if you have checkbox cells so that the header will cover the checkboxes.",
      source: "packages/table/src/_variables.scss#L34",
      packageName: "table",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-table-cell-height": {
      name: "rmd-table-cell-height",
      description: "The minimum height for each `<td>`.\n",
      source: "packages/table/src/_variables.scss#L38",
      packageName: "table",
      type: "Number",
      value: "3.25rem",
      overridable: true,
    },
    "rmd-table-cell-dense-height": {
      name: "rmd-table-cell-dense-height",
      description:
        "The minimum height to set for each `<td>` with the dense spec.",
      source: "packages/table/src/_variables.scss#L43",
      packageName: "table",
      type: "Number",
      value: "2rem",
      overridable: true,
    },
    "rmd-table-cell-color": {
      name: "rmd-table-cell-color",
      description: "The text color for `<td>` cells within a table.",
      source: "packages/table/src/_variables.scss#L48",
      packageName: "table",
      type: "Color",
      value: "rmd-theme-var(text-primary-on-background)",
      compiled: "var(--rmd-theme-text-primary-on-background, #212121)",
      overridable: true,
    },
    "rmd-table-cell-horizontal-alignments": {
      name: "rmd-table-cell-horizontal-alignments",
      description:
        "The supported horizontal alignments for the table cell. You can set this value to `null` if you do not want to generate any additional alignments other than the default (`left`), or set to a list of one value if you do not need all the alignments.",
      source: "packages/table/src/_variables.scss#L56",
      packageName: "table",
      type: "List",
      value: "(center right)",
      overridable: true,
    },
    "rmd-table-cell-vertical-alignments": {
      name: "rmd-table-cell-vertical-alignments",
      description:
        'A map of the supported `vertical-align` for a table cell align with the amount of padding to apply. Tables are "fun" to style since theres some weird stuff with how `height` + `padding` works by default so when the `vertical-align` is set to `top` or `bottom`, you also need to apply some padding OR update the `line-height` for the cell. I decided to go with a `padding` approach to make things a bit easier for non-text cells.\n\nNote: You can also set this value to `null` if you do not want to generate the minimal styles for the non-middle alignments.',
      source: "packages/table/src/_variables.scss#L69",
      packageName: "table",
      type: "List",
      value: "(top bottom)",
      overridable: true,
    },
    "rmd-table-header-cell-height": {
      name: "rmd-table-header-cell-height",
      description:
        "The minimum height for each `<th>` that appears in the `<thead>`.\n\nNote: No styles will be generated if this is `null` or the same value as the `$rmd-table-cell-height`.",
      source: "packages/table/src/_variables.scss#L77",
      packageName: "table",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-table-header-cell-dense-height": {
      name: "rmd-table-header-cell-dense-height",
      description:
        "The minimum height for each `<th>` that appears in the `<thead>` with the dense spec.\n\nNote: No styles will be generated if this is `null` or the same value as the `$rmd-table-cell-dense-height`.",
      source: "packages/table/src/_variables.scss#L86",
      packageName: "table",
      type: "Number",
      value: "2.125rem",
      overridable: true,
    },
    "rmd-table-header-cell-color": {
      name: "rmd-table-header-cell-color",
      description:
        "The color to use for `<th>` cells within a table.\n\nNote: No styles will be generated if this is `null` or the same value as the `$rmd-table-cell-color`.",
      source: "packages/table/src/_variables.scss#L94",
      packageName: "table",
      type: "Number",
      value: "$rmd-table-cell-color",
      compiled: "var(--rmd-theme-text-primary-on-background, #212121)",
      overridable: true,
    },
    "rmd-table-header-sticky-position": {
      name: "rmd-table-header-sticky-position",
      description:
        "The default position for a sticky header cell in all tables. If you want to update the header position for a specific table, you can just use the `rmd-table-theme-update-var` mixin for the `sticky-header` variable instead.",
      source: "packages/table/src/_variables.scss#L101",
      packageName: "table",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-table-row-hover-color": {
      name: "rmd-table-row-hover-color",
      description:
        "The background color to use when hovering over a row within the `<tbody>` and the `hoverable` styles have been enabled.",
      source: "packages/table/src/_variables.scss#L107",
      packageName: "table",
      type: "Color",
      value: "rgba($rmd-black-base, 0.12)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-table-row-selected-color": {
      name: "rmd-table-row-selected-color",
      description:
        "The background color to use when a row has been selected within the `<tbody>`.",
      source: "packages/table/src/_variables.scss#L113",
      packageName: "table",
      type: "Color|String",
      value: "rmd-states-theme-var(selected-color)",
      compiled: "var(--rmd-states-selected-color, rgba(0, 0, 0, 0.16))",
      overridable: true,
    },
    "rmd-table-footer-sticky-position": {
      name: "rmd-table-footer-sticky-position",
      description:
        "The default position for a sticky footer cell in all tables. If you want to update the footer position for a specific table, you can just use the `rmd-table-theme-update-var` mixin for the `sticky-footer` variable instead.",
      source: "packages/table/src/_variables.scss#L120",
      packageName: "table",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-table-checkbox-padding": {
      name: "rmd-table-checkbox-padding",
      description:
        "The amount of padding to apply to a table checkbox cell. This should normally be smaller than the default left and right padding to reduce the width of this cell.",
      source: "packages/table/src/_variables.scss#L127",
      packageName: "table",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-table-theme-values": {
      name: "rmd-table-theme-values",
      description:
        'A Map of all the "themeable" parts of the table package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.',
      source: "packages/table/src/_variables.scss#L134-L145",
      usedBy: [
        { name: "rmd-table-theme", type: "function", packageName: "table" },
        { name: "rmd-table-theme-var", type: "function", packageName: "table" },
        { name: "rmd-table-theme", type: "mixin", packageName: "table" },
        {
          name: "rmd-table-theme-update-var",
          type: "mixin",
          packageName: "table",
        },
        { name: "react-md-table", type: "mixin", packageName: "table" },
      ],
      packageName: "table",
      type: "Map",
      value:
        "(\n  cell-color: $rmd-table-cell-color,\n  cell-h-padding: $rmd-table-cell-horizontal-padding,\n  cell-v-padding: $rmd-table-cell-vertical-padding,\n  cell-height: $rmd-table-cell-height,\n  cell-dense-height: $rmd-table-cell-dense-height,\n  hover-color: $rmd-table-row-hover-color,\n  selected-color: $rmd-table-row-selected-color,\n  sticky-header: $rmd-table-header-sticky-position,\n  sticky-cell: $rmd-table-cell-sticky-position,\n  sticky-footer: $rmd-table-footer-sticky-position,\n)",
      compiled:
        "(\n  cell-color: var(--rmd-theme-text-primary-on-background, #212121),\n  cell-h-padding: 1rem,\n  cell-v-padding: 0.375rem,\n  cell-height: 3.25rem,\n  cell-dense-height: 2rem,\n  hover-color: rgba(0, 0, 0, 0.12),\n  selected-color: var(--rmd-states-selected-color, rgba(0, 0, 0, 0.16)),\n  sticky-header: 0,\n  sticky-cell: 0,\n  sticky-footer: 0,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
