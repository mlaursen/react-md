/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-button-theme": {
      name: "rmd-button-theme",
      description:
        "This function is used to quickly get one of the button's theme values. This is really\njust for the `rmd-button-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/button/src/_functions.scss#L14-L16",
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
        "This function is used to get one of the button's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-button-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/button/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
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
        "Creates the styles for one of the button's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      source: "packages/button/src/_mixins.scss#L26-L28",
      usedBy: [
        { name: "rmd-button-base", type: "mixin", packageName: "button" },
        { name: "rmd-button-base", type: "mixin", packageName: "button" },
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-button-icon", type: "mixin", packageName: "button" },
        { name: "rmd-button-icon", type: "mixin", packageName: "button" },
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
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-button-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-button-theme-update-var": {
      name: "rmd-button-theme-update-var",
      description:
        "Updates one of the button's theme variables with the new value for the section\nof your app.\n\n",
      source: "packages/button/src/_mixins.scss#L36-L38",
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
            "The button theme style type to update. This should be one\n  of the `$rmd-button-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-button-unstyled": {
      name: "rmd-button-unstyled",
      description:
        "A simple mixin to create an unstyled button.\n\nNOTE: An unstyled button removed the `outline-style` so you *must* add a custom focus behavior with\neither ripples or something else for keyboard users.\n\n",
      source: "packages/button/src/_mixins.scss#L52-L57",
      packageName: "button",
      examples: [
        {
          code:
            ".my-button {\n  @include rmd-button-unstyled;\n  @include rmd-typography(button);\n\n  display: inline-flex;\n}\n",
          compiled:
            ".my-button {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background-color: transparent;\n  border-width: 0;\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  display: inline-flex;\n}\n.my-button:focus {\n  outline-style: none;\n}\n.my-button::-moz-focus-inner {\n  border: 0;\n}\n",
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-button-unstyled { … }",
      sourceCode:
        "@mixin rmd-button-unstyled {\n  @include rmd-utils-hide-focus-outline;\n\n  background-color: transparent;\n  border-width: 0;\n}\n",
      type: "mixin",
    },
    "rmd-button-base": {
      name: "rmd-button-base",
      description: "The base styles for a button.\n\n",
      source: "packages/button/src/_mixins.scss#L65-L75",
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
      source: "packages/button/src/_mixins.scss#L78-L93",
      packageName: "button",
      code: "@mixin rmd-button-text { … }",
      sourceCode:
        "@mixin rmd-button-text {\n  @include rmd-typography(button);\n\n  // icons have smaller sizes due to the padding on buttons. This is also not applied\n  // below in the rmd-button__icon since a user of this library _could_ include the icon styles\n  // after the button styles which would prevent these styles from working\n  @if $rmd-icon-use-font-icons or $rmd-icon-use-svg-icons {\n    @include rmd-icon-theme-update-var(size, $rmd-button-text-icon-size);\n  }\n\n  @include rmd-button-theme(border-radius, text-border-radius);\n  @include rmd-button-theme(min-height, text-height);\n  @include rmd-button-theme(min-width, text-min-width);\n\n  padding: rmd-button-theme-var(text-vertical-padding)\n    rmd-button-theme-var(text-horizontal-padding);\n}\n",
      type: "mixin",
    },
    "rmd-button-icon": {
      name: "rmd-button-icon",
      description: "Creates the base styles for an icon button.\n",
      source: "packages/button/src/_mixins.scss#L96-L106",
      packageName: "button",
      code: "@mixin rmd-button-icon { … }",
      sourceCode:
        "@mixin rmd-button-icon {\n  @if not $rmd-button-text-icon-inherit-color {\n    @include rmd-icon-theme-update-var(color, currentColor);\n  }\n\n  @include rmd-button-theme(border-radius, icon-border-radius);\n  @include rmd-button-theme(height, icon-size);\n  @include rmd-button-theme(width, icon-size);\n\n  padding: 0;\n}\n",
      type: "mixin",
    },
    "react-md-button": {
      name: "react-md-button",
      description:
        "Creates all the styles for this package as well as defining all the theme CSS variables.\n",
      source: "packages/button/src/_mixins.scss#L191-L197",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "button",
      code: "@mixin react-md-button { … }",
      sourceCode:
        "@mixin react-md-button {\n  @include rmd-theme-create-root-theme($rmd-button-theme-values, button);\n\n  .rmd-button {\n    @include rmd-button;\n  }\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-button-text-icon-inherit-color": {
      name: "rmd-button-text-icon-inherit-color",
      description:
        "Boolean if text buttons with icons should have the icons inherit\nthe current color. If this is disabled, only icon buttons will\ninherit the current text color.\n",
      source: "packages/button/src/_variables.scss#L13",
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
      source: "packages/button/src/_variables.scss#L17",
      packageName: "button",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-button-text-horizontal-padding": {
      name: "rmd-button-text-horizontal-padding",
      description:
        "The amount of left and right padding to apply to text buttons.\n",
      source: "packages/button/src/_variables.scss#L21",
      packageName: "button",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-button-text-vertical-padding": {
      name: "rmd-button-text-vertical-padding",
      description:
        "The amount of top and bottom padding to apply to text buttons. Since buttons\nare now displayed as inline-flex, it is generally recommended to keep this value\nat 0 and just increase the height of the button instead.\n\n",
      source: "packages/button/src/_variables.scss#L28",
      packageName: "button",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-button-text-height": {
      name: "rmd-button-text-height",
      description: "The height for text buttons.\n",
      source: "packages/button/src/_variables.scss#L32",
      packageName: "button",
      type: "Number",
      value: "2.25rem",
      overridable: true,
    },
    "rmd-button-text-min-width": {
      name: "rmd-button-text-min-width",
      description: "The min width for text buttons.\n",
      source: "packages/button/src/_variables.scss#L36",
      packageName: "button",
      type: "Number",
      value: "4rem",
      overridable: true,
    },
    "rmd-button-text-icon-size": {
      name: "rmd-button-text-icon-size",
      description:
        "The text button's icon size. This is smaller than the normal icon size by default since buttons\nhave additional padding. You can set this to `null` if you want consistent icon sizes.\n",
      source: "packages/button/src/_variables.scss#L41",
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
      source: "packages/button/src/_variables.scss#L45",
      packageName: "button",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-button-icon-size": {
      name: "rmd-button-icon-size",
      description: "The height and width to apply to an icon button.\n",
      source: "packages/button/src/_variables.scss#L49",
      packageName: "button",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-button-outline-width": {
      name: "rmd-button-outline-width",
      description: "The base box-shadow width to apply to buttons\n",
      source: "packages/button/src/_variables.scss#L53",
      packageName: "button",
      type: "Number",
      value: "1px",
      overridable: true,
    },
    "rmd-button-box-shadow": {
      name: "rmd-button-box-shadow",
      description:
        "The base box-shadow to apply to buttons when outlined. This will normally be used along with a color variable\nto define a box shadow.\n",
      source: "packages/button/src/_variables.scss#L58",
      packageName: "button",
      type: "String",
      value: "inset 0 0 0",
      overridable: true,
    },
    "rmd-button-outline-color": {
      name: "rmd-button-outline-color",
      description:
        "This is the color that will be applied to the box-shadow/border for the button\nwhen the `outline` theme type is applied **unless** one of the theme values are\ndefined.\n",
      source: "packages/button/src/_variables.scss#L64",
      packageName: "button",
      type: "Color",
      value: "#999",
      overridable: true,
    },
    "rmd-button-background-color": {
      name: "rmd-button-background-color",
      description:
        'This is the background color that will be applied when the theme type prop\non buttons is set to "clear".\n',
      source: "packages/button/src/_variables.scss#L69",
      packageName: "button",
      type: "Color",
      value: "transparent",
      overridable: true,
    },
    "rmd-button-color": {
      name: "rmd-button-color",
      description:
        'This is the text color that will be applied when the theme type prop\non buttons is set to "clear".\n',
      source: "packages/button/src/_variables.scss#L74",
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
      source: "packages/button/src/_variables.scss#L78",
      packageName: "button",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-button-contained-resting-elevation": {
      name: "rmd-button-contained-resting-elevation",
      description:
        "The elevation to use for a resting contained button. This should be a number between\n0 and 24.\n",
      source: "packages/button/src/_variables.scss#L83",
      packageName: "button",
      type: "Number",
      value: "2",
      overridable: true,
    },
    "rmd-button-contained-pressed-elevation": {
      name: "rmd-button-contained-pressed-elevation",
      description:
        "The elevation to use for a contained button that is being pressed. This should be a number\nbetween 0 and 24.\n",
      source: "packages/button/src/_variables.scss#L88",
      packageName: "button",
      type: "Number",
      value: "4",
      overridable: true,
    },
    "rmd-button-theme-values": {
      name: "rmd-button-theme-values",
      description:
        'A Map of all the "themeable" parts of the button package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/button/src/_variables.scss#L94-L106",
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
