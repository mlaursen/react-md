/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const DividerSassDoc: PackageSassDoc = {
  name: "divider",
  variables: [
    {
      name: "rmd-divider-size",
      type: "Number",
      description:
        "The size for the divider. This really just modifies the border-width.\n",
      file: "@react-md/divider/dist/_variables.scss",
      group: "divider",
      see: [],
      links: [],
      value: "1px",
      compiledValue: "1px",
      configurable: true,
    },
    {
      name: "rmd-divider-max-size",
      type: "Number",
      description:
        "The max size for the divider. This can be used to center a horizontal\ndivider within the page since the divider applies `margin-left: auto`\nand `margin-right: auto`.\n\nThis also applies to vertical dividers... sort of? If the divider's\ncontaining element has a static defined height, the vertical dividers\nwill be sized correctly. Otherwise the vertical divider will set the\nheight to `auto` which almost always resolves to `0` which will make\nyour divider not appear.\n",
      file: "@react-md/divider/dist/_variables.scss",
      group: "divider",
      see: [],
      links: [],
      value: "100%",
      compiledValue: "100%",
      configurable: true,
    },
    {
      name: "rmd-divider-inset",
      type: "Number",
      description:
        "The amount of inset to apply to the divider. This should not be changed\nto create centered dividers. Its only purpose is to had spacing to the\nleft (or right in rtl languages) of the divider. See the `$rmd-divider-max-size`\nvariable for more information about centering.\n\n",
      file: "@react-md/divider/dist/_variables.scss",
      group: "divider",
      see: [
        {
          name: "rmd-divider-max-size",
          type: "variable",
          description:
            "The max size for the divider. This can be used to center a horizontal\ndivider within the page since the divider applies `margin-left: auto`\nand `margin-right: auto`.\n\nThis also applies to vertical dividers... sort of? If the divider's\ncontaining element has a static defined height, the vertical dividers\nwill be sized correctly. Otherwise the vertical divider will set the\nheight to `auto` which almost always resolves to `0` which will make\nyour divider not appear.\n",
          group: "divider",
        },
      ],
      links: [],
      value: "4rem",
      compiledValue: "4rem",
      configurable: true,
    },
    {
      name: "rmd-divider-spacing",
      type: "Number",
      description:
        "The amount of spacing to apply above and below horizontal dividers or\nleft and right for vertical dividers.\n",
      file: "@react-md/divider/dist/_variables.scss",
      group: "divider",
      see: [],
      links: [],
      value: "0.25rem",
      compiledValue: "0.25rem",
      configurable: true,
    },
    {
      name: "rmd-divider-background-color-on-light",
      type: "Color",
      description: "The divider color to use on light backgrounds.\n",
      file: "@react-md/divider/dist/_variables.scss",
      group: "divider",
      see: [],
      links: [],
      value: "rgba($rmd-black-base, 0.12)",
      compiledValue: "rgba(0, 0, 0, 0.12)",
      configurable: true,
    },
    {
      name: "rmd-divider-background-color-on-dark",
      type: "Color",
      description: "The divider color to use on dark backgrounds.\n",
      file: "@react-md/divider/dist/_variables.scss",
      group: "divider",
      see: [],
      links: [],
      value: "rgba($rmd-white-base, 0.12)",
      compiledValue: "rgba(255, 255, 255, 0.12)",
      configurable: true,
    },
    {
      name: "rmd-divider-background-color",
      type: "Color",
      description: "The default divider background color to use.\n",
      file: "@react-md/divider/dist/_variables.scss",
      group: "divider",
      see: [],
      links: [],
      value:
        "if(\n  rmd-theme-tone($rmd-theme-background) == light,\n  $rmd-divider-background-color-on-light,\n  $rmd-divider-background-color-on-dark\n)",
      compiledValue: "rgba(0, 0, 0, 0.12)",
      configurable: true,
    },
    {
      name: "rmd-divider-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the divider package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/divider/dist/_variables.scss",
      group: "divider",
      see: [],
      links: [],
      value:
        "(\n  background-color: $rmd-divider-background-color,\n  background-color-on-light: $rmd-divider-background-color-on-light,\n  background-color-on-dark: $rmd-divider-background-color-on-dark,\n  size: $rmd-divider-size,\n  inset: $rmd-divider-inset,\n  spacing: $rmd-divider-spacing,\n  max-size: $rmd-divider-max-size,\n)",
      compiledValue:
        "(\n  background-color: rgba(0, 0, 0, 0.12),\n  background-color-on-light: rgba(0, 0, 0, 0.12),\n  background-color-on-dark: rgba(255, 255, 255, 0.12),\n  size: 1px,\n  inset: 4rem,\n  spacing: 0.25rem,\n  max-size: 100%,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-divider-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the divider's theme values. This is really\njust for the `rmd-divider-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/divider/dist/_functions.scss",
      group: "divider",
      see: [],
      links: [],
      code:
        "@function rmd-divider-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-divider-theme-values, divider);\n}",
      oneLineCode: "@function rmd-divider-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-divider-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the divider's theme values.",
      },
    },
    {
      name: "rmd-divider-theme-var",
      type: "function",
      description:
        "This function is used to get one of the divider's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-divider-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/divider/dist/_functions.scss",
      group: "divider",
      see: [],
      links: [],
      code:
        "@function rmd-divider-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-divider-theme-values, divider, $fallback);\n}",
      oneLineCode:
        "@function rmd-divider-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-divider-theme-values` map keys to set a value for.",
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
        description: "one of the divider's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-divider-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the divider's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/divider/dist/_mixins.scss",
      group: "divider",
      see: [],
      links: [],
      code:
        "@mixin rmd-divider-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-divider-theme-values, divider);\n}",
      oneLineCode:
        "@mixin rmd-divider-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-divider-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-divider-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-divider-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-divider-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the divider's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/divider/dist/_mixins.scss",
      group: "divider",
      see: [],
      links: [],
      code:
        "@mixin rmd-divider-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-divider-theme-values, divider);\n}",
      oneLineCode:
        "@mixin rmd-divider-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The divider theme style type to update. This should be one\n  of the `$rmd-divider-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-divider-border",
      type: "mixin",
      description:
        "This mixin allows you to add a custom border to any element if you don't want\nto add an extra element within your page for a divider.\n\n",
      file: "@react-md/divider/dist/_mixins.scss",
      group: "divider",
      see: [],
      links: [],
      code:
        "@mixin rmd-divider-border($position: ) {\n  @include rmd-divider-theme(border-color, background-color);\n  @include rmd-divider-theme(border-width, size);\n  @include rmd-divider-theme('border-#{$position}-width', size);\n\n  border-#{$position}-style: solid;\n}",
      oneLineCode: "@mixin rmd-divider-border($position: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "position",
          description:
            "The border position to use. This should be one of `top`, `right`,\n  `bottom`, or `left`",
        },
      ],
    },
    {
      name: "react-md-divider",
      type: "mixin",
      description:
        "Creates all the styles for the divider package as well as the root css variable theme.\n",
      file: "@react-md/divider/dist/_mixins.scss",
      group: "divider",
      see: [],
      links: [],
      code:
        "@mixin react-md-divider {\n  @include rmd-theme-create-root-theme($rmd-divider-theme-values, divider);\n\n  .rmd-divider {\n    @include rmd-divider-theme(border-color, background-color);\n    @include rmd-divider-theme(border-width, size);\n    @include rmd-divider-theme(width, max-size);\n\n    display: block;\n    flex-shrink: 0;\n    margin: rmd-divider-theme-var(spacing) auto;\n\n    &--vertical {\n      @include rmd-divider-theme(border-left-width, size);\n      @include rmd-divider-theme(border-left-color, background-color);\n      @include rmd-divider-theme(height, max-size);\n      @include rmd-divider-theme(width, size);\n\n      border-bottom-style: none;\n      border-left-style: inset;\n      display: inline-block;\n      margin: auto rmd-divider-theme-var(spacing);\n    }\n\n    &--inset {\n      @include rmd-divider-theme(margin-left, inset);\n      @include rmd-utils-rtl {\n        @include rmd-divider-theme(margin-right, inset);\n\n        margin-left: auto;\n      }\n\n      width: calc(#{rmd-divider-theme-var(max-size)} - #{rmd-divider-theme-var(inset)});\n    }\n  }\n}",
      oneLineCode: "@mixin react-md-divider { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default DividerSassDoc;
