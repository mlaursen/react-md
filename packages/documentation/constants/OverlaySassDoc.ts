/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const OverlaySassDoc: PackageSassDoc = {
  name: "overlay",
  variables: [
    {
      name: "rmd-overlay-z-index",
      type: "Number",
      description: "The z-index for overlays.\n",
      file: "@react-md/overlay/dist/_variables.scss",
      group: "overlay",
      see: [],
      links: [],
      value: "16",
      compiledValue: "16",
      configurable: true,
    },
    {
      name: "rmd-overlay-transition-duration",
      type: "Number",
      description:
        "The transition duration for overlays entering and leaving.\n",
      file: "@react-md/overlay/dist/_variables.scss",
      group: "overlay",
      see: [],
      links: [],
      value: "0.15s",
      compiledValue: "0.15s",
      configurable: true,
    },
    {
      name: "rmd-overlay-color",
      type: "Color",
      description:
        "The background color for the overlay. It is recommended to make sure that an opacity\nis applied instead of a static color.\n",
      file: "@react-md/overlay/dist/_variables.scss",
      group: "overlay",
      see: [],
      links: [],
      value: "rgba($rmd-black-base, 0.4)",
      compiledValue: "rgba(0, 0, 0, 0.4)",
      configurable: true,
    },
    {
      name: "rmd-overlay-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the overlay package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the overlay as\nneeded.\n',
      file: "@react-md/overlay/dist/_variables.scss",
      group: "overlay",
      see: [],
      links: [],
      value:
        "(\n  background-color: $rmd-overlay-color,\n  z-index: $rmd-overlay-z-index,\n)",
      compiledValue:
        "(\n  background-color: rgba(0, 0, 0, 0.4),\n  z-index: 16,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-overlay-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the overlay's theme values. This is really\njust for the `rmd-overlay-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/overlay/dist/_functions.scss",
      group: "overlay",
      see: [],
      links: [],
      code:
        "@function rmd-overlay-theme($style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-overlay-theme-values, overlay);\n}",
      oneLineCode: "@function rmd-overlay-theme($style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "style",
          description:
            "One of the `$rmd-overlay-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the overlay's theme values.",
      },
    },
    {
      name: "rmd-overlay-theme-var",
      type: "function",
      description:
        "This function is used to get one of the overlay's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-overlay-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/overlay/dist/_functions.scss",
      group: "overlay",
      see: [],
      links: [],
      code:
        "@function rmd-overlay-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-overlay-theme-values, overlay, $fallback);\n}",
      oneLineCode:
        "@function rmd-overlay-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-overlay-theme-values` map keys to set a value for.",
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
        description: "one of the overlay's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-overlay-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the overlay's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/overlay/dist/_mixins.scss",
      group: "overlay",
      see: [],
      links: [],
      code:
        "@mixin rmd-overlay-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-overlay-theme-values, overlay);\n}",
      oneLineCode:
        "@mixin rmd-overlay-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-overlay-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-overlay-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-overlay-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-overlay-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the overlay's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/overlay/dist/_mixins.scss",
      group: "overlay",
      see: [],
      links: [],
      code:
        "@mixin rmd-overlay-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-overlay-theme-values, overlay);\n}",
      oneLineCode:
        "@mixin rmd-overlay-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The overlay theme style type to update. This should be one\n  of the `$rmd-overlay-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "rmd-overlay",
      type: "mixin",
      description: "Creates the styles for the overlay component.\n",
      file: "@react-md/overlay/dist/_mixins.scss",
      group: "overlay",
      see: [],
      links: [],
      code:
        "@mixin rmd-overlay {\n  @include rmd-utils-hide-focus-outline;\n  @include rmd-overlay-theme(background-color);\n  @include rmd-overlay-theme(z-index);\n  @include rmd-transition(standard);\n\n  bottom: 0;\n  cursor: pointer;\n  left: 0;\n  opacity: 0;\n  pointer-events: none;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transition: opacity $rmd-overlay-transition-duration;\n\n  &--active {\n    opacity: 1;\n    pointer-events: auto;\n  }\n}",
      oneLineCode: "@mixin rmd-overlay { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
    {
      name: "react-md-overlay",
      type: "mixin",
      description:
        "Creates the styles for overlays within react-md and also creates\nall the theme css variables for overlays.\n",
      file: "@react-md/overlay/dist/_mixins.scss",
      group: "overlay",
      see: [],
      links: [],
      code:
        "@mixin react-md-overlay {\n  @include rmd-theme-create-root-theme($rmd-overlay-theme-values, overlay);\n\n  .rmd-overlay {\n    @include rmd-overlay;\n  }\n}",
      oneLineCode: "@mixin react-md-overlay { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default OverlaySassDoc;
