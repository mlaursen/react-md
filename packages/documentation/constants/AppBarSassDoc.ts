/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const AppBarSassDoc: PackageSassDoc = {
  name: "app-bar",
  variables: [
    {
      name: "rmd-app-bar-z-index",
      type: "Number",
      description:
        'The z-index to use for the fixed app bar. Ideally this value should be less than\nany of the "temporary" materials like overlays, sheets, and menus.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "10",
      compiledValue: "10",
      configurable: true,
    },
    {
      name: "rmd-app-bar-fixed-elevation",
      type: "Number",
      description:
        'The elevation to use for "fixed" app bars. This should be a number between 0 and 16.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "2",
      compiledValue: "2",
      configurable: true,
    },
    {
      name: "rmd-app-bar-height",
      type: "Number",
      description: "The height for the app bar.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "3.5rem",
      compiledValue: "3.5rem",
      configurable: true,
    },
    {
      name: "rmd-app-bar-dense-height",
      type: "Number",
      description: "The dense height for the app bar.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "3rem",
      compiledValue: "3rem",
      configurable: true,
    },
    {
      name: "rmd-app-bar-prominent-height",
      type: "Number",
      description: "The prominent/extended height for the app bar.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "$rmd-app-bar-height * 2",
      compiledValue: "7rem",
      configurable: true,
    },
    {
      name: "rmd-app-bar-prominent-dense-height",
      type: "Number",
      description:
        "The prominent/extended height for the app bar when the `dense` prop is also enabled.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "$rmd-app-bar-dense-height * 2",
      compiledValue: "6rem",
      configurable: true,
    },
    {
      name: "rmd-app-bar-keyline",
      type: "Number",
      description:
        "The default keyline to use for either the `AppBarNav` or `AppBarTitle`. This makes the icon in the `AppBarNav` or\nthe first letter in the `AppBarTitle` appear at this distance.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "1rem",
      compiledValue: "1rem",
      configurable: true,
    },
    {
      name: "rmd-app-bar-nav-margin",
      type: "Number",
      description:
        "The amount of margin to apply to the `AppBarNav` based on the `$rmd-app-bar-keyline` so that the icon will be positioned\nat the keyline (ignoring the button padding).\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value:
        "$rmd-app-bar-keyline - (($rmd-button-icon-size - $rmd-icon-size) / 2)",
      compiledValue: "0.25rem",
      configurable: false,
    },
    {
      name: "rmd-app-bar-title-keyline",
      type: "Number",
      description:
        "The keyline for the `AppBarTitle` to use when used with the `AppBarNav` or the `offset` prop is enabled.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "4.5rem",
      compiledValue: "4.5rem",
      configurable: true,
    },
    {
      name: "rmd-app-bar-title-nav-margin",
      type: "Number",
      description:
        "The amount of margin to apply to the title when used with the `AppBarNav` component.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value:
        "$rmd-app-bar-title-keyline - $rmd-app-bar-nav-margin -\n  $rmd-button-icon-size",
      compiledValue: "1.25rem",
      configurable: false,
    },
    {
      name: "rmd-app-bar-lr-margin",
      type: "Number",
      description:
        "The amount of margin to apply to the first and last element within the app bar (per row basis). This will automatically be\napplied if using the `AppBarNav` component and will be applied to the `AppBarAction` component that enables the `last` prop.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "0.25rem",
      compiledValue: "0.25rem",
      configurable: true,
    },
    {
      name: "rmd-app-bar-primary-background-color",
      type: "Color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"primary"`.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "rmd-theme-var(primary)",
      compiledValue: "var(--rmd-theme-primary, #9c27b0)",
      configurable: true,
    },
    {
      name: "rmd-app-bar-primary-color",
      type: "Color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"primary"`.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "rmd-theme-var(on-primary)",
      compiledValue: "var(--rmd-theme-on-primary, #000)",
      configurable: true,
    },
    {
      name: "rmd-app-bar-secondary-background-color",
      type: "Color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"secondary"`.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "rmd-theme-var(secondary)",
      compiledValue: "var(--rmd-theme-secondary, #f50057)",
      configurable: true,
    },
    {
      name: "rmd-app-bar-secondary-color",
      type: "Color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"secondary"`.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "rmd-theme-var(on-secondary)",
      compiledValue: "var(--rmd-theme-on-secondary, #000)",
      configurable: true,
    },
    {
      name: "rmd-app-bar-default-light-theme-background-color",
      type: "Color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"default"`\nand the app is currently using a light theme.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "$rmd-grey-100",
      compiledValue: "#f5f5f5",
      configurable: true,
    },
    {
      name: "rmd-app-bar-default-light-theme-color",
      type: "Color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"default"` and\nthe app is currently using a light theme.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-light-theme-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiledValue: "#000",
      configurable: true,
    },
    {
      name: "rmd-app-bar-default-dark-theme-background-color",
      type: "Color",
      description:
        'The background color for the app bar when the `theme` prop is set to `"default"`\nand the app is currently using a dark theme.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value: "$rmd-grey-900",
      compiledValue: "#212121",
      configurable: true,
    },
    {
      name: "rmd-app-bar-default-dark-theme-color",
      type: "Color",
      description:
        'The text color for the app bar when the `theme` prop is set to `"default"` and\nthe app is currently using a dark theme.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-dark-theme-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiledValue: "#fff",
      configurable: true,
    },
    {
      name: "rmd-app-bar-default-background-color",
      type: "Color",
      description:
        "The background color to use for the app bar that is using the `default` theme. This\nvalue is derived based on the current background color of the app for light or dark\nthemed apps.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value:
        "if(\n  rmd-theme-tone($rmd-theme-background) == light,\n  $rmd-app-bar-default-light-theme-background-color,\n  $rmd-app-bar-default-dark-theme-background-color\n)",
      compiledValue: "#f5f5f5",
      configurable: true,
    },
    {
      name: "rmd-app-bar-default-color",
      type: "Color",
      description:
        "The text color to use for the app bar that is using the `default` theme. This\nvalue is derived based on the current background color of the app for light or dark\nthemed apps.\n",
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value:
        "if(\n  rmd-theme-tone($rmd-app-bar-default-background-color) == light,\n  $rmd-app-bar-default-light-theme-color,\n  $rmd-app-bar-default-dark-theme-color\n)",
      compiledValue: "#000",
      configurable: true,
    },
    {
      name: "rmd-app-bar-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the app-bar package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/app-bar/dist/_variables.scss",
      group: "app-bar",
      see: [],
      links: [],
      value:
        "(\n  background-color: transparent,\n  color: initial,\n  primary: $rmd-app-bar-primary-background-color,\n  on-primary: $rmd-app-bar-primary-color,\n  secondary: $rmd-app-bar-secondary-background-color,\n  on-secondary: $rmd-app-bar-secondary-color,\n  default-background-color: $rmd-app-bar-default-background-color,\n  default-light-background-color: $rmd-app-bar-default-light-theme-background-color,\n  default-dark-background-color: $rmd-app-bar-default-dark-theme-background-color,\n  default-color: $rmd-app-bar-default-color,\n  default-light-color: $rmd-app-bar-default-light-theme-color,\n  default-dark-color: $rmd-app-bar-default-dark-theme-color,\n  height: $rmd-app-bar-height,\n  dense-height: $rmd-app-bar-dense-height,\n  prominent-height: $rmd-app-bar-prominent-height,\n  prominent-dense-height: $rmd-app-bar-prominent-dense-height,\n)",
      compiledValue:
        "(\n  background-color: transparent,\n  color: initial,\n  primary: var(--rmd-theme-primary, #9c27b0),\n  on-primary: var(--rmd-theme-on-primary, #000),\n  secondary: var(--rmd-theme-secondary, #f50057),\n  on-secondary: var(--rmd-theme-on-secondary, #000),\n  default-background-color: #f5f5f5,\n  default-light-background-color: #f5f5f5,\n  default-dark-background-color: #212121,\n  default-color: #000,\n  default-light-color: #000,\n  default-dark-color: #fff,\n  height: 3.5rem,\n  dense-height: 3rem,\n  prominent-height: 7rem,\n  prominent-dense-height: 6rem,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-app-bar-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the app-bar's theme values. This is really\njust for the `rmd-app-bar-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/app-bar/dist/_functions.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@function rmd-app-bar-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-app-bar-theme-values, app-bar);\n}",
      oneLineCode: "@function rmd-app-bar-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-app-bar-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the app-bar's theme values.",
      },
    },
    {
      name: "rmd-app-bar-theme-var",
      type: "function",
      description:
        "This function is used to get one of the app-bar's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-app-bar-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/app-bar/dist/_functions.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@function rmd-app-bar-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-app-bar-theme-values, app-bar, $fallback);\n}",
      oneLineCode:
        "@function rmd-app-bar-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the app-bar's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-app-bar-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the app-bar's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-app-bar-theme-values, app-bar);\n}",
      oneLineCode:
        "@mixin rmd-app-bar-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
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
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-app-bar-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-app-bar-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the app-bar's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-app-bar-theme-values, app-bar);\n}",
      oneLineCode:
        "@mixin rmd-app-bar-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The app-bar theme style type to update. This should be one\n  of the `$rmd-app-bar-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-app-bar-fixed",
      type: "mixin",
      description:
        "Creates the styles for the `AppBar` component when it is fixed to the top or bottom\nof the page. This will create four classes:\n- `&--fixed`\n- `&--fixed-elevation`\n- `&--top`\n- `&--right`\n- `&--bottom`\n- `&--left`\n\nTo get the correct styles and positions for a fixed app bar, you will need to apply the `--fixed` class\nas well as the `--top` or `--bottom` to fix it to the top or bottom of the page. If the app bar should\ngain elevation, you should also apply the `--fixed-elevation` class. See the examples below for the\ndifferent use cases.\n\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-fixed {\n  &--fixed {\n    @include rmd-theme-update-var(surface, rmd-app-bar-theme-var(background-color));\n\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: $rmd-app-bar-z-index;\n  }\n\n  &--fixed-elevation {\n    @include rmd-elevation($rmd-app-bar-fixed-elevation);\n  }\n\n  $positions: top right bottom left;\n  @each $position in $positions {\n    &--#{$position} {\n      #{$position}: 0;\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-app-bar-fixed { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code: ".app-bar {\n  @include rmd-app-bar-fixed;\n}",
          description: "Simple Example",
          compiledCode:
            ".app-bar--fixed {\n  --rmd-theme-surface: var(--rmd-app-bar-background-color, transparent);\n  left: 0;\n  position: fixed;\n  right: 0;\n  z-index: 10;\n}\n\n.app-bar--fixed-elevation {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n\n.app-bar--top {\n  top: 0;\n}\n\n.app-bar--right {\n  right: 0;\n}\n\n.app-bar--bottom {\n  bottom: 0;\n}\n\n.app-bar--left {\n  left: 0;\n}\n",
          htmlExample:
            '<div class="app-bar app-bar--fixed app-bar--top">\n  An app-bar fixed to the top of the page.\n</div>\n\n<div class="app-bar app-bar--fixed app-bar--fixed-elevation app-bar--bottom">\n  An app-bar fixed to the bottom of the page with elevation\n</div>',
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-app-bar-themes",
      type: "mixin",
      description:
        "Creates the styles for different app bar themes. This will create 4 classes:\n- `--primary`\n- `--secondary`\n- `--default`\n- `--child-inherit`\n\nThe primary and secondary suffixes will use the theme variables for generating the correct theme background color and\ntext color on top of the theme color. The default suffix is used to create a third theme type with any colors that are\nprovided. Finally, the `--child-inherit` suffix will allow child `AppBarNav`, `AppBarTitle`, and `AppBarAction` components\nto inherit text color instead of using the default color.\n\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-themes {\n  @include rmd-app-bar-theme(background-color);\n  @include rmd-app-bar-theme(color);\n\n  &--primary {\n    @include rmd-app-bar-theme-update-var(background-color, rmd-app-bar-theme-var(primary));\n    @include rmd-app-bar-theme-update-var(color, rmd-app-bar-theme-var(on-primary));\n  }\n\n  &--secondary {\n    @include rmd-app-bar-theme-update-var(background-color, rmd-app-bar-theme-var(secondary));\n    @include rmd-app-bar-theme-update-var(color, rmd-app-bar-theme-var(on-secondary));\n  }\n\n  &--default {\n    @include rmd-app-bar-theme-update-var(\n      background-color,\n      rmd-app-bar-theme-var(default-background-color)\n    );\n    @include rmd-app-bar-theme-update-var(color, rmd-app-bar-theme-var(default-color));\n  }\n\n  &--child-inherit {\n    .rmd-app-bar__nav,\n    .rmd-app-bar__title,\n    .rmd-app-bar__action {\n      color: inherit;\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-app-bar-themes { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            "$rmd-theme-primary: $rmd-blue-500;\n$rmd-theme-secondary: $rmd-pink-a-200;\n\n.app-bar {\n  @include rmd-app-bar-themes;\n}",
          description: "Simple Example",
          compiledCode:
            ".app-bar {\n  background-color: var(--rmd-app-bar-background-color, transparent);\n  color: var(--rmd-app-bar-color, initial);\n}\n.app-bar--primary {\n  --rmd-app-bar-background-color: var(\n    --rmd-app-bar-primary,\n    var(--rmd-theme-primary, #9c27b0)\n  );\n  --rmd-app-bar-color: var(\n    --rmd-app-bar-on-primary,\n    var(--rmd-theme-on-primary, #000)\n  );\n}\n.app-bar--secondary {\n  --rmd-app-bar-background-color: var(\n    --rmd-app-bar-secondary,\n    var(--rmd-theme-secondary, #f50057)\n  );\n  --rmd-app-bar-color: var(\n    --rmd-app-bar-on-secondary,\n    var(--rmd-theme-on-secondary, #000)\n  );\n}\n.app-bar--default {\n  --rmd-app-bar-background-color: var(\n    --rmd-app-bar-default-background-color,\n    #f5f5f5\n  );\n  --rmd-app-bar-color: var(--rmd-app-bar-default-color, #000);\n}\n.app-bar--child-inherit .rmd-app-bar__nav,\n.app-bar--child-inherit .rmd-app-bar__title,\n.app-bar--child-inherit .rmd-app-bar__action {\n  color: inherit;\n}\n",
          htmlExample:
            '<div class="app-bar app-bar--primary">\n  An app bar with the primary theme color as the background color.\n</div>\n\n<div class="app-bar app-bar--secondary">\n  An app bar with the secondary theme color as the background color.\n</div>\n\n<div class="app-bar app-bar--default">\n  An app bar with the default theme applied.\n</div>',
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-app-bar-nav",
      type: "mixin",
      description:
        "Creates the styles for the `AppBarNav` component. The base classes for buttons next to be applied\nas well.\n\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-nav {\n  @include rmd-utils-rtl-auto-group(\n    (\n      margin-left: $rmd-app-bar-lr-margin,\n      margin-right: $rmd-app-bar-title-nav-margin,\n    )\n  );\n  flex-shrink: 0;\n}",
      oneLineCode: "@mixin rmd-app-bar-nav { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".app-bar__nav {\n  // add the next two lines if not applying the base .rmd-button classes\n  // @include rmd-button-base;\n  // @include rmd-button-text;\n  @include rmd-app-bar-nav;\n}",
          description: "Simple Example",
          compiledCode:
            '.app-bar__nav {\n  margin-left: 0.25rem;\n  margin-right: 1.25rem;\n  flex-shrink: 0;\n}\n[dir="rtl"] .app-bar__nav {\n  margin-right: 0.25rem;\n  margin-left: 1.25rem;\n}\n',
          htmlExample:
            '<div class="app-bar app-bar--primary">\n  <button type="button" className="app-bar__nav">Nav Button</button>\n</div>',
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-app-bar-title",
      type: "mixin",
      description: "Creates the styles for the `AppBarTitle` component.\n\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-title {\n  @include rmd-typography(headline-6);\n  @include rmd-utils-rtl-auto(margin-left, $rmd-app-bar-keyline);\n\n  margin-bottom: 0;\n  margin-top: 0;\n\n  .rmd-app-bar__nav ~ & {\n    @include rmd-utils-rtl-auto(margin-left, 0);\n  }\n\n  &--keyline {\n    @include rmd-utils-rtl-auto(margin-left, $rmd-app-bar-title-keyline, auto);\n  }\n}",
      oneLineCode: "@mixin rmd-app-bar-title { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code: ".rmd-app-bar__title {\n  @include rmd-app-bar-title;\n}",
          description: "Example Usage SCSS",
          compiledCode:
            '.rmd-app-bar__title {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.0125em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  margin-left: 1rem;\n  margin-bottom: 0;\n  margin-top: 0;\n}\n[dir="rtl"] .rmd-app-bar__title {\n  margin-left: 0;\n  margin-right: 1rem;\n}\n.rmd-app-bar__nav ~ .rmd-app-bar__title {\n  margin-left: 0;\n}\n[dir="rtl"] .rmd-app-bar__nav ~ .rmd-app-bar__title {\n  margin-left: 0;\n  margin-right: 0;\n}\n.rmd-app-bar__title--keyline {\n  margin-left: 4.5rem;\n}\n[dir="rtl"] .rmd-app-bar__title--keyline {\n  margin-left: auto;\n  margin-right: 4.5rem;\n}\n',
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-app-bar-action-position",
      type: "mixin",
      description: "\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-action-position($first: ) {\n  @if $first {\n    @include rmd-utils-rtl-auto(margin-left, auto);\n  } @else {\n    @include rmd-utils-rtl-auto(margin-right, $rmd-app-bar-lr-margin);\n  }\n}",
      oneLineCode: "@mixin rmd-app-bar-action-position($first: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "Boolean",
          name: "first",
          description:
            "Boolean if the styles for being the first\naction should be created.",
        },
      ],
    },
    {
      name: "rmd-app-bar-action",
      type: "mixin",
      description: "Creates the styles for the `AppBarAction` component.\n\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-action {\n  flex-shrink: 0;\n\n  &--last {\n    @include rmd-app-bar-action-position(false);\n  }\n\n  &--first {\n    @include rmd-app-bar-action-position(true);\n  }\n}",
      oneLineCode: "@mixin rmd-app-bar-action { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code: ".rmd-app-bar__action {\n  @include rmd-app-bar-action;\n}",
          description: "Example Usage SCSS",
          compiledCode:
            '.rmd-app-bar__action {\n  flex-shrink: 0;\n}\n.rmd-app-bar__action--last {\n  margin-right: 0.25rem;\n}\n[dir="rtl"] .rmd-app-bar__action--last {\n  margin-right: 0;\n  margin-left: 0.25rem;\n}\n.rmd-app-bar__action--first {\n  margin-left: auto;\n}\n[dir="rtl"] .rmd-app-bar__action--first {\n  margin-left: 0;\n  margin-right: auto;\n}\n',
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-app-bar-offset",
      type: "mixin",
      description:
        "This mixin is used to apply an offset to an element so that it can be placed\nwith a fixed App Bar. This is really used to help layout your app so that the\ninitial content isn't covered by the app bar.\n\n @example scss - Example Usage\n   .offset-by-height {\n     @include rmd-app-bar-offset;\n   }\n\n   .offset-by-dense-height {\n     @include rmd-app-bar-ofset($height-type: dense-height);\n   }\n\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-offset($property: padding-top, $height-type: height) {\n  $valid-propertys: (padding-top padding-bottom margin-top margin-bottom top bottom);\n  $property: rmd-utils-validate($valid-propertys, $property, 'app bar offset property');\n\n  @include rmd-app-bar-theme($property, $height-type);\n}",
      oneLineCode:
        "@mixin rmd-app-bar-offset($property: padding-top, $height-type: height) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          default: "padding-top",
          description:
            "The property to apply the offset to. This should be\none of: `padding-top`, `padding-bottom`, `margin-top`, `margin-bottom`, `top`, `bottom`.",
        },
        {
          type: "String",
          name: "height-type",
          default: "height",
          description:
            "The app bar height type to use. This should be one of:\n`height`, `dense-height`, `prominent-height`, `prominent-dense-height`",
        },
      ],
    },
    {
      name: "rmd-app-bar-offsets",
      type: "mixin",
      description:
        "Creates all the app  bar offset classnames to use. This ties in with the provided constants\nin javascript:\n - APP_BAR_OFFSET_CLASSNAME\n - APP_BAR_OFFSET_DENSE_CLASSNAME\n - APP_BAR_OFFSET_PROMINENT_CLASSNAME\n - APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin rmd-app-bar-offsets {\n  .rmd-app-bar-offset {\n    @include rmd-app-bar-theme(padding-top, height);\n\n    &--dense {\n      @include rmd-app-bar-theme(padding-top, dense-height);\n    }\n\n    &--prominent {\n      @include rmd-app-bar-theme(padding-top, prominent-height);\n    }\n\n    &--prominent-dense {\n      @include rmd-app-bar-theme(padding-top, prominent-dense-height);\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-app-bar-offsets { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "react-md-app-bar",
      type: "mixin",
      description: "Creates all the styles for the app bar package.\n",
      file: "@react-md/app-bar/dist/_mixins.scss",
      group: "app-bar",
      see: [],
      links: [],
      code:
        "@mixin react-md-app-bar {\n  @include rmd-theme-create-root-theme($rmd-app-bar-theme-values, app-bar);\n\n  .rmd-app-bar {\n    @include rmd-app-bar-fixed;\n    @include rmd-app-bar-themes;\n    @include rmd-app-bar-theme(height);\n\n    align-items: center;\n    display: flex;\n    width: 100%;\n\n    &--dense {\n      @include rmd-app-bar-theme(height, dense-height);\n    }\n\n    &--prominent {\n      @include rmd-app-bar-theme(height, prominent-height);\n\n      flex-wrap: wrap;\n    }\n\n    &--prominent-dense {\n      @include rmd-app-bar-theme(height, prominent-dense-height);\n    }\n\n    &__nav {\n      @include rmd-app-bar-nav;\n    }\n\n    &__title {\n      @include rmd-app-bar-title;\n    }\n\n    &__action {\n      @include rmd-app-bar-action;\n    }\n  }\n\n  @include rmd-app-bar-offsets;\n}",
      oneLineCode: "@mixin react-md-app-bar { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default AppBarSassDoc;
