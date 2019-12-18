/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-progress-theme": {
      name: "rmd-progress-theme",
      description:
        "This function is used to quickly get one of the progress's theme values. This is really\njust for the `rmd-progress-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/progress/src/_functions.scss#L14-L16",
      packageName: "progress",
      code: "@function rmd-progress-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-progress-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-progress-theme-values, progress);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-progress-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the progress's theme values.",
      },
    },
    "rmd-progress-theme-var": {
      name: "rmd-progress-theme-var",
      description:
        "This function is used to get one of the progress's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-progress-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/progress/src/_functions.scss#L29-L31",
      packageName: "progress",
      code:
        "@function rmd-progress-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-progress-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-progress-theme-values, progress, $fallback);\n}",
      type: "function",
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
  },
  mixins: {
    "rmd-progress-theme": {
      name: "rmd-progress-theme",
      description:
        "This function is used to quickly get one of the progress's theme values. This is really\njust for the `rmd-progress-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/progress/src/_functions.scss#L14-L16",
      packageName: "progress",
      code: "@function rmd-progress-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-progress-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-progress-theme-values, progress);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-progress-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-progress-theme-var": {
      name: "rmd-progress-theme-var",
      description:
        "This function is used to get one of the progress's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-progress-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/progress/src/_functions.scss#L29-L31",
      packageName: "progress",
      code:
        "@function rmd-progress-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-progress-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-progress-theme-values, progress, $fallback);\n}",
      type: "mixin",
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
    },
  },
  variables: {
    "rmd-progress-include-linear": {
      name: "rmd-progress-include-linear",
      description:
        "Boolean if the linear progress bar styles should be created by\ndefault.\n",
      source: "packages/progress/src/_variables.scss#L11",
      usedBy: [
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-progress-include-circular": {
      name: "rmd-progress-include-circular",
      description:
        "Boolean if the circular progress bar styles should be created by\ndefault.\n",
      source: "packages/progress/src/_variables.scss#L16",
      usedBy: [
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Boolean",
      value: "true",
      overridable: true,
    },
    "rmd-progress-color": {
      name: "rmd-progress-color",
      description:
        "This is the main color that should be used for the linear progress\nand the circular progress components.\n",
      source: "packages/progress/src/_variables.scss#L21",
      packageName: "progress",
      type: "Color",
      value: "$rmd-theme-primary",
      compiled: "#9c27b0",
      overridable: true,
    },
    "rmd-progress-background-color": {
      name: "rmd-progress-background-color",
      description:
        "This is the background color that is used fot the linear progress only.\nYou normally want this color to be a bit ligher than the main progress\ncolor since it'll be underneath the main progress.\n",
      source: "packages/progress/src/_variables.scss#L27-L32",
      packageName: "progress",
      type: "Color",
      value:
        "rmd-theme-get-swatch(\n  $rmd-theme-primary,\n  300,\n  false,\n  rgba($rmd-theme-primary, 0.4)\n)",
      compiled: "#ba68c8",
      overridable: true,
    },
    "rmd-linear-progress-size": {
      name: "rmd-linear-progress-size",
      description:
        "This is the linear progress bar's height or the width when switched to vertical.\n",
      source: "packages/progress/src/_variables.scss#L36",
      packageName: "progress",
      type: "Number",
      value: "4px",
      overridable: true,
    },
    "rmd-linear-progress-transition-duration": {
      name: "rmd-linear-progress-transition-duration",
      description:
        "The transition duration for the entire linear progress animation. This one is\nmuch longer compared to other transitions since progress indicators are normally\nfor longer running background tasks.\n",
      source: "packages/progress/src/_variables.scss#L42",
      packageName: "progress",
      type: "Number",
      value: "2.4s",
      overridable: true,
    },
    "rmd-linear-progress-short-animation-delay": {
      name: "rmd-linear-progress-short-animation-delay",
      description:
        "The delay before the second linear progress animation should start. This animation\nis for the very quick and smaller bar animation that will appear after the first\ntransition is near the end.\n",
      source: "packages/progress/src/_variables.scss#L48",
      packageName: "progress",
      type: "Number",
      value: "0.75s",
      overridable: true,
    },
    "rmd-linear-progress-styles": {
      name: "rmd-linear-progress-styles",
      description:
        "The linear progress bar styles to apply for the transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L54-L67",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: -35%,\n    right: 100%,\n  ),\n  60%: (\n    left: 100%,\n    right: -90%,\n  ),\n  100%: (\n    left: 100%,\n    right: -90%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-short-styles": {
      name: "rmd-linear-progress-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L73-L86",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: -200%,\n    right: 100%,\n  ),\n  40%: (\n    left: 107%,\n    right: -8%,\n  ),\n  100%: (\n    left: 107%,\n    right: -8%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-reverse-styles": {
      name: "rmd-linear-progress-reverse-styles",
      description:
        "The linear progress bar styles to apply for the transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L92-L105",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: 100%,\n    right: -35%,\n  ),\n  60%: (\n    left: -90%,\n    right: 100%,\n  ),\n  100%: (\n    left: -90%,\n    right: 100%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-reverse-short-styles": {
      name: "rmd-linear-progress-reverse-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L111-L124",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    left: 100%,\n    right: -200%,\n  ),\n  40%: (\n    left: -8%,\n    right: 107%,\n  ),\n  100%: (\n    left: -8%,\n    right: 107%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-styles": {
      name: "rmd-linear-progress-vertical-styles",
      description:
        "The linear progress bar styles to apply for the vertical transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L130-L143",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: -35%,\n    top: 100%,\n  ),\n  60%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n  100%: (\n    bottom: 100%,\n    top: -90%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-short-styles": {
      name: "rmd-linear-progress-vertical-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter vertical transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L149-L162",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: -200%,\n    top: 100%,\n  ),\n  40%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n  100%: (\n    bottom: 107%,\n    top: -8%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-reverse-styles": {
      name: "rmd-linear-progress-vertical-reverse-styles",
      description:
        "The linear progress bar styles to apply for the vertical transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L168-L181",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: 100%,\n    top: -35%,\n  ),\n  60%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n  100%: (\n    bottom: -90%,\n    top: 100%,\n  ),\n)",
      overridable: true,
    },
    "rmd-linear-progress-vertical-reverse-short-styles": {
      name: "rmd-linear-progress-vertical-reverse-short-styles",
      description:
        "The linear progress bar styles to apply for the shorter vertical transition. Each key in this map\nwill be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L187-L200",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    bottom: 100%,\n    top: -200%,\n  ),\n  40%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n  100%: (\n    bottom: -8%,\n    top: 107%,\n  ),\n)",
      overridable: true,
    },
    "rmd-circular-progress-size": {
      name: "rmd-circular-progress-size",
      description: "The size for the circular progress svg.\n",
      source: "packages/progress/src/_variables.scss#L204",
      packageName: "progress",
      type: "Number",
      value: "3rem",
      overridable: true,
    },
    "rmd-progress-circle-stroke-width": {
      name: "rmd-progress-circle-stroke-width",
      description:
        "The stroke width for the circular svg. I wouldn't change this value unless you\nalso update the `viewbox` for the `CircularProgress` component.\n",
      source: "packages/progress/src/_variables.scss#L209",
      packageName: "progress",
      type: "Number",
      value: "6",
      overridable: true,
    },
    "rmd-progress-circle-dasharray": {
      name: "rmd-progress-circle-dasharray",
      description:
        "The dasharray fro the circular svg. I don't really know how this works so good\nluck changing it to something else. If this value is changed, you'll aslo need\nto update the `dasharray` prop for the `CircularProgress` component.\n",
      source: "packages/progress/src/_variables.scss#L215",
      packageName: "progress",
      type: "Number",
      value: "187",
      overridable: true,
    },
    "rmd-progress-circle-transition-duration": {
      name: "rmd-progress-circle-transition-duration",
      description:
        "The entire transition duration for the circular progress. This is really the full\ntime for the change in the `stroke-dashoffset` as the default rotation will rotate\n`720deg` over this time.\n",
      source: "packages/progress/src/_variables.scss#L221",
      packageName: "progress",
      type: "Number",
      value: "2.4s",
      overridable: true,
    },
    "rmd-progress-circle-start-offset": {
      name: "rmd-progress-circle-start-offset",
      description:
        "The starting dashoffset for the ciruclar progress animation. This will be used for\nthe `0%` and `100%` values in the animation keyframes by default.\n",
      source: "packages/progress/src/_variables.scss#L226",
      packageName: "progress",
      type: "Number",
      value: "$rmd-progress-circle-dasharray",
      compiled: "187",
      overridable: true,
    },
    "rmd-progress-circle-end-offset": {
      name: "rmd-progress-circle-end-offset",
      description:
        "The ending dashoffset for the ciruclar progress animation. This will be used for\nthe `50%` value in the animation keyframes by default.\n",
      source: "packages/progress/src/_variables.scss#L231",
      packageName: "progress",
      type: "Number",
      value: "$rmd-progress-circle-dasharray / 4",
      compiled: "46.75",
      overridable: true,
    },
    "rmd-progress-circle-rotate-styles": {
      name: "rmd-progress-circle-rotate-styles",
      description:
        "The circular progress styles to apply for the rotation transition. Each key in this\nmap will be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L237-L250",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    transform: rotate(0deg),\n  ),\n  50%: (\n    transform: rotate(135deg),\n  ),\n  75%: (\n    transform: rotate(450deg),\n  ),\n  100%: (\n    transform: rotate(720deg),\n  ),\n)",
      overridable: true,
    },
    "rmd-progress-circle-dash-styles": {
      name: "rmd-progress-circle-dash-styles",
      description:
        "The circular progress styles to apply for the dashoffset transition. Each key in this\nmap will be set immediately at the root of the `keyframes` and then each child map\nwill be considered a map of property: value.\n",
      source: "packages/progress/src/_variables.scss#L256-L266",
      packageName: "progress",
      type: "Map",
      value:
        "(\n  0%: (\n    stroke-dashoffset: $rmd-progress-circle-start-offset,\n  ),\n  50%: (\n    stroke-dashoffset: $rmd-progress-circle-end-offset,\n  ),\n  100%: (\n    stroke-dashoffset: $rmd-progress-circle-start-offset,\n  ),\n)",
      compiled:
        "(\n  0%: (\n    stroke-dashoffset: 187,\n  ),\n  50%: (\n    stroke-dashoffset: 46.75,\n  ),\n  100%: (\n    stroke-dashoffset: 187,\n  ),\n)",
      overridable: true,
    },
    "rmd-progress-theme-values": {
      name: "rmd-progress-theme-values",
      description:
        'A Map of all the "themeable" parts of the progress package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/progress/src/_variables.scss#L272-L278",
      usedBy: [
        {
          name: "rmd-progress-theme",
          type: "function",
          packageName: "progress",
        },
        {
          name: "rmd-progress-theme-var",
          type: "function",
          packageName: "progress",
        },
        { name: "rmd-progress-theme", type: "mixin", packageName: "progress" },
        {
          name: "rmd-progress-theme-update-var",
          type: "mixin",
          packageName: "progress",
        },
        { name: "react-md-progress", type: "mixin", packageName: "progress" },
      ],
      packageName: "progress",
      type: "Map",
      value:
        "(\n  color: $rmd-progress-color,\n  background-color: $rmd-progress-background-color,\n  linear-size: $rmd-linear-progress-size,\n  circular-size: $rmd-circular-progress-size,\n  circular-width: $rmd-progress-circle-stroke-width,\n)",
      compiled:
        "(\n  color: #9c27b0,\n  background-color: #ba68c8,\n  linear-size: 4px,\n  circular-size: 3rem,\n  circular-width: 6,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
