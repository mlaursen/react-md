/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-progress-theme": {
      name: "rmd-progress-theme",
      description:
        "This function is used to quickly get one of the progress's theme values.\nThis is really just for the `rmd-progress-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/progress/src/_functions.scss#L16-L18",
      requires: [
        {
          name: "rmd-theme-get-var-value",
          type: "function",
          packageName: "theme",
        },
        {
          name: "rmd-progress-theme-values",
          type: "variable",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      code: "@function rmd-progress-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-progress-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-progress-theme-values,\n    progress\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-progress-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the progress's theme values.",
      },
    },
    "rmd-progress-theme-var": {
      name: "rmd-progress-theme-var",
      description:
        "This function is used to get one of the progress's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-progress-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/progress/src/_functions.scss#L33-L35",
      requires: [
        { name: "rmd-theme-get-var", type: "function", packageName: "theme" },
        {
          name: "rmd-progress-theme-values",
          type: "variable",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      code:
        "@function rmd-progress-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-progress-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-progress-theme-values,\n    progress,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-progress-theme-values` map keys to set a value for.",
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
        description: "one of the progress's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-progress-theme": {
      name: "rmd-progress-theme",
      description:
        "Creates the styles for one of the progress's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/progress/src/_mixins.scss#L22-L24",
      usedBy: [
        {
          name: "rmd-linear-progress-bar-styles",
          type: "mixin",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-bar",
          type: "mixin",
          packageName: "progress",
        },
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
        {
          name: "rmd-circular-progress",
          type: "mixin",
          packageName: "progress",
        },
      ],
      requires: [
        {
          name: "rmd-theme-apply-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-progress-theme-values",
          type: "variable",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      code:
        "@mixin rmd-progress-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-progress-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-progress-theme-values,\n    progress\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-progress-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-progress-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-progress-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-progress-theme-update-var": {
      name: "rmd-progress-theme-update-var",
      description:
        "Updates one of the progress's theme variables with the new value for the section of your app.",
      source: "packages/progress/src/_mixins.scss#L32-L34",
      usedBy: [
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        { name: "rmd-switch", type: "mixin", packageName: "form" },
      ],
      requires: [
        {
          name: "rmd-theme-update-rmd-var",
          type: "mixin",
          packageName: "theme",
        },
        {
          name: "rmd-progress-theme-values",
          type: "variable",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      code: "@mixin rmd-progress-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-progress-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-progress-theme-values,\n    progress\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The progress theme style type to update. This should be one of the `$rmd-progress-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-progress-animation": {
      name: "rmd-progress-animation",
      description: "",
      source: "packages/progress/src/_mixins.scss#L38-L46",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
        {
          name: "rmd-circular-progress",
          type: "mixin",
          packageName: "progress",
        },
      ],
      requires: [
        {
          name: "rmd-utils-map-to-styles",
          type: "mixin",
          packageName: "utils",
        },
      ],
      packageName: "progress",
      code: "@mixin rmd-progress-animation($styles) { … }",
      sourceCode:
        "@mixin rmd-progress-animation($styles) {\n  @if $styles != null {\n    @each $percentage, $style in $styles {\n      #{$percentage} {\n        @include rmd-utils-map-to-styles($style);\n      }\n    }\n  }\n}\n",
      type: "mixin",
      parameters: [
        { name: "styles", description: "The current animation styles to use" },
      ],
    },
    "rmd-linear-progress-bar-styles": {
      name: "rmd-linear-progress-bar-styles",
      description: "",
      source: "packages/progress/src/_mixins.scss#L49-L55",
      usedBy: [
        {
          name: "rmd-linear-progress-bar",
          type: "mixin",
          packageName: "progress",
        },
      ],
      requires: [
        { name: "rmd-progress-theme", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      code: "@mixin rmd-linear-progress-bar-styles { … }",
      sourceCode:
        "@mixin rmd-linear-progress-bar-styles {\n  @include rmd-progress-theme(background-color, color);\n  @include rmd-progress-theme(height, linear-size);\n\n  position: absolute;\n  z-index: 0;\n}\n",
      type: "mixin",
    },
    "rmd-linear-progress-bar": {
      name: "rmd-linear-progress-bar",
      description: "",
      source: "packages/progress/src/_mixins.scss#L58-L159",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      requires: [
        { name: "rmd-utils-rtl-auto", type: "mixin", packageName: "utils" },
        {
          name: "rmd-utils-rtl-auto-group",
          type: "mixin",
          packageName: "utils",
        },
        {
          name: "rmd-linear-progress-bar-styles",
          type: "mixin",
          packageName: "progress",
        },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        { name: "rmd-progress-theme", type: "mixin", packageName: "progress" },
        {
          name: "rmd-transition-standard-time",
          type: "variable",
          packageName: "transition",
        },
        {
          name: "rmd-linear-progress-transition-duration",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-short-animation-delay",
          type: "variable",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      code: "@mixin rmd-linear-progress-bar { … }",
      sourceCode:
        '@mixin rmd-linear-progress-bar {\n  &--horizontal {\n    @include rmd-utils-rtl-auto(left, 0);\n  }\n\n  &--horizontal-reverse {\n    @include rmd-utils-rtl-auto-group(\n      (\n        left: auto,\n        right: 0,\n      )\n    );\n  }\n\n  &--vertical {\n    bottom: 0;\n    left: 0;\n    right: 0;\n  }\n\n  &--vertical-reverse {\n    bottom: auto;\n    top: 0;\n  }\n\n  &--determinate {\n    @include rmd-linear-progress-bar-styles;\n  }\n\n  &--animate {\n    @include rmd-transition(sharp);\n\n    transition: width $rmd-transition-standard-time,\n      height $rmd-transition-standard-time;\n  }\n\n  &--indeterminate {\n    &::before,\n    &::after {\n      @include rmd-linear-progress-bar-styles;\n      @include rmd-transition(standard, true);\n      @include rmd-utils-rtl-auto-group(\n        (\n          left: 0,\n          right: 100%,\n        )\n      );\n\n      animation-duration: $rmd-linear-progress-transition-duration;\n      animation-iteration-count: infinite;\n      content: "";\n      will-change: left, right;\n    }\n\n    &::before {\n      animation-name: rmd-progress-bar;\n    }\n\n    &::after {\n      animation-delay: $rmd-linear-progress-short-animation-delay;\n      animation-name: rmd-progress-bar-short;\n    }\n  }\n\n  &--indeterminate-reverse {\n    &::before {\n      animation-name: rmd-progress-bar-reverse;\n    }\n\n    &::after {\n      animation-name: rmd-progress-bar-reverse-short;\n    }\n  }\n\n  &--indeterminate-vertical {\n    &::before,\n    &::after {\n      @include rmd-progress-theme(width, linear-size);\n\n      height: auto;\n      left: 0;\n      right: 0;\n    }\n\n    &::before {\n      animation-name: rmd-progress-bar-vertical;\n    }\n\n    &::after {\n      animation-name: rmd-progress-bar-vertical-short;\n    }\n  }\n\n  &--indeterminate-vertical-reverse {\n    &::before {\n      animation-name: rmd-progress-bar-vertical-reverse;\n    }\n\n    &::after {\n      animation-name: rmd-progress-bar-vertical-reverse-short;\n    }\n  }\n}\n',
      type: "mixin",
    },
    "rmd-linear-progress": {
      name: "rmd-linear-progress",
      description: "Creates the styles for the linear progress bar.\n",
      source: "packages/progress/src/_mixins.scss#L163-L216",
      usedBy: [
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      requires: [
        { name: "rmd-progress-theme", type: "mixin", packageName: "progress" },
        {
          name: "rmd-linear-progress-bar",
          type: "mixin",
          packageName: "progress",
        },
        {
          name: "rmd-progress-animation",
          type: "mixin",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-styles",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-short-styles",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-reverse-styles",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-reverse-short-styles",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-vertical-styles",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-vertical-short-styles",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-vertical-reverse-styles",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-linear-progress-vertical-reverse-short-styles",
          type: "variable",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      code: "@mixin rmd-linear-progress { … }",
      sourceCode:
        "@mixin rmd-linear-progress {\n  .rmd-linear-progress {\n    @include rmd-progress-theme(background-color);\n    @include rmd-progress-theme(height, linear-size);\n\n    display: block;\n    overflow: hidden;\n    position: relative;\n    width: 100%;\n\n    &--vertical {\n      @include rmd-progress-theme(width, linear-size);\n\n      display: inline-block;\n      height: auto;\n    }\n\n    &__bar {\n      @include rmd-linear-progress-bar;\n    }\n  }\n\n  @keyframes rmd-progress-bar {\n    @include rmd-progress-animation($rmd-linear-progress-styles);\n  }\n\n  @keyframes rmd-progress-bar-short {\n    @include rmd-progress-animation($rmd-linear-progress-short-styles);\n  }\n\n  @keyframes rmd-progress-bar-reverse {\n    @include rmd-progress-animation($rmd-linear-progress-reverse-styles);\n  }\n\n  @keyframes rmd-progress-bar-reverse-short {\n    @include rmd-progress-animation($rmd-linear-progress-reverse-short-styles);\n  }\n\n  @keyframes rmd-progress-bar-vertical {\n    @include rmd-progress-animation($rmd-linear-progress-vertical-styles);\n  }\n\n  @keyframes rmd-progress-bar-vertical-short {\n    @include rmd-progress-animation($rmd-linear-progress-vertical-short-styles);\n  }\n\n  @keyframes rmd-progress-bar-vertical-reverse {\n    @include rmd-progress-animation(\n      $rmd-linear-progress-vertical-reverse-styles\n    );\n  }\n\n  @keyframes rmd-progress-bar-vertical-reverse-short {\n    @include rmd-progress-animation(\n      $rmd-linear-progress-vertical-reverse-short-styles\n    );\n  }\n}\n",
      type: "mixin",
    },
    "rmd-circular-progress": {
      name: "rmd-circular-progress",
      description: "",
      source: "packages/progress/src/_mixins.scss#L219-L281",
      usedBy: [
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      requires: [
        { name: "rmd-progress-theme", type: "mixin", packageName: "progress" },
        { name: "rmd-transition", type: "mixin", packageName: "transition" },
        {
          name: "rmd-progress-animation",
          type: "mixin",
          packageName: "progress",
        },
        {
          name: "rmd-circular-progress-transition-duration",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-circular-progress-dasharray",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-circular-progress-rotate-styles",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-circular-progress-dash-styles",
          type: "variable",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      code: "@mixin rmd-circular-progress { … }",
      sourceCode:
        "@mixin rmd-circular-progress {\n  .rmd-circular-progress {\n    @include rmd-progress-theme(height, circular-size);\n    @include rmd-progress-theme(width, circular-size);\n\n    // add border radius and overflow-hidden so that different stroke-widths\n    // are still circular. For some reason it isn't always the case.\n    align-items: center;\n    border-radius: 50%;\n    display: inline-flex;\n    justify-content: center;\n    overflow: hidden;\n\n    &--centered {\n      display: flex;\n      margin-left: auto;\n      margin-right: auto;\n    }\n\n    &__svg {\n      height: inherit;\n      width: inherit;\n\n      &--animate {\n        @include rmd-transition(standard);\n\n        transition: transform 0.1s;\n      }\n\n      &--indeterminate {\n        animation: rmd-progress-rotate\n          $rmd-circular-progress-transition-duration linear infinite;\n      }\n    }\n\n    &__circle {\n      @include rmd-progress-theme(stroke, color);\n      @include rmd-progress-theme(stroke-width, circular-width);\n\n      fill: none;\n      stroke-dasharray: $rmd-circular-progress-dasharray;\n      stroke-linecap: round;\n\n      &--animate {\n        @include rmd-transition(standard);\n\n        transition: stroke-dashoffset 0.1s;\n      }\n\n      &--indeterminate {\n        animation: rmd-circular-progress-size\n          $rmd-circular-progress-transition-duration ease-in-out infinite;\n      }\n    }\n\n    @keyframes rmd-progress-rotate {\n      @include rmd-progress-animation($rmd-circular-progress-rotate-styles);\n    }\n\n    @keyframes rmd-circular-progress-size {\n      @include rmd-progress-animation($rmd-circular-progress-dash-styles);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "react-md-progress": {
      name: "react-md-progress",
      description: "Creates all the styles for the progress package.\n",
      source: "packages/progress/src/_mixins.scss#L284-L294",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      requires: [
        {
          name: "rmd-theme-create-root-theme",
          type: "mixin",
          packageName: "theme",
        },
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
        {
          name: "rmd-circular-progress",
          type: "mixin",
          packageName: "progress",
        },
        {
          name: "rmd-progress-theme-values",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-progress-include-linear",
          type: "variable",
          packageName: "progress",
        },
        {
          name: "rmd-progress-include-circular",
          type: "variable",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      code: "@mixin react-md-progress { … }",
      sourceCode:
        "@mixin react-md-progress {\n  @include rmd-theme-create-root-theme($rmd-progress-theme-values, progress);\n\n  @if $rmd-progress-include-linear {\n    @include rmd-linear-progress;\n  }\n\n  @if $rmd-progress-include-circular {\n    @include rmd-circular-progress;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-progress-include-linear": {
      name: "rmd-progress-include-linear",
      description:
        "Boolean if the linear progress bar styles should be created by default.\n",
      source: "packages/progress/src/_variables.scss#L10",
      usedBy: [
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-progress-include-circular": {
      name: "rmd-progress-include-circular",
      description:
        "Boolean if the circular progress bar styles should be created by default.\n",
      source: "packages/progress/src/_variables.scss#L14",
      usedBy: [
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-progress-color": {
      name: "rmd-progress-color",
      description:
        "This is the main color that should be used for the linear progress and the circular progress components.",
      source: "packages/progress/src/_variables.scss#L21",
      requires: [
        { name: "rmd-theme-primary", type: "variable", packageName: "theme" },
      ],
      packageName: "progress",
      type: "Color",
      value: "$rmd-theme-primary",
      compiled: "#9c27b0",
      overridable: true,
    },
    "rmd-progress-background-color": {
      name: "rmd-progress-background-color",
      description:
        "This is the background color that is used fot the linear progress only.  You normally want this color to be a bit ligher than the main progress color since it'll be underneath the main progress.",
      source: "packages/progress/src/_variables.scss#L30-L35",
      requires: [
        {
          name: "rmd-theme-get-swatch",
          type: "function",
          packageName: "theme",
        },
        { name: "rmd-theme-primary", type: "variable", packageName: "theme" },
      ],
      packageName: "progress",
      type: "Color",
      value:
        "rmd-theme-get-swatch(\n  $rmd-theme-primary,\n  300,\n  false,\n  rgba($rmd-theme-primary, 0.4)\n)",
      compiled: "#ba68c8",
      overridable: true,
    },
    "rmd-linear-progress-size": {
      name: "rmd-linear-progress-size",
      description:
        "This is the linear progress bar's height or the width when switched to vertical.\n",
      source: "packages/progress/src/_variables.scss#L40",
      packageName: "progress",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-linear-progress-transition-duration": {
      name: "rmd-linear-progress-transition-duration",
      description:
        "The transition duration for the entire linear progress animation. This one is much longer compared to other transitions since progress indicators are normally for longer running background tasks.\n",
      source: "packages/progress/src/_variables.scss#L46",
      usedBy: [
        {
          name: "rmd-linear-progress-bar",
          type: "mixin",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      type: "Number",
      value: "2.4s",
      overridable: true,
    },
    "rmd-linear-progress-short-animation-delay": {
      name: "rmd-linear-progress-short-animation-delay",
      description:
        "The delay before the second linear progress animation should start. This animation is for the very quick and smaller bar animation that will appear after the first transition is near the end.\n",
      source: "packages/progress/src/_variables.scss#L52",
      usedBy: [
        {
          name: "rmd-linear-progress-bar",
          type: "mixin",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      type: "Number",
      value: "0.75s",
      overridable: true,
    },
    "rmd-linear-progress-styles": {
      name: "rmd-linear-progress-styles",
      description:
        "The linear progress bar styles to apply for the transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L58-L71",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: -35%,\n    right: 100%,\n  ),\n  60%: (\n    left: 100%,\n    right: -90%,\n  ),\n  100%: (\n    left: 100%,\n    right: -90%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-short-styles": {
      name: "rmd-linear-progress-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L77-L90",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: -200%,\n    right: 100%,\n  ),\n  40%: (\n    left: 107%,\n    right: -8%,\n  ),\n  100%: (\n    left: 107%,\n    right: -8%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-reverse-styles": {
      name: "rmd-linear-progress-reverse-styles",
      description:
        "The linear progress bar styles to apply for the transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L96-L109",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: 100%,\n    right: -35%,\n  ),\n  60%: (\n    left: -90%,\n    right: 100%,\n  ),\n  100%: (\n    left: -90%,\n    right: 100%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-reverse-short-styles": {
      name: "rmd-linear-progress-reverse-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L115-L128",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: 100%,\n    right: -200%,\n  ),\n  40%: (\n    left: -8%,\n    right: 107%,\n  ),\n  100%: (\n    left: -8%,\n    right: 107%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-styles": {
      name: "rmd-linear-progress-vertical-styles",
      description:
        "The linear progress bar styles to apply for the vertical transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L134-L147",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: -35%,\n    top: 100%,\n  ),\n  60%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n  100%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-short-styles": {
      name: "rmd-linear-progress-vertical-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter vertical transition.\nEach key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L153-L166",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: -200%,\n    top: 100%,\n  ),\n  40%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n  100%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-reverse-styles": {
      name: "rmd-linear-progress-vertical-reverse-styles",
      description:
        "The linear progress bar styles to apply for the vertical transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L172-L185",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: 100%,\n    top: -35%,\n  ),\n  60%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n  100%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-reverse-short-styles": {
      name: "rmd-linear-progress-vertical-reverse-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter vertical transition.\nEach key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L191-L204",
      usedBy: [
        { name: "rmd-linear-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: 100%,\n    top: -200%,\n  ),\n  40%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n  100%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n)",
      overridable: true,
    },
    "rmd-circular-progress-size": {
      name: "rmd-circular-progress-size",
      description: "The size for the circular progress svg.\n",
      source: "packages/progress/src/_variables.scss#L208",
      packageName: "progress",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-circular-progress-stroke-width": {
      name: "rmd-circular-progress-stroke-width",
      description:
        "The stroke width for the circular svg. I wouldn't change this value unless you also update the `viewbox` for the `CircularProgress` component.\n",
      source: "packages/progress/src/_variables.scss#L213",
      packageName: "progress",
      type: "Number",
      value: "6",
      overridable: true,
    },
    "rmd-circular-progress-dasharray": {
      name: "rmd-circular-progress-dasharray",
      description:
        "The dasharray fro the circular svg. I don't really know how this works so good luck changing it to something else. If this value is changed, you'll aslo need to update the `dasharray` prop for the `CircularProgress` component.\n",
      source: "packages/progress/src/_variables.scss#L220",
      usedBy: [
        {
          name: "rmd-circular-progress",
          type: "mixin",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      type: "Number",
      value: "187",
      overridable: true,
    },
    "rmd-circular-progress-transition-duration": {
      name: "rmd-circular-progress-transition-duration",
      description:
        "The entire transition duration for the circular progress. This is really the full time for the change in the `stroke-dashoffset` as the default rotation will rotate `720deg` over this time.\n",
      source: "packages/progress/src/_variables.scss#L226",
      usedBy: [
        {
          name: "rmd-circular-progress",
          type: "mixin",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      type: "Number",
      value: "2.4s",
      overridable: true,
    },
    "rmd-circular-progress-start-offset": {
      name: "rmd-circular-progress-start-offset",
      description:
        "The starting dashoffset for the ciruclar progress animation. This will be used for the `0%` and `100%` values in the animation keyframes by default.\n",
      source: "packages/progress/src/_variables.scss#L231",
      packageName: "progress",
      type: "Number",
      value: "$rmd-circular-progress-dasharray",
      compiled: "187",
      overridable: true,
    },
    "rmd-circular-progress-end-offset": {
      name: "rmd-circular-progress-end-offset",
      description:
        "The ending dashoffset for the ciruclar progress animation. This will be used for the `50%` value in the animation keyframes by default.\n",
      source: "packages/progress/src/_variables.scss#L236",
      packageName: "progress",
      type: "Number",
      value: "$rmd-circular-progress-dasharray / 4",
      compiled: "46.75",
      overridable: true,
    },
    "rmd-circular-progress-rotate-styles": {
      name: "rmd-circular-progress-rotate-styles",
      description:
        "The circular progress styles to apply for the rotation transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L242-L255",
      usedBy: [
        {
          name: "rmd-circular-progress",
          type: "mixin",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    transform: rotate(0deg),\n  ),\n  50%: (\n    transform: rotate(135deg),\n  ),\n  75%: (\n    transform: rotate(450deg),\n  ),\n  100%: (\n    transform: rotate(720deg),\n  ),\n)",
      overridable: true,
    },
    "rmd-circular-progress-dash-styles": {
      name: "rmd-circular-progress-dash-styles",
      description:
        "The circular progress styles to apply for the dashoffset transition. Each key in this map will be set immediately at the root of the `keyframes` and then each child map will be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L261-L271",
      usedBy: [
        {
          name: "rmd-circular-progress",
          type: "mixin",
          packageName: "progress",
        },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    stroke-dashoffset: $rmd-circular-progress-start-offset,\n  ),\n  50%: (\n    stroke-dashoffset: $rmd-circular-progress-end-offset,\n  ),\n  100%: (\n    stroke-dashoffset: $rmd-circular-progress-start-offset,\n  ),\n)",
      compiled:
        "(\n  0%: (\n    stroke-dashoffset: 187,\n  ),\n  50%: (\n    stroke-dashoffset: 46.75,\n  ),\n  100%: (\n    stroke-dashoffset: 187,\n  ),\n)",
      overridable: true,
    },
    "rmd-progress-theme-values": {
      name: "rmd-progress-theme-values",
      description:
        'A Map of all the "themeable" parts of the progress package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/progress/src/_variables.scss#L277-L283",
      usedBy: [
        {
          name: "rmd-progress-theme",
          type: "function",
          packageName: "progress",
        },
        {
          name: "rmd-progress-theme-var",
          type: "function",
          packageName: "progress",
        },
        { name: "rmd-progress-theme", type: "mixin", packageName: "progress" },
        {
          name: "rmd-progress-theme-update-var",
          type: "mixin",
          packageName: "progress",
        },
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  color: $rmd-progress-color,\n  background-color: $rmd-progress-background-color,\n  linear-size: $rmd-linear-progress-size,\n  circular-size: $rmd-circular-progress-size,\n  circular-width: $rmd-circular-progress-stroke-width,\n)",
      compiled:
        "(\n  color: #9c27b0,\n  background-color: #ba68c8,\n  linear-size: 0.25rem,\n  circular-size: 3rem,\n  circular-width: 6,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
