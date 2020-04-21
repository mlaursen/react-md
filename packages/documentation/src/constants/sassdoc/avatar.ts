/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-avatar-theme": {
      name: "rmd-avatar-theme",
      description:
        "This function is used to quickly get one of the avatar's theme values. This is really just for the `rmd-avatar-theme` mixin to provide some validation that a correct style key is used, but might be useful in other cases.",
      source: "packages/avatar/src/_functions.scss#L15-L17",
      packageName: "avatar",
      code: "@function rmd-avatar-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-avatar-theme($theme-style) {\n  @return rmd-theme-get-var-value(\n    $theme-style,\n    $rmd-avatar-theme-values,\n    avatar\n  );\n}\n",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-avatar-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the avatar's theme values.",
      },
    },
    "rmd-avatar-theme-var": {
      name: "rmd-avatar-theme-var",
      description:
        "This function is used to get one of the avatar's theme variables as a CSS Variable to be applied as a style attribute. By default, the CSS Variable will have a fallback of the current `$rmd-avatar-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value if the CSS Variable has not been declared somehow.",
      source: "packages/avatar/src/_functions.scss#L32-L34",
      usedBy: [{ name: "rmd-list-item", type: "mixin", packageName: "list" }],
      packageName: "avatar",
      code:
        "@function rmd-avatar-theme-var($theme-style, $fallback: null) { … }",
      sourceCode:
        "@function rmd-avatar-theme-var($theme-style, $fallback: null) {\n  @return rmd-theme-get-var(\n    $theme-style,\n    $rmd-avatar-theme-values,\n    avatar,\n    $fallback\n  );\n}\n",
      type: "function",
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
            "An optional fallback color to apply. This is set to `null` by default and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the avatar's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-avatar-theme": {
      name: "rmd-avatar-theme",
      description:
        "Creates the styles for one of the avatar's theme values. This is mostly going to be an internal helper mixin util.",
      source: "packages/avatar/src/_mixins.scss#L21-L23",
      usedBy: [
        { name: "react-md-avatar", type: "mixin", packageName: "avatar" },
      ],
      packageName: "avatar",
      code:
        "@mixin rmd-avatar-theme($property, $theme-style, $fallback: null) { … }",
      sourceCode:
        "@mixin rmd-avatar-theme($property, $theme-style, $fallback: null) {\n  @include rmd-theme-apply-rmd-var(\n    $property,\n    $theme-style,\n    $rmd-avatar-theme-values,\n    avatar\n  );\n}\n",
      type: "mixin",
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
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable isn't set somehow. This will default to automatically retrieving the default value from the `rmd-avatar-theme-values` map when `null`.",
        },
      ],
    },
    "rmd-avatar-theme-update-var": {
      name: "rmd-avatar-theme-update-var",
      description:
        "Updates one of the avatar's theme variables with the new value for the section of your app.",
      source: "packages/avatar/src/_mixins.scss#L31-L33",
      usedBy: [
        { name: "rmd-avatar-color", type: "mixin", packageName: "avatar" },
        { name: "rmd-chip", type: "mixin", packageName: "chip" },
      ],
      packageName: "avatar",
      code: "@mixin rmd-avatar-theme-update-var($theme-style, $value) { … }",
      sourceCode:
        "@mixin rmd-avatar-theme-update-var($theme-style, $value) {\n  @include rmd-theme-update-rmd-var(\n    $value,\n    $theme-style,\n    $rmd-avatar-theme-values,\n    avatar\n  );\n}\n",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The avatar theme style type to update. This should be one of the `$rmd-avatar-theme-values` keys.",
        },
        {
          type: "Color|String|Number",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    "rmd-avatar-color": {
      name: "rmd-avatar-color",
      description: "A mixin for updating the avatar's theme colors.",
      source: "packages/avatar/src/_mixins.scss#L48-L51",
      usedBy: [
        { name: "rmd-avatar-colors", type: "mixin", packageName: "avatar" },
      ],
      packageName: "avatar",
      examples: [
        {
          code:
            ".my-red-avatar {\n  @include rmd-avatar-color($rmd-red-500, $rmd-black-base);\n}\n\n.my-orange-avatar {\n  @include rmd-avatar-color($rmd-orange-500, $rmd-black-base);\n}\n",
          compiled:
            ".my-red-avatar {\n  --rmd-avatar-background-color: #f44336;\n  --rmd-avatar-color: #000;\n}\n\n.my-orange-avatar {\n  --rmd-avatar-background-color: #ff9800;\n  --rmd-avatar-color: #000;\n}\n",
          type: "scss",
          description: "Example Usage SCSS",
        },
      ],
      code: "@mixin rmd-avatar-color($background-color, $color) { … }",
      sourceCode:
        "@mixin rmd-avatar-color($background-color, $color) {\n  @include rmd-avatar-theme-update-var(background-color, $background-color);\n  @include rmd-avatar-theme-update-var(color, $color);\n}\n",
      type: "mixin",
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
    "rmd-avatar-colors": {
      name: "rmd-avatar-colors",
      description:
        "A mixin for creating the avatar color suffix class names from a color map.\nIt is not recommended to use this mixin for creating additional colors.\nInstead use the `rmd-avatar-color` mixin with custom class names instead.",
      source: "packages/avatar/src/_mixins.scss#L59-L71",
      usedBy: [
        { name: "react-md-avatar", type: "mixin", packageName: "avatar" },
      ],
      packageName: "avatar",
      code: "@mixin rmd-avatar-colors($color-map: $rmd-avatar-colors) { … }",
      sourceCode:
        '@mixin rmd-avatar-colors($color-map: $rmd-avatar-colors) {\n  @each $color-name, $values in $color-map {\n    @if length($values) != 2 {\n      @error \'Unable to create an avatar color because the list of values is not of length 2. The first value should be the background-color and the second should be the text color. "#{$values}"\';\n    }\n\n    $class-name: "rmd-avatar--" + $color-name;\n\n    .#{$class-name} {\n      @include rmd-avatar-color(nth($values, 1), nth($values, 2));\n    }\n  }\n}\n',
      throws: [
        "Unable to create an avatar color because the list of values is not of length 2. The first value should be the background-color and the second should be the text color. ",
      ],
      type: "mixin",
      parameters: [
        {
          type: "Map",
          name: "color-map",
          default: "$rmd-avatar-colors",
          description:
            "a map of color name suffixes and a list of the background-color and color to apply",
        },
      ],
    },
    "react-md-avatar": {
      name: "react-md-avatar",
      description:
        "Creates all the styles for the avatar package as well as the root css variable theme.\n",
      source: "packages/avatar/src/_mixins.scss#L75-L104",
      usedBy: [{ name: "react-md-utils", type: "mixin", packageName: "utils" }],
      packageName: "avatar",
      code: "@mixin react-md-avatar { … }",
      sourceCode:
        "@mixin react-md-avatar {\n  @include rmd-theme-create-root-theme($rmd-avatar-theme-values, avatar);\n\n  .rmd-avatar {\n    @include rmd-typography-base;\n    @include rmd-icon-theme-update-var(color, currentColor);\n    @include rmd-avatar-theme(border-radius);\n    @include rmd-avatar-theme(font-size);\n    @include rmd-avatar-theme(height, size);\n    @include rmd-avatar-theme(width, size);\n    @include rmd-avatar-theme(border-color);\n    @include rmd-avatar-theme(background-color);\n    @include rmd-avatar-theme(color);\n\n    align-items: center;\n    border: 1px solid;\n    display: inline-flex;\n    flex-shrink: 0;\n    justify-content: center;\n    line-height: $rmd-avatar-line-height;\n    overflow: hidden;\n\n    &__image {\n      height: 100%;\n      width: auto;\n    }\n  }\n\n  @include rmd-avatar-colors;\n}\n",
      type: "mixin",
    },
  },
  variables: {
    "rmd-avatar-background-color": {
      name: "rmd-avatar-background-color",
      description:
        "The default background color for an avatar. This will be used until the `color` prop is provided to the `Avatar` component.",
      source: "packages/avatar/src/_variables.scss#L13",
      see: [
        { name: "rmd-avatar-colors", type: "mixin", packageName: "avatar" },
      ],
      packageName: "avatar",
      type: "Color",
      value: "$rmd-grey-700",
      compiled: "#616161",
      overridable: true,
    },
    "rmd-avatar-border-color": {
      name: "rmd-avatar-border-color",
      description: "The border color to apply to the avatar.\n",
      source: "packages/avatar/src/_variables.scss#L17-L20",
      packageName: "avatar",
      type: "Color",
      value:
        "rgba(\n  if(rmd-theme-tone($rmd-theme-background) == light, $rmd-black-base, $rmd-white-base),\n  0.12\n)",
      compiled: "rgba(0, 0, 0, 0.12)",
      overridable: true,
    },
    "rmd-avatar-border-radius": {
      name: "rmd-avatar-border-radius",
      description: "The border-radius for the avatar.\n",
      source: "packages/avatar/src/_variables.scss#L24",
      packageName: "avatar",
      type: "Number",
      value: "50%",
      overridable: true,
    },
    "rmd-avatar-color": {
      name: "rmd-avatar-color",
      description:
        "The default text color for the avatar. This will be used until the `color` prop is provided to the `Avatar` component.\n",
      source: "packages/avatar/src/_variables.scss#L29",
      packageName: "avatar",
      type: "Color",
      value: "$rmd-grey-100",
      compiled: "#f5f5f5",
      overridable: true,
    },
    "rmd-avatar-size": {
      name: "rmd-avatar-size",
      description: "The size for the avatar.\n",
      source: "packages/avatar/src/_variables.scss#L33",
      packageName: "avatar",
      type: "Number",
      value: "2.5rem",
      overridable: true,
    },
    "rmd-avatar-font-size": {
      name: "rmd-avatar-font-size",
      description:
        "The font size to apply to avatars. This is used when the avatar is a letter.\n",
      source: "packages/avatar/src/_variables.scss#L37",
      packageName: "avatar",
      type: "Number",
      value: "1.5rem",
      overridable: true,
    },
    "rmd-avatar-line-height": {
      name: "rmd-avatar-line-height",
      description:
        "The line height to use for avatars. This is really only useful when the avatar is a letter.\n",
      source: "packages/avatar/src/_variables.scss#L42",
      usedBy: [
        { name: "react-md-avatar", type: "mixin", packageName: "avatar" },
      ],
      packageName: "avatar",
      type: "Number",
      value: "rmd-typography-value(subtitle-1, line-height)",
      compiled: "1.75rem",
      overridable: true,
    },
    "rmd-avatar-colors": {
      name: "rmd-avatar-colors",
      description:
        "A Map of all the available colors for the avatar. This map can be updated with new values if the defaults are not to your liking, but it is recommended to create your own themes instead.",
      source: "packages/avatar/src/_variables.scss#L49-L69",
      packageName: "avatar",
      type: "Map",
      value:
        "(\n  red: $rmd-red-a-700 $rmd-red-50,\n  pink: $rmd-pink-600 $rmd-white-base,\n  purple: $rmd-purple-700 $rmd-purple-100,\n  deep-purple: $rmd-deep-purple-900 $rmd-deep-purple-100,\n  indigo: $rmd-indigo-600 $rmd-indigo-100,\n  blue: $rmd-blue-a-700 $rmd-white-base,\n  light-blue: $rmd-light-blue-300 $rmd-deep-purple-900,\n  cyan: $rmd-cyan-400 $rmd-teal-900,\n  teal: $rmd-teal-a-400 $rmd-teal-900,\n  green: $rmd-green-800 $rmd-green-50,\n  light-green: $rmd-light-green-300 $rmd-green-900,\n  lime: $rmd-lime-400 $rmd-teal-800,\n  yellow: $rmd-yellow-a-200 $rmd-brown-500,\n  amber: $rmd-amber-400 $rmd-brown-800,\n  orange: $rmd-orange-600 $rmd-grey-900,\n  deep-orange: $rmd-deep-orange-a-400 $rmd-grey-900,\n  brown: $rmd-brown-500 $rmd-brown-50,\n  grey: $rmd-grey-700 $rmd-grey-100,\n  blue-grey: $rmd-blue-grey-700 $rmd-blue-grey-50,\n)",
      compiled:
        "(\n  red: #d50000 #ffebee,\n  pink: #d81b60 #fff,\n  purple: #7b1fa2 #e1bee7,\n  deep-purple: #311b92 #d1c4e9,\n  indigo: #3949ab #c5cae9,\n  blue: #2962ff #fff,\n  light-blue: #4fc3f7 #311b92,\n  cyan: #26c6da #004d40,\n  teal: #1de9b6 #004d40,\n  green: #2e7d32 #e8f5e9,\n  light-green: #aed581 #1b5e20,\n  lime: #d4e157 #00695c,\n  yellow: #ff0 #795548,\n  amber: #ffca28 #4e342e,\n  orange: #fb8c00 #212121,\n  deep-orange: #ff3d00 #212121,\n  brown: #795548 #efebe9,\n  grey: #616161 #f5f5f5,\n  blue-grey: #455a64 #eceff1,\n)",
      overridable: true,
    },
    "rmd-avatar-theme-values": {
      name: "rmd-avatar-theme-values",
      description:
        'A Map of all the "themeable" parts of the avatar package. Every key in this map will be used to create a css variable to dynamically update the values of the icon as needed.\n',
      source: "packages/avatar/src/_variables.scss#L75-L82",
      usedBy: [
        { name: "rmd-avatar-theme", type: "function", packageName: "avatar" },
        {
          name: "rmd-avatar-theme-var",
          type: "function",
          packageName: "avatar",
        },
        { name: "rmd-avatar-theme", type: "mixin", packageName: "avatar" },
        {
          name: "rmd-avatar-theme-update-var",
          type: "mixin",
          packageName: "avatar",
        },
        { name: "react-md-avatar", type: "mixin", packageName: "avatar" },
      ],
      packageName: "avatar",
      type: "Map",
      value:
        "(\n  background-color: $rmd-avatar-background-color,\n  border-color: $rmd-avatar-border-color,\n  border-radius: $rmd-avatar-border-radius,\n  color: $rmd-avatar-color,\n  font-size: $rmd-avatar-font-size,\n  size: $rmd-avatar-size,\n)",
      compiled:
        "(\n  background-color: #616161,\n  border-color: rgba(0, 0, 0, 0.12),\n  border-radius: 50%,\n  color: #f5f5f5,\n  font-size: 1.5rem,\n  size: 2.5rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
