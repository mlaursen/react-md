/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const SheetSassDoc: PackageSassDoc = {
  name: "sheet",
  variables: [
    {
      name: "rmd-sheet-elevation",
      type: "Number",
      description:
        'The elevation to use for sheets that are displayed "inline" with other content. This _should__ most likely\nstay the default, but it needs to be a number between 0 and 16.\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "2",
      compiledValue: "2",
      configurable: true,
    },
    {
      name: "rmd-sheet-fixed-elevation",
      type: "Number",
      description:
        "The elevation to use for fixed sheets. This _should_ most likely stay the default, but it needs to\nbe a number between 0 and 16.\n",
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "16",
      compiledValue: "16",
      configurable: true,
    },
    {
      name: "rmd-sheet-z-index",
      type: "Number",
      description:
        "The z-index for sheets. The value doesn't matter _too_ much but it needs to at least be above the\noverlay that is created along with the sheet.\n",
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "$rmd-overlay-z-index + 1",
      compiledValue: "17",
      configurable: false,
    },
    {
      name: "rmd-sheet-enter-duration",
      type: "Number",
      description: "The duration for the enter transition.\n",
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "0.2s",
      compiledValue: "0.2s",
      configurable: true,
    },
    {
      name: "rmd-sheet-leave-duration",
      type: "Number",
      description: "The duration for the leave transition.\n",
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-sheet-touch-margin",
      type: "Number",
      description:
        "The amount of horizontal margin to use between the viewport's edge and the sheet's edge. This\nis used so that mobile devies have an overlay \"touch target\" to close the sheet without requiring\none of the actions to be clicked.\n",
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "3.5rem",
      compiledValue: "3.5rem",
      configurable: true,
    },
    {
      name: "rmd-sheet-small-width",
      type: "Number",
      description:
        'The width to apply to "small" sheets. This width **should** be used for mobile devices along with\nthe max-width.\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "calc(100vw - #{$rmd-sheet-touch-margin})",
      compiledValue: "calc(100vw - 3.5rem)",
      configurable: true,
    },
    {
      name: "rmd-sheet-small-max-width",
      type: "Number",
      description:
        'The max-width to apply to "small" sheets. This max-width **should** be used for mobile devices along with\nthe max-width.\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "20rem",
      compiledValue: "20rem",
      configurable: true,
    },
    {
      name: "rmd-sheet-large-width",
      type: "Number",
      description:
        'The width to apply to "large" sheets. This width **should not** be used on phones but can be used for tablets or\ndesktops.\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "16rem",
      compiledValue: "16rem",
      configurable: true,
    },
    {
      name: "rmd-sheet-large-max-width",
      type: "Number",
      description:
        'The max-width to apply to "large" sheets. This max-width **should not** be used on phones but can be used for tablets or\ndesktops.\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "25rem",
      compiledValue: "25rem",
      configurable: true,
    },
    {
      name: "rmd-sheet-max-height",
      type: "Number",
      description:
        "The max height to set for sheets. It is recommended to leave this as 100% and instead update the\n`$rmd-sheet-touchable-max-height` instead.\n",
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [
        {
          name: "rmd-sheet-touchable-max-height",
          type: "variable",
          description:
            'The max height for a sheet that has a "touchable" area that can be used to close the sheet without selecting\none of the actions.\n\n',
          group: "sheet",
        },
      ],
      links: [],
      value: "100%",
      compiledValue: "100%",
      configurable: true,
    },
    {
      name: "rmd-sheet-touchable-max-height",
      type: "Number",
      description:
        'The max height for a sheet that has a "touchable" area that can be used to close the sheet without selecting\none of the actions.\n\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "calc(100% - #{$rmd-sheet-touch-margin})",
      compiledValue: "calc(100% - 3.5rem)",
      configurable: true,
    },
    {
      name: "rmd-sheet-recommended-min-height",
      type: "Number",
      description:
        'The "recommended" min-height from the material design spec for bottom sheets.\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "3.5rem",
      compiledValue: "3.5rem",
      configurable: true,
    },
    {
      name: "rmd-sheet-recommended-max-height",
      type: "Number",
      description:
        'The "recommended" max-height from the material design spec for bottom sheets. I personally think it is better\nto either set the max-height to `calc(100% - 3.5rem)` or `100%` with a close button.\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "50%",
      compiledValue: "50%",
      configurable: true,
    },
    {
      name: "rmd-sheet-positions",
      type: "List",
      description:
        "A list of positions that are supported by the sheet component.\n",
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "top right bottom left",
      compiledValue: "top right bottom left",
      configurable: false,
    },
    {
      name: "rmd-sheet-enabled-positions",
      type: "List",
      description:
        "The positions that are created by default with the `react-md-sheet` mixin. When generating\nstyles, this list will be looped through to create the correct position styles.\n",
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value: "$rmd-sheet-positions",
      compiledValue: ' ["top", "right", "bottom", "left"];\n',
      configurable: true,
    },
    {
      name: "rmd-sheet-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the sheet package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/sheet/dist/_variables.scss",
      group: "sheet",
      see: [],
      links: [],
      value:
        "(\n  background-color: $rmd-sheet-background-color,\n  small-width: $rmd-sheet-small-width,\n  small-max-width: $rmd-sheet-small-max-width,\n  large-width: $rmd-sheet-large-width,\n  large-max-width: $rmd-sheet-large-max-width,\n  touchable-max-height: $rmd-sheet-touchable-max-height,\n  max-width: null,\n  max-height: null,\n  height: null,\n  width: null,\n  transform-offscreen: null,\n)",
      compiledValue:
        "(\n  background-color: var(--rmd-theme-surface, #fff),\n  small-width: calc(100vw - 3.5rem),\n  small-max-width: 20rem,\n  large-width: 16rem,\n  large-max-width: 25rem,\n  touchable-max-height: calc(100% - 3.5rem),\n  max-width: null,\n  max-height: null,\n  height: null,\n  width: null,\n  transform-offscreen: null,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-sheet-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the sheet's theme values. This is really\njust for the `rmd-sheet-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/sheet/dist/_functions.scss",
      group: "sheet",
      see: [],
      links: [],
      code:
        "@function rmd-sheet-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-sheet-theme-values, sheet);\n}",
      oneLineCode: "@function rmd-sheet-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-sheet-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the sheet's theme values.",
      },
    },
    {
      name: "rmd-sheet-theme-var",
      type: "function",
      description:
        "This function is used to get one of the sheet's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-sheet-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/sheet/dist/_functions.scss",
      group: "sheet",
      see: [],
      links: [],
      code:
        "@function rmd-sheet-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-sheet-theme-values, sheet, $fallback);\n}",
      oneLineCode:
        "@function rmd-sheet-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-sheet-theme-values` map keys to set a value for.",
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
        description: "one of the sheet's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-sheet-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the sheet's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/sheet/dist/_mixins.scss",
      group: "sheet",
      see: [],
      links: [],
      code:
        "@mixin rmd-sheet-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-sheet-theme-values, sheet);\n}",
      oneLineCode:
        "@mixin rmd-sheet-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-sheet-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-sheet-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-sheet-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-sheet-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the sheet's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/sheet/dist/_mixins.scss",
      group: "sheet",
      see: [],
      links: [],
      code:
        "@mixin rmd-sheet-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-sheet-theme-values, sheet);\n}",
      oneLineCode:
        "@mixin rmd-sheet-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The sheet theme style type to update. This should be one\n  of the `$rmd-sheet-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "react-md-sheet",
      type: "mixin",
      description:
        "Creates all the styles for the sheet package as well as the root css variable theme.\n",
      file: "@react-md/sheet/dist/_mixins.scss",
      group: "sheet",
      see: [],
      links: [],
      code:
        "@mixin react-md-sheet {\n  @include rmd-theme-create-root-theme($rmd-sheet-theme-values, sheet);\n\n  .rmd-sheet {\n    @include rmd-elevation($rmd-sheet-elevation);\n    @include rmd-utils-scroll;\n    @include rmd-utils-hide-focus-outline;\n    @include rmd-theme-update-var(background, rmd-sheet-theme-var(background-color));\n    @include rmd-sheet-theme(background-color);\n    @include rmd-sheet-positions;\n\n    @include rmd-sheet-theme(max-height);\n    @include rmd-sheet-theme(max-width);\n    @include rmd-sheet-theme(height);\n    @include rmd-sheet-theme(width);\n\n    &--fixed {\n      @include rmd-elevation($rmd-sheet-fixed-elevation);\n\n      position: fixed;\n      z-index: $rmd-sheet-z-index;\n    }\n\n    &--horizontal {\n      bottom: 0;\n      top: 0;\n    }\n\n    &--small-width {\n      @include rmd-sheet-theme-update-var(width, rmd-sheet-theme-var(small-width));\n    }\n\n    &--until-small-width {\n      @include rmd-sheet-theme-update-var(max-width, rmd-sheet-theme-var(small-max-width));\n      @include rmd-sheet-theme-update-var(width, 100%);\n    }\n\n    &--large-width {\n      @include rmd-sheet-theme-update-var(width, rmd-sheet-theme-var(large-width));\n    }\n\n    &--until-large-width {\n      @include rmd-sheet-theme-update-var(max-width, rmd-sheet-theme-var(large-max-width));\n      @include rmd-sheet-theme-update-var(width, 100%);\n    }\n\n    &--media-width {\n      @include rmd-sheet-theme-update-var(width, rmd-sheet-theme-var(small-width));\n\n      @media (min-width: 48rem) {\n        @include rmd-sheet-theme-update-var(width, rmd-sheet-theme-var(large-width));\n      }\n    }\n\n    &--vertical {\n      left: 0;\n      right: 0;\n    }\n\n    &--viewport-height {\n      @include rmd-sheet-theme-update-var(max-height, $rmd-sheet-max-height);\n    }\n\n    &--touchable-height {\n      @include rmd-sheet-theme-update-var(max-height, rmd-sheet-theme-var(touchable-max-height));\n    }\n\n    &--recommended-height {\n      max-height: $rmd-sheet-recommended-max-height;\n      min-height: $rmd-sheet-recommended-min-height;\n    }\n\n    &--offscreen {\n      @include rmd-sheet-theme(transform, transform-offscreen);\n    }\n\n    &--hidden {\n      box-shadow: none;\n    }\n\n    &--visible {\n      transform: translate3d(0, 0, 0);\n    }\n\n    &--enter {\n      @include rmd-transition(deceleration);\n\n      transition: transform $rmd-sheet-enter-duration;\n    }\n\n    &--exit {\n      @include rmd-transition(acceleration);\n\n      transition: transform $rmd-sheet-enter-duration;\n    }\n  }\n}",
      oneLineCode: "@mixin react-md-sheet { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default SheetSassDoc;
