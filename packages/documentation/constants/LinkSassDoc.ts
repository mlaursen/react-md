/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const LinkSassDoc: PackageSassDoc = {
  name: "link",
  variables: [
    {
      name: "rmd-link-transition-time",
      type: "Number",
      description: "The transition time for links to change color.\n",
      file: "@react-md/link/dist/_variables.scss",
      group: "link",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-link-color",
      type: "Color",
      description: "The default color to use for links.\n",
      file: "@react-md/link/dist/_variables.scss",
      group: "link",
      see: [],
      links: [],
      value: "$rmd-blue-500",
      compiledValue: "#2196f3",
      configurable: true,
    },
    {
      name: "rmd-link-visited-color",
      type: "Color",
      description: "The color to use for links that have been visited.\n",
      file: "@react-md/link/dist/_variables.scss",
      group: "link",
      see: [],
      links: [],
      value: "$rmd-blue-600",
      compiledValue: "#1e88e5",
      configurable: true,
    },
    {
      name: "rmd-link-hover-color",
      type: "Color",
      description: "The color to use for links that are being hovered.\n",
      file: "@react-md/link/dist/_variables.scss",
      group: "link",
      see: [],
      links: [],
      value: "$rmd-blue-400",
      compiledValue: "#42a5f5",
      configurable: true,
    },
    {
      name: "rmd-link-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the link package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the link as\nneeded.\n',
      file: "@react-md/link/dist/_variables.scss",
      group: "link",
      see: [],
      links: [],
      value:
        "(\n  color: $rmd-link-color,\n  hover-color: $rmd-link-hover-color,\n  visited-color: $rmd-link-visited-color,\n)",
      compiledValue:
        "(\n  color: #2196f3,\n  hover-color: #42a5f5,\n  visited-color: #1e88e5,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-link-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the link's theme values. This is really\njust for the `rmd-link-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/link/dist/_functions.scss",
      group: "link",
      see: [],
      links: [],
      code:
        "@function rmd-link-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-link-theme-values, link);\n}",
      oneLineCode: "@function rmd-link-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-link-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the link's theme values.",
      },
    },
    {
      name: "rmd-link-theme-var",
      type: "function",
      description:
        "This function is used to get one of the link's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-link-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/link/dist/_functions.scss",
      group: "link",
      see: [],
      links: [],
      code:
        "@function rmd-link-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-link-theme-values, link, $fallback);\n}",
      oneLineCode:
        "@function rmd-link-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-link-theme-values` map keys to set a value for.",
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
      name: "rmd-link-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the link's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/link/dist/_mixins.scss",
      group: "link",
      see: [],
      links: [],
      code:
        "@mixin rmd-link-theme($property: , $theme-style: property, $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-link-theme-values, link);\n}",
      oneLineCode:
        "@mixin rmd-link-theme($property: , $theme-style: property, $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-link-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          default: "property",
          description:
            "One of the keys of `rmd-link-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-link-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-link-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the link's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/link/dist/_mixins.scss",
      group: "link",
      see: [],
      links: [],
      code:
        "@mixin rmd-link-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-link-theme-values, link);\n}",
      oneLineCode:
        "@mixin rmd-link-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The link theme style type to update. This should be one\n  of the `$rmd-link-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "react-md-link",
      type: "mixin",
      description: "Creates the styles for links within react-md.\n",
      file: "@react-md/link/dist/_mixins.scss",
      group: "link",
      see: [],
      links: [],
      code:
        "@mixin react-md-link {\n  @include rmd-theme-create-root-theme($rmd-link-theme-values, link);\n\n  .rmd-link {\n    @include rmd-link-theme(color);\n    @include rmd-typography-base;\n\n    transition: color $rmd-link-transition-time;\n\n    &--flex-centered {\n      align-items: center;\n      display: inline-flex;\n    }\n\n    &:visited {\n      @include rmd-link-theme(color, visited-color);\n    }\n\n    &:hover {\n      @include rmd-link-theme(color, hover-color);\n    }\n  }\n}",
      oneLineCode: "@mixin react-md-link { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default LinkSassDoc;
