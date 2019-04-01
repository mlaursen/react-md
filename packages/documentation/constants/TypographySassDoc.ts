/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const TypographySassDoc: PackageSassDoc = {
  name: "typography",
  variables: [
    {
      name: "rmd-typography-font-family",
      type: "String",
      description:
        "The font family to use throughout the entire application.\n",
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value: "Roboto, sans-serif",
      compiledValue: "Roboto, sans-serif",
      configurable: true,
    },
    {
      name: "rmd-typography-mobile-max-line-length",
      type: "Number",
      description: "The max length a line of text can be on mobile devices.\n",
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value: "17em",
      compiledValue: "17em",
      configurable: true,
    },
    {
      name: "rmd-typography-desktop-max-line-length",
      type: "Number",
      description:
        "The max length a line of text can be on larger screens (mostly desktops or landscape tablets).\n",
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value: "40em",
      compiledValue: "40em",
      configurable: true,
    },
    {
      name: "rmd-typography-text-container-breakpoint",
      type: "Number",
      description:
        "The device width that should be used to swap between the mobile and desktop text container widths.\n",
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value: "37.5rem",
      compiledValue: "37.5rem",
      configurable: true,
    },
    {
      name: "rmd-typography-base",
      type: "Map",
      description: "The base styles for typography.\n",
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value:
        "(\n  font-family: $rmd-typography-font-family,\n  -moz-osx-font-smoothing: grayscale,\n  -webkit-font-smoothing: antialiased,\n)",
      compiledValue:
        "(\n  font-family: Roboto,\n  sans-serif,\n  -moz-osx-font-smoothing: grayscale,\n  -webkit-font-smoothing: antialiased,\n);\n",
      configurable: false,
    },
    {
      name: "rmd-typography-font-weights",
      type: "Map",
      description: "A Map of all the font weights.\n\n",
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value:
        "(\n  thin: 100,\n  light: 300,\n  regular: 400,\n  medium: 500,\n  bold: 700,\n  semi-bold: 800,\n  black: 900,\n)",
      compiledValue:
        "(\n  thin: 100,\n  light: 300,\n  regular: 400,\n  medium: 500,\n  bold: 700,\n  semi-bold: 800,\n  black: 900,\n)",
      configurable: true,
    },
    {
      name: "rmd-typography-default-font-weights",
      type: "List",
      description:
        'A list of the "default" font weights that are normally included within an app.\nThis is really only used for hosting fonts on your own server.\n\nEach value in this should be one of the keys in `$rmd-typography-font-weights`.\n\n',
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value: "light regular medium bold",
      compiledValue: "light regular medium bold",
      configurable: true,
    },
    {
      name: "rmd-typography-google-font-weight-suffixes",
      type: "Map",
      description:
        "A Map of font weights to a font file suffix for a Google font.\n\n",
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value:
        "(\n  thin: '-Thin',\n  light: '-Light',\n  regular: '-Regular',\n  medium: '-Medium',\n  bold: '-Bold',\n  semi-bold: '-SemiBold',\n  black: '-Black',\n)",
      compiledValue:
        "(\n  thin: '-Thin',\n  light: '-Light',\n  regular: '-Regular',\n  medium: '-Medium',\n  bold: '-Bold',\n  semi-bold: '-SemiBold',\n  black: '-Black',\n)",
      configurable: true,
    },
    {
      name: "rmd-typography-styles",
      type: "Map",
      description: "A Map of all the typography styles in react-md\n\n",
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value:
        "rmd-typography-set-styles(\n  $rmd-typography-base,\n  (\n    headline-1: (\n      font-size: 6rem,\n      line-height: 6rem,\n      font-weight: map-get($rmd-typography-font-weights, light),\n      letter-spacing: rmd-typography-get-letter-spacing(-1.5, 6),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-2: (\n      font-size: 3.75rem,\n      line-height: 3.75rem,\n      font-weight: map-get($rmd-typography-font-weights, light),\n      letter-spacing: rmd-typography-get-letter-spacing(-0.5, 3.75),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-3: (\n      font-size: 3rem,\n      line-height: 3.125rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: normal,\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-4: (\n      font-size: 2.125rem,\n      line-height: 2.5rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.25, 2.125),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-5: (\n      font-size: 1.5rem,\n      line-height: 2rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: normal,\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-6: (\n      font-size: 1.25rem,\n      line-height: 2rem,\n      font-weight: map-get($rmd-typography-font-weights, medium),\n      letter-spacing: rmd-typography-get-letter-spacing(0.25, 1.25),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    subtitle-1: (\n      font-size: 1rem,\n      line-height: 1.75rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.15, 1),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    subtitle-2: (\n      font-size: 0.875rem,\n      line-height: 1.375rem,\n      font-weight: map-get($rmd-typography-font-weights, medium),\n      letter-spacing: rmd-typography-get-letter-spacing(0.1, 0.875),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    body-1: (\n      font-size: 1rem,\n      line-height: 1.5rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.5, 0.875),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    body-2: (\n      font-size: 0.875rem,\n      line-height: 1.25rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.25, 0.875),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    caption: (\n      font-size: 0.75rem,\n      line-height: 1.25rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.4, 0.75),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    button: (\n      font-size: 0.875rem,\n      line-height: 2.25rem,\n      font-weight: map-get($rmd-typography-font-weights, medium),\n      letter-spacing: rmd-typography-get-letter-spacing(1.25, 0.875),\n      text-decoration: none,\n      text-transform: uppercase,\n    ),\n    overline: (\n      font-size: 0.75rem,\n      line-height: 2rem,\n      font-weight: map-get($rmd-typography-font-weights, medium),\n      letter-spacing: rmd-typography-get-letter-spacing(2, 0.75),\n      text-decoration: none,\n      text-transform: uppercase,\n    ),\n  )\n)",
      compiledValue:
        "(\n  headline-1: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 6rem,\n    line-height: 6rem,\n    font-weight: 300,\n    letter-spacing: -0.01562em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  headline-2: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 3.75rem,\n    line-height: 3.75rem,\n    font-weight: 300,\n    letter-spacing: -0.00833em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  headline-3: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 3rem,\n    line-height: 3.125rem,\n    font-weight: 400,\n    letter-spacing: normal,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  headline-4: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 2.125rem,\n    line-height: 2.5rem,\n    font-weight: 400,\n    letter-spacing: 0.00735em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  headline-5: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 1.5rem,\n    line-height: 2rem,\n    font-weight: 400,\n    letter-spacing: normal,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  headline-6: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 1.25rem,\n    line-height: 2rem,\n    font-weight: 500,\n    letter-spacing: 0.0125em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  subtitle-1: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 1rem,\n    line-height: 1.75rem,\n    font-weight: 400,\n    letter-spacing: 0.00937em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  subtitle-2: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.875rem,\n    line-height: 1.375rem,\n    font-weight: 500,\n    letter-spacing: 0.00714em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  body-1: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 1rem,\n    line-height: 1.5rem,\n    font-weight: 400,\n    letter-spacing: 0.03571em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  body-2: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.875rem,\n    line-height: 1.25rem,\n    font-weight: 400,\n    letter-spacing: 0.01786em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  caption: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.75rem,\n    line-height: 1.25rem,\n    font-weight: 400,\n    letter-spacing: 0.03333em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  )\n  ;,\n  button: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.875rem,\n    line-height: 2.25rem,\n    font-weight: 500,\n    letter-spacing: 0.08929em,\n    text-decoration: none,\n    text-transform: uppercase,\n  )\n  ;,\n  overline: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.75rem,\n    line-height: 2rem,\n    font-weight: 500,\n    letter-spacing: 0.16667em,\n    text-decoration: none,\n    text-transform: uppercase,\n  )\n  ;,\n);\n",
      configurable: false,
    },
    {
      name: "rmd-typography-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the typography package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/typography/dist/_variables.scss",
      group: "typography",
      see: [],
      links: [],
      value:
        "(\n  line-width: $rmd-typography-desktop-max-line-length,\n  mobile-line-width: $rmd-typography-mobile-max-line-length,\n  desktop-line-width: $rmd-typography-desktop-max-line-length,\n)",
      compiledValue:
        "(\n  line-width: 40em,\n  mobile-line-width: 17em,\n  desktop-line-width: 40em,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-typography-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the typography's theme values. This is really\njust for the `rmd-typography-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/typography/dist/_functions.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@function rmd-typography-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-typography-theme-values, typography);\n}",
      oneLineCode: "@function rmd-typography-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-typography-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the typography's theme values.",
      },
    },
    {
      name: "rmd-typography-theme-var",
      type: "function",
      description:
        "This function is used to get one of the typography's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-typography-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/typography/dist/_functions.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@function rmd-typography-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-typography-theme-values, typography, $fallback);\n}",
      oneLineCode:
        "@function rmd-typography-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-typography-theme-values` map keys to set a value for.",
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
        description: "one of the typography's theme values as a css variable.",
      },
    },
    {
      name: "rmd-typography-google-font-suffix",
      type: "function",
      description:
        "Gets the Google font suffix for the provided font weight.\n\n",
      file: "@react-md/typography/dist/_functions.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@function rmd-typography-google-font-suffix($weight: ) {\n  @return rmd-utils-validate(\n    $rmd-typography-google-font-weight-suffixes,\n    $weight,\n    'Google font weight suffix'\n  );\n}",
      oneLineCode:
        "@function rmd-typography-google-font-suffix($weight: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "weight",
          description:
            "The font weight to get a font suffix string for. This should be one of the\n  `$rmd-typography-google-font-weight-suffixes` keys.",
        },
      ],
      returns: {
        type: "String",
        description: "the suffix for the provided font weight.",
      },
    },
    {
      name: "rmd-typography-value",
      type: "function",
      description:
        "Gets the current typography style from the `$rmd-typography-styles` variable.\n\n",
      file: "@react-md/typography/dist/_functions.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@function rmd-typography-value($style: , $property: ) {\n  $style-props: rmd-utils-validate($rmd-typography-styles, $style, typography);\n\n  @return rmd-utils-validate($style-props, $property, 'typography #{$style} property');\n}",
      oneLineCode:
        "@function rmd-typography-value($style: , $property: ) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".test {\n  font-size: rmd-typography-value(headline-1, font-size);\n  line-height: rmd-typography-value(headline-4, line-height);\n}",
          description: "Simple Examples",
          compiledCode:
            ".test {\n  font-size: 6rem;\n  line-height: 2.5rem;\n}\n",
        },
      ],
      parameters: [
        {
          type: "String",
          name: "style",
          description: "One of the keys for the `$rmd-typography-styles` map.",
        },
        {
          type: "String",
          name: "property",
          description: "One of the property values to extract.",
        },
      ],
      returns: { type: "String", description: "the typography style value." },
    },
  ],
  mixins: [
    {
      name: "rmd-typography-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the typography's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-typography-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-typography-theme-values,\n    typography\n  );\n}",
      oneLineCode:
        "@mixin rmd-typography-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-typography-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-typography-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-typography-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-typography-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the typography's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-typography-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-typography-theme-values, typography);\n}",
      oneLineCode:
        "@mixin rmd-typography-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The typography theme style type to update. This should be one\n  of the `$rmd-typography-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-typography-value",
      type: "mixin",
      description:
        "Applies each property value from the `$rmd-typography-styles` map that matches the style name.\n\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-typography-value($style: , $properties: font-size) {\n  @if length($properties) == 0 {\n    $properties: append($properties, font-size);\n  }\n\n  @each $property in $properties {\n    #{$property}: rmd-typography-value($style, $property);\n  }\n}",
      oneLineCode:
        "@mixin rmd-typography-value($style: , $properties: font-size) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".body-1-font-size {\n  // when no properties are provided, it will default to font-size\n  @include rmd-typography-value(body-1);\n}\n\n.headline-4-letter-spacing {\n  @include rmd-typography-value(headline-4, letter-spacing);\n}\n\n.caption-styles {\n  @include rmd-typography-value(caption, font-size, letter-spacing, line-height);\n}",
          description: "Simple Examples",
          compiledCode:
            ".body-1-font-size {\n  font-size: 1rem;\n}\n\n.headline-4-letter-spacing {\n  letter-spacing: 0.00735em;\n}\n\n.caption-styles {\n  font-size: 0.75rem;\n  letter-spacing: 0.03333em;\n  line-height: 1.25rem;\n}\n",
        },
      ],
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "The typography style to get value(s) for. This should be one of the keys from the `$rmd-typography-styles` map.",
        },
        {
          type: "String...",
          name: "properties",
          default: "font-size",
          description:
            "A list of properties to get and create. When no properties are provided, it will default\n   to using `font-size`.",
        },
      ],
    },
    {
      name: "rmd-typography-base",
      type: "mixin",
      description: "Applies the base typography styles to an element.\n\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-typography-base {\n  @each $key, $value in $rmd-typography-base {\n    #{$key}: $value;\n  }\n}",
      oneLineCode: "@mixin rmd-typography-base { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            " .custom-class-name {\n   @include rmd-typography-base;\n\n   font-size: 1.3rem;\n}",
          description: "Example Usage SCSS",
          compiledCode:
            ".custom-class-name {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.3rem;\n}\n",
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-typography",
      type: "mixin",
      description:
        "Applies one of the provided material design styles to an element.\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-typography($style: ) {\n  $style-props: rmd-utils-validate($rmd-typography-styles, $style, typography);\n\n  @each $key, $value in $style-props {\n    #{$key}: $value;\n  }\n}",
      oneLineCode: "@mixin rmd-typography($style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "One of the typography styles from `$rmd-typography-styles`.",
        },
      ],
    },
    {
      name: "rmd-text-container-base",
      type: "mixin",
      description:
        "Creates the base styles required for the text container. These styles are used\nto be able to center the text in a container once the `max-width` value has\nalso been applied.\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-text-container-base {\n  @include rmd-typography-theme(max-width, line-width);\n\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 100%;\n}",
      oneLineCode: "@mixin rmd-text-container-base { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-text-container-auto",
      type: "mixin",
      description:
        "This will generate the styles to apply to an element that will set the max width for legibility. By default,\nthis will create styles that change based on the provided `$mobile-breakpoint` and apply different max\nwidths on a media query. This feature can be disabled by setting the `$mobile-breakpoint` or the `$desktop-max-width`\nparameters to `null`.\n\nUnlike everything else in react-md, the text container relies on having the `box-sizing` set to `content-box` so that\nthe text contents can be centered correctly with a max width and padding. When this is set to `border-box`, you will\nlose the padding real estate in your text container which is something that might not be desired. Keeping this as\n`content-box` will allow padding to be applied without shrinking the max line length.\n\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-text-container-auto($mobile-max-width: $rmd-typography-mobile-max-line-length, $desktop-max-width: $rmd-typography-desktop-max-line-length, $mobile-breakpoint: $rmd-typography-text-container-breakpoint) {\n  @media (max-width: #{$mobile-breakpoint}) {\n    @include rmd-typography-theme-update-var(\n      line-width,\n      rmd-typography-theme-var(mobile-line-width)\n    );\n  }\n}",
      oneLineCode:
        "@mixin rmd-text-container-auto($mobile-max-width: $rmd-typography-mobile-max-line-length, $desktop-max-width: $rmd-typography-desktop-max-line-length, $mobile-breakpoint: $rmd-typography-text-container-breakpoint) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".blog {\n  @include rmd-text-container-base;\n  @include rmd-text-container-auto;\n}\n\n.title {\n  @include rmd-typography(headline-2);\n}\n\n.paragraph {\n  @include rmd-typography(headline-4);\n\n  @media (max-width: 800px) {\n    @include rmd-typography(headline-5);\n  }\n}",
          description: 'Creating a "blog"',
          compiledCode:
            ".blog {\n  max-width: var(--rmd-typography-line-width, 40em);\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 100%;\n}\n@media (max-width: 37.5rem) {\n  .blog {\n    --rmd-typography-line-width: var(--rmd-typography-mobile-line-width, 17em);\n  }\n}\n\n.title {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3.75rem;\n  line-height: 3.75rem;\n  font-weight: 300;\n  letter-spacing: -0.00833em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n.paragraph {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.125rem;\n  line-height: 2.5rem;\n  font-weight: 400;\n  letter-spacing: 0.00735em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n@media (max-width: 800px) {\n  .paragraph {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1.5rem;\n    line-height: 2rem;\n    font-weight: 400;\n    letter-spacing: normal;\n    text-decoration: inherit;\n    text-transform: inherit;\n  }\n}\n",
          htmlExample:
            '<main class="blog">\n  <h1 class="title">Blog Title</h1>\n  <p class="paragraph">Lorem ipsum...</p>\n  <p class="paragraph">Lorem ipsum...</p>\n</main>\n',
        },
      ],
      parameters: [
        {
          type: "Number",
          name: "mobile-max-width",
          default: "rmd-typography-mobile-max-line-length",
          description:
            "The max width for a line of text on\n  mobile devices. This number is recommended to be between 17em and 18em.",
        },
        {
          type: "Number",
          name: "desktop-max-width",
          default: "rmd-typography-desktop-max-line-length",
          description:
            "The max width for a line of text on\n  desktop screens. This number is recommended to be between 38em and 42em.",
        },
        {
          type: "Number",
          name: "mobile-breakpoint",
          default: "rmd-typography-text-container-breakpoint",
          description:
            "The breakpoint for switching between\n  a mobile device and a desktop screen. This is used to automatically change the max line-width for better legibility.",
        },
      ],
    },
    {
      name: "rmd-typography-text-overflow-ellipsis",
      type: "mixin",
      description:
        "A simple mixin that can be used to update an element to ellipsis text when\nit is too long.\n\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-typography-text-overflow-ellipsis {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}",
      oneLineCode: "@mixin rmd-typography-text-overflow-ellipsis { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".truncate-this {\n  @include rmd-typography-text-overflow-ellipsis;\n\n  width: 5rem;\n}",
          description: "Example Usage",
          compiledCode:
            ".truncate-this {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 5rem;\n}\n",
        },
      ],
      parameters: [],
    },
    {
      name: "react-md-typography",
      type: "mixin",
      description:
        "Creates all the typography styles from the react-md typography variables.\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin react-md-typography {\n  @include rmd-theme-create-root-theme($rmd-typography-theme-values, typography);\n\n  .rmd-typography {\n    @include rmd-typography-base;\n\n    @each $suffix in map-keys($rmd-typography-styles) {\n      &--#{$suffix} {\n        @include rmd-typography($suffix);\n      }\n    }\n\n    &--no-margin {\n      margin: 0;\n    }\n\n    @each $weight in $rmd-typography-default-font-weights {\n      &--#{$weight} {\n        font-weight: map-get($rmd-typography-font-weights, $weight);\n      }\n    }\n\n    @each $align in (left center right) {\n      &--#{$align} {\n        text-align: $align;\n      }\n    }\n\n    @each $decoration in (underline overline line-through) {\n      &--#{$decoration} {\n        text-decoration: $decoration;\n      }\n    }\n\n    @each $transform in (capitalize uppercase lowercase) {\n      &--#{$transform} {\n        text-transform: $transform;\n      }\n    }\n  }\n\n  .rmd-text-container {\n    @include rmd-text-container;\n  }\n}",
      oneLineCode: "@mixin react-md-typography { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-typography-google-font-face",
      type: "mixin",
      description:
        "Creates the font face declaration for a Google font with a provided font weight. This will\nneed to be called multiple times if you are including multiple font weights.\n\nThis should only be used if you are hosting the Google font locally instead of through the\nGoogle fonts service.\n\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [],
      links: [],
      code:
        "@mixin rmd-typography-google-font-face($font-name: Roboto, $font-weight: map-get($rmd-typography-font-weights, regular), $font-url-or-prefix: null) {\n  $full-font-name: str-replace($font-name, ' ', '') +\n    rmd-typography-google-font-suffix($font-weight);\n\n  $font-url-prefix: '';\n  $font-url: null;\n  @if $font-url-or-prefix == null pr type-of($font-url-or-prefix) == 'string' {\n    $font-url: if(\n      $font-url == null,\n      '/fonts/' + to-lower-case(str-replace($font-name, ' ', '-')),\n      $font-url\n    );\n    $font-url: if(char-at($font-url) != '/', $font-url + '/', $font-url);\n    $font-url: url($font-url+$full-font-name+'.ttf');\n  } @else {\n    $font-url: $font-url-or-prefix;\n  }\n\n  @font-face {\n    font-family: quote($font-name);\n    font-style: normal;\n    font-weight: $font-weight;\n    src: local(#{quote($font-name)}), local(#{quote($full-font-name)}),\n      #{$font-url} format('truetype');\n  }\n}",
      oneLineCode:
        "@mixin rmd-typography-google-font-face($font-name: Roboto, $font-weight: map-get($rmd-typography-font-weights, regular), $font-url-or-prefix: null) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            "@include rmd-typography-google-font-face(Roboto, regular, null);\n@include rmd-typography-google-font-face('Source Code Pro', regular, null);",
          description: "Example Usage SCSS",
          compiledCode:
            '@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Source Code Pro), local(SourceCodePro-Regular),\n    url("/fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");\n}\n',
        },
        {
          type: "css",
          code:
            "@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'),\n    local('Roboto-Regular'),\n    url('/fonts/roboto/Roboto-Regular.ttf') format('truetype');\n}\n\n@font-face {\n  font-family: 'Source Code Pro';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Source Code Pro'),\n    local('SourceCodePro-Regular'),\n    url('/fonts/source-code-pro/SourceCodePro-Regular.ttf') format('truetype');\n}",
          description: "Example Usage Generated SCSS",
          compiledCode: null,
        },
      ],
      parameters: [
        {
          type: "String",
          name: "font-name",
          default: "Roboto",
          description: "The font name to use.",
        },
        {
          type: "String",
          name: "font-weight",
          default: "map-get($rmd-typography-font-weights, regular)",
          description: "The font weight to use.",
        },
        {
          type: "String",
          name: "font-url-or-prefix",
          default: "null",
          description:
            "This is either a font url prefix for the folder containing the font on your\n  server or a url string to the font icon file on your server. If you are using create-react-app, you **must** use the\n  url string approach for it to be correctly included in the build process. If this value is null, it will default to have\n  '/fonts/' prefix and then a caterpillar-cased string. See the examples above for more details.",
        },
      ],
    },
    {
      name: "rmd-typography-host-google-font",
      type: "mixin",
      description:
        "Generates all the font faces (with font weights) for a Google font. This should only be used if you are hosting the Google font\non your own servers instead of through the Google fonts service.\n\nIf you are using create-react-app, you must provide the `$font-url-prefix-or-url-map` as a Map of urls to have the font files\ncorrectly included and bundled during your build. See the examples for more details.\n\n",
      file: "@react-md/typography/dist/_mixins.scss",
      group: "typography",
      see: [
        {
          name: "rmd-typography-google-font-face",
          type: "mixin",
          description:
            "Creates the font face declaration for a Google font with a provided font weight. This will\nneed to be called multiple times if you are including multiple font weights.\n\nThis should only be used if you are hosting the Google font locally instead of through the\nGoogle fonts service.\n\n",
          group: "typography",
        },
      ],
      links: [
        {
          url:
            "https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-images-fonts-and-files",
          caption: "Adding Images, Fonts, and Files",
        },
      ],
      code:
        "@mixin rmd-typography-host-google-font($font-name: Roboto, $weights: $rmd-typography-default-font-weights, $font-url-prefix-or-url-map: null) {\n  @each $weight in $weights {\n    @if type-of($font-url-prefix-or-url-map) == 'string' or $font-url-prefix-or-url-map == null {\n      @include rmd-typography-google-font-face($font-name, $weight, $font-url-prefix-or-url-map);\n    } @else {\n      @include rmd-typography-google-font-face(\n        $font-name,\n        $weight,\n        rmd-utils-validate($font-url-prefix-or-url-map, $weight, 'Google font weight')\n      );\n    }\n  }\n}",
      oneLineCode:
        "@mixin rmd-typography-host-google-font($font-name: Roboto, $weights: $rmd-typography-default-font-weights, $font-url-prefix-or-url-map: null) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            "// This is going to assume you have downloaded the material-icons zip with all the icon font files and copied it into\n// `src/fonts/material-icons` and you are including the fonts in `src/index.scss`\n@include rmd-typography-host-google-font(Roboto, $rmd-typography-default-font-weights, (\n  light: url(./fonts/roboto/Roboto-Light.ttf),\n  regular: url(./fonts/roboto/Roboto-Regular.ttf),\n  medium: url(./fonts/roboto/Roboto-Medium.ttf),\n  bold: url(./fonts/roboto/Roboto-Bold.ttf),\n));\n\n@include rmd-typography-host-google-font(SourceCodePro, $rmd-typography-default-font-weights, (\n  light: url(./fonts/source-code-pro/SourceCodePro-Light.ttf),\n  regular: url(./fonts/source-code-pro/SourceCodePro-Regular.ttf),\n  medium: url(./fonts/source-code-pro/SourceCodePro-Medium.ttf),\n  bold: url(./fonts/source-code-pro/SourceCodePro-Bold.ttf),\n));",
          description: "create-react-app Example Usage",
          compiledCode:
            '@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: light;\n  src: local(Roboto), local(Roboto-Light),\n    url("/fonts/roboto/Roboto-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Roboto), local(Roboto-Medium),\n    url("/fonts/roboto/Roboto-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Roboto), local(Roboto-Bold),\n    url("/fonts/roboto/Roboto-Bold.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "SourceCodePro";\n  font-style: normal;\n  font-weight: light;\n  src: local(SourceCodePro), local(SourceCodePro-Light),\n    url("/fonts/sourcecodepro/SourceCodePro-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "SourceCodePro";\n  font-style: normal;\n  font-weight: regular;\n  src: local(SourceCodePro), local(SourceCodePro-Regular),\n    url("/fonts/sourcecodepro/SourceCodePro-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "SourceCodePro";\n  font-style: normal;\n  font-weight: medium;\n  src: local(SourceCodePro), local(SourceCodePro-Medium),\n    url("/fonts/sourcecodepro/SourceCodePro-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "SourceCodePro";\n  font-style: normal;\n  font-weight: bold;\n  src: local(SourceCodePro), local(SourceCodePro-Bold),\n    url("/fonts/sourcecodepro/SourceCodePro-Bold.ttf") format("truetype");\n}\n',
        },
        {
          type: "scss",
          code:
            "// The next 3 lines are equivalent\n@include rmd-typography-host-google-font;\n@include rmd-typography-host-google-font(Roboto, $rmd-typography-default-font-weights, null);\n@include rmd-typography-host-google-font(Roboto, $rmd-typography-default-font-weights, '/fonts/roboto');\n@include rmd-typography-host-google-font('Source Code Pro');",
          description: "Example Usage SCSS",
          compiledCode:
            '@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: light;\n  src: local(Roboto), local(Roboto-Light),\n    url("/fonts/roboto/Roboto-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Roboto), local(Roboto-Medium),\n    url("/fonts/roboto/Roboto-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Roboto), local(Roboto-Bold),\n    url("/fonts/roboto/Roboto-Bold.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: light;\n  src: local(Roboto), local(Roboto-Light),\n    url("/fonts/roboto/Roboto-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Roboto), local(Roboto-Medium),\n    url("/fonts/roboto/Roboto-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Roboto), local(Roboto-Bold),\n    url("/fonts/roboto/Roboto-Bold.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: light;\n  src: local(Roboto), local(Roboto-Light),\n    url("/fonts/roboto/Roboto-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Roboto), local(Roboto-Medium),\n    url("/fonts/roboto/Roboto-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Roboto), local(Roboto-Bold),\n    url("/fonts/roboto/Roboto-Bold.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: light;\n  src: local(Source Code Pro), local(SourceCodePro-Light),\n    url("/fonts/source-code-pro/SourceCodePro-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Source Code Pro), local(SourceCodePro-Regular),\n    url("/fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Source Code Pro), local(SourceCodePro-Medium),\n    url("/fonts/source-code-pro/SourceCodePro-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Source Code Pro), local(SourceCodePro-Bold),\n    url("/fonts/source-code-pro/SourceCodePro-Bold.ttf") format("truetype");\n}\n',
        },
      ],
      parameters: [
        {
          type: "String",
          name: "font-name",
          default: "Roboto",
          description: "The font name to use.",
        },
        {
          type: "List",
          name: "weights",
          default: "$rmd-typography-default-font-weights",
          description:
            "A list of font weights to use. These should be\n  one of the `$rmd-typography-font-weights` keys.",
        },
        {
          type: "String | Map",
          name: "font-url-prefix-or-url-map",
          default: "null",
          description:
            "This is either a font url prefix for the folder containing the font on your\n  server or a url string to the font icon file on your server. If you are using create-react-app, you **must** use the\n  url string approach for it to be correctly included in the build process. If this value is null, it will default to have\n  '/fonts/' prefix and then a caterpillar-cased string. See the `rmd-typography-google-font-face` mixin for more details.",
        },
      ],
    },
  ],
};

export default TypographySassDoc;
