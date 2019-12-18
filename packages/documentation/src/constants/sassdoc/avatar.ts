/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-avatar-theme": {
      name: "rmd-avatar-theme",
      description:
        "This function is used to quickly get one of the avatar's theme values. This is really\njust for the `rmd-avatar-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/avatar/src/_functions.scss#L14-L16",
      packageName: "avatar",
      code: "@function rmd-avatar-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-avatar-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-avatar-theme-values, avatar);\n}",
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
        "This function is used to get one of the avatar's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-avatar-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/avatar/src/_functions.scss#L29-L31",
      usedBy: [{ name: "rmd-list-item", type: "mixin", packageName: "list" }],
      packageName: "avatar",
      code:
        "@function rmd-avatar-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-avatar-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-avatar-theme-values, avatar, $fallback);\n}",
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
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
        "This function is used to quickly get one of the avatar's theme values. This is really\njust for the `rmd-avatar-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/avatar/src/_functions.scss#L14-L16",
      packageName: "avatar",
      code: "@function rmd-avatar-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-avatar-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-avatar-theme-values, avatar);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-avatar-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-avatar-theme-var": {
      name: "rmd-avatar-theme-var",
      description:
        "This function is used to get one of the avatar's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-avatar-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/avatar/src/_functions.scss#L29-L31",
      usedBy: [{ name: "rmd-list-item", type: "mixin", packageName: "list" }],
      packageName: "avatar",
      code:
        "@function rmd-avatar-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-avatar-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-avatar-theme-values, avatar, $fallback);\n}",
      type: "mixin",
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
    },
  },
  variables: {
    "rmd-avatar-background-color": {
      name: "rmd-avatar-background-color",
      description:
        "The default background color for an avatar. This will be used until\nthe `color` prop is provided to the `Avatar` component.\n\n",
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
        "The default text color for the avatar. This will be used until the\n`color` prop is provided to the `Avatar` component.\n",
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
        "The line height to use for avatars. This is really only useful when the\navatar is a letter.\n",
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
        "A Map of all the available colors for the avatar. This map can be\nupdated with new values if the defaults are not to your liking, but\nit is recommended to create your own themes instead.\n\n",
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
        'A Map of all the "themeable" parts of the avatar package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
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
