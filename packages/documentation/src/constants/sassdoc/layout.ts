/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-layout-theme": {
      name: "rmd-layout-theme",
      description:
        "This function is used to quickly get one of the layout's theme values. This is really just for the `rmd-layout-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/layout/src/_functions.scss#L15-L17",
      packageName: "layout",
      code: "@function rmd-layout-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-layout-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-layout-theme-values,\n    layout\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-layout-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the layout's theme values.",
      },
    },
    "rmd-layout-theme-var": {
      name: "rmd-layout-theme-var",
      description:
        "This function is used to get one of the layout's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-layout-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/layout/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      code:
        "@function rmd-layout-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-layout-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-layout-theme-values,\n    layout,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-layout-theme-values` map keys to set a value for.",
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
        description: "one of the link's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-layout-theme": {
      name: "rmd-layout-theme",
      description:
        "Creates the styles for one of the layout's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/layout/src/_mixins.scss#L29-L31",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      code:
        "@mixin rmd-layout-theme($property, $theme-style: property, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-layout-theme($property, $theme-style: property, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-layout-theme-values,\n    layout\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-layout-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          default: "property",
          description:
            "One of the keys of `rmd-layout-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-layout-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-layout-theme-update-var": {
      name: "rmd-layout-theme-update-var",
      description:
        "Updates one of the layout's theme variables with the new value for the section of your app.",
      source: "packages/layout/src/_mixins.scss#L39-L41",
      packageName: "layout",
      code: "@mixin rmd-layout-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-layout-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-layout-theme-values,\n    layout\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The layout theme style type to update. This should be one of the `$rmd-layout-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "react-md-layout": {
      name: "react-md-layout",
      description: "Creates all the styles for the layout package.\n",
      source: "packages/layout/src/_mixins.scss#L44-L141",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "layout",
      code: "@mixin react-md-layout { … }",
      sourceCode:
        '@mixin react-md-layout {\n  // this is used for the title and main elements for animating their margin\n  // while the toggleable layout appears. it will use the same transition\n  // functions and time as the sheet so it all transitions together\n  .rmd-layout-transition {\n    &--enter {\n      @include rmd-transition(deceleration);\n\n      transition: margin $rmd-layout-enter-duration;\n    }\n\n    &--exit {\n      @include rmd-transition(acceleration);\n\n      transition: margin $rmd-layout-leave-duration;\n    }\n  }\n\n  .rmd-layout-nav {\n    z-index: $rmd-layout-navigation-z-index;\n\n    &--floating {\n      box-shadow: none;\n      background-color: transparent;\n    }\n\n    &--header-offset {\n      @include rmd-app-bar-offset(top);\n    }\n  }\n\n  .rmd-layout-title {\n    &--offset {\n      $margin: calc(\n        #{rmd-sheet-theme-var(static-width)} + #{$rmd-app-bar-keyline}\n      );\n\n      @include rmd-utils-rtl-auto(margin-left, $margin);\n    }\n  }\n\n  .rmd-layout-nav-toggle {\n    &--offset {\n      $nav-size: rmd-layout-theme-var(nav-width);\n      $icon-size: rmd-button-theme-var(icon-size);\n      $distance: calc(\n        #{$rmd-app-bar-title-nav-margin} + #{$nav-size} - #{$icon-size}\n      );\n\n      @include rmd-utils-rtl-auto(\n        margin-right,\n        $distance,\n        $rmd-app-bar-lr-margin\n      );\n    }\n  }\n\n  .rmd-layout-nav-header {\n    &--bordered {\n      @include rmd-divider-border(bottom);\n    }\n  }\n\n  .rmd-layout-main {\n    // going to replace the default focus outline with the custom box-shadow\n    // instead\n    @include rmd-utils-hide-focus-outline;\n\n    @include rmd-utils-keyboard-only {\n      @include rmd-transition-shadow-transition(\n        none,\n        $rmd-layout-main-focus-shadow,\n        "&:focus"\n      );\n\n      &::before {\n        // need to inherit the margin based for the offsets\n        margin: inherit;\n        position: fixed;\n        z-index: $rmd-layout-main-focus-z-index;\n      }\n    }\n\n    // need to polyfill for IE11 even though not 100% supported\n    display: block;\n    height: 100%;\n\n    &--header-offset {\n      @include rmd-app-bar-offset;\n\n      @include rmd-utils-keyboard-only {\n        &::before {\n          @include rmd-app-bar-offset(top);\n        }\n      }\n    }\n\n    &--nav-offset {\n      @include rmd-utils-rtl {\n        @include rmd-layout-theme(margin-right, nav-width);\n\n        margin-left: auto;\n      }\n\n      // might need to change to just left and right instead of margin-left and\n      // margin-right for some browser support\n      @include rmd-layout-theme(margin-left, nav-width);\n    }\n  }\n}\n',
      type: "mixin",
    },
  },
  variables: {
    "rmd-layout-enter-duration": {
      name: "rmd-layout-enter-duration",
      description:
        "The transition time for the toggleable navigation panel to come into view or expand to full width.",
      source: "packages/layout/src/_variables.scss#L14",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      type: "Number",
      value: "$rmd-sheet-enter-duration",
      compiled: "0.2s",
      overridable: true,
    },
    "rmd-layout-leave-duration": {
      name: "rmd-layout-leave-duration",
      description:
        "The transition time for the toggleable navigation panel to leave from view or shrink to the mini width.",
      source: "packages/layout/src/_variables.scss#L21",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      type: "Number",
      value: "$rmd-sheet-leave-duration",
      compiled: "0.15s",
      overridable: true,
    },
    "rmd-layout-main-focus-shadow": {
      name: "rmd-layout-main-focus-shadow",
      description:
        "The box-shadow to use when the `<main>` element has been keyboard focused from the `SkipToMainContent` link.",
      source: "packages/layout/src/_variables.scss#L28",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      type: "String",
      value: "$rmd-states-focus-shadow",
      compiled: "inset 0 0 0 0.125rem #2196f3",
      overridable: true,
    },
    "rmd-layout-main-focus-z-index": {
      name: "rmd-layout-main-focus-z-index",
      description:
        "The z-index to use for the `<main>` element when it is keyboard focused.\nThis z-index is just used so that it should appear over all elements.\n",
      source: "packages/layout/src/_variables.scss#L33",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      type: "Number",
      value: "999",
      overridable: true,
    },
    "rmd-layout-navigation-z-index": {
      name: "rmd-layout-navigation-z-index",
      description: "The z-index to use for the navigation pane (`Sheet`).",
      source: "packages/layout/src/_variables.scss#L39",
      usedBy: [
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "layout",
      type: "Number",
      value: "$rmd-app-bar-z-index + 20",
      compiled: "30",
      overridable: true,
    },
    "rmd-layout-navigation-width": {
      name: "rmd-layout-navigation-width",
      description: "The width to use for the desktop navigation tree.",
      source: "packages/layout/src/_variables.scss#L45",
      packageName: "layout",
      type: "Number",
      value: "$rmd-sheet-static-width",
      compiled: "16rem",
      overridable: true,
    },
    "rmd-layout-mini-navigation-width": {
      name: "rmd-layout-mini-navigation-width",
      description: "The width to use for the mini navigation tree.",
      source: "packages/layout/src/_variables.scss#L50",
      packageName: "layout",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-layout-theme-values": {
      name: "rmd-layout-theme-values",
      description: "A map of all the themeable parts of the layout package.\n",
      source: "packages/layout/src/_variables.scss#L54-L57",
      usedBy: [
        { name: "rmd-layout-theme", type: "function", packageName: "layout" },
        {
          name: "rmd-layout-theme-var",
          type: "function",
          packageName: "layout",
        },
        { name: "rmd-layout-theme", type: "mixin", packageName: "layout" },
        {
          name: "rmd-layout-theme-update-var",
          type: "mixin",
          packageName: "layout",
        },
      ],
      packageName: "layout",
      type: "Map",
      value:
        "(\n  nav-width: $rmd-layout-navigation-width,\n  mini-nav-width: $rmd-layout-mini-navigation-width,\n)",
      compiled: "(\n  nav-width: 16rem,\n  mini-nav-width: 4.5rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
