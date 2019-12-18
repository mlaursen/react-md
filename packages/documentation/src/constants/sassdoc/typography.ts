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
        "@function rmd-typography-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-typography-theme-values,\n    typography\n  );\n}\n",
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
        "@function rmd-typography-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-typography-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-typography-theme-values,\n    typography,\n    $fallback\n  );\n}\n",
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
        '@function rmd-typography-google-font-suffix($weight) {\n  @return rmd-utils-validate(\n    $rmd-typography-google-font-weight-suffixes,\n    $weight,\n    "Google font weight suffix"\n  );\n}\n',
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
      code: "@function rmd-typography-value($style, $property) { … }",
      sourceCode:
        '@function rmd-typography-value($style, $property) {\n  $style-props: rmd-utils-validate($rmd-typography-styles, $style, typography);\n\n  @return rmd-utils-validate(\n    $style-props,\n    $property,\n    "typography #{$style} property"\n  );\n}\n',
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
        "Creates the styles for one of the typography's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      source: "packages/typography/src/_mixins.scss#L19-L26",
      usedBy: [
        {
          name: "rmd-text-container-base",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      code:
        "@mixin rmd-typography-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-typography-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-typography-theme-values,\n    typography\n  );\n}\n",
      type: "mixin",
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
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-typography-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-typography-theme-update-var": {
      name: "rmd-typography-theme-update-var",
      description:
        "Updates one of the typography's theme variables with the new value for the section\nof your app.\n\n",
      source: "packages/typography/src/_mixins.scss#L34-L36",
      usedBy: [
        {
          name: "rmd-text-container-auto",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      code:
        "@mixin rmd-typography-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-typography-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-typography-theme-values,\n    typography\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The typography theme style type to update. This should be one\n  of the `$rmd-typography-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-typography-value": {
      name: "rmd-typography-value",
      description:
        "Applies each property value from the `$rmd-typography-styles` map that matches the style name.\n\n",
      source: "packages/typography/src/_mixins.scss#L57-L65",
      usedBy: [
        { name: "rmd-card-title", type: "mixin", packageName: "card" },
        { name: "react-md-link", type: "mixin", packageName: "link" },
        { name: "rmd-tooltip-base", type: "mixin", packageName: "tooltip" },
      ],
      packageName: "typography",
      examples: [
        {
          code:
            ".body-1-font-size {\n  // when no properties are provided, it will default to font-size\n  @include rmd-typography-value(body-1);\n}\n\n.headline-4-letter-spacing {\n  @include rmd-typography-value(headline-4, letter-spacing);\n}\n\n.caption-styles {\n  @include rmd-typography-value(\n    caption,\n    font-size,\n    letter-spacing,\n    line-height\n  );\n}\n",
          compiled:
            ".body-1-font-size {\n  font-size: 1rem;\n}\n\n.headline-4-letter-spacing {\n  letter-spacing: 0.00735em;\n}\n\n.caption-styles {\n  font-size: 0.75rem;\n  letter-spacing: 0.03333em;\n  line-height: 1.25rem;\n}\n",
          type: "scss",
          description: "Simple Examples",
        },
      ],
      code: "@mixin rmd-typography-value($style, $properties: font-size) { … }",
      sourceCode:
        "@mixin rmd-typography-value($style, $properties: font-size) {\n  @if length($properties) == 0 {\n    $properties: append($properties, font-size);\n  }\n\n  @each $property in $properties {\n    #{$property}: rmd-typography-value($style, $property);\n  }\n}\n",
      type: "mixin",
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
    "rmd-typography-base": {
      name: "rmd-typography-base",
      description: "Applies the base typography styles to an element.\n\n",
      source: "packages/typography/src/_mixins.scss#L75-L79",
      usedBy: [
        { name: "react-md-avatar", type: "mixin", packageName: "avatar" },
        { name: "react-md-link", type: "mixin", packageName: "link" },
        { name: "rmd-tooltip-base", type: "mixin", packageName: "tooltip" },
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
        { name: "rmd-utils-base", type: "mixin", packageName: "utils" },
      ],
      packageName: "typography",
      examples: [
        {
          code:
            ".custom-class-name {\n  @include rmd-typography-base;\n\n  font-size: 1.3rem;\n}\n",
          compiled:
            ".custom-class-name {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.3rem;\n}\n",
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-typography-base { … }",
      sourceCode:
        "@mixin rmd-typography-base {\n  @each $key, $value in $rmd-typography-base {\n    #{$key}: $value;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-typography": {
      name: "rmd-typography",
      description:
        "Applies one of the provided material design styles to an element.\n",
      source: "packages/typography/src/_mixins.scss#L84-L92",
      usedBy: [
        { name: "react-md-alert", type: "mixin", packageName: "alert" },
        { name: "rmd-app-bar-title", type: "mixin", packageName: "app-bar" },
        { name: "rmd-badge", type: "mixin", packageName: "badge" },
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-card-title", type: "mixin", packageName: "card" },
        { name: "rmd-card-subtitle", type: "mixin", packageName: "card" },
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        { name: "rmd-label", type: "mixin", packageName: "form" },
        { name: "rmd-text-field-base", type: "mixin", packageName: "form" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list-subheader", type: "mixin", packageName: "list" },
        {
          name: "react-md-typography",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      code: "@mixin rmd-typography($style, $omit) { … }",
      sourceCode:
        "@mixin rmd-typography($style, $omit) {\n  $style-props: rmd-utils-validate($rmd-typography-styles, $style, typography);\n\n  @each $key, $value in $style-props {\n    @if not index($omit, $key) {\n      #{$key}: $value;\n    }\n  }\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "One of the typography styles from `$rmd-typography-styles`.",
        },
        { type: "List", name: "omit", description: "A list of keys to omit" },
      ],
    },
    "rmd-text-container-base": {
      name: "rmd-text-container-base",
      description:
        "Creates the base styles required for the text container. These styles are used\nto be able to center the text in a container once the `max-width` value has\nalso been applied.\n",
      source: "packages/typography/src/_mixins.scss#L97-L104",
      packageName: "typography",
      code: "@mixin rmd-text-container-base { … }",
      sourceCode:
        "@mixin rmd-text-container-base {\n  @include rmd-typography-theme(max-width, line-width);\n\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 100%;\n}\n",
      type: "mixin",
    },
    "rmd-text-container-auto": {
      name: "rmd-text-container-auto",
      description:
        "This will generate the styles to apply to an element that will set the max width for legibility. By default,\nthis will create styles that change based on the provided `$mobile-breakpoint` and apply different max\nwidths on a media query. This feature can be disabled by setting the `$mobile-breakpoint` or the `$desktop-max-width`\nparameters to `null`.\n\nUnlike everything else in react-md, the text container relies on having the `box-sizing` set to `content-box` so that\nthe text contents can be centered correctly with a max width and padding. When this is set to `border-box`, you will\nlose the padding real estate in your text container which is something that might not be desired. Keeping this as\n`content-box` will allow padding to be applied without shrinking the max line length.\n\n",
      source: "packages/typography/src/_mixins.scss#L148-L159",
      packageName: "typography",
      examples: [
        {
          code:
            ".blog {\n  @include rmd-text-container-base;\n  @include rmd-text-container-auto;\n}\n\n.title {\n  @include rmd-typography(headline-2);\n}\n\n.paragraph {\n  @include rmd-typography(headline-4);\n\n  @media (max-width: 800px) {\n    @include rmd-typography(headline-5);\n  }\n}\n",
          compiled:
            ".blog {\n  max-width: var(--rmd-typography-line-width, 40em);\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 100%;\n}\n@media (max-width: 37.5rem) {\n  .blog {\n    --rmd-typography-line-width: var(--rmd-typography-mobile-line-width, 17em);\n  }\n}\n\n.title {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3.75rem;\n  line-height: 3.75rem;\n  font-weight: 300;\n  letter-spacing: -0.00833em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n.paragraph {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.125rem;\n  line-height: 2.5rem;\n  font-weight: 400;\n  letter-spacing: 0.00735em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n@media (max-width: 800px) {\n  .paragraph {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1.5rem;\n    line-height: 2rem;\n    font-weight: 400;\n    letter-spacing: normal;\n    text-decoration: inherit;\n    text-transform: inherit;\n  }\n}\n",
          type: "scss",
          description: 'Creating a "blog"',
        },
        {
          code:
            '<main class="blog">\n  <h1 class="title">Blog Title</h1>\n  <p class="paragraph">Lorem ipsum...</p>\n  <p class="paragraph">Lorem ipsum...</p>\n</main>\n',
          type: "html",
          description: 'Creating a "blog"',
        },
      ],
      code:
        "@mixin rmd-text-container-auto($mobile-max-width: $rmd-typography-mobile-max-line-length, $desktop-max-width: $rmd-typography-desktop-max-line-length, $mobile-breakpoint: $rmd-typography-text-container-breakpoint) { … }",
      sourceCode:
        "@mixin rmd-text-container-auto(\n  $mobile-max-width: $rmd-typography-mobile-max-line-length,\n  $desktop-max-width: $rmd-typography-desktop-max-line-length,\n  $mobile-breakpoint: $rmd-typography-text-container-breakpoint\n) {\n  @media (max-width: #{$mobile-breakpoint}) {\n    @include rmd-typography-theme-update-var(\n      line-width,\n      rmd-typography-theme-var(mobile-line-width)\n    );\n  }\n}\n",
      type: "mixin",
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
    "rmd-typography-text-overflow-ellipsis": {
      name: "rmd-typography-text-overflow-ellipsis",
      description:
        "A simple mixin that can be used to update an element to ellipsis text when\nit is too long.\n\n",
      source: "packages/typography/src/_mixins.scss#L195-L199",
      usedBy: [
        { name: "rmd-app-bar-title", type: "mixin", packageName: "app-bar" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      packageName: "typography",
      examples: [
        {
          code:
            ".truncate-this {\n  @include rmd-typography-text-overflow-ellipsis;\n\n  width: 5rem;\n}\n",
          compiled:
            ".truncate-this {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 5rem;\n}\n",
          type: "scss",
          description: "Example Usage",
        },
      ],
      code: "@mixin rmd-typography-text-overflow-ellipsis { … }",
      sourceCode:
        "@mixin rmd-typography-text-overflow-ellipsis {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n",
      type: "mixin",
    },
    "react-md-typography": {
      name: "react-md-typography",
      description:
        "Creates all the typography styles from the react-md typography variables.\n",
      source: "packages/typography/src/_mixins.scss#L202-L266",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "typography",
      code: "@mixin react-md-typography { … }",
      sourceCode:
        '@mixin react-md-typography {\n  @include rmd-theme-create-root-theme(\n    $rmd-typography-theme-values,\n    typography\n  );\n\n  .rmd-typography {\n    @include rmd-typography-base;\n\n    @each $suffix in map-keys($rmd-typography-styles) {\n      &--#{$suffix} {\n        @include rmd-typography($suffix);\n      }\n    }\n\n    @each $weight in $rmd-typography-default-font-weights {\n      &--#{$weight} {\n        font-weight: map-get($rmd-typography-font-weights, $weight);\n      }\n    }\n\n    @each $suffix, $theme-style in $rmd-typography-colors {\n      &--#{$suffix} {\n        @include rmd-theme(color, $theme-style);\n      }\n    }\n\n    @each $align in $rmd-typography-alignments {\n      &--#{$align} {\n        text-align: $align;\n      }\n    }\n\n    @each $decoration in $rmd-typography-decorations {\n      $suffix: $decoration +\n        if($decoration == overline, "overline-decoration", "");\n\n      &--#{$suffix} {\n        text-decoration: $decoration;\n      }\n    }\n\n    @each $transform in $rmd-typography-transforms {\n      &--#{$transform} {\n        text-transform: $transform;\n      }\n    }\n\n    &--no-margin {\n      margin: 0;\n    }\n\n    &--no-margin-top {\n      margin-top: 0;\n    }\n\n    &--no-margin-bottom {\n      margin-bottom: 0;\n    }\n  }\n\n  .rmd-text-container {\n    @include rmd-text-container;\n  }\n\n  .rmd-sr-only {\n    @include rmd-utils-sr-only(true);\n  }\n}\n',
      type: "mixin",
    },
    "rmd-typography-google-font-face": {
      name: "rmd-typography-google-font-face",
      description:
        "Creates the font face declaration for a Google font with a provided font weight. This will\nneed to be called multiple times if you are including multiple font weights.\n\nThis should only be used if you are hosting the Google font locally instead of through the\nGoogle fonts service.\n\n",
      source: "packages/typography/src/_mixins.scss#L303-L332",
      usedBy: [
        {
          name: "rmd-typography-host-google-font",
          type: "mixin",
          packageName: "typography",
        },
        {
          name: "rmd-typography-host-google-font",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      examples: [
        {
          code:
            '@include rmd-typography-google-font-face(Roboto, regular, null);\n@include rmd-typography-google-font-face("Source Code Pro", regular, null);\n',
          compiled:
            '@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Source Code Pro), local(SourceCodePro-Regular),\n    url("/fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
        {
          code:
            '@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: 400;\n  src: local("Roboto"), local("Roboto-Regular"),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: 400;\n  src: local("Source Code Pro"), local("SourceCodePro-Regular"),\n    url("/fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");\n}\n',
          type: "css",
          description: "Example Usage Generated SCSS",
        },
      ],
      code:
        "@mixin rmd-typography-google-font-face($font-name: Roboto, $font-weight: map-get($rmd-typography-font-weights, regular), $font-url-or-prefix: null) { … }",
      sourceCode:
        '@mixin rmd-typography-google-font-face(\n  $font-name: Roboto,\n  $font-weight: map-get($rmd-typography-font-weights, regular),\n  $font-url-or-prefix: null\n) {\n  $full-font-name: str-replace($font-name, " ", "") +\n    rmd-typography-google-font-suffix($font-weight);\n\n  $font-url-prefix: "";\n  $font-url: null;\n  @if $font-url-or-prefix == null pr type-of($font-url-or-prefix) == "string" {\n    $font-url: if(\n      $font-url == null,\n      "/fonts/" + to-lower-case(str-replace($font-name, " ", "-")),\n      $font-url\n    );\n    $font-url: if(char-at($font-url) != "/", $font-url + "/", $font-url);\n    $font-url: url($font-url+$full-font-name+".ttf");\n  } @else {\n    $font-url: $font-url-or-prefix;\n  }\n\n  @font-face {\n    font-family: quote($font-name);\n    font-style: normal;\n    font-weight: $font-weight;\n    src: local(#{quote($font-name)}), local(#{quote($full-font-name)}),\n      #{$font-url} format("truetype");\n  }\n}\n',
      type: "mixin",
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
    "rmd-typography-host-google-font": {
      name: "rmd-typography-host-google-font",
      description:
        "Generates all the font faces (with font weights) for a Google font. This should only be used if you are hosting the Google font\non your own servers instead of through the Google fonts service.\n\nIf you are using create-react-app, you must provide the `$font-url-prefix-or-url-map` as a Map of urls to have the font files\ncorrectly included and bundled during your build. See the examples for more details.\n\n",
      source: "packages/typography/src/_mixins.scss#L373-L389",
      links: [
        {
          name: "Adding Images, Fonts, and Files",
          href:
            "https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-images-fonts-and-files",
        },
      ],
      see: [
        {
          name: "rmd-typography-google-font-face",
          type: "mixin",
          packageName: "typography",
        },
      ],
      packageName: "typography",
      examples: [
        {
          code:
            "// This is going to assume you have downloaded the material-icons zip with all the icon font files and copied it into\n// `src/fonts/material-icons` and you are including the fonts in `src/index.scss`\n@include rmd-typography-host-google-font(\n  Roboto,\n  $rmd-typography-default-font-weights,\n  (\n    light: url(./fonts/roboto/Roboto-Light.ttf),\n    regular: url(./fonts/roboto/Roboto-Regular.ttf),\n    medium: url(./fonts/roboto/Roboto-Medium.ttf),\n    bold: url(./fonts/roboto/Roboto-Bold.ttf),\n  )\n);\n\n@include rmd-typography-host-google-font(\n  SourceCodePro,\n  $rmd-typography-default-font-weights,\n  (\n    light: url(./fonts/source-code-pro/SourceCodePro-Light.ttf),\n    regular: url(./fonts/source-code-pro/SourceCodePro-Regular.ttf),\n    medium: url(./fonts/source-code-pro/SourceCodePro-Medium.ttf),\n    bold: url(./fonts/source-code-pro/SourceCodePro-Bold.ttf),\n  )\n);\n",
          compiled:
            '@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: light;\n  src: local(Roboto), local(Roboto-Light),\n    url("/fonts/roboto/Roboto-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Roboto), local(Roboto-Medium),\n    url("/fonts/roboto/Roboto-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Roboto), local(Roboto-Bold),\n    url("/fonts/roboto/Roboto-Bold.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "SourceCodePro";\n  font-style: normal;\n  font-weight: light;\n  src: local(SourceCodePro), local(SourceCodePro-Light),\n    url("/fonts/sourcecodepro/SourceCodePro-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "SourceCodePro";\n  font-style: normal;\n  font-weight: regular;\n  src: local(SourceCodePro), local(SourceCodePro-Regular),\n    url("/fonts/sourcecodepro/SourceCodePro-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "SourceCodePro";\n  font-style: normal;\n  font-weight: medium;\n  src: local(SourceCodePro), local(SourceCodePro-Medium),\n    url("/fonts/sourcecodepro/SourceCodePro-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "SourceCodePro";\n  font-style: normal;\n  font-weight: bold;\n  src: local(SourceCodePro), local(SourceCodePro-Bold),\n    url("/fonts/sourcecodepro/SourceCodePro-Bold.ttf") format("truetype");\n}\n',
          type: "scss",
          description: "create-react-app Example Usage",
        },
        {
          code:
            '// The next 3 lines are equivalent\n@include rmd-typography-host-google-font;\n@include rmd-typography-host-google-font(\n  Roboto,\n  $rmd-typography-default-font-weights,\n  null\n);\n@include rmd-typography-host-google-font(\n  Roboto,\n  $rmd-typography-default-font-weights,\n  "/fonts/roboto"\n);\n@include rmd-typography-host-google-font("Source Code Pro");\n',
          compiled:
            '@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: light;\n  src: local(Roboto), local(Roboto-Light),\n    url("/fonts/roboto/Roboto-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Roboto), local(Roboto-Medium),\n    url("/fonts/roboto/Roboto-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Roboto), local(Roboto-Bold),\n    url("/fonts/roboto/Roboto-Bold.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: light;\n  src: local(Roboto), local(Roboto-Light),\n    url("/fonts/roboto/Roboto-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Roboto), local(Roboto-Medium),\n    url("/fonts/roboto/Roboto-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Roboto), local(Roboto-Bold),\n    url("/fonts/roboto/Roboto-Bold.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: light;\n  src: local(Roboto), local(Roboto-Light),\n    url("/fonts/roboto/Roboto-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Roboto), local(Roboto-Regular),\n    url("/fonts/roboto/Roboto-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Roboto), local(Roboto-Medium),\n    url("/fonts/roboto/Roboto-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Roboto";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Roboto), local(Roboto-Bold),\n    url("/fonts/roboto/Roboto-Bold.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: light;\n  src: local(Source Code Pro), local(SourceCodePro-Light),\n    url("/fonts/source-code-pro/SourceCodePro-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Source Code Pro), local(SourceCodePro-Regular),\n    url("/fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Source Code Pro), local(SourceCodePro-Medium),\n    url("/fonts/source-code-pro/SourceCodePro-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Source Code Pro), local(SourceCodePro-Bold),\n    url("/fonts/source-code-pro/SourceCodePro-Bold.ttf") format("truetype");\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code:
        "@mixin rmd-typography-host-google-font($font-name: Roboto, $weights: $rmd-typography-default-font-weights, $font-url-prefix-or-url-map: null) { … }",
      sourceCode:
        '@mixin rmd-typography-host-google-font(\n  $font-name: Roboto,\n  $weights: $rmd-typography-default-font-weights,\n  $font-url-prefix-or-url-map: null\n) {\n  @each $weight in $weights {\n    @if type-of($font-url-prefix-or-url-map) ==\n      "string" or\n      $font-url-prefix-or-url-map ==\n      null\n    {\n      @include rmd-typography-google-font-face(\n        $font-name,\n        $weight,\n        $font-url-prefix-or-url-map\n      );\n    } @else {\n      @include rmd-typography-google-font-face(\n        $font-name,\n        $weight,\n        rmd-utils-validate(\n          $font-url-prefix-or-url-map,\n          $weight,\n          "Google font weight"\n        )\n      );\n    }\n  }\n}\n',
      type: "mixin",
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
          type: "Map|String",
          name: "font-url-prefix-or-url-map",
          default: "null",
          description:
            "This is either a font url prefix for the folder containing the font on your\n  server or a url string to the font icon file on your server. If you are using create-react-app, you **must** use the\n  url string approach for it to be correctly included in the build process. If this value is null, it will default to have\n  '/fonts/' prefix and then a caterpillar-cased string. See the `rmd-typography-google-font-face` mixin for more details.",
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
