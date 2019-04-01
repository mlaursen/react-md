/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const ListSassDoc: PackageSassDoc = {
  name: "list",
  variables: [
    {
      name: "rmd-list-vertical-padding",
      type: "Number",
      description:
        "The amount of padding to place before the first list item and after the last list item in the list.\n\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [
        {
          name: "rmd-list-dense-vertical-padding",
          type: "variable",
          description:
            "The amount of padding to place before the first list item and after the last list item in the list.\n\n",
          group: "list",
        },
      ],
      links: [],
      value: "0.5rem",
      compiledValue: "0.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-dense-vertical-padding",
      type: "Number",
      description:
        "The amount of padding to place before the first list item and after the last list item in the list.\n\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "0.25rem",
      compiledValue: "0.25rem",
      configurable: true,
    },
    {
      name: "rmd-list-horizontal-padding",
      type: "Number",
      description:
        "The amount of padding to place to the left and right of all the list items. It is recommended\nto keep this value at `0` and instead update the `$rmd-list-item-horizontal-padding` instead to\nget better clickable areas and hover effects on each item.\n\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [
        {
          name: "rmd-list-dense-horizontal-padding",
          type: "variable",
          description:
            'The amount of padding to place to the left and right of all the list items in a "dense" layout. It\nis recommended to keep this value at `0` and instead update the `$rmd-list-item-horizontal-padding`\ninstead to get better clickable areas and hover effects on each item.\n\n',
          group: "list",
        },
        {
          name: "rmd-list-item-horizontal-padding",
          type: "variable",
          description:
            "The amount of horizontal padding to apply to each list item.\n\n",
          group: "list",
        },
      ],
      links: [],
      value: "0",
      compiledValue: "0",
      configurable: true,
    },
    {
      name: "rmd-list-dense-horizontal-padding",
      type: "Number",
      description:
        'The amount of padding to place to the left and right of all the list items in a "dense" layout. It\nis recommended to keep this value at `0` and instead update the `$rmd-list-item-horizontal-padding`\ninstead to get better clickable areas and hover effects on each item.\n\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [
        {
          name: "rmd-list-horizontal-padding",
          type: "variable",
          description:
            "The amount of padding to place to the left and right of all the list items. It is recommended\nto keep this value at `0` and instead update the `$rmd-list-item-horizontal-padding` instead to\nget better clickable areas and hover effects on each item.\n\n",
          group: "list",
        },
        {
          name: "rmd-list-item-horizontal-padding",
          type: "variable",
          description:
            "The amount of horizontal padding to apply to each list item.\n\n",
          group: "list",
        },
      ],
      links: [],
      value: "$rmd-list-horizontal-padding",
      compiledValue: "0",
      configurable: true,
    },
    {
      name: "rmd-list-line-height",
      type: "Number",
      description:
        "The line height to apply to all items within the list. The default typography applied to lists uses\nthe `subtitle-1` typography specs, but it looks better to apply the main text line-height within lists.\n\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "rmd-typography-value(body-1, line-height)",
      compiledValue: "1.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-font-size",
      type: "Number",
      description: "The font size to apply to all items in a list.\n\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "rmd-typography-value(subtitle-1, font-size)",
      compiledValue: "1rem",
      configurable: true,
    },
    {
      name: "rmd-list-dense-font-size",
      type: "Number",
      description: 'The font size to use for a "dense" list layout.\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "0.8125rem",
      compiledValue: "0.8125rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-vertical-padding",
      type: "Number",
      description:
        'The amount of vertical padding to apply to each list item. This is really only added to help with the\ndefault "growing height" case of items since the list item is aligned using a centered flexbox.\n\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "0.5rem",
      compiledValue: "0.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-horizontal-padding",
      type: "Number",
      description:
        "The amount of horizontal padding to apply to each list item.\n\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "1rem",
      compiledValue: "1rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-height",
      type: "Number",
      description:
        'The default height for a list item. To help create more general lists and layouts this height will\nbe applied as a `min-height` instead of `height` so that it can grow in height based on the content.\nWhen using the `ListItem` component, it will automatically "upgrade" to use `height` when the `secondaryText`\nor list item "addons" are provided to help enforce the material design specs.\n\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "3rem",
      compiledValue: "3rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-dense-height",
      type: "Number",
      description: "The default height for a dense list item.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "2.5rem",
      compiledValue: "2.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-medium-height",
      type: "Number",
      description:
        'The height for a "medium" sized list item. This will normally get applied\nfor any list item that has an icon or avatar.\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "3.5rem",
      compiledValue: "3.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-dense-medium-height",
      type: "Number",
      description:
        'The height for a "medium" sized list item that is also dense.\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "3rem",
      compiledValue: "3rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-large-height",
      type: "Number",
      description:
        'The height for a "large" sized list item. This will normally get applied\nfor any list item that has secondary text with no icon, or avatar.\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "4rem",
      compiledValue: "4rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-dense-large-height",
      type: "Number",
      description:
        'The height for a "large" sized list item that is also dense.\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "3.5rem",
      compiledValue: "3.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-extra-large-height",
      type: "Number",
      description:
        'The height for an "extra large" sized list item. This will normally get applied\nfor any list item that:\n- is single line but has a media\n- has secondary text with an icon, avatar, media, or metadata\n\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "4.5rem",
      compiledValue: "4.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-dense-extra-large-height",
      type: "Number",
      description:
        'The height for a "extra large" sized list item that is also dense.\n',
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "4rem",
      compiledValue: "4rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-three-line-height",
      type: "Number",
      description: "The height for a list item with three lines of text.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "5.5rem",
      compiledValue: "5.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-dense-three-line-height",
      type: "Number",
      description:
        "The height for a list item with three lines of text while being dense.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "5rem",
      compiledValue: "5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-secondary-text-line-height",
      type: "Number",
      description:
        "The line-height to use for the secondary text within the list item. This is different\nthan the primary text since this can span multiple lines by default.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "1.42857",
      compiledValue: "1.42857",
      configurable: true,
    },
    {
      name: "rmd-list-item-secondary-text-three-line-max-height",
      type: "Number",
      description:
        "The max allowed height for the three-line list item's secondary text. You probably\ndon't want to change this value unless you changed the other list item heights.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "3rem",
      compiledValue: "3rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-dense-secondary-text-three-line-max-height",
      type: "Number",
      description:
        "The max allowed height for the dense three-line list item's secondary text. You probably\ndon't want to change this value unless you changed the other list item heights.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "2.25rem",
      compiledValue: "2.25rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-text-keyline",
      type: "Number",
      description:
        "The spacing between the left side of the list item up to the left side of the\nfirst character of text. This is normally just used to align the list items\nwith other components.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "4.5rem",
      compiledValue: "4.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-media-size",
      type: "Number",
      description:
        "The size to use for media that appears before or after the main content in\na list item.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "3.5rem",
      compiledValue: "3.5rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-media-large-size",
      type: "Number",
      description:
        "The size to use for large media that appears before or after the main content in\na list item.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "6.25rem",
      compiledValue: "6.25rem",
      configurable: true,
    },
    {
      name: "rmd-list-item-media-spacing",
      type: "Number",
      description:
        "The amount of spacing to place between the main content and media that appears in\na list item.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value: "1rem",
      compiledValue: "1rem",
      configurable: true,
    },
    {
      name: "rmd-list-theme-values",
      type: "Map",
      description: "All the themeable parts for the list item.\n",
      file: "@react-md/list/dist/_variables.scss",
      group: "list",
      see: [],
      links: [],
      value:
        "(\n  vertical-padding: $rmd-list-vertical-padding,\n  horizontal-padding: $rmd-list-horizontal-padding,\n  font-size: $rmd-list-font-size,\n  text-keyline: $rmd-list-item-text-keyline,\n  item-height: $rmd-list-item-height,\n  item-medium-height: $rmd-list-item-medium-height,\n  item-large-height: $rmd-list-item-large-height,\n  item-extra-large-height: $rmd-list-item-extra-large-height,\n  item-three-line-height: $rmd-list-item-three-line-height,\n  item-vertical-padding: $rmd-list-item-vertical-padding,\n  item-horizontal-padding: $rmd-list-item-horizontal-padding,\n  item-secondary-three-line-height: $rmd-list-item-secondary-text-three-line-max-height,\n  dense-font-size: $rmd-list-dense-font-size,\n  dense-vertical-padding: $rmd-list-dense-vertical-padding,\n  dense-horizontal-padding: $rmd-list-dense-horizontal-padding,\n  dense-item-height: $rmd-list-item-dense-height,\n  dense-item-medium-height: $rmd-list-item-dense-medium-height,\n  dense-item-large-height: $rmd-list-item-dense-large-height,\n  dense-item-extra-large-height: $rmd-list-item-dense-extra-large-height,\n  dense-item-three-line-height: $rmd-list-item-dense-three-line-height,\n  dense-item-secondary-three-line-height: $rmd-list-item-dense-secondary-text-three-line-max-height,\n  media-size: $rmd-list-item-media-size,\n  media-spacing: $rmd-list-item-media-spacing,\n  media-large-size: $rmd-list-item-media-large-size,\n)",
      compiledValue:
        "(\n  vertical-padding: 0.5rem,\n  horizontal-padding: 0,\n  font-size: 1rem,\n  text-keyline: 4.5rem,\n  item-height: 3rem,\n  item-medium-height: 3.5rem,\n  item-large-height: 4rem,\n  item-extra-large-height: 4.5rem,\n  item-three-line-height: 5.5rem,\n  item-vertical-padding: 0.5rem,\n  item-horizontal-padding: 1rem,\n  item-secondary-three-line-height: 3rem,\n  dense-font-size: 0.8125rem,\n  dense-vertical-padding: 0.25rem,\n  dense-horizontal-padding: 0,\n  dense-item-height: 2.5rem,\n  dense-item-medium-height: 3rem,\n  dense-item-large-height: 3.5rem,\n  dense-item-extra-large-height: 4rem,\n  dense-item-three-line-height: 5rem,\n  dense-item-secondary-three-line-height: 2.25rem,\n  media-size: 3.5rem,\n  media-spacing: 1rem,\n  media-large-size: 6.25rem,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-list-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the list's theme values. This is really\njust for the `rmd-list-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/list/dist/_functions.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@function rmd-list-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-list-theme-values, list);\n}",
      oneLineCode: "@function rmd-list-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-list-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the list's theme values.",
      },
    },
    {
      name: "rmd-list-theme-var",
      type: "function",
      description:
        "This function is used to get one of the list's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-list-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/list/dist/_functions.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@function rmd-list-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-list-theme-values, list, $fallback);\n}",
      oneLineCode:
        "@function rmd-list-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
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
  ],
  mixins: [
    {
      name: "rmd-list-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the list's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/list/dist/_mixins.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@mixin rmd-list-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-list-theme-values, list);\n}",
      oneLineCode:
        "@mixin rmd-list-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-list-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-list-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-list-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-list-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the list's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/list/dist/_mixins.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@mixin rmd-list-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-list-theme-values, list);\n}",
      oneLineCode:
        "@mixin rmd-list-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The list theme style type to update. This should be one\n  of the `$rmd-list-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-list-unstyled",
      type: "mixin",
      description:
        'A "general" use mixin that will remove the default browser styles for a list and apply the\noptionally provided margin and padding instead.\n\n',
      file: "@react-md/list/dist/_mixins.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@mixin rmd-list-unstyled($padding: 0, $margin: 0) {\n  list-style-type: none;\n  margin: $margin;\n  padding: $padding;\n}",
      oneLineCode: "@mixin rmd-list-unstyled($padding: 0, $margin: 0) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "Number | String",
          name: "padding",
          default: "0",
          description: "The amount of padding to apply.",
        },
        {
          type: "Number | String",
          name: "margin",
          default: "0",
          description: "The amount of margin to apply.",
        },
      ],
    },
    {
      name: "rmd-list",
      type: "mixin",
      description: "Creates the styles for a list in react-md.\n",
      file: "@react-md/list/dist/_mixins.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@mixin rmd-list {\n  @include rmd-typography(subtitle-1);\n  @include rmd-divider-theme-update-var(inset, rmd-list-theme-var(text-keyline));\n  @include rmd-list-unstyled(null);\n  @include rmd-list-theme(font-size);\n\n  line-height: $rmd-list-line-height;\n  padding: rmd-list-theme-var(vertical-padding) rmd-list-theme-var(horizontal-padding);\n  word-break: break-word;\n\n  &--horizontal {\n    display: flex;\n    flex-wrap: nowrap;\n  }\n\n  &--dense {\n    @include rmd-list-dense-theme;\n  }\n}",
      oneLineCode: "@mixin rmd-list { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-list-item",
      type: "mixin",
      description: "Creates all the styles for a list item.\n",
      file: "@react-md/list/dist/_mixins.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@mixin rmd-list-item {\n  @include rmd-list-item-base;\n  @include rmd-list-item-icon-spacing(rmd-icon-theme-var(size));\n\n  &--clickable {\n    @include rmd-utils-hide-focus-outline;\n    @include rmd-states-surface;\n  }\n\n  &[aria-disabled] {\n    @include rmd-theme(color, text-disabled-on-background);\n  }\n\n  &--link {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  &--medium {\n    @include rmd-list-theme-update-var(item-height, rmd-list-theme-var(item-medium-height));\n  }\n\n  &--large {\n    @include rmd-list-theme-update-var(item-height, rmd-list-theme-var(item-large-height));\n  }\n\n  &--extra-large {\n    @include rmd-list-theme-update-var(item-height, rmd-list-theme-var(item-extra-large-height));\n  }\n\n  &--three-lines {\n    @include rmd-list-theme-update-var(item-height, rmd-list-theme-var(item-three-line-height));\n\n    .rmd-list-item__text--secondary {\n      @include rmd-list-theme(max-height, item-secondary-three-line-height);\n\n      line-height: $rmd-list-item-secondary-text-line-height;\n      white-space: normal;\n    }\n  }\n\n  &--dense {\n    @include rmd-list-item-dense-theme;\n  }\n\n  &__text {\n    @include rmd-typography-text-overflow-ellipsis;\n    @include rmd-utils-rtl {\n      margin-left: auto;\n    }\n\n    display: block;\n    flex-grow: 1;\n\n    &--secondary {\n      @include rmd-theme(color, text-secondary-on-background);\n    }\n  }\n\n  &__icon {\n    flex-shrink: 0;\n\n    &--top {\n      align-self: flex-start;\n    }\n\n    &--bottom {\n      align-self: flex-end;\n    }\n\n    &--avatar {\n      @include rmd-list-item-icon-spacing(rmd-avatar-theme-var(size));\n    }\n\n    &--media {\n      @include rmd-icon-theme-update-var(text-spacing, rmd-list-theme-var(media-spacing));\n      @include rmd-list-theme(width, media-size);\n    }\n\n    &--media-large {\n      @include rmd-list-theme-update-var(media-size, rmd-list-theme-var(media-large-size));\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-list-item { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "rmd-list-subheader",
      type: "mixin",
      description: "Creates the styles for a subheader within a list.\n",
      file: "@react-md/list/dist/_mixins.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@mixin rmd-list-subheader {\n  @include rmd-typography(subtitle-2);\n  @include rmd-theme(color, text-secondary-on-background);\n  @include rmd-list-item-base;\n\n  &--inset {\n    @include rmd-list-theme(padding-left, text-keyline);\n    @include rmd-utils-rtl {\n      @include rmd-list-theme(padding-left, item-horizontal-padding);\n      @include rmd-list-theme(padding-right, text-keyline);\n    }\n  }\n}",
      oneLineCode: "@mixin rmd-list-subheader { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "react-md-list",
      type: "mixin",
      description: "Creats all the styles for the list package.\n",
      file: "@react-md/list/dist/_mixins.scss",
      group: "list",
      see: [],
      links: [],
      code:
        "@mixin react-md-list {\n  @include rmd-theme-create-root-theme($rmd-list-theme-values, list);\n\n  .rmd-list {\n    @include rmd-list;\n  }\n\n  .rmd-list-item {\n    @include rmd-list-item;\n  }\n\n  .rmd-list-subheader {\n    @include rmd-list-subheader;\n  }\n}",
      oneLineCode: "@mixin react-md-list { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default ListSassDoc;
