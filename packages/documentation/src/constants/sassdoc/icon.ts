/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-icon-theme": {
      name: "rmd-icon-theme",
      description:
        "This function is used to quickly get one of the icon's theme values. This is really just for the `rmd-icon-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/icon/src/_functions.scss#L15-L17",
      packageName: "icon",
      code: "@function rmd-icon-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-icon-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-icon-theme-values, icon);\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-icon-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the icon's theme values.",
      },
    },
    "rmd-icon-theme-var": {
      name: "rmd-icon-theme-var",
      description:
        "This function is used to get one of the icon's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-icon-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/icon/src/_functions.scss#L32-L34",
      usedBy: [
        { name: "rmd-icon-dense-theme", type: "mixin", packageName: "icon" },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      packageName: "icon",
      code: "@function rmd-icon-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-icon-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-icon-theme-values,\n    icon,\n    $fallback\n  );\n}\n",
      type: "function",
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
    "rmd-icon-material-icons-font-face": {
      name: "rmd-icon-material-icons-font-face",
      description:
        "Creates the font face for material icons. This takes either a font url prefix string or a map of urls for each required font file. If you are using create-react-app, you **must** use the Map version so the fonts can be correctly included by the build process.",
      source: "packages/icon/src/_material-icons.scss#L35-L87",
      usedBy: [
        {
          name: "rmd-icon-host-material-icons",
          type: "mixin",
          packageName: "icon",
        },
      ],
      packageName: "icon",
      examples: [
        {
          code:
            "// This is going to assume you have downloaded the material-icons zip with\n// all the icon font files and copied it into `src/fonts/material-icons`\n// and you are including the fonts in `src/index.scss`\n@include rmd-icon-material-icons-font-face(\n  (\n    woff2: url(./fonts/material-icons/MaterialIcons-Regular.woff2),\n    woff: url(./fonts/material-icons/MaterialIcons-Regular.woff),\n    truetype: url(./fonts/material-icons/MaterialIcons-Regular.ttf),\n  )\n);\n",
          compiled:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local(Material Icons), local(MaterialIcons-Regular),\n    url(./fonts/material-icons/MaterialIcons-Regular.woff2) format("woff2"),\n    url(./fonts/material-icons/MaterialIcons-Regular.woff) format("woff"),\n    url(./fonts/material-icons/MaterialIcons-Regular.ttf) format("truetype");\n}\n',
          type: "scss",
          description: "create-react-app Example Usage",
        },
        {
          code:
            '$local-font-url: "/fonts/material-icons";\n@include rmd-icon-material-icons-font-face($local-font-url);\n',
          compiled:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local("Material Icons"), local("MaterialIcons-Regular"),\n    url("/MaterialIcons-Regular.woff2") format("woff2"),\n    url("/MaterialIcons-Regular.woff") format("woff")\n      url("/MaterialIcons-Regular.ttf") format("truetype");\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code:
        "@mixin rmd-icon-material-icons-font-face($font-url-or-map: '/fonts/material-icons', $old-ie-support: false) { … }",
      sourceCode:
        '@mixin rmd-icon-material-icons-font-face(\n  $font-url-or-map: "/fonts/material-icons",\n  $old-ie-support: false\n) {\n  $font-family: "Material Icons";\n  $font-name: "MaterialIcons-Regular";\n\n  $font-url: "";\n  $font-map: null;\n  @if type-of($font-url-or-map) == "string" {\n    $font-url: if(char-at($font-url) != "/", $font-url + "/", $font-url) +\n      $font-name;\n  } @else {\n    $font-map: $font-url-or-map;\n    $required-keys: woff2 woff truetype;\n    @if $old-ie-support {\n      $required-keys: #{$required-keys} eot;\n    }\n\n    @each $key in $required-keys {\n      @if not map-has-key($font-map, $key) {\n        @error \'It is required to include all of \\\'#{$required-keys}\\\' in your font url map, but one or more was missing! Privded keys: #{map-keys($font-map)}.\';\n      }\n    }\n  }\n\n  @font-face {\n    font-family: $font-family;\n    font-style: normal;\n    font-weight: map-get($rmd-typography-font-weights, normal);\n\n    @if $old-ie-support {\n      @if $font-map == null {\n        src: url($font-url+".eot");\n      } @else {\n        src: #{map-get($font-map, eot)};\n      }\n    }\n\n    @if $font-map == null {\n      src: local($font-family), local($font-name),\n        url($font-url+".woff2") format("woff2"),\n        url($font-url+".woff")\n          format("woff")\n          url($font-url+".ttf")\n          format("truetype");\n    } @else {\n      $woff2: map-get($font-url-or-map, woff2);\n      $woff: map-get($font-url-or-map, woff);\n      $truetype: map-get($font-url-or-map, truetype);\n\n      $src: local($font-family), local($font-name);\n      $src: "local(#{$font-family}), local(#{$font-name}), #{$woff2} format(\'woff2\'), #{$woff} format(\'woff\'), #{$truetype} format(\'truetype\')";\n\n      src: #{$src};\n    }\n  }\n}\n',
      throws: ["It is required to include all of \\"],
      type: "mixin",
      parameters: [
        {
          type: "Map|String",
          name: "font-url-or-map",
          default: "'/fonts/material-icons'",
          description:
            'This is either a font url prefix for the folder that is "hosting" the material icons or a Map of direct urls for the eot, woff2, woff, and truetype material icon fonts.',
        },
        {
          type: "Boolean",
          name: "old-ie-support",
          default: "false",
          description:
            "Boolean if there should be a fallback for IE6-8 by including a url to the eot font. If this is set to true and using the Map version of `$font-url-or-map`, you must also include a url to the eot font.",
        },
      ],
    },
    "rmd-icon-material-icons-class": {
      name: "rmd-icon-material-icons-class",
      description:
        "Creates the material-icons css class if hosting material icons locally instead of using the Google fonts service. By default, this will not include the font-size size you _should_ be using the `FontIcon` component from react-md which adds the correct font-size.",
      source: "packages/icon/src/_material-icons.scss#L96-L122",
      usedBy: [
        {
          name: "rmd-icon-host-material-icons",
          type: "mixin",
          packageName: "icon",
        },
      ],
      packageName: "icon",
      code:
        "@mixin rmd-icon-material-icons-class($include-font-size: false) { … }",
      sourceCode:
        '@mixin rmd-icon-material-icons-class($include-font-size: false) {\n  .material-icons {\n    // sass-lint:disable-block property-sort-order,no-vendor-prefixes\n    @if $include-font-size {\n      @include rmd-icon-theme(font-size, size);\n    }\n\n    direction: ltr;\n    display: inline-block;\n    font-family: "Material Icons";\n    // Support for IE.\n    font-feature-settings: "liga";\n    // Support for Firefox.\n    -moz-osx-font-smoothing: grayscale;\n    // Support for all WebKit browsers.\n    -webkit-font-smoothing: antialiased;\n    font-style: normal;\n    font-weight: normal;\n    letter-spacing: normal;\n    line-height: 1;\n    // Support for Safari and Chrome.\n    text-rendering: optimizeLegibility;\n    text-transform: none;\n    white-space: nowrap;\n    word-wrap: normal;\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "Boolean",
          name: "include-font-size",
          default: "false",
          description:
            "Boolean if the material icons class name should include the default icon font size.",
        },
      ],
    },
    "rmd-icon-host-material-icons": {
      name: "rmd-icon-host-material-icons",
      description:
        "Creates both the font face and css class for material icons when hosting the fonts locally instead of using the Google fonts service.  This takes either a font url prefix string or a map of urls for each required font file. If you are using create-react-app, you **must** use the Map version so the fonts can be correctly included by the build process.",
      source: "packages/icon/src/_material-icons.scss#L167-L174",
      packageName: "icon",
      examples: [
        {
          code:
            '$local-font-url: "/fonts/material-icons";\n@include rmd-icon-material-icons-font-face($local-font-url);\n',
          compiled:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local("Material Icons"), local("MaterialIcons-Regular"),\n    url("/MaterialIcons-Regular.woff2") format("woff2"),\n    url("/MaterialIcons-Regular.woff") format("woff")\n      url("/MaterialIcons-Regular.ttf") format("truetype");\n}\n',
          type: "scss",
          description: "Example Usage SCSS",
        },
        {
          code:
            '// This example will assume that the material icons font has been\n// downloaded and copied into the `public/fonts/material-icons` folder\n// The fonts will not be bundled with your normal build process and just\n// will be static assets.\n\n// The next 2 lines are equivalent\n@include rmd-icon-material-icons-font-face;\n@include rmd-icon-material-icons-font-face("/fonts/material-icons");\n\n@include rmd-typography-host-google-font("Source Code Pro");\n',
          compiled:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local("Material Icons"), local("MaterialIcons-Regular"),\n    url("/MaterialIcons-Regular.woff2") format("woff2"),\n    url("/MaterialIcons-Regular.woff") format("woff")\n      url("/MaterialIcons-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local("Material Icons"), local("MaterialIcons-Regular"),\n    url("/MaterialIcons-Regular.woff2") format("woff2"),\n    url("/MaterialIcons-Regular.woff") format("woff")\n      url("/MaterialIcons-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: light;\n  src: local(Source Code Pro), local(SourceCodePro-Light),\n    url("/fonts/source-code-pro/SourceCodePro-Light.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: regular;\n  src: local(Source Code Pro), local(SourceCodePro-Regular),\n    url("/fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: medium;\n  src: local(Source Code Pro), local(SourceCodePro-Medium),\n    url("/fonts/source-code-pro/SourceCodePro-Medium.ttf") format("truetype");\n}\n\n@font-face {\n  font-family: "Source Code Pro";\n  font-style: normal;\n  font-weight: bold;\n  src: local(Source Code Pro), local(SourceCodePro-Bold),\n    url("/fonts/source-code-pro/SourceCodePro-Bold.ttf") format("truetype");\n}\n',
          type: "scss",
          description: "Using Absolute Paths",
        },
        {
          code:
            '// Since it might be useful to include the font in the normal build\n// process to hash and prefix the urls as needed, you can also use\n// relative paths instead of absolute paths.\n// This example will assume you are working within a `src/fonts.scss` file\n// and have copied material-icons into a `src/fonts/material-icons` directory\n\n// Note the `~./`. This will resolve this import to the `src` directory\n// within create-react-app\n@include rmd-icon-material-icons-font-face("~./fonts/material-icons");\n',
          compiled:
            '@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  src: local("Material Icons"), local("MaterialIcons-Regular"),\n    url("/MaterialIcons-Regular.woff2") format("woff2"),\n    url("/MaterialIcons-Regular.woff") format("woff")\n      url("/MaterialIcons-Regular.ttf") format("truetype");\n}\n',
          type: "scss",
          description: "Using Relative Paths",
        },
      ],
      code:
        "@mixin rmd-icon-host-material-icons($font-url-or-map: '/fonts/material-icons', $include-font-size: false, $old-ie-support: false) { … }",
      sourceCode:
        '@mixin rmd-icon-host-material-icons(\n  $font-url-or-map: "/fonts/material-icons",\n  $include-font-size: false,\n  $old-ie-support: false\n) {\n  @include rmd-icon-material-icons-font-face($font-url-or-map, $old-ie-support);\n  @include rmd-icon-material-icons-class($include-font-size);\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "Map|String",
          name: "font-url-or-map",
          default: "'/fonts/material-icons'",
          description:
            'This is either a font url prefix for the folder that is "hosting" the material icons or a Map of direct urls for the eot, woff2, woff, and truetype material icon fonts.',
        },
        {
          type: "Boolean",
          name: "include-font-size",
          default: "false",
          description:
            "Boolean if the material icons class name should include the default icon font size.",
        },
        {
          type: "Boolean",
          name: "old-ie-support",
          default: "false",
          description:
            "Boolean if there should be a fallback for IE6-8 by including a url to the eot font. If this is set to true and using the Map version of `$font-url-or-map`, you must also include a url to the eot font.",
        },
      ],
    },
    "rmd-icon-theme": {
      name: "rmd-icon-theme",
      description:
        "Creates the styles for one of the icon's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/icon/src/_mixins.scss#L21-L23",
      usedBy: [
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        {
          name: "rmd-icon-material-icons-class",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-icon-font", type: "mixin", packageName: "icon" },
        { name: "rmd-icon-svg", type: "mixin", packageName: "icon" },
        { name: "rmd-icon-rotator", type: "mixin", packageName: "icon" },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
      ],
      packageName: "icon",
      code:
        "@mixin rmd-icon-theme($property, $theme-style: property, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-icon-theme($property, $theme-style: property, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-icon-theme-values,\n    icon\n  );\n}\n",
      type: "mixin",
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
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-icon-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-icon-theme-update-var": {
      name: "rmd-icon-theme-update-var",
      description:
        "Updates one of the icon's theme variables with the new value for the section of your app.",
      source: "packages/icon/src/_mixins.scss#L42-L44",
      usedBy: [
        { name: "react-md-avatar", type: "mixin", packageName: "avatar" },
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-button-icon", type: "mixin", packageName: "button" },
        { name: "rmd-card-header", type: "mixin", packageName: "card" },
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
        { name: "rmd-icon-dense-theme", type: "mixin", packageName: "icon" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "react-md-menu", type: "mixin", packageName: "menu" },
        { name: "react-md-tree", type: "mixin", packageName: "tree" },
      ],
      packageName: "icon",
      examples: [
        {
          code:
            ".bigger-icon-section {\n  @include rmd-icon-theme-update-var(size, 4rem);\n}\n",
          compiled: ".bigger-icon-section {\n  --rmd-icon-size: 4rem;\n}\n",
          type: "scss",
          description: "Example SCSS USage",
        },
        {
          code:
            "@media (min-width: 75rem) {\n  @include rmd-icon-theme-update-var(size, rmd-icon-theme(dense-size));\n}\n",
          compiled:
            "@media (min-width: 75rem) {\n  --rmd-icon-size: 1.25rem;\n}\n",
          type: "scss",
          description: "Updating the base icon size with a media query",
        },
      ],
      code: "@mixin rmd-icon-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-icon-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-icon-theme-values,\n    icon\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The icon theme style type to update. This should be one of the `$rmd-icon-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-icon-base": {
      name: "rmd-icon-base",
      description:
        "Creates the base styles for icons. This should be combined with the `rmd-icon-font` or `rmd-icon-svg` mixins to get the full styles.\n",
      source: "packages/icon/src/_mixins.scss#L48-L53",
      usedBy: [{ name: "rmd-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      code: "@mixin rmd-icon-base { … }",
      sourceCode:
        "@mixin rmd-icon-base {\n  // you normally don't want icons to shrink in flex containers.\n  // update the icon manually instead.\n  flex-shrink: 0;\n  user-select: none;\n}\n",
      type: "mixin",
    },
    "rmd-icon-font": {
      name: "rmd-icon-font",
      description: "Creates the base styles for a font icon.",
      source: "packages/icon/src/_mixins.scss#L62-L67",
      usedBy: [{ name: "rmd-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      examples: [
        {
          code:
            ".font-icon {\n  @include rmd-icon-base;\n  @include rmd-icon-font;\n}\n",
          compiled:
            ".font-icon {\n  flex-shrink: 0;\n  user-select: none;\n  color: var(\n    --rmd-icon-color,\n    var(--rmd-theme-text-icon-on-background, #757575)\n  );\n  font-size: var(--rmd-icon-size, 1.5rem);\n  text-align: center;\n}\n",
          type: "scss",
          description: "Example SCSS Usage",
        },
      ],
      code: "@mixin rmd-icon-font { … }",
      sourceCode:
        "@mixin rmd-icon-font {\n  @include rmd-icon-theme(color);\n  @include rmd-icon-theme(font-size, size);\n\n  text-align: center;\n}\n",
      type: "mixin",
    },
    "rmd-icon-dense-theme": {
      name: "rmd-icon-dense-theme",
      description: "A simple mixin to create the dense theme for an icon.\n",
      source: "packages/icon/src/_mixins.scss#L70-L72",
      usedBy: [
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "rmd-utils-dense", type: "mixin", packageName: "utils" },
      ],
      packageName: "icon",
      code: "@mixin rmd-icon-dense-theme { … }",
      sourceCode:
        "@mixin rmd-icon-dense-theme {\n  @include rmd-icon-theme-update-var(size, rmd-icon-theme-var(dense-size));\n}\n",
      type: "mixin",
    },
    "rmd-icon-svg": {
      name: "rmd-icon-svg",
      description: "Creates the base styles for an svg icon.",
      source: "packages/icon/src/_mixins.scss#L81-L85",
      usedBy: [{ name: "rmd-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      examples: [
        {
          code:
            ".svg-icon {\n  @include rmd-icon-base;\n  @include rmd-icon-svg;\n}\n",
          compiled:
            ".svg-icon {\n  flex-shrink: 0;\n  user-select: none;\n  fill: var(\n    --rmd-icon-color,\n    var(--rmd-theme-text-icon-on-background, #757575)\n  );\n  height: var(--rmd-icon-size, 1.5rem);\n  width: var(--rmd-icon-size, 1.5rem);\n}\n",
          type: "scss",
          description: "Example SCSS Usage",
        },
      ],
      code: "@mixin rmd-icon-svg { … }",
      sourceCode:
        "@mixin rmd-icon-svg {\n  @include rmd-icon-theme(fill, color);\n  @include rmd-icon-theme(height, size);\n  @include rmd-icon-theme(width, size);\n}\n",
      type: "mixin",
    },
    "rmd-icon-text-spacing": {
      name: "rmd-icon-text-spacing",
      description:
        "Creates the styles that should be applied to an icon that is placed before or after text by applying the spacing to the provided `$property` value.\nThis will automatically be swapped when the language changes to right-to-left.",
      source: "packages/icon/src/_mixins.scss#L94-L100",
      usedBy: [
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
      ],
      packageName: "icon",
      code:
        "@mixin rmd-icon-text-spacing($spacing: $rmd-icon-spacing-with-text) { … }",
      sourceCode:
        '@mixin rmd-icon-text-spacing($spacing: $rmd-icon-spacing-with-text) {\n  @if $property == "margin-left" or $property == "margin-right" {\n    @include rmd-utils-rtl-auto($property, $spacing, 0);\n  } @else {\n    #{$property}: $spacing;\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "Number",
          name: "spacing",
          default: "$rmd-icon-spacing-with-text",
          description: "The amount of spacing to apply.",
        },
      ],
    },
    "rmd-icon-spaced-with-text": {
      name: "rmd-icon-spaced-with-text",
      description:
        "A mixin to create the styles to space an icon before or after text with the provided selectors and spacing.",
      source: "packages/icon/src/_mixins.scss#L125-L155",
      usedBy: [{ name: "rmd-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      examples: [
        {
          code:
            '// create a component so that it uses the :first-child and :last-child css\n// selectors instead of class names that must be applied.\n.my-wrapper {\n  @include rmd-icon-spaced-with-text("&:first-child", "&:last-child");\n}\n',
          compiled:
            '.my-wrapper:first-child {\n  margin-right: var(--rmd-icon-text-spacing, 0.5rem);\n}\n[dir="rtl"] .my-wrapper:first-child {\n  margin-right: 0;\n  margin-left: var(--rmd-icon-text-spacing, 0.5rem);\n}\n\n.my-wrapper:last-child {\n  margin-left: var(--rmd-icon-text-spacing, 0.5rem);\n}\n[dir="rtl"] .my-wrapper:last-child {\n  margin-left: 0;\n  margin-right: var(--rmd-icon-text-spacing, 0.5rem);\n}\n\n.my-wrapper--above {\n  margin-bottom: var(--rmd-icon-text-spacing, 0.5rem);\n}\n\n.my-wrapper--below {\n  margin-top: var(--rmd-icon-text-spacing, 0.5rem);\n}\n',
          type: "scss",
          description: "Updating Selectors",
        },
      ],
      code:
        "@mixin rmd-icon-spaced-with-text($before-selector: '&--before', $after-selector: '&--after', $above-selector: '&--above', $below-selector: '&--after', $spacing: $rmd-icon-spacing-with-text) { … }",
      sourceCode:
        '@mixin rmd-icon-spaced-with-text(\n  $before-selector: "&--before",\n  $after-selector: "&--after",\n  $above-selector: "&--above",\n  $below-selector: "&--after",\n  $spacing: $rmd-icon-spacing-with-text\n) {\n  @if $before-selector != null {\n    #{$before-selector} {\n      @include rmd-icon-text-spacing(\n        rmd-icon-theme-var(text-spacing),\n        margin-right\n      );\n    }\n  }\n\n  @if $after-selector != null {\n    #{$after-selector} {\n      @include rmd-icon-text-spacing(\n        rmd-icon-theme-var(text-spacing),\n        margin-left\n      );\n    }\n  }\n\n  @if $above-selector != null {\n    #{$above-selector} {\n      @include rmd-icon-text-spacing(\n        rmd-icon-theme-var(text-spacing),\n        margin-bottom\n      );\n    }\n  }\n\n  @if $below-selector != null {\n    #{$below-selector} {\n      @include rmd-icon-text-spacing(\n        rmd-icon-theme-var(text-spacing),\n        margin-top\n      );\n    }\n  }\n}\n',
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "before-selector",
          default: "'&--before'",
          description:
            "The selector to use for determining if an icon is placed before or after the text. If this is set to `null`, no before styles will be created.",
        },
        {
          type: "String",
          name: "after-selector",
          default: "'&--after'",
          description:
            "The selector to use for determining if an icon is placed before or after the text. If this is set to `null`, no after styles will be created.",
        },
        {
          type: "String",
          name: "above-selector",
          default: "'&--above'",
          description:
            "The selector to use for determining if an icon is placed above or below the text. If this is set to `null`, no before styles will be created.",
        },
        {
          type: "String",
          name: "below-selector",
          default: "'&--after'",
          description:
            "The selector to use for determining if an icon is placed above or below the text. If this is set to `null`, no after styles will be created.",
        },
        {
          type: "Number",
          name: "spacing",
          default: "$rmd-icon-spacing-with-text",
          description: "The amount of spacing to apply.",
        },
      ],
    },
    "rmd-icon-rotator": {
      name: "rmd-icon-rotator",
      description:
        "Creates the styles for the `IconRotator` component. These styles are extremely simple and basically apply different rotate transforms based on a class name.\n",
      source: "packages/icon/src/_mixins.scss#L160-L172",
      usedBy: [{ name: "react-md-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      code: "@mixin rmd-icon-rotator { … }",
      sourceCode:
        "@mixin rmd-icon-rotator {\n  .rmd-icon-rotator {\n    @include rmd-icon-theme(transform, rotate-from);\n\n    &--animate {\n      transition: transform $rmd-icon-rotator-transition-time linear;\n    }\n\n    &--rotated {\n      @include rmd-icon-theme(transform, rotate-to);\n    }\n  }\n}\n",
      type: "mixin",
    },
    "rmd-icon": {
      name: "rmd-icon",
      description: "Creates all the styles for the icon components.\n",
      source: "packages/icon/src/_mixins.scss#L175-L225",
      usedBy: [{ name: "react-md-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      code: "@mixin rmd-icon { … }",
      sourceCode:
        "@mixin rmd-icon {\n  .rmd-icon {\n    @include rmd-icon-base;\n\n    @if $rmd-icon-material-icons-font {\n      &.material-icons {\n        // force material-icons to use the size of icons even if the\n        // material-icons font css is loaded after the base react-md styles\n        @include rmd-icon-theme(font-size, size);\n      }\n    }\n\n    // sass-lint:disable no-important\n    // when other icon libraries don't have consistent sizes...\n    &--forced-font {\n      font-size: rmd-icon-theme-var(size) !important;\n    }\n\n    &--forced-size {\n      height: rmd-icon-theme-var(size) !important;\n      width: rmd-icon-theme-var(size) !important;\n    }\n\n    @if $rmd-icon-include-dense {\n      &--dense {\n        @include rmd-icon-dense-theme;\n      }\n    }\n\n    @if $rmd-icon-use-font-icons {\n      &--font {\n        @include rmd-icon-font;\n      }\n    }\n\n    @if $rmd-icon-use-svg-icons {\n      &--svg {\n        @include rmd-icon-svg;\n\n        * {\n          // make sit so that paths and other things won't be event targets\n          // which makes things easier to determine if something is an icon or\n          // not\n          pointer-events: none;\n        }\n      }\n    }\n\n    @include rmd-icon-spaced-with-text;\n  }\n}\n",
      type: "mixin",
    },
    "rmd-icon-spacing": {
      name: "rmd-icon-spacing",
      description:
        "Creates the styles for when the `TextIconSpacing` component needs to wrap the content in a `<span>`. It's really used to force vertical centerl alignment.\n",
      source: "packages/icon/src/_mixins.scss#L230-L235",
      usedBy: [{ name: "react-md-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      code: "@mixin rmd-icon-spacing { … }",
      sourceCode:
        "@mixin rmd-icon-spacing {\n  .rmd-text-icon-spacing {\n    align-items: center;\n    display: inline-flex;\n  }\n}\n",
      type: "mixin",
    },
    "react-md-icon": {
      name: "react-md-icon",
      description:
        "Creates the styles for icons within react-md. This requires either the `rmd-icon-use-font-icons` or `rmd-icon-use-svg-icons` variables to be enabled to generate any styles.\n",
      source: "packages/icon/src/_mixins.scss#L240-L250",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "icon",
      code: "@mixin react-md-icon { … }",
      sourceCode:
        "@mixin react-md-icon {\n  @if not $rmd-icon-use-font-icons and not $rmd-icon-use-svg-icons {\n    @error 'Either svg or font icons must be used for this package but both were set to false. Please enable one of them to include icons.';\n  }\n\n  @include rmd-theme-create-root-theme($rmd-icon-theme-values, icon);\n\n  @include rmd-icon;\n  @include rmd-icon-spacing;\n  @include rmd-icon-rotator;\n}\n",
      throws: [
        "Either svg or font icons must be used for this package but both were set to false. Please enable one of them to include icons.",
      ],
      type: "mixin",
    },
  },
  variables: {
    "rmd-icon-color": {
      name: "rmd-icon-color",
      description: "The base icon color to apply.\n",
      source: "packages/icon/src/_variables.scss#L9",
      packageName: "icon",
      type: "Color",
      value: "rmd-theme-var(text-icon-on-background)",
      compiled: "var(--rmd-theme-text-icon-on-background, #757575)",
      overridable: true,
    },
    "rmd-icon-size": {
      name: "rmd-icon-size",
      description: "The base icon size to use.\n",
      source: "packages/icon/src/_variables.scss#L13",
      packageName: "icon",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-icon-dense-size": {
      name: "rmd-icon-dense-size",
      description:
        "The dense icon size to use. If you do not want to include the dense icon spec, disable the `$rmd-icon-include-dense` variable.\n",
      source: "packages/icon/src/_variables.scss#L19",
      see: [
        {
          name: "rmd-icon-include-dense",
          type: "variable",
          packageName: "icon",
        },
      ],
      packageName: "icon",
      type: "Number",
      value: "1.25rem",
      overridable: true,
    },
    "rmd-icon-include-dense": {
      name: "rmd-icon-include-dense",
      description:
        "Boolean if the dense spec for icons should be included. This will just generate `.md-icon--font-dense` and `.md-icon--svg-dense` class names that can be applied.",
      source: "packages/icon/src/_variables.scss#L26",
      usedBy: [{ name: "rmd-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-icon-material-icons-font": {
      name: "rmd-icon-material-icons-font",
      description:
        "Boolean if you are using the material-icons font icon library. This will update the dense theme to fix material icons as well.\n",
      source: "packages/icon/src/_variables.scss#L31",
      usedBy: [{ name: "rmd-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      type: "Boolean",
      value: "false",
      overridable: true,
    },
    "rmd-icon-use-font-icons": {
      name: "rmd-icon-use-font-icons",
      description:
        "Boolean if font icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can disable the style generation for the unused type to save a few bytes.",
      source: "packages/icon/src/_variables.scss#L39",
      see: [
        {
          name: "rmd-icon-use-svg-icons",
          type: "variable",
          packageName: "icon",
        },
      ],
      usedBy: [
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "react-md-icon", type: "mixin", packageName: "icon" },
      ],
      packageName: "icon",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-icon-use-svg-icons": {
      name: "rmd-icon-use-svg-icons",
      description:
        "Boolean if svg icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can disable the style generation for the unused type to save a few bytes.",
      source: "packages/icon/src/_variables.scss#L47",
      see: [
        {
          name: "rmd-icon-use-svg-icons",
          type: "variable",
          packageName: "icon",
        },
      ],
      usedBy: [
        { name: "rmd-button-text", type: "mixin", packageName: "button" },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "react-md-icon", type: "mixin", packageName: "icon" },
      ],
      packageName: "icon",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-icon-spacing-with-text": {
      name: "rmd-icon-spacing-with-text",
      description:
        "The amount of spacing to apply between an icon and text within the `TextIconSpacing` component.\n",
      source: "packages/icon/src/_variables.scss#L52",
      packageName: "icon",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-icon-rotator-transition-time": {
      name: "rmd-icon-rotator-transition-time",
      description:
        "The transition time for the icon rotator to fully rotate.\n",
      source: "packages/icon/src/_variables.scss#L56",
      usedBy: [
        { name: "rmd-icon-rotator", type: "mixin", packageName: "icon" },
      ],
      packageName: "icon",
      type: "Number",
      value: "0.15s",
      overridable: true,
    },
    "rmd-icon-rotator-from": {
      name: "rmd-icon-rotator-from",
      description:
        "The default starting position for the `IconRotator` component. This needs to be a valid transformation value to work.\n",
      source: "packages/icon/src/_variables.scss#L61",
      packageName: "icon",
      type: "Number",
      value: "rotate(0deg)",
      overridable: true,
    },
    "rmd-icon-rotator-to": {
      name: "rmd-icon-rotator-to",
      description:
        "The default ending position for the `IconRotator` component. This needs to be a valid transformation value to work.\n",
      source: "packages/icon/src/_variables.scss#L66",
      packageName: "icon",
      type: "Number",
      value: "rotate(180deg)",
      overridable: true,
    },
    "rmd-icon-theme-values": {
      name: "rmd-icon-theme-values",
      description:
        'A Map of all the "themeable" parts of the icon package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/icon/src/_variables.scss#L72-L79",
      usedBy: [
        { name: "rmd-icon-theme", type: "function", packageName: "icon" },
        { name: "rmd-icon-theme-var", type: "function", packageName: "icon" },
        { name: "rmd-icon-theme", type: "mixin", packageName: "icon" },
        {
          name: "rmd-icon-theme-update-var",
          type: "mixin",
          packageName: "icon",
        },
        { name: "react-md-icon", type: "mixin", packageName: "icon" },
      ],
      packageName: "icon",
      type: "Map",
      value:
        "(\n  color: $rmd-icon-color,\n  size: $rmd-icon-size,\n  dense-size: $rmd-icon-dense-size,\n  text-spacing: $rmd-icon-spacing-with-text,\n  rotate-to: $rmd-icon-rotator-to,\n  rotate-from: $rmd-icon-rotator-from,\n)",
      compiled:
        "(\n  color: var(--rmd-theme-text-icon-on-background, #757575),\n  size: 1.5rem,\n  dense-size: 1.25rem,\n  text-spacing: 0.5rem,\n  rotate-to: rotate(180deg),\n  rotate-from: rotate(0deg),\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
