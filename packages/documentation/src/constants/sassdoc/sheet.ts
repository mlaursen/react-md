/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-sheet-theme": {
      name: "rmd-sheet-theme",
      description:
        "This function is used to quickly get one of the sheet's theme values. This is really just for the `rmd-sheet-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/sheet/src/_functions.scss#L15-L17",
      packageName: "sheet",
      code: "@function rmd-sheet-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-sheet-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-sheet-theme-values, sheet);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-sheet-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the sheet's theme values.",
      },
    },
    "rmd-sheet-theme-var": {
      name: "rmd-sheet-theme-var",
      description:
        "This function is used to get one of the sheet's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-sheet-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/sheet/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
        { name: "rmd-sheet", type: "mixin", packageName: "sheet" },
      ],
      packageName: "sheet",
      code:
        "@function rmd-sheet-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-sheet-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-sheet-theme-values,\n    sheet,\n    $fallback\n  );\n}\n",
      type: "function",
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
            "An optional fallback color to apply. This is set to `null` by default and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the sheet's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-sheet-theme": {
      name: "rmd-sheet-theme",
      description:
        "Creates the styles for one of the sheet's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/sheet/src/_mixins.scss#L23-L25",
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      code:
        "@mixin rmd-sheet-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-sheet-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-sheet-theme-values,\n    sheet\n  );\n}\n",
      type: "mixin",
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
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-sheet-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-sheet-theme-update-var": {
      name: "rmd-sheet-theme-update-var",
      description:
        "Updates one of the sheet's theme variables with the new value for the section of your app.",
      source: "packages/sheet/src/_mixins.scss#L33-L35",
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      code: "@mixin rmd-sheet-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-sheet-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-sheet-theme-values,\n    sheet\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The sheet theme style type to update. This should be one of the `$rmd-sheet-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-sheet": {
      name: "rmd-sheet",
      description: "Creates the styles for a sheet component\n",
      source: "packages/sheet/src/_mixins.scss#L70-L147",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      code: "@mixin rmd-sheet { … }",
      sourceCode:
        "@mixin rmd-sheet {\n  @include rmd-elevation($rmd-sheet-elevation);\n  @include rmd-utils-scroll;\n  @include rmd-sheet-positions;\n  @include rmd-sheet-theme(max-height);\n  @include rmd-sheet-theme(height);\n  @include rmd-sheet-theme(width);\n\n  position: fixed;\n  z-index: $rmd-sheet-z-index;\n\n  &--raised {\n    @include rmd-elevation($rmd-sheet-raised-elevation);\n    z-index: $rmd-sheet-raised-z-index;\n  }\n\n  &--horizontal {\n    bottom: 0;\n    top: 0;\n  }\n\n  &--touch-width {\n    @include rmd-sheet-theme-update-var(\n      width,\n      rmd-sheet-theme-var(touch-width)\n    );\n  }\n\n  &--static-width {\n    @include rmd-sheet-theme-update-var(\n      width,\n      rmd-sheet-theme-var(static-width)\n    );\n  }\n\n  &--media-width {\n    @include rmd-utils-tablet-media {\n      @include rmd-sheet-theme-update-var(\n        width,\n        rmd-sheet-theme-var(static-width)\n      );\n    }\n    @include rmd-sheet-theme-update-var(\n      width,\n      rmd-sheet-theme-var(touch-width)\n    );\n  }\n\n  &--vertical {\n    left: 0;\n    right: 0;\n  }\n\n  &--viewport-height {\n    @include rmd-sheet-theme-update-var(max-height, $rmd-sheet-max-height);\n  }\n\n  &--touchable-height {\n    @include rmd-sheet-theme-update-var(\n      max-height,\n      rmd-sheet-theme-var(touchable-max-height)\n    );\n  }\n\n  &--recommended-height {\n    max-height: $rmd-sheet-recommended-max-height;\n    min-height: $rmd-sheet-recommended-min-height;\n  }\n\n  &--offscreen {\n    @include rmd-sheet-theme(transform, transform-offscreen);\n  }\n\n  &--hidden {\n    box-shadow: none;\n  }\n\n  &--visible {\n    transform: translate3d(0, 0, 0);\n  }\n\n  &--enter {\n    @include rmd-transition(deceleration);\n\n    transition: transform $rmd-sheet-enter-duration;\n  }\n\n  &--exit {\n    @include rmd-transition(acceleration);\n\n    transition: transform $rmd-sheet-enter-duration;\n  }\n}\n",
      type: "mixin",
    },
    "react-md-sheet": {
      name: "react-md-sheet",
      description:
        "Creates all the styles for the sheet package as well as the root css variable theme.\n",
      source: "packages/sheet/src/_mixins.scss#L151-L161",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "sheet",
      code: "@mixin react-md-sheet { … }",
      sourceCode:
        "@mixin react-md-sheet {\n  @include rmd-theme-create-root-theme($rmd-sheet-theme-values, sheet);\n\n  .rmd-sheet {\n    @include rmd-sheet;\n  }\n\n  .rmd-sheet-overlay {\n    z-index: $rmd-sheet-overlay-z-index;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-sheet-z-index": {
      name: "rmd-sheet-z-index",
      description:
        "The z-index to use for sheets that normally appear without an overlay and inline with other content. This should be a number greater than 1 in case you have sticky table headers.\n",
      source: "packages/sheet/src/_variables.scss#L14",
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "5",
      overridable: true,
    },
    "rmd-sheet-raised-z-index": {
      name: "rmd-sheet-raised-z-index",
      description:
        "The z-index to use for sheets that normally appear with an overlay and covering other elements on the page.",
      source: "packages/sheet/src/_variables.scss#L21",
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "$rmd-overlay-z-index + 1",
      compiled: "17",
      overridable: true,
    },
    "rmd-sheet-overlay-z-index": {
      name: "rmd-sheet-overlay-z-index",
      description:
        "The z-index to use for a sheet's overlay. This value just needs to be smaller than the `$rmd-sheet-raised-z-index` value so the overlay does not cover the sheet.",
      source: "packages/sheet/src/_variables.scss#L28",
      usedBy: [{ name: "react-md-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "$rmd-sheet-raised-z-index - 1",
      compiled: "16",
      overridable: true,
    },
    "rmd-sheet-elevation": {
      name: "rmd-sheet-elevation",
      description:
        'This is the default elevation to use for sheets that do not have an overlay.\nThis is normally used for showing sheets more "inline" with other content.\n',
      source: "packages/sheet/src/_variables.scss#L33",
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-sheet-raised-elevation": {
      name: "rmd-sheet-raised-elevation",
      description:
        "The elevation to use for temporary sheets that usually display an overlay as well.\n",
      source: "packages/sheet/src/_variables.scss#L38",
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "16",
      overridable: true,
    },
    "rmd-sheet-enter-duration": {
      name: "rmd-sheet-enter-duration",
      description: "The duration for the enter transition.",
      source: "packages/sheet/src/_variables.scss#L44",
      usedBy: [
        {
          name: "rmd-layout-enter-duration",
          type: "variable",
          packageName: "layout",
        },
        { name: "rmd-sheet", type: "mixin", packageName: "sheet" },
      ],
      packageName: "sheet",
      type: "Number",
      value: "$rmd-transition-enter-duration",
      compiled: "0.2s",
      overridable: true,
    },
    "rmd-sheet-leave-duration": {
      name: "rmd-sheet-leave-duration",
      description: "The duration for the leave transition.",
      source: "packages/sheet/src/_variables.scss#L50",
      usedBy: [
        {
          name: "rmd-layout-leave-duration",
          type: "variable",
          packageName: "layout",
        },
      ],
      packageName: "sheet",
      type: "Number",
      value: "$rmd-transition-leave-duration",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-sheet-touch-margin": {
      name: "rmd-sheet-touch-margin",
      description:
        "The amount of horizontal margin to use between the viewport's edge and the sheet's edge. This is used so that mobile devices have an overlay \"touch target\" to close the sheet without requiring one of the actions to be clicked.\n",
      source: "packages/sheet/src/_variables.scss#L57",
      packageName: "sheet",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-sheet-touch-width": {
      name: "rmd-sheet-touch-width",
      description: "The width of a sheet on small touch devices.\n",
      source: "packages/sheet/src/_variables.scss#L61",
      packageName: "sheet",
      type: "Number",
      value: "calc(100vw - #{$rmd-sheet-touch-margin})",
      compiled: "calc(100vw - 3.5rem)",
      overridable: true,
    },
    "rmd-sheet-static-width": {
      name: "rmd-sheet-static-width",
      description:
        'The width to apply to "static" width sheets. This width **should not** be used on phones but can be used for tablets or desktops.\n',
      source: "packages/sheet/src/_variables.scss#L66",
      usedBy: [
        {
          name: "rmd-layout-navigation-width",
          type: "variable",
          packageName: "layout",
        },
      ],
      packageName: "sheet",
      type: "Number",
      value: "16rem",
      overridable: true,
    },
    "rmd-sheet-max-height": {
      name: "rmd-sheet-max-height",
      description:
        "The max height to set for sheets. It is recommended to leave this as 100%\nand instead update the `$rmd-sheet-touchable-max-height` instead.\n",
      source: "packages/sheet/src/_variables.scss#L72",
      see: [
        {
          name: "rmd-sheet-touchable-max-height",
          type: "variable",
          packageName: "sheet",
        },
      ],
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "100%",
      overridable: true,
    },
    "rmd-sheet-touchable-max-height": {
      name: "rmd-sheet-touchable-max-height",
      description:
        'The max height for a sheet that has a "touchable" area that can be used to close the sheet without selecting one of the actions.',
      source: "packages/sheet/src/_variables.scss#L78",
      packageName: "sheet",
      type: "Number",
      value: "calc(100% - #{$rmd-sheet-touch-margin})",
      compiled: "calc(100% - 3.5rem)",
      overridable: true,
    },
    "rmd-sheet-recommended-min-height": {
      name: "rmd-sheet-recommended-min-height",
      description:
        'The "recommended" min-height from the material design spec for bottom sheets.\n',
      source: "packages/sheet/src/_variables.scss#L83",
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-sheet-recommended-max-height": {
      name: "rmd-sheet-recommended-max-height",
      description:
        'The "recommended" max-height from the material design spec for bottom sheets. I personally think it is better to either set the max-height to `calc(100% - 3.5rem)` or `100%` with a close button.\n',
      source: "packages/sheet/src/_variables.scss#L89",
      usedBy: [{ name: "rmd-sheet", type: "mixin", packageName: "sheet" }],
      packageName: "sheet",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-sheet-positions": {
      name: "rmd-sheet-positions",
      description:
        "A list of positions that are supported by the sheet component.\n",
      source: "packages/sheet/src/_variables.scss#L93",
      packageName: "sheet",
      type: "List",
      value: "top right bottom left",
      overridable: false,
    },
    "rmd-sheet-enabled-positions": {
      name: "rmd-sheet-enabled-positions",
      description:
        "The positions that are created by default with the `react-md-sheet` mixin.\nWhen generating styles, this list will be looped through to create the correct position styles.\n",
      source: "packages/sheet/src/_variables.scss#L99",
      packageName: "sheet",
      type: "List",
      value: "$rmd-sheet-positions",
      compiled: "top,right,bottom,left",
      overridable: true,
    },
    "rmd-sheet-theme-values": {
      name: "rmd-sheet-theme-values",
      description:
        'A Map of all the "themeable" parts of the sheet package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/sheet/src/_variables.scss#L105-L113",
      usedBy: [
        { name: "rmd-sheet-theme", type: "function", packageName: "sheet" },
        { name: "rmd-sheet-theme-var", type: "function", packageName: "sheet" },
        { name: "rmd-sheet-theme", type: "mixin", packageName: "sheet" },
        {
          name: "rmd-sheet-theme-update-var",
          type: "mixin",
          packageName: "sheet",
        },
        { name: "react-md-sheet", type: "mixin", packageName: "sheet" },
      ],
      packageName: "sheet",
      type: "Map",
      value:
        "(\n  touch-width: $rmd-sheet-touch-width,\n  static-width: $rmd-sheet-static-width,\n  touchable-max-height: $rmd-sheet-touchable-max-height,\n  max-height: null,\n  height: null,\n  width: null,\n  transform-offscreen: null,\n)",
      compiled:
        "(\n  touch-width: calc(100vw - 3.5rem),\n  static-width: 16rem,\n  touchable-max-height: calc(100% - 3.5rem),\n  max-height: null,\n  height: null,\n  width: null,\n  transform-offscreen: null,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
