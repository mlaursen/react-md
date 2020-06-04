/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-button-theme": {
      name: "rmd-button-theme",
      description:
        "This function is used to quickly get one of the button's theme values. This is really just for the `rmd-button-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/button/src/_functions.scss#L15-L17",
      packageName: "button",
      code: "@function rmd-button-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-button-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-button-theme-values,\n    button\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-button-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the button's theme values.",
      },
    },
    "rmd-button-theme-var": {
      name: "rmd-button-theme-var",
      description:
        "This function is used to get one of the button's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-button-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/button/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "react-md-layout", type: "mixin", packageName: "layout" },
      ],
      packageName: "button",
      code:
        "@function rmd-button-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-button-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-button-theme-values,\n    button,\n    $fallback\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-button-theme-values` map keys to set a value for.",
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
        description: "one of the button's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-button-theme": {
      name: "rmd-button-theme",
      description:
        "Creates the styles for one of the button's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/button/src/_mixins.scss#L29-L31",
      usedBy: [
        { name: "rmd-button-base", type: "mixin", packageName: "button" },
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-button-icon", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      code:
        "@mixin rmd-button-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-button-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-button-theme-values,\n    button\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-button-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-button-theme-values` to extract a value from.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-button-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-button-theme-update-var": {
      name: "rmd-button-theme-update-var",
      description:
        "Updates one of the button's theme variables with the new value for the section of your app.",
      source: "packages/button/src/_mixins.scss#L39-L41",
      packageName: "button",
      code: "@mixin rmd-button-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-button-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-button-theme-values,\n    button\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The button theme style type to update. This should be one of the `$rmd-button-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-button-reset": {
      name: "rmd-button-reset",
      description:
        "A simple mixin to remove most of the styles for a button and reset them to be clear.\n\nNOTE: An reset button removed the `outline-style` so you *must* add a custom focus behavior with either ripples or something else for keyboard users.",
      source: "packages/button/src/_mixins.scss#L57-L62",
      usedBy: [
        { name: "rmd-button-unstyled", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      examples: [
        {
          code:
            ".my-button {\n  @include rmd-button-reset;\n  @include rmd-typography(button);\n\n  display: inline-flex;\n}\n",
          compiled:
            ".my-button {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background-color: transparent;\n  border-width: 0;\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  display: inline-flex;\n}\n.my-button:focus {\n  outline-style: none;\n}\n.my-button::-moz-focus-inner {\n  border: 0;\n}\n",
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-button-reset { … }",
      sourceCode:
        "@mixin rmd-button-reset {\n  @include rmd-utils-hide-focus-outline;\n\n  background-color: transparent;\n  border-width: 0;\n}\n",
      type: "mixin",
    },
    "rmd-button-base": {
      name: "rmd-button-base",
      description: "The base styles for a button.",
      source: "packages/button/src/_mixins.scss#L70-L80",
      packageName: "button",
      examples: [
        {
          code: ".my-button {\n  @include rmd-button-base;\n}\n",
          compiled:
            ".my-button {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background-color: var(--rmd-button-background-color, transparent);\n  color: var(\n    --rmd-button-color,\n    var(--rmd-theme-text-primary-on-background, #212121)\n  );\n  align-items: center;\n  border-width: 0;\n  display: inline-flex;\n  justify-content: center;\n  position: relative;\n}\n.my-button:focus {\n  outline-style: none;\n}\n.my-button::-moz-focus-inner {\n  border: 0;\n}\n",
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-button-base { … }",
      sourceCode:
        "@mixin rmd-button-base {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-button-theme(background-color);\n  @include rmd-button-theme(color);\n\n  align-items: center;\n  border-width: 0;\n  display: inline-flex;\n  justify-content: center;\n  position: relative;\n}\n",
      type: "mixin",
    },
    "rmd-button-text": {
      name: "rmd-button-text",
      description: "Creates the base styles for a text button.\n",
      source: "packages/button/src/_mixins.scss#L83-L99",
      packageName: "button",
      code: "@mixin rmd-button-text { … }",
      sourceCode:
        "@mixin rmd-button-text {\n  @include rmd-typography(button);\n\n  // icons have smaller sizes due to the padding on buttons. This is also not\n  // applied below in the rmd-button__icon since a user of this library _could_\n  // include the icon styles after the button styles which would prevent these\n  // styles from working\n  @if $rmd-icon-use-font-icons or $rmd-icon-use-svg-icons {\n    @include rmd-icon-theme-update-var(size, $rmd-button-text-icon-size);\n  }\n\n  @include rmd-button-theme(border-radius, text-border-radius);\n  @include rmd-button-theme(min-height, text-height);\n  @include rmd-button-theme(min-width, text-min-width);\n\n  padding: rmd-button-theme-var(text-vertical-padding)\n    rmd-button-theme-var(text-horizontal-padding);\n}\n",
      type: "mixin",
    },
    "rmd-button-icon": {
      name: "rmd-button-icon",
      description: "Creates the base styles for an icon button.\n",
      source: "packages/button/src/_mixins.scss#L102-L112",
      packageName: "button",
      code: "@mixin rmd-button-icon { … }",
      sourceCode:
        "@mixin rmd-button-icon {\n  @if not $rmd-button-text-icon-inherit-color {\n    @include rmd-icon-theme-update-var(color, currentColor);\n  }\n\n  @include rmd-button-theme(border-radius, icon-border-radius);\n  @include rmd-button-theme(height, icon-size);\n  @include rmd-button-theme(width, icon-size);\n\n  padding: 0;\n}\n",
      type: "mixin",
    },
    "rmd-button-unstyled": {
      name: "rmd-button-unstyled",
      description: "Creates all the styles for an unstyled button.\n",
      source: "packages/button/src/_mixins.scss#L198-L208",
      usedBy: [
        { name: "react-md-button", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      code: "@mixin rmd-button-unstyled { … }",
      sourceCode:
        "@mixin rmd-button-unstyled {\n  @include rmd-button-reset;\n  @include rmd-states-focus-shadow($create-pseudo: true);\n\n  display: inline-flex;\n  position: relative;\n\n  &:not(:disabled):hover {\n    cursor: pointer;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-button-floating-positions": {
      name: "rmd-button-floating-positions",
      description: "Creates the styles for all the floating button positions.",
      source: "packages/button/src/_mixins.scss#L214-L226",
      usedBy: [{ name: "rmd-fab", type: "mixin", packageName: "button" }],
      packageName: "button",
      code: "@mixin rmd-button-floating-positions { … }",
      sourceCode:
        "@mixin rmd-button-floating-positions {\n  @each $name, $styles in $rmd-button-floating-positions {\n    &--#{$name} {\n      @each $property, $value in $styles {\n        @if $property == left or $property == right {\n          @include rmd-utils-rtl-auto($property, $value);\n        } @else {\n          #{$property}: #{$value};\n        }\n      }\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-fab": {
      name: "rmd-fab",
      description:
        "Creates the styles for the floating action button container. `FAB`\n",
      source: "packages/button/src/_mixins.scss#L229-L234",
      usedBy: [
        { name: "react-md-button", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      code: "@mixin rmd-fab { … }",
      sourceCode:
        "@mixin rmd-fab {\n  @include rmd-button-floating-positions;\n\n  position: fixed;\n  z-index: $rmd-button-floating-z-index;\n}\n",
      type: "mixin",
    },
    "react-md-button": {
      name: "react-md-button",
      description:
        "Creates all the styles for this package as well as defining all the theme CSS variables.\n",
      source: "packages/button/src/_mixins.scss#L238-L254",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "button",
      code: "@mixin react-md-button { … }",
      sourceCode:
        "@mixin react-md-button {\n  @include rmd-theme-create-root-theme($rmd-button-theme-values, button);\n\n  .rmd-button {\n    @include rmd-button;\n  }\n\n  .rmd-button-unstyled {\n    @include rmd-button-unstyled;\n  }\n\n  @if $rmd-button-floating-positions {\n    .rmd-fab {\n      @include rmd-fab;\n    }\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-button-text-icon-inherit-color": {
      name: "rmd-button-text-icon-inherit-color",
      description:
        "Boolean if text buttons with icons should have the icons inherit the current color. If this is disabled, only icon buttons will inherit the current text color.\n",
      source: "packages/button/src/_variables.scss#L14",
      usedBy: [
        { name: "rmd-button-icon", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-button-text-border-radius": {
      name: "rmd-button-text-border-radius",
      description: "The border radius to apply to text buttons.\n",
      source: "packages/button/src/_variables.scss#L18",
      packageName: "button",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-button-text-horizontal-padding": {
      name: "rmd-button-text-horizontal-padding",
      description:
        "The amount of left and right padding to apply to text buttons.\n",
      source: "packages/button/src/_variables.scss#L22",
      packageName: "button",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-button-text-vertical-padding": {
      name: "rmd-button-text-vertical-padding",
      description:
        "The amount of top and bottom padding to apply to text buttons. Since buttons are now displayed as inline-flex, it is generally recommended to keep this value at 0 and just increase the height of the button instead.",
      source: "packages/button/src/_variables.scss#L29",
      packageName: "button",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-button-text-height": {
      name: "rmd-button-text-height",
      description: "The height for text buttons.\n",
      source: "packages/button/src/_variables.scss#L33",
      packageName: "button",
      type: "Number",
      value: "2.25rem",
      overridable: true,
    },
    "rmd-button-text-min-width": {
      name: "rmd-button-text-min-width",
      description: "The min width for text buttons.\n",
      source: "packages/button/src/_variables.scss#L37",
      packageName: "button",
      type: "Number",
      value: "4rem",
      overridable: true,
    },
    "rmd-button-text-icon-size": {
      name: "rmd-button-text-icon-size",
      description:
        "The text button's icon size. This is smaller than the normal icon size by default since buttons have additional padding. You can set this to `null` if you want consistent icon sizes.\n",
      source: "packages/button/src/_variables.scss#L43",
      usedBy: [
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      type: "Number",
      value: "1.125rem",
      overridable: true,
    },
    "rmd-button-icon-border-radius": {
      name: "rmd-button-icon-border-radius",
      description: "The border radius to apply to all icon buttons.\n",
      source: "packages/button/src/_variables.scss#L47",
      packageName: "button",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-button-icon-size": {
      name: "rmd-button-icon-size",
      description: "The height and width to apply to an icon button.\n",
      source: "packages/button/src/_variables.scss#L51",
      usedBy: [
        {
          name: "rmd-app-bar-nav-margin",
          type: "variable",
          packageName: "app-bar",
        },
        {
          name: "rmd-app-bar-title-nav-margin",
          type: "variable",
          packageName: "app-bar",
        },
      ],
      packageName: "button",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-button-outline-width": {
      name: "rmd-button-outline-width",
      description: "The base box-shadow width to apply to buttons\n",
      source: "packages/button/src/_variables.scss#L55",
      packageName: "button",
      type: "Number",
      value: "1px",
      overridable: true,
    },
    "rmd-button-box-shadow": {
      name: "rmd-button-box-shadow",
      description:
        "The base box-shadow to apply to buttons when outlined. This will normally be used along with a color variable to define a box shadow.\n",
      source: "packages/button/src/_variables.scss#L60",
      packageName: "button",
      type: "String",
      value: "inset 0 0 0",
      overridable: true,
    },
    "rmd-button-outline-color": {
      name: "rmd-button-outline-color",
      description:
        "This is the color that will be applied to the box-shadow/border for the button when the `outline` theme type is applied **unless** one of the theme values are defined.\n",
      source: "packages/button/src/_variables.scss#L66",
      packageName: "button",
      type: "Color",
      value: "#999",
      overridable: true,
    },
    "rmd-button-background-color": {
      name: "rmd-button-background-color",
      description:
        'This is the background color that will be applied when the theme type prop on buttons is set to "clear".\n',
      source: "packages/button/src/_variables.scss#L71",
      packageName: "button",
      type: "Color",
      value: "transparent",
      overridable: true,
    },
    "rmd-button-color": {
      name: "rmd-button-color",
      description:
        'This is the text color that will be applied when the theme type prop on buttons is set to "clear".',
      source: "packages/button/src/_variables.scss#L78",
      packageName: "button",
      type: "Color",
      value: "rmd-theme-var(text-primary-on-background)",
      compiled: "var(--rmd-theme-text-primary-on-background, #212121)",
      overridable: true,
    },
    "rmd-button-contained-elevation-transition-time": {
      name: "rmd-button-contained-elevation-transition-time",
      description:
        "The transition time for a contained button to raise to the pressed elevation.\n",
      source: "packages/button/src/_variables.scss#L83",
      packageName: "button",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-button-contained-resting-elevation": {
      name: "rmd-button-contained-resting-elevation",
      description:
        "The elevation to use for a resting contained button. This should be a number between 0 and 24.\n",
      source: "packages/button/src/_variables.scss#L88",
      packageName: "button",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-button-contained-pressed-elevation": {
      name: "rmd-button-contained-pressed-elevation",
      description:
        "The elevation to use for a contained button that is being pressed. This should be a number between 0 and 24.\n",
      source: "packages/button/src/_variables.scss#L93",
      packageName: "button",
      type: "Number",
      value: "4",
      overridable: true,
    },
    "rmd-button-floating-z-index": {
      name: "rmd-button-floating-z-index",
      description: "The z-index to use for the floating action button.",
      source: "packages/button/src/_variables.scss#L99",
      usedBy: [
        {
          name: "rmd-button-floating-positions",
          type: "mixin",
          packageName: "button",
        },
        { name: "rmd-fab", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      type: "Number",
      value: "$rmd-utils-temporary-element-z-index",
      compiled: "30",
      overridable: true,
    },
    "rmd-button-floating-margin": {
      name: "rmd-button-floating-margin",
      description:
        "The default page margin to use for the floating action button positions.",
      source: "packages/button/src/_variables.scss#L104",
      packageName: "button",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-button-floating-positions": {
      name: "rmd-button-floating-positions",
      description:
        "A Map of floating position styles to create. Each key will be made into a className by `&--floating-#{$key}` and each value will parsed as a style map. If you want to remove positions, override this variable with only the required styles.",
      source: "packages/button/src/_variables.scss#L112-L129",
      usedBy: [
        {
          name: "rmd-button-floating-positions",
          type: "mixin",
          packageName: "button",
        },
        { name: "react-md-button", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      type: "Map",
      value:
        "(\n  tl: (\n    left: $rmd-button-floating-margin,\n    top: $rmd-button-floating-margin,\n  ),\n  tr: (\n    right: $rmd-button-floating-margin,\n    top: $rmd-button-floating-margin,\n  ),\n  bl: (\n    bottom: $rmd-button-floating-margin,\n    left: $rmd-button-floating-margin,\n  ),\n  br: (\n    bottom: $rmd-button-floating-margin,\n    right: $rmd-button-floating-margin,\n  ),\n)",
      compiled:
        "(\n  tl: (\n    left: 1.5rem,\n    top: 1.5rem,\n  ),\n  tr: (\n    right: 1.5rem,\n    top: 1.5rem,\n  ),\n  bl: (\n    bottom: 1.5rem,\n    left: 1.5rem,\n  ),\n  br: (\n    bottom: 1.5rem,\n    right: 1.5rem,\n  ),\n)",
      overridable: true,
    },
    "rmd-button-theme-values": {
      name: "rmd-button-theme-values",
      description:
        'A Map of all the "themeable" parts of the button package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/button/src/_variables.scss#L135-L147",
      usedBy: [
        { name: "rmd-button-theme", type: "function", packageName: "button" },
        {
          name: "rmd-button-theme-var",
          type: "function",
          packageName: "button",
        },
        { name: "rmd-button-theme", type: "mixin", packageName: "button" },
        {
          name: "rmd-button-theme-update-var",
          type: "mixin",
          packageName: "button",
        },
        { name: "react-md-button", type: "mixin", packageName: "button" },
      ],
      packageName: "button",
      type: "Map",
      value:
        "(\n  text-border-radius: $rmd-button-text-border-radius,\n  text-horizontal-padding: $rmd-button-text-horizontal-padding,\n  text-vertical-padding: $rmd-button-text-vertical-padding,\n  text-height: $rmd-button-text-height,\n  text-min-width: $rmd-button-text-min-width,\n  icon-border-radius: $rmd-button-icon-border-radius,\n  icon-size: $rmd-button-icon-size,\n  background-color: $rmd-button-background-color,\n  color: $rmd-button-color,\n  outline: $rmd-button-outline-color,\n  outline-width: $rmd-button-outline-width,\n)",
      compiled:
        "(\n  text-border-radius: 0.5rem,\n  text-horizontal-padding: 1rem,\n  text-vertical-padding: 0,\n  text-height: 2.25rem,\n  text-min-width: 4rem,\n  icon-border-radius: 50%,\n  icon-size: 3rem,\n  background-color: transparent,\n  color: var(--rmd-theme-text-primary-on-background, #212121),\n  outline: #999,\n  outline-width: 1px,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
