/* this is a generated file and shouldn't be manually updated */
import { PackageSassDoc } from "types/formattedSassDoc.d";

const ProgressSassDoc: PackageSassDoc = {
  name: "progress",
  variables: [
    {
      name: "rmd-progress-include-linear",
      type: "Boolean",
      description:
        "Boolean if the linear progress bar styles should be created by\ndefault.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-progress-include-circular",
      type: "Boolean",
      description:
        "Boolean if the circular progress bar styles should be created by\ndefault.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value: "true",
      compiledValue: "true",
      configurable: true,
    },
    {
      name: "rmd-progress-color",
      type: "Color",
      description:
        "This is the main color that should be used for the linear progress\nand the circular progress components.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value: "$rmd-theme-primary",
      compiledValue: "#9c27b0",
      configurable: true,
    },
    {
      name: "rmd-progress-background-color",
      type: "Color",
      description:
        "This is the background color that is used fot the linear progress only.\nYou normally want this color to be a bit ligher than the main progress\ncolor since it'll be underneath the main progress.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "rmd-theme-get-swatch(\n  $rmd-theme-primary,\n  300,\n  false,\n  rgba($rmd-theme-primary, 0.4)\n)",
      compiledValue: "#ba68c8",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-size",
      type: "Number",
      description:
        "This is the linear progress bar's height or the width when switched to vertical.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value: "4px",
      compiledValue: "4px",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-transition-duration",
      type: "Number",
      description:
        "The transition duration for the entire linear progress animation. This one is\nmuch longer compared to other transitions since progress indicators are normally\nfor longer running background tasks.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value: "2.4s",
      compiledValue: "2.4s",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-short-animation-delay",
      type: "Number",
      description:
        "The delay before the second linear progress animation should start. This animation\nis for the very quick and smaller bar animation that will appear after the first\ntransition is near the end.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value: "0.75s",
      compiledValue: "0.75s",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-styles",
      type: "Map",
      description:
        "The linear progress bar styles to apply for the transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  0%: (\n    left: -35%,\n    right: 100%,\n  ),\n  60%: (\n    left: 100%,\n    right: -90%,\n  ),\n  100%: (\n    left: 100%,\n    right: -90%,\n  ),\n)",
      compiledValue:
        "(\n  0%: (\n    left: -35%,\n    right: 100%,\n  ),\n  60%: (\n    left: 100%,\n    right: -90%,\n  ),\n  100%: (\n    left: 100%,\n    right: -90%,\n  ),\n)",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-short-styles",
      type: "Map",
      description:
        "The linear progress bar styles to apply for the shorter transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  0%: (\n    left: -200%,\n    right: 100%,\n  ),\n  40%: (\n    left: 107%,\n    right: -8%,\n  ),\n  100%: (\n    left: 107%,\n    right: -8%,\n  ),\n)",
      compiledValue:
        "(\n  0%: (\n    left: -200%,\n    right: 100%,\n  ),\n  40%: (\n    left: 107%,\n    right: -8%,\n  ),\n  100%: (\n    left: 107%,\n    right: -8%,\n  ),\n)",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-reverse-styles",
      type: "Map",
      description:
        "The linear progress bar styles to apply for the transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  0%: (\n    left: 100%,\n    right: -35%,\n  ),\n  60%: (\n    left: -90%,\n    right: 100%,\n  ),\n  100%: (\n    left: -90%,\n    right: 100%,\n  ),\n)",
      compiledValue:
        "(\n  0%: (\n    left: 100%,\n    right: -35%,\n  ),\n  60%: (\n    left: -90%,\n    right: 100%,\n  ),\n  100%: (\n    left: -90%,\n    right: 100%,\n  ),\n)",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-reverse-short-styles",
      type: "Map",
      description:
        "The linear progress bar styles to apply for the shorter transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  0%: (\n    left: 100%,\n    right: -200%,\n  ),\n  40%: (\n    left: -8%,\n    right: 107%,\n  ),\n  100%: (\n    left: -8%,\n    right: 107%,\n  ),\n)",
      compiledValue:
        "(\n  0%: (\n    left: 100%,\n    right: -200%,\n  ),\n  40%: (\n    left: -8%,\n    right: 107%,\n  ),\n  100%: (\n    left: -8%,\n    right: 107%,\n  ),\n)",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-vertical-styles",
      type: "Map",
      description:
        "The linear progress bar styles to apply for the vertical transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  0%: (\n    bottom: -35%,\n    top: 100%,\n  ),\n  60%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n  100%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n)",
      compiledValue:
        "(\n  0%: (\n    bottom: -35%,\n    top: 100%,\n  ),\n  60%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n  100%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n)",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-vertical-short-styles",
      type: "Map",
      description:
        "The linear progress bar styles to apply for the shorter vertical transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  0%: (\n    bottom: -200%,\n    top: 100%,\n  ),\n  40%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n  100%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n)",
      compiledValue:
        "(\n  0%: (\n    bottom: -200%,\n    top: 100%,\n  ),\n  40%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n  100%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n)",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-vertical-reverse-styles",
      type: "Map",
      description:
        "The linear progress bar styles to apply for the vertical transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  0%: (\n    bottom: 100%,\n    top: -35%,\n  ),\n  60%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n  100%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n)",
      compiledValue:
        "(\n  0%: (\n    bottom: 100%,\n    top: -35%,\n  ),\n  60%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n  100%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n)",
      configurable: true,
    },
    {
      name: "rmd-linear-progress-vertical-reverse-short-styles",
      type: "Map",
      description:
        "The linear progress bar styles to apply for the shorter vertical transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  0%: (\n    bottom: 100%,\n    top: -200%,\n  ),\n  40%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n  100%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n)",
      compiledValue:
        "(\n  0%: (\n    bottom: 100%,\n    top: -200%,\n  ),\n  40%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n  100%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n)",
      configurable: true,
    },
    {
      name: "rmd-progress-theme-values",
      type: "Map",
      description:
        'A Map of all the "themeable" parts of the progress package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      file: "@react-md/progress/dist/_variables.scss",
      group: "progress",
      see: [],
      links: [],
      value:
        "(\n  color: $rmd-progress-color,\n  background-color: $rmd-progress-background-color,\n  linear-size: $rmd-linear-progress-size,\n)",
      compiledValue:
        "(\n  color: #9c27b0,\n  background-color: #ba68c8,\n  linear-size: 4px,\n);\n",
      configurable: true,
    },
  ],
  functions: [
    {
      name: "rmd-progress-theme",
      type: "function",
      description:
        "This function is used to quickly get one of the progress's theme values. This is really\njust for the `rmd-progress-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      file: "@react-md/progress/dist/_functions.scss",
      group: "progress",
      see: [],
      links: [],
      code:
        "@function rmd-progress-theme($theme-style: ) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-progress-theme-values, progress);\n}",
      oneLineCode: "@function rmd-progress-theme($theme-style: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-progress-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|Number|String",
        description: "one of the progress's theme values.",
      },
    },
    {
      name: "rmd-progress-theme-var",
      type: "function",
      description:
        "This function is used to get one of the progress's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-progress-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      file: "@react-md/progress/dist/_functions.scss",
      group: "progress",
      see: [],
      links: [],
      code:
        "@function rmd-progress-theme-var($theme-style: , $fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-progress-theme-values, progress, $fallback);\n}",
      oneLineCode:
        "@function rmd-progress-theme-var($theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-progress-theme-values` map keys to set a value for.",
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
        description: "one of the progress's theme values as a css variable.",
      },
    },
  ],
  mixins: [
    {
      name: "rmd-progress-theme",
      type: "mixin",
      description:
        "Creates the styles for one of the progress's theme values. This is mostly\ngoing to be an internal helper mixin util.\n\n",
      file: "@react-md/progress/dist/_mixins.scss",
      group: "progress",
      see: [],
      links: [],
      code:
        "@mixin rmd-progress-theme($property: , $theme-style: , $fallback: null) {\n  @include rmd-theme-apply-rmd-var($property, $theme-style, $rmd-progress-theme-values, progress);\n}",
      oneLineCode:
        "@mixin rmd-progress-theme($property: , $theme-style: , $fallback: null) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "property",
          description:
            "The property to set a `rmd-progress-theme-values` value to.",
        },
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the keys of `rmd-progress-theme-values` to extract a value from.",
        },
        {
          type: "String|Color|Number",
          name: "fallback",
          default: "null",
          description:
            "A fallback value to use if the css variable\n  isn't set somehow. This will default to automatically retrieving the default value\n  from the `rmd-progress-theme-values` map when `null`.",
        },
      ],
    },
    {
      name: "rmd-progress-theme-update-var",
      type: "mixin",
      description:
        "Updates one of the progress's theme variables with the new value for the section\nof your app.\n\n",
      file: "@react-md/progress/dist/_mixins.scss",
      group: "progress",
      see: [],
      links: [],
      code:
        "@mixin rmd-progress-theme-update-var($theme-style: , $value: ) {\n  @include rmd-theme-update-rmd-var($value, $theme-style, $rmd-progress-theme-values, progress);\n}",
      oneLineCode:
        "@mixin rmd-progress-theme-update-var($theme-style: , $value: ) { … }",
      throws: [],
      examples: [],
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "The progress theme style type to update. This should be one\n  of the `$rmd-progress-theme-values` keys.",
        },
        {
          type: "String|Number|Color",
          name: "value",
          description: "The new value to use.",
        },
      ],
    },
    {
      name: "react-md-progress",
      type: "mixin",
      description: "Creates all the styles for the progress package.\n",
      file: "@react-md/progress/dist/_mixins.scss",
      group: "progress",
      see: [],
      links: [],
      code:
        "@mixin react-md-progress {\n  @include rmd-theme-create-root-theme($rmd-progress-theme-values, progress);\n\n  @if $rmd-progress-include-linear {\n    @include rmd-linear-progress;\n  }\n\n  @if $rmd-progress-include-circular {\n    @include rmd-circular-progress;\n  }\n}",
      oneLineCode: "@mixin react-md-progress { … }",
      throws: [],
      examples: [],
      parameters: [],
    },
  ],
};

export default ProgressSassDoc;
