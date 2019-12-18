/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-typography-theme": {
      name: "rmd-typography-theme",
      description:
        "This function is used to quickly get one of the typography's theme values. This is really\njust for the `rmd-typography-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/typography/src/_functions.scss#L15-L17",
      packageName: "typography",
      code: "@function rmd-typography-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-typography-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-typography-theme-values, typography);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-typography-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the typography's theme values.",
      },
    },
    "rmd-typography-theme-var": {
      name: "rmd-typography-theme-var",
      description:
        "This function is used to get one of the typography's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-typography-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/typography/src/_functions.scss#L30-L32",
      usedBy: [
        {
          name: "rmd-text-container-auto",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      code:
        "@function rmd-typography-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-typography-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-typography-theme-values, typography, $fallback);\n}",
      type: "function",
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
    "rmd-typography-google-font-suffix": {
      name: "rmd-typography-google-font-suffix",
      description:
        "Gets the Google font suffix for the provided font weight.\n\n",
      source: "packages/typography/src/_functions.scss#L39-L45",
      usedBy: [
        {
          name: "rmd-typography-google-font-face",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      code: "@function rmd-typography-google-font-suffix($weight) { … }",
      sourceCode:
        "@function rmd-typography-google-font-suffix($weight) {\n  @return rmd-utils-validate(\n    $rmd-typography-google-font-weight-suffixes,\n    $weight,\n    'Google font weight suffix'\n  );\n}",
      type: "function",
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
    "rmd-typography-value": {
      name: "rmd-typography-value",
      description:
        "Gets the current typography style from the `$rmd-typography-styles` variable.\n\n",
      source: "packages/typography/src/_functions.scss#L59-L63",
      usedBy: [
        {
          name: "rmd-typography-value",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      examples: [
        {
          code:
            ".test {\n  font-size: rmd-typography-value(headline-1, font-size);\n  line-height: rmd-typography-value(headline-4, line-height);\n}\n",
          compiled: ".test {\n  font-size: 6rem;\n  line-height: 2.5rem;\n}\n",
          type: "scss",
          description: "Simple Examples",
        },
      ],
      code: "@function rmd-typography-value($style\n$property) { … }",
      sourceCode:
        "@function rmd-typography-value($style\n$property) {\n  $style-props: rmd-utils-validate($rmd-typography-styles, $style, typography);\n\n  @return rmd-utils-validate($style-props, $property, 'typography #{$style} property');\n}",
      type: "function",
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
  },
  mixins: {
    "rmd-typography-theme": {
      name: "rmd-typography-theme",
      description:
        "This function is used to quickly get one of the typography's theme values. This is really\njust for the `rmd-typography-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/typography/src/_functions.scss#L15-L17",
      packageName: "typography",
      code: "@function rmd-typography-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-typography-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-typography-theme-values, typography);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-typography-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-typography-theme-var": {
      name: "rmd-typography-theme-var",
      description:
        "This function is used to get one of the typography's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-typography-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/typography/src/_functions.scss#L30-L32",
      usedBy: [
        {
          name: "rmd-text-container-auto",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      code:
        "@function rmd-typography-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-typography-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-typography-theme-values, typography, $fallback);\n}",
      type: "mixin",
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
    },
    "rmd-typography-google-font-suffix": {
      name: "rmd-typography-google-font-suffix",
      description:
        "Gets the Google font suffix for the provided font weight.\n\n",
      source: "packages/typography/src/_functions.scss#L39-L45",
      usedBy: [
        {
          name: "rmd-typography-google-font-face",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      code: "@function rmd-typography-google-font-suffix($weight) { … }",
      sourceCode:
        "@function rmd-typography-google-font-suffix($weight) {\n  @return rmd-utils-validate(\n    $rmd-typography-google-font-weight-suffixes,\n    $weight,\n    'Google font weight suffix'\n  );\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "weight",
          description:
            "The font weight to get a font suffix string for. This should be one of the\n  `$rmd-typography-google-font-weight-suffixes` keys.",
        },
      ],
    },
    "rmd-typography-value": {
      name: "rmd-typography-value",
      description:
        "Gets the current typography style from the `$rmd-typography-styles` variable.\n\n",
      source: "packages/typography/src/_functions.scss#L59-L63",
      usedBy: [
        {
          name: "rmd-typography-value",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      examples: [
        {
          code:
            ".test {\n  font-size: rmd-typography-value(headline-1, font-size);\n  line-height: rmd-typography-value(headline-4, line-height);\n}\n",
          compiled: ".test {\n  font-size: 6rem;\n  line-height: 2.5rem;\n}\n",
          type: "scss",
          description: "Simple Examples",
        },
      ],
      code: "@function rmd-typography-value($style\n$property) { … }",
      sourceCode:
        "@function rmd-typography-value($style\n$property) {\n  $style-props: rmd-utils-validate($rmd-typography-styles, $style, typography);\n\n  @return rmd-utils-validate($style-props, $property, 'typography #{$style} property');\n}",
      type: "mixin",
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
    },
  },
  variables: {
    "rmd-typography-font-family": {
      name: "rmd-typography-font-family",
      description:
        "The font family to use throughout the entire application.\n",
      source: "packages/typography/src/_variables.scss#L75",
      packageName: "typography",
      type: "String",
      value: "Roboto, sans-serif",
      overridable: true,
    },
    "rmd-typography-mobile-max-line-length": {
      name: "rmd-typography-mobile-max-line-length",
      description: "The max length a line of text can be on mobile devices.\n",
      source: "packages/typography/src/_variables.scss#L79",
      packageName: "typography",
      type: "Number",
      value: "17em",
      overridable: true,
    },
    "rmd-typography-desktop-max-line-length": {
      name: "rmd-typography-desktop-max-line-length",
      description:
        "The max length a line of text can be on larger screens (mostly desktops or landscape tablets).\n",
      source: "packages/typography/src/_variables.scss#L83",
      packageName: "typography",
      type: "Number",
      value: "40em",
      overridable: true,
    },
    "rmd-typography-text-container-breakpoint": {
      name: "rmd-typography-text-container-breakpoint",
      description:
        "The device width that should be used to swap between the mobile and desktop text container widths.\n",
      source: "packages/typography/src/_variables.scss#L87",
      packageName: "typography",
      type: "Number",
      value: "37.5rem",
      overridable: true,
    },
    "rmd-typography-base": {
      name: "rmd-typography-base",
      description: "The base styles for typography.\n",
      source: "packages/typography/src/_variables.scss#L91-L95",
      usedBy: [
        {
          name: "rmd-typography-base",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "Map",
      value:
        "(\n  font-family: $rmd-typography-font-family,\n  -moz-osx-font-smoothing: grayscale,\n  -webkit-font-smoothing: antialiased,\n)",
      compiled:
        "(\n  font-family: Roboto,\n  sans-serif,\n  -moz-osx-font-smoothing: grayscale,\n  -webkit-font-smoothing: antialiased,\n)",
      overridable: false,
    },
    "rmd-typography-thin": {
      name: "rmd-typography-thin",
      description: "The thin font weight to use.\n",
      source: "packages/typography/src/_variables.scss#L99",
      packageName: "typography",
      type: "Number",
      value: "100",
      overridable: true,
    },
    "rmd-typography-light": {
      name: "rmd-typography-light",
      description: "The light font weight to use.\n",
      source: "packages/typography/src/_variables.scss#L103",
      packageName: "typography",
      type: "Number",
      value: "300",
      overridable: true,
    },
    "rmd-typography-regular": {
      name: "rmd-typography-regular",
      description: "The regular font weight to use.\n",
      source: "packages/typography/src/_variables.scss#L107",
      packageName: "typography",
      type: "Number",
      value: "400",
      overridable: true,
    },
    "rmd-typography-medium": {
      name: "rmd-typography-medium",
      description: "The medium font weight to use.\n",
      source: "packages/typography/src/_variables.scss#L111",
      packageName: "typography",
      type: "Number",
      value: "500",
      overridable: true,
    },
    "rmd-typography-bold": {
      name: "rmd-typography-bold",
      description: "The bold font weight to use.\n",
      source: "packages/typography/src/_variables.scss#L115",
      packageName: "typography",
      type: "Number",
      value: "700",
      overridable: true,
    },
    "rmd-typography-semi-bold": {
      name: "rmd-typography-semi-bold",
      description: "The semi-bold font weight to use.\n",
      source: "packages/typography/src/_variables.scss#L119",
      packageName: "typography",
      type: "Number",
      value: "800",
      overridable: true,
    },
    "rmd-typography-black": {
      name: "rmd-typography-black",
      description: "The darkest font weight to use.\n",
      source: "packages/typography/src/_variables.scss#L123",
      packageName: "typography",
      type: "Number",
      value: "900",
      overridable: true,
    },
    "rmd-typography-font-weights": {
      name: "rmd-typography-font-weights",
      description: "A Map of all the font weights.\n\n",
      source: "packages/typography/src/_variables.scss#L135-L143",
      usedBy: [
        {
          name: "rmd-icon-material-icons-font-face",
          type: "mixin",
          packageName: "icon",
        },
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "Map",
      value:
        "(\n  thin: $rmd-typography-thin,\n  light: $rmd-typography-light,\n  regular: $rmd-typography-regular,\n  medium: $rmd-typography-medium,\n  bold: $rmd-typography-bold,\n  semi-bold: $rmd-typography-semi-bold,\n  black: $rmd-typography-black,\n)",
      compiled:
        "(\n  thin: 100,\n  light: 300,\n  regular: 400,\n  medium: 500,\n  bold: 700,\n  semi-bold: 800,\n  black: 900,\n)",
      overridable: true,
    },
    "rmd-typography-default-font-weights": {
      name: "rmd-typography-default-font-weights",
      description:
        'A list of the "default" font weights that are normally included within an app.\nThis is really only used for hosting fonts on your own server.\n\nEach value in this should be one of the keys in `$rmd-typography-font-weights`.\n\n',
      source: "packages/typography/src/_variables.scss#L151",
      usedBy: [
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "List",
      value: "light regular medium bold",
      overridable: true,
    },
    "rmd-typography-colors": {
      name: "rmd-typography-colors",
      description:
        "A map of colors that should be added for the `Text` component. If you aren't going\nto use the `color` prop on the `Text` component, set this value to an empty map\nto reduce your bundle size by a slight amount.\n",
      source: "packages/typography/src/_variables.scss#L157-L164",
      usedBy: [
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "Map",
      value:
        "(\n  secondary: text-secondary-on-background,\n  hint: text-hint-on-background,\n  theme-primary: primary,\n  theme-secondary: secondary,\n  theme-warning: warning,\n  theme-error: error,\n)",
      overridable: true,
    },
    "rmd-typography-alignments": {
      name: "rmd-typography-alignments",
      description:
        "A list of `text-align` styles to generate. If you don't want the helper classes for\ntext alignment, set this to an empty list to reduce your bundle size by a slight\namount.\n",
      source: "packages/typography/src/_variables.scss#L170",
      usedBy: [
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "List",
      value: "left center right",
      overridable: true,
    },
    "rmd-typography-decorations": {
      name: "rmd-typography-decorations",
      description:
        "A list of `text-decoration` to apply. If you don't want the helper classes for text\ndecoration, set this to an empty list to reduce your bundle size by a slight amount.\n",
      source: "packages/typography/src/_variables.scss#L175",
      usedBy: [
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "List",
      value: "underline overline line-through",
      overridable: true,
    },
    "rmd-typography-transforms": {
      name: "rmd-typography-transforms",
      description:
        "A list of `text-transform` to apply. If you don't want the helper classes for text\ntransformation, set this to an empty list to reduce your bundle size by a slight\namount.\n",
      source: "packages/typography/src/_variables.scss#L181",
      usedBy: [
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "List",
      value: "capitalize uppercase lowercase",
      overridable: true,
    },
    "rmd-typography-google-font-weight-suffixes": {
      name: "rmd-typography-google-font-weight-suffixes",
      description:
        "A Map of font weights to a font file suffix for a Google font.\n\n",
      source: "packages/typography/src/_variables.scss#L193-L201",
      usedBy: [
        {
          name: "rmd-typography-google-font-suffix",
          type: "function",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "Map",
      value:
        "(\n  thin: '-Thin',\n  light: '-Light',\n  regular: '-Regular',\n  medium: '-Medium',\n  bold: '-Bold',\n  semi-bold: '-SemiBold',\n  black: '-Black',\n)",
      overridable: true,
    },
    "rmd-typography-styles": {
      name: "rmd-typography-styles",
      description: "A Map of all the typography styles in react-md\n\n",
      source: "packages/typography/src/_variables.scss#L219-L327",
      usedBy: [
        {
          name: "rmd-typography-value",
          type: "function",
          packageName: "typography",
        },
        { name: "rmd-typography", type: "mixin", packageName: "typography" },
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "Map",
      value:
        "rmd-typography-set-styles(\n  $rmd-typography-base,\n  (\n    headline-1: (\n      font-size: 6rem,\n      line-height: 6rem,\n      font-weight: map-get($rmd-typography-font-weights, light),\n      letter-spacing: rmd-typography-get-letter-spacing(-1.5, 6),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-2: (\n      font-size: 3.75rem,\n      line-height: 3.75rem,\n      font-weight: map-get($rmd-typography-font-weights, light),\n      letter-spacing: rmd-typography-get-letter-spacing(-0.5, 3.75),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-3: (\n      font-size: 3rem,\n      line-height: 3.125rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: normal,\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-4: (\n      font-size: 2.125rem,\n      line-height: 2.5rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.25, 2.125),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-5: (\n      font-size: 1.5rem,\n      line-height: 2rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: normal,\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    headline-6: (\n      font-size: 1.25rem,\n      line-height: 2rem,\n      font-weight: map-get($rmd-typography-font-weights, medium),\n      letter-spacing: rmd-typography-get-letter-spacing(0.25, 1.25),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    subtitle-1: (\n      font-size: 1rem,\n      line-height: 1.75rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.15, 1),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    subtitle-2: (\n      font-size: 0.875rem,\n      line-height: 1.375rem,\n      font-weight: map-get($rmd-typography-font-weights, medium),\n      letter-spacing: rmd-typography-get-letter-spacing(0.1, 0.875),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    body-1: (\n      font-size: 1rem,\n      line-height: 1.5rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.5, 0.875),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    body-2: (\n      font-size: 0.875rem,\n      line-height: 1.25rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.25, 0.875),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    caption: (\n      font-size: 0.75rem,\n      line-height: 1.25rem,\n      font-weight: map-get($rmd-typography-font-weights, regular),\n      letter-spacing: rmd-typography-get-letter-spacing(0.4, 0.75),\n      text-decoration: inherit,\n      text-transform: inherit,\n    ),\n    button: (\n      font-size: 0.875rem,\n      line-height: 2.25rem,\n      font-weight: map-get($rmd-typography-font-weights, medium),\n      letter-spacing: rmd-typography-get-letter-spacing(1.25, 0.875),\n      text-decoration: none,\n      text-transform: uppercase,\n    ),\n    overline: (\n      font-size: 0.75rem,\n      line-height: 2rem,\n      font-weight: map-get($rmd-typography-font-weights, medium),\n      letter-spacing: rmd-typography-get-letter-spacing(2, 0.75),\n      text-decoration: none,\n      text-transform: uppercase,\n    ),\n  )\n)",
      compiled:
        "(\n  headline-1: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 6rem,\n    line-height: 6rem,\n    font-weight: 300,\n    letter-spacing: -0.01562em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  headline-2: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 3.75rem,\n    line-height: 3.75rem,\n    font-weight: 300,\n    letter-spacing: -0.00833em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  headline-3: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 3rem,\n    line-height: 3.125rem,\n    font-weight: 400,\n    letter-spacing: normal,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  headline-4: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 2.125rem,\n    line-height: 2.5rem,\n    font-weight: 400,\n    letter-spacing: 0.00735em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  headline-5: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 1.5rem,\n    line-height: 2rem,\n    font-weight: 400,\n    letter-spacing: normal,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  headline-6: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 1.25rem,\n    line-height: 2rem,\n    font-weight: 500,\n    letter-spacing: 0.0125em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  subtitle-1: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 1rem,\n    line-height: 1.75rem,\n    font-weight: 400,\n    letter-spacing: 0.00937em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  subtitle-2: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.875rem,\n    line-height: 1.375rem,\n    font-weight: 500,\n    letter-spacing: 0.00714em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  body-1: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 1rem,\n    line-height: 1.5rem,\n    font-weight: 400,\n    letter-spacing: 0.03571em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  body-2: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.875rem,\n    line-height: 1.25rem,\n    font-weight: 400,\n    letter-spacing: 0.01786em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  caption: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.75rem,\n    line-height: 1.25rem,\n    font-weight: 400,\n    letter-spacing: 0.03333em,\n    text-decoration: inherit,\n    text-transform: inherit,\n  ),\n  button: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.875rem,\n    line-height: 2.25rem,\n    font-weight: 500,\n    letter-spacing: 0.08929em,\n    text-decoration: none,\n    text-transform: uppercase,\n  ),\n  overline: (\n    font-family: Roboto,\n    sans-serif,\n    -moz-osx-font-smoothing: grayscale,\n    -webkit-font-smoothing: antialiased,\n    font-size: 0.75rem,\n    line-height: 2rem,\n    font-weight: 500,\n    letter-spacing: 0.16667em,\n    text-decoration: none,\n    text-transform: uppercase,\n  ),\n)",
      overridable: false,
    },
    "rmd-typography-theme-values": {
      name: "rmd-typography-theme-values",
      description:
        'A Map of all the "themeable" parts of the typography package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/typography/src/_variables.scss#L333-L337",
      usedBy: [
        {
          name: "rmd-typography-theme",
          type: "function",
          packageName: "typography",
        },
        {
          name: "rmd-typography-theme-var",
          type: "function",
          packageName: "typography",
        },
        {
          name: "rmd-typography-theme",
          type: "mixin",
          packageName: "typography",
        },
        {
          name: "rmd-typography-theme-update-var",
          type: "mixin",
          packageName: "typography",
        },
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      type: "Map",
      value:
        "(\n  line-width: $rmd-typography-desktop-max-line-length,\n  mobile-line-width: $rmd-typography-mobile-max-line-length,\n  desktop-line-width: $rmd-typography-desktop-max-line-length,\n)",
      compiled:
        "(\n  line-width: 40em,\n  mobile-line-width: 17em,\n  desktop-line-width: 40em,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
