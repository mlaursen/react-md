/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const TooltipSassDoc: PackageSassDoc = {
  name: "tooltip",
  variables: [
    {
      name: "rmd-tooltip-background-color",
      type: "Color",
      description: "The background color to use for tooltips.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "#232f34",
      compiledValue: "#232f34",
      configurable: true,
    },
    {
      name: "rmd-tooltip-color",
      type: "Color",
      description:
        "The text color to use for tooltips. By default, this will inherit the primary\ntext colors for a dark or light background color of the tooltip.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value:
        "if(\n  rmd-theme-contrast-tone($rmd-tooltip-background-color) == 'light',\n  rmd-theme-var(text-primary-on-dark),\n  rmd-theme-var(text-primary-on-light)\n)",
      compiledValue: "var(--rmd-theme-text-primary-on-dark, #d9d9d9)",
      configurable: true,
    },
    {
      name: "rmd-tooltip-enter-duration",
      type: "Number",
      description:
        "The enter transition time for the tooltip to enter or to exit.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-tooltip-exit-duration",
      type: "Number",
      description:
        "The exit transition time for the tooltip to enter or to exit.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-tooltip-z-index",
      type: "Number",
      description: "The z-index to use for tooltips when they are visible.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "100",
      compiledValue: "100",
      configurable: true,
    },
    {
      name: "rmd-tooltip-font-size",
      type: "Number",
      description: "The font size to use for tooltips\n\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [
        {
          name: "rmd-tooltip-dense-font-size",
          type: "variable",
          description: "The font size to use for dense tooltips.\n",
          group: "tooltip",
        },
      ],
      links: [],
      value: "1rem",
      compiledValue: "1rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-line-height",
      type: "Number",
      description: "The default line-height to use for tooltips.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "1.5rem",
      compiledValue: "1.5rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-min-height",
      type: "Number",
      description:
        "The min height to use for tooltips. This allows the tooltips to grow in height automatically\nbased on line wrapping. You will need to add additional padding in these cases though.\n\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [
        {
          name: "rmd-tooltip-dense-min-height",
          type: "variable",
          description:
            "The min-height to use for dense tooltips. This allows the tooltips to grow in height automatically\nbased on line wrapping. You will need to add additional padding in these cases though.\n\n",
          group: "tooltip",
        },
      ],
      links: [],
      value: "2rem",
      compiledValue: "2rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-horizontal-padding",
      type: "Number",
      description: "The left and right padding to apply to tooltips.\n\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [
        {
          name: "rmd-tooltip-dense-horizontal-padding",
          type: "variable",
          description: "The left and right padding to use for dense tooltips\n",
          group: "tooltip",
        },
      ],
      links: [],
      value: "1rem",
      compiledValue: "1rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-line-wrap-vertical-padding",
      type: "Number",
      description:
        "The top and bottom padding to apply to tooltips when line wrapping is enabled.\n\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [
        {
          name: "rmd-tooltip-dense-line-wrap-vertical-padding",
          type: "variable",
          description:
            "The top and bottom padding to apply to dense tooltips when line wrapping is enabled.\n\n",
          group: "tooltip",
        },
      ],
      links: [],
      value: "0.5625rem",
      compiledValue: "0.5625rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-spacing",
      type: "Number",
      description:
        "The amount of spacing to place between the tooltip and the tooltip's container element.\n\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [
        {
          name: "rmd-tooltip-dense-spacing",
          type: "variable",
          description:
            "The amount of spacing to place between the dense tooltip and the tooltip's container element.\n",
          group: "tooltip",
        },
      ],
      links: [],
      value: "1.5rem",
      compiledValue: "1.5rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-dense-font-size",
      type: "Number",
      description: "The font size to use for dense tooltips.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "0.625rem",
      compiledValue: "0.625rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-dense-min-height",
      type: "Number",
      description:
        "The min-height to use for dense tooltips. This allows the tooltips to grow in height automatically\nbased on line wrapping. You will need to add additional padding in these cases though.\n\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [
        {
          name: "rmd-tooltip-min-height",
          type: "variable",
          description:
            "The min height to use for tooltips. This allows the tooltips to grow in height automatically\nbased on line wrapping. You will need to add additional padding in these cases though.\n\n",
          group: "tooltip",
        },
      ],
      links: [],
      value: "1.375rem",
      compiledValue: "1.375rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-dense-horizontal-padding",
      type: "Number",
      description: "The left and right padding to use for dense tooltips\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "0.5rem",
      compiledValue: "0.5rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-dense-line-wrap-vertical-padding",
      type: "Number",
      description:
        "The top and bottom padding to apply to dense tooltips when line wrapping is enabled.\n\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [
        {
          name: "rmd-tooltip-line-wrap-vertical-padding",
          type: "variable",
          description:
            "The top and bottom padding to apply to tooltips when line wrapping is enabled.\n\n",
          group: "tooltip",
        },
      ],
      links: [],
      value: "0.375rem",
      compiledValue: "0.375rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-dense-spacing",
      type: "Number",
      description:
        "The amount of spacing to place between the dense tooltip and the tooltip's container element.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "0.875rem",
      compiledValue: "0.875rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-border-radius",
      type: "Number",
      description: "The border radius to apply to tooltips\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "0.25rem",
      compiledValue: "0.25rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-transition-distance",
      type: "Number",
      description:
        "The distance that the tooltip should animate from the tooltip's control element.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "0.5rem",
      compiledValue: "0.5rem",
      configurable: true,
    },
    {
      name: "rmd-tooltip-position-values",
      type: "List",
      description:
        "This is really just for internal use and a ncie way to loop over the four positions when creating styles.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value: "above below left right",
      compiledValue: "above below left right",
      configurable: false,
    },
    {
      name: "rmd-tooltip-theme-values",
      type: "Map",
      description: "A Map containing all the styles for the tooltip theme.\n",
      file: "@react-md/tooltip/dist/_variables.scss",
      group: "tooltip",
      see: [],
      links: [],
      value:
        "(\n  background-color: $rmd-tooltip-background-color,\n  color: $rmd-tooltip-color,\n  transition-distance: $rmd-tooltip-transition-distance,\n  z-index: $rmd-tooltip-z-index,\n  spacing: $rmd-tooltip-spacing,\n  min-height: $rmd-tooltip-min-height,\n  font-size: $rmd-tooltip-font-size,\n  horizontal-padding: $rmd-tooltip-horizontal-padding,\n  vertical-padding: $rmd-tooltip-line-wrap-vertical-padding,\n  dense-spacing: $rmd-tooltip-dense-spacing,\n  dense-min-height: $rmd-tooltip-dense-min-height,\n  dense-font-size: $rmd-tooltip-dense-font-size,\n  dense-horizontal-padding: $rmd-tooltip-dense-horizontal-padding,\n  dense-vertical-padding: $rmd-tooltip-dense-line-wrap-vertical-padding,\n)",
      compiledValue:
        "(\n  background-color: #232f34,\n  color: var(--rmd-theme-text-primary-on-dark, #d9d9d9),\n  transition-distance: 0.5rem,\n  z-index: 100,\n  spacing: 1.5rem,\n  min-height: 2rem,\n  font-size: 1rem,\n  horizontal-padding: 1rem,\n  vertical-padding: 0.5625rem,\n  dense-spacing: 0.875rem,\n  dense-min-height: 1.375rem,\n  dense-font-size: 0.625rem,\n  dense-horizontal-padding: 0.5rem,\n  dense-vertical-padding: 0.375rem,\n);\n",
      configurable: false,
    },
  ],
  functions: [
    {
      name: "rmd-tooltip-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the tooltip's theme values. This is really\njust for the `rmd-tooltip-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/tooltip/dist/_functions.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@function rmd-tooltip-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-tooltip-theme-values, tooltip);\n}",
      oneLineCode: "@function rmd-tooltip-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tooltip-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the tooltip's theme values.",
      },
    },
    {
      name: "rmd-tooltip-theme-var",
      type: "function",
      description:
        "This function is used to get one of the tooltip's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-tooltip-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/tooltip/dist/_functions.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@function rmd-tooltip-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-tooltip-theme-values, tooltip, $fallback);\n}",
      oneLineCode:
        "@function rmd-tooltip-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-tooltip-theme-values` map keys to set a value for.",
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
        description: "one of the tooltip's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-tooltip-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the tooltip's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/tooltip/dist/_mixins.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@mixin rmd-tooltip-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-tooltip-theme-values, tooltip);\n}",
      oneLineCode:
        "@mixin rmd-tooltip-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-tooltip-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-tooltip-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-tooltip-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-tooltip-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the tooltip's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/tooltip/dist/_mixins.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@mixin rmd-tooltip-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-tooltip-theme-values, tooltip);\n}",
      oneLineCode:
        "@mixin rmd-tooltip-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The tooltip theme style type to update. This should be one\n  of the `$rmd-tooltip-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-tooltip-base",
      type: "mixin",
      description: "Creates the base styles for a tooltip.\n",
      file: "@react-md/tooltip/dist/_mixins.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@mixin rmd-tooltip-base {\n  @include rmd-typography-base;\n  @include rmd-typography-value(body-1, letter-spacing);\n  @include rmd-tooltip-theme(background-color);\n  @include rmd-tooltip-theme(color);\n  @include rmd-tooltip-theme(font-size);\n  @include rmd-tooltip-theme(min-height);\n  @include rmd-tooltip-theme(padding-left, horizontal-padding);\n  @include rmd-tooltip-theme(padding-right, horizontal-padding);\n  @include rmd-tooltip-theme(z-index);\n\n  align-items: center;\n  border-radius: $rmd-tooltip-border-radius;\n  display: flex;\n  line-height: $rmd-tooltip-line-height;\n  opacity: 0;\n  pointer-events: none;\n  position: absolute;\n  text-transform: none;\n  user-select: none;\n  white-space: nowrap;\n}",
      oneLineCode: "@mixin rmd-tooltip-base { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-tooltip-position",
      type: "mixin",
      description:
        "Creates the styles for one of the four tooltip positions.\n\n",
      file: "@react-md/tooltip/dist/_mixins.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@mixin rmd-tooltip-position($position: ) {\n  $position: rmd-utils-validate($rmd-tooltip-position-values, $position, 'tooltip position');\n\n  // add a negative spacing since the position will be transformed for centering below\n  $inversed-position: rmd-tooltip-inverse-position($position);\n  $inversed-property: rmd-tooltip-position-to-property($inversed-position);\n  #{$inversed-property}: calc(100% + #{rmd-tooltip-theme-var(spacing)});\n\n  $horizontal: $position == 'left' or $position == 'right';\n  $distance: if(\n    $position == 'left' or $position == 'above',\n    rmd-tooltip-theme-var(transition-distance),\n    calc(-1 * #{rmd-tooltip-theme-var(transition-distance)})\n  );\n\n  $inactive-x: if($horizontal, $distance, -50%);\n  $inactive-y: if($horizontal, -50%, $distance);\n\n  left: if($horizontal, null, 50%);\n  top: if($horizontal, 50%, null);\n  transform: translate3d($inactive-x, $inactive-y, 0);\n\n  &.rmd-tooltip--visible {\n    $active-x: if($horizontal, 0, -50%);\n    $active-y: if($horizontal, -50%, 0);\n\n    transform: translate3d($active-x, $active-y, 0);\n  }\n}",
      oneLineCode: "@mixin rmd-tooltip-position($position: ) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".rmd-tooltip--left {\n  @include rmd-tooltip-position(left);\n}",
          description: "Example SCSS Usage",
          compiledCode:
            ".rmd-tooltip--left {\n  right: calc(100% + var(--rmd-tooltip-spacing, 1.5rem));\n  top: 50%;\n  transform: translate3d(\n    var(--rmd-tooltip-transition-distance, 0.5rem),\n    -50%,\n    0\n  );\n}\n.rmd-tooltip--left.rmd-tooltip--visible {\n  transform: translate3d(0, -50%, 0);\n}\n",
        },
      ],
      parameters: [
        {
          type: "String",
          name: "position",
          description:
            "One of the four tooltip positions. (top, right, bottom, or left)",
        },
      ],
    },
    {
      name: "rmd-tooltip-line-wrap",
      type: "mixin",
      description: "Creates the base styles to allow line-wrapping tooltips.\n",
      file: "@react-md/tooltip/dist/_mixins.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@mixin rmd-tooltip-line-wrap {\n  @include rmd-tooltip-theme(padding-bottom, vertical-padding);\n  @include rmd-tooltip-theme(padding-top, vertical-padding);\n\n  white-space: normal;\n}",
      oneLineCode: "@mixin rmd-tooltip-line-wrap { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-tooltip-dense",
      type: "mixin",
      description: "Creates the dense tooltip style overrides.\n",
      file: "@react-md/tooltip/dist/_mixins.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@mixin rmd-tooltip-dense {\n  @include rmd-tooltip-theme(font-size, dense-font-size);\n  @include rmd-tooltip-theme(min-height, dense-min-height);\n  @include rmd-tooltip-theme(padding-left, dense-horizontal-padding);\n  @include rmd-tooltip-theme(padding-right, dense-horizontal-padding);\n\n  @each $position in $rmd-tooltip-position-values {\n    &.rmd-tooltip--#{$position} {\n      $inversed-position: rmd-tooltip-inverse-position($position);\n      $inversed-property: rmd-tooltip-position-to-property($inversed-position);\n      #{$inversed-property}: calc(100% + #{rmd-tooltip-theme-var(dense-spacing)});\n    }\n  }\n\n  &-line-wrap {\n    @include rmd-tooltip-theme(padding-bottom, dense-vertical-padding);\n    @include rmd-tooltip-theme(padding-top, dense-vertical-padding);\n  }\n}",
      oneLineCode: "@mixin rmd-tooltip-dense { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-tooltip",
      type: "mixin",
      description:
        "Creates all the styles for a tooltip element. This should be used within a\ncss class.\n",
      file: "@react-md/tooltip/dist/_mixins.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@mixin rmd-tooltip {\n  @include rmd-tooltip-base;\n\n  &--line-wrap {\n    @include rmd-tooltip-line-wrap;\n  }\n\n  &--dense {\n    @include rmd-tooltip-dense;\n  }\n\n  &--visible {\n    opacity: 1;\n  }\n\n  &--enter {\n    @include rmd-transition(deceleration);\n\n    transition: opacity $rmd-tooltip-enter-duration, transform $rmd-tooltip-enter-duration * 2;\n  }\n\n  &--exit {\n    @include rmd-transition(acceleration);\n\n    transition-duration: $rmd-tooltip-exit-duration;\n  }\n\n  &--exit-active {\n    opacity: 0;\n  }\n\n  &--left {\n    @include rmd-tooltip-position(left);\n  }\n\n  &--above {\n    @include rmd-tooltip-position(above);\n  }\n\n  &--right {\n    @include rmd-tooltip-position(right);\n  }\n\n  &--below {\n    @include rmd-tooltip-position(below);\n  }\n\n  &--portal {\n    // reset everything since it is now handled by inline styles\n    bottom: auto;\n    left: auto;\n    right: auto;\n    top: auto;\n\n    $distance: rmd-tooltip-theme-var(transition-distance);\n    // have to use calc to negate the value of a css variable\n    $negative-distance: calc(-1 * #{$distance});\n\n    &.rmd-tooltip--above {\n      transform: translateY($negative-distance);\n    }\n\n    &.rmd-tooltip--below {\n      transform: translateY($distance);\n    }\n\n    &.rmd-tooltip--left {\n      transform: translateX($distance);\n    }\n\n    &.rmd-tooltip--right {\n      transform: translateX($negative-distance);\n    }\n\n    &.rmd-tooltip--visible {\n      transform: none;\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-tooltip { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "react-md-tooltip",
      type: "mixin",
      description:
        "Creates all the styles and theme for the tooltip package.\n",
      file: "@react-md/tooltip/dist/_mixins.scss",
      group: "tooltip",
      see: [],
      links: [],
      code:
        "@mixin react-md-tooltip {\n  @include rmd-theme-create-root-theme($rmd-tooltip-theme-values, tooltip);\n\n  .rmd-tooltip {\n    @include rmd-tooltip;\n  }\n}",
      oneLineCode: "@mixin react-md-tooltip { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default TooltipSassDoc;
