/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-utils-swap-position": {
      name: "rmd-utils-swap-position",
      description:
        "A utility function that can swap the position of different css styles. This is useful for\nRTL switching.\n",
      source: "packages/utils/src/_functions.scss#L64-L86",
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
        "@function rmd-utils-swap-position($style) {\n  $prefix: '';\n  $position: $style;\n  @each $valid-prefix in $rmd-utils-swappable-position-prefixes {\n    @if str-index($style, '#{$valid-prefix}-') {\n      $prefix: '#{$valid-prefix}-';\n      $position: str-replace($style, $prefix, '');\n    }\n  }\n\n  $current: rmd-utils-validate($rmd-utils-swappable-positions, $position, 'swappable position');\n\n  $next-position: bottom;\n  @if $position == left {\n    $next-position: right;\n  } @else if $position == right {\n    $next-position: left;\n  } @else if $position == bottom {\n    $next-position: top;\n  }\n\n  @return '#{$prefix}#{$next-position}';\n}",
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
        "This function can be used to negate the value of a css variable. It just really\nwraps the variable with `cacl(-1 * #{$variable})`.\n\n",
      source: "packages/utils/src/_functions.scss#L93-L95",
      usedBy: [
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
      ],
      packageName: "utils",
      code: "@function rmd-utils-negate-var($css-variable) { … }",
      sourceCode:
        "@function rmd-utils-negate-var($css-variable) {\n  @return calc(-1 * #{$css-variable});\n}",
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
    "rmd-utils-swap-position": {
      name: "rmd-utils-swap-position",
      description:
        "A utility function that can swap the position of different css styles. This is useful for\nRTL switching.\n",
      source: "packages/utils/src/_functions.scss#L64-L86",
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
        "@function rmd-utils-swap-position($style) {\n  $prefix: '';\n  $position: $style;\n  @each $valid-prefix in $rmd-utils-swappable-position-prefixes {\n    @if str-index($style, '#{$valid-prefix}-') {\n      $prefix: '#{$valid-prefix}-';\n      $position: str-replace($style, $prefix, '');\n    }\n  }\n\n  $current: rmd-utils-validate($rmd-utils-swappable-positions, $position, 'swappable position');\n\n  $next-position: bottom;\n  @if $position == left {\n    $next-position: right;\n  } @else if $position == right {\n    $next-position: left;\n  } @else if $position == bottom {\n    $next-position: top;\n  }\n\n  @return '#{$prefix}#{$next-position}';\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "The style to swap. This should be one of `$rmd-utils-swappable-positions`.",
        },
      ],
    },
    "rmd-utils-negate-var": {
      name: "rmd-utils-negate-var",
      description:
        "This function can be used to negate the value of a css variable. It just really\nwraps the variable with `cacl(-1 * #{$variable})`.\n\n",
      source: "packages/utils/src/_functions.scss#L93-L95",
      usedBy: [
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
        { name: "rmd-tooltip", type: "mixin", packageName: "tooltip" },
      ],
      packageName: "utils",
      code: "@function rmd-utils-negate-var($css-variable) { … }",
      sourceCode:
        "@function rmd-utils-negate-var($css-variable) {\n  @return calc(-1 * #{$css-variable});\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "css-variable",
          description: "The css variable string to negate.",
        },
      ],
    },
  },
  variables: {
    "rmd-utils-ios-scroll-momentum": {
      name: "rmd-utils-ios-scroll-momentum",
      description:
        "Boolean if scroll momentum should be added by default for iOS. This _can_ probably\nbe removed one day when iOS natively supports scroll momentum on anything except\nthe main document.\n",
      source: "packages/utils/src/_variables.scss#L9",
      packageName: "utils",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-utils-auto-dense": {
      name: "rmd-utils-auto-dense",
      description:
        'Boolean if the dense spec should automatically be applied based on media queries\nonce the app has reached a "desktop" size.\n\n',
      source: "packages/utils/src/_variables.scss#L15",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "utils",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-utils-enable-rtl": {
      name: "rmd-utils-enable-rtl",
      description:
        "Boolean if the rtl fixes should be included by default. You can save a few bytes\nin your bundle size by disabling this if you don't need to worry about right-to-left\nlanguages in your app.\n\n",
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
      source: "packages/utils/src/_variables.scss#L30",
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
        "Boolean if the validation for valid themes and other things should occur. It is\nrecommended to keep this enabled, but you might see a build speed perf by setting\nthis to true.\n",
      source: "packages/utils/src/_variables.scss#L36",
      packageName: "utils",
      type: "Boolean",
      value: "false",
      overridable: true,
    },
    "rmd-utils-phone-max-width": {
      name: "rmd-utils-phone-max-width",
      description:
        "The max width for a phone when in portrait or landscape mode.\n",
      source: "packages/utils/src/_variables.scss#L40",
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
      source: "packages/utils/src/_variables.scss#L44",
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
      source: "packages/utils/src/_variables.scss#L48",
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
      source: "packages/utils/src/_variables.scss#L52",
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
      source: "packages/utils/src/_variables.scss#L56",
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
      source: "packages/utils/src/_variables.scss#L60",
      usedBy: [
        { name: "rmd-grid", type: "mixin", packageName: "utils" },
        { name: "rmd-grid", type: "mixin", packageName: "utils" },
        { name: "rmd-grid", type: "mixin", packageName: "utils" },
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
      source: "packages/utils/src/_variables.scss#L64",
      usedBy: [
        { name: "rmd-grid", type: "mixin", packageName: "utils" },
        { name: "rmd-grid", type: "mixin", packageName: "utils" },
      ],
      packageName: "utils",
      type: "String",
      value: "--rmd-grid-gutter",
      overridable: false,
    },
    "rmd-grid-cell-margin-var": {
      name: "rmd-grid-cell-margin-var",
      description:
        "The css variable that is used to apply margin to cells within the grid components.\n",
      source: "packages/utils/src/_variables.scss#L68",
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
      source: "packages/utils/src/_variables.scss#L72",
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
        "The default amount of padding to apply to the `Grid` component. This is a bit different than the\nflex grid since the cells within this grid will not have outer margin.\n",
      source: "packages/utils/src/_variables.scss#L77",
      packageName: "utils",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-grid-cell-margin": {
      name: "rmd-grid-cell-margin",
      description:
        "The default amount of margin to apply between each cell within the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L81",
      packageName: "utils",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-grid-columns": {
      name: "rmd-grid-columns",
      description:
        "The material design grid system is a bit weird and does a 4 -> 8 -> 12 column layout for\nphone -> tablet -> desktop. This is really nice when your grid only uses even numbers, but\nthe second you add an odd number in there, it breaks down and becomes confusing.\n\nThis variable is a quick way to opt-out of this grid system and have a static number of columns\nfor each media type.\n",
      source: "packages/utils/src/_variables.scss#L90",
      packageName: "utils",
      type: "Number",
      value: "null",
      overridable: true,
    },
    "rmd-grid-phone-columns": {
      name: "rmd-grid-phone-columns",
      description:
        "The default number of columns to render on mobile devices in the `Grid` component.\n",
      source: "packages/utils/src/_variables.scss#L94",
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
      source: "packages/utils/src/_variables.scss#L98",
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
      source: "packages/utils/src/_variables.scss#L102",
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
      source: "packages/utils/src/_variables.scss#L106",
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
      source: "packages/utils/src/_variables.scss#L110",
      packageName: "utils",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-grid-list-cell-margin": {
      name: "rmd-grid-list-cell-margin",
      description:
        "The default amount of margin to apply to each cell within the `GridList` component.\n",
      source: "packages/utils/src/_variables.scss#L114",
      packageName: "utils",
      type: "Number",
      value: "0.5rem",
      overridable: false,
    },
    "rmd-grid-list-cell-max-size": {
      name: "rmd-grid-list-cell-max-size",
      description:
        "The default max size that each cell can be within the `GridList` component.\n",
      source: "packages/utils/src/_variables.scss#L118",
      packageName: "utils",
      type: "Number",
      value: "9.375rem",
      overridable: true,
    },
  },
};

export default sassdoc;
