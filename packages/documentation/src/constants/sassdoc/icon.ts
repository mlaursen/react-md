/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-icon-theme": {
      name: "rmd-icon-theme",
      description:
        "This function is used to quickly get one of the icon's theme values. This is really\njust for the `rmd-icon-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/icon/src/_functions.scss#L14-L16",
      packageName: "icon",
      code: "@function rmd-icon-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-icon-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-icon-theme-values, icon);\n}",
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
        "This function is used to get one of the icon's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-icon-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/icon/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-icon-dense-theme", type: "mixin", packageName: "icon" },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      packageName: "icon",
      code: "@function rmd-icon-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-icon-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-icon-theme-values, icon, $fallback);\n}",
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
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the link's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-icon-theme": {
      name: "rmd-icon-theme",
      description:
        "This function is used to quickly get one of the icon's theme values. This is really\njust for the `rmd-icon-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/icon/src/_functions.scss#L14-L16",
      packageName: "icon",
      code: "@function rmd-icon-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-icon-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-icon-theme-values, icon);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-icon-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-icon-theme-var": {
      name: "rmd-icon-theme-var",
      description:
        "This function is used to get one of the icon's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-icon-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/icon/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-icon-dense-theme", type: "mixin", packageName: "icon" },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        {
          name: "rmd-icon-spaced-with-text",
          type: "mixin",
          packageName: "icon",
        },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "rmd-icon", type: "mixin", packageName: "icon" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      packageName: "icon",
      code: "@function rmd-icon-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-icon-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-icon-theme-values, icon, $fallback);\n}",
      type: "mixin",
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
        "The dense icon size to use. If you do not want to include the dense icon spec, disable the\n`$rmd-icon-include-dense` variable.\n",
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
        "Boolean if the dense spec for icons should be included. This will just generate `.md-icon--font-dense` and `.md-icon--svg-dense` class names\nthat can be applied.\n\n",
      source: "packages/icon/src/_variables.scss#L25",
      usedBy: [{ name: "rmd-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-icon-material-icons-font": {
      name: "rmd-icon-material-icons-font",
      description:
        "Boolean if you are using the material-icons font icon library. This will update the dense theme\nto fix material icons as well.\n",
      source: "packages/icon/src/_variables.scss#L30",
      usedBy: [{ name: "rmd-icon", type: "mixin", packageName: "icon" }],
      packageName: "icon",
      type: "Boolean",
      value: "false",
      overridable: true,
    },
    "rmd-icon-use-font-icons": {
      name: "rmd-icon-use-font-icons",
      description:
        "Boolean if font icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can\ndisable the style generation for the unused type to save a few bytes.\n\n",
      source: "packages/icon/src/_variables.scss#L37",
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
        "Boolean if svg icons should be used. Normally only one of font icons or svg icons should be used within your application, so you can\ndisable the style generation for the unused type to save a few bytes.\n\n",
      source: "packages/icon/src/_variables.scss#L44",
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
      source: "packages/icon/src/_variables.scss#L48",
      packageName: "icon",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-icon-rotator-transition-time": {
      name: "rmd-icon-rotator-transition-time",
      description:
        "The transition time for the icon rotator to fully rotate.\n",
      source: "packages/icon/src/_variables.scss#L52",
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
        "The default starting position for the `IconRotator` component. This needs to be\na valid transformation value to work.\n",
      source: "packages/icon/src/_variables.scss#L57",
      packageName: "icon",
      type: "Number",
      value: "rotate(0deg)",
      overridable: true,
    },
    "rmd-icon-rotator-to": {
      name: "rmd-icon-rotator-to",
      description:
        "The default ending position for the `IconRotator` component. This needs to be\na valid transformation value to work.\n",
      source: "packages/icon/src/_variables.scss#L62",
      packageName: "icon",
      type: "Number",
      value: "rotate(180deg)",
      overridable: true,
    },
    "rmd-icon-theme-values": {
      name: "rmd-icon-theme-values",
      description:
        'A Map of all the "themeable" parts of the icon package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/icon/src/_variables.scss#L68-L75",
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
