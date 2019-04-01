/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const MediaSassDoc: PackageSassDoc = {
  name: "media",
  variables: [
    {
      name: "rmd-media-overlay-background-color",
      type: "Color",
      description: "The background color for a media overlay.\n",
      file: "@react-md/media/dist/_variables.scss",
      group: "media",
      see: [],
      links: [],
      value: "rgba($rmd-black-base, 0.54)",
      compiledValue: "rgba(0, 0, 0, 0.54)",
      configurable: true,
    },
    {
      name: "rmd-media-selectors",
      type: "List",
      description:
        "A list of selectors or html elements that should be considered responsive\nmedia by default. This will make it so that when using the `MediaContainer`\ncomponent, the following elements will be responsive automatically.\n",
      file: "@react-md/media/dist/_variables.scss",
      group: "media",
      see: [],
      links: [],
      value: "(img '>svg' iframe video embed object)",
      compiledValue:
        ' ["img", ">svg", "iframe", "video", "embed", "object"];\n',
      configurable: true,
    },
    {
      name: "rmd-media-default-aspect-ratio",
      type: "Number",
      description:
        "The default aspect ratio for the media component when an aspect ratio is\nenforced.\n",
      file: "@react-md/media/dist/_variables.scss",
      group: "media",
      see: [],
      links: [],
      value: "percentage(9 / 16)",
      compiledValue: "percentage(9 / 16)",
      configurable: true,
    },
    {
      name: "rmd-media-default-aspect-ratios",
      type: "Map",
      description:
        "A Map including the default aspect ratios to create for responsive media\nwith a forced aspect ratio. Each key must be a string for a class name suffix\nand each value should be a list in the form of (width height).\n",
      file: "@react-md/media/dist/_variables.scss",
      group: "media",
      see: [],
      links: [],
      value: "(\n  '16-9': 16 9,\n  '4-3': 4 3,\n  '1-1': 1 1,\n)",
      compiledValue: "(\n  '16-9': 16 9,\n  '4-3': 4 3,\n  '1-1': 1 1,\n)",
      configurable: true,
    },
    {
      name: "rmd-media-overlay-padding",
      type: "Number",
      description: "The default padding for the media overlay component.\n",
      file: "@react-md/media/dist/_variables.scss",
      group: "media",
      see: [],
      links: [],
      value: "1rem",
      compiledValue: "1rem",
      configurable: true,
    },
    {
      name: "rmd-media-overlay-horizontal-width",
      type: "Number",
      description:
        "This is the default width for the media overlay component when the position\nis set to `left`, `right`, or `center`. This is really just added since these\npositions might cause overflow issues since their width will change based on\nthe content size. Setting it to a width will prevent this.\n\nSo if you'd like to add the default behavior back, you can set this to `100%`\nor `null`.\n",
      file: "@react-md/media/dist/_variables.scss",
      group: "media",
      see: [],
      links: [],
      value: "30%",
      compiledValue: "30%",
      configurable: true,
    },
    {
      name: "rmd-media-overlay-positions",
      type: "List",
      description:
        "The positions for the media overlay. This can be set to an empty list or null\nif you'd like to save a few bytes by not generating the styles for some positions.\n",
      file: "@react-md/media/dist/_variables.scss",
      group: "media",
      see: [],
      links: [],
      value: "(top right bottom left middle center absolute-center)",
      compiledValue: "(top right bottom left middle center absolute-center)",
      configurable: true,
    },
  ],
  functions: [],
  mixins: [
    {
      name: "rmd-media-aspect-ratio-container",
      type: "mixin",
      description:
        "Creates the styles for a media container that should enforce a specific\naspect ratio.\n",
      file: "@react-md/media/dist/_mixins.scss",
      group: "media",
      see: [],
      links: [],
      code:
        "@mixin rmd-media-aspect-ratio-container {\n  display: block;\n  height: 0;\n  overflow: hidden;\n  padding: 0;\n  position: relative;\n}",
      oneLineCode: "@mixin rmd-media-aspect-ratio-container { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-media-forced-aspect-ratio",
      type: "mixin",
      description:
        "Creates the styles for a responsive media item that should have a specific\naspect ratio.\n",
      file: "@react-md/media/dist/_mixins.scss",
      group: "media",
      see: [],
      links: [],
      code:
        "@mixin rmd-media-forced-aspect-ratio {\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 100%;\n}",
      oneLineCode: "@mixin rmd-media-forced-aspect-ratio { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-media",
      type: "mixin",
      description:
        "Creates the styles for a responsive media item that will update its\nheight and width based on the parent element.\n",
      file: "@react-md/media/dist/_mixins.scss",
      group: "media",
      see: [],
      links: [],
      code: "@mixin rmd-media {\n  height: auto;\n  width: 100%;\n}",
      oneLineCode: "@mixin rmd-media { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-media-overlay-position",
      type: "mixin",
      description:
        "Creates the base positioning styles for the media overlay element.\n",
      file: "@react-md/media/dist/_mixins.scss",
      group: "media",
      see: [],
      links: [],
      code:
        "@mixin rmd-media-overlay-position($position: ) {\n  $position: rmd-utils-validate(\n    $rmd-media-overlay-positions,\n    $position,\n    'rmd-media-overlay-positions'\n  );\n\n  @if $position == left or $position == right or $position == center {\n    bottom: 0;\n    top: 0;\n    width: $rmd-media-overlay-horizontal-width;\n\n    @if $position == left {\n      left: 0;\n    } @else if $position == right {\n      right: 0;\n    } @else if $position == center {\n      left: 50%;\n      transform: translateX(-50%);\n    }\n  } @else if $position == top or $position == bottom or $position == middle {\n    left: 0;\n    right: 0;\n\n    @if $position == top {\n      top: 0;\n    } @else if $position == bottom {\n      bottom: 0;\n    } @else if $position == middle {\n      top: 50%;\n      transform: translateY(-50%);\n    }\n  } @else if $position == absolute-center {\n    left: 50%;\n    top: 50%;\n    transform: translateX(-50%) translateY(-50%);\n  }\n}",
      oneLineCode: "@mixin rmd-media-overlay-position($position: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "position",
          description: "One of the `rmd-media-overlay-positions` values",
        },
      ],
    },
    {
      name: "rmd-media-overlay",
      type: "mixin",
      description:
        "Creates the media overlay styles. All this really does is update the theme background and\ntext colors based on the provided background color for the overlay element.\n\n",
      file: "@react-md/media/dist/_mixins.scss",
      group: "media",
      see: [],
      links: [],
      code:
        "@mixin rmd-media-overlay($background-color: $rmd-media-overlay-background-color, $color: null) {\n  @if $color == null {\n    $light: rmd-theme-tone($background-color) == 'light';\n    $color: rmd-theme-var(if($light, text-primary-on-light, text-primary-on-dark));\n    $secondary-color: rmd-theme-var(if($light, text-secondary-on-light, text-secondary-on-dark));\n\n    @include rmd-theme-update-var(text-secondary-on-background, $secondary-color);\n  }\n\n  @include rmd-theme-update-var(background, $background-color);\n  @include rmd-theme-update-var(text-primary-on-background, $color);\n  @include rmd-theme(background-color, background);\n  @include rmd-theme(color, text-primary-on-background);\n\n  padding: $rmd-media-overlay-padding;\n  position: absolute;\n  z-index: 1;\n\n  @if $rmd-media-overlay-positions != null {\n    @each $position in $rmd-media-overlay-positions {\n      &--#{$position} {\n        @include rmd-media-overlay-position($position);\n      }\n    }\n  }\n}",
      oneLineCode:
        "@mixin rmd-media-overlay($background-color: $rmd-media-overlay-background-color, $color: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "Color",
          name: "background-color",
          default: "rmd-media-overlay-background-color",
          description: "The background color\n  for the media overlay.",
        },
        {
          type: "Color",
          name: "color",
          default: "null",
          description:
            "An optional color to use for the overlay. If this is `null`,\n  it will determine the contrast tone of the background color and use either the light or\n  dark theme variables instead.",
        },
      ],
    },
    {
      name: "react-md-media",
      type: "mixin",
      description: "Creates all the styles for the media package.\n",
      file: "@react-md/media/dist/_mixins.scss",
      group: "media",
      see: [],
      links: [],
      code:
        "@mixin react-md-media {\n  .rmd-media-container {\n    display: inline-block;\n\n    @each $selector in $rmd-media-selectors {\n      // sass-lint:disable force-element-nesting\n      &--auto #{$selector} {\n        @include rmd-media;\n      }\n\n      &--aspect-ratio #{$selector} {\n        @include rmd-media-forced-aspect-ratio;\n      }\n    }\n\n    &--aspect-ratio {\n      @include rmd-media-aspect-ratio-container;\n    }\n\n    @each $key, $value in $rmd-media-default-aspect-ratios {\n      &--#{$key} {\n        $width: nth($value, 1);\n        $height: nth($value, 2);\n\n        padding-bottom: percentage($height / $width);\n      }\n    }\n  }\n\n  .rmd-media {\n    @include rmd-media;\n  }\n\n  .rmd-media-overlay {\n    @include rmd-media-overlay;\n  }\n}",
      oneLineCode: "@mixin react-md-media { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default MediaSassDoc;
