/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const IconSassDoc: PackageSassDoc = {
  name: "icon",
  variables: [
    {
      name: "rmd-icon-color",
      type: "Color",
      description: "The base icon color to apply.\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [],
      links: [],
      value: "rmd-theme-var(text-icon-on-background)",
      compiledValue: "var(--rmd-theme-text-icon-on-background, #757575)",
      configurable: true,
    },
    {
      name: "rmd-icon-size",
      type: "Number",
      description: "The base icon size to use.\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [],
      links: [],
      value: "1.5rem",
      compiledValue: "1.5rem",
      configurable: true,
    },
    {
      name: "rmd-icon-dense-size",
      type: "Number",
      description:
        "The dense icon size to use. If you do not want to include the dense icon spec, disable the\n`$rmd-icon-include-dense` variable.\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [
        {
          name: "rmd-icon-include-dense",
          type: "variable",
          description:
            "Boolean if the dense spec for icons should be included. This will just generate `.md-icon--font-dense` and `.md-icon--svg-dense` class names\nthat can be applied.\n\n",
          group: "icon",
        },
      ],
      links: [],
      value: "1.25rem",
      compiledValue: "1.25rem",
      configurable: true,
    },
    {
      name: "rmd-icon-include-dense",
      type: "Boolean",
      description:
        "Boolean if the dense spec for icons should be included. This will just generate `.md-icon--font-dense` and `.md-icon--svg-dense` class names\nthat can be applied.\n\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-icon-use-font-icons",
      type: "Boolean",
      description:
        "Boolean if font icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can\ndisable the style generation for the unused type to save a few bytes.\n\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [
        {
          name: "rmd-icon-use-svg-icons",
          type: "variable",
          description:
            "Boolean if svg icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can\ndisable the style generation for the unused type to save a few bytes.\n\n",
          group: "icon",
        },
      ],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-icon-use-svg-icons",
      type: "Boolean",
      description:
        "Boolean if svg icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can\ndisable the style generation for the unused type to save a few bytes.\n\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [
        {
          name: "rmd-icon-use-svg-icons",
          type: "variable",
          description:
            "Boolean if svg icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can\ndisable the style generation for the unused type to save a few bytes.\n\n",
          group: "icon",
        },
      ],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-icon-spacing-with-text",
      type: "Number",
      description:
        "The amount of spacing to apply between an icon and text within the `TextIconSpacing` component.\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [],
      links: [],
      value: "0.5rem",
      compiledValue: "0.5rem",
      configurable: true,
    },
    {
      name: "rmd-icon-rotator-transition-time",
      type: "Number",
      description:
        "The transition time for the icon rotator to fully rotate.\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-icon-rotator-from",
      type: "Number",
      description:
        "The default starting position for the `IconRotator` component. This needs to be\na valid transformation value to work.\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [],
      links: [],
      value: "rotate(0deg)",
      compiledValue: "rotate(0deg)",
      configurable: true,
    },
    {
      name: "rmd-icon-rotator-to",
      type: "Number",
      description:
        "The default ending position for the `IconRotator` component. This needs to be\na valid transformation value to work.\n",
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [],
      links: [],
      value: "rotate(180deg)",
      compiledValue: "rotate(180deg)",
      configurable: true,
    },
    {
      name: "rmd-icon-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the icon package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/icon/dist/_variables.scss",
      group: "icon",
      see: [],
      links: [],
      value:
        "(\n  color: $rmd-icon-color,\n  size: $rmd-icon-size,\n  dense-size: $rmd-icon-dense-size,\n  text-spacing: $rmd-icon-spacing-with-text,\n  rotate-to: $rmd-icon-rotator-to,\n  rotate-from: $rmd-icon-rotator-from,\n)",
      compiledValue:
        "(\n  color: var(--rmd-theme-text-icon-on-background, #757575),\n  size: 1.5rem,\n  dense-size: 1.25rem,\n  text-spacing: 0.5rem,\n  rotate-to: rotate(180deg),\n  rotate-from: rotate(0deg),\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-icon-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the icon's theme values. This is really\njust for the `rmd-icon-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/icon/dist/_functions.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@function rmd-icon-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-icon-theme-values, icon);\n}",
      oneLineCode: "@function rmd-icon-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-icon-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the icon's theme values.",
      },
    },
    {
      name: "rmd-icon-theme-var",
      type: "function",
      description:
        "This function is used to get one of the icon's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-icon-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/icon/dist/_functions.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@function rmd-icon-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-icon-theme-values, icon, $fallback);\n}",
      oneLineCode:
        "@function rmd-icon-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-icon-theme-values` map keys to set a value for.",
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
        description: "one of the link's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-icon-material-icons-font-face",
      type: "mixin",
      description:
        "Creates the font face for material icons. This takes either a font url prefix string or a map of urls for each required\nfont file. If you are using create-react-app, you **must** use the Map version so the fonts can be\ncorrectly included by the build process.\n\n",
      file: "@react-md/icon/dist/_material-icons.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-material-icons-font-face($font-url-or-map: '/fonts/material-icons', $old-ie-support: false) {\n  $font-family: 'Material Icons';\n  $font-name: 'MaterialIcons-Regular';\n\n  $font-url: '';\n  $font-map: null;\n  @if type-of($font-url-or-map) == 'string' {\n    $font-url: if(char-at($font-url) != '/', $font-url + '/', $font-url) + $font-name;\n  } @else {\n    $font-map: $font-url-or-map;\n    $required-keys: woff2 woff truetype;\n    @if $old-ie-support {\n      $required-keys: #{$required-keys} eot;\n    }\n\n    @each $key in $required-keys {\n      @if not map-has-key($font-map, $key) {\n        @error 'It is required to include all of \\'#{$required-keys}\\' in your font url map, but one or more was missing! Privded keys: #{map-keys($font-map)}.';\n      }\n    }\n  }\n\n  @font-face {\n    font-family: $font-family;\n    font-style: normal;\n    font-weight: map-get($rmd-typography-font-weights, normal);\n\n    @if $old-ie-support {\n      @if $font-map == null {\n        src: url($font-url+'.eot');\n      } @else {\n        src: #{map-get($font-map, eot)};\n      }\n    }\n\n    @if $font-map == null {\n      src: local($font-family), local($font-name), url($font-url+'.woff2') format('woff2'),\n        url($font-url+'.woff') format('woff') url($font-url+'.ttf') format('truetype');\n    } @else {\n      $woff2: map-get($font-url-or-map, woff2);\n      $woff: map-get($font-url-or-map, woff);\n      $truetype: map-get($font-url-or-map, truetype);\n\n      $src: local($font-family), local($font-name);\n      $src: \"local(#{$font-family}), local(#{$font-name}), #{$woff2} format('woff2'), #{$woff} format('woff'), #{$truetype} format('truetype')\";\n\n      src: #{$src};\n    }\n  }\n}",
      oneLineCode:
        "@mixin rmd-icon-material-icons-font-face($font-url-or-map: '/fonts/material-icons', $old-ie-support: false) { … }",
      throws: ["It is required to include all of \\"],
      examples: [
        {
          type: "scss",
          code:
            "// This is going to assume you have downloaded the material-icons zip with all the icon font files and copied it into\n// `src/fonts/material-icons` and you are including the fonts in `src/index.scss`\n@include rmd-icon-material-icons-font-face((\n  woff2: url(./fonts/material-icons/MaterialIcons-Regular.woff2),\n  woff: url(./fonts/material-icons/MaterialIcons-Regular.woff),\n  truetype: url(./fonts/material-icons/MaterialIcons-Regular.ttf)\n));",
          description: "create-react-app Example Usage",
          compiledCode:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local(Material Icons), local(MaterialIcons-Regular),\n    url(./fonts/material-icons/MaterialIcons-Regular.woff2) format("woff2"),\n    url(./fonts/material-icons/MaterialIcons-Regular.woff) format("woff"),\n    url(./fonts/material-icons/MaterialIcons-Regular.ttf) format("truetype");\n}\n',
        },
        {
          type: "scss",
          code:
            "$local-font-url: '/fonts/material-icons';\n@include rmd-icon-material-icons-font-face($local-font-url);",
          description: "Example Usage SCSS",
          compiledCode:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local("Material Icons"), local("MaterialIcons-Regular"),\n    url("/MaterialIcons-Regular.woff2") format("woff2"),\n    url("/MaterialIcons-Regular.woff") format("woff")\n      url("/MaterialIcons-Regular.ttf") format("truetype");\n}\n',
        },
      ],
      parameters: [
        {
          type: "String | Map",
          name: "font-url-or-map",
          default: "'/fonts/material-icons'",
          description:
            'This is either a font url prefix for the folder\n  that is "hosting" the material icons or a Map of direct urls for the eot, woff2, woff, and truetype material icon fonts.',
        },
        {
          type: "Boolean",
          name: "old-ie-support",
          default: "false",
          description:
            "Boolean if there should be a fallback for IE6-8 by including a url to\n  the eot font. If this is set to true and using the Map version of `$font-url-or-map`, you must also include a url\n  to the eot font.",
        },
      ],
    },
    {
      name: "rmd-icon-material-icons-class",
      type: "mixin",
      description:
        "Creates the material-icons css class if hosting material icons locally instead of using the\nGoogle fonts service. By default, this will not include the font-size size you _should_ be using\nthe `FontIcon` component from react-md which adds the correct font-size.\n\n",
      file: "@react-md/icon/dist/_material-icons.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-material-icons-class($include-font-size: false) {\n  .material-icons {\n    // sass-lint:disable-block property-sort-order,no-vendor-prefixes\n    @if $include-font-size {\n      @include rmd-icon-theme(font-size, size);\n    }\n\n    direction: ltr;\n    display: inline-block;\n    font-family: 'Material Icons';\n    // Support for IE.\n    font-feature-settings: 'liga';\n    // Support for Firefox.\n    -moz-osx-font-smoothing: grayscale;\n    // Support for all WebKit browsers.\n    -webkit-font-smoothing: antialiased;\n    font-style: normal;\n    font-weight: normal;\n    letter-spacing: normal;\n    line-height: 1;\n    // Support for Safari and Chrome.\n    text-rendering: optimizeLegibility;\n    text-transform: none;\n    white-space: nowrap;\n    word-wrap: normal;\n  }\n}",
      oneLineCode:
        "@mixin rmd-icon-material-icons-class($include-font-size: false) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "Boolean",
          name: "include-font-size",
          default: "false",
          description:
            "Boolean if the material icons class name should include\n  the default icon font size.",
        },
      ],
    },
    {
      name: "rmd-icon-host-material-icons",
      type: "mixin",
      description:
        "Creates both the font face and css class for material icons when hosting the fonts locally instead of using\nthe Google fonts service.  This takes either a font url prefix string or a map of urls for each required\nfont file. If you are using create-react-app, you **must** use the Map version so the fonts can be\ncorrectly included by the build process.\n\n",
      file: "@react-md/icon/dist/_material-icons.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-host-material-icons($font-url-or-map: '/fonts/material-icons', $include-font-size: false, $old-ie-support: false) {\n  @include rmd-icon-material-icons-font-face($font-url-or-map, $old-ie-support);\n  @include rmd-icon-material-icons-class($include-font-size);\n}",
      oneLineCode:
        "@mixin rmd-icon-host-material-icons($font-url-or-map: '/fonts/material-icons', $include-font-size: false, $old-ie-support: false) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            "// This is going to assume you have downloaded the material-icons zip with all the icon font files and copied it into\n// `src/fonts/material-icons` and you are including the fonts in `src/index.scss`\n@include rmd-icon-material-icons-font-face((\n  woff2: url(./fonts/material-icons/MaterialIcons-Regular.woff2),\n  woff: url(./fonts/material-icons/MaterialIcons-Regular.woff),\n  truetype: url(./fonts/material-icons/MaterialIcons-Regular.ttf)\n));",
          description: "create-react-app Example Usage",
          compiledCode:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local(Material Icons), local(MaterialIcons-Regular),\n    url(./fonts/material-icons/MaterialIcons-Regular.woff2) format("woff2"),\n    url(./fonts/material-icons/MaterialIcons-Regular.woff) format("woff"),\n    url(./fonts/material-icons/MaterialIcons-Regular.ttf) format("truetype");\n}\n',
        },
        {
          type: "scss",
          code:
            "$local-font-url: '/fonts/material-icons';\n@include rmd-icon-material-icons-font-face($local-font-url);",
          description: "Example Usage SCSS",
          compiledCode:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local("Material Icons"), local("MaterialIcons-Regular"),\n    url("/MaterialIcons-Regular.woff2") format("woff2"),\n    url("/MaterialIcons-Regular.woff") format("woff")\n      url("/MaterialIcons-Regular.ttf") format("truetype");\n}\n',
        },
      ],
      parameters: [
        {
          type: "String | Map",
          name: "font-url-or-map",
          default: "'/fonts/material-icons'",
          description:
            'This is either a font url prefix for the folder\n  that is "hosting" the material icons or a Map of direct urls for the eot, woff2, woff, and truetype material icon fonts.',
        },
        {
          type: "Boolean",
          name: "include-font-size",
          default: "false",
          description:
            "Boolean if the material icons class name should include\n  the default icon font size.",
        },
        {
          type: "Boolean",
          name: "old-ie-support",
          default: "false",
          description:
            "Boolean if there should be a fallback for IE6-8 by including a url to\n  the eot font. If this is set to true and using the Map version of `$font-url-or-map`, you must also include a url\n  to the eot font.",
        },
      ],
    },
    {
      name: "rmd-icon-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the icon's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-theme($property: , $theme-style: property, $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-icon-theme-values, icon);\n}",
      oneLineCode:
        "@mixin rmd-icon-theme($property: , $theme-style: property, $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-icon-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          default: "property",
          description:
            "One of the keys of `rmd-icon-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-icon-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-icon-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the icon's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-icon-theme-values, icon);\n}",
      oneLineCode:
        "@mixin rmd-icon-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".bigger-icon-section {\n  @include rmd-icon-theme-update-var(size, 4rem);\n}\n",
          description: "Example SCSS USage",
          compiledCode: ".bigger-icon-section {\n  --rmd-icon-size: 4rem;\n}\n",
        },
        {
          type: "scss",
          code:
            "@media (min-width: 75rem)  {\n  @include rmd-icon-theme-update-var(size, rmd-icon-theme(dense-size));\n}",
          description: "Updating the base icon size with a media query",
          compiledCode:
            "@media (min-width: 75rem) {\n  --rmd-icon-size: 1.25rem;\n}\n",
        },
      ],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The icon theme style type to update. This should be one\n  of the `$rmd-icon-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-icon-base",
      type: "mixin",
      description:
        "Creates the base styles for icons. This should be combined with the `rmd-icon-font` or\n`rmd-icon-svg` mixins to get the full styles.\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code: "@mixin rmd-icon-base {\n  user-select: none;\n}",
      oneLineCode: "@mixin rmd-icon-base { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-icon-font",
      type: "mixin",
      description: "Creates the base styles for a font icon.\n\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-font {\n  @include rmd-icon-theme(color);\n  @include rmd-icon-theme(font-size, size);\n\n  text-align: center;\n}",
      oneLineCode: "@mixin rmd-icon-font { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".font-icon {\n  @include rmd-icon-base;\n  @include rmd-icon-font;\n}",
          description: "Example SCSS Usage",
          compiledCode:
            ".font-icon {\n  user-select: none;\n  color: var(\n    --rmd-icon-color,\n    var(--rmd-theme-text-icon-on-background, #757575)\n  );\n  font-size: var(--rmd-icon-size, 1.5rem);\n  text-align: center;\n}\n",
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-icon-dense-theme",
      type: "mixin",
      description: "A simple mixin to create the dense theme for an icon.\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-dense-theme {\n  @include rmd-icon-theme-update-var(size, rmd-icon-theme-var(dense-size));\n}",
      oneLineCode: "@mixin rmd-icon-dense-theme { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-icon-svg",
      type: "mixin",
      description: "Creates the base styles for an svg icon.\n\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-svg {\n  @include rmd-icon-theme(fill, color);\n  @include rmd-icon-theme(height, size);\n  @include rmd-icon-theme(width, size);\n}",
      oneLineCode: "@mixin rmd-icon-svg { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".svg-icon {\n  @include rmd-icon-base;\n  @include rmd-icon-svg;\n}",
          description: "Example SCSS Usage",
          compiledCode:
            ".svg-icon {\n  user-select: none;\n  fill: var(\n    --rmd-icon-color,\n    var(--rmd-theme-text-icon-on-background, #757575)\n  );\n  height: var(--rmd-icon-size, 1.5rem);\n  width: var(--rmd-icon-size, 1.5rem);\n}\n",
        },
      ],
      parameters: [],
    },
    {
      name: "rmd-icon-spacing-before-text",
      type: "mixin",
      description:
        "Creates the styles that should be applied to an icon that is placed before text.\n\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-spacing-before-text($spacing: $rmd-icon-spacing-with-text) {\n  @include rmd-utils-rtl {\n    @include rmd-icon-theme(margin-left, text-spacing, $spacing);\n    margin-right: 0;\n  }\n\n  @include rmd-icon-theme(margin-right, text-spacing, $spacing);\n}",
      oneLineCode:
        "@mixin rmd-icon-spacing-before-text($spacing: $rmd-icon-spacing-with-text) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "Number",
          name: "spacing",
          default: "rmd-icon-spacing-with-text",
          description: "The amount of spacing to apply.",
        },
      ],
    },
    {
      name: "rmd-icon-spacing-after-text",
      type: "mixin",
      description:
        "Creates the styles that should be applied to an icon that is placed after text.\n\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-spacing-after-text($spacing: $rmd-icon-spacing-with-text) {\n  @include rmd-utils-rtl {\n    @include rmd-icon-theme(margin-right, text-spacing, $spacing);\n    margin-left: 0;\n  }\n  @include rmd-icon-theme(margin-left, text-spacing, $spacing);\n}",
      oneLineCode:
        "@mixin rmd-icon-spacing-after-text($spacing: $rmd-icon-spacing-with-text) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "Number",
          name: "spacing",
          default: "rmd-icon-spacing-with-text",
          description: "The amount of spacing to apply.",
        },
      ],
    },
    {
      name: "rmd-icon-spaced-with-text",
      type: "mixin",
      description:
        "A mixin to create the styles to space an icon before or after text with the provided selectors and\nspacing.\n\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-spaced-with-text($before-selector: '&--before', $after-selector: '&--after', $spacing: $rmd-icon-spacing-with-text) {\n  @if $before-selector != null {\n    #{$before-selector} {\n      @include rmd-icon-spacing-before-text($spacing);\n    }\n  }\n\n  @if $after-selector != null {\n    #{$after-selector} {\n      @include rmd-icon-spacing-after-text($spacing);\n    }\n  }\n}",
      oneLineCode:
        "@mixin rmd-icon-spaced-with-text($before-selector: '&--before', $after-selector: '&--after', $spacing: $rmd-icon-spacing-with-text) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            "// create a component so that it uses the :first-child and :last-child css\n// selectors instead of class names that must be applied.\n.my-wrapper {\n  @include rmd-icon-spaced-with-text('&:first-child', '&:last-child');\n}",
          description: "Updating Selectors",
          compiledCode:
            '.my-wrapper:first-child {\n  margin-right: var(--rmd-icon-text-spacing, 0.5rem);\n}\n[dir="rtl"] .my-wrapper:first-child {\n  margin-left: var(--rmd-icon-text-spacing, 0.5rem);\n  margin-right: 0;\n}\n\n.my-wrapper:last-child {\n  margin-left: var(--rmd-icon-text-spacing, 0.5rem);\n}\n[dir="rtl"] .my-wrapper:last-child {\n  margin-right: var(--rmd-icon-text-spacing, 0.5rem);\n  margin-left: 0;\n}\n',
        },
      ],
      parameters: [
        {
          type: "String",
          name: "before-selector",
          default: "'&--before'",
          description:
            "The selector to use for determining if an icon is placed\n  before or after the text. If this is set to `null`, no before styles will be created.",
        },
        {
          type: "String",
          name: "after-selector",
          default: "'&--after'",
          description:
            "The selector to use for determining if an icon is placed\n  before or after the text. If this is set to `null`, no after styles will be created.",
        },
        {
          type: "Number",
          name: "spacing",
          default: "rmd-icon-spacing-with-text",
          description: "The amount of spacing to apply.",
        },
      ],
    },
    {
      name: "rmd-icon-rotator",
      type: "mixin",
      description:
        "Creates the styles for the `IconRotator` component. These styles are extremely simple and basically\napply different rotate transforms based on a class name.\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-rotator {\n  .rmd-icon-rotator {\n    @include rmd-icon-theme(transform, rotate-from);\n\n    &--animate {\n      transition: transform $rmd-icon-rotator-transition-time linear;\n    }\n\n    &--rotated {\n      @include rmd-icon-theme(transform, rotate-to);\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-icon-rotator { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-icon",
      type: "mixin",
      description: "Creates all the styles for the icon components.\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon {\n  .rmd-icon {\n    @include rmd-icon-base;\n\n    // sass-lint:disable no-important\n    // when other icon libraries don't have consistent sizes...\n    &--forced-font {\n      font-size: rmd-icon-theme-var(size) !important;\n    }\n\n    &--forced-size {\n      height: rmd-icon-theme-var(size) !important;\n      width: rmd-icon-theme-var(size) !important;\n    }\n\n    @if $rmd-icon-include-dense {\n      &--dense {\n        @include rmd-icon-dense-theme;\n      }\n    }\n\n    @if $rmd-icon-use-font-icons {\n      &--font {\n        @include rmd-icon-font;\n      }\n    }\n\n    @if $rmd-icon-use-svg-icons {\n      &--svg {\n        @include rmd-icon-svg;\n\n        * {\n          // make sit so that paths and other things won't be event targets which makes things easier\n          // to determine if something is an icon or not\n          pointer-events: none;\n        }\n      }\n    }\n\n    @include rmd-icon-spaced-with-text;\n  }\n}",
      oneLineCode: "@mixin rmd-icon { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-icon-spacing",
      type: "mixin",
      description:
        "Creates the styles for when the `TextIconSpacing` component\nneeds to wrap the content in a `<span>`. It's really used to\nforce vertical centerl alignment.\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin rmd-icon-spacing {\n  .rmd-text-icon-spacing {\n    align-items: center;\n    display: inline-flex;\n  }\n}",
      oneLineCode: "@mixin rmd-icon-spacing { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "react-md-icon",
      type: "mixin",
      description:
        "Creates the styles for icons within react-md. This requires either the `rmd-icon-use-font-icons` or `rmd-icon-use-svg-icons` variables\nto be enabled to generate any styles.\n",
      file: "@react-md/icon/dist/_mixins.scss",
      group: "icon",
      see: [],
      links: [],
      code:
        "@mixin react-md-icon {\n  @if not $rmd-icon-use-font-icons and not $rmd-icon-use-svg-icons {\n    @error 'Either svg or font icons must be used for this package but both were set to false. Please enable one of them to include icons.';\n  }\n\n  @include rmd-theme-create-root-theme($rmd-icon-theme-values, icon);\n\n  @include rmd-icon;\n  @include rmd-icon-spacing;\n  @include rmd-icon-rotator;\n}",
      oneLineCode: "@mixin react-md-icon { … }",
      throws: [
        "Either svg or font icons must be used for this package but both were set to false. Please enable one of them to include icons.",
      ],
      examples: [],
      parameters: [],
    },
  ],
};

export default IconSassDoc;
