/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const ButtonSassDoc: PackageSassDoc = {
  name: "button",
  variables: [
    {
      name: "rmd-button-text-icon-inherit-color",
      type: "Boolean",
      description:
        "Boolean if text buttons with icons should have the icons inherit\nthe current color. If this is disabled, only icon buttons will\ninherit the current text color.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-button-text-border-radius",
      type: "Number",
      description: "The border radius to apply to text buttons.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "0.5rem",
      compiledValue: "0.5rem",
      configurable: true,
    },
    {
      name: "rmd-button-text-horizontal-padding",
      type: "Number",
      description:
        "The amount of left and right padding to apply to text buttons.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "1rem",
      compiledValue: "1rem",
      configurable: true,
    },
    {
      name: "rmd-button-text-vertical-padding",
      type: "Number",
      description:
        "The amount of top and bottom padding to apply to text buttons. Since buttons\nare now displayed as inline-flex, it is generally recommended to keep this value\nat 0 and just increase the height of the button instead.\n\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "0",
      compiledValue: "0",
      configurable: true,
    },
    {
      name: "rmd-button-text-height",
      type: "Number",
      description: "The height for text buttons.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "2.25rem",
      compiledValue: "2.25rem",
      configurable: true,
    },
    {
      name: "rmd-button-text-min-width",
      type: "Number",
      description: "The min width for text buttons.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "4rem",
      compiledValue: "4rem",
      configurable: true,
    },
    {
      name: "rmd-button-text-icon-size",
      type: "Number",
      description:
        "The text button's icon size. This is smaller than the normal icon size by default since buttons\nhave additional padding. You can set this to `null` if you want consistent icon sizes.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "1.125rem",
      compiledValue: "1.125rem",
      configurable: true,
    },
    {
      name: "rmd-button-icon-border-radius",
      type: "Number",
      description: "The border radius to apply to all icon buttons.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "50%",
      compiledValue: "50%",
      configurable: true,
    },
    {
      name: "rmd-button-icon-size",
      type: "Number",
      description: "The height and width to apply to an icon button.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "3rem",
      compiledValue: "3rem",
      configurable: true,
    },
    {
      name: "rmd-button-hover-background-color",
      type: "Color",
      description:
        "The background color to apply when a button is hovered. This will be applied in the `::after`\npseudo element so it is recommended to be either black or white with an opacity applied.\n\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value:
        "rgba(\n  if(rmd-theme-contrast-tone($rmd-theme-background) == 'light', $rmd-white-base, $rmd-black-base),\n  0.2\n)",
      compiledValue: "rgba(0, 0, 0, 0.2)",
      configurable: true,
    },
    {
      name: "rmd-button-background-color-transition-time",
      type: "Number",
      description:
        "The transition duration for the hover background color to be applied.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-button-outline-width",
      type: "Number",
      description: "The base box-shadow width to apply to buttons\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "1px",
      compiledValue: "1px",
      configurable: true,
    },
    {
      name: "rmd-button-box-shadow",
      type: "String",
      description:
        "The base box-shadow to apply to buttons when outlined. This will normally be used along with a color variable\nto define a box shadow.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "inset 0 0 0",
      compiledValue: "inset 0 0 0",
      configurable: true,
    },
    {
      name: "rmd-button-outline-color",
      type: "Color",
      description:
        "This is the color that will be applied to the box-shadow/border for the button\nwhen the `outline` theme type is applied **unless** one of the theme values are\ndefined.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "#999",
      compiledValue: "#999",
      configurable: true,
    },
    {
      name: "rmd-button-background-color",
      type: "Color",
      description:
        'This is the background color that will be applied when the theme type prop\non buttons is set to "clear".\n',
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "transparent",
      compiledValue: "transparent",
      configurable: true,
    },
    {
      name: "rmd-button-color",
      type: "Color",
      description:
        'This is the text color that will be applied when the theme type prop\non buttons is set to "clear".\n',
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "rmd-theme-var(text-primary-on-background)",
      compiledValue: "var(--rmd-theme-text-primary-on-background, #212121)",
      configurable: true,
    },
    {
      name: "rmd-button-contained-elevation-transition-time",
      type: "Number",
      description:
        "The transition time for a contained button to raise to the pressed elevation.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-button-contained-resting-elevation",
      type: "Number",
      description:
        "The elevation to use for a resting contained button. This should be a number between\n0 and 24.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "2",
      compiledValue: "2",
      configurable: true,
    },
    {
      name: "rmd-button-contained-pressed-elevation",
      type: "Number",
      description:
        "The elevation to use for a contained button that is being pressed. This should be a number\nbetween 0 and 24.\n",
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value: "4",
      compiledValue: "4",
      configurable: true,
    },
    {
      name: "rmd-button-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the button package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/button/dist/_variables.scss",
      group: "button",
      see: [],
      links: [],
      value:
        "(\n  text-border-radius: $rmd-button-text-border-radius,\n  text-horizontal-padding: $rmd-button-text-horizontal-padding,\n  text-vertical-padding: $rmd-button-text-vertical-padding,\n  text-height: $rmd-button-text-height,\n  text-min-width: $rmd-button-text-min-width,\n  icon-border-radius: $rmd-button-icon-border-radius,\n  icon-size: $rmd-button-icon-size,\n  background-color: $rmd-button-background-color,\n  color: $rmd-button-color,\n  outline: $rmd-button-outline-color,\n  outline-width: $rmd-button-outline-width,\n)",
      compiledValue:
        "(\n  text-border-radius: 0.5rem,\n  text-horizontal-padding: 1rem,\n  text-vertical-padding: 0,\n  text-height: 2.25rem,\n  text-min-width: 4rem,\n  icon-border-radius: 50%,\n  icon-size: 3rem,\n  background-color: transparent,\n  color: var(--rmd-theme-text-primary-on-background, #212121),\n  outline: #999,\n  outline-width: 1px,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-button-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the button's theme values. This is really\njust for the `rmd-button-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/button/dist/_functions.scss",
      group: "button",
      see: [],
      links: [],
      code:
        "@function rmd-button-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-button-theme-values, button);\n}",
      oneLineCode: "@function rmd-button-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-button-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the button's theme values.",
      },
    },
    {
      name: "rmd-button-theme-var",
      type: "function",
      description:
        "This function is used to get one of the button's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-button-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/button/dist/_functions.scss",
      group: "button",
      see: [],
      links: [],
      code:
        "@function rmd-button-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-button-theme-values, button, $fallback);\n}",
      oneLineCode:
        "@function rmd-button-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
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
  ],
  mixins: [
    {
      name: "rmd-button-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the button's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/button/dist/_mixins.scss",
      group: "button",
      see: [],
      links: [],
      code:
        "@mixin rmd-button-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-button-theme-values, button);\n}",
      oneLineCode:
        "@mixin rmd-button-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
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
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-button-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-button-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the button's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/button/dist/_mixins.scss",
      group: "button",
      see: [],
      links: [],
      code:
        "@mixin rmd-button-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-button-theme-values, button);\n}",
      oneLineCode:
        "@mixin rmd-button-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The button theme style type to update. This should be one\n  of the `$rmd-button-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-button-unstyled",
      type: "mixin",
      description:
        "A simple mixin to create an unstyled button.\n\nNOTE: An unstyled button removed the `outline-style` so you *must* add a custom focus behavior with\neither ripples or something else for keyboard users.\n\n",
      file: "@react-md/button/dist/_mixins.scss",
      group: "button",
      see: [],
      links: [],
      code:
        "@mixin rmd-button-unstyled {\n  @include rmd-utils-hide-focus-outline;\n\n  background-color: transparent;\n  border-width: 0;\n}",
      oneLineCode: "@mixin rmd-button-unstyled { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".my-button {\n  @include rmd-button-unstyled;\n  @include rmd-typography(button);\n\n  display: inline-flex;\n}",
          description: "Example Usage SCSS",
          compiledCode:
            ".my-button {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background-color: transparent;\n  border-width: 0;\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  display: inline-flex;\n}\n.my-button:focus {\n  outline-style: none;\n}\n.my-button::-moz-focus-inner {\n  border: 0;\n}\n",
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-button-base",
      type: "mixin",
      description: "The base styles for a button.\n\n",
      file: "@react-md/button/dist/_mixins.scss",
      group: "button",
      see: [],
      links: [],
      code:
        "@mixin rmd-button-base {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-button-theme(background-color);\n  @include rmd-button-theme(color);\n\n  align-items: center;\n  border-width: 0;\n  display: inline-flex;\n  justify-content: center;\n  position: relative;\n}",
      oneLineCode: "@mixin rmd-button-base { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code: ".my-button {\n  @include rmd-button-base;\n}",
          description: "Example Usage SCSS",
          compiledCode:
            ".my-button {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background-color: var(--rmd-button-background-color, transparent);\n  color: var(\n    --rmd-button-color,\n    var(--rmd-theme-text-primary-on-background, #212121)\n  );\n  align-items: center;\n  border-width: 0;\n  display: inline-flex;\n  justify-content: center;\n  position: relative;\n}\n.my-button:focus {\n  outline-style: none;\n}\n.my-button::-moz-focus-inner {\n  border: 0;\n}\n",
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-button-text",
      type: "mixin",
      description: "Creates the base styles for a text button.\n",
      file: "@react-md/button/dist/_mixins.scss",
      group: "button",
      see: [],
      links: [],
      code:
        "@mixin rmd-button-text {\n  @include rmd-typography(button);\n\n  // icons have smaller sizes due to the padding on buttons. This is also not applied\n  // below in the rmd-button__icon since a user of this library _could_ include the icon styles\n  // after the button styles which would prevent these styles from working\n  @if $rmd-icon-use-font-icons or $rmd-icon-use-svg-icons {\n    @include rmd-icon-theme-update-var(size, $rmd-button-text-icon-size);\n  }\n\n  @include rmd-button-theme(border-radius, text-border-radius);\n  @include rmd-button-theme(min-height, text-height);\n  @include rmd-button-theme(min-width, text-min-width);\n\n  padding: rmd-button-theme-var(text-vertical-padding) rmd-button-theme-var(text-horizontal-padding);\n}",
      oneLineCode: "@mixin rmd-button-text { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-button-icon",
      type: "mixin",
      description: "Creates the base styles for an icon button.\n",
      file: "@react-md/button/dist/_mixins.scss",
      group: "button",
      see: [],
      links: [],
      code:
        "@mixin rmd-button-icon {\n  @if not $rmd-button-text-icon-inherit-color {\n    @include rmd-icon-theme-update-var(color, currentColor);\n  }\n\n  @include rmd-button-theme(border-radius, icon-border-radius);\n  @include rmd-button-theme(height, icon-size);\n  @include rmd-button-theme(width, icon-size);\n\n  padding: 0;\n}",
      oneLineCode: "@mixin rmd-button-icon { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default ButtonSassDoc;
