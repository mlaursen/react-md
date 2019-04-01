/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const UtilsSassDoc: PackageSassDoc = {
  name: "utils",
  variables: [
    {
      name: "rmd-utils-ios-scroll-momentum",
      type: "Boolean",
      description:
        "Boolean if scroll momentum should be added by default for iOS. This _can_ probably\nbe removed one day when iOS natively supports scroll momentum on anything except\nthe main document.\n",
      file: "@react-md/utils/dist/_variables.scss",
      group: "utils",
      see: [],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-utils-swappable-positions",
      type: "List",
      description:
        "A list of the supported swappable variables for `rmd-utils-swap-position`.\n",
      file: "@react-md/utils/dist/_variables.scss",
      group: "utils",
      see: [],
      links: [],
      value: "top right bottom left",
      compiledValue: "top right bottom left",
      configurable: false,
    },
    {
      name: "rmd-utils-swappable-position-prefixes",
      type: "List",
      description:
        "A list of the supported swappable variables prefixes for `rmd-utils-swap-position`.\n",
      file: "@react-md/utils/dist/_variables.scss",
      group: "utils",
      see: [],
      links: [],
      value: "border margin padding",
      compiledValue: "border margin padding",
      configurable: false,
    },
    {
      name: "rmd-utils-skip-validation",
      type: "Boolean",
      description:
        "Boolean if the validation for valid themes and other things should occur. It is\nrecommended to keep this enabled, but you might see a build speed perf by setting\nthis to true.\n",
      file: "@react-md/utils/dist/_variables.scss",
      group: "utils",
      see: [],
      links: [],
      value: "false",
      compiledValue: "false",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-utils-swap-position",
      type: "function",
      description:
        "A utility function that can swap the position of different css styles. This is useful for\nRTL switching.\n",
      file: "@react-md/utils/dist/_functions.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@function rmd-utils-swap-position($style: ) {\n  $prefix: '';\n  $position: $style;\n  @each $valid-prefix in $rmd-utils-swappable-position-prefixes {\n    @if str-index($style, '#{$valid-prefix}-') {\n      $prefix: '#{$valid-prefix}-';\n      $position: str-replace($style, $prefix, '');\n    }\n  }\n\n  $current: rmd-utils-validate($rmd-utils-swappable-positions, $position, 'swappable position');\n\n  $next-position: bottom;\n  @if $position == left {\n    $next-position: right;\n  } @else if $position == right {\n    $next-position: left;\n  } @else if $position == bottom {\n    $next-position: top;\n  }\n\n  @return '#{$prefix}#{$next-position}';\n}",
      oneLineCode: "@function rmd-utils-swap-position($style: ) { … }",
      throws: [],
      examples: [],
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
  ],
  mixins: [
    {
      name: "rmd-utils-rtl",
      type: "mixin",
      description:
        'A simple mixin that allows you to update styles when the [dir="rtl"] is present\nfor languages that read right to light. This is mostly used to update spacing with\nmargins or padding and a more "verbose" method of declaring rtl styles.\n\n',
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code: "@mixin rmd-utils-rtl {\n  [dir='rtl'] & {\n    @content;\n  }\n}",
      oneLineCode: "@mixin rmd-utils-rtl { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".my-class {\n  margin-right: 1rem;\n\n  @include rmd-utils-rtl {\n    margin-left: 1rem;\n    margin-right: auto;\n  }\n}",
          description: "Example Usage SCSS",
          compiledCode:
            '.my-class {\n  margin-right: 1rem;\n}\n[dir="rtl"] .my-class {\n  margin-left: 1rem;\n  margin-right: auto;\n}\n',
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-utils-rtl-auto",
      type: "mixin",
      description:
        "This mixin will try to automatically swap the positioning styles for rtl languages.\nIf the swapped style should have something other than `auto` as the new style, that\nstyle should be included in the `$swapped-styles` map with the correct value.\n\n",
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@mixin rmd-utils-rtl-auto($property: , $value: , $swapped-value: null) {\n  $inversed-property: rmd-utils-swap-position($property);\n\n  @include rmd-utils-rtl {\n    @if $swapped-value == null {\n      $swapped-value: auto;\n\n      @each $prefix in $rmd-utils-swappable-position-prefixes {\n        @if str-index($property, '#{$prefix}-') {\n          $swapped-value: 0;\n        }\n      }\n    }\n\n    #{$property}: #{$swapped-value};\n    #{$inversed-property}: #{$value};\n    @content;\n  }\n\n  #{$property}: #{$value};\n}",
      oneLineCode:
        "@mixin rmd-utils-rtl-auto($property: , $value: , $swapped-value: null) { … }",
      throws: [],
      examples: [],
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
            "The value that should be used for the original property\nvalue or the inversed property value when in rtl mode.",
        },
        {
          type: "String|Number",
          name: "swapped-value",
          default: "null",
          description:
            "The value to use when in rtl languages\nfor the original property. When this is set to `null`, `0` will be used for margins\nand padding while `auto` for everything else.",
        },
      ],
    },
    {
      name: "rmd-utils-rtl-auto-group",
      type: "mixin",
      description:
        "This mixin will try to automatically swap the positioning styles for rtl languages.\nIf the swapped style should have something other than `auto` as the new style, that\nstyle should be included in the `$swapped-styles` map with the correct value.\n\n",
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@mixin rmd-utils-rtl-auto-group($styles: , $swapped-styles: ()) {\n  @include rmd-utils-rtl {\n    @each $property, $value in $styles {\n      $inversed-property: rmd-utils-swap-position($property);\n      $inversed-value: auto;\n      @if map-has-key($swapped-styles, $property) {\n        $inversed-value: map-get($swapped-styles, $property);\n      } @else if map-has-key($styles, $inversed-property) {\n        $inversed-value: map-get($swapped-styles, $inversed-property);\n      }\n\n      #{$property}: #{$inversed-value};\n      #{$inversed-property}: #{$value};\n\n      @content;\n    }\n  }\n\n  @each $property, $value in $styles {\n    #{$property}: #{$value};\n  }\n}",
      oneLineCode:
        "@mixin rmd-utils-rtl-auto-group($styles: , $swapped-styles: ()) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "Map",
          name: "styles",
          description:
            "The styles that should be swapped for rtl languages. Right now\n  react-md only supports the `$rmd-utils-swappable-positions`.",
        },
        {
          type: "Map",
          name: "swapped-styles",
          default: "()",
          description:
            "Any optional swapped style overrides that should\n  be applied.",
        },
      ],
    },
    {
      name: "rmd-utils-block-centered",
      type: "mixin",
      description:
        "A very simple mixin that will center an element within the page for you\nwhen you aren't using flexbox or grid for the part of the layout.\n",
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@mixin rmd-utils-block-centered {\n  display: block;\n\n  @if $vertical-margin {\n    margin: $vertical-margin auto;\n  } @else {\n    margin-left: auto;\n    margin-right: auto;\n  }\n}",
      oneLineCode: "@mixin rmd-utils-block-centered { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-utils-absolute-centered",
      type: "mixin",
      description:
        "A very simple mixin that is used to position an element in the center of\nanother element by using some transforms and `position: absolute`. You will\nneed to make sure that the parent element has `position: relative` to work.\n",
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@mixin rmd-utils-absolute-centered {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translateX(-50%) translateY(-50%);\n}",
      oneLineCode: "@mixin rmd-utils-absolute-centered { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-utils-scroll",
      type: "mixin",
      description:
        'An extremely simple util that is used to add scrolling to an element with a "patch" for adding scroll\nmomentum to iOS.\n\n',
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@mixin rmd-utils-scroll($position: null, $type: auto, $enable-momentum: $rmd-utils-ios-scroll-momentum) {\n  $style: overflow;\n  @if $position == 'x' or $position == 'y' {\n    $style: #{$style}-#{$position};\n  }\n\n  #{$style}: $type;\n\n  @if $enable-momentum {\n    // sass-lint:disable no-vendor-prefixes\n    -webkit-overflow-scrolling: touch;\n  }\n}",
      oneLineCode:
        "@mixin rmd-utils-scroll($position: null, $type: auto, $enable-momentum: $rmd-utils-ios-scroll-momentum) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "position",
          default: "null",
          description:
            'This should either be "x", "y", or null. This will just change the style\n    between overflow, overflow-x, and overflow-y.',
        },
        {
          type: "String",
          name: "type",
          default: "auto",
          description:
            "The scroll type to apply. It is recommended to use the default of `auto` in\n    most cases, but it can be set to something else.",
        },
        {
          type: "Boolean",
          name: "enable-momentum",
          default: "$rmd-utils-ios-scroll-momentum",
          description: 'Boolean if iOS scroll momentum should be "patched".',
        },
      ],
    },
    {
      name: "rmd-utils-hide-focus-outline",
      type: "mixin",
      description:
        "A helper mixin that will hide the outline style when a user focuses any element / on the page. All this really does\nis create an `outline-style: none` when the element is focused.\n\n",
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@mixin rmd-utils-hide-focus-outline($fix-moz-focus: true) {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\n  &:focus {\n    outline-style: none;\n  }\n\n  @if $fix-moz-focus {\n    &::-moz-focus-inner {\n      border: 0;\n    }\n  }\n}",
      oneLineCode:
        "@mixin rmd-utils-hide-focus-outline($fix-moz-focus: true) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "Boolean",
          name: "fix-moz-focus",
          default: "true",
          description:
            "Boolean if the Firefox focus inner styles should also\n    be removed.",
        },
      ],
    },
    {
      name: "rmd-utils-base",
      type: "mixin",
      description:
        "This is a small utility function that helps set up your react-md app.\n\nThis will:\n- update the `box-sizing` to be `border-box` (helpful for calculation positions and sizing)\n- remove the margin and padding from the `html` and `body`\n- apply the base background color and text colors to the `html` tag if the `@react-md/theme` package\n  has been correctly included\n- apply the base typography to the `html` element if the `@react-md/typography` package\n  has been correctly included\n",
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@mixin rmd-utils-base {\n  *,\n  *::before,\n  *::after {\n    // setting everything to border-box for easier positioning\n    // and calculations\n    box-sizing: border-box;\n  }\n\n  html,\n  body {\n    margin: 0;\n    padding: 0;\n  }\n\n  html {\n    @if mixin-exists(rmd-theme) {\n      @include rmd-theme(background-color, background);\n      @include rmd-theme(color, text-primary-on-background);\n    }\n\n    @if mixin-exists(rmd-typography-base) {\n      @include rmd-typography-base;\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-utils-base { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "react-md-utils",
      type: "mixin",
      description:
        "This mixin will include the styles for all packages that have been\nimported in your scss files. If there are missing styles, you need\nto make sure to correctly import that package before calling this\nfunction.\n",
      file: "@react-md/utils/dist/_mixins.scss",
      group: "utils",
      see: [],
      links: [],
      code:
        "@mixin react-md-utils {\n  @if mixin-exists(react-md-avatar) {\n    @include react-md-avatar;\n  }\n\n  @if mixin-exists(react-md-button) {\n    @include react-md-button;\n  }\n\n  // has to come after buttons\n  @if mixin-exists(react-md-app-bar) {\n    @include react-md-app-bar;\n  }\n\n  @if mixin-exists(react-md-divider) {\n    @include react-md-divider;\n  }\n\n  @if mixin-exists(react-md-icon) {\n    @include react-md-icon;\n  }\n\n  @if mixin-exists(react-md-link) {\n    @include react-md-link;\n  }\n\n  @if mixin-exists(react-md-list) {\n    @include react-md-list;\n  }\n\n  @if mixin-exists(react-md-media) {\n    @include react-md-media;\n  }\n\n  @if mixin-exists(react-md-overlay) {\n    @include react-md-overlay;\n  }\n\n  @if mixin-exists(react-md-progress) {\n    @include react-md-progress;\n  }\n\n  @if mixin-exists(react-md-sheet) {\n    @include react-md-sheet;\n  }\n\n  @if mixin-exists(react-md-states) {\n    @include react-md-states;\n  }\n\n  @if mixin-exists(react-md-theme) {\n    @include react-md-theme;\n  }\n\n  @if mixin-exists(react-md-tooltip) {\n    @include react-md-tooltip;\n  }\n\n  @if mixin-exists(react-md-transition) {\n    @include react-md-transition;\n  }\n\n  @if mixin-exists(react-md-tree) {\n    @include react-md-tree;\n  }\n\n  @if mixin-exists(react-md-typography) {\n    @include react-md-typography;\n  }\n\n  @include rmd-utils-base;\n}",
      oneLineCode: "@mixin react-md-utils { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default UtilsSassDoc;
