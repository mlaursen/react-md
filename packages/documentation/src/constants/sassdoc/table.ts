/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-table-theme": {
      name: "rmd-table-theme",
      description:
        "This function is used to quickly get one of the table's theme values. This is really just for the `rmd-table-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/table/src/_functions.scss#L15-L17",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-table-theme-values",
          type: "variable",
          packageName: "table",
        },
      ],
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
      usedBy: [{ name: "rmd-table", type: "mixin", packageName: "table" }],
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-table-theme-values",
          type: "variable",
          packageName: "table",
        },
      ],
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
      usedBy: [
        {
          name: "rmd-table-cell-vertical-alignments",
          type: "mixin",
          packageName: "table",
        },
        { name: "rmd-table-cell", type: "mixin", packageName: "table" },
        { name: "rmd-table-row", type: "mixin", packageName: "table" },
      ],
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-table-theme-values",
          type: "variable",
          packageName: "table",
        },
      ],
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
      usedBy: [
        { name: "rmd-table", type: "mixin", packageName: "table" },
        { name: "rmd-thead", type: "mixin", packageName: "table" },
        { name: "rmd-table-cell", type: "mixin", packageName: "table" },
      ],
      requires: [
        {
          name: "rmd-theme-update-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-table-theme-values",
          type: "variable",
          packageName: "table",
        },
      ],
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
    "rmd-table": {
      name: "rmd-table",
      description: "Creates the base styles for the `<table>` element.\n",
      source: "packages/table/src/_mixins.scss#L40-L51",
      usedBy: [{ name: "react-md-table", type: "mixin", packageName: "table" }],
      requires: [
        {
          name: "rmd-table-theme-update-var",
          type: "mixin",
          packageName: "table",
        },
        { name: "rmd-table-theme-var", type: "function", packageName: "table" },
      ],
      packageName: "table",
      code: "@mixin rmd-table { … }",
      sourceCode:
        "@mixin rmd-table {\n  border-collapse: collapse;\n  max-width: 100%;\n\n  &--dense {\n    @include rmd-table-theme-update-var(\n      cell-height,\n      rmd-table-theme-var(cell-dense-height)\n    );\n  }\n\n  &--full-width {\n    width: 100%;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-thead": {
      name: "rmd-thead",
      description: "",
      source: "packages/table/src/_mixins.scss#L54-L65",
      usedBy: [{ name: "react-md-table", type: "mixin", packageName: "table" }],
      requires: [
        {
          name: "rmd-table-theme-update-var",
          type: "mixin",
          packageName: "table",
        },
        {
          name: "rmd-table-cell-height",
          type: "variable",
          packageName: "table",
        },
        {
          name: "rmd-table-header-cell-height",
          type: "variable",
          packageName: "table",
        },
        {
          name: "rmd-table-cell-dense-height",
          type: "variable",
          packageName: "table",
        },
        {
          name: "rmd-table-header-cell-dense-height",
          type: "variable",
          packageName: "table",
        },
      ],
      packageName: "table",
      code: "@mixin rmd-thead { … }",
      sourceCode:
        "@mixin rmd-thead {\n  @if $rmd-table-cell-height != $rmd-table-header-cell-height {\n    @include rmd-table-theme-update-var(\n      cell-height,\n      $rmd-table-header-cell-height\n    );\n  }\n\n  @if $rmd-table-cell-dense-height != $rmd-table-header-cell-dense-height {\n    // TODO: Look into a better way to do this since it makes overrides more difficult.\n    .rmd-table--dense & {\n      @include rmd-table-theme-update-var(\n        cell-height,\n        $rmd-table-header-cell-dense-height\n      );\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-table-cell-horizontal-alignments": {
      name: "rmd-table-cell-horizontal-alignments",
      description: "",
      source: "packages/table/src/_mixins.scss#L68-L82",
      usedBy: [{ name: "rmd-table-cell", type: "mixin", packageName: "table" }],
      requires: [
        {
          name: "rmd-table-cell-horizontal-alignments",
          type: "variable",
          packageName: "table",
        },
      ],
      packageName: "table",
      code: "@mixin rmd-table-cell-horizontal-alignments { … }",
      sourceCode:
        "@mixin rmd-table-cell-horizontal-alignments {\n  @each $alignment in $rmd-table-cell-horizontal-alignments {\n    &--#{$alignment} {\n      @include rmd-utils-rtl {\n        @if $alignment == left {\n          text-align: right;\n        } @else if $alignment == right {\n          text-align: left;\n        }\n      }\n\n      text-align: $alignment;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-table-cell-vertical-alignments": {
      name: "rmd-table-cell-vertical-alignments",
      description: "",
      source: "packages/table/src/_mixins.scss#L85-L98",
      usedBy: [{ name: "rmd-table-cell", type: "mixin", packageName: "table" }],
      requires: [
        { name: "rmd-table-theme", type: "mixin", packageName: "table" },
        {
          name: "rmd-table-cell-vertical-alignments",
          type: "variable",
          packageName: "table",
        },
      ],
      packageName: "table",
      code: "@mixin rmd-table-cell-vertical-alignments { … }",
      sourceCode:
        "@mixin rmd-table-cell-vertical-alignments {\n  @if $rmd-table-cell-vertical-alignments {\n    @each $alignment in $rmd-table-cell-vertical-alignments {\n      &--#{$alignment} {\n        vertical-align: $alignment;\n      }\n    }\n\n    &--vertical {\n      @include rmd-table-theme(padding-top, cell-v-padding);\n      @include rmd-table-theme(padding-bottom, cell-v-padding);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-table-cell": {
      name: "rmd-table-cell",
      description:
        "Creates all the styles for the `<th>` and `<td>` elements.\n",
      source: "packages/table/src/_mixins.scss#L102-L224",
      usedBy: [{ name: "react-md-table", type: "mixin", packageName: "table" }],
      requires: [
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        { name: "rmd-table-theme", type: "mixin", packageName: "table" },
        {
          name: "rmd-table-cell-vertical-alignments",
          type: "mixin",
          packageName: "table",
        },
        {
          name: "rmd-table-theme-update-var",
          type: "mixin",
          packageName: "table",
        },
        {
          name: "rmd-typography-value",
          type: "mixin",
          packageName: "typography",
        },
        {
          name: "rmd-table-cell-horizontal-alignments",
          type: "mixin",
          packageName: "table",
        },
        {
          name: "rmd-typography-text-overflow-ellipsis",
          type: "mixin",
          packageName: "typography",
        },
        { name: "rmd-theme", type: "mixin", packageName: "theme" },
        { name: "rmd-utils-full-screen", type: "mixin", packageName: "utils" },
        {
          name: "rmd-table-cell-color",
          type: "variable",
          packageName: "table",
        },
        {
          name: "rmd-table-header-cell-color",
          type: "variable",
          packageName: "table",
        },
        {
          name: "rmd-table-checkbox-padding",
          type: "variable",
          packageName: "table",
        },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
        {
          name: "rmd-table-cell-sticky-z-index",
          type: "variable",
          packageName: "table",
        },
      ],
      packageName: "table",
      code: "@mixin rmd-table-cell { … }",
      sourceCode:
        '@mixin rmd-table-cell {\n  @include rmd-typography(body-2);\n  @include rmd-table-theme(color, cell-color);\n  @include rmd-table-theme(height, cell-height);\n  @include rmd-table-theme(padding-left, cell-h-padding);\n  @include rmd-table-theme(padding-right, cell-h-padding);\n  @include rmd-table-cell-vertical-alignments;\n\n  &--header {\n    @if $rmd-table-cell-color != $rmd-table-header-cell-color {\n      @include rmd-table-theme-update-var(\n        cell-color,\n        $rmd-table-header-cell-color\n      );\n    }\n    @include rmd-typography-value(\n      subtitle-2,\n      font-weight,\n      letter-spacing,\n      line-height\n    );\n    @include rmd-utils-rtl {\n      text-align: right;\n    }\n\n    text-align: left;\n  }\n\n  // want this to come after the header since the "default" should be\n  // `text-align: left` but browser have `<th>` defaulted to `text-align:\n  // center`. If this is included before the `--header` state, it won\'t be\n  // applied\n  @include rmd-table-cell-horizontal-alignments;\n\n  &--grow {\n    width: 100%;\n  }\n\n  &--no-wrap {\n    @include rmd-typography-text-overflow-ellipsis;\n  }\n\n  &--no-padding {\n    padding: 0;\n  }\n\n  &--checkbox {\n    @include rmd-table-theme-update-var(\n      cell-h-padding,\n      $rmd-table-checkbox-padding\n    );\n  }\n\n  &--sticky {\n    // need to set a background color so the other rows/cells can be scrolled\n    // underneath.\n    @include rmd-theme(background-color, background);\n    @include rmd-utils-mouse-only {\n      &::after {\n        @include rmd-transition(standard);\n\n        transition: background-color $rmd-transition-standard-time;\n      }\n    }\n\n    // see the `::after` selector for info about border and background color,\n    // but this _should_ inherit the border from the `<tr>` only when the\n    // `--bordered` class is also enabled\n    border: inherit;\n    position: sticky;\n    will-change: transform;\n    z-index: $rmd-table-cell-sticky-z-index;\n\n    &::after {\n      // ok. fun stuff. if position sticky is set on a table that has\n      // `border-collapse: collapse`, borders will not visible on these cells.\n      // to re-enable the borders (and hover color), we can create a full-sized\n      // `::after` pseudo element that will gain the border and background-color\n      // when hovered. this probably isn\'t the best solution, but it works for\n      // these use-cases.\n      @include rmd-utils-full-screen(absolute);\n\n      // the border should inherit the parent border... which is inherited from\n      // the `<tr>` only when the `--bordered` class has been enabled.. Woo!...\n      border: inherit;\n      content: "";\n      pointer-events: none;\n    }\n  }\n\n  &--sticky-header {\n    @include rmd-table-theme(top, sticky-header);\n  }\n\n  &--sticky-cell {\n    @include rmd-utils-rtl {\n      @include rmd-table-theme(right, sticky-cell);\n\n      left: auto;\n    }\n    @include rmd-table-theme(left, sticky-cell);\n  }\n\n  &--sticky-above {\n    // need to increase by one more so it can cover other sticky cells\n    z-index: $rmd-table-cell-sticky-z-index + 1;\n  }\n\n  &--sticky-footer {\n    @include rmd-table-theme(bottom, sticky-footer);\n  }\n\n  &--padded {\n    @include rmd-table-theme(padding-bottom, cell-v-padding);\n    @include rmd-table-theme(padding-top, cell-v-padding);\n  }\n\n  &--no-padding {\n    // this is used with the `__size` to make a parent element\n    // (usually clickable) be the full size and height of the cell\n    padding: 0;\n  }\n\n  &__child {\n    @include rmd-table-theme(padding-left, cell-h-padding);\n    @include rmd-table-theme(padding-right, cell-h-padding);\n\n    align-items: center;\n    color: inherit;\n    font: inherit;\n    height: 100%;\n    width: 100%;\n  }\n}\n',
      type: "mixin",
    },
    "rmd-table-row": {
      name: "rmd-table-row",
      description:
        "Creates the styles for the `<tr>` element.\n\nNote: The base class actually has no styles.\n",
      source: "packages/table/src/_mixins.scss#L230-L269",
      usedBy: [{ name: "react-md-table", type: "mixin", packageName: "table" }],
      requires: [
        { name: "rmd-table-theme", type: "mixin", packageName: "table" },
        { name: "rmd-divider-border", type: "mixin", packageName: "divider" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
      ],
      packageName: "table",
      code: "@mixin rmd-table-row { … }",
      sourceCode:
        "@mixin rmd-table-row {\n  &--selected {\n    @include rmd-table-theme(background-color, selected-color);\n\n    .rmd-table-cell--sticky-cell::after {\n      @include rmd-table-theme(background-color, selected-color);\n    }\n  }\n\n  &--clickable:hover {\n    cursor: pointer;\n  }\n\n  &--bordered {\n    @include rmd-divider-border(bottom);\n\n    // this is actually pretty nice since it'll also NOT create a border on the\n    // header row (which we want)\n    &:last-child {\n      border-bottom-width: 0;\n    }\n  }\n\n  &--hoverable {\n    @include rmd-utils-mouse-only {\n      @include rmd-transition(standard);\n\n      transition: background-color $rmd-transition-standard-time;\n\n      &:hover {\n        @include rmd-table-theme(background-color, hover-color);\n\n        // see the `.rmd-table-cell--sticky` selector for more info :/\n        .rmd-table-cell--sticky-cell::after {\n          @include rmd-table-theme(background-color, hover-color);\n        }\n      }\n    }\n  }\n}\n",
      type: "mixin",
    },
    "react-md-table": {
      name: "react-md-table",
      description: "Creates all the styles for the table package.\n",
      source: "packages/table/src/_mixins.scss#L272-L298",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        { name: "rmd-utils-scroll", type: "mixin", packageName: "utils" },
        { name: "rmd-table", type: "mixin", packageName: "table" },
        { name: "rmd-thead", type: "mixin", packageName: "table" },
        { name: "rmd-table-cell", type: "mixin", packageName: "table" },
        { name: "rmd-table-row", type: "mixin", packageName: "table" },
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        {
          name: "rmd-table-theme-values",
          type: "variable",
          packageName: "table",
        },
      ],
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
      usedBy: [{ name: "rmd-table-cell", type: "mixin", packageName: "table" }],
      packageName: "table",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-table-cell-height": {
      name: "rmd-table-cell-height",
      description: "The minimum height for each `<td>`.\n",
      source: "packages/table/src/_variables.scss#L38",
      usedBy: [{ name: "rmd-thead", type: "mixin", packageName: "table" }],
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
      usedBy: [{ name: "rmd-thead", type: "mixin", packageName: "table" }],
      packageName: "table",
      type: "Number",
      value: "2rem",
      overridable: true,
    },
    "rmd-table-cell-color": {
      name: "rmd-table-cell-color",
      description: "The text color for `<td>` cells within a table.",
      source: "packages/table/src/_variables.scss#L49",
      usedBy: [{ name: "rmd-table-cell", type: "mixin", packageName: "table" }],
      requires: [
        { name: "rmd-theme-var", type: "function", packageName: "theme" },
      ],
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
      source: "packages/table/src/_variables.scss#L57",
      usedBy: [
        {
          name: "rmd-table-cell-horizontal-alignments",
          type: "mixin",
          packageName: "table",
        },
      ],
      packageName: "table",
      type: "List",
      value: "(center right)",
      overridable: true,
    },
    "rmd-table-cell-vertical-alignments": {
      name: "rmd-table-cell-vertical-alignments",
      description:
        'A map of the supported `vertical-align` for a table cell align with the amount of padding to apply. Tables are "fun" to style since theres some weird stuff with how `height` + `padding` works by default so when the `vertical-align` is set to `top` or `bottom`, you also need to apply some padding OR update the `line-height` for the cell. I decided to go with a `padding` approach to make things a bit easier for non-text cells.\n\nNote: You can also set this value to `null` if you do not want to generate the minimal styles for the non-middle alignments.',
      source: "packages/table/src/_variables.scss#L70",
      usedBy: [
        {
          name: "rmd-table-cell-vertical-alignments",
          type: "mixin",
          packageName: "table",
        },
      ],
      packageName: "table",
      type: "List",
      value: "(top bottom)",
      overridable: true,
    },
    "rmd-table-header-cell-height": {
      name: "rmd-table-header-cell-height",
      description:
        "The minimum height for each `<th>` that appears in the `<thead>`.\n\nNote: No styles will be generated if this is `null` or the same value as the `$rmd-table-cell-height`.",
      source: "packages/table/src/_variables.scss#L78",
      usedBy: [{ name: "rmd-thead", type: "mixin", packageName: "table" }],
      packageName: "table",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-table-header-cell-dense-height": {
      name: "rmd-table-header-cell-dense-height",
      description:
        "The minimum height for each `<th>` that appears in the `<thead>` with the dense spec.\n\nNote: No styles will be generated if this is `null` or the same value as the `$rmd-table-cell-dense-height`.",
      source: "packages/table/src/_variables.scss#L87",
      usedBy: [{ name: "rmd-thead", type: "mixin", packageName: "table" }],
      packageName: "table",
      type: "Number",
      value: "2.125rem",
      overridable: true,
    },
    "rmd-table-header-cell-color": {
      name: "rmd-table-header-cell-color",
      description:
        "The color to use for `<th>` cells within a table.\n\nNote: No styles will be generated if this is `null` or the same value as the `$rmd-table-cell-color`.",
      source: "packages/table/src/_variables.scss#L95",
      usedBy: [{ name: "rmd-table-cell", type: "mixin", packageName: "table" }],
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
      source: "packages/table/src/_variables.scss#L102",
      packageName: "table",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-table-row-hover-color": {
      name: "rmd-table-row-hover-color",
      description:
        "The background color to use when hovering over a row within the `<tbody>` and the `hoverable` styles have been enabled.",
      source: "packages/table/src/_variables.scss#L109",
      requires: [
        { name: "rmd-black-base", type: "variable", packageName: "theme" },
      ],
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
      source: "packages/table/src/_variables.scss#L116",
      requires: [
        {
          name: "rmd-states-theme-var",
          type: "function",
          packageName: "states",
        },
      ],
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
      source: "packages/table/src/_variables.scss#L123",
      packageName: "table",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-table-checkbox-padding": {
      name: "rmd-table-checkbox-padding",
      description:
        "The amount of padding to apply to a table checkbox cell. This should normally be smaller than the default left and right padding to reduce the width of this cell.",
      source: "packages/table/src/_variables.scss#L130",
      usedBy: [{ name: "rmd-table-cell", type: "mixin", packageName: "table" }],
      packageName: "table",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-table-theme-values": {
      name: "rmd-table-theme-values",
      description:
        'A Map of all the "themeable" parts of the table package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.',
      source: "packages/table/src/_variables.scss#L137-L148",
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
