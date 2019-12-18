/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-list-theme": {
      name: "rmd-list-theme",
      description:
        "This function is used to quickly get one of the list's theme values. This is really\njust for the `rmd-list-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/list/src/_functions.scss#L14-L16",
      packageName: "list",
      code: "@function rmd-list-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-list-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-list-theme-values, list);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-list-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the list's theme values.",
      },
    },
    "rmd-list-theme-var": {
      name: "rmd-list-theme-var",
      description:
        "This function is used to get one of the list's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-list-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/list/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      packageName: "list",
      code: "@function rmd-list-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-list-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-list-theme-values, list, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-list-theme-values` map keys to set a value for.",
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
    "rmd-list-theme": {
      name: "rmd-list-theme",
      description:
        "This function is used to quickly get one of the list's theme values. This is really\njust for the `rmd-list-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/list/src/_functions.scss#L14-L16",
      packageName: "list",
      code: "@function rmd-list-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-list-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-list-theme-values, list);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-list-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-list-theme-var": {
      name: "rmd-list-theme-var",
      description:
        "This function is used to get one of the list's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-list-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/list/src/_functions.scss#L29-L31",
      usedBy: [
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
        { name: "rmd-list-item", type: "mixin", packageName: "list" },
      ],
      packageName: "list",
      code: "@function rmd-list-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-list-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-list-theme-values, list, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-list-theme-values` map keys to set a value for.",
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
    "rmd-list-vertical-padding": {
      name: "rmd-list-vertical-padding",
      description:
        "The amount of padding to place before the first list item and after the last list item in the list.\n\n",
      source: "packages/list/src/_variables.scss#L11",
      see: [
        {
          name: "rmd-list-dense-vertical-padding",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-list-dense-vertical-padding": {
      name: "rmd-list-dense-vertical-padding",
      description:
        "The amount of padding to place before the first list item and after the last list item in the list.\n\n",
      source: "packages/list/src/_variables.scss#L16",
      packageName: "list",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-list-horizontal-padding": {
      name: "rmd-list-horizontal-padding",
      description:
        "The amount of padding to place to the left and right of all the list items. It is recommended\nto keep this value at `0` and instead update the `$rmd-list-item-horizontal-padding` instead to\nget better clickable areas and hover effects on each item.\n\n",
      source: "packages/list/src/_variables.scss#L25",
      see: [
        {
          name: "rmd-list-dense-horizontal-padding",
          type: "variable",
          packageName: "list",
        },
        {
          name: "rmd-list-item-horizontal-padding",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "0",
      overridable: true,
    },
    "rmd-list-dense-horizontal-padding": {
      name: "rmd-list-dense-horizontal-padding",
      description:
        'The amount of padding to place to the left and right of all the list items in a "dense" layout. It\nis recommended to keep this value at `0` and instead update the `$rmd-list-item-horizontal-padding`\ninstead to get better clickable areas and hover effects on each item.\n\n',
      source: "packages/list/src/_variables.scss#L34",
      see: [
        {
          name: "rmd-list-horizontal-padding",
          type: "variable",
          packageName: "list",
        },
        {
          name: "rmd-list-item-horizontal-padding",
          type: "variable",
          packageName: "list",
        },
      ],
      packageName: "list",
      type: "Number",
      value: "$rmd-list-horizontal-padding",
      compiled: "0",
      overridable: true,
    },
    "rmd-list-line-height": {
      name: "rmd-list-line-height",
      description:
        "The line height to apply to all items within the list. The default typography applied to lists uses\nthe `subtitle-1` typography specs, but it looks better to apply the main text line-height within lists.\n\n",
      source: "packages/list/src/_variables.scss#L40",
      usedBy: [{ name: "rmd-list", type: "mixin", packageName: "list" }],
      packageName: "list",
      type: "Number",
      value: "rmd-typography-value(body-1, line-height)",
      compiled: "1.5rem",
      overridable: true,
    },
    "rmd-list-font-size": {
      name: "rmd-list-font-size",
      description: "The font size to apply to all items in a list.\n\n",
      source: "packages/list/src/_variables.scss#L45",
      packageName: "list",
      type: "Number",
      value: "rmd-typography-value(subtitle-1, font-size)",
      compiled: "1rem",
      overridable: true,
    },
    "rmd-list-dense-font-size": {
      name: "rmd-list-dense-font-size",
      description: 'The font size to use for a "dense" list layout.\n',
      source: "packages/list/src/_variables.scss#L49",
      packageName: "list",
      type: "Number",
      value: "0.8125rem",
      overridable: true,
    },
    "rmd-list-item-vertical-padding": {
      name: "rmd-list-item-vertical-padding",
      description:
        'The amount of vertical padding to apply to each list item. This is really only added to help with the\ndefault "growing height" case of items since the list item is aligned using a centered flexbox.\n\n',
      source: "packages/list/src/_variables.scss#L55",
      packageName: "list",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-list-item-horizontal-padding": {
      name: "rmd-list-item-horizontal-padding",
      description:
        "The amount of horizontal padding to apply to each list item.\n\n",
      source: "packages/list/src/_variables.scss#L60",
      usedBy: [
        { name: "rmd-tree-item-at-depth", type: "mixin", packageName: "tree" },
      ],
      packageName: "list",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-list-item-height": {
      name: "rmd-list-item-height",
      description:
        'The default height for a list item. To help create more general lists and layouts this height will\nbe applied as a `min-height` instead of `height` so that it can grow in height based on the content.\nWhen using the `ListItem` component, it will automatically "upgrade" to use `height` when the `secondaryText`\nor list item "addons" are provided to help enforce the material design specs.\n\n',
      source: "packages/list/src/_variables.scss#L68",
      packageName: "list",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-list-item-dense-height": {
      name: "rmd-list-item-dense-height",
      description: "The default height for a dense list item.\n",
      source: "packages/list/src/_variables.scss#L72",
      packageName: "list",
      type: "Number",
      value: "2.5rem",
      overridable: true,
    },
    "rmd-list-item-medium-height": {
      name: "rmd-list-item-medium-height",
      description:
        'The height for a "medium" sized list item. This will normally get applied\nfor any list item that has an icon or avatar.\n',
      source: "packages/list/src/_variables.scss#L77",
      packageName: "list",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-list-item-dense-medium-height": {
      name: "rmd-list-item-dense-medium-height",
      description:
        'The height for a "medium" sized list item that is also dense.\n',
      source: "packages/list/src/_variables.scss#L81",
      packageName: "list",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-list-item-large-height": {
      name: "rmd-list-item-large-height",
      description:
        'The height for a "large" sized list item. This will normally get applied\nfor any list item that has secondary text with no icon, or avatar.\n',
      source: "packages/list/src/_variables.scss#L86",
      packageName: "list",
      type: "Number",
      value: "4rem",
      overridable: true,
    },
    "rmd-list-item-dense-large-height": {
      name: "rmd-list-item-dense-large-height",
      description:
        'The height for a "large" sized list item that is also dense.\n',
      source: "packages/list/src/_variables.scss#L90",
      packageName: "list",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-list-item-extra-large-height": {
      name: "rmd-list-item-extra-large-height",
      description:
        'The height for an "extra large" sized list item. This will normally get applied\nfor any list item that:\n- is single line but has a media\n- has secondary text with an icon, avatar, media, or metadata\n\n',
      source: "packages/list/src/_variables.scss#L98",
      packageName: "list",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-list-item-dense-extra-large-height": {
      name: "rmd-list-item-dense-extra-large-height",
      description:
        'The height for a "extra large" sized list item that is also dense.\n',
      source: "packages/list/src/_variables.scss#L102",
      packageName: "list",
      type: "Number",
      value: "4rem",
      overridable: true,
    },
    "rmd-list-item-three-line-height": {
      name: "rmd-list-item-three-line-height",
      description: "The height for a list item with three lines of text.\n",
      source: "packages/list/src/_variables.scss#L106",
      packageName: "list",
      type: "Number",
      value: "5.5rem",
      overridable: true,
    },
    "rmd-list-item-dense-three-line-height": {
      name: "rmd-list-item-dense-three-line-height",
      description:
        "The height for a list item with three lines of text while being dense.\n",
      source: "packages/list/src/_variables.scss#L110",
      packageName: "list",
      type: "Number",
      value: "5rem",
      overridable: true,
    },
    "rmd-list-item-secondary-text-line-height": {
      name: "rmd-list-item-secondary-text-line-height",
      description:
        "The line-height to use for the secondary text within the list item. This is different\nthan the primary text since this can span multiple lines by default.\n",
      source: "packages/list/src/_variables.scss#L115",
      usedBy: [{ name: "rmd-list-item", type: "mixin", packageName: "list" }],
      packageName: "list",
      type: "Number",
      value: "1.42857",
      overridable: true,
    },
    "rmd-list-item-secondary-text-three-line-max-height": {
      name: "rmd-list-item-secondary-text-three-line-max-height",
      description:
        "The max allowed height for the three-line list item's secondary text. You probably\ndon't want to change this value unless you changed the other list item heights.\n",
      source: "packages/list/src/_variables.scss#L120",
      packageName: "list",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-list-item-dense-secondary-text-three-line-max-height": {
      name: "rmd-list-item-dense-secondary-text-three-line-max-height",
      description:
        "The max allowed height for the dense three-line list item's secondary text. You probably\ndon't want to change this value unless you changed the other list item heights.\n",
      source: "packages/list/src/_variables.scss#L125",
      packageName: "list",
      type: "Number",
      value: "2.25rem",
      overridable: true,
    },
    "rmd-list-item-text-keyline": {
      name: "rmd-list-item-text-keyline",
      description:
        "The spacing between the left side of the list item up to the left side of the\nfirst character of text. This is normally just used to align the list items\nwith other components.\n",
      source: "packages/list/src/_variables.scss#L131",
      packageName: "list",
      type: "Number",
      value: "4.5rem",
      overridable: true,
    },
    "rmd-list-item-media-size": {
      name: "rmd-list-item-media-size",
      description:
        "The size to use for media that appears before or after the main content in\na list item.\n",
      source: "packages/list/src/_variables.scss#L136",
      packageName: "list",
      type: "Number",
      value: "3.5rem",
      overridable: true,
    },
    "rmd-list-item-media-large-size": {
      name: "rmd-list-item-media-large-size",
      description:
        "The size to use for large media that appears before or after the main content in\na list item.\n",
      source: "packages/list/src/_variables.scss#L141",
      packageName: "list",
      type: "Number",
      value: "6.25rem",
      overridable: true,
    },
    "rmd-list-item-media-spacing": {
      name: "rmd-list-item-media-spacing",
      description:
        "The amount of spacing to place between the main content and media that appears in\na list item.\n",
      source: "packages/list/src/_variables.scss#L146",
      packageName: "list",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-list-theme-values": {
      name: "rmd-list-theme-values",
      description:
        'A Map of all the "themeable" parts of the list package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/list/src/_variables.scss#L152-L177",
      usedBy: [
        { name: "rmd-list-theme", type: "function", packageName: "list" },
        { name: "rmd-list-theme-var", type: "function", packageName: "list" },
        { name: "rmd-list-theme", type: "mixin", packageName: "list" },
        {
          name: "rmd-list-theme-update-var",
          type: "mixin",
          packageName: "list",
        },
        { name: "react-md-list", type: "mixin", packageName: "list" },
      ],
      packageName: "list",
      type: "Map",
      value:
        "(\n  vertical-padding: $rmd-list-vertical-padding,\n  horizontal-padding: $rmd-list-horizontal-padding,\n  font-size: $rmd-list-font-size,\n  text-keyline: $rmd-list-item-text-keyline,\n  item-height: $rmd-list-item-height,\n  item-medium-height: $rmd-list-item-medium-height,\n  item-large-height: $rmd-list-item-large-height,\n  item-extra-large-height: $rmd-list-item-extra-large-height,\n  item-three-line-height: $rmd-list-item-three-line-height,\n  item-vertical-padding: $rmd-list-item-vertical-padding,\n  item-horizontal-padding: $rmd-list-item-horizontal-padding,\n  item-secondary-three-line-height: $rmd-list-item-secondary-text-three-line-max-height,\n  dense-font-size: $rmd-list-dense-font-size,\n  dense-vertical-padding: $rmd-list-dense-vertical-padding,\n  dense-horizontal-padding: $rmd-list-dense-horizontal-padding,\n  dense-item-height: $rmd-list-item-dense-height,\n  dense-item-medium-height: $rmd-list-item-dense-medium-height,\n  dense-item-large-height: $rmd-list-item-dense-large-height,\n  dense-item-extra-large-height: $rmd-list-item-dense-extra-large-height,\n  dense-item-three-line-height: $rmd-list-item-dense-three-line-height,\n  dense-item-secondary-three-line-height: $rmd-list-item-dense-secondary-text-three-line-max-height,\n  media-size: $rmd-list-item-media-size,\n  media-spacing: $rmd-list-item-media-spacing,\n  media-large-size: $rmd-list-item-media-large-size,\n)",
      compiled:
        "(\n  vertical-padding: 0.5rem,\n  horizontal-padding: 0,\n  font-size: 1rem,\n  text-keyline: 4.5rem,\n  item-height: 3rem,\n  item-medium-height: 3.5rem,\n  item-large-height: 4rem,\n  item-extra-large-height: 4.5rem,\n  item-three-line-height: 5.5rem,\n  item-vertical-padding: 0.5rem,\n  item-horizontal-padding: 1rem,\n  item-secondary-three-line-height: 3rem,\n  dense-font-size: 0.8125rem,\n  dense-vertical-padding: 0.25rem,\n  dense-horizontal-padding: 0,\n  dense-item-height: 2.5rem,\n  dense-item-medium-height: 3rem,\n  dense-item-large-height: 3.5rem,\n  dense-item-extra-large-height: 4rem,\n  dense-item-three-line-height: 5rem,\n  dense-item-secondary-three-line-height: 2.25rem,\n  media-size: 3.5rem,\n  media-spacing: 1rem,\n  media-large-size: 6.25rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
