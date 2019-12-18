/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-tree-theme": {
      name: "rmd-tree-theme",
      description:
        "This function is used to quickly get one of the tree's theme values. This is really\njust for the `rmd-tree-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/tree/src/_functions.scss#L14-L16",
      packageName: "tree",
      code: "@function rmd-tree-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-tree-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tree-theme-values, tree);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tree-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the tree's theme values.",
      },
    },
    "rmd-tree-theme-var": {
      name: "rmd-tree-theme-var",
      description:
        "This function is used to get one of the tree's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-tree-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/tree/src/_functions.scss#L29-L31",
      packageName: "tree",
      code: "@function rmd-tree-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-tree-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-tree-theme-values,\n    tree,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tree-theme-values` map keys to set a value for.",
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
        description: "one of the tree's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-tree-theme": {
      name: "rmd-tree-theme",
      description:
        "Creates the styles for one of the tree's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      source: "packages/tree/src/_mixins.scss#L20-L22",
      packageName: "tree",
      code:
        "@mixin rmd-tree-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-tree-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-tree-theme-values,\n    tree\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-tree-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-tree-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-tree-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-tree-theme-update-var": {
      name: "rmd-tree-theme-update-var",
      description:
        "Updates one of the tree's theme variables with the new value for the section\nof your app.\n\n",
      source: "packages/tree/src/_mixins.scss#L30-L32",
      packageName: "tree",
      code: "@mixin rmd-tree-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-tree-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-tree-theme-values,\n    tree\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The tree theme style type to update. This should be one\n  of the `$rmd-tree-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-tree-depths": {
      name: "rmd-tree-depths",
      description:
        "Creates the styles for all the depths from the provided min and max values for a tree.\n\n",
      source: "packages/tree/src/_mixins.scss#L41-L62",
      usedBy: [{ name: "rmd-tree", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      code:
        "@mixin rmd-tree-depths($selector-prefix: '', $min: 1, $max: $rmd-tree-max-depth, $incrementor: $rmd-tree-item-padding-incrementor, $base: $rmd-tree-item-padding-base) { … }",
      sourceCode:
        "@mixin rmd-tree-depths(\n  $selector-prefix: \"\",\n  $min: 1,\n  $max: $rmd-tree-max-depth,\n  $incrementor: $rmd-tree-item-padding-incrementor,\n  $base: $rmd-tree-item-padding-base\n) {\n  @if $min < 1 {\n    @error 'Invalid min value: \\'#{$min}\\'! The min must be a number greater than 0.';\n  }\n\n  @if $max < $min {\n    @error 'Invalid max value: \\'#{$max}\\'! The max must be a number greater than the min value: \\'#{$min}\\'';\n  }\n\n  $index: $min;\n  @while $index < $max {\n    @include rmd-tree-item-at-depth(\n      $index,\n      $selector-prefix,\n      $incrementor,\n      $base-padding\n    );\n\n    $index: $index + 1;\n  }\n}\n",
      throws: ["Invalid min value: \\", "Invalid max value: \\"],
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "selector-prefix",
          default: "''",
          description:
            "An optional prefix to apply before the `aria-level` selector.",
        },
        {
          type: "Number",
          name: "min",
          default: "1",
          description:
            "The min level to use. This needs to be a number greater than 0.",
        },
        {
          type: "Number",
          name: "max",
          default: "rmd-tree-max-depth",
          description: "The max number of levels to create styles for.",
        },
        {
          type: "Number",
          name: "incrementor",
          default: "rmd-tree-item-padding-incrementor",
          description:
            "The amount of padding to be used for each level of depth.",
        },
        {
          type: "Number",
          name: "base",
          default: "rmd-tree-item-padding-base",
          description:
            "The base amount of padding that should be added to a tree item.",
        },
      ],
    },
    "rmd-tree-item-at-depth": {
      name: "rmd-tree-item-at-depth",
      description:
        "Creates styles to add additional padding to tree items based on depth. This will only work\nif you correctly apply the `aria-level` attributes to the list items.\n\nThe formula used for creating padding is:\n```scss\n$padding: (($depth - 1) * $incrementor) + $base;\n```\n\n",
      source: "packages/tree/src/_mixins.scss#L76-L88",
      usedBy: [{ name: "rmd-tree-depths", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      code:
        "@mixin rmd-tree-item-at-depth($depth, $selector-prefix: '', $incrementor: $rmd-tree-item-padding-incrementor, $base: $rmd-tree-item-padding-base) { … }",
      sourceCode:
        '@mixin rmd-tree-item-at-depth(\n  $depth,\n  $selector-prefix: "",\n  $incrementor: $rmd-tree-item-padding-incrementor,\n  $base: $rmd-tree-item-padding-base\n) {\n  $selector: \'#{$selector-prefix}[aria-level="#{$depth + 1}"].rmd-tree-item__content, #{$selector-prefix}[aria-level="#{$depth + 1}"] > .rmd-tree-item__content\';\n  $padding: (($depth - 1) * $incrementor) + $base;\n\n  #{$selector} {\n    @include rmd-utils-rtl-auto(\n      padding-left,\n      $padding,\n      $rmd-list-item-horizontal-padding\n    );\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "Number",
          name: "depth",
          description: "The depth to create styles for.",
        },
        {
          type: "String",
          name: "selector-prefix",
          default: "''",
          description:
            "An optional selector prefix to add before the `aria-level`.",
        },
        {
          type: "Number",
          name: "incrementor",
          default: "rmd-tree-item-padding-incrementor",
          description:
            "The amount of padding to be used for each level of depth.",
        },
        {
          type: "Number",
          name: "base",
          default: "rmd-tree-item-padding-base",
          description:
            "The base amount of padding that should be added to a tree item.",
        },
      ],
    },
    "rmd-tree": {
      name: "rmd-tree",
      description: "Creates all the styles for a tree.\n",
      source: "packages/tree/src/_mixins.scss#L91-L98",
      usedBy: [{ name: "react-md-tree", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      code: "@mixin rmd-tree { … }",
      sourceCode:
        "@mixin rmd-tree {\n  @include rmd-tree-depths;\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-utils-scroll;\n\n  height: 100%;\n  width: 100%;\n}\n",
      type: "mixin",
    },
    "rmd-tree-item": {
      name: "rmd-tree-item",
      description:
        "Creates the styles for a tree item. This really requires the `@react-md/list` styles to be created\nbeforehand since these styles just prevent the outline when focused to work with the `@react-md/states`\npackage.\n\n",
      source: "packages/tree/src/_mixins.scss#L108-L124",
      usedBy: [{ name: "react-md-tree", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      examples: [
        {
          code: ".rmd-tree-item {\n  @include rmd-tree-item;\n}\n",
          compiled:
            '.rmd-tree-item {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  list-style: none;\n}\n.rmd-tree-item:focus {\n  outline-style: none;\n}\n.rmd-tree-item::-moz-focus-inner {\n  border: 0;\n}\n.rmd-tree-item__content {\n  min-height: var(--rmd-list-item-height, 3rem);\n  align-items: center;\n  display: flex;\n  padding: var(--rmd-list-item-vertical-padding, 0.5rem)\n    var(--rmd-list-item-horizontal-padding, 1rem);\n  position: relative;\n}\n.rmd-tree-item__content--clickable {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.rmd-tree-item__content--clickable:focus {\n  outline-style: none;\n}\n.rmd-tree-item__content--clickable::-moz-focus-inner {\n  border: 0;\n}\n.rmd-tree-item__content--clickable:focus {\n  outline-style: none;\n}\n.rmd-tree-item__content--clickable::-moz-focus-inner {\n  border: 0;\n}\n.rmd-utils--keyboard .rmd-tree-item__content--clickable:focus::before {\n  box-shadow: var(--rmd-states-focus-shadow, inset 0 0 0 0.125rem #2196f3);\n}\n.rmd-tree-item__content--clickable::before {\n  transition-timing-function: var(\n    --rmd-transition-standard,\n    cubic-bezier(0.4, 0, 0.2, 1)\n  );\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n  z-index: 0;\n  background-color: var(--rmd-states-background-color, transparent);\n  transition: background-color 0.15s;\n}\n.rmd-tree-item__content--clickable:disabled,\n.rmd-tree-item__content--clickable[aria-disabled="true"] {\n  --rmd-states-hover-color: transparent;\n}\n.rmd-tree-item__content--clickable:not(:disabled):not([aria-disabled="true"]):hover {\n  cursor: pointer;\n}\n.rmd-tree-item__content--clickable:hover {\n  --rmd-states-background-color: var(\n    --rmd-states-hover-color,\n    rgba(0, 0, 0, 0.08)\n  );\n}\n.rmd-utils--keyboard .rmd-tree-item__content--clickable:focus {\n  --rmd-states-background-color: var(\n    --rmd-states-focus-color,\n    rgba(0, 0, 0, 0.24)\n  );\n}\n.rmd-utils--keyboard .rmd-tree-item__content--clickable:focus:hover {\n  --rmd-states-background-color: var(\n    --rmd-states-hover-color,\n    rgba(0, 0, 0, 0.08)\n  );\n}\n.rmd-utils--touch .rmd-tree-item__content--clickable:focus,\n.rmd-utils--touch .rmd-tree-item__content--clickable:hover {\n  --rmd-states-background-color: transparent;\n}\n.rmd-tree-item__content--clickable.rmd-states--pressed {\n  --rmd-states-background-color: var(\n    --rmd-states-pressed-color,\n    rgba(0, 0, 0, 0.32)\n  );\n}\n.rmd-utils--keyboard .rmd-tree-item__content--clickable.rmd-states--pressed {\n  --rmd-states-background-color: var(\n    --rmd-states-pressed-color,\n    rgba(0, 0, 0, 0.32)\n  );\n}\n.rmd-tree-item__content[aria-disabled] {\n  color: var(--rmd-theme-text-disabled-on-background, #9e9e9e);\n}\n.rmd-tree-item__content--link {\n  color: inherit;\n  text-decoration: none;\n}\n.rmd-tree-item__content--medium {\n  --rmd-list-item-height: var(--rmd-list-item-medium-height, 3.5rem);\n}\n.rmd-tree-item__content--large {\n  --rmd-list-item-height: var(--rmd-list-item-large-height, 4rem);\n}\n.rmd-tree-item__content--extra-large {\n  --rmd-list-item-height: var(--rmd-list-item-extra-large-height, 4.5rem);\n}\n.rmd-tree-item__content--three-lines {\n  --rmd-list-item-height: var(--rmd-list-item-three-line-height, 5.5rem);\n}\n.rmd-tree-item__content--three-lines .rmd-list-item__text--secondary {\n  max-height: var(--rmd-list-item-secondary-three-line-height, 3rem);\n  line-height: 1.42857;\n  white-space: normal;\n}\n.rmd-tree-item__content--dense {\n  --rmd-list-item-height: var(--rmd-list-dense-item-height, 2.5rem);\n  --rmd-list-item-medium-height: var(--rmd-list-dense-item-medium-height, 3rem);\n  --rmd-list-item-large-height: var(--rmd-list-dense-item-large-height, 3.5rem);\n  --rmd-list-item-extra-large-height: var(\n    --rmd-list-dense-item-extra-large-height,\n    4rem\n  );\n  --rmd-list-item-three-line-height: var(\n    --rmd-list-dense-item-three-line-height,\n    5rem\n  );\n  --rmd-list-item-secondary-three-line-height: var(\n    --rmd-list-dense-item-secondary-three-line-height,\n    2.25rem\n  );\n}\n.rmd-tree-item__content__text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n  flex-grow: 1;\n  z-index: 1;\n}\n[dir="rtl"] .rmd-tree-item__content__text {\n  margin-left: auto;\n}\n.rmd-tree-item__content__text--secondary {\n  color: var(--rmd-theme-text-secondary-on-background, #757575);\n}\n.rmd-tree-item__content__icon {\n  flex-shrink: 0;\n}\n.rmd-tree-item__content__icon--top {\n  align-self: flex-start;\n}\n.rmd-tree-item__content__icon--bottom {\n  align-self: flex-end;\n}\n.rmd-tree-item__content__icon--before {\n  --rmd-icon-text-spacing: calc(\n    var(--rmd-list-text-keyline, 4.5rem) -\n      var(--rmd-list-item-horizontal-padding, 1rem) -\n      var(--rmd-icon-size, 1.5rem)\n  );\n}\n.rmd-tree-item__content__icon--avatar-before {\n  --rmd-icon-text-spacing: calc(\n    var(--rmd-list-text-keyline, 4.5rem) -\n      var(--rmd-list-item-horizontal-padding, 1rem) -\n      var(--rmd-avatar-size, 2.5rem)\n  );\n}\n.rmd-tree-item__content__icon--media {\n  --rmd-icon-text-spacing: var(--rmd-list-media-spacing, 1rem);\n  width: var(--rmd-list-media-size, 3.5rem);\n}\n.rmd-tree-item__content__icon--media-large {\n  --rmd-list-media-size: var(--rmd-list-media-large-size, 6.25rem);\n}\n.rmd-tree-item__content--selected {\n  --rmd-states-background-color: var(\n    --rmd-states-selected-color,\n    rgba(0, 0, 0, 0.16)\n  );\n}\n.rmd-utils--touch .rmd-tree-item__content--selected:hover,\n.rmd-utils--touch .rmd-tree-item__content--selected:focus {\n  --rmd-states-background-color: var(\n    --rmd-states-selected-color,\n    rgba(0, 0, 0, 0.16)\n  );\n}\n.rmd-utils--keyboard .rmd-tree-item__content--focused {\n  box-shadow: inset 0 0 0 2px #2196f3;\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-tree-item { … }",
      sourceCode:
        "@mixin rmd-tree-item {\n  @include rmd-utils-hide-focus-outline;\n  // added again just-in-case so that dnd libraries don't do a bad drag image\n  list-style: none;\n\n  &__content {\n    @include rmd-list-item;\n    @include rmd-states-surface-selected;\n\n    &--focused {\n      @include rmd-utils-map-to-styles($rmd-tree-item-focused-styles);\n      @include rmd-utils-keyboard-only {\n        @include rmd-utils-map-to-styles(\n          $rmd-tree-item-keyboard-focused-styles\n        );\n      }\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-tree-group": {
      name: "rmd-tree-group",
      description: "Creates the styles for the tree group.\n\n",
      source: "packages/tree/src/_mixins.scss#L132-L141",
      usedBy: [{ name: "react-md-tree", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      examples: [
        {
          code: ".rmd-tree-group {\n  @include rmd-tree-group;\n}\n",
          compiled:
            ".rmd-tree-group {\n  background-color: inherit;\n  color: inherit;\n  font-size: inherit;\n  line-height: inherit;\n  padding-bottom: 0;\n  padding-top: 0;\n}\n",
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-tree-group { … }",
      sourceCode:
        "@mixin rmd-tree-group {\n  background-color: inherit;\n  color: inherit;\n  font-size: inherit;\n  line-height: inherit;\n\n  // remove the list padding to make it more condensed\n  padding-bottom: 0;\n  padding-top: 0;\n}\n",
      type: "mixin",
    },
    "react-md-tree": {
      name: "react-md-tree",
      description: "Creates all the styles for a tree\n",
      source: "packages/tree/src/_mixins.scss#L144-L162",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "tree",
      code: "@mixin react-md-tree { … }",
      sourceCode:
        "@mixin react-md-tree {\n  @include rmd-theme-create-root-theme($rmd-tree-theme-values, tree);\n\n  .rmd-tree {\n    @include rmd-tree;\n  }\n\n  .rmd-tree-item {\n    @include rmd-tree-item;\n  }\n\n  .rmd-tree-group {\n    @include rmd-tree-group;\n  }\n\n  .rmd-tree-item__rotator-icon {\n    @include rmd-icon-theme-update-var(rotate-to, rotate(90deg));\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-tree-max-depth": {
      name: "rmd-tree-max-depth",
      description:
        "The default max-depth to create for the tree depths. This is used in the `rmd-tree-depths` mixin to generate offsets\nin css based on how deep a tree item is. If this value is less than or equal to 1, no depth styles will be created.\n\n",
      source: "packages/tree/src/_variables.scss#L11",
      packageName: "tree",
      type: "Number",
      value: "3",
      overridable: true,
    },
    "rmd-tree-item-padding-incrementor": {
      name: "rmd-tree-item-padding-incrementor",
      description:
        "The amount of padding that should be multiplied by the current depth and added to the `rmd-tree-item-padding-base`.\n\n",
      source: "packages/tree/src/_variables.scss#L18",
      see: [
        { name: "rmd-tree-depths", type: "mixin", packageName: "tree" },
        { name: "rmd-tree-item-at-depth", type: "mixin", packageName: "tree" },
      ],
      packageName: "tree",
      type: "Number",
      value: "$rmd-list-item-horizontal-padding * 1.5",
      compiled: "1.5rem",
      overridable: true,
    },
    "rmd-tree-item-padding-base": {
      name: "rmd-tree-item-padding-base",
      description:
        "The base amout of padding to apply to a tree item that has a depth greater than 1. This is set to a value\nthat assumes you have icons to the left of the items at the base level. If you do not, it would be better to\nset this value to something smaller or `$rmd-list-item-horizontal-padding * 2.5`.\n\n",
      source: "packages/tree/src/_variables.scss#L27",
      see: [
        { name: "rmd-tree-depths", type: "mixin", packageName: "tree" },
        { name: "rmd-tree-item-at-depth", type: "mixin", packageName: "tree" },
      ],
      packageName: "tree",
      type: "Number",
      value: "$rmd-list-item-text-keyline",
      compiled: "4.5rem",
      overridable: true,
    },
    "rmd-tree-item-focused-styles": {
      name: "rmd-tree-item-focused-styles",
      description:
        "The styles to apply when a tree item gains focus. These styles will be applied even\nafter a touch or mouse click.\n",
      source: "packages/tree/src/_variables.scss#L32",
      usedBy: [{ name: "rmd-tree-item", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      type: "Map",
      value: "()",
      overridable: true,
    },
    "rmd-tree-item-keyboard-focused-styles": {
      name: "rmd-tree-item-keyboard-focused-styles",
      description:
        "The styles to apply to a tree item that is **focused while in keyboard mode** only.\nIf you want to apply focus styles for all modes, use the `$rmd-tree-item-focused-styles`\ninstead and set this value to `null` or an empty Map `()`.\n\n",
      source: "packages/tree/src/_variables.scss#L40-L42",
      see: [
        {
          name: "rmd-tree-item-focused-styles",
          type: "variable",
          packageName: "tree",
        },
      ],
      usedBy: [{ name: "rmd-tree-item", type: "mixin", packageName: "tree" }],
      packageName: "tree",
      type: "Map",
      value: "(\n  box-shadow: inset 0 0 0 2px $rmd-blue-500,\n)",
      compiled: "(\n  box-shadow: inset 0 0 0 2px #2196f3,\n)",
      overridable: true,
    },
    "rmd-tree-theme-values": {
      name: "rmd-tree-theme-values",
      description:
        'A Map of all the "themeable" parts of the tree package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/tree/src/_variables.scss#L48-L51",
      usedBy: [
        { name: "rmd-tree-theme", type: "function", packageName: "tree" },
        { name: "rmd-tree-theme-var", type: "function", packageName: "tree" },
        { name: "rmd-tree-theme", type: "mixin", packageName: "tree" },
        {
          name: "rmd-tree-theme-update-var",
          type: "mixin",
          packageName: "tree",
        },
        { name: "react-md-tree", type: "mixin", packageName: "tree" },
      ],
      packageName: "tree",
      type: "Map",
      value:
        "(\n  incrementor: $rmd-tree-item-padding-incrementor,\n  base-padding: $rmd-tree-item-padding-base,\n)",
      compiled: "(\n  incrementor: 1.5rem,\n  base-padding: 4.5rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
