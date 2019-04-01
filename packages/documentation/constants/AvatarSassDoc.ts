/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const AvatarSassDoc: PackageSassDoc = {
  name: "avatar",
  variables: [
    {
      name: "rmd-avatar-background-color",
      type: "Color",
      description:
        "The default background color for an avatar. This will be used until\nthe `color` prop is provided to the `Avatar` component.\n\n",
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [
        {
          name: "rmd-avatar-colors",
          type: "mixin",
          description:
            "A mixin for creating the avatar color suffix class names from a color map. It is\nnot recommended to use this mixin for creating additional colors. Instead use the\n`rmd-avatar-color` mixin with custom class names instead.\n\n",
          group: "avatar",
        },
      ],
      links: [],
      value: "$rmd-grey-700",
      compiledValue: "#616161",
      configurable: true,
    },
    {
      name: "rmd-avatar-border-color",
      type: "Color",
      description: "The border color to apply to the avatar.\n",
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [],
      links: [],
      value:
        "rgba(\n  if(rmd-theme-tone($rmd-theme-background) == light, $rmd-black-base, $rmd-white-base),\n  0.12\n)",
      compiledValue: "rgba(0, 0, 0, 0.12)",
      configurable: true,
    },
    {
      name: "rmd-avatar-border-radius",
      type: "Number",
      description: "The border-radius for the avatar.\n",
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [],
      links: [],
      value: "50%",
      compiledValue: "50%",
      configurable: true,
    },
    {
      name: "rmd-avatar-color",
      type: "Color",
      description:
        "The default text color for the avatar. This will be used until the\n`color` prop is provided to the `Avatar` component.\n",
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [],
      links: [],
      value: "$rmd-grey-100",
      compiledValue: "#f5f5f5",
      configurable: true,
    },
    {
      name: "rmd-avatar-size",
      type: "Number",
      description: "The size for the avatar.\n",
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [],
      links: [],
      value: "2.5rem",
      compiledValue: "2.5rem",
      configurable: true,
    },
    {
      name: "rmd-avatar-font-size",
      type: "Number",
      description:
        "The font size to apply to avatars. This is used when the avatar is a letter.\n",
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [],
      links: [],
      value: "1.5rem",
      compiledValue: "1.5rem",
      configurable: true,
    },
    {
      name: "rmd-avatar-line-height",
      type: "Number",
      description:
        "The line height to use for avatars. This is really only useful when the\navatar is a letter.\n",
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [],
      links: [],
      value: "rmd-typography-value(subtitle-1, line-height)",
      compiledValue: "1.75rem",
      configurable: true,
    },
    {
      name: "rmd-avatar-colors",
      type: "Map",
      description:
        "A Map of all the available colors for the avatar. This map can be\nupdated with new values if the defaults are not to your liking, but\nit is recommended to create your own themes instead.\n\n",
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [],
      links: [],
      value:
        "(\n  red: $rmd-red-a-700 $rmd-red-50,\n  pink: $rmd-pink-600 $rmd-white-base,\n  purple: $rmd-purple-700 $rmd-purple-100,\n  deep-purple: $rmd-deep-purple-900 $rmd-deep-purple-100,\n  indigo: $rmd-indigo-600 $rmd-indigo-100,\n  blue: $rmd-blue-a-700 $rmd-white-base,\n  light-blue: $rmd-light-blue-300 $rmd-deep-purple-900,\n  cyan: $rmd-cyan-400 $rmd-teal-900,\n  teal: $rmd-teal-a-400 $rmd-teal-900,\n  green: $rmd-green-800 $rmd-green-50,\n  light-green: $rmd-light-green-300 $rmd-green-900,\n  lime: $rmd-lime-400 $rmd-teal-800,\n  yellow: $rmd-yellow-a-200 $rmd-brown-500,\n  amber: $rmd-amber-400 $rmd-brown-800,\n  orange: $rmd-orange-600 $rmd-grey-900,\n  deep-orange: $rmd-deep-orange-a-400 $rmd-grey-900,\n  brown: $rmd-brown-500 $rmd-brown-50,\n  grey: $rmd-grey-700 $rmd-grey-100,\n  blue-grey: $rmd-blue-grey-700 $rmd-blue-grey-50,\n)",
      compiledValue:
        "(\n  red: #d50000 #ffebee,\n  pink: #d81b60 #fff,\n  purple: #7b1fa2 #e1bee7,\n  deep-purple: #311b92 #d1c4e9,\n  indigo: #3949ab #c5cae9,\n  blue: #2962ff #fff,\n  light-blue: #4fc3f7 #311b92,\n  cyan: #26c6da #004d40,\n  teal: #1de9b6 #004d40,\n  green: #2e7d32 #e8f5e9,\n  light-green: #aed581 #1b5e20,\n  lime: #d4e157 #00695c,\n  yellow: #ff0 #795548,\n  amber: #ffca28 #4e342e,\n  orange: #fb8c00 #212121,\n  deep-orange: #ff3d00 #212121,\n  brown: #795548 #efebe9,\n  grey: #616161 #f5f5f5,\n  blue-grey: #455a64 #eceff1,\n);\n",
      configurable: true,
    },
    {
      name: "rmd-avatar-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the avatar package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/avatar/dist/_variables.scss",
      group: "avatar",
      see: [],
      links: [],
      value:
        "(\n  background-color: $rmd-avatar-background-color,\n  border-color: $rmd-avatar-border-color,\n  border-radius: $rmd-avatar-border-radius,\n  color: $rmd-avatar-color,\n  font-size: $rmd-avatar-font-size,\n  size: $rmd-avatar-size,\n)",
      compiledValue:
        "(\n  background-color: #616161,\n  border-color: rgba(0, 0, 0, 0.12),\n  border-radius: 50%,\n  color: #f5f5f5,\n  font-size: 1.5rem,\n  size: 2.5rem,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-avatar-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the avatar's theme values. This is really\njust for the `rmd-avatar-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/avatar/dist/_functions.scss",
      group: "avatar",
      see: [],
      links: [],
      code:
        "@function rmd-avatar-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-avatar-theme-values, avatar);\n}",
      oneLineCode: "@function rmd-avatar-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-avatar-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the avatar's theme values.",
      },
    },
    {
      name: "rmd-avatar-theme-var",
      type: "function",
      description:
        "This function is used to get one of the avatar's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-avatar-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/avatar/dist/_functions.scss",
      group: "avatar",
      see: [],
      links: [],
      code:
        "@function rmd-avatar-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-avatar-theme-values, avatar, $fallback);\n}",
      oneLineCode:
        "@function rmd-avatar-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-avatar-theme-values` map keys to set a value for.",
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
        description: "one of the avatar's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-avatar-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the avatar's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/avatar/dist/_mixins.scss",
      group: "avatar",
      see: [],
      links: [],
      code:
        "@mixin rmd-avatar-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-avatar-theme-values, avatar);\n}",
      oneLineCode:
        "@mixin rmd-avatar-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-avatar-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-avatar-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-avatar-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-avatar-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the avatar's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/avatar/dist/_mixins.scss",
      group: "avatar",
      see: [],
      links: [],
      code:
        "@mixin rmd-avatar-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-avatar-theme-values, avatar);\n}",
      oneLineCode:
        "@mixin rmd-avatar-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The avatar theme style type to update. This should be one\n  of the `$rmd-avatar-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-avatar-color",
      type: "mixin",
      description: "A mixin for updating the avatar's theme colors.\n\n",
      file: "@react-md/avatar/dist/_mixins.scss",
      group: "avatar",
      see: [],
      links: [],
      code:
        "@mixin rmd-avatar-color($background-color: , $color: ) {\n  @include rmd-avatar-theme-update-var(background-color, $background-color);\n  @include rmd-avatar-theme-update-var(color, $color);\n}",
      oneLineCode:
        "@mixin rmd-avatar-color($background-color: , $color: ) { … }",
      throws: [],
      examples: [
        {
          type: "scss",
          code:
            ".my-red-avatar {\n  @include rmd-avatar-color($rmd-red-500, $rmd-black-base);\n}\n\n.my-orange-avatar {\n  @include rmd-avatar-color($rmd-orange-500, $rmd-black-base);\n}",
          description: "Example Usage SCSS",
          compiledCode:
            ".my-red-avatar {\n  --rmd-avatar-background-color: #f44336;\n  --rmd-avatar-color: #000;\n}\n\n.my-orange-avatar {\n  --rmd-avatar-background-color: #ff9800;\n  --rmd-avatar-color: #000;\n}\n",
        },
      ],
      parameters: [
        {
          type: "Color",
          name: "background-color",
          description: "The background color to apply",
        },
        {
          type: "Color",
          name: "color",
          description: "The text color to apply",
        },
      ],
    },
    {
      name: "rmd-avatar-colors",
      type: "mixin",
      description:
        "A mixin for creating the avatar color suffix class names from a color map. It is\nnot recommended to use this mixin for creating additional colors. Instead use the\n`rmd-avatar-color` mixin with custom class names instead.\n\n",
      file: "@react-md/avatar/dist/_mixins.scss",
      group: "avatar",
      see: [],
      links: [],
      code:
        "@mixin rmd-avatar-colors($color-map: $rmd-avatar-colors) {\n  @each $color-name, $values in $color-map {\n    @if length($values) != 2 {\n      @error 'Unable to create an avatar color because the list of values is not of length 2. The first value should be the background-color and the second should be the text color. \"#{$values}\"';\n    }\n\n    .rmd-avatar--#{$color-name} {\n      @include rmd-avatar-color(nth($values, 1), nth($values, 2));\n    }\n  }\n}",
      oneLineCode:
        "@mixin rmd-avatar-colors($color-map: $rmd-avatar-colors) { … }",
      throws: [
        "Unable to create an avatar color because the list of values is not of length 2. The first value should be the background-color and the second should be the text color. ",
      ],
      examples: [],
      parameters: [
        {
          type: "Map",
          name: "color-map",
          default: "rmd-avatar-colors",
          description:
            "a map of color name suffixes and a list\nof the background-color and color to apply",
        },
      ],
    },
    {
      name: "react-md-avatar",
      type: "mixin",
      description:
        "Creates all the styles for the avatar package as well as the root css variable theme.\n",
      file: "@react-md/avatar/dist/_mixins.scss",
      group: "avatar",
      see: [],
      links: [],
      code:
        "@mixin react-md-avatar {\n  @include rmd-theme-create-root-theme($rmd-avatar-theme-values, avatar);\n\n  .rmd-avatar {\n    @include rmd-typography-base;\n    @include rmd-icon-theme-update-var(color, currentColor);\n    @include rmd-avatar-theme(border-radius);\n    @include rmd-avatar-theme(font-size);\n    @include rmd-avatar-theme(height, size);\n    @include rmd-avatar-theme(width, size);\n    @include rmd-avatar-theme(border-color);\n    @include rmd-avatar-theme(background-color);\n    @include rmd-avatar-theme(color);\n\n    align-items: center;\n    border: 1px solid;\n    display: inline-flex;\n    justify-content: center;\n    line-height: $rmd-avatar-line-height;\n    overflow: hidden;\n\n    &__image {\n      height: 100%;\n      width: auto;\n    }\n  }\n\n  @include rmd-avatar-colors;\n}",
      oneLineCode: "@mixin react-md-avatar { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default AvatarSassDoc;
