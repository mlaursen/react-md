/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-utils-swap-position": {
      name: "rmd-utils-swap-position",
      description:
        "A utility function that can swap the position of different css styles. This is useful for RTL switching.\n",
      source: "packages/utils/src/_functions.scss#L65-L87",
      usedBy: [
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
        {
          name: "rmd-utils-rtl-auto-group",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      code: "@function rmd-utils-swap-position($style) { … }",
      sourceCode:
        '@function rmd-utils-swap-position($style) {\n  $prefix: "";\n  $position: $style;\n  @each $valid-prefix in $rmd-utils-swappable-position-prefixes {\n    @if str-index($style, "#{$valid-prefix}-") {\n      $prefix: "#{$valid-prefix}-";\n      $position: str-replace($style, $prefix, "");\n    }\n  }\n\n  $current: rmd-utils-validate(\n    $rmd-utils-swappable-positions,\n    $position,\n    "swappable position"\n  );\n\n  $next-position: bottom;\n  @if $position == left {\n    $next-position: right;\n  } @else if $position == right {\n    $next-position: left;\n  } @else if $position == bottom {\n    $next-position: top;\n  }\n\n  @return "#{$prefix}#{$next-position}";\n}\n',
      type: "function",
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "The style to swap. This should be one of `$rmd-utils-swappable-positions`.",
        },
      ],
      returns: {
        type: "String",
        description: "a swapped style attribute string.",
      },
    },
    "rmd-utils-negate-var": {
      name: "rmd-utils-negate-var",
      description:
        "This function can be used to negate the value of a css variable. It just really wraps the variable with `calc(-1 * #{$variable})`.",
      source: "packages/utils/src/_functions.scss#L94-L96",
      usedBy: [{ name: "rmd-tooltip", type: "mixin", packageName: "tooltip" }],
      packageName: "utils",
      code: "@function rmd-utils-negate-var($css-variable) { … }",
      sourceCode:
        "@function rmd-utils-negate-var($css-variable) {\n  @return calc(-1 * #{$css-variable});\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "css-variable",
          description: "The css variable string to negate.",
        },
      ],
      returns: {
        type: "String",
        description: "a calc string that negates a css variable.",
      },
    },
  },
  mixins: {
    "rmd-utils-map-to-styles": {
      name: "rmd-utils-map-to-styles",
      description:
        "This is a simple mixin that will create styles from a Map of properties with values.",
      source: "packages/utils/src/_mixins.scss#L13-L19",
      usedBy: [
        { name: "rmd-tree-item", type: "mixin", packageName: "tree" },
        {
          name: "rmd-utils-rtl-auto-group",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      code: "@mixin rmd-utils-map-to-styles($style-map) { … }",
      sourceCode:
        "@mixin rmd-utils-map-to-styles($style-map) {\n  @if $style-map {\n    @each $property, $value in $style-map {\n      #{$property}: #{$value};\n    }\n  }\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "Map",
          name: "style-map",
          description:
            "The map of styles that should be applied. If this is `null`, no styles will be generated.",
        },
      ],
    },
    "rmd-utils-rtl": {
      name: "rmd-utils-rtl",
      description:
        'A simple mixin that allows you to update styles when the [dir="rtl"] is present for languages that read right to light. This is mostly used to update spacing with margins or padding and a more "verbose" method of declaring rtl styles.',
      source: "packages/utils/src/_mixins.scss#L36-L42",
      packageName: "utils",
      examples: [
        {
          code:
            ".my-class {\n  margin-right: 1rem;\n\n  @include rmd-utils-rtl {\n    margin-left: 1rem;\n    margin-right: auto;\n  }\n}\n",
          compiled:
            '.my-class {\n  margin-right: 1rem;\n}\n[dir="rtl"] .my-class {\n  margin-left: 1rem;\n  margin-right: auto;\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-utils-rtl { … }",
      sourceCode:
        '@mixin rmd-utils-rtl {\n  @if $rmd-utils-enable-rtl {\n    [dir="rtl"] & {\n      @content;\n    }\n  }\n}\n',
      type: "mixin",
    },
    "rmd-utils-rtl-auto": {
      name: "rmd-utils-rtl-auto",
      description:
        "This mixin will try to automatically swap the positioning styles for rtl languages.  If the swapped style should have something other than `auto` as the new style, that style should be included in the `$swapped-styles` map with the correct value.",
      source: "packages/utils/src/_mixins.scss#L56-L76",
      usedBy: [
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "rmd-app-bar-title", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-action-position",
          type: "mixin",
          packageName: "app-bar",
        },
        { name: "rmd-icon-text-spacing", type: "mixin", packageName: "icon" },
        { name: "rmd-tree-item-at-depth", type: "mixin", packageName: "tree" },
      ],
      packageName: "utils",
      code:
        "@mixin rmd-utils-rtl-auto($property, $value, $swapped-value: null) { … }",
      sourceCode:
        '@mixin rmd-utils-rtl-auto($property, $value, $swapped-value: null) {\n  $inversed-property: rmd-utils-swap-position($property);\n\n  @include rmd-utils-rtl {\n    @if $swapped-value == null {\n      $swapped-value: auto;\n\n      @each $prefix in $rmd-utils-swappable-position-prefixes {\n        @if str-index($property, "#{$prefix}-") {\n          $swapped-value: 0;\n        }\n      }\n    }\n\n    #{$property}: #{$swapped-value};\n    #{$inversed-property}: #{$value};\n    @content;\n  }\n\n  #{$property}: #{$value};\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property that should be reversed for rtl languages.",
        },
        {
          type: "String|Number",
          name: "value",
          description:
            "The value that should be used for the original property value or the inversed property value when in rtl mode.",
        },
        {
          type: "String|Number",
          name: "swapped-value",
          default: "null",
          description:
            "The value to use when in rtl languages for the original property. When this is set to `null`, `0` will be used for margins and padding while `auto` for everything else.",
        },
      ],
    },
    "rmd-utils-rtl-auto-group": {
      name: "rmd-utils-rtl-auto-group",
      description:
        "This mixin will try to automatically swap the positioning styles for rtl languages.  If the swapped style should have something other than `auto` as the new style, that style should be included in the `$swapped-styles` map with the correct value.",
      source: "packages/utils/src/_mixins.scss#L87-L105",
      usedBy: [
        { name: "rmd-app-bar-nav", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "utils",
      code:
        "@mixin rmd-utils-rtl-auto-group($styles, $swapped-styles: ()) { … }",
      sourceCode:
        "@mixin rmd-utils-rtl-auto-group($styles, $swapped-styles: ()) {\n  @include rmd-utils-map-to-styles($styles);\n  @include rmd-utils-rtl {\n    @each $property, $value in $styles {\n      $inversed-property: rmd-utils-swap-position($property);\n      $inversed-value: auto;\n      @if map-has-key($swapped-styles, $property) {\n        $inversed-value: map-get($swapped-styles, $property);\n      } @else if map-has-key($styles, $inversed-property) {\n        $inversed-value: map-get($swapped-styles, $inversed-property);\n      }\n\n      #{$property}: #{$inversed-value};\n      #{$inversed-property}: #{$value};\n\n      @content;\n    }\n  }\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "Map",
          name: "styles",
          description:
            "The styles that should be swapped for rtl languages.\nRight now react-md only supports the `$rmd-utils-swappable-positions`.",
        },
        {
          type: "Map",
          name: "swapped-styles",
          default: "()",
          description:
            "Any optional swapped style overrides that should be applied.",
        },
      ],
    },
    "rmd-utils-block-centered": {
      name: "rmd-utils-block-centered",
      description:
        "A very simple mixin that will center an element within the page for you when you aren't using flexbox or grid for the part of the layout.\n",
      source: "packages/utils/src/_mixins.scss#L109-L118",
      packageName: "utils",
      code: "@mixin rmd-utils-block-centered { … }",
      sourceCode:
        "@mixin rmd-utils-block-centered {\n  display: block;\n\n  @if $vertical-margin {\n    margin: $vertical-margin auto;\n  } @else {\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-absolute-centered": {
      name: "rmd-utils-absolute-centered",
      description:
        "A very simple mixin that is used to position an element in the center of another element by using some transforms and `position: absolute`. You will need to make sure that the parent element has `position: relative` to work.\n",
      source: "packages/utils/src/_mixins.scss#L123-L128",
      packageName: "utils",
      code: "@mixin rmd-utils-absolute-centered { … }",
      sourceCode:
        "@mixin rmd-utils-absolute-centered {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translateX(-50%) translateY(-50%);\n}\n",
      type: "mixin",
    },
    "rmd-utils-scroll": {
      name: "rmd-utils-scroll",
      description:
        'An extremely simple util that is used to add scrolling to an element with a\n"patch" for adding scroll momentum to iOS.',
      source: "packages/utils/src/_mixins.scss#L141-L157",
      usedBy: [
        { name: "rmd-sheet", type: "mixin", packageName: "sheet" },
        { name: "react-md-table", type: "mixin", packageName: "table" },
        { name: "rmd-tree", type: "mixin", packageName: "tree" },
      ],
      packageName: "utils",
      code:
        "@mixin rmd-utils-scroll($position: null, $type: auto, $enable-momentum: $rmd-utils-ios-scroll-momentum) { … }",
      sourceCode:
        '@mixin rmd-utils-scroll(\n  $position: null,\n  $type: auto,\n  $enable-momentum: $rmd-utils-ios-scroll-momentum\n) {\n  $style: overflow;\n  @if $position == "x" or $position == "y" {\n    $style: #{$style}-#{$position};\n  }\n\n  #{$style}: $type;\n\n  @if $enable-momentum {\n    // sass-lint:disable no-vendor-prefixes\n    -webkit-overflow-scrolling: touch;\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "position",
          default: "null",
          description:
            'This should either be "x", "y", or null.\nThis will just change the style between overflow, overflow-x, and overflow-y.',
        },
        {
          type: "String",
          name: "type",
          default: "auto",
          description:
            "The scroll type to apply. It is recommended to use the default of `auto` in most cases, but it can be set to something else.",
        },
        {
          type: "Boolean",
          name: "enable-momentum",
          default: "$rmd-utils-ios-scroll-momentum",
          description: 'Boolean if iOS scroll momentum should be "patched".',
        },
      ],
    },
    "rmd-utils-hide-focus-outline": {
      name: "rmd-utils-hide-focus-outline",
      description:
        "A helper mixin that will hide the outline style when a user focuses any element / on the page. All this really does is create an `outline-style:\nnone` when the element is focused.",
      source: "packages/utils/src/_mixins.scss#L165-L177",
      usedBy: [
        { name: "rmd-app-bar-title", type: "mixin", packageName: "app-bar" },
        { name: "rmd-button-reset", type: "mixin", packageName: "button" },
        { name: "rmd-button-base", type: "mixin", packageName: "button" },
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        { name: "rmd-text-field-base", type: "mixin", packageName: "form" },
        { name: "rmd-layout-main", type: "mixin", packageName: "layout" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-overlay", type: "mixin", packageName: "overlay" },
        { name: "rmd-states-surface", type: "mixin", packageName: "states" },
        { name: "rmd-tree", type: "mixin", packageName: "tree" },
        { name: "rmd-tree-item", type: "mixin", packageName: "tree" },
      ],
      packageName: "utils",
      code:
        "@mixin rmd-utils-hide-focus-outline($fix-moz-focus: $rmd-utils-fox-moz-focus) { … }",
      sourceCode:
        "@mixin rmd-utils-hide-focus-outline($fix-moz-focus: $rmd-utils-fox-moz-focus) {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\n  &:focus {\n    outline-style: none;\n  }\n\n  @if $fix-moz-focus {\n    &::-moz-focus-inner {\n      border: 0;\n    }\n  }\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "Boolean",
          name: "fix-moz-focus",
          default: "$rmd-utils-fox-moz-focus",
          description:
            "Boolean if the Firefox focus inner styles should also be removed.",
        },
      ],
    },
    "rmd-utils-full-screen": {
      name: "rmd-utils-full-screen",
      description:
        "An extremely simple mixin that will allow any element to be fixed to the entire viewport size.\n",
      source: "packages/utils/src/_mixins.scss#L183-L189",
      usedBy: [
        { name: "rmd-overlay", type: "mixin", packageName: "overlay" },
        {
          name: "rmd-utils-pseudo-element",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      code: "@mixin rmd-utils-full-screen($position: fixed) { … }",
      sourceCode:
        "@mixin rmd-utils-full-screen($position: fixed) {\n  bottom: 0;\n  left: 0;\n  position: $position;\n  right: 0;\n  top: 0;\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "position",
          default: "fixed",
          description:
            "The positioning that should be applied.\nThis should be one of the values for the `position` attribute.",
        },
      ],
    },
    "rmd-utils-pseudo-element": {
      name: "rmd-utils-pseudo-element",
      description:
        "Creates the styles to apply to a pseudo element (`::before` or `::after`) so that it spans the entire size of the container element. This is really useful for focus effects or other interaction states. This relies on the parent to have `position: relative;` to work.",
      source: "packages/utils/src/_mixins.scss#L197-L204",
      usedBy: [
        {
          name: "rmd-states-surface-base",
          type: "mixin",
          packageName: "states",
        },
        {
          name: "rmd-states-focus-shadow",
          type: "mixin",
          packageName: "states",
        },
      ],
      packageName: "utils",
      code: "@mixin rmd-utils-pseudo-element($z-index: 0) { … }",
      sourceCode:
        '@mixin rmd-utils-pseudo-element($z-index: 0) {\n  @include rmd-utils-full-screen(absolute);\n\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n  z-index: $z-index;\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "Number",
          name: "z-index",
          default: "0",
          description: "The z-index to use.",
        },
      ],
    },
    "rmd-utils-sr-only": {
      name: "rmd-utils-sr-only",
      description:
        "Creates styles so that an element is visible only for screen readers.",
      source: "packages/utils/src/_mixins.scss#L232-L253",
      links: [
        {
          name: "",
          href:
            "https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034",
        },
      ],
      usedBy: [
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "utils",
      code:
        "@mixin rmd-utils-sr-only($focusable: false, $focus-suffix: '&--focusable') { … }",
      sourceCode:
        '@mixin rmd-utils-sr-only($focusable: false, $focus-suffix: "&--focusable") {\n  border: 0;\n  clip: rect(1px, 1px, 1px, 1px);\n  clip-path: inset(50%);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n\n  @if $focusable {\n    @if not $focus-suffix {\n      @include rmd-utils-sr-only-focusable;\n    } @else {\n      #{$focus-suffix} {\n        @include rmd-utils-sr-only-focusable;\n      }\n    }\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "Boolean",
          name: "focusable",
          default: "false",
          description:
            "Boolean if the element should still be focusable and then be visible when focused.",
        },
        {
          type: "String",
          name: "focus-suffix",
          default: "'&--focusable'",
          description:
            "The suffix to use for an element that can be focusable. This will be used alongside `&:active` and `&:focus`. If this value is set to `null`, no prefix will be provided and just the `&:active` and `&:focus` selectors will be used instead. These styles will only be generated if the `focusable` parameter is `true`.",
        },
      ],
    },
    "rmd-utils-hide-scrollbar": {
      name: "rmd-utils-hide-scrollbar",
      description:
        "This mixin will hide the scrollbar for an element but still allow scrolling by using the scrollbar-width property along with the -webkit-scrollbar pseudo selector.  If on a non-MacOS and the horizontal scrollbars were hidden, the user can still scroll by holding shift while scrolling.\n\nNote: This only works due to the limited browser support of this library. If you need to support older browsers, don't use this.\n",
      source: "packages/utils/src/_mixins.scss#L263-L270",
      links: [{ name: "", href: "https://caniuse.com/#feat=css-scrollbar" }],
      packageName: "utils",
      code: "@mixin rmd-utils-hide-scrollbar { … }",
      sourceCode:
        "@mixin rmd-utils-hide-scrollbar {\n  scrollbar-width: none;\n\n  &::-webkit-scrollbar {\n    height: 0;\n    width: 0;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-phone-media": {
      name: "rmd-utils-phone-media",
      description:
        "Creates a media query so that only phones will be targeted with the styles.\nThis media query **will stop** at the phone's max width instead of being a `min-width` query since it would be better to just apply the phone styles as a base and use the tablet or desktop min-width queries for additional overrides.\n",
      source: "packages/utils/src/_mixins.scss#L277-L281",
      packageName: "utils",
      code: "@mixin rmd-utils-phone-media { … }",
      sourceCode:
        "@mixin rmd-utils-phone-media {\n  @media screen and (max-width: #{$rmd-utils-phone-max-width}) {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-tablet-media": {
      name: "rmd-utils-tablet-media",
      description:
        "Creates a media query so devices targeted at the min-width of a tablet and above will gain these styles.\n",
      source: "packages/utils/src/_mixins.scss#L285-L289",
      packageName: "utils",
      code: "@mixin rmd-utils-tablet-media { … }",
      sourceCode:
        "@mixin rmd-utils-tablet-media {\n  @media screen and (min-width: #{$rmd-utils-tablet-min-width}) {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-tablet-only-media": {
      name: "rmd-utils-tablet-only-media",
      description:
        "Creates a media query so that screen sizes between the min and max width of a tablet will only gain these styles.\n",
      source: "packages/utils/src/_mixins.scss#L293-L297",
      packageName: "utils",
      code: "@mixin rmd-utils-tablet-only-media { … }",
      sourceCode:
        "@mixin rmd-utils-tablet-only-media {\n  @media screen and (min-width: #{$rmd-utils-tablet-min-width}) and (max-width: #{$rmd-utils-tablet-max-width}) {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-desktop-media": {
      name: "rmd-utils-desktop-media",
      description:
        "Creates a media query so that screen sizes matching at least the min width for a desktop will gain these styles.\n",
      source: "packages/utils/src/_mixins.scss#L301-L305",
      packageName: "utils",
      code: "@mixin rmd-utils-desktop-media { … }",
      sourceCode:
        "@mixin rmd-utils-desktop-media {\n  @media screen and (min-width: #{$rmd-utils-desktop-min-width}) {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-large-desktop-media": {
      name: "rmd-utils-large-desktop-media",
      description:
        "Creates a media query so that screen sizes matching at least the min width for a large desktop will gain these styles.\n",
      source: "packages/utils/src/_mixins.scss#L309-L313",
      packageName: "utils",
      code: "@mixin rmd-utils-large-desktop-media { … }",
      sourceCode:
        "@mixin rmd-utils-large-desktop-media {\n  @media screen and (min-width: #{$rmd-utils-large-desktop-min-width}) {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-touch-only": {
      name: "rmd-utils-touch-only",
      description:
        "This mixin allows you to add styles to an element only when the user is interacting with your app on a touch device.\n",
      source: "packages/utils/src/_mixins.scss#L317-L321",
      packageName: "utils",
      code: "@mixin rmd-utils-touch-only { … }",
      sourceCode:
        "@mixin rmd-utils-touch-only {\n  .rmd-utils--touch & {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-keyboard-only": {
      name: "rmd-utils-keyboard-only",
      description:
        "This mixin allows you to add styles to an element only when the user is interacting with your app with a keyboard.\n",
      source: "packages/utils/src/_mixins.scss#L325-L329",
      packageName: "utils",
      code: "@mixin rmd-utils-keyboard-only { … }",
      sourceCode:
        "@mixin rmd-utils-keyboard-only {\n  .rmd-utils--keyboard & {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-mouse-only": {
      name: "rmd-utils-mouse-only",
      description:
        "This mixin allows you to add styles to an element only when the user is interacting with your app with a mouse.\n",
      source: "packages/utils/src/_mixins.scss#L333-L337",
      packageName: "utils",
      code: "@mixin rmd-utils-mouse-only { … }",
      sourceCode:
        "@mixin rmd-utils-mouse-only {\n  .rmd-utils--mouse & {\n    @content;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-grid": {
      name: "rmd-grid",
      description:
        "Generates a new grid based on the provided padding, margin, and columns.",
      source: "packages/utils/src/_mixins.scss#L360-L397",
      packageName: "utils",
      code:
        "@mixin rmd-grid($padding: $rmd-grid-padding, $gutter: $rmd-grid-cell-margin, $phone-columns: $rmd-grid-phone-columns, $tablet-columns: $rmd-grid-tablet-columns, $desktop-columns: $rmd-grid-desktop-columns, $large-desktop-columns: $rmd-grid-large-desktop-columns) { … }",
      sourceCode:
        "@mixin rmd-grid(\n  $padding: $rmd-grid-padding,\n  $gutter: $rmd-grid-cell-margin,\n  $phone-columns: $rmd-grid-phone-columns,\n  $tablet-columns: $rmd-grid-tablet-columns,\n  $desktop-columns: $rmd-grid-desktop-columns,\n  $large-desktop-columns: $rmd-grid-large-desktop-columns\n) {\n  @if $tablet-columns > $phone-columns {\n    @include rmd-utils-tablet-media {\n      #{$rmd-grid-columns-var}: #{$tablet-columns};\n    }\n  }\n\n  @if $desktop-columns > $tablet-columns {\n    @include rmd-utils-desktop-media {\n      #{$rmd-grid-columns-var}: #{$desktop-columns};\n    }\n  }\n\n  @if $large-desktop-columns > $desktop-columns {\n    @include rmd-utils-large-desktop-media {\n      #{$rmd-grid-columns-var}: #{$large-desktop-columns};\n    }\n  }\n\n  display: grid;\n  grid-column-gap: var(#{$rmd-grid-gutter-var}, #{$gutter});\n  grid-row-gap: var(#{$rmd-grid-gutter-var}, #{$gutter});\n  grid-template-columns: repeat(\n    var(#{$rmd-grid-columns-var}, #{$phone-columns}),\n    1fr\n  );\n  padding: $padding;\n\n  > * {\n    // this allows the children to shrink if needed so that they don't overflow\n    // the entire grid\n    min-width: 0;\n  }\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "Number",
          name: "padding",
          default: "$rmd-grid-padding",
          description:
            "The amount of padding to apply to the base grid element.",
        },
        {
          type: "Number",
          name: "gutter",
          default: "$rmd-grid-cell-margin",
          description:
            "The amount of margin to apply between each cell within the grid. Unlike flex grids, this will only be applied between cells instead of to the `top`, `right`, `bottom`, and `left` of each cell so this should _normally_ be doubled compared to the flex grids.",
        },
        {
          type: "Number",
          name: "phone-columns",
          default: "$rmd-grid-phone-columns",
          description:
            "The number of columns that should appear per-row on phones.",
        },
        {
          type: "Number",
          name: "tablet-columns",
          default: "$rmd-grid-tablet-columns",
          description:
            "The number of columns that should appear per-row on tablets. If this is not greater than the `$phone-columns` parameter, it will not be used.",
        },
        {
          type: "Number",
          name: "desktop-columns",
          default: "$rmd-grid-desktop-columns",
          description:
            "The number of columns that should appear per-row on desktop screens. If this is not greater than the `$tablet-columns` parameter, it will not be used.",
        },
        {
          type: "Number",
          name: "large-desktop-columns",
          default: "$rmd-grid-large-desktop-columns",
          description:
            "The number of columns that should appear per-row on large desktop screens. If this is not greater than the `$tablet-columns` parameter, it will not be used.",
        },
      ],
    },
    "rmd-grid-cell-full": {
      name: "rmd-grid-cell-full",
      description:
        "This mixin is just a nice way to quickly make a cell span the entire width of the grid.\n\nNote: if you set the number of columns for phone or tablet to `1`, you'll need to also wrap this in the `@include rmd-utils-tablet-media` or `@include rmd-utils-desktop-media` mixins respectively.\n",
      source: "packages/utils/src/_mixins.scss#L405-L407",
      packageName: "utils",
      code: "@mixin rmd-grid-cell-full { … }",
      sourceCode:
        "@mixin rmd-grid-cell-full {\n  grid-column: 1 / span var(#{$rmd-grid-columns-var}, $rmd-grid-phone-columns);\n}\n",
      type: "mixin",
    },
    "rmd-grid-cell-size": {
      name: "rmd-grid-cell-size",
      description:
        "A mixin that allows you to override the size of a cell within the `Grid` component manually.  This is useful if you want to specify sizing without using the `GridCell` component wrapper.",
      source: "packages/utils/src/_mixins.scss#L424-L451",
      packageName: "utils",
      code:
        "@mixin rmd-grid-cell-size($size, $phone-columns: $rmd-grid-phone-columns, $tablet-columns: $rmd-grid-tablet-columns, $desktop-columns: $rmd-grid-desktop-columns) { … }",
      sourceCode:
        "@mixin rmd-grid-cell-size(\n  $size,\n  $phone-columns: $rmd-grid-phone-columns,\n  $tablet-columns: $rmd-grid-tablet-columns,\n  $desktop-columns: $rmd-grid-desktop-columns\n) {\n  @if $size >= $desktop-columns {\n    @include rmd-utils-desktop-media {\n      // I'll need to make a desktop-only media if people actually define more columns for\n      // large desktops\n      @include rmd-grid-cell-full;\n    }\n  }\n\n  @if $size >= $tablet-columns {\n    @include rmd-utils-tablet-only-media {\n      @include rmd-grid-cell-full;\n    }\n  }\n\n  @if $size >= $phone-columns {\n    @include rmd-utils-phone-media {\n      @include rmd-grid-cell-full;\n    }\n  }\n\n  grid-column-end: span $size;\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "Number",
          name: "size",
          description:
            "The number of columns the element should span. This should normally be a number greater than 1 since using 1 is the default cell size.",
        },
        {
          type: "Number",
          name: "phone-columns",
          default: "$rmd-grid-phone-columns",
          description:
            "The number of columns that should appear per-row on phones.",
        },
        {
          type: "Number",
          name: "tablet-columns",
          default: "$rmd-grid-tablet-columns",
          description:
            "The number of columns that should appear per-row on tablets. If this is not greater than the `$phone-columns` parameter, it will not be used.",
        },
        {
          type: "Number",
          name: "desktop-columns",
          default: "$rmd-grid-desktop-columns",
          description:
            "The number of columns that should appear per-row on desktop screens. If this is not greater than the `$tablet-columns` parameter, it will not be used.",
        },
      ],
    },
    "rmd-grid-list-cell-size": {
      name: "rmd-grid-list-cell-size",
      description:
        "A simple mixin that will allow you to add the current grid list cell size to any property.",
      source: "packages/utils/src/_mixins.scss#L475-L486",
      usedBy: [
        { name: "rmd-grid-list-cell", type: "mixin", packageName: "utils" },
      ],
      packageName: "utils",
      code:
        "@mixin rmd-grid-list-cell-size($property, $max-size: $rmd-grid-list-cell-max-size, $margin: $rmd-grid-list-cell-margin) { … }",
      sourceCode:
        "@mixin rmd-grid-list-cell-size(\n  $property,\n  $max-size: $rmd-grid-list-cell-max-size,\n  $margin: $rmd-grid-list-cell-margin\n) {\n  $size: var(#{$rmd-grid-cell-size-var}, #{$max-size});\n  @if $margin and $margin > 0 {\n    $size: calc(\n      #{$size} - calc(var(#{$rmd-grid-cell-margin-var}, #{$margin}) * 2)\n    );\n  }\n\n  #{$property}: $size;\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description: "The css property to apply the size to.",
        },
        {
          type: "Number",
          name: "max-size",
          default: "$rmd-grid-list-cell-max-size",
          description:
            "The max size that each cell can be. This is really just a fallback value if the `--rmd-cell-size` hasn't been defined yet by the `GridList` component.",
        },
        {
          type: "Number",
          name: "margin",
          default: "$rmd-grid-list-cell-margin",
          description:
            "The amount of margin that should be placed between each cell. This will be used with the current `--rmd-cell-size` to calculate the correct height and width. This value\n**will be multiplied by 2 in the calculation**.",
        },
      ],
    },
    "rmd-grid-list-cell": {
      name: "rmd-grid-list-cell",
      description:
        "Adds the current grid list cell's size to any element if you don't want to use the `GridListCell` component for sizing. This will **always** apply the `margin` and `width`, but the `height` can be opted-out if desired.",
      source: "packages/utils/src/_mixins.scss#L500-L511",
      packageName: "utils",
      code:
        "@mixin rmd-grid-list-cell($margin: $rmd-grid-list-cell-margin, $max-size: $rmd-grid-list-cell-max-size, $include-height: true) { … }",
      sourceCode:
        "@mixin rmd-grid-list-cell(\n  $margin: $rmd-grid-list-cell-margin,\n  $max-size: $rmd-grid-list-cell-max-size,\n  $include-height: true\n) {\n  @if $include-height {\n    @include rmd-grid-list-cell-size(height, $max-size, $margin);\n  }\n  @include rmd-grid-list-cell-size(width, $max-size, $margin);\n\n  margin: var(#{$rmd-grid-cell-margin-var}, #{$margin});\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "Number",
          name: "margin",
          default: "$rmd-grid-list-cell-margin",
          description:
            "The amount of margin to apply to each cell for top, right, bottom and left.",
        },
        {
          type: "Number",
          name: "max-size",
          default: "$rmd-grid-list-cell-max-size",
          description:
            "The max size that each cell can be. This is really just a fallback if the `GridList` component hasn't set the `--rmd-cell-size` variable yet.",
        },
        {
          type: "Boolean",
          name: "include-height",
          default: "true",
          description:
            "Boolean if the cell's height should be restricted to the current cell size as well so it can be perfectly square.",
        },
      ],
    },
    "rmd-utils-base": {
      name: "rmd-utils-base",
      description:
        "This is a small utility function that helps set up your react-md app.\n\nThis will:\n- update the `box-sizing` to be `border-box` (helpful for calculation positions and sizing)\n- remove the margin and padding from the `html` and `body`\n- apply the base background color and text colors to the `html` tag if the `@react-md/theme` package\n  has been correctly included\n- apply the base typography to the `html` element if the `@react-md/typography` package\n  has been correctly included\n",
      source: "packages/utils/src/_mixins.scss#L560-L596",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "utils",
      code: "@mixin rmd-utils-base { … }",
      sourceCode:
        "@mixin rmd-utils-base {\n  *,\n  *::before,\n  *::after {\n    // setting everything to border-box for easier positioning\n    // and calculations\n    box-sizing: border-box;\n  }\n\n  html,\n  body {\n    height: 100%;\n    margin: 0;\n    padding: 0;\n  }\n\n  html {\n    @if mixin-exists(rmd-theme) {\n      @include rmd-theme(background-color, background);\n      @include rmd-theme(color, text-primary-on-background);\n    }\n\n    @if mixin-exists(rmd-typography-base) {\n      @include rmd-typography-base;\n    }\n  }\n\n  body {\n    &.rmd-utils--touch {\n      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\n      // this allows for click events to be bubbleable on iOS to the root document. Without this,\n      // all the `onOutsideClick` behavior won't work.\n      cursor: pointer;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-utils-dense": {
      name: "rmd-utils-dense",
      description:
        "This mixin will attempt to apply all the available dense theme mixins that have been imported. This should normally be used within a `:root` selector and a media query.",
      source: "packages/utils/src/_mixins.scss#L608-L632",
      packageName: "utils",
      examples: [
        {
          code:
            ":root {\n  @include rmd-utils-desktop-media {\n    @include rmd-utils-dense;\n  }\n}\n",
          compiled:
            "@media screen and (min-width: 64.0625em) {\n  :root {\n    --rmd-app-bar-height: var(--rmd-app-bar-dense-height, 3rem);\n    --rmd-app-bar-prominent-height: var(\n      --rmd-app-bar-prominent-dense-height,\n      6rem\n    );\n    --rmd-form-toggle-inset: var(--rmd-form-toggle-dense-inset, 0.25rem);\n    --rmd-form-indeterminate-height: var(\n      --rmd-form-indeterminate-dense-height,\n      0.125rem\n    );\n    --rmd-icon-size: var(--rmd-icon-dense-size, 1.25rem);\n    --rmd-list-font-size: var(--rmd-list-dense-font-size, 0.8125rem);\n    --rmd-list-vertical-padding: var(\n      --rmd-list-dense-vertical-padding,\n      0.25rem\n    );\n    --rmd-list-horizontal-padding: var(--rmd-list-dense-horizontal-padding, 0);\n    --rmd-list-item-height: var(--rmd-list-dense-item-height, 2.5rem);\n    --rmd-list-item-medium-height: var(\n      --rmd-list-dense-item-medium-height,\n      3rem\n    );\n    --rmd-list-item-large-height: var(\n      --rmd-list-dense-item-large-height,\n      3.5rem\n    );\n    --rmd-list-item-extra-large-height: var(\n      --rmd-list-dense-item-extra-large-height,\n      4rem\n    );\n    --rmd-list-item-three-line-height: var(\n      --rmd-list-dense-item-three-line-height,\n      5rem\n    );\n    --rmd-list-item-secondary-three-line-height: var(\n      --rmd-list-dense-item-secondary-three-line-height,\n      2.25rem\n    );\n    --rmd-tooltip-font-size: var(--rmd-tooltip-dense-font-size, 0.625rem);\n    --rmd-tooltip-line-height: var(--rmd-tooltip-dense-line-height, 0.825rem);\n    --rmd-tooltip-min-height: var(--rmd-tooltip-dense-min-height, 1.375rem);\n    --rmd-tooltip-horizontal-padding: var(\n      --rmd-tooltip-dense-horizontal-padding,\n      0.5rem\n    );\n    --rmd-tooltip-vertical-padding: var(\n      --rmd-tooltip-dense-vertical-padding,\n      0.375rem\n    );\n    --rmd-tooltip-spacing: var(--rmd-tooltip-dense-spacing, 0.875rem);\n  }\n}\n",
          type: "scss",
          description: "Simple Usage",
        },
      ],
      code: "@mixin rmd-utils-dense { … }",
      sourceCode:
        "@mixin rmd-utils-dense {\n  @if mixin-exists(rmd-app-bar-dense-theme) {\n    @include rmd-app-bar-dense-theme;\n  }\n\n  @if mixin-exists(rmd-toggle-dense-theme) {\n    @include rmd-toggle-dense-theme;\n  }\n\n  @if mixin-exists(rmd-icon-dense-theme) {\n    @include rmd-icon-dense-theme;\n  }\n\n  @if mixin-exists(rmd-list-dense-theme) {\n    @include rmd-list-dense-theme;\n  }\n\n  @if mixin-exists(rmd-list-item-dense-theme) {\n    @include rmd-list-item-dense-theme;\n  }\n\n  @if mixin-exists(rmd-tooltip-dense-theme) {\n    @include rmd-tooltip-dense-theme;\n  }\n}\n",
      type: "mixin",
    },
    "react-md-utils": {
      name: "react-md-utils",
      description:
        "This mixin will include the styles for all packages that have been imported in your scss files. If there are missing styles, you need to make sure to correctly import that package before calling this function.\n",
      source: "packages/utils/src/_mixins.scss#L638-L763",
      packageName: "utils",
      code: "@mixin react-md-utils { … }",
      sourceCode:
        "@mixin react-md-utils {\n  @include rmd-utils-base;\n  @include react-md-utils-grid;\n\n  @if mixin-exists(react-md-alert) {\n    @include react-md-alert;\n  }\n\n  @if mixin-exists(react-md-avatar) {\n    @include react-md-avatar;\n  }\n\n  @if mixin-exists(react-md-badge) {\n    @include react-md-badge;\n  }\n\n  @if mixin-exists(react-md-button) {\n    @include react-md-button;\n  }\n\n  // has to come after buttons since it overrides some button styles\n  @if mixin-exists(react-md-app-bar) {\n    @include react-md-app-bar;\n  }\n\n  @if mixin-exists(react-md-overlay) {\n    @include react-md-overlay;\n  }\n\n  // has to come after overlays since it overrides the z-index\n  @if mixin-exists(react-md-dialog) {\n    @include react-md-dialog;\n  }\n\n  @if mixin-exists(react-md-card) {\n    @include react-md-card;\n  }\n\n  @if mixin-exists(react-md-chip) {\n    @include react-md-chip;\n  }\n\n  @if mixin-exists(react-md-divider) {\n    @include react-md-divider;\n  }\n\n  @if mixin-exists(react-md-expansion-panel) {\n    @include react-md-expansion-panel;\n  }\n\n  @if mixin-exists(react-md-form) {\n    @include react-md-form;\n  }\n\n  @if mixin-exists(react-md-icon) {\n    @include react-md-icon;\n  }\n\n  @if mixin-exists(react-md-layout) {\n    @include react-md-layout;\n  }\n\n  @if mixin-exists(react-md-link) {\n    @include react-md-link;\n  }\n\n  @if mixin-exists(react-md-list) {\n    @include react-md-list;\n  }\n\n  @if mixin-exists(react-md-media) {\n    @include react-md-media;\n  }\n\n  @if mixin-exists(react-md-menu) {\n    @include react-md-menu;\n  }\n\n  @if mixin-exists(react-md-progress) {\n    @include react-md-progress;\n  }\n\n  @if mixin-exists(react-md-sheet) {\n    @include react-md-sheet;\n  }\n\n  @if mixin-exists(react-md-states) {\n    @include react-md-states;\n  }\n\n  @if mixin-exists(react-md-table) {\n    @include react-md-table;\n  }\n\n  @if mixin-exists(react-md-tabs) {\n    @include react-md-tabs;\n  }\n\n  @if mixin-exists(react-md-theme) {\n    @include react-md-theme;\n  }\n\n  @if mixin-exists(react-md-tooltip) {\n    @include react-md-tooltip;\n  }\n\n  @if mixin-exists(react-md-transition) {\n    @include react-md-transition;\n  }\n\n  @if mixin-exists(react-md-tree) {\n    @include react-md-tree;\n  }\n\n  @if mixin-exists(react-md-typography) {\n    @include react-md-typography;\n  }\n\n  @if $rmd-utils-auto-dense {\n    :root {\n      @include rmd-utils-desktop-media {\n        @include rmd-utils-dense;\n      }\n    }\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-utils-ios-scroll-momentum": {
      name: "rmd-utils-ios-scroll-momentum",
      description:
        "Boolean if scroll momentum should be added by default for iOS. This _can_ probably be removed one day when iOS natively supports scroll momentum on anything except the main document.\n",
      source: "packages/utils/src/_variables.scss#L9",
      packageName: "utils",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-utils-auto-dense": {
      name: "rmd-utils-auto-dense",
      description:
        'Boolean if the dense spec should automatically be applied based on media queries once the app has reached a "desktop" size.',
      source: "packages/utils/src/_variables.scss#L15",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "utils",
      type: "Boolean",
      value: "false",
      overridable: true,
    },
    "rmd-utils-enable-rtl": {
      name: "rmd-utils-enable-rtl",
      description:
        "Boolean if the rtl fixes should be included by default. You can save a few bytes in your bundle size by disabling this if you don't need to worry about right-to-left languages in your app.",
      source: "packages/utils/src/_variables.scss#L22",
      usedBy: [{ name: "rmd-utils-rtl", type: "mixin", packageName: "utils" }],
      packageName: "utils",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-utils-swappable-positions": {
      name: "rmd-utils-swappable-positions",
      description:
        "A list of the supported swappable variables for `rmd-utils-swap-position`.\n",
      source: "packages/utils/src/_variables.scss#L26",
      usedBy: [
        {
          name: "rmd-utils-swap-position",
          type: "function",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      type: "List",
      value: "top right bottom left",
      overridable: false,
    },
    "rmd-utils-swappable-position-prefixes": {
      name: "rmd-utils-swappable-position-prefixes",
      description:
        "A list of the supported swappable variables prefixes for `rmd-utils-swap-position`.\n",
      source: "packages/utils/src/_variables.scss#L31",
      usedBy: [
        {
          name: "rmd-utils-swap-position",
          type: "function",
          packageName: "utils",
        },
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
      ],
      packageName: "utils",
      type: "List",
      value: "border margin padding",
      overridable: false,
    },
    "rmd-utils-skip-validation": {
      name: "rmd-utils-skip-validation",
      description:
        "Boolean if the validation for valid themes and other things should occur. It is recommended to keep this enabled, but you might see a build speed perf by setting this to true.\n",
      source: "packages/utils/src/_variables.scss#L37",
      packageName: "utils",
      type: "Boolean",
      value: "false",
      overridable: true,
    },
    "rmd-utils-fix-moz-focus": {
      name: "rmd-utils-fix-moz-focus",
      description:
        "Boolean if the moz focusring and inner-focus styles should be removed for the `rmd-utils-hide-focus-outline` mixin by default. This is generally recommended since custom focus styles will be added instead.\n",
      source: "packages/utils/src/_variables.scss#L43",
      packageName: "utils",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-utils-phone-max-width": {
      name: "rmd-utils-phone-max-width",
      description:
        "The max width for a phone when in portrait or landscape mode.\n",
      source: "packages/utils/src/_variables.scss#L47",
      usedBy: [
        { name: "rmd-utils-phone-media", type: "mixin", packageName: "utils" },
      ],
      packageName: "utils",
      type: "Number",
      value: "47.9375em",
      overridable: true,
    },
    "rmd-utils-tablet-min-width": {
      name: "rmd-utils-tablet-min-width",
      description:
        "The min width for a tablet in portrait or landscape mode.\n",
      source: "packages/utils/src/_variables.scss#L51",
      usedBy: [
        { name: "rmd-utils-tablet-media", type: "mixin", packageName: "utils" },
        {
          name: "rmd-utils-tablet-only-media",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      type: "Number",
      value: "48em",
      overridable: true,
    },
    "rmd-utils-tablet-max-width": {
      name: "rmd-utils-tablet-max-width",
      description:
        "The max width for a tablet in portrait or landscape mode.\n",
      source: "packages/utils/src/_variables.scss#L55",
      usedBy: [
        {
          name: "rmd-utils-tablet-only-media",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      type: "Number",
      value: "64em",
      overridable: true,
    },
    "rmd-utils-desktop-min-width": {
      name: "rmd-utils-desktop-min-width",
      description: "The min width for a desktop screen.\n",
      source: "packages/utils/src/_variables.scss#L59",
      usedBy: [
        {
          name: "rmd-utils-desktop-media",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      type: "Number",
      value: "64.0625em",
      overridable: true,
    },
    "rmd-utils-large-desktop-min-width": {
      name: "rmd-utils-large-desktop-min-width",
      description: "The min width for a large desktop screen.\n",
      source: "packages/utils/src/_variables.scss#L63",
      usedBy: [
        {
          name: "rmd-utils-large-desktop-media",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      type: "Number",
      value: "80em",
      overridable: true,
    },
    "rmd-grid-columns-var": {
      name: "rmd-grid-columns-var",
      description:
        "The css variable that is used to track how many columns there are within the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L68",
      usedBy: [
        { name: "rmd-grid", type: "mixin", packageName: "utils" },
        { name: "rmd-grid-cell-full", type: "mixin", packageName: "utils" },
      ],
      packageName: "utils",
      type: "String",
      value: "--rmd-grid-cols",
      overridable: false,
    },
    "rmd-grid-gutter-var": {
      name: "rmd-grid-gutter-var",
      description:
        "The css variable that is used to apply a gutter between each cell in the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L73",
      usedBy: [{ name: "rmd-grid", type: "mixin", packageName: "utils" }],
      packageName: "utils",
      type: "String",
      value: "--rmd-grid-gutter",
      overridable: false,
    },
    "rmd-grid-cell-margin-var": {
      name: "rmd-grid-cell-margin-var",
      description:
        "The css variable that is used to apply margin to cells within the grid components.\n",
      source: "packages/utils/src/_variables.scss#L78",
      usedBy: [
        {
          name: "rmd-grid-list-cell-size",
          type: "mixin",
          packageName: "utils",
        },
        { name: "rmd-grid-list-cell", type: "mixin", packageName: "utils" },
      ],
      packageName: "utils",
      type: "String",
      value: "--rmd-cell-margin",
      overridable: false,
    },
    "rmd-grid-cell-size-var": {
      name: "rmd-grid-cell-size-var",
      description:
        "The css variable that is used to apply size to cells within the `GridList` component.\n",
      source: "packages/utils/src/_variables.scss#L83",
      usedBy: [
        {
          name: "rmd-grid-list-cell-size",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "utils",
      type: "String",
      value: "--rmd-cell-size",
      overridable: false,
    },
    "rmd-grid-padding": {
      name: "rmd-grid-padding",
      description:
        "The default amount of padding to apply to the `Grid` component. This is a bit different than the flex grid since the cells within this grid will not have outer margin.\n",
      source: "packages/utils/src/_variables.scss#L89",
      packageName: "utils",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-grid-cell-margin": {
      name: "rmd-grid-cell-margin",
      description:
        "The default amount of margin to apply between each cell within the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L94",
      packageName: "utils",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-grid-columns": {
      name: "rmd-grid-columns",
      description:
        "The material design grid system is a bit weird and does a 4 -> 8 -> 12 column layout for phone -> tablet -> desktop. This is really nice when your grid only uses even numbers, but the second you add an odd number in there,\nit breaks down and becomes confusing.\n\nThis variable is a quick way to opt-out of this grid system and have a static number of columns for each media type.\n",
      source: "packages/utils/src/_variables.scss#L104",
      packageName: "utils",
      type: "Number",
      value: "null",
      overridable: true,
    },
    "rmd-grid-phone-columns": {
      name: "rmd-grid-phone-columns",
      description:
        "The default number of columns to render on mobile devices in the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L109",
      usedBy: [
        { name: "rmd-grid-cell-full", type: "mixin", packageName: "utils" },
      ],
      packageName: "utils",
      type: "Number",
      value: "if($rmd-grid-columns, $rmd-grid-columns, 4)",
      compiled: "4",
      overridable: true,
    },
    "rmd-grid-tablet-columns": {
      name: "rmd-grid-tablet-columns",
      description:
        "The default number of columns to render on tablet devices in the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L114",
      packageName: "utils",
      type: "Number",
      value: "if($rmd-grid-columns, $rmd-grid-columns, 8)",
      compiled: "8",
      overridable: true,
    },
    "rmd-grid-desktop-columns": {
      name: "rmd-grid-desktop-columns",
      description:
        "The default number of columns to render on desktop screens in the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L119",
      packageName: "utils",
      type: "Number",
      value: "if($rmd-grid-columns, $rmd-grid-columns, 12)",
      compiled: "12",
      overridable: true,
    },
    "rmd-grid-large-desktop-columns": {
      name: "rmd-grid-large-desktop-columns",
      description:
        "The default number of columns to render on large desktop screens in the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L124",
      packageName: "utils",
      type: "Number",
      value: "$rmd-grid-desktop-columns",
      compiled: "12",
      overridable: true,
    },
    "rmd-grid-list-padding": {
      name: "rmd-grid-list-padding",
      description:
        "The default amount of padding to apply to the `GridList` component.\n",
      source: "packages/utils/src/_variables.scss#L128",
      packageName: "utils",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-grid-list-cell-margin": {
      name: "rmd-grid-list-cell-margin",
      description:
        "The default amount of margin to apply to each cell within the `GridList` component.\n",
      source: "packages/utils/src/_variables.scss#L133",
      packageName: "utils",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-grid-list-cell-max-size": {
      name: "rmd-grid-list-cell-max-size",
      description:
        "The default max size that each cell can be within the `GridList` component.\n",
      source: "packages/utils/src/_variables.scss#L137",
      packageName: "utils",
      type: "Number",
      value: "9.375rem",
      overridable: true,
    },
  },
};

export default sassdoc;
