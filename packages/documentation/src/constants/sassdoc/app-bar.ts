/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-app-bar-theme": {
      name: "rmd-app-bar-theme",
      description:
        "This function is used to quickly get one of the app-bar's theme values. This is really just for the `rmd-app-bar-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/app-bar/src/_functions.scss#L15-L17",
      packageName: "app-bar",
      code: "@function rmd-app-bar-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-app-bar-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-app-bar-theme-values,\n    app-bar\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-app-bar-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the app-bar's theme values.",
      },
    },
    "rmd-app-bar-theme-var": {
      name: "rmd-app-bar-theme-var",
      description:
        "This function is used to get one of the app-bar's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-app-bar-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/app-bar/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "rmd-app-bar-fixed", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-dense-theme",
          type: "mixin",
          packageName: "app-bar",
        },
      ],
      packageName: "app-bar",
      code:
        "@function rmd-app-bar-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-app-bar-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-app-bar-theme-values,\n    app-bar,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-app-bar-theme-values` map keys to set a value for.",
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
        description: "one of the app-bar's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-app-bar-theme": {
      name: "rmd-app-bar-theme",
      description:
        "Creates the styles for one of the app-bar's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/app-bar/src/_mixins.scss#L24-L26",
      usedBy: [
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-offset", type: "mixin", packageName: "app-bar" },
        { name: "rmd-app-bar-offsets", type: "mixin", packageName: "app-bar" },
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
        { name: "rmd-layout-main", type: "mixin", packageName: "layout" },
      ],
      packageName: "app-bar",
      code:
        "@mixin rmd-app-bar-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-app-bar-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-app-bar-theme-values,\n    app-bar\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-app-bar-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-app-bar-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-app-bar-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-app-bar-theme-update-var": {
      name: "rmd-app-bar-theme-update-var",
      description:
        "Updates one of the app-bar's theme variables with the new value for the section of your app.",
      source: "packages/app-bar/src/_mixins.scss#L34-L36",
      usedBy: [
        { name: "rmd-app-bar-themes", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-dense-theme",
          type: "mixin",
          packageName: "app-bar",
        },
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
        { name: "rmd-theme-dark", type: "mixin", packageName: "theme" },
      ],
      packageName: "app-bar",
      code: "@mixin rmd-app-bar-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-app-bar-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-app-bar-theme-values,\n    app-bar\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The app-bar theme style type to update. This should be one of the `$rmd-app-bar-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-app-bar-fixed": {
      name: "rmd-app-bar-fixed",
      description:
        "Creates the styles for the `AppBar` component when it is fixed to the top or bottom of the page. This will create four classes:\n- `&--fixed`\n- `&--fixed-elevation`\n- `&--top`\n- `&--right`\n- `&--bottom`\n- `&--left`\n\nTo get the correct styles and positions for a fixed app bar, you will need to apply the `--fixed` class as well as the `--top` or `--bottom` to fix it to the top or bottom of the page. If the app bar should gain elevation, you should also apply the `--fixed-elevation` class. See the examples below for the different use cases.",
      source: "packages/app-bar/src/_mixins.scss#L67-L87",
      usedBy: [
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      examples: [
        {
          code: ".app-bar {\n  @include rmd-app-bar-fixed;\n}\n",
          compiled:
            ".app-bar--fixed {\n  --rmd-theme-surface: var(--rmd-app-bar-background-color, transparent);\n  left: 0;\n  position: fixed;\n  right: 0;\n  z-index: 10;\n}\n\n.app-bar--fixed-elevation {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n\n.app-bar--top {\n  top: 0;\n}\n\n.app-bar--right {\n  right: 0;\n}\n\n.app-bar--bottom {\n  bottom: 0;\n}\n\n.app-bar--left {\n  left: 0;\n}\n",
          type: "scss",
          description: "Simple Example",
        },
        {
          code:
            '<div class="app-bar app-bar--fixed app-bar--top">\n  An app-bar fixed to the top of the page.\n</div>\n\n<div class="app-bar app-bar--fixed app-bar--fixed-elevation app-bar--bottom">\n  An app-bar fixed to the bottom of the page with elevation\n</div>\n',
          type: "html",
          description: "Simple Example",
        },
      ],
      code: "@mixin rmd-app-bar-fixed { … }",
      sourceCode:
        "@mixin rmd-app-bar-fixed {\n  &--fixed {\n    @include rmd-theme-update-var(\n      surface,\n      rmd-app-bar-theme-var(background-color)\n    );\n\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: $rmd-app-bar-z-index;\n  }\n\n  &--fixed-elevation {\n    @include rmd-elevation($rmd-app-bar-fixed-elevation);\n  }\n\n  $positions: top right bottom left;\n  @each $position in $positions {\n    &--#{$position} {\n      #{$position}: 0;\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-app-bar-themes": {
      name: "rmd-app-bar-themes",
      description:
        "Creates the styles for different app bar themes. This will create 4 classes:\n- `--primary`\n- `--secondary`\n- `--default`\n\nThe primary and secondary suffixes will use the theme variables for generating the correct theme background color and text color on top of the theme color. The default suffix is used to create a third theme type with any colors that are provided.",
      source: "packages/app-bar/src/_mixins.scss#L119-L140",
      usedBy: [
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      examples: [
        {
          code:
            "$rmd-theme-primary: $rmd-blue-500;\n$rmd-theme-secondary: $rmd-pink-a-200;\n\n.app-bar {\n  @include rmd-app-bar-themes;\n}\n",
          compiled:
            ".app-bar {\n  background-color: var(--rmd-app-bar-background-color, transparent);\n  color: var(--rmd-app-bar-color, initial);\n}\n.app-bar--primary {\n  --rmd-app-bar-background-color: var(\n    --rmd-app-bar-primary,\n    var(--rmd-theme-primary, #9c27b0)\n  );\n  --rmd-app-bar-color: var(\n    --rmd-app-bar-on-primary,\n    var(--rmd-theme-on-primary, #000)\n  );\n}\n.app-bar--secondary {\n  --rmd-app-bar-background-color: var(\n    --rmd-app-bar-secondary,\n    var(--rmd-theme-secondary, #f50057)\n  );\n  --rmd-app-bar-color: var(\n    --rmd-app-bar-on-secondary,\n    var(--rmd-theme-on-secondary, #000)\n  );\n}\n.app-bar--default {\n  --rmd-app-bar-background-color: var(\n    --rmd-app-bar-default-background-color,\n    #f5f5f5\n  );\n  --rmd-app-bar-color: var(--rmd-app-bar-default-color, #000);\n}\n",
          type: "scss",
          description: "Simple Example",
        },
        {
          code:
            '<div class="app-bar app-bar--primary">\n  An app bar with the primary theme color as the background color.\n</div>\n\n<div class="app-bar app-bar--secondary">\n  An app bar with the secondary theme color as the background color.\n</div>\n\n<div class="app-bar app-bar--default">\n  An app bar with the default theme applied.\n</div>\n',
          type: "html",
          description: "Simple Example",
        },
      ],
      code: "@mixin rmd-app-bar-themes { … }",
      sourceCode:
        "@mixin rmd-app-bar-themes {\n  @include rmd-app-bar-theme(background-color);\n  @include rmd-app-bar-theme(color);\n\n  &--primary {\n    @include rmd-app-bar-theme-update-var(\n      background-color,\n      rmd-app-bar-theme-var(primary)\n    );\n    @include rmd-app-bar-theme-update-var(\n      color,\n      rmd-app-bar-theme-var(on-primary)\n    );\n  }\n\n  &--secondary {\n    @include rmd-app-bar-theme-update-var(\n      background-color,\n      rmd-app-bar-theme-var(secondary)\n    );\n    @include rmd-app-bar-theme-update-var(\n      color,\n      rmd-app-bar-theme-var(on-secondary)\n    );\n  }\n\n  &--default {\n    @include rmd-app-bar-theme-update-var(\n      background-color,\n      rmd-app-bar-theme-var(default-background-color)\n    );\n    @include rmd-app-bar-theme-update-var(\n      color,\n      rmd-app-bar-theme-var(default-color)\n    );\n  }\n}\n",
      type: "mixin",
    },
    "rmd-app-bar-nav": {
      name: "rmd-app-bar-nav",
      description:
        "Creates the styles for the `AppBarNav` component. The base classes for buttons next to be applied as well.",
      source: "packages/app-bar/src/_mixins.scss#L158-L170",
      usedBy: [
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      examples: [
        {
          code:
            ".app-bar__nav {\n  // add the next two lines if not applying the base .rmd-button classes\n  // @include rmd-button-base;\n  // @include rmd-button-text;\n  @include rmd-app-bar-nav;\n}\n",
          compiled:
            '.app-bar__nav {\n  margin-left: 0.25rem;\n  margin-right: 1.25rem;\n  flex-shrink: 0;\n}\n[dir="rtl"] .app-bar__nav {\n  margin-right: 0.25rem;\n  margin-left: 1.25rem;\n}\n.app-bar__nav--inherit {\n  color: inherit;\n}\n',
          type: "scss",
          description: "Simple Example",
        },
        {
          code:
            '<div class="app-bar app-bar--primary">\n  <button type="button" className="app-bar__nav">Nav Button</button>\n</div>\n',
          type: "html",
          description: "Simple Example",
        },
      ],
      code: "@mixin rmd-app-bar-nav { … }",
      sourceCode:
        "@mixin rmd-app-bar-nav {\n  @include rmd-utils-rtl-auto-group(\n    (\n      margin-left: $rmd-app-bar-lr-margin,\n      margin-right: $rmd-app-bar-title-nav-margin,\n    )\n  );\n  flex-shrink: 0;\n\n  &--inherit {\n    color: inherit;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-app-bar-title": {
      name: "rmd-app-bar-title",
      description: "Creates the styles for the `AppBarTitle` component.",
      source: "packages/app-bar/src/_mixins.scss#L178-L201",
      usedBy: [
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      examples: [
        {
          code: ".rmd-app-bar__title {\n  @include rmd-app-bar-title;\n}\n",
          compiled:
            '.rmd-app-bar__title {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.0125em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  margin-left: 1rem;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  margin-bottom: 0;\n  margin-top: 0;\n}\n[dir="rtl"] .rmd-app-bar__title {\n  margin-left: 0;\n  margin-right: 1rem;\n}\n.rmd-app-bar__title:focus {\n  outline-style: none;\n}\n.rmd-app-bar__title::-moz-focus-inner {\n  border: 0;\n}\n.rmd-app-bar__nav ~ .rmd-app-bar__title {\n  margin-left: 0;\n}\n[dir="rtl"] .rmd-app-bar__nav ~ .rmd-app-bar__title {\n  margin-left: 0;\n  margin-right: 0;\n}\n.rmd-app-bar__title--keyline {\n  margin-left: 4.5rem;\n}\n[dir="rtl"] .rmd-app-bar__title--keyline {\n  margin-left: auto;\n  margin-right: 4.5rem;\n}\n.rmd-app-bar__title--no-wrap {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.rmd-app-bar__title--inherit {\n  color: inherit;\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-app-bar-title { … }",
      sourceCode:
        "@mixin rmd-app-bar-title {\n  @include rmd-typography(headline-6);\n  @include rmd-utils-rtl-auto(margin-left, $rmd-app-bar-keyline);\n  @include rmd-utils-hide-focus-outline;\n\n  margin-bottom: 0;\n  margin-top: 0;\n\n  .rmd-app-bar__nav ~ & {\n    @include rmd-utils-rtl-auto(margin-left, 0);\n  }\n\n  &--keyline {\n    @include rmd-utils-rtl-auto(margin-left, $rmd-app-bar-title-keyline, auto);\n  }\n\n  &--no-wrap {\n    @include rmd-typography-text-overflow-ellipsis;\n  }\n\n  &--inherit {\n    color: inherit;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-app-bar-action-position": {
      name: "rmd-app-bar-action-position",
      description:
        "Creates the styles for an app bar action that is either the first action which applies margin-left to right align, or the default margin between each action.",
      source: "packages/app-bar/src/_mixins.scss#L209-L215",
      usedBy: [
        { name: "rmd-app-bar-action", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      code: "@mixin rmd-app-bar-action-position($first) { … }",
      sourceCode:
        "@mixin rmd-app-bar-action-position($first) {\n  @if $first {\n    @include rmd-utils-rtl-auto(margin-left, auto);\n  } @else {\n    @include rmd-utils-rtl-auto(margin-right, $rmd-app-bar-lr-margin);\n  }\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "Boolean",
          name: "first",
          description:
            "Boolean if the styles for being the first action should be created.",
        },
      ],
    },
    "rmd-app-bar-action": {
      name: "rmd-app-bar-action",
      description: "Creates the styles for the `AppBarAction` component.",
      source: "packages/app-bar/src/_mixins.scss#L223-L237",
      usedBy: [
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      examples: [
        {
          code: ".rmd-app-bar__action {\n  @include rmd-app-bar-action;\n}\n",
          compiled:
            '.rmd-app-bar__action {\n  flex-shrink: 0;\n}\n.rmd-app-bar__action--last {\n  margin-right: 0.25rem;\n}\n[dir="rtl"] .rmd-app-bar__action--last {\n  margin-right: 0;\n  margin-left: 0.25rem;\n}\n.rmd-app-bar__action--first {\n  margin-left: auto;\n}\n[dir="rtl"] .rmd-app-bar__action--first {\n  margin-left: 0;\n  margin-right: auto;\n}\n.rmd-app-bar__action--inherit {\n  color: inherit;\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-app-bar-action { … }",
      sourceCode:
        "@mixin rmd-app-bar-action {\n  flex-shrink: 0;\n\n  &--last {\n    @include rmd-app-bar-action-position(false);\n  }\n\n  &--first {\n    @include rmd-app-bar-action-position(true);\n  }\n\n  &--inherit {\n    color: inherit;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-app-bar-offset": {
      name: "rmd-app-bar-offset",
      description:
        "This mixin is used to apply an offset to an element so that it can be placed with a fixed App Bar. This is really used to help layout your app so that the initial content isn't covered by the app bar.\n\n @example scss - Example Usage\n   .offset-by-height {\n     @include rmd-app-bar-offset;\n   }\n\n   .offset-by-dense-height {\n     @include rmd-app-bar-ofset($height-type: dense-height);\n   }",
      source: "packages/app-bar/src/_mixins.scss#L258-L263",
      usedBy: [
        {
          name: "rmd-layout-app-bar-offset",
          type: "mixin",
          packageName: "layout",
        },
      ],
      packageName: "app-bar",
      code:
        "@mixin rmd-app-bar-offset($property: padding-top, $height-type: height) { … }",
      sourceCode:
        '@mixin rmd-app-bar-offset($property: padding-top, $height-type: height) {\n  $valid-propertys: (\n    padding-top padding-bottom margin-top margin-bottom top bottom\n  );\n  $property: rmd-utils-validate(\n    $valid-propertys,\n    $property,\n    "app bar offset property"\n  );\n\n  @include rmd-app-bar-theme($property, $height-type);\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          default: "padding-top",
          description:
            "The property to apply the offset to. This should be one of: `padding-top`, `padding-bottom`, `margin-top`,\n`margin-bottom`, `top`, `bottom`.",
        },
        {
          type: "String",
          name: "height-type",
          default: "height",
          description:
            "The app bar height type to use. This should be one of: `height`, `dense-height`, `prominent-height`,\n`prominent-dense-height`",
        },
      ],
    },
    "rmd-app-bar-offsets": {
      name: "rmd-app-bar-offsets",
      description:
        "Creates all the app  bar offset classnames to use. This ties in with the provided constants in javascript:\n\n- APP_BAR_OFFSET_CLASSNAME\n- APP_BAR_OFFSET_DENSE_CLASSNAME\n- APP_BAR_OFFSET_PROMINENT_CLASSNAME\n- APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME\n",
      source: "packages/app-bar/src/_mixins.scss#L272-L288",
      usedBy: [
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      code: "@mixin rmd-app-bar-offsets { … }",
      sourceCode:
        "@mixin rmd-app-bar-offsets {\n  .rmd-app-bar-offset {\n    @include rmd-app-bar-theme(padding-top, height);\n\n    &--dense {\n      @include rmd-app-bar-theme(padding-top, dense-height);\n    }\n\n    &--prominent {\n      @include rmd-app-bar-theme(padding-top, prominent-height);\n    }\n\n    &--prominent-dense {\n      @include rmd-app-bar-theme(padding-top, prominent-dense-height);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-app-bar-dense-theme": {
      name: "rmd-app-bar-dense-theme",
      description:
        "This mixin allows you to quickly apply the dense theme for app bars. This should normally be used within a media query.\n",
      source: "packages/app-bar/src/_mixins.scss#L292-L298",
      usedBy: [
        { name: "rmd-utils-dense", type: "mixin", packageName: "utils" },
      ],
      packageName: "app-bar",
      code: "@mixin rmd-app-bar-dense-theme { … }",
      sourceCode:
        "@mixin rmd-app-bar-dense-theme {\n  @include rmd-app-bar-theme-update-var(\n    height,\n    rmd-app-bar-theme-var(dense-height)\n  );\n  @include rmd-app-bar-theme-update-var(\n    prominent-height,\n    rmd-app-bar-theme-var(prominent-dense-height)\n  );\n}\n",
      type: "mixin",
    },
    "react-md-app-bar": {
      name: "react-md-app-bar",
      description: "Creates all the styles for the app bar package.\n",
      source: "packages/app-bar/src/_mixins.scss#L301-L351",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "app-bar",
      code: "@mixin react-md-app-bar { … }",
      sourceCode:
        "@mixin react-md-app-bar {\n  @include rmd-theme-create-root-theme($rmd-app-bar-theme-values, app-bar);\n\n  .rmd-app-bar {\n    @include rmd-app-bar-fixed;\n    @include rmd-app-bar-themes;\n\n    align-items: center;\n    display: flex;\n    // since app bars can appear a lot in full page dialogs, setting these flex\n    // values allows it be be a direct replacement of the `DialogHeader`\n    // component without all the offsets and additional styles needed for fixed\n    // app bars.\n    flex: 0 0 auto;\n    width: 100%;\n\n    &--wrap {\n      flex-wrap: wrap;\n    }\n\n    &--normal {\n      @include rmd-app-bar-theme(height);\n    }\n\n    &--dense {\n      @include rmd-app-bar-theme(height, dense-height);\n    }\n\n    &--prominent {\n      @include rmd-app-bar-theme(height, prominent-height);\n    }\n\n    &--prominent-dense {\n      @include rmd-app-bar-theme(height, prominent-dense-height);\n    }\n\n    &__nav {\n      @include rmd-app-bar-nav;\n    }\n\n    &__title {\n      @include rmd-app-bar-title;\n    }\n\n    &__action {\n      @include rmd-app-bar-action;\n    }\n  }\n\n  @include rmd-app-bar-offsets;\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-app-bar-z-index": {
      name: "rmd-app-bar-z-index",
      description:
        'The z-index to use for the fixed app bar. Ideally this value should be less than any of the "temporary" materials like overlays, sheets, and menus.\n',
      source: "packages/app-bar/src/_variables.scss#L13",
      usedBy: [
        { name: "rmd-app-bar-fixed", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "10",
      overridable: true,
    },
    "rmd-app-bar-fixed-elevation": {
      name: "rmd-app-bar-fixed-elevation",
      description:
        'The elevation to use for "fixed" app bars. This should be a number between 0 and 16.\n',
      source: "packages/app-bar/src/_variables.scss#L18",
      usedBy: [
        { name: "rmd-app-bar-fixed", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-app-bar-height": {
      name: "rmd-app-bar-height",
      description: "The height for the app bar.\n",
      source: "packages/app-bar/src/_variables.scss#L22",
      packageName: "app-bar",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-app-bar-dense-height": {
      name: "rmd-app-bar-dense-height",
      description: "The dense height for the app bar.\n",
      source: "packages/app-bar/src/_variables.scss#L26",
      packageName: "app-bar",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-app-bar-prominent-height": {
      name: "rmd-app-bar-prominent-height",
      description: "The prominent/extended height for the app bar.\n",
      source: "packages/app-bar/src/_variables.scss#L30",
      packageName: "app-bar",
      type: "Number",
      value: "$rmd-app-bar-height * 2",
      compiled: "7rem",
      overridable: true,
    },
    "rmd-app-bar-prominent-dense-height": {
      name: "rmd-app-bar-prominent-dense-height",
      description:
        "The prominent/extended height for the app bar when the `dense` prop is also enabled.\n",
      source: "packages/app-bar/src/_variables.scss#L35",
      packageName: "app-bar",
      type: "Number",
      value: "$rmd-app-bar-dense-height * 2",
      compiled: "6rem",
      overridable: true,
    },
    "rmd-app-bar-keyline": {
      name: "rmd-app-bar-keyline",
      description:
        "The default keyline to use for either the `AppBarNav` or `AppBarTitle`. This makes the icon in the `AppBarNav` or the first letter in the `AppBarTitle` appear at this distance.\n",
      source: "packages/app-bar/src/_variables.scss#L41",
      usedBy: [
        { name: "rmd-app-bar-title", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-app-bar-nav-margin": {
      name: "rmd-app-bar-nav-margin",
      description:
        "The amount of margin to apply to the `AppBarNav` based on the `$rmd-app-bar-keyline` so that the icon will be positioned at the keyline\n(ignoring the button padding).",
      source: "packages/app-bar/src/_variables.scss#L50",
      packageName: "app-bar",
      type: "Number",
      value:
        "$rmd-app-bar-keyline - (($rmd-button-icon-size - $rmd-icon-size) / 2)",
      compiled: "0.25rem",
      overridable: false,
    },
    "rmd-app-bar-title-keyline": {
      name: "rmd-app-bar-title-keyline",
      description:
        "The keyline for the `AppBarTitle` to use when used with the `AppBarNav` or the `offset` prop is enabled.\n",
      source: "packages/app-bar/src/_variables.scss#L55",
      usedBy: [
        { name: "rmd-app-bar-title", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-app-bar-title-nav-margin": {
      name: "rmd-app-bar-title-nav-margin",
      description:
        "The amount of margin to apply to the title when used with the `AppBarNav` component.",
      source: "packages/app-bar/src/_variables.scss#L62-L63",
      usedBy: [
        { name: "rmd-app-bar-nav", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Number",
      value:
        "$rmd-app-bar-title-keyline - $rmd-app-bar-nav-margin -\n  $rmd-button-icon-size",
      compiled: "1.25rem",
      overridable: false,
    },
    "rmd-app-bar-lr-margin": {
      name: "rmd-app-bar-lr-margin",
      description:
        "The amount of margin to apply to the first and last element within the app bar (per row basis). This will automatically be applied if using the `AppBarNav` component and will be applied to the `AppBarAction` component that enables the `last` prop.",
      source: "packages/app-bar/src/_variables.scss#L71",
      usedBy: [
        { name: "rmd-app-bar-nav", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-action-position",
          type: "mixin",
          packageName: "app-bar",
        },
      ],
      packageName: "app-bar",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-app-bar-primary-background-color": {
      name: "rmd-app-bar-primary-background-color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"primary"`.',
      source: "packages/app-bar/src/_variables.scss#L78",
      packageName: "app-bar",
      type: "Color",
      value: "rmd-theme-var(primary)",
      compiled: "var(--rmd-theme-primary, #9c27b0)",
      overridable: true,
    },
    "rmd-app-bar-primary-color": {
      name: "rmd-app-bar-primary-color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"primary"`.',
      source: "packages/app-bar/src/_variables.scss#L84",
      packageName: "app-bar",
      type: "Color",
      value: "rmd-theme-var(on-primary)",
      compiled: "var(--rmd-theme-on-primary, #000)",
      overridable: true,
    },
    "rmd-app-bar-secondary-background-color": {
      name: "rmd-app-bar-secondary-background-color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"secondary"`.',
      source: "packages/app-bar/src/_variables.scss#L91",
      packageName: "app-bar",
      type: "Color",
      value: "rmd-theme-var(secondary)",
      compiled: "var(--rmd-theme-secondary, #f50057)",
      overridable: true,
    },
    "rmd-app-bar-secondary-color": {
      name: "rmd-app-bar-secondary-color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"secondary"`.',
      source: "packages/app-bar/src/_variables.scss#L98",
      packageName: "app-bar",
      type: "Color",
      value: "rmd-theme-var(on-secondary)",
      compiled: "var(--rmd-theme-on-secondary, #000)",
      overridable: true,
    },
    "rmd-app-bar-default-light-theme-background-color": {
      name: "rmd-app-bar-default-light-theme-background-color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"default"` and the app is currently using a light theme.',
      source: "packages/app-bar/src/_variables.scss#L105",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "app-bar",
      type: "Color",
      value: "$rmd-grey-100",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-app-bar-default-light-theme-color": {
      name: "rmd-app-bar-default-light-theme-color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"default"` and the app is currently using a light theme.',
      source: "packages/app-bar/src/_variables.scss#L114-L118",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "app-bar",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-light-theme-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-app-bar-default-dark-theme-background-color": {
      name: "rmd-app-bar-default-dark-theme-background-color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"default"` and the app is currently using a dark theme.',
      source: "packages/app-bar/src/_variables.scss#L125",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "app-bar",
      type: "Color",
      value: "$rmd-grey-900",
      compiled: "#212121",
      overridable: true,
    },
    "rmd-app-bar-default-dark-theme-color": {
      name: "rmd-app-bar-default-dark-theme-color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"default"` and the app is currently using a dark theme.',
      source: "packages/app-bar/src/_variables.scss#L134-L138",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "app-bar",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-dark-theme-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-app-bar-default-background-color": {
      name: "rmd-app-bar-default-background-color",
      description:
        "The background color to use for the app bar that is using the `default` theme. This value is derived based on the current background color of the app for light or dark themed apps.",
      source: "packages/app-bar/src/_variables.scss#L146-L150",
      packageName: "app-bar",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-theme-background) == light,\n  $rmd-app-bar-default-light-theme-background-color,\n  $rmd-app-bar-default-dark-theme-background-color\n)",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-app-bar-default-color": {
      name: "rmd-app-bar-default-color",
      description:
        "The text color to use for the app bar that is using the `default` theme.\nThis value is derived based on the current background color of the app for light or dark themed apps.",
      source: "packages/app-bar/src/_variables.scss#L158-L162",
      packageName: "app-bar",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-background-color) == light,\n  $rmd-app-bar-default-light-theme-color,\n  $rmd-app-bar-default-dark-theme-color\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-app-bar-theme-values": {
      name: "rmd-app-bar-theme-values",
      description:
        'A Map of all the "themeable" parts of the app-bar package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/app-bar/src/_variables.scss#L168-L185",
      usedBy: [
        { name: "rmd-app-bar-theme", type: "function", packageName: "app-bar" },
        {
          name: "rmd-app-bar-theme-var",
          type: "function",
          packageName: "app-bar",
        },
        { name: "rmd-app-bar-theme", type: "mixin", packageName: "app-bar" },
        {
          name: "rmd-app-bar-theme-update-var",
          type: "mixin",
          packageName: "app-bar",
        },
        { name: "react-md-app-bar", type: "mixin", packageName: "app-bar" },
      ],
      packageName: "app-bar",
      type: "Map",
      value:
        "(\n  background-color: transparent,\n  color: initial,\n  primary: $rmd-app-bar-primary-background-color,\n  on-primary: $rmd-app-bar-primary-color,\n  secondary: $rmd-app-bar-secondary-background-color,\n  on-secondary: $rmd-app-bar-secondary-color,\n  default-background-color: $rmd-app-bar-default-background-color,\n  default-light-background-color: $rmd-app-bar-default-light-theme-background-color,\n  default-dark-background-color: $rmd-app-bar-default-dark-theme-background-color,\n  default-color: $rmd-app-bar-default-color,\n  default-light-color: $rmd-app-bar-default-light-theme-color,\n  default-dark-color: $rmd-app-bar-default-dark-theme-color,\n  height: $rmd-app-bar-height,\n  dense-height: $rmd-app-bar-dense-height,\n  prominent-height: $rmd-app-bar-prominent-height,\n  prominent-dense-height: $rmd-app-bar-prominent-dense-height,\n)",
      compiled:
        "(\n  background-color: transparent,\n  color: initial,\n  primary: var(--rmd-theme-primary, #9c27b0),\n  on-primary: var(--rmd-theme-on-primary, #000),\n  secondary: var(--rmd-theme-secondary, #f50057),\n  on-secondary: var(--rmd-theme-on-secondary, #000),\n  default-background-color: #f5f5f5,\n  default-light-background-color: #f5f5f5,\n  default-dark-background-color: #212121,\n  default-color: #000,\n  default-light-color: #000,\n  default-dark-color: #fff,\n  height: 3.5rem,\n  dense-height: 3rem,\n  prominent-height: 7rem,\n  prominent-dense-height: 6rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
